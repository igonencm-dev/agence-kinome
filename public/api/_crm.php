<?php
// Hub de prospection /crm/ (04/11/2026) : logique commune à admin.php (l'interface) et à mcp.php
// (Claude). Une demande du site, du chatbot ou saisie à la main est une ligne de « leads » ; chaque
// étape s'écrit dans « suivis » (qui, quand, quoi) ; les PDF joints vivent dans data/fichiers/, hors
// du web, et ne se téléchargent qu'une fois connecté. Jamais servi directement (.htaccess, « _* »).
declare(strict_types=1);

date_default_timezone_set('Europe/Zurich');

const KN_STATUTS = ['nouveau', 'contacte', 'rdv', 'devis', 'gagne', 'perdu', 'spam'];
const KN_LIBELLES_STATUTS = [
    'nouveau' => 'Nouveau', 'contacte' => 'Contacté', 'rdv' => 'Rendez-vous', 'devis' => 'Devis envoyé',
    'gagne' => 'Gagné', 'perdu' => 'Perdu', 'spam' => 'Spam',
];
const KN_FICHIER_MAX = 10 * 1024 * 1024;

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
    $v = $q->fetchColumn();
    $q->closeCursor();
    return $v;
}

// --- Accès par clé (Claude) ---------------------------------------------------------
// La clé se crée dans /crm/ > Réglages, rattachée à un compte personnel ; seule son empreinte est
// gardée. Elle arrive par « Authorization: Bearer … » ou par « X-Kinome-Cle » (certains serveurs
// mutualisés retirent l'en-tête Authorization avant PHP).

function kn_cle_api_recue(): ?string
{
    $brut = (string) ($_SERVER['HTTP_X_KINOME_CLE'] ?? '');
    if ($brut === '') {
        $auth = (string) ($_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
        if ($auth === '' && function_exists('getallheaders')) {
            foreach (getallheaders() as $nom => $valeur) {
                if (strcasecmp($nom, 'Authorization') === 0) {
                    $auth = (string) $valeur;
                }
            }
        }
        if (preg_match('/^Bearer\s+(\S+)$/i', $auth, $m)) {
            $brut = $m[1];
        }
    }
    return preg_match('/^kn_[a-f0-9]{48}$/', $brut) ? $brut : null;
}

/** Compte qui appelle avec une clé valide, ou null. */
function kn_crm_par_cle(PDO $db): ?array
{
    $cle = kn_cle_api_recue();
    if ($cle === null) {
        return null;
    }
    $empreinte = hash('sha256', $cle);
    $r = kn_tous($db, 'SELECT k.id, k.compte, c.nom, c.identifiant FROM cles_api k JOIN comptes c ON c.id = k.compte WHERE k.empreinte = ?', [$empreinte])[0] ?? null;
    if (!$r) {
        return null;
    }
    $db->prepare('UPDATE cles_api SET derniere = ? WHERE id = ?')->execute([kn_maintenant(), $r['id']]);
    return ['compte' => (int) $r['compte'], 'nom' => (string) $r['nom'], 'identifiant' => (string) $r['identifiant'], 'cle' => true];
}

function kn_crm_nouvelle_cle(): string
{
    return 'kn_' . bin2hex(random_bytes(24));
}

// --- Outils ---------------------------------------------------------------------------

/** « AAAA-MM-JJ » (midi, heure de Genève) ou millisecondes, sinon null. */
function kn_crm_date($v): ?int
{
    if (is_int($v) || (is_string($v) && ctype_digit($v))) {
        $n = (int) $v;
        return $n > 0 ? $n : null;
    }
    if (is_string($v) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $v)) {
        $d = DateTime::createFromFormat('Y-m-d H:i', $v . ' 12:00', new DateTimeZone('Europe/Zurich'));
        return $d ? $d->getTimestamp() * 1000 : null;
    }
    return null;
}

function kn_crm_montant($v): ?int
{
    if (is_string($v)) {
        $v = str_replace(["'", '’', ' ', "\u{202F}", "\u{00A0}"], '', $v);
    }
    return is_numeric($v) ? max(0, (int) round((float) $v)) : null;
}

function kn_crm_chf(int $v): string
{
    // Même écriture que l'interface (Intl fr-CH) : « 3 000 CHF ».
    return number_format($v, 0, ',', "\u{202F}") . "\u{00A0}CHF";
}

function kn_crm_suivi(PDO $db, int $lead, string $type, ?string $texte, ?string $auteur): void
{
    $db->prepare('INSERT INTO suivis (lead, date, auteur, type, texte) VALUES (?, ?, ?, ?, ?)')
        ->execute([$lead, kn_maintenant(), $auteur, $type, $texte]);
}

