<?php
/**
 * Configuration SMTP — Agence Kinome
 *
 * IMPORTANT : Copier ce fichier en `config.php` et y mettre les vraies valeurs.
 * `config.php` est exclu du dépôt Git (cf. .gitignore) pour ne pas exposer
 * le mot de passe SMTP.
 *
 * Sur Hostinger : remplir directement `config.php` via le gestionnaire de
 * fichiers ou le SFTP — il ne sera jamais écrasé par le déploiement
 * (.gitignore + workflow GitHub Actions configuré pour ne pas le toucher).
 */

return [
    // Hôte SMTP (Hostinger)
    'smtp_host'        => 'smtp.hostinger.com',
    'smtp_port'        => 465,
    'smtp_secure'      => 'ssl', // 'ssl' (port 465) ou 'tls' (port 587)

    // Identifiants de la boîte d'envoi
    'smtp_username'    => 'contact@agence-kinome.ch',
    'smtp_password'    => 'METTRE_LE_MDP_ICI',

    // Adresse expéditeur (souvent identique à smtp_username)
    'from_email'       => 'contact@agence-kinome.ch',
    'from_name'        => 'Agence Kinome',

    // Adresse(s) qui reçoivent les soumissions du formulaire
    'to_emails'        => [
        'contact@agence-kinome.ch', // boîte principale
        // 'mathias@agence-kinome.ch', // décommenter pour copie
    ],

    // Sécurité
    'allowed_origin'   => 'https://agence-kinome.ch',
    'rate_limit_per_h' => 5, // max 5 soumissions par IP par heure
];
