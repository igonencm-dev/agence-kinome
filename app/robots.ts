import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

// Export statique : robots.txt pré-généré au build.
export const dynamic = "force-static";

/**
 * robots.txt — politique d'indexation explicite.
 *
 * On autorise explicitement les bots des moteurs de recherche IA (GPTBot,
 * ClaudeBot, PerplexityBot…) en plus du bot générique. Donner une règle
 * dédiée à chaque bot est un signal AEO positif : ces moteurs traitent
 * différemment un site qui les nomme explicitement (signal de confiance)
 * vs un site qui se contente d'un `User-agent: *`.
 *
 * Si on voulait au contraire BLOQUER un de ces bots (ex: refuser que nos
 * contenus servent à entraîner des modèles), il suffirait de passer son
 * `allow` à `disallow`.
 */
export default function robots(): MetadataRoute.Robots {
  const commonRule = {
    allow: "/",
    // `/signature/` héberge les assets de la signature mail de Mathias.
    // On ne veut pas que ces images soient indexées ni associées au site
    // dans les SERP / images.
    disallow: ["/api/", "/_next/", "/signature/"],
  };

  return {
    rules: [
      // Bot générique : tous les crawlers non listés.
      { userAgent: "*", ...commonRule },

      // OpenAI / ChatGPT
      // GPTBot   = crawler officiel OpenAI pour l'entraînement.
      // ChatGPT-User = bot temps réel quand ChatGPT browse le web.
      { userAgent: "GPTBot", ...commonRule },
      { userAgent: "ChatGPT-User", ...commonRule },
      { userAgent: "OAI-SearchBot", ...commonRule },

      // Anthropic / Claude
      // ClaudeBot = entraînement.
      // anthropic-ai = ancien nom, encore parfois utilisé.
      // Claude-Web = browse temps réel.
      { userAgent: "ClaudeBot", ...commonRule },
      { userAgent: "anthropic-ai", ...commonRule },
      { userAgent: "Claude-Web", ...commonRule },

      // Perplexity
      { userAgent: "PerplexityBot", ...commonRule },
      { userAgent: "Perplexity-User", ...commonRule },

      // Google AI (Bard, Gemini)
      // Google-Extended contrôle l'usage par Google AI sans toucher au
      // crawler Search principal.
      { userAgent: "Google-Extended", ...commonRule },

      // Meta AI (Llama)
      { userAgent: "Meta-ExternalAgent", ...commonRule },
      { userAgent: "FacebookBot", ...commonRule },

      // Apple Intelligence
      { userAgent: "Applebot-Extended", ...commonRule },

      // Common Crawl (alimente plusieurs LLM open-source)
      { userAgent: "CCBot", ...commonRule },

      // Bing AI Copilot
      { userAgent: "Bingbot", ...commonRule },

      // You.com
      { userAgent: "YouBot", ...commonRule },

      // Bytespider (Doubao / TikTok)
      { userAgent: "Bytespider", ...commonRule },

      // Cohere
      { userAgent: "cohere-ai", ...commonRule },

      // Diffbot (alimente plusieurs systèmes de Knowledge Graph)
      { userAgent: "Diffbot", ...commonRule },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
