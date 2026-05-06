<?php
/**
 * Endpoint de réception du formulaire de contact — Agence Kinome
 *
 * Reçoit un POST JSON depuis app/contact/page.tsx, valide les champs,
 * envoie deux mails (notification interne + confirmation au visiteur)
 * via SMTP Hostinger avec PHPMailer.
 *
 * Réponse : JSON { ok: true } ou { ok: false, error: "..." }
 */

declare(strict_types=1);

// --- Charge la config et PHPMailer -----------------------------------------
$config = require __DIR__ . '/config.php';

require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';
require __DIR__ . '/lib/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Headers de réponse + CORS strict --------------------------------------
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = $config['allowed_origin'];
if ($origin && ($origin === $allowed || $origin === 'https://www.agence-kinome.ch')) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée.']);
    exit;
}

// --- Parse l'entrée (JSON ou form-urlencoded) ------------------------------
$raw = file_get_contents('php://input') ?: '';
$data = [];
if ($raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

// --- Honeypot anti-bot ------------------------------------------------------
// Le champ `website` est invisible dans le formulaire ; s'il est rempli,
// c'est un bot.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// --- Rate limit basique par IP (fichier temporaire) -----------------------
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateFile = sys_get_temp_dir() . '/kinome_rl_' . md5($ip);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = json_decode((string) file_get_contents($rateFile), true) ?: [];
    $hits = array_values(array_filter($hits, fn($t) => $t > $now - 3600));
}
if (count($hits) >= ($config['rate_limit_per_h'] ?? 5)) {
    http_response_code(429);
    echo json_encode([
        'ok' => false,
        'error' => 'Trop de tentatives. Merci de réessayer dans une heure.',
    ]);
    exit;
}

