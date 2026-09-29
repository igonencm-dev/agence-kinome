<?php
// Bibliothèque commune du suivi et de l'administration d'agence-kinome.ch.
// Incluse par t.php (collecte), contact.php (demandes) et admin.php (tableau
// de bord). Portée du système de codecircle.fr le 29/09/2026. Jamais servie directement : .htaccess bloque les fichiers « _* ».
//
// Les données vivent HORS du public_html (domains/agence-kinome.ch/data/) :
// la base SQLite et la configuration ne sont jamais accessibles par le web.
// Compatible PHP 8.1 et plus (8.2 sur l'hébergement Hostinger).
declare(strict_types=1);

// Durées de conservation (CNIL, LPD suisse) : 25 mois pour la mesure d'audience,
// 3 ans après le dernier contact pour les demandes commerciales.
const KN_RETENTION_EVENEMENTS_MS = 25 * 30 * 24 * 3600 * 1000;

function kn_dossier_donnees(): string
{
    $env = getenv('KN_DATA');
    return ($env !== false && $env !== '') ? $env : dirname(__DIR__, 2) . '/data';
}

/** Configuration posée à la main sur le serveur (hash du mot de passe, sel). */
function kn_config(): array
{
    static $config = null;
    if ($config === null) {
        $f = kn_dossier_donnees() . '/config.php';
        $config = is_file($f) ? (array) require $f : [];
    }
    return $config;
}

function kn_maintenant(): int
{
    return (int) round(microtime(true) * 1000);
}

