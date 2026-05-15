import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";
import { projets } from "./lib/projets";
import { blogPosts } from "./lib/blog";

// Export statique : sitemap pré-généré au build, jamais régénéré.
export const dynamic = "force-static";

/**
 * Sitemap auto-généré.
 *
 * Architecture multilingue : chaque URL principale embarque ses
 * `alternates.languages` (équivalent <xhtml:link rel="alternate" hreflang>)
 * pour signaler à Google les versions FR ↔ EN d'une même page. Renforce le
 * hreflang déjà déclaré dans les <head> via app/lib/seo.ts.
 *
 * Pages : 11 FR + 11 EN (miroir) + 16 projets FR + 16 projets EN + N articles
 * blog FR. Le blog EN ne sert qu'une page d'index (articles restent en FR).
 *
 * Next.js produit `out/sitemap.xml` au build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  // Helper : construit une entrée sitemap avec annotation hreflang.
  // `fr` et `en` sont des chemins relatifs au domaine (ex: "/", "/en/").
  const withAlt = (
    fr: string,
    en: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = now
  ): MetadataRoute.Sitemap => [
    {
      url: `${base}${fr}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: `${base}${fr}`,
          en: `${base}${en}`,
          "x-default": `${base}${fr}`,
        },
      },
    },
    {
      url: `${base}${en}`,
      lastModified,
      // EN priorité légèrement plus basse (marché secondaire).
      priority: Math.max(0.1, priority - 0.05),
      changeFrequency,
      alternates: {
        languages: {
          fr: `${base}${fr}`,
          en: `${base}${en}`,
          "x-default": `${base}${fr}`,
        },
      },
    },
  ];

  // Pages statiques pairées FR ↔ EN
  const pairedPages: MetadataRoute.Sitemap = [
    ...withAlt("/", "/en/", 1.0, "weekly"),
    ...withAlt("/services/", "/en/services/", 0.9, "monthly"),
    ...withAlt("/portfolio/", "/en/portfolio/", 0.9, "weekly"),
    ...withAlt("/blog/", "/en/blog/", 0.85, "weekly"),
    ...withAlt("/a-propos/", "/en/about/", 0.7, "monthly"),
    ...withAlt("/processus/", "/en/process/", 0.7, "monthly"),
    ...withAlt("/partenaires/", "/en/partners/", 0.6, "monthly"),
    ...withAlt("/contact/", "/en/contact/", 0.8, "yearly"),
    // AEO kit média — version FR + EN
    ...withAlt("/dossier-presse/", "/en/press-kit/", 0.65, "monthly"),
    ...withAlt("/mentions-legales/", "/en/legal/", 0.2, "yearly"),
    ...withAlt("/politique-de-confidentialite/", "/en/privacy/", 0.2, "yearly"),
  ];

  // Pages projet (slug identique FR/EN, seul le préfixe change)
  const projetPages: MetadataRoute.Sitemap = projets.flatMap((p) => {
    const fr = `/projets/${p.slug}/`;
    const en = `/en/projets/${p.slug}/`;
    return [
      {
        url: `${base}${fr}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${base}${fr}`,
            en: `${base}${en}`,
            "x-default": `${base}${fr}`,
          },
        },
      },
      {
        url: `${base}${en}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: {
          languages: {
            fr: `${base}${fr}`,
            en: `${base}${en}`,
            "x-default": `${base}${fr}`,
          },
        },
      },
    ];
  });

  // Articles blog (FR uniquement — pas d'équivalent EN par article).
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...pairedPages, ...projetPages, ...blogPages];
}
