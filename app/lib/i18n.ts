/**
 * Internationalisation simple — FR (par défaut, à la racine) + EN (sous /en/).
 *
 * Architecture :
 *  - Pages FR : /, /services/, /portfolio/, /a-propos/, /contact/, /processus/,
 *               /partenaires/, /blog/, /mentions-legales/, /politique-de-confidentialite/
 *  - Pages EN : /en/, /en/services/, /en/portfolio/, /en/about/, /en/contact/,
 *               /en/process/, /en/partners/, /en/blog/, /en/legal/, /en/privacy/
 *
 * Les pages EN n'ont pas vocation à dupliquer 100 % du contenu FR — elles
 * portent juste les textes essentiels traduits. Le contenu des 16 pages
 * projet et des 5 articles de blog reste en FR (à traduire dans une
 * itération future).
 */

export type Locale = "fr" | "en";

/** Mapping route FR → route EN (slugs traduits pour le SEO). */
export const ROUTES: Record<
  Locale,
  Record<
    | "home"
    | "services"
    | "portfolio"
    | "about"
    | "contact"
    | "process"
    | "partners"
    | "blog"
    | "legal"
    | "privacy",
    string
  >
> = {
  fr: {
    home: "/",
    services: "/services/",
    portfolio: "/portfolio/",
    about: "/a-propos/",
    contact: "/contact/",
    process: "/processus/",
    partners: "/partenaires/",
    blog: "/blog/",
    legal: "/mentions-legales/",
    privacy: "/politique-de-confidentialite/",
  },
  en: {
    home: "/en/",
    services: "/en/services/",
    portfolio: "/en/portfolio/",
    about: "/en/about/",
    contact: "/en/contact/",
    process: "/en/process/",
    partners: "/en/partners/",
    blog: "/en/blog/",
    legal: "/en/legal/",
    privacy: "/en/privacy/",
  },
};

/** Détecte la locale courante depuis le pathname. */
export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "fr";
}

/** Renvoie la version dans l'autre langue du chemin courant.
 *  Utilisé par le toggle FR/EN du header. */
export function getAlternateUrl(pathname: string): string {
  const isEn = pathname.startsWith("/en");
  if (isEn) {
    // /en/... → /...  (avec mapping inverse de slugs si dispo)
    const stripped = pathname.replace(/^\/en/, "") || "/";
    return reverseSlugFr(stripped);
  }
  return mapSlugToEn(pathname);
}

const FR_TO_EN_SLUG: Record<string, string> = {
  "/a-propos/": "/about/",
  "/processus/": "/process/",
  "/partenaires/": "/partners/",
  "/mentions-legales/": "/legal/",
  "/politique-de-confidentialite/": "/privacy/",
};
const EN_TO_FR_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN_SLUG).map(([fr, en]) => [en, fr])
);

function mapSlugToEn(frPath: string): string {
  const mapped = FR_TO_EN_SLUG[frPath] ?? frPath;
  return `/en${mapped}`.replace(/\/+/g, "/");
}

function reverseSlugFr(enPath: string): string {
  return EN_TO_FR_SLUG[enPath] ?? enPath;
}

// ----------------------------------------------------------------------------
// Dictionnaire des chaînes UI partagées (navigation, footer, boutons, etc.)
// ----------------------------------------------------------------------------

type Dict = Record<string, string>;

const fr: Dict = {
  // Navigation
  nav_services: "Nos services",
  nav_portfolio: "Portfolio",
  nav_process: "Processus",
  nav_blog: "Blog",
  nav_partners: "Partenaires",
  nav_about: "À propos",
  nav_contact: "Nous contacter",
  nav_contact_short: "Contact",
  nav_locale_label: "Voir le site en anglais",

  // Footer
  footer_legal: "Mentions légales",
  footer_privacy: "Politique de confidentialité",
  footer_manage_cookies: "Gérer les cookies",
  footer_follow: "Suivez-nous",
  footer_rights: "Tous droits réservés.",

  // Cookies banner
  cookies_title: "Cookies & vie privée",
  cookies_desc:
    "Nous utilisons uniquement des cookies essentiels et, avec votre accord, un outil de mesure d'audience anonymisée (Google Analytics) pour améliorer notre site.",
  cookies_accept_all: "Tout accepter",
  cookies_refuse: "Refuser",
  cookies_customize: "Personnaliser",
  cookies_save: "Enregistrer mon choix",
  cookies_essentials: "Essentiels",
  cookies_essentials_desc:
    "Nécessaires au fonctionnement du site (mémorisation de votre choix de consentement).",
  cookies_always_on: "Toujours actifs",
  cookies_analytics: "Mesure d'audience",
  cookies_analytics_desc:
    "Google Analytics 4 avec IP anonymisée, durée 13 mois max.",

  // CTA récurrents
  cta_contact_us: "Nous contacter",
  cta_discover_projects: "Découvrir nos projets",
  cta_back_home: "Retour à l'accueil",
  cta_read_more: "Lire l'article",
  cta_view_project: "Voir le projet",
  cta_get_in_touch: "Échangeons",
};

const en: Dict = {
  // Navigation
  nav_services: "Services",
  nav_portfolio: "Portfolio",
  nav_process: "Process",
  nav_blog: "Blog",
  nav_partners: "Partners",
  nav_about: "About",
  nav_contact: "Get in touch",
  nav_contact_short: "Contact",
  nav_locale_label: "View site in French",

  // Footer
  footer_legal: "Legal notice",
  footer_privacy: "Privacy policy",
  footer_manage_cookies: "Manage cookies",
  footer_follow: "Follow us",
  footer_rights: "All rights reserved.",

  // Cookies banner
  cookies_title: "Cookies & privacy",
  cookies_desc:
    "We only use essential cookies, and — with your consent — anonymised audience analytics (Google Analytics) to improve our site.",
  cookies_accept_all: "Accept all",
  cookies_refuse: "Refuse",
  cookies_customize: "Customise",
  cookies_save: "Save my choice",
  cookies_essentials: "Essential",
  cookies_essentials_desc:
    "Required for the site to function (remember your consent choice).",
  cookies_always_on: "Always on",
  cookies_analytics: "Audience analytics",
  cookies_analytics_desc:
    "Google Analytics 4 with anonymised IP, 13 months retention max.",

  // CTA récurrents
  cta_contact_us: "Get in touch",
  cta_discover_projects: "Discover our projects",
  cta_back_home: "Back to home",
  cta_read_more: "Read article",
  cta_view_project: "View project",
  cta_get_in_touch: "Let's talk",
};

const dicts: Record<Locale, Dict> = { fr, en };

/** Récupère une chaîne traduite selon la locale. */
export function t(key: keyof typeof fr, locale: Locale): string {
  return dicts[locale][key] ?? dicts.fr[key] ?? key;
}
