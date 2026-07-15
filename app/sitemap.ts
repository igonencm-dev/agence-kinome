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
/**
 * STATIC_LASTMOD : date stable du dernier update significatif des pages
 * structurelles (home, services, portfolio, etc.).
 *
 * À bumper manuellement quand on update VRAIMENT le contenu d'une page.
 * Sinon, garder cette date stable évite que Google considère qu'on flag
 * tous les contenus comme modifiés à chaque rebuild (ce qui dévalue à terme
 * la fiabilité du champ lastmod aux yeux du moteur).
 *
 * Dernier bump : 2026-05-19 — audit SEO + 8 quick wins + JSON-LD HowTo,
 * BlogPosting author Person, lang="en" sur sous-arbre /en, etc.
 */
const STATIC_LASTMOD = new Date("2026-05-19T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  // Helper : construit une entrée sitemap avec annotation hreflang.
  // `fr` et `en` sont des chemins relatifs au domaine (ex: "/", "/en/").
  const withAlt = (
    fr: string,
    en: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = STATIC_LASTMOD
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

  // Pages projet (slug identique FR/EN, seul le préfixe change).
  // Chaque page projet embarque sa cover image en `images:` → Google
  // les indexe dans Google Images (boost Image Search pour les projets
  // visuels du portfolio).
  const projetPages: MetadataRoute.Sitemap = projets.flatMap((p) => {
    const fr = `/projets/${p.slug}/`;
    const en = `/en/projets/${p.slug}/`;
    const coverUrl = p.cover.startsWith("http") ? p.cover : `${base}${p.cover}`;
    return [
      {
        url: `${base}${fr}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: [coverUrl],
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
        lastModified: STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        images: [coverUrl],
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
  // lastModified utilise `lastModified` si fourni dans l'article, sinon `date`.
  // featuredImage exposée en `images:` pour le Google Image Sitemap.
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.lastModified ?? p.date),
    changeFrequency: "monthly",
    priority: 0.75,
    images: [
      p.featuredImage.startsWith("http")
        ? p.featuredImage
        : `${base}${p.featuredImage}`,
    ],
  }));

  // Pages de services dédiées (landing de conversion, FR — EN à venir).
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${base}/services/identite-visuelle/`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/services/site-internet/`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  return [...pairedPages, ...servicePages, ...projetPages, ...blogPages];
}
