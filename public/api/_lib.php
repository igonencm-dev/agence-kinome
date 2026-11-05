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
    if ($version < 2) {
        // 29/10/2026. Visite éclair : moins de 3 s, une page au plus, aucune action (clic,
        // copie, formulaire, chatbot, j'aime, visionneuse), pas de demande. Le plus souvent
        // un robot qui exécute le JavaScript (rafale sur /en/ du 29/10) : les statistiques
        // de l'admin lisent cette vue, la liste des visites les montre à part.
        $db->exec(<<<SQL
            CREATE VIEW IF NOT EXISTS sessions_utiles AS
              SELECT * FROM sessions
              WHERE (fin - debut) >= 3000 OR pages > 1 OR lead_id IS NOT NULL
                 OR EXISTS (SELECT 1 FROM evenements x WHERE x.session = sessions.id
                            AND x.type IN ('clic', 'copie', 'formulaire', 'chatbot', 'jaime', 'media'));

            CREATE TABLE IF NOT EXISTS limites (
                cle TEXT NOT NULL,
                fenetre INTEGER NOT NULL,
                n INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY (cle, fenetre)
            );
        SQL);
        $db->exec('PRAGMA user_version = 2');
    }
    if ($version < 3) {
        // 04/11/2026. CRM /crm/ (_crm.php) : comptes personnels (Mathias, Tanguy), clés d'accès
        // pour Claude, fil de suivi de chaque demande, PDF joints (rangés hors du web), livraisons
        // du webhook Causerie (chacune traitée une seule fois), responsable et prochaine action.
        $db->exec(<<<SQL
            CREATE TABLE IF NOT EXISTS comptes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                identifiant TEXT NOT NULL UNIQUE COLLATE NOCASE,
                nom TEXT NOT NULL,
                hash TEXT NOT NULL,
                cree INTEGER NOT NULL,
                derniere_connexion INTEGER
            );

            CREATE TABLE IF NOT EXISTS cles_api (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                empreinte TEXT NOT NULL UNIQUE,
                compte INTEGER NOT NULL,
                libelle TEXT,
                cree INTEGER NOT NULL,
                derniere INTEGER
            );

            CREATE TABLE IF NOT EXISTS suivis (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lead INTEGER NOT NULL,
                date INTEGER NOT NULL,
                auteur TEXT,
                type TEXT NOT NULL,
                texte TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_suivis_lead ON suivis(lead, date);

            CREATE TABLE IF NOT EXISTS fichiers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lead INTEGER NOT NULL,
                date INTEGER NOT NULL,
                auteur TEXT,
                nom TEXT NOT NULL,
                taille INTEGER NOT NULL,
                cle TEXT NOT NULL UNIQUE
            );
            CREATE INDEX IF NOT EXISTS idx_fichiers_lead ON fichiers(lead);

            CREATE TABLE IF NOT EXISTS livraisons (
                id TEXT PRIMARY KEY,
                date INTEGER NOT NULL
            );
        SQL);
        kn_ajouter_colonne($db, 'jetons', 'compte', 'INTEGER');
        kn_ajouter_colonne($db, 'leads', 'responsable', 'TEXT');
        kn_ajouter_colonne($db, 'leads', 'prochaine_action', 'TEXT');
        kn_ajouter_colonne($db, 'leads', 'prochaine_date', 'INTEGER');
        $db->exec('PRAGMA user_version = 3');
    }
    if ($version < 4) {
        // 05/11/2026. Visites de l'équipe écartées par adresse (réglage ip_equipe) : on ne garde
        // que l'identifiant de la visite et sa date, pour afficher combien ont été écartées.
        $db->exec(<<<SQL
            CREATE TABLE IF NOT EXISTS sessions_equipe (
                id TEXT PRIMARY KEY,
                debut INTEGER NOT NULL
            );
        SQL);
        $db->exec('PRAGMA user_version = 4');
    }
}

