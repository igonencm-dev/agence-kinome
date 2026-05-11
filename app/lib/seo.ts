/**
 * Pivot SEO/AEO/GEO de l'Agence Kinome.
 *
 * - SEO classique : titles, descriptions, canonical, OG, Twitter
 * - AEO (Answer Engine Optimization) : structures de réponse, FAQ JSON-LD
 * - GEO (Generative / Geographic Engine Optimization) : LocalBusiness Genève,
 *   mentions explicites de la zone géographique, données factuelles
 *   structurées que les LLMs (ChatGPT, Perplexity, Claude…) peuvent citer.
 *
 * Toutes les pages doivent passer par `buildMetadata()` pour rester cohérentes.
 */

import type { Metadata } from "next";

// --------------------------------------------------------------------------
// Constantes site
// --------------------------------------------------------------------------

export const SITE = {
  name: "Agence Kinome",
  shortName: "Kinome",
  legalName: "Agence Kinome Sàrl",
  tagline: "Agence de communication indépendante à Genève",
  baseline: "Remettre l'humain au cœur des échanges.",
  url: "https://agence-kinome.ch",
  locale: "fr_CH",
  language: "fr",
  founded: "2022",
  ogImage: "/og/og-default.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterHandle: "@agencekinome",
} as const;

// Adresse / contact pour LocalBusiness (Schema.org)
// → Permet aux LLMs et à Google de citer Kinome comme agence basée à Genève.
export const BUSINESS = {
  street: "", // à compléter quand l'adresse précise sera communiquée
  city: "Genève",
  region: "Genève",
  postalCode: "1200",
  country: "CH",
  countryName: "Suisse",
  geo: {
    // Coordonnées centre Genève — affinables avec l'adresse exacte.
    latitude: 46.2044,
    longitude: 6.1432,
  },
  phone: "+41782652014", // Mathias, ligne principale
  email: "contact@agence-kinome.ch",
  openingHours: [
    "Mo-Fr 09:00-18:00",
  ],
  areaServed: [
    "Genève",
    "Lausanne",
    "Vaud",
    "Suisse romande",
    "Suisse",
    "France",
  ],
  priceRange: "€€",
} as const;

// Mots-clés pivots (utilisés ponctuellement, sans bourrage).
export const KEYWORDS_BASE = [
  "agence de communication Genève",
  "agence communication Suisse",
  "branding Genève",
  "création de logo Genève",
  "identité visuelle Genève",
  "agence digitale Genève",
  "agence créative Suisse romande",
  "design graphique Genève",
  "site internet Genève",
  "Kinome",
] as const;

// --------------------------------------------------------------------------
// Helper buildMetadata
// --------------------------------------------------------------------------

