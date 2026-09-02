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
    | "privacy"
    | "pressKit",
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
    pressKit: "/dossier-presse/",
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
    pressKit: "/en/press-kit/",
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
  // Pages FR sans jumelle anglaise : on renvoie vers la page EN la plus
  // proche plutôt que vers une adresse /en/... inexistante. Search Console
  // remontait des 404 sur /en/blog/<article>/ générées par ce sélecteur.
  if (!hasEnTwin(pathname)) {
    if (pathname.startsWith("/blog/")) return "/en/blog/";
    if (pathname.startsWith("/services/")) return "/en/services/";
    return "/en/";
  }
  return mapSlugToEn(pathname);
}

/**
 * Vrai si la page FR a une vraie traduction anglaise à la même position
 * (routes miroir, pages mappées, fiches projet). Les articles de blog et les
 * landings services n'en ont pas encore : pas de hreflang pour eux.
 */
export function hasEnTwin(pathname: string): boolean {
  if (pathname.startsWith("/en")) return true;
  if (pathname.startsWith("/blog/") && pathname !== "/blog/") return false;
  if (pathname.startsWith("/services/") && pathname !== "/services/") return false;
  return true;
}

const FR_TO_EN_SLUG: Record<string, string> = {
  "/a-propos/": "/about/",
  "/processus/": "/process/",
  "/partenaires/": "/partners/",
  "/mentions-legales/": "/legal/",
  "/politique-de-confidentialite/": "/privacy/",
  "/dossier-presse/": "/press-kit/",
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
  footer_press_kit: "Dossier de presse",
  footer_follow: "Suivez-nous",
  footer_rights: "Tous droits réservés.",

  // Cookies banner
  cookies_title: "Cookies & vie privée",
  cookies_desc:
    "Nous utilisons uniquement des cookies essentiels et, avec votre accord, un outil de mesure d'audience anonymisée (Google Analytics) pour améliorer notre site. Aucun cookie publicitaire, aucun partage avec des tiers à des fins marketing. Vous pouvez modifier votre choix à tout moment depuis le footer.",
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
    "Google Analytics 4 avec IP anonymisée, durée 13 mois max. Nous aide à comprendre quelles pages sont les plus consultées.",
  cookies_aria_dialog: "Gestion des cookies",
  cookies_aria_essentials: "Cookies essentiels (toujours actifs)",

  // CTA récurrents
  cta_contact_us: "Nous contacter",
  cta_discover_projects: "Découvrir nos projets",
  cta_back_home: "Retour à l'accueil",
  cta_read_more: "Lire l'article",
  cta_view_project: "Voir le projet",
  cta_get_in_touch: "Échangeons",

  // Testimonials (section partagée — toutes les pages)
  testimonials_heading: "Ils nous font confiance",
  testimonials_rating_aria: "Note {n} sur 5",
  testimonials_voyagiste_alt: "La Voyagiste — projet identité visuelle",
  testimonials_voyagiste_quote:
    "Très belle expérience pour la création du logo de mon agence, de sa charte graphique et des différents éléments de communication réalisés tout au long de l'année. Une équipe créative, à l'écoute et toujours avant-gardiste. Je les recommande fortement.",

  // Logos client
  logos_aria: "Quelques logos de clients Kinome",

  // Splash screen
  splash_tagline:
    "Kinome est une agence de communication indépendante, pour remettre l'humain au cœur des échanges.",

  // Hero animated word (mots qui défilent dans le H1 home)
  hero_word_1: "animation",
  hero_word_2: "identité",
  hero_word_3: "émotion",
  hero_word_4: "impact",

  // Contact form
  form_title: "Formulaire de contact",
  form_first_name: "Prénom*",
  form_last_name: "Nom*",
  form_email: "Email*",
  form_company: "Société*",
  form_need: "Votre besoin ? (logo, charte, site internet…)",
  form_message: "Message*",
  form_aria_first_name: "Prénom (requis)",
  form_aria_last_name: "Nom de famille (requis)",
  form_aria_email: "Adresse e-mail (requis)",
  form_aria_company: "Société (requis)",
  form_aria_need: "Votre besoin (optionnel)",
  form_aria_message: "Votre message (requis, 10 caractères minimum)",
  form_source: "Comment nous avez-vous connus ? (optionnel)",
  form_source_google: "Recherche Google",
  form_source_ai: "ChatGPT ou une autre IA",
  form_source_social: "Réseaux sociaux (LinkedIn, Instagram…)",
  form_source_referral: "Recommandation, bouche-à-oreille",
  form_source_event: "Événement, CCIFS",
  form_source_other: "Autre",
  form_consent:
    "En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter dans le cadre de votre demande.",
  form_submit: "Envoyer",
  form_submitting: "Envoi en cours…",
  form_success_title: "Message bien reçu !",
  form_success_text:
    "Merci pour votre message. Mathias ou Tanguy reviendra vers vous sous 24 à 48 heures ouvrées.",
  form_success_email: "Un email de confirmation vient de vous être envoyé.",
  form_send_another: "Envoyer un autre message",
  form_error_generic: "Une erreur est survenue. Merci de réessayer dans quelques instants.",
  form_error_network:
    "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.",
  form_honeypot: "Ne pas remplir",
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
  footer_press_kit: "Press kit",
  footer_follow: "Follow us",
  footer_rights: "All rights reserved.",

  // Cookies banner
  cookies_title: "Cookies & privacy",
  cookies_desc:
    "We only use essential cookies and, with your consent, an anonymised audience analytics tool (Google Analytics) to improve our site. No advertising cookies, no sharing with third parties for marketing purposes. You can change your preferences at any time from the footer.",
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
    "Google Analytics 4 with anonymised IP, 13 months retention max. Helps us understand which pages are most visited.",
  cookies_aria_dialog: "Cookie settings",
  cookies_aria_essentials: "Essential cookies (always on)",

  // CTA récurrents
  cta_contact_us: "Get in touch",
  cta_discover_projects: "Discover our projects",
  cta_back_home: "Back to home",
  cta_read_more: "Read article",
  cta_view_project: "View project",
  cta_get_in_touch: "Let's talk",

  // Testimonials
  testimonials_heading: "They trust us",
  testimonials_rating_aria: "Rating {n} out of 5",
  testimonials_voyagiste_alt: "La Voyagiste — visual identity project",
  testimonials_voyagiste_quote:
    "A wonderful experience working on our agency's logo, brand guidelines and the various communication assets built together throughout the year. A creative team, genuinely attentive and always ahead of the curve. I highly recommend them.",

  // Logos
  logos_aria: "A few Kinome client logos",

  // Splash
  splash_tagline:
    "Kinome is an independent communication agency, putting people back at the heart of every conversation.",

  // Hero animated word
  hero_word_1: "motion",
  hero_word_2: "identity",
  hero_word_3: "emotion",
  hero_word_4: "impact",

  // Contact form
  form_title: "Contact form",
  form_first_name: "First name*",
  form_last_name: "Last name*",
  form_email: "Email*",
  form_company: "Company*",
  form_need: "What do you need? (logo, brand guidelines, website…)",
  form_message: "Message*",
  form_aria_first_name: "First name (required)",
  form_aria_last_name: "Last name (required)",
  form_aria_email: "Email address (required)",
  form_aria_company: "Company (required)",
  form_aria_need: "Your need (optional)",
  form_aria_message: "Your message (required, 10 characters minimum)",
  form_source: "How did you hear about us? (optional)",
  form_source_google: "Google search",
  form_source_ai: "ChatGPT or another AI",
  form_source_social: "Social media (LinkedIn, Instagram…)",
  form_source_referral: "Referral, word of mouth",
  form_source_event: "Event, chamber of commerce",
  form_source_other: "Other",
  form_consent:
    "By submitting this form, you agree that your data may be used to get back to you about your enquiry.",
  form_submit: "Send",
  form_submitting: "Sending…",
  form_success_title: "Message received!",
  form_success_text:
    "Thanks for reaching out. Mathias or Tanguy will get back to you within 24 to 48 business hours.",
  form_success_email: "A confirmation email has just been sent to you.",
  form_send_another: "Send another message",
  form_error_generic: "Something went wrong. Please try again in a moment.",
  form_error_network:
    "Unable to reach the server. Check your connection and try again.",
  form_honeypot: "Do not fill in",
};

const dicts: Record<Locale, Dict> = { fr, en };

/** Récupère une chaîne traduite selon la locale. */
export function t(key: keyof typeof fr, locale: Locale): string {
  return dicts[locale][key] ?? dicts.fr[key] ?? key;
}