// --- Validation des champs --------------------------------------------------
$prenom  = trim((string) ($data['prenom']  ?? ''));
$nom     = trim((string) ($data['nom']     ?? ''));
$email   = trim((string) ($data['email']   ?? ''));
$societe = trim((string) ($data['societe'] ?? ''));
$besoin  = trim((string) ($data['besoin']  ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$errors = [];
if ($prenom === '' || mb_strlen($prenom) > 80) {
    $errors[] = 'Le prénom est requis.';
}
if ($nom === '' || mb_strlen($nom) > 80) {
    $errors[] = 'Le nom est requis.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Une adresse e-mail valide est requise.';
}
if ($societe === '' || mb_strlen($societe) > 120) {
    $errors[] = 'Le nom de la société est requis.';
}
if ($message === '' || mb_strlen($message) < 10) {
    $errors[] = 'Le message doit contenir au moins 10 caractères.';
}
if (mb_strlen($message) > 5000) {
    $errors[] = 'Le message dépasse 5000 caractères.';
}

if ($errors) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// Échappe les champs pour insertion en HTML
$h = fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$nl2br_safe = fn(string $s): string => nl2br($h($s));

$fullName = trim($prenom . ' ' . $nom);
$dateFr   = (new DateTimeImmutable('now', new DateTimeZone('Europe/Zurich')))
    ->format('d/m/Y à H:i');

// --- Construction des deux mails -------------------------------------------
$brand = [
    'cream'  => '#f9f7f2',
    'dark'   => '#222222',
    'black'  => '#111111',
    'grey'   => '#555555',
    'accent' => '#e04034',
];

/* ============================================================
 * MAIL 1 — Notification interne (vers contact@agence-kinome.ch)
 * ============================================================ */
$internalSubject = sprintf(
    '[Site] Nouveau message de %s — %s',
    $fullName,
    $societe
);

$internalHtml = <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>{$h($internalSubject)}</title>
</head>
<body style="margin:0;padding:0;background:{$brand['cream']};font-family:'Helvetica Neue',Arial,sans-serif;color:{$brand['black']};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:{$brand['cream']};padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:{$brand['dark']};padding:32px 40px;text-align:left;">
              <div style="color:#ffffff;font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:0.7;">Agence Kinome</div>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:600;">Nouveau message reçu</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px;">
              <p style="margin:0 0 24px;color:{$brand['grey']};font-size:14px;">Reçu le {$h($dateFr)} via le formulaire de contact.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #ececec;">
                    <div style="font-size:12px;color:{$brand['grey']};text-transform:uppercase;letter-spacing:1px;">Nom complet</div>
                    <div style="font-size:16px;color:{$brand['black']};margin-top:4px;">{$h($fullName)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #ececec;">
                    <div style="font-size:12px;color:{$brand['grey']};text-transform:uppercase;letter-spacing:1px;">Email</div>
                    <div style="font-size:16px;color:{$brand['black']};margin-top:4px;"><a href="mailto:{$h($email)}" style="color:{$brand['accent']};text-decoration:none;">{$h($email)}</a></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #ececec;">
                    <div style="font-size:12px;color:{$brand['grey']};text-transform:uppercase;letter-spacing:1px;">Société</div>
                    <div style="font-size:16px;color:{$brand['black']};margin-top:4px;">{$h($societe)}</div>
                  </td>
                </tr>
HTML;

if ($besoin !== '') {
    $internalHtml .= <<<HTML
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #ececec;">
                    <div style="font-size:12px;color:{$brand['grey']};text-transform:uppercase;letter-spacing:1px;">Besoin exprimé</div>
                    <div style="font-size:16px;color:{$brand['black']};margin-top:4px;">{$h($besoin)}</div>
                  </td>
                </tr>
HTML;
}

$internalHtml .= <<<HTML
              </table>
              <div style="margin:32px 0 0;padding:24px;background:{$brand['cream']};border-radius:12px;">
                <div style="font-size:12px;color:{$brand['grey']};text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Message</div>
                <div style="font-size:15px;line-height:1.6;color:{$brand['black']};">{$nl2br_safe($message)}</div>
              </div>
              <div style="margin:32px 0 0;text-align:center;">
                <a href="mailto:{$h($email)}?subject=Re%3A%20Votre%20demande%20%E2%80%94%20Agence%20Kinome"
                   style="display:inline-block;background:{$brand['black']};color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:600;">Répondre à {$h($prenom)}</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px;text-align:center;color:{$brand['grey']};font-size:12px;">
              Agence Kinome · Genève, Suisse
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$internalText = "Nouveau message via le formulaire de contact\n"
    . "Reçu le {$dateFr}\n"
    . "----------------------------------------\n"
    . "Nom : {$fullName}\n"
    . "Email : {$email}\n"
    . "Société : {$societe}\n"
    . ($besoin !== '' ? "Besoin : {$besoin}\n" : '')
    . "----------------------------------------\n"
    . "Message :\n{$message}\n";

/* ============================================================
 * MAIL 2 — Confirmation HTML au visiteur
 * ============================================================ */
$confirmSubject = 'Votre message est bien arrivé — Agence Kinome';

$confirmHtml = <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>{$h($confirmSubject)}</title>
</head>
<body style="margin:0;padding:0;background:{$brand['cream']};font-family:'Helvetica Neue',Arial,sans-serif;color:{$brand['black']};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:{$brand['cream']};padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:{$brand['dark']};padding:48px 40px;text-align:center;">
              <div style="color:#ffffff;font-size:13px;letter-spacing:3px;text-transform:uppercase;opacity:0.7;">Agence Kinome</div>
              <h1 style="margin:16px 0 0;color:#ffffff;font-size:32px;font-weight:400;line-height:1.2;">Merci, {$h($prenom)} 👋</h1>
              <p style="margin:12px 0 0;color:#ffffff;font-size:15px;opacity:0.85;">Votre message est bien arrivé.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:{$brand['black']};">
                Nous avons bien reçu votre demande et nous vous remercions de l'intérêt
                que vous portez à notre travail.
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:{$brand['black']};">
                Mathias ou Tanguy reviendra vers vous sous <strong>24 à 48 heures ouvrées</strong>
                pour échanger autour de votre projet et organiser un premier appel si vous le souhaitez.
              </p>
              <div style="margin:32px 0;padding:24px;background:{$brand['cream']};border-radius:12px;border-left:4px solid {$brand['accent']};">
                <div style="font-size:12px;color:{$brand['grey']};text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Récapitulatif de votre demande</div>
                <div style="font-size:14px;line-height:1.6;color:{$brand['black']};">{$nl2br_safe($message)}</div>
              </div>
              <p style="margin:0 0 8px;font-size:15px;color:{$brand['black']};">
                En attendant, n'hésitez pas à découvrir nos derniers projets&nbsp;:
              </p>
              <div style="margin:24px 0;text-align:center;">
                <a href="https://agence-kinome.ch/portfolio/"
                   style="display:inline-block;background:{$brand['black']};color:#ffffff;padding:14px 36px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.5px;">Voir le portfolio</a>
              </div>
              <p style="margin:32px 0 0;font-size:14px;line-height:1.6;color:{$brand['grey']};text-align:center;font-style:italic;">
                « Remettre l'humain au cœur des échanges »
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px;background:{$brand['cream']};text-align:center;">
              <div style="font-size:13px;color:{$brand['grey']};line-height:1.8;">
                <strong style="color:{$brand['black']};">Agence Kinome Sàrl</strong><br>
                Genève, Suisse<br>
                <a href="mailto:contact@agence-kinome.ch" style="color:{$brand['accent']};text-decoration:none;">contact@agence-kinome.ch</a>
              </div>
              <div style="margin-top:16px;font-size:12px;color:{$brand['grey']};">
                <a href="https://www.linkedin.com/company/agence-kinome" style="color:{$brand['grey']};text-decoration:underline;margin:0 8px;">LinkedIn</a>
                ·
                <a href="https://www.instagram.com/agencekinome/" style="color:{$brand['grey']};text-decoration:underline;margin:0 8px;">Instagram</a>
              </div>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:{$brand['grey']};max-width:600px;">
          Cet email vous a été envoyé automatiquement suite à l'envoi du formulaire de contact sur agence-kinome.ch.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$confirmText = "Bonjour {$prenom},\n\n"
    . "Merci pour votre message — il nous est bien parvenu.\n\n"
    . "Mathias ou Tanguy reviendra vers vous sous 24 à 48h ouvrées pour échanger "
    . "autour de votre projet.\n\n"
    . "En attendant, vous pouvez découvrir nos projets sur :\n"
    . "https://agence-kinome.ch/portfolio/\n\n"
    . "À très vite,\n"
    . "L'équipe Agence Kinome\n"
    . "contact@agence-kinome.ch\n";

// --- Envoi via PHPMailer ---------------------------------------------------
function sendMail(array $config, string $toEmail, string $toName, string $subject, string $html, string $text, ?string $replyTo = null): bool {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_username'];
        $mail->Password   = $config['smtp_password'];
        $mail->SMTPSecure = $config['smtp_secure'] === 'tls'
            ? PHPMailer::ENCRYPTION_STARTTLS
            : PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = (int) $config['smtp_port'];
        $mail->CharSet    = 'UTF-8';
        $mail->Encoding   = 'base64';

        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($toEmail, $toName);
        if ($replyTo) {
            $mail->addReplyTo($replyTo);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $html;
        $mail->AltBody = $text;

        return $mail->send();
    } catch (Exception $e) {
        error_log('[Kinome contact.php] ' . $mail->ErrorInfo);
        return false;
    }
}

// 1) Notification interne
$internalOk = false;
foreach ($config['to_emails'] as $to) {
    if (sendMail($config, $to, 'Agence Kinome', $internalSubject, $internalHtml, $internalText, $email)) {
        $internalOk = true;
    }
}

if (!$internalOk) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => "L'envoi a échoué. Merci de nous écrire directement à contact@agence-kinome.ch.",
    ]);
    exit;
}

// 2) Confirmation au visiteur (best-effort, on ne bloque pas la réponse si elle rate)
sendMail($config, $email, $fullName, $confirmSubject, $confirmHtml, $confirmText);

// --- Mise à jour du rate limit ---------------------------------------------
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits));

// --- Réponse OK ------------------------------------------------------------
echo json_encode(['ok' => true]);
