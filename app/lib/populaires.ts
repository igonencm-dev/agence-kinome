import type { BlogPost, CategorieBlog } from "./blog";

/**
 * Ordre de repli des « articles populaires » tant que les compteurs de vues
 * (api/stats.php) sont jeunes : classement Search Console par impressions
 * sur 28 jours, export du 6 septembre 2026. Dès que les vues réelles
 * existent, le composant ArticlesPopulaires reclasse d'après elles.
 */
export const POPULARITE_INITIALE: string[] = [
  "creer-site-ecommerce-suisse",
  "refonte-identite-visuelle-quand-repenser-marque",
  "creation-site-internet-geneve-guide",
  "creer-identite-visuelle-entreprise-geneve",
  "creation-logo-geneve-processus",
  "tarifs-agence-communication-geneve",
  "seo-referencement-naturel-geneve",
  "prix-referencement-seo-suisse",
  "prix-site-internet-suisse-2026",
  "agence-communication-suisse-romande",
  "carte-de-voeux-entreprise",
  "seo-ou-google-ads",
  "choisir-agence-communication-geneve",
  "referencement-local-google-maps-geneve",
  "meilleure-agence-communication-geneve",
];

export function trierParPopulariteInitiale<T extends { slug: string; date: string }>(
  posts: T[]
): T[] {
  const rang = (slug: string) => {
    const i = POPULARITE_INITIALE.indexOf(slug);
    return i === -1 ? POPULARITE_INITIALE.length : i;
  };
  return [...posts].sort(
    (a, b) => rang(a.slug) - rang(b.slug) || b.date.localeCompare(a.date)
  );
}

/** Libellés des rubriques du blog (filtres de /blog/). */
export const CATEGORIES: Record<CategorieBlog, string> = {
  identite: "Identité & logo",
  "site-web": "Site web & e-commerce",
  seo: "SEO & visibilité",
  agence: "Agence & tarifs",
  communication: "Communication & créa",
};

/** Résumé sérialisable d'un article, pour les composants client. */
export type ArticleResume = {
  slug: string;
  title: string;
  featuredImage: string;
  date: string;
  categorie: CategorieBlog;
};

export function resumer(p: BlogPost): ArticleResume {
  return {
    slug: p.slug,
    title: p.title,
    featuredImage: p.featuredImage,
    date: p.date,
    categorie: p.categorie,
  };
}
