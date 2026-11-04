<?php
// Contacts laissés dans « Kinome Assistant » (Causerie, bot 61a7f539-597f-42f1-b362-1e5e255ae408), envoyés
// par le dashboard Causerie (webhook « lead.created »). Porté de neopoule.fr le 04/11/2026.
//
// La requête est signée : HMAC-SHA256 de « t.corps » avec le secret affiché sous l'adresse du webhook dans
// le dashboard. Mathias le colle dans /crm/ > Réglages (rangé dans la base hors du web, jamais réaffiché).
// Sans secret ou sans signature valide, rien n'entre (503 tant que le secret manque).
//
// Le contact entre dans le CRM (table « leads », formulaire « chatbot », un seul par adresse e-mail). S'il
// n'y a eu qu'une seule visite qui utilisait l'assistant à ce moment-là, il lui est rattaché : provenance,
// parcours, appareil.
declare(strict_types=1);
require __DIR__ . '/_lib.php';
require __DIR__ . '/_crm.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    kn_json(['ok' => false], 405);
}
if (!isset($_SERVER['HTTP_X_CAUSERIE_EVENT'])) {
    kn_json(['ok' => false], 400);
}

$db = kn_db();
$brut = (string) file_get_contents('php://input', false, null, 0, 65536);
$secret = (string) (kn_un($db, "SELECT valeur FROM reglages WHERE cle = 'causerie_secret'") ?: '');
if ($secret === '') {
    kn_json(['ok' => false, 'erreur' => 'secret_absent'], 503);
}

$parts = [];
foreach (explode(',', (string) ($_SERVER['HTTP_X_CAUSERIE_SIGNATURE'] ?? '')) as $morceau) {
    $kv = explode('=', trim($morceau), 2);
    if (count($kv) === 2) {
        $parts[$kv[0]] = $kv[1];
    }
}
$t = (int) ($parts['t'] ?? 0);
$recue = (string) ($parts['v1'] ?? '');
// Le secret s'affiche avec son préfixe « whsec_ » : signature acceptée avec ou sans
$valide = false;
foreach (array_unique([$secret, (string) preg_replace('/^whsec_/', '', $secret)]) as $cle) {
    if ($cle !== '' && $recue !== '' && hash_equals(hash_hmac('sha256', $t . '.' . $brut, $cle), $recue)) {
        $valide = true;
    }
}
if (!$valide || abs(time() - $t) > 300) {
    kn_json(['ok' => false, 'erreur' => 'signature'], 401);
}

$p = json_decode($brut, true);
if (!is_array($p) || ($p['event'] ?? '') !== 'lead.created' || !is_array($p['lead'] ?? null)) {
    kn_json(['ok' => false], 400);
}

// Bouton « Tester » du dashboard : on note la date, sans créer de faux contact
if (!empty($p['test'])) {
    $db->prepare("INSERT INTO reglages (cle, valeur) VALUES ('causerie_test', ?) ON CONFLICT(cle) DO UPDATE SET valeur = excluded.valeur")
        ->execute([(string) kn_maintenant()]);
    kn_json(['ok' => true, 'test' => true]);
}

$l = $p['lead'];
$livraison = kn_texte($p['delivery_id'] ?? null, 80);
if ($livraison !== null && kn_un($db, 'SELECT 1 FROM livraisons WHERE id = ?', [$livraison])) {
    kn_json(['ok' => true, 'doublon' => true]);
}

$email = filter_var(kn_texte($l['email'] ?? null, 200), FILTER_VALIDATE_EMAIL) ?: null;
$telephone = kn_texte($l['phone'] ?? null, 40);
if ($email === null && $telephone === null) {
    kn_json(['ok' => true, 'ignore' => 'sans_contact']);
}
$date = (strtotime((string) ($l['created_at'] ?? '')) ?: time()) * 1000;

// Visite probable : le chatbot ne connaît pas l'identifiant de visite du site. On relie le contact à la
// seule visite qui a ouvert l'assistant dans les 30 minutes précédentes.
$visite = null;
$candidates = kn_tous($db, "SELECT DISTINCT session FROM evenements WHERE type = 'chatbot' AND date BETWEEN ? AND ?",
    [$date - 30 * 60 * 1000, $date + 2 * 60 * 1000]);
if (count($candidates) === 1) {
    $visite = kn_tous($db, 'SELECT * FROM sessions WHERE id = ?', [(string) $candidates[0]['session']])[0] ?? null;
}

$nom = kn_texte($l['name'] ?? null, 150);
$intention = kn_texte($l['intent'] ?? null, 300);
$conversation = kn_texte($l['conversation_url'] ?? null, 300);
$message = implode("\n", array_filter([
    "Contact laissé dans l'assistant du site.",
    $intention ? "Intention : $intention" : null,
    $conversation ? "Conversation complète : $conversation" : null,
]));
$canal = $visite['canal'] ?? 'Chatbot';
$source = $visite['source'] ?? 'Assistant du site';
$session = $visite['id'] ?? null;
$contexte = json_encode(array_filter(['conversation' => $conversation, 'visite' => $session ? 'probable' : null]), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$db->exec('BEGIN IMMEDIATE');
try {
    $existant = $email ? kn_un($db, "SELECT id FROM leads WHERE email = ? AND formulaire = 'chatbot'", [$email]) : false;
    $nouveau = $existant === false || $existant === null;
    if ($nouveau) {
        $db->prepare("INSERT INTO leads (date, formulaire, nom, email, telephone, projet, message, canal, source, premier_canal, premiere_source,
                nb_visites, session, visiteur, contexte, statut, maj)
            VALUES (?, 'chatbot', ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, 'nouveau', ?)")->execute([
            $date, $nom, $email, $telephone, $intention ? mb_substr($intention, 0, 200) : null, mb_substr($message, 0, 6000),
            $canal, $source, $canal, $source, $session, $visite['visiteur'] ?? null, $contexte, kn_maintenant(),
        ]);
        $id = (int) $db->lastInsertId();
        kn_crm_suivi($db, $id, 'creation', 'Contact laissé dans le chatbot' . ($intention ? " : $intention" : ''), 'Chatbot');
    } else {
        // La même personne revient dans le chat : la fiche garde son premier contact, le nouveau message s'ajoute
        $id = (int) $existant;
        $db->prepare("UPDATE leads SET nom = COALESCE(nom, ?), telephone = COALESCE(telephone, ?),
                message = substr(COALESCE(message, '') || char(10) || char(10) || ?, 1, 6000), maj = ? WHERE id = ?")
            ->execute([$nom, $telephone, $message, kn_maintenant(), $id]);
        kn_crm_suivi($db, $id, 'note', 'Nouveau contact dans le chatbot' . ($intention ? " : $intention" : ''), 'Chatbot');
    }
    if ($session) {
        $db->prepare('UPDATE sessions SET lead_id = ? WHERE id = ? AND lead_id IS NULL')->execute([$id, $session]);
        $db->prepare('INSERT INTO evenements (session, date, type, chemin, donnees) VALUES (?, ?, ?, ?, ?)')
            ->execute([$session, $date, 'lead', null, json_encode(['id' => $id, 'formulaire' => 'chatbot', 'retour' => !$nouveau])]);
    }
    if ($livraison !== null) {
        $db->prepare('INSERT OR IGNORE INTO livraisons (id, date) VALUES (?, ?)')->execute([$livraison, kn_maintenant()]);
    }
    $db->exec('COMMIT');
} catch (Throwable $e) {
    $db->exec('ROLLBACK');
    kn_json(['ok' => false], 500);
}

kn_json(['ok' => true, 'id' => $id, 'nouveau' => $nouveau]);