/** Noms proposés comme responsables : les deux associés, plus les comptes personnels créés. */
function kn_crm_equipe(PDO $db): array
{
    $noms = array_unique(array_merge(['Mathias', 'Tanguy'], array_column(kn_tous($db, 'SELECT nom FROM comptes'), 'nom')));
    sort($noms, SORT_LOCALE_STRING);
    return array_values($noms);
}

// --- Lecture --------------------------------------------------------------------------

function kn_crm_liste(PDO $db, array $f = []): array
{
    $sql = "SELECT l.id, l.date, l.formulaire, l.nom, l.email, l.telephone, l.entreprise, l.projet, l.origine_declaree, l.canal, l.source,
            l.statut, l.valeur, l.responsable, l.prochaine_action, l.prochaine_date, l.maj, substr(l.message, 1, 200) AS extrait,
            d.texte AS dernier_suivi, d.date AS dernier_suivi_date, d.auteur AS dernier_suivi_auteur,
            (SELECT COUNT(*) FROM fichiers fi WHERE fi.lead = l.id) AS nb_fichiers
        FROM leads l
        LEFT JOIN suivis d ON d.id = (SELECT s.id FROM suivis s WHERE s.lead = l.id ORDER BY s.date DESC, s.id DESC LIMIT 1)
        WHERE 1 = 1";
    $p = [];
    if (!empty($f['statut']) && in_array($f['statut'], KN_STATUTS, true)) {
        $sql .= ' AND l.statut = ?';
        $p[] = $f['statut'];
    }
    if (!empty($f['responsable'])) {
        $sql .= ' AND l.responsable = ?';
        $p[] = (string) $f['responsable'];
    }
    if (!empty($f['recherche'])) {
        $sql .= ' AND (l.nom LIKE ? OR l.entreprise LIKE ? OR l.email LIKE ? OR l.projet LIKE ? OR l.message LIKE ?)';
        $q = '%' . (string) $f['recherche'] . '%';
        array_push($p, $q, $q, $q, $q, $q);
    }
    $sql .= ' ORDER BY COALESCE(l.maj, l.date) DESC LIMIT 1000';
    return kn_tous($db, $sql, $p);
}

function kn_crm_fiche(PDO $db, int $id): ?array
{
    $lead = kn_tous($db, 'SELECT * FROM leads WHERE id = ?', [$id])[0] ?? null;
    if (!$lead) {
        return null;
    }
    return [
        'lead' => $lead,
        'suivis' => kn_tous($db, 'SELECT id, date, auteur, type, texte FROM suivis WHERE lead = ? ORDER BY date DESC, id DESC', [$id]),
        'fichiers' => kn_tous($db, 'SELECT id, date, auteur, nom, taille FROM fichiers WHERE lead = ? ORDER BY date DESC, id DESC', [$id]),
    ];
}

// --- Écriture -------------------------------------------------------------------------

/** Fiche saisie à la main (appel, recommandation, rencontre) ; renvoie son numéro, ou null s'il manque un nom. */
function kn_crm_ajouter(PDO $db, array $e, ?string $auteur): ?int
{
    $nom = kn_texte($e['nom'] ?? null, 150);
    $entreprise = kn_texte($e['entreprise'] ?? null, 150);
    if ($nom === null && $entreprise === null) {
        return null;
    }
    $statut = in_array($e['statut'] ?? '', KN_STATUTS, true) ? $e['statut'] : 'nouveau';
    $origine = kn_texte($e['origine'] ?? null, 120);
    $maintenant = kn_maintenant();
    $db->prepare("INSERT INTO leads (date, formulaire, nom, email, telephone, entreprise, projet, message, origine_declaree, canal, source,
            premier_canal, premiere_source, statut, valeur, responsable, prochaine_action, prochaine_date, maj, import)
        VALUES (?, 'manuel', ?, ?, ?, ?, ?, ?, ?, 'Hors site', ?, 'Hors site', ?, ?, ?, ?, ?, ?, ?, 'manuel')")->execute([
        kn_crm_date($e['date'] ?? null) ?? $maintenant,
        $nom, kn_texte($e['email'] ?? null, 200), kn_texte($e['telephone'] ?? null, 40),
        $entreprise, kn_texte($e['projet'] ?? null, 200), kn_texte($e['message'] ?? null, 6000),
        $origine, $origine ?? 'Hors site', $origine ?? 'Hors site',
        $statut, kn_crm_montant($e['valeur'] ?? $e['montant'] ?? null), kn_texte($e['responsable'] ?? null, 60),
        kn_texte($e['prochaine_action'] ?? null, 200), kn_crm_date($e['prochaine_date'] ?? null), $maintenant,
    ]);
    $id = (int) $db->lastInsertId();
    kn_crm_suivi($db, $id, 'creation', 'Fiche créée' . ($origine ? " (origine : $origine)" : '') . ($statut !== 'nouveau' ? ', étape : ' . KN_LIBELLES_STATUTS[$statut] : ''), $auteur);
    if ($note = kn_texte($e['note'] ?? null, 4000)) {
        kn_crm_suivi($db, $id, 'note', $note, $auteur);
    }
    return $id;
}

