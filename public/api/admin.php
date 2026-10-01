<?php
// API du tableau de bord /admin/. Authentification par mot de passe : le
// hash vit dans data/config.php (ou dans la base après un changement), la
// session est un jeton aléatoire dont seule l'empreinte est stockée. Cookie
// HttpOnly, Secure, SameSite=Strict, limité à /api/. Cinq échecs en quinze
// minutes bloquent la connexion depuis cette adresse.
declare(strict_types=1);
require __DIR__ . '/_lib.php';

const KN_COOKIE = 'kn_admin';
const KN_DUREE_JETON_MS = 30 * 24 * 3600 * 1000;
const KN_STATUTS = ['nouveau', 'contacte', 'rdv', 'devis', 'gagne', 'perdu', 'spam'];

$db = kn_db();
$action = (string) ($_GET['a'] ?? '');
$methode = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');

// Toute écriture exige l'en-tête maison : un formulaire tiers ne peut pas le poser
if ($methode === 'POST' && ($_SERVER['HTTP_X_KN'] ?? '') !== '1') {
    kn_json(['ok' => false], 403);
}

function kn_hash_mot_de_passe(PDO $db): ?string
{
    $q = $db->query("SELECT valeur FROM reglages WHERE cle = 'mot_de_passe'")->fetchColumn();
    return $q ?: (kn_config()['mot_de_passe'] ?? null);
}

function kn_connecte(PDO $db): bool
{
    $jeton = (string) ($_COOKIE[KN_COOKIE] ?? '');
    if (strlen($jeton) !== 64) {
        return false;
    }
    $q = $db->prepare('SELECT 1 FROM jetons WHERE empreinte = ? AND expire > ?');
    $q->execute([hash('sha256', $jeton), kn_maintenant()]);
    return (bool) $q->fetchColumn();
}

