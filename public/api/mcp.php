<?php
// Connecteur MCP du CRM /crm/ (04/11/2026) : Claude Code ou Claude Desktop lisent et mettent à jour les
// fiches avec la clé d'accès personnelle créée dans /crm/ > Réglages, envoyée par l'en-tête
// « X-Kinome-Cle » (ou « Authorization: Bearer … »). Une requête JSON-RPC par appel, réponse JSON
// (transport HTTP de MCP, sans flux SSE). Les messages laissés par Claude sont signés du nom du compte.
declare(strict_types=1);
require __DIR__ . '/_lib.php';
require __DIR__ . '/_crm.php';

const KN_MCP_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];

function kn_mcp_reponse($id, array $contenu, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex, nofollow');
    echo json_encode(['jsonrpc' => '2.0', 'id' => $id] + $contenu, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function kn_mcp_erreur($id, int $code, string $message, int $http = 200): void
{
    kn_mcp_reponse($id, ['error' => ['code' => $code, 'message' => $message]], $http);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

$db = kn_db();
$moi = kn_crm_par_cle($db);
if ($moi === null) {
    header('WWW-Authenticate: Bearer');
    kn_mcp_erreur(null, -32001, 'Clé d\'accès absente ou invalide : créez-la dans agence-kinome.ch/crm/ > Réglages.', 401);
}

$req = json_decode((string) file_get_contents('php://input', false, null, 0, 65536), true);
if (!is_array($req) || ($req['jsonrpc'] ?? '') !== '2.0' || !is_string($req['method'] ?? null)) {
    kn_mcp_erreur(null, -32600, 'Requête JSON-RPC invalide.', 400);
}
// Notification (sans identifiant) : rien à répondre
if (!array_key_exists('id', $req)) {
    http_response_code(202);
    exit;
}
$id = $req['id'];
$params = is_array($req['params'] ?? null) ? $req['params'] : [];

$statuts = ['type' => 'string', 'enum' => KN_STATUTS, 'description' => 'nouveau, contacte, rdv (rendez-vous), devis (devis envoyé), gagne, perdu, spam'];
$date = ['type' => 'string', 'description' => 'Date au format AAAA-MM-JJ'];
$outils = [
    ['name' => 'lister_prospects',
        'description' => 'Liste les fiches du CRM de Kinome (prospects et demandes), des plus récemment modifiées aux plus anciennes, avec étape, responsable, prochaine action et dernière nouvelle du fil.',
        'inputSchema' => ['type' => 'object', 'properties' => [
            'statut' => $statuts,
            'responsable' => ['type' => 'string', 'description' => 'Prénom du responsable, par exemple Mathias ou Tanguy'],
            'recherche' => ['type' => 'string', 'description' => 'Texte cherché dans le nom, l\'entreprise, l\'e-mail, le projet ou le message'],
        ]]],
    ['name' => 'voir_prospect',
        'description' => 'Fiche complète d\'un prospect : coordonnées, projet, message reçu, fil de suivi daté et PDF joints.',
        'inputSchema' => ['type' => 'object', 'properties' => ['id' => ['type' => 'integer', 'description' => 'Numéro de la fiche']], 'required' => ['id']]],
    ['name' => 'ajouter_prospect',
        'description' => 'Crée une fiche (contact rencontré, appel, recommandation). Il faut au moins une entreprise ou un nom.',
        'inputSchema' => ['type' => 'object', 'properties' => [
            'entreprise' => ['type' => 'string'], 'nom' => ['type' => 'string', 'description' => 'Nom de la personne'],
            'email' => ['type' => 'string'], 'telephone' => ['type' => 'string'], 'projet' => ['type' => 'string'],
            'origine' => ['type' => 'string', 'description' => 'D\'où vient le contact : réseau, CCIFS, recommandation, ChatGPT, salon…'],
            'responsable' => ['type' => 'string'], 'statut' => $statuts, 'montant' => ['type' => 'number', 'description' => 'Montant estimé en CHF HT'],
            'prochaine_action' => ['type' => 'string'], 'prochaine_date' => $date,
            'note' => ['type' => 'string', 'description' => 'Premier message du fil : où ça en est'],
        ]]],
    ['name' => 'noter',
        'description' => 'Ajoute un message daté au fil de suivi d\'une fiche (où ça en est, compte rendu, décision).',
        'inputSchema' => ['type' => 'object', 'properties' => ['id' => ['type' => 'integer'], 'texte' => ['type' => 'string']], 'required' => ['id', 'texte']]],
    ['name' => 'mettre_a_jour',
        'description' => 'Change l\'étape, le responsable, le montant, la prochaine action ou les coordonnées d\'une fiche. Chaque changement d\'étape, de responsable, de montant ou de prochaine action s\'écrit dans le fil.',
        'inputSchema' => ['type' => 'object', 'properties' => [
            'id' => ['type' => 'integer'], 'statut' => $statuts, 'responsable' => ['type' => 'string'],
            'montant' => ['type' => 'number'], 'prochaine_action' => ['type' => 'string'], 'prochaine_date' => $date,
            'entreprise' => ['type' => 'string'], 'nom' => ['type' => 'string'], 'email' => ['type' => 'string'],
            'telephone' => ['type' => 'string'], 'projet' => ['type' => 'string'],
        ], 'required' => ['id']]],
];

/** Fiche allégée pour Claude : dates lisibles, champs vides retirés. */
function kn_mcp_lisible(array $l): array
{
    foreach (['date', 'maj', 'prochaine_date', 'dernier_suivi_date', 'premiere_visite'] as $c) {
        if (!empty($l[$c])) {
            $l[$c] = date('Y-m-d H:i', intdiv((int) $l[$c], 1000));
        }
    }
    if (isset($l['statut'])) {
        $l['etape'] = KN_LIBELLES_STATUTS[$l['statut']] ?? $l['statut'];
    }
    unset($l['session'], $l['visiteur'], $l['contexte'], $l['import'], $l['site']);
    return array_filter($l, fn($v) => $v !== null && $v !== '');
}

switch ($req['method']) {
    case 'initialize':
        $version = in_array($params['protocolVersion'] ?? '', KN_MCP_VERSIONS, true) ? $params['protocolVersion'] : KN_MCP_VERSIONS[0];
        kn_mcp_reponse($id, ['result' => [
            'protocolVersion' => $version,
            'capabilities' => ['tools' => new stdClass()],
            'serverInfo' => ['name' => 'kinome-crm', 'version' => '1.0.0'],
            'instructions' => 'CRM de prospection de l\'agence Kinome (Genève). Avant de modifier une fiche, retrouve-la avec lister_prospects. Écris les messages du fil en français, courts et factuels.',
        ]]);
        // no break
    case 'ping':
        kn_mcp_reponse($id, ['result' => new stdClass()]);
        // no break
    case 'tools/list':
        kn_mcp_reponse($id, ['result' => ['tools' => $outils]]);
        // no break
    case 'tools/call':
        $nom = (string) ($params['name'] ?? '');
        $a = is_array($params['arguments'] ?? null) ? $params['arguments'] : [];
        $resultat = null;
        $erreur = null;
        switch ($nom) {
            case 'lister_prospects':
                $resultat = array_map('kn_mcp_lisible', kn_crm_liste($db, [
                    'statut' => (string) ($a['statut'] ?? ''), 'responsable' => (string) ($a['responsable'] ?? ''),
                    'recherche' => kn_texte($a['recherche'] ?? null, 100),
                ]));
                break;
            case 'voir_prospect':
                $f = kn_crm_fiche($db, (int) ($a['id'] ?? 0));
                if ($f === null) {
                    $erreur = 'Fiche introuvable.';
                    break;
                }
                $resultat = ['fiche' => kn_mcp_lisible($f['lead']),
                    'fil' => array_map('kn_mcp_lisible', $f['suivis']),
                    'pdf' => array_map(fn($x) => kn_mcp_lisible($x) + ['adresse' => 'https://agence-kinome.ch/api/admin.php?a=fichier_get&id=' . $x['id']], $f['fichiers'])];
                break;
            case 'ajouter_prospect':
                $nouvel = kn_crm_ajouter($db, $a, $moi['nom']);
                $resultat = $nouvel === null ? null : ['id' => $nouvel, 'fiche' => 'https://agence-kinome.ch/crm/#lead-' . $nouvel];
                $erreur = $nouvel === null ? 'Indiquez au moins une entreprise ou un nom.' : null;
                break;
            case 'noter':
                $erreur = kn_crm_noter($db, (int) ($a['id'] ?? 0), $a['texte'] ?? null, $moi['nom']) ? null : 'Message vide ou fiche introuvable.';
                $resultat = $erreur ? null : ['ok' => true];
                break;
            case 'mettre_a_jour':
                $erreur = kn_crm_maj($db, (int) ($a['id'] ?? 0), $a, $moi['nom']) ? null : 'Fiche introuvable.';
                $resultat = $erreur ? null : ['ok' => true];
                break;
            default:
                kn_mcp_erreur($id, -32602, "Outil inconnu : $nom");
        }
        kn_mcp_reponse($id, ['result' => [
            'content' => [['type' => 'text', 'text' => $erreur ?? json_encode($resultat, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)]],
            'isError' => $erreur !== null,
        ]]);
        // no break
    default:
        kn_mcp_erreur($id, -32601, 'Méthode inconnue : ' . $req['method']);
}
