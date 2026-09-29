<?php
// Collecte first-party des visites (envoyée par app/lib/suivi.ts via
// navigator.sendBeacon). Aucun cookie, aucune IP conservée. L'identifiant de
// visiteur persistant n'arrive que si le visiteur a accepté la mesure.
declare(strict_types=1);
require __DIR__ . '/_lib.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    kn_json(['ok' => false], 405);
}
$ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
// Robots : on répond « ok » sans rien écrire, ils n'ont pas à le savoir
if (kn_est_robot($ua)) {
    kn_json(['ok' => true]);
}

$entree = kn_entree(24576);
$meta = is_array($entree['s'] ?? null) ? $entree['s'] : [];
$evenements = is_array($entree['e'] ?? null) ? array_slice($entree['e'], 0, 60) : [];
$session = kn_id_valide($meta['id'] ?? null);
if (!$session || !$evenements) {
    kn_json(['ok' => false], 400);
}

// Les horodatages du navigateur ne servent qu'à l'ordre relatif : on les
// recale sur l'heure du serveur pour ne pas dépendre de l'horloge du visiteur.
$maintenant = kn_maintenant();
$decalage = is_numeric($entree['n'] ?? null) ? $maintenant - (int) $entree['n'] : 0;

$utm = [];
if (is_array($meta['utm'] ?? null)) {
    foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'] as $k) {
        if ($v = kn_texte($meta['utm'][$k] ?? null, 200)) {
            $utm[$k] = $v;
        }
    }
}
$referrer = kn_texte($meta['ref'] ?? null, 500);
[$canal, $source] = kn_classer($referrer, $utm);
[$appareil, $navigateur, $os] = kn_lire_ua($ua);
$visiteur = kn_id_valide($meta['v'] ?? null);
$visiteN = is_numeric($meta['vn'] ?? null) ? max(1, min(9999, (int) $meta['vn'])) : null;

$db = kn_db();
$db->beginTransaction();
try {
    $db->prepare(
        'INSERT INTO sessions (id, visiteur, debut, fin, canal, source, referrer, utm, atterrissage, appareil, navigateur, os, ecran, langue, visite_n)
         VALUES (:id, :v, :d, :d, :canal, :source, :ref, :utm, :att, :app, :nav, :os, :ecran, :langue, :vn)
         ON CONFLICT(id) DO UPDATE SET fin = MAX(sessions.fin, excluded.fin), visiteur = COALESCE(sessions.visiteur, excluded.visiteur)'
    )->execute([
        ':id' => $session,
        ':v' => $visiteur,
        ':d' => $maintenant,
        ':canal' => $canal,
        ':source' => $source,
        ':ref' => $referrer,
        ':utm' => $utm ? json_encode($utm, JSON_UNESCAPED_UNICODE) : null,
        ':att' => kn_texte($meta['att'] ?? null, 300),
        ':app' => $appareil,
        ':nav' => $navigateur,
        ':os' => $os,
        ':ecran' => kn_texte($meta['ecran'] ?? null, 20),
        ':langue' => kn_texte($meta['lang'] ?? null, 20),
        ':vn' => $visiteN,
    ]);

    $types = ['vue', 'lecture', 'clic', 'formulaire', 'chatbot', 'copie', 'jaime', 'media'];
    // OR IGNORE : un lot renvoyé après une fermeture de page ne compte pas deux fois
    $insertion = $db->prepare('INSERT OR IGNORE INTO evenements (uid, session, date, type, chemin, donnees) VALUES (?, ?, ?, ?, ?, ?)');
    $vues = 0;
    $dernier = $maintenant;
    foreach ($evenements as $e) {
        if (!is_array($e) || !in_array($e['type'] ?? '', $types, true)) {
            continue;
        }
        $date = is_numeric($e['t'] ?? null) ? min($maintenant, (int) $e['t'] + $decalage) : $maintenant;
        $donnees = is_array($e['d'] ?? null) ? json_encode($e['d'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null;
        if ($donnees !== null && strlen($donnees) > 3000) {
            $donnees = null;
        }
        $uid = (is_string($e['i'] ?? null) && preg_match('/^[a-z0-9]{8,32}$/i', $e['i'])) ? $e['i'] : null;
        $insertion->execute([$uid, $session, $date, $e['type'], kn_texte($e['p'] ?? null, 300), $donnees]);
        if ($insertion->rowCount() === 0) {
            continue;
        }
        if ($e['type'] === 'vue') {
            $vues++;
        }
        $dernier = max($dernier, $date);
    }
    $db->prepare('UPDATE sessions SET pages = pages + ?, fin = MAX(fin, ?) WHERE id = ?')->execute([$vues, $dernier, $session]);
    $db->commit();
} catch (Throwable $e) {
    $db->rollBack();
    kn_json(['ok' => false], 500);
}

kn_purger_parfois($db);
kn_json(['ok' => true]);