type BuildArgs = {
  /** Titre court (sera suffixé "— Kinome | Agence à Genève" sauf si `bareTitle`). */
  title: string;
  description: string;
  /** Chemin canonique relatif au site, ex: "/services/" */
  path: string;
  /** Liste de mots-clés contextuels. Fusionnés avec KEYWORDS_BASE. */
  keywords?: readonly string[];
  /** Si true, ne suffixe pas le titre (utile pour la home). */
  bareTitle?: boolean;
  /** OG image custom (sinon image par défaut Kinome). */
  ogImage?: string;
  /** Surcharge le type OG (par défaut "website", "article" pour projets). */
  ogType?: "website" | "article";
  /** Empêche l'indexation (drafts, pages internes). */
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  bareTitle = false,
  ogImage,
  ogType = "website",
  noIndex = false,
}: BuildArgs): Metadata {
  const url = `${SITE.url}${path}`;
  // Le suffixe " — Kinome | Agence à Genève" est ajouté automatiquement par
  // le `template` défini dans app/layout.tsx. Pour OG/Twitter (qui n'utilisent
  // PAS le template Next.js), on l'inclut manuellement sauf si bareTitle.
  const fullTitle = bareTitle ? title : `${title} — Kinome | Agence à Genève`;
  const image = ogImage ?? SITE.ogImage;
  const fullImage = image.startsWith("http") ? image : `${SITE.url}${image}`;

  const allKeywords = [...KEYWORDS_BASE, ...(keywords ?? [])];

  // Calcul automatique des alternates hreflang (FR ↔ EN) basé sur le path
  // courant. Mapping des slugs traduits pour les pages avec slug différent.
  const FR_TO_EN: Record<string, string> = {
    "/": "/en/",
    "/services/": "/en/services/",
    "/portfolio/": "/en/portfolio/",
    "/blog/": "/en/blog/",
    "/contact/": "/en/contact/",
    "/a-propos/": "/en/about/",
    "/processus/": "/en/process/",
    "/partenaires/": "/en/partners/",
    "/mentions-legales/": "/en/legal/",
    "/politique-de-confidentialite/": "/en/privacy/",
  };
  const EN_TO_FR = Object.fromEntries(
    Object.entries(FR_TO_EN).map(([fr, en]) => [en, fr])
  );

  const isEn = path.startsWith("/en");

  // Cas spécial pages projet : `/projets/:slug/` ↔ `/en/projets/:slug/`
  // (même slug, on miroite juste le préfixe `/en`).
  const projetFrMatch = !isEn && path.match(/^\/projets\/([^/]+)\/$/);
  const projetEnMatch = isEn && path.match(/^\/en\/projets\/([^/]+)\/$/);

  let altPath: string | undefined;
  if (projetFrMatch) {
    altPath = `/en/projets/${projetFrMatch[1]}/`;
  } else if (projetEnMatch) {
    altPath = `/projets/${projetEnMatch[1]}/`;
  } else {
    altPath = isEn ? EN_TO_FR[path] : FR_TO_EN[path];
  }

  const languages: Record<string, string> = {};
  if (altPath) {
    languages[isEn ? "fr" : "en"] = `${SITE.url}${altPath}`;
    languages[isEn ? "en" : "fr"] = url;
    languages["x-default"] = isEn ? `${SITE.url}${altPath}` : url;
  }

  return {
    // bareTitle = true : on bypasse le template du layout (utile pour la home)
    // bareTitle = false : on laisse le template du layout ajouter "— Kinome | Agence à Genève"
    title: bareTitle ? { absolute: title } : title,
    description,
    keywords: [...new Set(allKeywords)].join(", "),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 && { languages }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
      locale: SITE.locale,
      images: [
        {
          url: fullImage,
          width: SITE.ogImageWidth,
          height: SITE.ogImageHeight,
          alt: `${SITE.name} — ${SITE.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitterHandle,
      title: fullTitle,
      description,
      images: [fullImage],
    },
    authors: [{ name: SITE.legalName, url: SITE.url }],
    creator: SITE.legalName,
    publisher: SITE.legalName,
    category: "Communication, design, branding",
  };
}

// --------------------------------------------------------------------------
// JSON-LD générateurs (Schema.org)
// --------------------------------------------------------------------------

/** Organization + LocalBusiness combinés. À injecter dans le layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        alternateName: SITE.shortName,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/assets/logo-kinome.svg`,
          width: 186,
          height: 41,
        },
        image: `${SITE.url}${SITE.ogImage}`,
        description: SITE.tagline,
        slogan: SITE.baseline,
        foundingDate: SITE.founded,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        priceRange: BUSINESS.priceRange,
        address: {
          "@type": "PostalAddress",
          addressLocality: BUSINESS.city,
          addressRegion: BUSINESS.region,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.geo.latitude,
          longitude: BUSINESS.geo.longitude,
        },
        areaServed: BUSINESS.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        openingHoursSpecification: BUSINESS.openingHours.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        })),
        sameAs: [
          "https://www.linkedin.com/company/agence-kinome",
          "https://www.instagram.com/agencekinome/",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: BUSINESS.phone,
            email: BUSINESS.email,
            availableLanguage: ["French", "English"],
            areaServed: "CH",
          },
        ],
        knowsAbout: [
          "Branding",
          "Identité visuelle",
          "Création de logo",
          "Design graphique",
          "Direction artistique",
          "Site internet",
          "Communication digitale",
          "Stratégie de marque",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: SITE.language,
      },
    ],
  };
}

/** BreadcrumbList — typiquement pour pages projet. */
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}

/** CreativeWork — pour une page projet. */
export function creativeWorkJsonLd(args: {
  name: string;
  description: string;
  image: string;
  url: string;
  client: string;
  year: string;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: args.name,
    description: args.description,
    image: args.image.startsWith("http") ? args.image : `${SITE.url}${args.image}`,
    url: args.url.startsWith("http") ? args.url : `${SITE.url}${args.url}`,
    creator: { "@id": `${SITE.url}/#organization` },
    author: { "@id": `${SITE.url}/#organization` },
    dateCreated: args.year,
    about: args.about,
    contentLocation: {
      "@type": "Place",
      name: BUSINESS.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.city,
        addressCountry: BUSINESS.country,
      },
    },
    inLanguage: SITE.language,
    sourceOrganization: {
      "@type": "Organization",
      name: args.client,
    },
  };
}

/** FAQPage — pour booster l'AEO en dehors d'une page Q/R dédiée. */
export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/** Service — pour la page Services. */
export function serviceJsonLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: BUSINESS.areaServed.map((n) => ({
      "@type": "AdministrativeArea",
      name: n,
    })),
    serviceType: "Communication, branding, design",
  };
}

/** Helper pour injecter du JSON-LD dans une page. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
