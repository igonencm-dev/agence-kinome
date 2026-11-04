<?php
// API du tableau de bord /admin/ et du CRM /crm/. Authentification par mot de
// passe commun (hash dans data/config.php, ou dans la base après un changement)
// ou par compte personnel (table comptes, 04/11/2026). La session est un jeton
// aléatoire dont seule l'empreinte est stockée. Cookie HttpOnly, Secure,
// SameSite=Strict, limité à /api/. Cinq échecs en quinze minutes bloquent la
// connexion depuis cette adresse. Claude peut aussi appeler les actions du CRM
// avec une clé d'accès personnelle (_crm.php), jamais les exports ni les réglages.
declare(strict_types=1);
require __DIR__ . '/_lib.php';
require __DIR__ . '/_crm.php';

const KN_COOKIE = 'kn_admin';
const KN_DUREE_JETON_MS = 30 * 24 * 3600 * 1000;
// Ce qu'une clé d'accès (Claude) a le droit de faire
const KN_ACTIONS_CLE = ['moi', 'crm', 'lead', 'ajout', 'maj', 'note', 'fichier_get'];

$db = kn_db();
$action = (string) ($_GET['a'] ?? '');
$methode = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');

// Toute écriture exige l'en-tête maison : un formulaire tiers ne peut pas le poser.
// Une clé d'accès n'est jamais envoyée d'office par un navigateur : elle en est dispensée.
if ($methode === 'POST' && ($_SERVER['HTTP_X_KN'] ?? '') !== '1' && kn_cle_api_recue() === null) {
    kn_json(['ok' => false], 403);
}

function kn_hash_mot_de_passe(PDO $db): ?string
{
    $q = $db->query("SELECT valeur FROM reglages WHERE cle = 'mot_de_passe'")->fetchColumn();
    return $q ?: (kn_config()['mot_de_passe'] ?? null);
}