/** Ajoute une colonne si elle manque : un palier interrompu peut être rejoué sans erreur. */
function kn_ajouter_colonne(PDO $db, string $table, string $colonne, string $type): void
{
    $q = $db->query("PRAGMA table_info($table)");
    $existe = in_array($colonne, array_column($q->fetchAll(), 'name'), true);
    $q->closeCursor();
    if (!$existe) {
        $db->exec("ALTER TABLE $table ADD COLUMN $colonne $type");
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
    return $ua === '' || (bool) preg_match('/bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|curl|wget|python|axios|node-fetch|go-http|java\/|phantom|puppeteer|playwright|selenium|electron|scrapy|httpclient|okhttp|libwww|monitor|uptime|pingdom|gtmetrix/i', $ua);
}

/**
 * Navigateur automatisé qui se fait passer pour un vrai visiteur (29/10/2026, rafale sur
 * /en/ : écran 0x0, langue « en-US@posix », téléphone annoncé avec un écran d'ordinateur).
 * Ces signes ne se rencontrent pas chez un humain : la visite n'est pas enregistrée.
 */
function kn_session_automatisee(array $meta, string $ua): bool
{
    if (!preg_match('/^(\d{2,5})x(\d{2,5})$/', (string) ($meta['ecran'] ?? ''), $m)) {
        return true;
    }
    $largeur = (int) $m[1];
    $hauteur = (int) $m[2];
    if ($largeur < 200 || $hauteur < 200) {
        return true;
    }
    if (str_contains((string) ($meta['lang'] ?? ''), '@')) {
        return true;
    }
    return (bool) preg_match('/iPhone|Android.*Mobile/i', $ua) && min($largeur, $hauteur) > 900;
}

/**
 * Garde-fou contre l'inondation d'un point d'entrée public : au-delà de $max requêtes
 * par clé (empreinte d'IP salée) dans une fenêtre de $fenetreMs, renvoie true.
 */
function kn_trop_de_requetes(PDO $db, string $cle, int $max, int $fenetreMs): bool
{
    $fenetre = intdiv(kn_maintenant(), $fenetreMs) * $fenetreMs;
    $db->prepare('INSERT INTO limites (cle, fenetre, n) VALUES (?, ?, 1)
        ON CONFLICT(cle, fenetre) DO UPDATE SET n = n + 1')->execute([$cle, $fenetre]);
    $q = $db->prepare('SELECT n FROM limites WHERE cle = ? AND fenetre = ?');
    $q->execute([$cle, $fenetre]);
    $n = (int) $q->fetchColumn();
    $q->closeCursor();
    return $n > $max;
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

/** Clé réseau d'une adresse : l'IPv4 entière, ou le préfixe /64 en IPv6 (les adresses IPv6
 * temporaires d'une box changent chaque jour, le préfixe reste). null si illisible. */
function kn_cle_reseau(string $ip): ?string
{
    $bin = @inet_pton($ip);
    if ($bin === false) {
        return null;
    }
    return strlen($bin) === 4 ? $ip : bin2hex(substr($bin, 0, 8)) . '/64';
}

/** Empreinte salée du réseau de la requête : l'adresse elle-même n'est jamais enregistrée. */
function kn_empreinte_reseau(): ?string
{
    $cle = kn_cle_reseau((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
    if ($cle === null) {
        return null;
    }
    return substr(hash('sha256', 'equipe|' . (string) (kn_config()['sel'] ?? 'kinome') . '|' . $cle), 0, 32);
}

/** Adresse de la requête à demi masquée (« 90.18.x.x »), pour que l'équipe reconnaisse la sienne. */
function kn_ip_masquee(): string
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        $p = explode('.', $ip);
        return "$p[0].$p[1].x.x";
    }
    $p = explode(':', $ip);
    return ($p[0] ?? '') . ':' . ($p[1] ?? '') . ':…';
}

/** Réseaux de l'équipe (réglage ip_equipe) : [{cle, nom, type, ajout, par}]. */
function kn_ip_equipe(PDO $db): array
{
    $q = $db->prepare("SELECT valeur FROM reglages WHERE cle = 'ip_equipe'");
    $q->execute();
    $v = $q->fetchColumn();
    $q->closeCursor();
    $liste = $v ? json_decode((string) $v, true) : [];
    return is_array($liste) ? $liste : [];
}

/** La requête vient-elle d'un réseau de l'équipe ? */
function kn_est_equipe(PDO $db): bool
{
    $ici = kn_empreinte_reseau();
    return $ici !== null && in_array($ici, array_column(kn_ip_equipe($db), 'cle'), true);
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
    $db->prepare('DELETE FROM sessions_equipe WHERE debut < ?')->execute([$limite]);
    $db->prepare('DELETE FROM jetons WHERE expire < ?')->execute([kn_maintenant()]);
    $db->prepare('DELETE FROM connexions WHERE date < ?')->execute([kn_maintenant() - 30 * 86400 * 1000]);
    $db->prepare('DELETE FROM limites WHERE fenetre < ?')->execute([kn_maintenant() - 86400 * 1000]);
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
