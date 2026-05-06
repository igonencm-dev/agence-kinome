import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

// Export statique : robots.txt pré-généré au build.
export const dynamic = "force-static";

/**
 * robots.txt — politique d'indexation.
 * Tout est autorisé sauf l'API PHP et les fichiers internes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
