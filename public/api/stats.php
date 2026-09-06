<?php
/**
 * Compteurs de vues et de « j'aime » des articles du blog — Agence Kinome
 *
 * Le site est un export statique : ce petit endpoint PHP garde les compteurs
 * dans un fichier JSON (api/data/stats.json, jamais servi grâce au .htaccess,
 * jamais versionné, jamais écrasé par le déploiement rsync).
 *
 *   GET  /api/stats.php?slug=<slug>   → { ok, slug, vues, jaime }
 *   GET  /api/stats.php?all=1         → { ok, articles: { slug: { vues, jaime } } }
 *   POST /api/stats.php  JSON { slug, action: "vue" | "jaime" | "retirer_jaime" }
 *                                     → { ok, slug, vues, jaime, deja? }
 *
 * Garde-fous : slug validé, robots ignorés, une vue par IP et par article
 * toutes les 30 minutes, un « j'aime » par IP et par article, nombre
 * d'articles plafonné (aucune pollution possible par des slugs inventés).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === 'https://agence-kinome.ch' || $origin === 'https://www.agence-kinome.ch') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($methode === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Stockage ---------------------------------------------------------------
const MAX_ARTICLES = 300;
const DELAI_VUE    = 1800; // secondes entre deux vues comptées pour une même IP

$dossier = __DIR__ . '/data';
if (!is_dir($dossier)) {
    @mkdir($dossier, 0755, true);
}
$stockageTemporaire = !is_dir($dossier) || !is_writable($dossier);
$fichier = $stockageTemporaire
    ? sys_get_temp_dir() . '/kinome_stats.json'
    : $dossier . '/stats.json';

function repondre(array $donnees, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($donnees, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function slugValide(string $slug): bool
{
    return strlen($slug) <= 80 && preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) === 1;
}

/** Lit le fichier (verrou partagé). */
function lireStats(string $fichier): array
{
    if (!is_file($fichier)) {
        return ['articles' => []];
    }
    $h = fopen($fichier, 'r');
    if (!$h) {
        return ['articles' => []];
    }
    flock($h, LOCK_SH);
    $brut = stream_get_contents($h) ?: '';
    flock($h, LOCK_UN);
    fclose($h);
    $donnees = json_decode($brut, true);
    return is_array($donnees) && isset($donnees['articles']) ? $donnees : ['articles' => []];
}