/** Met à jour une fiche ; chaque changement d'étape, de responsable, de montant ou de prochaine action s'écrit dans le fil. */
function kn_crm_maj(PDO $db, int $id, array $e, ?string $auteur): bool
{
    $avant = kn_tous($db, 'SELECT * FROM leads WHERE id = ?', [$id])[0] ?? null;
    if (!$avant) {
        return false;
    }
    $entier = fn($v) => $v === null ? null : (int) $v;
    $champs = [];
    $valeurs = [];
    $journal = [];

    if (isset($e['statut']) && in_array($e['statut'], KN_STATUTS, true) && $e['statut'] !== $avant['statut']) {
        $champs[] = 'statut = ?';
        $valeurs[] = $e['statut'];
        $journal[] = ['statut', 'Étape : ' . KN_LIBELLES_STATUTS[$e['statut']]];
    }
    if (array_key_exists('valeur', $e) || array_key_exists('montant', $e)) {
        $v = kn_crm_montant(array_key_exists('valeur', $e) ? $e['valeur'] : $e['montant']);
        if ($v !== $entier($avant['valeur'])) {
            $champs[] = 'valeur = ?';
            $valeurs[] = $v;
            $journal[] = ['montant', $v === null ? 'Montant retiré' : 'Montant : ' . kn_crm_chf($v)];
        }
    }
    if (array_key_exists('responsable', $e)) {
        $r = kn_texte($e['responsable'], 60);
        if ($r !== $avant['responsable']) {
            $champs[] = 'responsable = ?';
            $valeurs[] = $r;
            $journal[] = ['responsable', $r !== null ? "Responsable : $r" : 'Plus de responsable'];
        }
    }
    if (array_key_exists('prochaine_action', $e) || array_key_exists('prochaine_date', $e)) {
        $a = array_key_exists('prochaine_action', $e) ? kn_texte($e['prochaine_action'], 200) : $avant['prochaine_action'];
        $d = array_key_exists('prochaine_date', $e) ? kn_crm_date($e['prochaine_date']) : $entier($avant['prochaine_date']);
        if ($a !== $avant['prochaine_action'] || $d !== $entier($avant['prochaine_date'])) {
            $champs[] = 'prochaine_action = ?';
            $valeurs[] = $a;
            $champs[] = 'prochaine_date = ?';
            $valeurs[] = $d;
            $journal[] = ['action', $a !== null || $d !== null
                ? 'Prochaine action : ' . ($a ?? 'à préciser') . ($d !== null ? ' (' . date('d.m.Y', intdiv($d, 1000)) . ')' : '')
                : 'Fait ou retiré : ' . ($avant['prochaine_action'] ?? 'prochaine action')];
        }
    }
    foreach (['nom' => 150, 'email' => 200, 'telephone' => 40, 'entreprise' => 150, 'projet' => 200, 'origine_declaree' => 120, 'notes' => 8000] as $c => $max) {
        if (array_key_exists($c, $e)) {
            $v = kn_texte($e[$c], $max);
            if ($v !== $avant[$c]) {
                $champs[] = "$c = ?";
                $valeurs[] = $v;
            }
        }
    }
    if (!$champs) {
        return true;
    }
    $champs[] = 'maj = ?';
    $valeurs[] = kn_maintenant();
    $valeurs[] = $id;
    $db->prepare('UPDATE leads SET ' . implode(', ', $champs) . ' WHERE id = ?')->execute($valeurs);
    foreach ($journal as [$type, $texte]) {
        kn_crm_suivi($db, $id, $type, $texte, $auteur);
    }
    return true;
}

/** « Où ça en est » : un message dans le fil de la fiche. */
function kn_crm_noter(PDO $db, int $id, $texte, ?string $auteur): bool
{
    $t = kn_texte($texte, 4000);
    if ($t === null || !kn_un($db, 'SELECT 1 FROM leads WHERE id = ?', [$id])) {
        return false;
    }
    kn_crm_suivi($db, $id, 'note', $t, $auteur);
    $db->prepare('UPDATE leads SET maj = ? WHERE id = ?')->execute([kn_maintenant(), $id]);
    return true;
}