function kn_poser_cookie(string $valeur, int $expire): void
{
    setcookie(KN_COOKIE, $valeur, [
        'expires' => $expire,
        'path' => '/api/',
        'secure' => ($_SERVER['HTTPS'] ?? '') !== '' && ($_SERVER['HTTPS'] ?? '') !== 'off',
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// --- Connexion ---------------------------------------------------------------
if ($action === 'connexion' && $methode === 'POST') {
    $ip = kn_empreinte_ip();
    $q = $db->prepare('SELECT COUNT(*) FROM connexions WHERE ip = ? AND reussie = 0 AND date > ?');
    $q->execute([$ip, kn_maintenant() - 15 * 60 * 1000]);
    if ((int) $q->fetchColumn() >= 5) {
        kn_json(['ok' => false, 'erreur' => 'Trop de tentatives, réessayez dans 15 minutes.'], 429);
    }
    $entree = kn_entree(2048);
    $hash = kn_hash_mot_de_passe($db);
    $ok = $hash && password_verify((string) ($entree['motdepasse'] ?? ''), $hash);
    $db->prepare('INSERT INTO connexions (ip, date, reussie) VALUES (?, ?, ?)')->execute([$ip, kn_maintenant(), $ok ? 1 : 0]);
    if (!$ok) {
        usleep(400000);
        kn_json(['ok' => false, 'erreur' => $hash ? 'Mot de passe incorrect.' : 'Aucun mot de passe configuré sur le serveur.'], 401);
    }
    $jeton = bin2hex(random_bytes(32));
    $db->prepare('INSERT INTO jetons (empreinte, expire) VALUES (?, ?)')->execute([hash('sha256', $jeton), kn_maintenant() + KN_DUREE_JETON_MS]);
    kn_poser_cookie($jeton, time() + 30 * 86400);
    kn_json(['ok' => true]);
}

if ($action === 'deconnexion' && $methode === 'POST') {
    if ($j = (string) ($_COOKIE[KN_COOKIE] ?? '')) {
        $db->prepare('DELETE FROM jetons WHERE empreinte = ?')->execute([hash('sha256', $j)]);
    }
    kn_poser_cookie('', time() - 3600);
    kn_json(['ok' => true]);
}

if (!kn_connecte($db)) {
    kn_json(['ok' => false, 'erreur' => 'non_connecte'], 401);
}

// --- Outils de requête -------------------------------------------------------
// Décalage horaire de Genève (heure d'été comprise) pour regrouper par jour et par heure
date_default_timezone_set('Europe/Zurich');
$tz = sprintf("'%+d seconds'", (int) date('Z'));
$jours = max(0, min(3650, (int) ($_GET['j'] ?? 30)));
$fin = kn_maintenant();
$debut = $jours > 0 ? $fin - $jours * 86400 * 1000 : 0;

function kn_tous(PDO $db, string $sql, array $params = []): array
{
    $q = $db->prepare($sql);
    $q->execute($params);
    return $q->fetchAll();
}
function kn_un(PDO $db, string $sql, array $params = [])
{
    $q = $db->prepare($sql);
    $q->execute($params);
    return $q->fetchColumn();
}

/** Totaux d'une période, réutilisés pour comparer avec la période précédente. */
function kn_totaux(PDO $db, int $debut, int $fin): array
{
    $sessions = (int) kn_un($db, 'SELECT COUNT(*) FROM sessions WHERE debut >= ? AND debut < ?', [$debut, $fin]);
    $leads = (int) kn_un($db, "SELECT COUNT(*) FROM leads WHERE date >= ? AND date < ? AND statut != 'spam'", [$debut, $fin]);
    return [
        'sessions' => $sessions,
        'visiteurs' => (int) kn_un($db, 'SELECT COUNT(DISTINCT COALESCE(visiteur, id)) FROM sessions WHERE debut >= ? AND debut < ?', [$debut, $fin]),
        'pages' => (int) kn_un($db, 'SELECT COALESCE(SUM(pages), 0) FROM sessions WHERE debut >= ? AND debut < ?', [$debut, $fin]),
        'leads' => $leads,
        'conversion' => $sessions > 0 ? round($leads / $sessions * 100, 2) : 0,
        'duree_moyenne_s' => (int) round((float) kn_un($db, 'SELECT AVG(fin - debut) FROM sessions WHERE debut >= ? AND debut < ?', [$debut, $fin]) / 1000),
        'rebond' => $sessions > 0 ? round((int) kn_un($db, 'SELECT COUNT(*) FROM sessions WHERE debut >= ? AND debut < ? AND pages <= 1', [$debut, $fin]) / $sessions * 100, 1) : 0,
        'ia' => (int) kn_un($db, "SELECT COUNT(*) FROM sessions WHERE debut >= ? AND debut < ? AND canal = 'IA'", [$debut, $fin]),
    ];
}

// --- Tableau de bord -----------------------------------------------------------
if ($action === 'stats') {
    $p = [$debut, $fin];
    $precedente = $jours > 0 ? kn_totaux($db, $debut - ($fin - $debut), $debut) : null;

    // Série par jour (heure de Paris)
    $serie = kn_tous($db, "SELECT date(debut / 1000, 'unixepoch', $tz) AS jour, COUNT(*) AS sessions,
            SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads
        FROM sessions WHERE debut >= ? AND debut < ? GROUP BY jour ORDER BY jour", $p);

    $canaux = kn_tous($db, "SELECT s.canal, COUNT(*) AS sessions, SUM(CASE WHEN s.lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads,
            ROUND(AVG(s.pages), 1) AS pages_moy, CAST(AVG(s.fin - s.debut) / 1000 AS INTEGER) AS duree_moy
        FROM sessions s WHERE s.debut >= ? AND s.debut < ? GROUP BY s.canal ORDER BY sessions DESC", $p);
    $sources = kn_tous($db, 'SELECT canal, source, COUNT(*) AS sessions, SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads
        FROM sessions WHERE debut >= ? AND debut < ? GROUP BY canal, source ORDER BY sessions DESC LIMIT 40', $p);
    $entrees = kn_tous($db, 'SELECT atterrissage AS chemin, COUNT(*) AS sessions, SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads,
            ROUND(100.0 * SUM(CASE WHEN pages <= 1 THEN 1 ELSE 0 END) / COUNT(*), 0) AS rebond
        FROM sessions WHERE debut >= ? AND debut < ? GROUP BY atterrissage ORDER BY sessions DESC LIMIT 25', $p);
    $pages = kn_tous($db, "SELECT e.chemin, COUNT(*) AS vues, COUNT(DISTINCT e.session) AS sessions,
            CAST((SELECT SUM(json_extract(l.donnees, '$.duree')) FROM evenements l
              WHERE l.type = 'lecture' AND l.chemin = e.chemin AND l.date >= ? AND l.date < ?) / COUNT(*) / 1000 AS INTEGER) AS lecture_moy,
            (SELECT CAST(AVG(json_extract(l.donnees, '$.scroll')) AS INTEGER) FROM evenements l
              WHERE l.type = 'lecture' AND l.chemin = e.chemin AND l.date >= ? AND l.date < ?) AS scroll_moy
        FROM evenements e WHERE e.type = 'vue' AND e.date >= ? AND e.date < ? GROUP BY e.chemin ORDER BY vues DESC LIMIT 30",
        [$debut, $fin, $debut, $fin, $debut, $fin]);
    $appareils = kn_tous($db, 'SELECT appareil, COUNT(*) AS sessions, SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads
        FROM sessions WHERE debut >= ? AND debut < ? GROUP BY appareil ORDER BY sessions DESC', $p);
    $clics = kn_tous($db, "SELECT json_extract(donnees, '$.cible') AS cible, json_extract(donnees, '$.libelle') AS libelle, COUNT(*) AS n
        FROM evenements WHERE type = 'clic' AND date >= ? AND date < ? GROUP BY cible, libelle ORDER BY n DESC LIMIT 25", $p);

    // Entonnoir : visite, page de conversion vue, formulaire commencé, demande envoyée
    $entonnoir = [
        ['etape' => 'Visites', 'n' => (int) kn_un($db, 'SELECT COUNT(*) FROM sessions WHERE debut >= ? AND debut < ?', $p)],
        ['etape' => 'Ont vu la page contact', 'n' => (int) kn_un($db, "SELECT COUNT(DISTINCT session) FROM evenements
            WHERE type = 'vue' AND chemin IN ('/contact/', '/en/contact/') AND date >= ? AND date < ?", $p)],
        ['etape' => 'Ont commencé un formulaire', 'n' => (int) kn_un($db, "SELECT COUNT(DISTINCT session) FROM evenements
            WHERE type = 'formulaire' AND json_extract(donnees, '$.etape') = 'debut' AND date >= ? AND date < ?", $p)],
        ['etape' => 'Ont envoyé une demande', 'n' => (int) kn_un($db, "SELECT COUNT(*) FROM leads WHERE date >= ? AND date < ? AND statut != 'spam' AND session IS NOT NULL", $p)],
    ];
    $abandons = kn_tous($db, "SELECT json_extract(donnees, '$.form') AS formulaire, json_extract(donnees, '$.dernier') AS dernier_champ, COUNT(*) AS n
        FROM evenements WHERE type = 'formulaire' AND json_extract(donnees, '$.etape') = 'abandon' AND date >= ? AND date < ?
        GROUP BY formulaire, dernier_champ ORDER BY n DESC LIMIT 10", $p);

    // Blog : compteurs de vues et de j'aime de stats.php, depuis leur mise en place
    $blog = [];
    $fichierBlog = __DIR__ . '/data/stats.json';
    if (is_file($fichierBlog)) {
        $brut = json_decode((string) file_get_contents($fichierBlog), true);
        foreach ((array) ($brut['articles'] ?? []) as $slug => $c) {
            $blog[] = ['slug' => (string) $slug, 'vues' => (int) ($c['vues'] ?? 0), 'jaime' => (int) ($c['jaime'] ?? 0)];
        }
        usort($blog, fn($a, $b) => ($b['vues'] <=> $a['vues']) ?: ($b['jaime'] <=> $a['jaime']));
        $blog = array_slice($blog, 0, 30);
    }

    $origines = kn_tous($db, "SELECT COALESCE(origine_declaree, 'Non renseignée') AS origine, COUNT(*) AS leads
        FROM leads WHERE date >= ? AND date < ? AND statut != 'spam' GROUP BY origine ORDER BY leads DESC", $p);
    $statuts = kn_tous($db, "SELECT statut, COUNT(*) AS n, COALESCE(SUM(valeur), 0) AS valeur FROM leads WHERE date >= ? AND date < ? GROUP BY statut", $p);
    $heures = kn_tous($db, "SELECT CAST(strftime('%H', debut / 1000, 'unixepoch', $tz) AS INTEGER) AS heure, COUNT(*) AS sessions
        FROM sessions WHERE debut >= ? AND debut < ? GROUP BY heure ORDER BY heure", $p);
    $enDirect = (int) kn_un($db, 'SELECT COUNT(*) FROM sessions WHERE fin > ?', [$fin - 5 * 60 * 1000]);

    kn_json(['ok' => true] + compact('jours', 'serie', 'canaux', 'sources', 'entrees', 'pages', 'appareils', 'clics',
        'entonnoir', 'abandons', 'blog', 'origines', 'statuts', 'heures', 'precedente') + [
        'totaux' => kn_totaux($db, $debut, $fin),
        'en_direct' => $enDirect,
        'premiere_mesure' => (int) kn_un($db, 'SELECT MIN(debut) FROM sessions'),
    ]);
}

// --- Leads -----------------------------------------------------------------------
if ($action === 'leads') {
    $leads = kn_tous($db, 'SELECT id, date, formulaire, nom, email, telephone, entreprise, projet, site, origine_declaree, canal, source,
            premier_canal, premiere_source, premiere_visite, nb_visites, statut, valeur, maj, import,
            substr(message, 1, 220) AS extrait
        FROM leads ORDER BY date DESC LIMIT 1000');
    kn_json(['ok' => true, 'leads' => $leads]);
}

if ($action === 'lead') {
    $id = (int) ($_GET['id'] ?? 0);
    $q = $db->prepare('SELECT * FROM leads WHERE id = ?');
    $q->execute([$id]);
    $lead = $q->fetch();
    if (!$lead) {
        kn_json(['ok' => false], 404);
    }
    // Toutes les visites connues de cette personne, puis leurs événements
    $sessions = $lead['visiteur']
        ? kn_tous($db, 'SELECT * FROM sessions WHERE visiteur = ? OR id = ? ORDER BY debut', [$lead['visiteur'], $lead['session']])
        : ($lead['session'] ? kn_tous($db, 'SELECT * FROM sessions WHERE id = ?', [$lead['session']]) : []);
    $ids = array_column($sessions, 'id');
    $evenements = [];
    if ($ids) {
        $marques = implode(',', array_fill(0, count($ids), '?'));
        $evenements = kn_tous($db, "SELECT session, date, type, chemin, donnees FROM evenements WHERE session IN ($marques) ORDER BY date LIMIT 3000", $ids);
    }
    kn_json(['ok' => true, 'lead' => $lead, 'sessions' => $sessions, 'evenements' => $evenements]);
}

if ($action === 'maj' && $methode === 'POST') {
    $e = kn_entree(16384);
    $id = (int) ($e['id'] ?? 0);
    $champs = [];
    $valeurs = [];
    if (isset($e['statut']) && in_array($e['statut'], KN_STATUTS, true)) {
        $champs[] = 'statut = ?';
        $valeurs[] = $e['statut'];
    }
    if (array_key_exists('valeur', $e)) {
        $champs[] = 'valeur = ?';
        $valeurs[] = is_numeric($e['valeur']) ? max(0, (int) $e['valeur']) : null;
    }
    foreach (['notes' => 8000, 'origine_declaree' => 120, 'entreprise' => 150] as $champ => $max) {
        if (array_key_exists($champ, $e)) {
            $champs[] = "$champ = ?";
            $valeurs[] = kn_texte($e[$champ], $max);
        }
    }
    if (!$champs || $id <= 0) {
        kn_json(['ok' => false], 400);
    }
    $champs[] = 'maj = ?';
    $valeurs[] = kn_maintenant();
    $valeurs[] = $id;
    $db->prepare('UPDATE leads SET ' . implode(', ', $champs) . ' WHERE id = ?')->execute($valeurs);
    kn_json(['ok' => true]);
}

if ($action === 'ajout' && $methode === 'POST') {
    // Lead saisi à la main (appel, recommandation, salon…)
    $e = kn_entree(16384);
    $db->prepare("INSERT INTO leads (date, formulaire, nom, email, telephone, entreprise, projet, message, origine_declaree, canal, source, premier_canal, premiere_source, statut, maj, import)
        VALUES (?, 'manuel', ?, ?, ?, ?, ?, ?, ?, 'Hors site', ?, 'Hors site', ?, ?, ?, 'manuel')")->execute([
        is_numeric($e['date'] ?? null) ? (int) $e['date'] : kn_maintenant(),
        kn_texte($e['nom'] ?? null, 150), kn_texte($e['email'] ?? null, 200), kn_texte($e['telephone'] ?? null, 40),
        kn_texte($e['entreprise'] ?? null, 150), kn_texte($e['projet'] ?? null, 120), kn_texte($e['message'] ?? null, 6000),
        kn_texte($e['origine'] ?? null, 120), kn_texte($e['origine'] ?? null, 120) ?? 'Hors site', kn_texte($e['origine'] ?? null, 120) ?? 'Hors site',
        in_array($e['statut'] ?? '', KN_STATUTS, true) ? $e['statut'] : 'nouveau', kn_maintenant(),
    ]);
    kn_json(['ok' => true, 'id' => (int) $db->lastInsertId()]);
}

// --- Visites ---------------------------------------------------------------------
if ($action === 'sessions') {
    $filtre = (string) ($_GET['canal'] ?? '');
    $sql = 'SELECT s.*, (SELECT COUNT(*) FROM evenements e WHERE e.session = s.id) AS nb_evenements
        FROM sessions s WHERE s.debut >= ? AND s.debut < ?';
    $params = [$debut, $fin];
    if ($filtre !== '') {
        $sql .= ' AND s.canal = ?';
        $params[] = $filtre;
    }
    $sql .= ' ORDER BY s.debut DESC LIMIT 300';
    kn_json(['ok' => true, 'sessions' => kn_tous($db, $sql, $params)]);
}

if ($action === 'session') {
    $id = kn_id_valide($_GET['id'] ?? null);
    $s = kn_tous($db, 'SELECT * FROM sessions WHERE id = ?', [$id]);
    if (!$s) {
        kn_json(['ok' => false], 404);
    }
    $autres = $s[0]['visiteur'] ? kn_tous($db, 'SELECT id, debut, canal, source, pages FROM sessions WHERE visiteur = ? AND id != ? ORDER BY debut', [$s[0]['visiteur'], $id]) : [];
    kn_json(['ok' => true, 'session' => $s[0], 'autres' => $autres,
        'evenements' => kn_tous($db, 'SELECT date, type, chemin, donnees FROM evenements WHERE session = ? ORDER BY date', [$id])]);
}

// --- Export et compte ------------------------------------------------------------
// --- Exports --------------------------------------------------------------------
// quoi = demandes (toutes), visites et evenements (période choisie, j=0 pour
// tout), tout (JSON des trois, plus le blog), base (copie de la base SQLite).
if ($action === 'export') {
    $quoi = (string) ($_GET['quoi'] ?? 'demandes');
    $jour = date('Y-m-d');
    $pDebut = $jours > 0 ? $debut : 0;
    $horodatage = fn($ms) => $ms === null ? null : date('Y-m-d H:i:s', (int) ((int) $ms / 1000));

    $csv = function (string $nom, array $colonnes, iterable $lignes) {
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . $nom . '"');
        header('Cache-Control: no-store');
        $sortie = fopen('php://output', 'w');
        fwrite($sortie, "\xEF\xBB\xBF");
        fputcsv($sortie, $colonnes, ';', '"', '');
        foreach ($lignes as $l) {
            fputcsv($sortie, array_map(fn($c) => $l[$c] ?? null, $colonnes), ';', '"', '');
        }
        exit;
    };

    if ($quoi === 'visites') {
        $q = $db->prepare('SELECT *, CAST((fin - debut) / 1000 AS INTEGER) AS duree_s FROM sessions WHERE debut >= ? AND debut < ? ORDER BY debut DESC');
        $q->execute([$pDebut, $fin]);
        $lignes = (function () use ($q, $horodatage) {
            while ($l = $q->fetch()) {
                $l['debut'] = $horodatage($l['debut']);
                $l['fin'] = $horodatage($l['fin']);
                yield $l;
            }
        })();
        $csv("visites-kinome-$jour.csv", ['id', 'visiteur', 'debut', 'fin', 'duree_s', 'pages', 'canal', 'source', 'referrer', 'utm', 'atterrissage',
            'appareil', 'navigateur', 'os', 'ecran', 'langue', 'visite_n', 'lead_id'], $lignes);
    }
    if ($quoi === 'evenements') {
        $q = $db->prepare('SELECT e.id, e.date, e.session, s.visiteur, s.canal, s.source, s.appareil, s.atterrissage, e.type, e.chemin, e.donnees
            FROM evenements e LEFT JOIN sessions s ON s.id = e.session WHERE e.date >= ? AND e.date < ? ORDER BY e.date');
        $q->execute([$pDebut, $fin]);
        $lignes = (function () use ($q, $horodatage) {
            while ($l = $q->fetch()) {
                $l['date'] = $horodatage($l['date']);
                yield $l;
            }
        })();
        $csv("interactions-kinome-$jour.csv", ['id', 'date', 'session', 'visiteur', 'canal', 'source', 'appareil', 'atterrissage', 'type', 'chemin', 'donnees'], $lignes);
    }
    if ($quoi === 'tout') {
        header('Content-Type: application/json; charset=utf-8');
        header('Content-Disposition: attachment; filename="kinome-donnees-' . $jour . '.json"');
        header('Cache-Control: no-store');
        $blog = [];
        if (is_file(__DIR__ . '/data/stats.json')) {
            $blog = json_decode((string) file_get_contents(__DIR__ . '/data/stats.json'), true)['articles'] ?? [];
        }
        echo json_encode([
            'site' => 'agence-kinome.ch',
            'exporte_le' => date('c'),
            'periode' => ['debut' => $horodatage($pDebut), 'fin' => $horodatage($fin), 'jours' => $jours],
            'sessions' => kn_tous($db, 'SELECT * FROM sessions WHERE debut >= ? AND debut < ? ORDER BY debut', [$pDebut, $fin]),
            'evenements' => kn_tous($db, 'SELECT id, session, date, type, chemin, donnees FROM evenements WHERE date >= ? AND date < ? ORDER BY date', [$pDebut, $fin]),
            'leads' => kn_tous($db, 'SELECT * FROM leads ORDER BY date'),
            'blog' => $blog,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    if ($quoi === 'base') {
        // Copie cohérente de la base (VACUUM INTO), puis envoi et suppression
        $copie = sys_get_temp_dir() . '/kinome-export-' . bin2hex(random_bytes(6)) . '.sqlite';
        try {
            $db->exec('VACUUM INTO ' . $db->quote($copie));
        } catch (Throwable $e) {
            $db->exec('PRAGMA wal_checkpoint(TRUNCATE)');
            copy(kn_dossier_donnees() . '/kinome.sqlite', $copie);
        }
        header('Content-Type: application/vnd.sqlite3');
        header('Content-Disposition: attachment; filename="kinome-' . $jour . '.sqlite"');
        header('Content-Length: ' . filesize($copie));
        header('Cache-Control: no-store');
        readfile($copie);
        @unlink($copie);
        exit;
    }
    // demandes (toutes périodes)
    $colonnes = ['id', 'date', 'formulaire', 'nom', 'email', 'telephone', 'entreprise', 'projet', 'site', 'origine_declaree', 'canal', 'source',
        'premier_canal', 'premiere_source', 'premiere_visite', 'nb_visites', 'statut', 'valeur', 'notes', 'message'];
    $lignes = array_map(function ($l) use ($horodatage) {
        $l['date'] = $horodatage($l['date']);
        $l['premiere_visite'] = $horodatage($l['premiere_visite']);
        return $l;
    }, kn_tous($db, 'SELECT ' . implode(', ', $colonnes) . ' FROM leads ORDER BY date DESC'));
    $csv("demandes-kinome-$jour.csv", $colonnes, $lignes);
}

if ($action === 'motdepasse' && $methode === 'POST') {
    $e = kn_entree(2048);
    $hash = kn_hash_mot_de_passe($db);
    $nouveau = (string) ($e['nouveau'] ?? '');
    if (!$hash || !password_verify((string) ($e['actuel'] ?? ''), $hash)) {
        kn_json(['ok' => false, 'erreur' => 'Mot de passe actuel incorrect.'], 400);
    }
    if (mb_strlen($nouveau) < 12) {
        kn_json(['ok' => false, 'erreur' => '12 caractères minimum.'], 400);
    }
    $db->prepare("INSERT INTO reglages (cle, valeur) VALUES ('mot_de_passe', ?) ON CONFLICT(cle) DO UPDATE SET valeur = excluded.valeur")
        ->execute([password_hash($nouveau, PASSWORD_DEFAULT)]);
    // Toutes les autres sessions ouvertes sont déconnectées
    $actuel = hash('sha256', (string) ($_COOKIE[KN_COOKIE] ?? ''));
    $db->prepare('DELETE FROM jetons WHERE empreinte != ?')->execute([$actuel]);
    kn_json(['ok' => true]);
}

if ($action === 'moi') {
    kn_json(['ok' => true]);
}

kn_json(['ok' => false, 'erreur' => 'action_inconnue'], 404);
