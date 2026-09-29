<?php
// Exécuté sur le serveur par scripts/admin-motdepasse.sh (jamais servi par le
// web : il est copié dans domains/agence-kinome.ch/data/ puis supprimé).
// Lit le mot de passe sur l'entrée standard, écrit son hash dans config.php
// et ferme toutes les sessions ouvertes du tableau de bord.
declare(strict_types=1);

$motDePasse = rtrim((string) stream_get_contents(STDIN), "\r\n");
if (mb_strlen($motDePasse) < 12) {
    fwrite(STDERR, "12 caractères minimum.\n");
    exit(1);
}

$dossier = __DIR__;
$fichier = $dossier . '/config.php';
$config = is_file($fichier) ? (array) require $fichier : [];
$config['mot_de_passe'] = password_hash($motDePasse, PASSWORD_DEFAULT);
$config['sel'] = $config['sel'] ?? bin2hex(random_bytes(16));
$config['email_alerte'] = $config['email_alerte'] ?? 'contact@agence-kinome.ch';
file_put_contents($fichier, "<?php\n// Configuration du tableau de bord /admin/ (hors du web, jamais versionnée)\nreturn " . var_export($config, true) . ";\n");
chmod($fichier, 0600);

// Un mot de passe changé depuis Réglages vit dans la base et primerait :
// on l'efface, puis on déconnecte tous les appareils.
$base = $dossier . '/kinome.sqlite';
if (is_file($base)) {
    $db = new PDO('sqlite:' . $base);
    $db->exec("DELETE FROM reglages WHERE cle = 'mot_de_passe'");
    $db->exec('DELETE FROM jetons');
}
echo "Mot de passe enregistré. Connexion : https://agence-kinome.ch/admin/\n";