// --- PDF joints -----------------------------------------------------------------------

function kn_crm_dossier_fichiers(): string
{
    $d = kn_dossier_donnees() . '/fichiers';
    if (!is_dir($d)) {
        mkdir($d, 0700, true);
    }
    return $d;
}

/** Joint un PDF envoyé par formulaire ($_FILES) : 10 Mo au plus, vrai PDF uniquement. */
function kn_crm_joindre(PDO $db, int $lead, array $f, ?string $auteur): array
{
    if (!kn_un($db, 'SELECT 1 FROM leads WHERE id = ?', [$lead])) {
        return ['ok' => false, 'erreur' => 'Fiche introuvable.'];
    }
    $tmp = (string) ($f['tmp_name'] ?? '');
    if (($f['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || !is_uploaded_file($tmp)) {
        return ['ok' => false, 'erreur' => ($f['error'] ?? 0) === UPLOAD_ERR_INI_SIZE ? '10 Mo maximum.' : 'Fichier non reçu.'];
    }
    $taille = (int) ($f['size'] ?? 0);
    if ($taille <= 0 || $taille > KN_FICHIER_MAX) {
        return ['ok' => false, 'erreur' => '10 Mo maximum.'];
    }
    $entete = (string) file_get_contents($tmp, false, null, 0, 5);
    $type = (new finfo(FILEINFO_MIME_TYPE))->file($tmp);
    if ($entete !== '%PDF-' || $type !== 'application/pdf') {
        return ['ok' => false, 'erreur' => 'PDF uniquement.'];
    }
    $cle = bin2hex(random_bytes(16));
    if (!move_uploaded_file($tmp, kn_crm_dossier_fichiers() . "/$cle.pdf")) {
        return ['ok' => false, 'erreur' => 'Enregistrement impossible.'];
    }
    $nom = basename(str_replace('\\', '/', (string) ($f['name'] ?? '')));
    $nom = kn_texte(preg_replace('/[^\p{L}\p{N} ._()\'-]+/u', '_', $nom) ?? '', 150) ?? 'document.pdf';
    if (!preg_match('/\.pdf$/i', $nom)) {
        $nom .= '.pdf';
    }
    $db->prepare('INSERT INTO fichiers (lead, date, auteur, nom, taille, cle) VALUES (?, ?, ?, ?, ?, ?)')
        ->execute([$lead, kn_maintenant(), $auteur, $nom, $taille, $cle]);
    $id = (int) $db->lastInsertId();
    kn_crm_suivi($db, $lead, 'fichier', "PDF joint : $nom", $auteur);
    $db->prepare('UPDATE leads SET maj = ? WHERE id = ?')->execute([kn_maintenant(), $lead]);
    return ['ok' => true, 'id' => $id];
}

/** Envoie un PDF joint (l'appelant a vérifié la connexion). */
function kn_crm_envoyer_fichier(PDO $db, int $id): void
{
    $f = kn_tous($db, 'SELECT nom, cle FROM fichiers WHERE id = ?', [$id])[0] ?? null;
    $chemin = $f && preg_match('/^[a-f0-9]{32}$/', (string) $f['cle']) ? kn_crm_dossier_fichiers() . '/' . $f['cle'] . '.pdf' : '';
    if ($chemin === '' || !is_file($chemin)) {
        kn_json(['ok' => false, 'erreur' => 'Fichier introuvable.'], 404);
    }
    $nom = str_replace(['"', "\r", "\n", '\\'], '', (string) $f['nom']);
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="' . $nom . '"; filename*=UTF-8\'\'' . rawurlencode($nom));
    header('Content-Length: ' . filesize($chemin));
    header('Cache-Control: private, no-store');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex, nofollow');
    readfile($chemin);
    exit;
}

/** Retire un PDF joint (bouton « Retirer », après confirmation dans l'interface). */
function kn_crm_retirer_fichier(PDO $db, int $id, ?string $auteur): bool
{
    $f = kn_tous($db, 'SELECT lead, nom, cle FROM fichiers WHERE id = ?', [$id])[0] ?? null;
    if (!$f) {
        return false;
    }
    if (preg_match('/^[a-f0-9]{32}$/', (string) $f['cle'])) {
        @unlink(kn_crm_dossier_fichiers() . '/' . $f['cle'] . '.pdf');
    }
    $db->prepare('DELETE FROM fichiers WHERE id = ?')->execute([$id]);
    kn_crm_suivi($db, (int) $f['lead'], 'fichier', 'PDF retiré : ' . $f['nom'], $auteur);
    return true;
}
