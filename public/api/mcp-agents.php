<?php
// Serveur MCP public de l'Agence Kinome (25/11/2026), servi sur https://agence-kinome.ch/mcp
// (réécriture dans .htaccess). Lecture seule, sans clé ni base de données : présentation de
// l'agence, prix de la grille 2026, recherche dans les articles du blog, moyens de contact.
// Aucun outil n'écrit quoi que ce soit (pas d'envoi de formulaire, pas d'accès au CRM : le CRM
// a son propre connecteur, api/mcp.php, protégé par clé).
// Transport HTTP de MCP en JSON (une requête JSON-RPC par appel, réponse JSON, sans flux SSE).
// Carte du serveur : /.well-known/mcp/server-card.json (à garder cohérente avec ce fichier).
declare(strict_types=1);

const KN_AGENTS_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const KN_AGENTS_VERSION_SERVEUR = '1.0.0';
const KN_SITE = 'https://agence-kinome.ch';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version');
header('X-Robots-Tag: noindex');

$methode = $_SERVER['REQUEST_METHOD'] ?? '';
if ($methode === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($methode !== 'POST') {
    header('Allow: POST, OPTIONS');
    http_response_code(405);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['erreur' => 'Serveur MCP (transport HTTP) : envoyez une requête JSON-RPC en POST. Carte : ' . KN_SITE . '/.well-known/mcp/server-card.json'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function kn_ag_reponse($id, array $contenu): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['jsonrpc' => '2.0', 'id' => $id] + $contenu, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function kn_ag_erreur($id, int $code, string $message): void
{
    kn_ag_reponse($id, ['error' => ['code' => $code, 'message' => $message]]);
}

function kn_ag_resultat_texte($donnees): array
{
    return [
        'content' => [['type' => 'text', 'text' => json_encode($donnees, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)]],
        'structuredContent' => $donnees,
    ];
}

// --- Données ----------------------------------------------------------------------------

/** Données de l'agence, générées au build depuis app/lib/agents.ts (source unique des prix). */
function kn_ag_donnees(): array
{
    static $d = null;
    if ($d === null) {
        $f = __DIR__ . '/../agents/kinome.json';
        $d = is_file($f) ? (json_decode((string) file_get_contents($f), true) ?: []) : [];
    }
    return $d;
}

function kn_ag_presentation(): array
{
    return kn_ag_donnees()['agence'] ?? ['site' => KN_SITE];
}

function kn_ag_tarifs(): array
{
    return kn_ag_donnees()['tarifs'] ?? ['source' => KN_SITE . '/documents/grille-tarifs-kinome-2026.pdf'];
}

function kn_ag_contact(): array
{
    return kn_ag_donnees()['contact'] ?? ['formulaire' => KN_SITE . '/contact/'];
}

function kn_ag_articles(string $requete, int $limite): array
{
    $fichier = __DIR__ . '/../agents/articles.json';
    $index = is_file($fichier) ? json_decode((string) file_get_contents($fichier), true) : null;
    $articles = is_array($index['articles'] ?? null) ? $index['articles'] : [];
    $normaliser = function (string $t): string {
        $t = mb_strtolower($t);
        $t = strtr($t, ['à' => 'a', 'â' => 'a', 'ä' => 'a', 'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e', 'î' => 'i', 'ï' => 'i', 'ô' => 'o', 'ö' => 'o', 'ù' => 'u', 'û' => 'u', 'ü' => 'u', 'ç' => 'c', 'œ' => 'oe']);
        return $t;
    };
    $mots = array_values(array_filter(preg_split('/[^a-z0-9]+/', $normaliser($requete)) ?: [], fn($m) => strlen($m) > 2));
    $notes = [];
    foreach ($articles as $a) {
        $titre = $normaliser((string) ($a['titre'] ?? ''));
        $desc = $normaliser((string) ($a['description'] ?? ''));
        $url = $normaliser((string) ($a['url'] ?? ''));
        $note = 0;
        foreach ($mots as $m) {
            $note += (str_contains($titre, $m) ? 3 : 0) + (str_contains($url, $m) ? 2 : 0) + (str_contains($desc, $m) ? 1 : 0);
        }
        if (!$mots || $note > 0) {
            $notes[] = [$note, $a];
        }
    }
    usort($notes, fn($x, $y) => $y[0] <=> $x[0]);
    return [
        'requete' => $requete,
        'resultats' => array_map(fn($n) => $n[1], array_slice($notes, 0, $limite)),
        'total_articles' => count($articles),
    ];
}

// --- Outils -----------------------------------------------------------------------------

const KN_AG_LECTURE = ['readOnlyHint' => true, 'destructiveHint' => false, 'idempotentHint' => true, 'openWorldHint' => false];

function kn_ag_outils(): array
{
    $vide = ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false];
    return [
        ['name' => 'presentation_kinome', 'title' => 'Présentation de l\'agence', 'description' => 'Qui est l\'Agence Kinome (agence de communication à Genève) : activité, adresse, zones servies, langues, horaires, services et liens.', 'inputSchema' => $vide, 'annotations' => KN_AG_LECTURE],
        ['name' => 'tarifs_kinome', 'title' => 'Prix 2026', 'description' => 'Fourchettes de prix 2026 de l\'agence en CHF hors TVA (logo, identité visuelle, site internet, SEO, réseaux sociaux…), avec délais indicatifs et source PDF.', 'inputSchema' => $vide, 'annotations' => KN_AG_LECTURE],
        ['name' => 'rechercher_articles', 'title' => 'Rechercher dans le blog', 'description' => 'Cherche dans les guides du blog de Kinome (prix, branding, sites, SEO, IA, vœux) et renvoie titres, adresses, versions Markdown et descriptions.', 'inputSchema' => ['type' => 'object', 'properties' => ['requete' => ['type' => 'string', 'description' => 'Mots-clés, par exemple « prix logo » ou « site multilingue ».'], 'limite' => ['type' => 'integer', 'minimum' => 1, 'maximum' => 20, 'description' => 'Nombre de résultats (5 par défaut).']], 'required' => ['requete'], 'additionalProperties' => false], 'annotations' => KN_AG_LECTURE],
        ['name' => 'contacter_kinome', 'title' => 'Moyens de contact', 'description' => 'Moyens de contacter l\'agence (formulaire, e-mail, téléphone, WhatsApp). N\'envoie aucun message.', 'inputSchema' => $vide, 'annotations' => KN_AG_LECTURE],
    ];
}

// --- Requête JSON-RPC -------------------------------------------------------------------

$req = json_decode((string) file_get_contents('php://input', false, null, 0, 65536), true);
if (!is_array($req) || array_is_list($req)) {
    kn_ag_erreur(null, -32600, 'Requête JSON-RPC invalide (une requête par appel, pas de lot).');
}
$id = $req['id'] ?? null;
$m = (string) ($req['method'] ?? '');
$p = is_array($req['params'] ?? null) ? $req['params'] : [];

if (str_starts_with($m, 'notifications/')) {
    http_response_code(202);
    exit;
}

switch ($m) {
    case 'initialize':
        $demandee = (string) ($p['protocolVersion'] ?? '');
        kn_ag_reponse($id, ['result' => [
            'protocolVersion' => in_array($demandee, KN_AGENTS_VERSIONS, true) ? $demandee : KN_AGENTS_VERSIONS[0],
            'capabilities' => ['tools' => ['listChanged' => false]],
            'serverInfo' => ['name' => 'agence-kinome', 'title' => 'Agence Kinome', 'version' => KN_AGENTS_VERSION_SERVEUR],
            'instructions' => 'Serveur public en lecture seule de l\'Agence Kinome, agence de communication à Genève. Prix en CHF hors TVA, indicatifs : renvoyez vers le premier échange offert pour un devis. Ce serveur n\'envoie aucun message.',
        ]]);
    case 'ping':
        kn_ag_reponse($id, ['result' => new stdClass()]);
    case 'tools/list':
        kn_ag_reponse($id, ['result' => ['tools' => kn_ag_outils()]]);
    case 'tools/call':
        $nom = (string) ($p['name'] ?? '');
        $args = is_array($p['arguments'] ?? null) ? $p['arguments'] : [];
        switch ($nom) {
            case 'presentation_kinome':
                kn_ag_reponse($id, ['result' => kn_ag_resultat_texte(kn_ag_presentation())]);
            case 'tarifs_kinome':
                kn_ag_reponse($id, ['result' => kn_ag_resultat_texte(kn_ag_tarifs())]);
            case 'contacter_kinome':
                kn_ag_reponse($id, ['result' => kn_ag_resultat_texte(kn_ag_contact())]);
            case 'rechercher_articles':
                $requete = mb_substr(trim((string) ($args['requete'] ?? '')), 0, 200);
                $limite = max(1, min(20, (int) ($args['limite'] ?? 5)));
                kn_ag_reponse($id, ['result' => kn_ag_resultat_texte(kn_ag_articles($requete, $limite))]);
            default:
                kn_ag_erreur($id, -32602, 'Outil inconnu : ' . $nom);
        }
        // no break : chaque branche répond et termine.
    case 'resources/list':
        kn_ag_reponse($id, ['result' => ['resources' => []]]);
    case 'prompts/list':
        kn_ag_reponse($id, ['result' => ['prompts' => []]]);
    default:
        kn_ag_erreur($id, -32601, 'Méthode inconnue : ' . $m);
}