/** Lit, modifie et réécrit le fichier sous verrou exclusif. */
function modifierStats(string $fichier, callable $fn): array
{
    $h = fopen($fichier, 'c+');
    if (!$h) {
        repondre(['ok' => false, 'error' => 'Stockage indisponible.'], 500);
    }
    flock($h, LOCK_EX);
    $brut = stream_get_contents($h) ?: '';
    $donnees = json_decode($brut, true);
    if (!is_array($donnees) || !isset($donnees['articles'])) {
        $donnees = ['articles' => []];
    }
    $donnees = $fn($donnees);
    $donnees['maj'] = date('c');
    ftruncate($h, 0);
    rewind($h);
    fwrite($h, json_encode($donnees, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    fflush($h);
    flock($h, LOCK_UN);
    fclose($h);
    return $donnees;
}

function compteurs(array $donnees, string $slug): array
{
    $a = $donnees['articles'][$slug] ?? ['vues' => 0, 'jaime' => 0];
    return ['vues' => (int) ($a['vues'] ?? 0), 'jaime' => (int) ($a['jaime'] ?? 0)];
}

// --- Lecture ------------------------------------------------------------------
if ($methode === 'GET') {
    $donnees = lireStats($fichier);
    if (isset($_GET['all'])) {
        $sortie = [];
        foreach ($donnees['articles'] as $slug => $a) {
            $sortie[$slug] = ['vues' => (int) ($a['vues'] ?? 0), 'jaime' => (int) ($a['jaime'] ?? 0)];
        }
        repondre(['ok' => true, 'articles' => $sortie] + ($stockageTemporaire ? ['stockage' => 'temporaire'] : []));
    }
    $slug = (string) ($_GET['slug'] ?? '');
    if (!slugValide($slug)) {
        repondre(['ok' => false, 'error' => 'Slug invalide.'], 400);
    }
    repondre(['ok' => true, 'slug' => $slug] + compteurs($donnees, $slug));
}

if ($methode !== 'POST') {
    repondre(['ok' => false, 'error' => 'Méthode non autorisée.'], 405);
}

// --- Écriture -----------------------------------------------------------------
$brut = file_get_contents('php://input') ?: '';
$entree = json_decode($brut, true);
if (!is_array($entree)) {
    $entree = $_POST;
}
$slug   = (string) ($entree['slug'] ?? '');
$action = (string) ($entree['action'] ?? '');

if (!slugValide($slug)) {
    repondre(['ok' => false, 'error' => 'Slug invalide.'], 400);
}
if (!in_array($action, ['vue', 'jaime', 'retirer_jaime'], true)) {
    repondre(['ok' => false, 'error' => 'Action inconnue.'], 400);
}

// Les robots ne comptent pas (mais reçoivent quand même les compteurs).
$ua = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
$robot = $ua === '' || preg_match('/bot|crawl|spider|slurp|preview|lighthouse|headless|facebookexternalhit|curl|wget|python/', $ua) === 1;
if ($robot) {
    repondre(['ok' => true, 'slug' => $slug, 'ignore' => 'robot'] + compteurs(lireStats($fichier), $slug));
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$marqueur = sys_get_temp_dir() . '/kinome_' . $action . '_' . md5($ip . '|' . $slug);
$maintenant = time();

if ($action === 'vue') {
    $marqueurVue = sys_get_temp_dir() . '/kinome_vue_' . md5($ip . '|' . $slug);
    if (is_file($marqueurVue) && (int) file_get_contents($marqueurVue) > $maintenant - DELAI_VUE) {
        repondre(['ok' => true, 'slug' => $slug, 'deja' => true] + compteurs(lireStats($fichier), $slug));
    }
    @file_put_contents($marqueurVue, (string) $maintenant);
    $donnees = modifierStats($fichier, function (array $d) use ($slug) {
        if (!isset($d['articles'][$slug]) && count($d['articles']) >= MAX_ARTICLES) {
            return $d;
        }
        $d['articles'][$slug]['vues'] = (int) ($d['articles'][$slug]['vues'] ?? 0) + 1;
        $d['articles'][$slug]['jaime'] = (int) ($d['articles'][$slug]['jaime'] ?? 0);
        return $d;
    });
    repondre(['ok' => true, 'slug' => $slug] + compteurs($donnees, $slug));
}

if ($action === 'jaime') {
    $marqueurJaime = sys_get_temp_dir() . '/kinome_jaime_' . md5($ip . '|' . $slug);
    if (is_file($marqueurJaime)) {
        repondre(['ok' => true, 'slug' => $slug, 'deja' => true] + compteurs(lireStats($fichier), $slug));
    }
    @file_put_contents($marqueurJaime, (string) $maintenant);
    $donnees = modifierStats($fichier, function (array $d) use ($slug) {
        if (!isset($d['articles'][$slug]) && count($d['articles']) >= MAX_ARTICLES) {
            return $d;
        }
        $d['articles'][$slug]['vues'] = (int) ($d['articles'][$slug]['vues'] ?? 0);
        $d['articles'][$slug]['jaime'] = (int) ($d['articles'][$slug]['jaime'] ?? 0) + 1;
        return $d;
    });
    repondre(['ok' => true, 'slug' => $slug] + compteurs($donnees, $slug));
}

// retirer_jaime : seulement si cette IP avait aimé
$marqueurJaime = sys_get_temp_dir() . '/kinome_jaime_' . md5($ip . '|' . $slug);
if (!is_file($marqueurJaime)) {
    repondre(['ok' => true, 'slug' => $slug, 'deja' => true] + compteurs(lireStats($fichier), $slug));
}
@unlink($marqueurJaime);
$donnees = modifierStats($fichier, function (array $d) use ($slug) {
    if (isset($d['articles'][$slug])) {
        $d['articles'][$slug]['jaime'] = max(0, (int) ($d['articles'][$slug]['jaime'] ?? 0) - 1);
    }
    return $d;
});
repondre(['ok' => true, 'slug' => $slug] + compteurs($donnees, $slug));
