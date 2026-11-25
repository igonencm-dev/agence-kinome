import { SITE } from "../lib/seo";

// Export statique : robots.txt pré-généré au build.
export const dynamic = "force-static";

/**
 * robots.txt : politique d'indexation explicite (ex-app/robots.ts).
 *
 * Écrit à la main depuis le 25/11/2026 pour y ajouter les Content Signals (politique de
 * Cloudflare, contentsignals.org), que MetadataRoute.Robots ne sait pas produire. La
 * ligne « Content-Signal » est répétée dans chaque groupe : un robot nommé lit son groupe
 * et ignore celui de « * ».
 *
 * Choix : search=yes, ai-input=yes, ai-train=yes, dans la ligne de la politique déjà
 * suivie (les robots d'entraînement GPTBot, ClaudeBot… sont autorisés nommément pour
 * l'AEO). Pour refuser l'entraînement : ai-train=no, et passer les robots concernés en
 * Disallow.
 *
 * Les robots des moteurs IA sont nommés un par un : signal de confiance pour ces moteurs.
 */
const SIGNAL = "search=yes, ai-input=yes, ai-train=yes";
const INTERDITS = ["/api/", "/_next/", "/signature/", "/admin/", "/crm/"];

const ROBOTS = [
  "*",
  // OpenAI / ChatGPT : entraînement, navigation temps réel, recherche.
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic / Claude (anciens et nouveaux noms).
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google IA (Gemini), sans toucher à Googlebot.
  "Google-Extended",
  // Meta IA
  "Meta-ExternalAgent",
  "FacebookBot",
  // Apple Intelligence
  "Applebot-Extended",
  // Common Crawl, Bing, You.com, Bytespider, Cohere, Diffbot
  "CCBot",
  "Bingbot",
  "YouBot",
  "Bytespider",
  "cohere-ai",
  "Diffbot",
];

export function GET() {
  const politique = [
    "# As a condition of accessing this website, you agree to abide by the following",
    "# content signals:",
    "#",
    "# (a)  If a Content-Signal = yes, you may collect content for the corresponding use.",
    "# (b)  If a Content-Signal = no, you may not collect content for the corresponding use.",
    "# (c)  If the website operator does not include a Content-Signal for a corresponding",
    "#      use, the website operator neither grants nor restricts permission via",
    "#      Content-Signal with respect to the corresponding use.",
    "#",
    "# The content signals and their meanings are:",
    "#",
    "# search:   building a search index and providing search results (e.g., returning",
    "#           hyperlinks and short excerpts from your website's contents). Search does",
    "#           not include providing AI-generated search summaries.",
    "# ai-input: inputting content into one or more AI models (e.g., retrieval augmented",
    "#           generation, grounding, or other real-time taking of content for generative",
    "#           AI search answers).",
    "# ai-train: training or fine-tuning AI models.",
    "#",
    "# Policy: https://contentsignals.org/",
    "",
  ];
  const groupes = ROBOTS.map((ua) =>
    [`User-Agent: ${ua}`, `Content-Signal: ${SIGNAL}`, "Allow: /", ...INTERDITS.map((d) => `Disallow: ${d}`)].join("\n"),
  );
  const texte = [...politique, groupes.join("\n\n"), "", `Host: ${SITE.url}`, `Sitemap: ${SITE.url}/sitemap.xml`, ""].join("\n");
  return new Response(texte, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
