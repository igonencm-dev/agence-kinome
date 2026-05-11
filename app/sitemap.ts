import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";
import { projets } from "./lib/projets";
import { blogPosts } from "./lib/blog";

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
    { url: `${base}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/a-propos/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/processus/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/partenaires/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/mentions-legales/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/politique-de-confidentialite/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const projetPages: MetadataRoute.Sitemap = projets.map((p) => ({
    url: `${base}/projets/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Pages anglaises (miroir des principales pages FR, avec slugs traduits)
  const enPages: MetadataRoute.Sitemap = [
    { url: `${base}/en/`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/en/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/en/portfolio/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/en/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/en/process/`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/en/partners/`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/en/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.75 },
    { url: `${base}/en/legal/`, lastModified: now, changeFrequency: "yearly", priority: 0.15 },
    { url: `${base}/en/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.15 },
  ];

  return [...staticPages, ...projetPages, ...blogPages, ...enPages];
}
