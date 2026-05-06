import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";
import { projets } from "./lib/projets";

// Export statique : sitemap pré-généré au build, jamais régénéré.
export const dynamic = "force-static";

/**
 * Sitemap auto-généré.
 * - Pages statiques principales (priorités calibrées)
 * - 16 pages projet dynamiques
 *
 * Next.js produit `out/sitemap.xml` au build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/a-propos/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/processus/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/partenaires/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const projetPages: MetadataRoute.Sitemap = projets.map((p) => ({
    url: `${base}/projets/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projetPages];
}