function kn_db(): PDO
{
    static $db = null;
    if ($db instanceof PDO) {
        return $db;
    }
    $dossier = kn_dossier_donnees();
    if (!is_dir($dossier)) {
        mkdir($dossier, 0700, true);
    }
    $db = new PDO('sqlite:' . $dossier . '/kinome.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $db->exec('PRAGMA journal_mode = WAL');
    $db->exec('PRAGMA busy_timeout = 4000');
    kn_migrer($db);
    return $db;
}

// Schéma versionné par PRAGMA user_version : chaque palier s'applique une fois.
function kn_migrer(PDO $db): void
{
    $version = (int) $db->query('PRAGMA user_version')->fetchColumn();
    if ($version < 1) {
        $db->exec(<<<SQL
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                visiteur TEXT,
                debut INTEGER NOT NULL,
                fin INTEGER NOT NULL,
                canal TEXT,
                source TEXT,
                referrer TEXT,
                utm TEXT,
                atterrissage TEXT,
                pages INTEGER NOT NULL DEFAULT 0,
                appareil TEXT,
                navigateur TEXT,
                os TEXT,
                ecran TEXT,
                langue TEXT,
                visite_n INTEGER,
                lead_id INTEGER
            );
            CREATE INDEX IF NOT EXISTS idx_sessions_debut ON sessions(debut);
            CREATE INDEX IF NOT EXISTS idx_sessions_visiteur ON sessions(visiteur);

            CREATE TABLE IF NOT EXISTS evenements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                uid TEXT UNIQUE,
                session TEXT NOT NULL,
                date INTEGER NOT NULL,
                type TEXT NOT NULL,
                chemin TEXT,
                donnees TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_evenements_session ON evenements(session);
            CREATE INDEX IF NOT EXISTS idx_evenements_date ON evenements(date);
            CREATE INDEX IF NOT EXISTS idx_evenements_type ON evenements(type, date);

            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date INTEGER NOT NULL,
                formulaire TEXT,
                nom TEXT,
                email TEXT,
                telephone TEXT,
                entreprise TEXT,
                projet TEXT,
                message TEXT,
                site TEXT,
                origine_declaree TEXT,
                canal TEXT,
                source TEXT,
                premier_canal TEXT,
                premiere_source TEXT,
                premiere_visite INTEGER,
                nb_visites INTEGER,
                session TEXT,
                visiteur TEXT,
                contexte TEXT,
                statut TEXT NOT NULL DEFAULT 'nouveau',
                valeur INTEGER,
                notes TEXT,
                maj INTEGER,
                import TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_leads_date ON leads(date);

            CREATE TABLE IF NOT EXISTS jetons (
                empreinte TEXT PRIMARY KEY,
                expire INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS connexions (
                ip TEXT NOT NULL,
                date INTEGER NOT NULL,
                reussie INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS reglages (
                cle TEXT PRIMARY KEY,
                valeur TEXT
            );
        SQL);
        $db->exec('PRAGMA user_version = 1');
    }
}

/** Réponse JSON, jamais mise en cache (LiteSpeed cache agressivement). */
function kn_json($donnees, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($donnees, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Corps JSON de la requête, borné en taille. */
function kn_entree(int $max = 65536): array
{
    $brut = file_get_contents('php://input', false, null, 0, $max + 1);
    if ($brut === false || strlen($brut) > $max) {
        kn_json(['ok' => false, 'erreur' => 'trop_gros'], 413);
    }
    $json = json_decode($brut, true);
    return is_array($json) ? $json : [];
}

function kn_texte($v, int $max = 500): ?string
{
    if (!is_string($v) && !is_numeric($v)) {
        return null;
    }
    $v = trim((string) $v);
    if ($v === '') {
        return null;
    }
    return mb_substr($v, 0, $max);
}

function kn_id_valide($v): ?string
{
    return (is_string($v) && preg_match('/^[a-z0-9]{8,40}$/i', $v)) ? $v : null;
}

// ---------------------------------------------------------------------------
// Classement de la provenance. C'est ici que se joue la question « d'où
// viennent nos leads » : un seul endroit, utilisé par la collecte et par
// l'import des anciens leads.
// ---------------------------------------------------------------------------

const KN_IA = [
    'chatgpt.com' => 'ChatGPT', 'chat.openai.com' => 'ChatGPT', 'openai.com' => 'ChatGPT',
    'perplexity.ai' => 'Perplexity', 'gemini.google.com' => 'Gemini', 'bard.google.com' => 'Gemini',
    'copilot.microsoft.com' => 'Copilot', 'claude.ai' => 'Claude', 'chat.mistral.ai' => 'Le Chat (Mistral)',
    'chat.deepseek.com' => 'DeepSeek', 'grok.com' => 'Grok', 'x.ai' => 'Grok', 'meta.ai' => 'Meta AI',
    'poe.com' => 'Poe', 'you.com' => 'You.com', 'phind.com' => 'Phind', 'kagi.com' => 'Kagi',
];
const KN_SOCIAUX = [
    'linkedin.com' => 'LinkedIn', 'lnkd.in' => 'LinkedIn', 'facebook.com' => 'Facebook', 'fb.com' => 'Facebook',
    'instagram.com' => 'Instagram', 't.co' => 'X (Twitter)', 'x.com' => 'X (Twitter)', 'twitter.com' => 'X (Twitter)',
    'youtube.com' => 'YouTube', 'tiktok.com' => 'TikTok', 'pinterest.com' => 'Pinterest', 'reddit.com' => 'Reddit',
];
const KN_ANNUAIRES = [
    'local.ch' => 'local.ch', 'search.ch' => 'search.ch', 'sortlist.ch' => 'Sortlist', 'sortlist.fr' => 'Sortlist',
    'sortlist.com' => 'Sortlist', 'clutch.co' => 'Clutch', 'moneyhouse.ch' => 'Moneyhouse', 'ccifs.ch' => 'CCIFS',
    'lafabriquedunet.fr' => 'La Fabrique du Net', 'codeur.com' => 'Codeur',
];
const KN_MOTEURS = [
    'bing.com' => 'Bing', 'duckduckgo.com' => 'DuckDuckGo', 'ecosia.org' => 'Ecosia', 'qwant.com' => 'Qwant',
    'yahoo.com' => 'Yahoo', 'search.brave.com' => 'Brave Search', 'yandex.ru' => 'Yandex', 'lilo.org' => 'Lilo',
];

function kn_hote_correspond(string $hote, array $table): ?string
{
    foreach ($table as $domaine => $nom) {
        if ($hote === $domaine || str_ends_with($hote, '.' . $domaine)) {
            return $nom;
        }
    }
    return null;
}

/** @return array{0:string,1:string} [canal, source détaillée] */
function kn_classer(?string $referrer, array $utm): array
{
    $src = strtolower((string) ($utm['utm_source'] ?? ''));
    $medium = strtolower((string) ($utm['utm_medium'] ?? ''));

    // ChatGPT Search ajoute ?utm_source=chatgpt.com à ses liens
    if ($src !== '') {
        $srcHote = preg_replace('/^https?:\/\//', '', $src);
        if ($ia = kn_hote_correspond($srcHote, KN_IA)) {
            return ['IA', $ia];
        }
    }
    if (!empty($utm['gclid']) || !empty($utm['gbraid']) || !empty($utm['wbraid']) || in_array($medium, ['cpc', 'ppc', 'paid', 'ads'], true)) {
        return ['Publicité', $src !== '' ? $src : 'Google Ads'];
    }
    if (in_array($medium, ['email', 'e-mail', 'newsletter'], true)) {
        return ['Email', $src !== '' ? $src : 'email'];
    }

    $hote = '';
    if ($referrer) {
        $hote = strtolower((string) parse_url($referrer, PHP_URL_HOST));
        $hote = preg_replace('/^www\./', '', $hote);
    }
    if ($hote !== '' && !str_ends_with($hote, 'agence-kinome.ch')) {
        if ($ia = kn_hote_correspond($hote, KN_IA)) {
            return ['IA', $ia];
        }
        if (preg_match('/(^|\.)google\.[a-z.]+$/', $hote)) {
            return ['Google', 'Google'];
        }
        if ($m = kn_hote_correspond($hote, KN_MOTEURS)) {
            return ['Autres moteurs', $m];
        }
        if ($r = kn_hote_correspond($hote, KN_SOCIAUX)) {
            return ['Réseaux sociaux', $r];
        }
        if ($a = kn_hote_correspond($hote, KN_ANNUAIRES)) {
            return ['Annuaires', $a];
        }
        if (preg_match('/mail\.|outlook\.|webmail/', $hote)) {
            return ['Email', $hote];
        }
        return ['Site référent', $hote];
    }
    if ($src !== '') {
        return ['Campagne', $src];
    }
    return ['Direct', 'Accès direct'];
}

// ---------------------------------------------------------------------------
// Appareil, navigateur, système : lecture grossière du User-Agent, suffisante
// pour un tableau de bord. Rien n'est gardé du User-Agent brut.
// ---------------------------------------------------------------------------

function kn_est_robot(string $ua): bool
{
    return $ua === '' || (bool) preg_match('/bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|curl|wget|python|axios|node-fetch|go-http|java\//i', $ua);
}

/** @return array{0:string,1:string,2:string} [appareil, navigateur, os] */
function kn_lire_ua(string $ua): array
{
    $appareil = preg_match('/iPad|Tablet|Android(?!.*Mobile)/i', $ua) ? 'Tablette'
        : (preg_match('/Mobi|iPhone|Android/i', $ua) ? 'Mobile' : 'Ordinateur');
    $navigateur = 'Autre';
    foreach (['Edg/' => 'Edge', 'OPR/' => 'Opera', 'SamsungBrowser' => 'Samsung', 'Firefox/' => 'Firefox', 'CriOS' => 'Chrome', 'Chrome/' => 'Chrome', 'Safari/' => 'Safari'] as $cle => $nom) {
        if (str_contains($ua, $cle)) {
            $navigateur = $nom;
            break;
        }
    }
    $os = 'Autre';
    foreach (['iPhone' => 'iOS', 'iPad' => 'iPadOS', 'Android' => 'Android', 'Windows' => 'Windows', 'Mac OS X' => 'macOS', 'CrOS' => 'ChromeOS', 'Linux' => 'Linux'] as $cle => $nom) {
        if (str_contains($ua, $cle)) {
            $os = $nom;
            break;
        }
    }
    return [$appareil, $navigateur, $os];
}

/** Empreinte d'IP salée, uniquement pour limiter les tentatives de connexion. */
function kn_empreinte_ip(): string
{
    $sel = (string) (kn_config()['sel'] ?? 'kinome');
    return substr(hash('sha256', $sel . ($_SERVER['REMOTE_ADDR'] ?? '')), 0, 24);
}

/** Purge occasionnelle (1 requête sur 200) des données trop anciennes. */
function kn_purger_parfois(PDO $db): void
{
    if (random_int(1, 200) !== 1) {
        return;
    }
    $limite = kn_maintenant() - KN_RETENTION_EVENEMENTS_MS;
    $db->prepare('DELETE FROM evenements WHERE date < ?')->execute([$limite]);
    $db->prepare('DELETE FROM sessions WHERE fin < ? AND lead_id IS NULL')->execute([$limite]);
    $db->prepare('DELETE FROM jetons WHERE expire < ?')->execute([kn_maintenant()]);
    $db->prepare('DELETE FROM connexions WHERE date < ?')->execute([kn_maintenant() - 30 * 86400 * 1000]);
}


/**
 * Enregistre une demande envoyée par le formulaire de contact (appelé par
 * contact.php une fois l'email parti). Relie la demande à sa visite et, si le
 * visiteur a accepté la mesure, à toutes ses visites précédentes : on connaît
 * alors son tout premier point de contact (ChatGPT, Google, LinkedIn…).
 */
function kn_enregistrer_lead(array $entree): ?int
{
    $db = kn_db();
    $maintenant = kn_maintenant();
    $session = kn_id_valide($entree['s'] ?? null);
    $visiteur = kn_id_valide($entree['v'] ?? null);
    $chemin = kn_texte($entree['chemin'] ?? null, 300);

    // Provenance de la visite en cours, puis tout premier contact connu
    $canal = $source = null;
    if ($session) {
        $q = $db->prepare('SELECT canal, source, visiteur FROM sessions WHERE id = ?');
        $q->execute([$session]);
        if ($s = $q->fetch()) {
            $canal = $s['canal'];
            $source = $s['source'];
            $visiteur = $visiteur ?: $s['visiteur'];
        }
    }
    if (!$canal) {
        $utm = is_array($entree['utm'] ?? null) ? $entree['utm'] : [];
        [$canal, $source] = kn_classer(kn_texte($entree['ref'] ?? null, 500), $utm);
    }
    $premierCanal = $canal;
    $premiereSource = $source;
    $premiereVisite = null;
    $nbVisites = 1;
    if ($visiteur) {
        $q = $db->prepare('SELECT canal, source, debut FROM sessions WHERE visiteur = ? ORDER BY debut ASC LIMIT 1');
        $q->execute([$visiteur]);
        if ($p = $q->fetch()) {
            $premierCanal = $p['canal'];
            $premiereSource = $p['source'];
            $premiereVisite = (int) $p['debut'];
        }
        $q = $db->prepare('SELECT COUNT(*) FROM sessions WHERE visiteur = ?');
        $q->execute([$visiteur]);
        $nbVisites = max(1, (int) $q->fetchColumn());
    }

    $formulaire = kn_texte($entree['formulaire'] ?? null, 30) ?? 'contact';
    $db->prepare(
        'INSERT INTO leads (date, formulaire, nom, email, telephone, entreprise, projet, message, site, origine_declaree,
            canal, source, premier_canal, premiere_source, premiere_visite, nb_visites, session, visiteur, contexte)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )->execute([
        $maintenant,
        $formulaire,
        kn_texte($entree['nom'] ?? null, 150),
        kn_texte($entree['email'] ?? null, 200),
        kn_texte($entree['telephone'] ?? null, 40),
        kn_texte($entree['entreprise'] ?? null, 150),
        kn_texte($entree['projet'] ?? null, 200),
        kn_texte($entree['message'] ?? null, 6000),
        null,
        kn_texte($entree['origine'] ?? null, 120),
        $canal,
        $source,
        $premierCanal,
        $premiereSource,
        $premiereVisite,
        $nbVisites,
        $session,
        $visiteur,
        $chemin ? json_encode(['page' => $chemin], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
    ]);
    $id = (int) $db->lastInsertId();

    if ($session) {
        // La visite peut ne pas encore exister côté serveur (demande envoyée avant
        // le premier envoi groupé du suivi) : on la crée, t.php la complétera.
        $db->prepare('INSERT INTO sessions (id, visiteur, debut, fin, canal, source, atterrissage, lead_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET lead_id = excluded.lead_id, visiteur = COALESCE(sessions.visiteur, excluded.visiteur)')
            ->execute([$session, $visiteur, $maintenant, $maintenant, $canal, $source, $chemin, $id]);
        $db->prepare('INSERT INTO evenements (session, date, type, chemin, donnees) VALUES (?, ?, ?, ?, ?)')
            ->execute([$session, $maintenant, 'lead', $chemin, json_encode(['id' => $id, 'formulaire' => $formulaire])]);
    }
    return $id;
}