/** Qui est connecté : compte personnel, mot de passe commun (« Équipe ») ou clé d'accès. null sinon. */
function kn_session(PDO $db): ?array
{
    // Une requête qui porte une clé n'est jugée que sur elle, jamais sur le cookie :
    // la dispense d'en-tête X-KN ne profite ainsi qu'aux clés valides.
    if (kn_cle_api_recue() !== null) {
        return kn_crm_par_cle($db);
    }
    $jeton = (string) ($_COOKIE[KN_COOKIE] ?? '');
    if (strlen($jeton) === 64) {
        $r = kn_tous($db, 'SELECT j.compte, c.nom, c.identifiant FROM jetons j LEFT JOIN comptes c ON c.id = j.compte
            WHERE j.empreinte = ? AND j.expire > ?', [hash('sha256', $jeton), kn_maintenant()])[0] ?? null;
        if ($r && ($r['compte'] === null || $r['nom'] !== null)) {
            return ['compte' => $r['compte'] === null ? null : (int) $r['compte'], 'nom' => $r['nom'] ?? 'Équipe',
                'identifiant' => $r['identifiant'], 'cle' => false];
        }
    }
    return null;
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
    $motDePasse = (string) ($entree['motdepasse'] ?? '');
    $identifiant = kn_texte($entree['identifiant'] ?? null, 60);
    $hash = null;
    $compte = null;
    if ($identifiant !== null) {
        // Compte personnel (CRM) : identifiant et mot de passe
        $c = kn_tous($db, 'SELECT id, hash FROM comptes WHERE identifiant = ?', [$identifiant])[0] ?? null;
        $ok = $c !== null && password_verify($motDePasse, (string) $c['hash']);
        $compte = $ok ? (int) $c['id'] : null;
    } else {
        $hash = kn_hash_mot_de_passe($db);
        $ok = $hash && password_verify($motDePasse, $hash);
    }
    $db->prepare('INSERT INTO connexions (ip, date, reussie) VALUES (?, ?, ?)')->execute([$ip, kn_maintenant(), $ok ? 1 : 0]);
    if (!$ok) {
        usleep(400000);
        kn_json(['ok' => false, 'erreur' => $identifiant !== null ? 'Identifiant ou mot de passe incorrect.'
            : ($hash ? 'Mot de passe incorrect.' : 'Aucun mot de passe configuré sur le serveur.')], 401);
    }
    $jeton = bin2hex(random_bytes(32));
    $db->prepare('INSERT INTO jetons (empreinte, expire, compte) VALUES (?, ?, ?)')
        ->execute([hash('sha256', $jeton), kn_maintenant() + KN_DUREE_JETON_MS, $compte]);
    if ($compte !== null) {
        $db->prepare('UPDATE comptes SET derniere_connexion = ? WHERE id = ?')->execute([kn_maintenant(), $compte]);
    }
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

$moi = kn_session($db);
if ($moi === null) {
    kn_json(['ok' => false, 'erreur' => 'non_connecte'], 401);
}
if ($moi['cle'] && !in_array($action, KN_ACTIONS_CLE, true)) {
    kn_json(['ok' => false, 'erreur' => 'Action réservée à l\'interface.'], 403);
}

// --- Outils de requête -------------------------------------------------------
// Décalage horaire de Genève (heure d'été comprise) pour regrouper par jour et par heure
// (fuseau posé par _crm.php ; kn_tous et kn_un y sont définis)
$tz = sprintf("'%+d seconds'", (int) date('Z'));
$jours = max(0, min(3650, (int) ($_GET['j'] ?? 30)));
$fin = kn_maintenant();
$debut = $jours > 0 ? $fin - $jours * 86400 * 1000 : 0;

/** Totaux d'une période, réutilisés pour comparer avec la période précédente. */
function kn_totaux(PDO $db, int $debut, int $fin): array
{
    $sessions = (int) kn_un($db, 'SELECT COUNT(*) FROM sessions_utiles WHERE debut >= ? AND debut < ?', [$debut, $fin]);
    $leads = (int) kn_un($db, "SELECT COUNT(*) FROM leads WHERE date >= ? AND date < ? AND statut != 'spam'", [$debut, $fin]);
    return [
        'sessions' => $sessions,
        'visiteurs' => (int) kn_un($db, 'SELECT COUNT(DISTINCT COALESCE(visiteur, id)) FROM sessions_utiles WHERE debut >= ? AND debut < ?', [$debut, $fin]),
        'pages' => (int) kn_un($db, 'SELECT COALESCE(SUM(pages), 0) FROM sessions_utiles WHERE debut >= ? AND debut < ?', [$debut, $fin]),
        'leads' => $leads,
        'conversion' => $sessions > 0 ? round($leads / $sessions * 100, 2) : 0,
        // Temps de lecture réel (29/10/2026) : page visible au premier plan, additionné par visite
        // et plafonné à 30 minutes. L'écart entre premier et dernier envoi comptait les onglets
        // restés ouverts (une nuit entière parfois) : 69 minutes de « durée moyenne » sur 30 jours.
        'duree_moyenne_s' => (int) round((float) kn_un($db, "SELECT AVG(MIN(COALESCE(l.total, 0), 1800000)) FROM sessions_utiles s
            LEFT JOIN (SELECT session, SUM(json_extract(donnees, '$.duree')) AS total FROM evenements WHERE type = 'lecture' GROUP BY session) l ON l.session = s.id
            WHERE s.debut >= ? AND s.debut < ?", [$debut, $fin]) / 1000),
        'rebond' => $sessions > 0 ? round((int) kn_un($db, 'SELECT COUNT(*) FROM sessions_utiles WHERE debut >= ? AND debut < ? AND pages <= 1', [$debut, $fin]) / $sessions * 100, 1) : 0,
        'ia' => (int) kn_un($db, "SELECT COUNT(*) FROM sessions_utiles WHERE debut >= ? AND debut < ? AND canal = 'IA'", [$debut, $fin]),
        // Visites éclair (vue sessions_utiles, _lib.php) : écartées des chiffres ci-dessus
        'eclair' => (int) kn_un($db, 'SELECT COUNT(*) FROM sessions WHERE debut >= ? AND debut < ?', [$debut, $fin]) - $sessions,
    ];
}

// --- Tableau de bord -----------------------------------------------------------
if ($action === 'stats') {
    $p = [$debut, $fin];
    $precedente = $jours > 0 ? kn_totaux($db, $debut - ($fin - $debut), $debut) : null;

    // Série par jour (heure de Paris)
    $serie = kn_tous($db, "SELECT date(debut / 1000, 'unixepoch', $tz) AS jour, COUNT(*) AS sessions,
            SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads
        FROM sessions_utiles WHERE debut >= ? AND debut < ? GROUP BY jour ORDER BY jour", $p);

    $canaux = kn_tous($db, "SELECT s.canal, COUNT(*) AS sessions, SUM(CASE WHEN s.lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads,
            ROUND(AVG(s.pages), 1) AS pages_moy, CAST(AVG(MIN(COALESCE(l.total, 0), 1800000)) / 1000 AS INTEGER) AS duree_moy
        FROM sessions_utiles s LEFT JOIN (SELECT session, SUM(json_extract(donnees, '$.duree')) AS total FROM evenements WHERE type = 'lecture' GROUP BY session) l ON l.session = s.id
        WHERE s.debut >= ? AND s.debut < ? GROUP BY s.canal ORDER BY sessions DESC", $p);
    $sources = kn_tous($db, 'SELECT canal, source, COUNT(*) AS sessions, SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads
        FROM sessions_utiles WHERE debut >= ? AND debut < ? GROUP BY canal, source ORDER BY sessions DESC LIMIT 40', $p);
    $entrees = kn_tous($db, 'SELECT atterrissage AS chemin, COUNT(*) AS sessions, SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads,
            ROUND(100.0 * SUM(CASE WHEN pages <= 1 THEN 1 ELSE 0 END) / COUNT(*), 0) AS rebond
        FROM sessions_utiles WHERE debut >= ? AND debut < ? GROUP BY atterrissage ORDER BY sessions DESC LIMIT 25', $p);
    $pages = kn_tous($db, "SELECT e.chemin, COUNT(*) AS vues, COUNT(DISTINCT e.session) AS sessions,
            CAST((SELECT SUM(json_extract(l.donnees, '$.duree')) FROM evenements l
              WHERE l.type = 'lecture' AND l.chemin = e.chemin AND l.date >= ? AND l.date < ?
                AND l.session IN (SELECT id FROM sessions_utiles)) / COUNT(*) / 1000 AS INTEGER) AS lecture_moy,
            (SELECT CAST(AVG(json_extract(l.donnees, '$.scroll')) AS INTEGER) FROM evenements l
              WHERE l.type = 'lecture' AND l.chemin = e.chemin AND l.date >= ? AND l.date < ?
                AND l.session IN (SELECT id FROM sessions_utiles)) AS scroll_moy
        FROM evenements e WHERE e.type = 'vue' AND e.date >= ? AND e.date < ?
          AND e.session IN (SELECT id FROM sessions_utiles) GROUP BY e.chemin ORDER BY vues DESC LIMIT 30",
        [$debut, $fin, $debut, $fin, $debut, $fin]);
    $appareils = kn_tous($db, 'SELECT appareil, COUNT(*) AS sessions, SUM(CASE WHEN lead_id IS NOT NULL THEN 1 ELSE 0 END) AS leads
        FROM sessions_utiles WHERE debut >= ? AND debut < ? GROUP BY appareil ORDER BY sessions DESC', $p);
    $clics = kn_tous($db, "SELECT json_extract(donnees, '$.cible') AS cible, json_extract(donnees, '$.libelle') AS libelle, COUNT(*) AS n
        FROM evenements WHERE type = 'clic' AND date >= ? AND date < ? GROUP BY cible, libelle ORDER BY n DESC LIMIT 25", $p);

    // Entonnoir : visite, page de conversion vue, formulaire commencé, demande envoyée
    $entonnoir = [
        ['etape' => 'Visites', 'n' => (int) kn_un($db, 'SELECT COUNT(*) FROM sessions_utiles WHERE debut >= ? AND debut < ?', $p)],
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
        FROM sessions_utiles WHERE debut >= ? AND debut < ? GROUP BY heure ORDER BY heure", $p);
    $enDirect = (int) kn_un($db, 'SELECT COUNT(*) FROM sessions_utiles WHERE fin > ?', [$fin - 5 * 60 * 1000]);

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
    // CRM : fil de suivi et PDF joints
    $fiche = kn_crm_fiche($db, $id);
    kn_json(['ok' => true, 'lead' => $lead, 'sessions' => $sessions, 'evenements' => $evenements,
        'suivis' => $fiche['suivis'] ?? [], 'fichiers' => $fiche['fichiers'] ?? []]);
}

if ($action === 'maj' && $methode === 'POST') {
    $e = kn_entree(16384);
    $id = (int) ($e['id'] ?? 0);
    if ($id <= 0 || !kn_crm_maj($db, $id, $e, $moi['nom'])) {
        kn_json(['ok' => false, 'erreur' => 'Fiche introuvable.'], 404);
    }
    kn_json(['ok' => true]);
}

if ($action === 'ajout' && $methode === 'POST') {
    // Fiche saisie à la main (appel, recommandation, rencontre…)
    $id = kn_crm_ajouter($db, kn_entree(16384), $moi['nom']);
    if ($id === null) {
        kn_json(['ok' => false, 'erreur' => 'Indiquez au moins une entreprise ou un nom.'], 400);
    }
    kn_json(['ok' => true, 'id' => $id]);
}

// --- CRM (/crm/) -------------------------------------------------------------------
if ($action === 'crm') {
    kn_json(['ok' => true, 'leads' => kn_crm_liste($db, [
        'statut' => (string) ($_GET['statut'] ?? ''),
        'responsable' => (string) ($_GET['responsable'] ?? ''),
        'recherche' => kn_texte($_GET['q'] ?? null, 100),
    ]), 'equipe' => kn_crm_equipe($db)]);
}

if ($action === 'note' && $methode === 'POST') {
    $e = kn_entree(16384);
    if (!kn_crm_noter($db, (int) ($e['id'] ?? 0), $e['texte'] ?? null, $moi['nom'])) {
        kn_json(['ok' => false, 'erreur' => 'Message vide ou fiche introuvable.'], 400);
    }
    kn_json(['ok' => true]);
}

if ($action === 'fichier' && $methode === 'POST') {
    $r = kn_crm_joindre($db, (int) ($_POST['id'] ?? 0), (array) ($_FILES['fichier'] ?? []), $moi['nom']);
    kn_json($r, $r['ok'] ? 200 : 400);
}

if ($action === 'fichier_get') {
    kn_crm_envoyer_fichier($db, (int) ($_GET['id'] ?? 0));
}

if ($action === 'fichier_suppr' && $methode === 'POST') {
    $e = kn_entree(1024);
    kn_json(['ok' => kn_crm_retirer_fichier($db, (int) ($e['id'] ?? 0), $moi['nom'])]);
}

// Comptes personnels : chacun signe ses messages dans le fil
if ($action === 'comptes') {
    kn_json(['ok' => true, 'comptes' => kn_tous($db, 'SELECT id, identifiant, nom, cree, derniere_connexion FROM comptes ORDER BY nom')]);
}

if ($action === 'compte_ajout' && $methode === 'POST') {
    $e = kn_entree(2048);
    $identifiant = strtolower(trim((string) ($e['identifiant'] ?? '')));
    $nom = kn_texte($e['nom'] ?? null, 40);
    $mdp = (string) ($e['motdepasse'] ?? '');
    if (!preg_match('/^[a-z0-9._-]{2,30}$/', $identifiant) || $nom === null) {
        kn_json(['ok' => false, 'erreur' => 'Identifiant (lettres, chiffres, point, tiret) et nom requis.'], 400);
    }
    if (mb_strlen($mdp) < 12) {
        kn_json(['ok' => false, 'erreur' => 'Mot de passe : 12 caractères minimum.'], 400);
    }
    if (kn_un($db, 'SELECT 1 FROM comptes WHERE identifiant = ?', [$identifiant])) {
        kn_json(['ok' => false, 'erreur' => 'Cet identifiant existe déjà.'], 400);
    }
    $db->prepare('INSERT INTO comptes (identifiant, nom, hash, cree) VALUES (?, ?, ?, ?)')
        ->execute([$identifiant, $nom, password_hash($mdp, PASSWORD_DEFAULT), kn_maintenant()]);
    kn_json(['ok' => true]);
}

if ($action === 'compte_suppr' && $methode === 'POST') {
    $id = (int) (kn_entree(1024)['id'] ?? 0);
    if ($id === $moi['compte']) {
        kn_json(['ok' => false, 'erreur' => 'Impossible de supprimer son propre compte.'], 400);
    }
    $db->prepare('DELETE FROM jetons WHERE compte = ?')->execute([$id]);
    $db->prepare('DELETE FROM cles_api WHERE compte = ?')->execute([$id]);
    $db->prepare('DELETE FROM comptes WHERE id = ?')->execute([$id]);
    kn_json(['ok' => true]);
}

if ($action === 'compte_mdp' && $methode === 'POST') {
    // Mot de passe du compte personnel connecté (le mot de passe commun se change par « motdepasse »)
    $e = kn_entree(2048);
    $hashCompte = $moi['compte'] !== null ? kn_un($db, 'SELECT hash FROM comptes WHERE id = ?', [$moi['compte']]) : null;
    if (!$hashCompte || !password_verify((string) ($e['actuel'] ?? ''), (string) $hashCompte)) {
        kn_json(['ok' => false, 'erreur' => 'Mot de passe actuel incorrect.'], 400);
    }
    if (mb_strlen((string) ($e['nouveau'] ?? '')) < 12) {
        kn_json(['ok' => false, 'erreur' => '12 caractères minimum.'], 400);
    }
    $db->prepare('UPDATE comptes SET hash = ? WHERE id = ?')->execute([password_hash((string) $e['nouveau'], PASSWORD_DEFAULT), $moi['compte']]);
    $db->prepare('DELETE FROM jetons WHERE compte = ? AND empreinte != ?')->execute([$moi['compte'], hash('sha256', (string) ($_COOKIE[KN_COOKIE] ?? ''))]);
    kn_json(['ok' => true]);
}

// Clés d'accès pour Claude : rattachées au compte personnel, affichées une seule fois
if ($action === 'cles') {
    kn_json(['ok' => true, 'cles' => $moi['compte'] === null ? []
        : kn_tous($db, 'SELECT id, libelle, cree, derniere FROM cles_api WHERE compte = ? ORDER BY cree DESC', [$moi['compte']])]);
}

if ($action === 'cle_creer' && $methode === 'POST') {
    if ($moi['compte'] === null) {
        kn_json(['ok' => false, 'erreur' => 'Connectez-vous avec votre compte personnel pour créer une clé.'], 400);
    }
    $cle = kn_crm_nouvelle_cle();
    $db->prepare('INSERT INTO cles_api (empreinte, compte, libelle, cree) VALUES (?, ?, ?, ?)')
        ->execute([hash('sha256', $cle), $moi['compte'], kn_texte(kn_entree(1024)['libelle'] ?? null, 60) ?? 'Claude', kn_maintenant()]);
    kn_json(['ok' => true, 'cle' => $cle]);
}

if ($action === 'cle_suppr' && $methode === 'POST') {
    $db->prepare('DELETE FROM cles_api WHERE id = ? AND compte = ?')->execute([(int) (kn_entree(1024)['id'] ?? 0), $moi['compte']]);
    kn_json(['ok' => true]);
}

// Webhook Causerie (contacts du chatbot, causerie.php) : secret collé par Mathias, jamais réaffiché
if ($action === 'secret_causerie' && $methode === 'POST') {
    $secret = trim((string) (kn_entree(2048)['secret'] ?? ''));
    if (strlen($secret) < 16 || strlen($secret) > 200) {
        kn_json(['ok' => false, 'erreur' => 'Secret invalide : copiez-le depuis le dashboard Causerie.'], 400);
    }
    $db->prepare("INSERT INTO reglages (cle, valeur) VALUES ('causerie_secret', ?) ON CONFLICT(cle) DO UPDATE SET valeur = excluded.valeur")->execute([$secret]);
    kn_json(['ok' => true]);
}

if ($action === 'etat_causerie') {
    kn_json(['ok' => true,
        'secret' => (bool) kn_un($db, "SELECT 1 FROM reglages WHERE cle = 'causerie_secret'"),
        'dernier_test' => (int) (kn_un($db, "SELECT valeur FROM reglages WHERE cle = 'causerie_test'") ?: 0),
        'dernier_contact' => (int) (kn_un($db, "SELECT MAX(date) FROM leads WHERE formulaire = 'chatbot'") ?: 0)]);
}

// --- Visites ---------------------------------------------------------------------
if ($action === 'sessions') {
    $filtre = (string) ($_GET['canal'] ?? '');
    $sql = 'SELECT s.*, (SELECT COUNT(*) FROM evenements e WHERE e.session = s.id) AS nb_evenements,
            CASE WHEN s.id IN (SELECT id FROM sessions_utiles) THEN 0 ELSE 1 END AS eclair,
            (SELECT COALESCE(SUM(json_extract(l.donnees, \'$.duree\')), 0) FROM evenements l WHERE l.session = s.id AND l.type = \'lecture\') AS lecture_ms
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
        $q = $db->prepare('SELECT *, CAST((fin - debut) / 1000 AS INTEGER) AS duree_s,
            CASE WHEN id IN (SELECT id FROM sessions_utiles) THEN 0 ELSE 1 END AS eclair,
            CAST((SELECT COALESCE(SUM(json_extract(l.donnees, \'$.duree\')), 0) FROM evenements l
              WHERE l.session = sessions.id AND l.type = \'lecture\') / 1000 AS INTEGER) AS lecture_s
            FROM sessions WHERE debut >= ? AND debut < ? ORDER BY debut DESC');
        $q->execute([$pDebut, $fin]);
        $lignes = (function () use ($q, $horodatage) {
            while ($l = $q->fetch()) {
                $l['debut'] = $horodatage($l['debut']);
                $l['fin'] = $horodatage($l['fin']);
                yield $l;
            }
        })();
        $csv("visites-kinome-$jour.csv", ['id', 'visiteur', 'debut', 'fin', 'duree_s', 'lecture_s', 'pages', 'canal', 'source', 'referrer', 'utm', 'atterrissage',
            'appareil', 'navigateur', 'os', 'ecran', 'langue', 'visite_n', 'lead_id', 'eclair'], $lignes);
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
    kn_json(['ok' => true, 'moi' => ['nom' => $moi['nom'], 'identifiant' => $moi['identifiant'], 'compte' => $moi['compte']],
        'equipe' => kn_crm_equipe($db)]);
}

kn_json(['ok' => false, 'erreur' => 'action_inconnue'], 404);
