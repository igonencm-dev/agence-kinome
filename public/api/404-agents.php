<?php
// Page introuvable pour les agents IA (25/11/2026).
// Le .htaccess envoie ici les adresses qui n'existent pas quand la requête demande du
// Markdown (« Accept: text/markdown ») : statut 404 conservé, mais une réponse courte en
// Markdown qui renvoie vers llms.txt, le plan du site et les pages utiles, au lieu de la
// page HTML de 404 pensée pour les humains (ErrorDocument 404 /404.html).
declare(strict_types=1);

http_response_code(404);
header('Content-Type: text/markdown; charset=utf-8');
header('Vary: Accept');
header('X-Robots-Tag: noindex');
header('Cache-Control: public, max-age=300');

// Adresse demandée, nettoyée (aucun caractère de mise en forme Markdown ni de contrôle).
$demande = (string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
$demande = mb_substr(preg_replace('/[^A-Za-z0-9\/._~%-]/', '', $demande) ?? '/', 0, 200);
$site = 'https://agence-kinome.ch';

echo <<<MD
# Page introuvable (404)

L'adresse `{$demande}` n'existe pas sur le site de l'Agence Kinome, agence de communication à Genève.

## Où trouver l'information

- [Guide du site pour les agents IA (llms.txt)]({$site}/llms.txt)
- [Plan du site (sitemap.xml)]({$site}/sitemap.xml)
- [Accueil]({$site}/)
- [Services et prix]({$site}/services/)
- [Blog]({$site}/blog/)
- [Contact]({$site}/contact/)

Chaque page du site existe aussi en Markdown : envoyez l'en-tête `Accept: text/markdown`.
Serveur MCP public en lecture seule : {$site}/mcp (carte : {$site}/.well-known/mcp/server-card.json).

MD;
