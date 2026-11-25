/**
 * Données de l'agence pour les agents IA (25/11/2026), source unique de :
 * - /agents/kinome.json (app/agents/kinome.json/route.ts), lu par le serveur MCP public
 *   (public/api/mcp-agents.php) et par les outils WebMCP (components/OutilsAgents.tsx) ;
 * - le catalogue des prix du JSON-LD de l'accueil (lib/seo.ts, catalogueJsonLd).
 * Prix : grille 2026 (public/documents/grille-tarifs-kinome-2026.pdf), CHF hors TVA.
 * Toute hausse de la grille se reporte ici.
 */
const SITE = "https://agence-kinome.ch";

export type Prestation = {
  nom: string;
  url: string;
  delai: string;
  min?: number;
  max?: number;
  parMois?: boolean;
  /** Fourchette en toutes lettres quand la grille ne donne pas de chiffres. */
  texte?: string;
};

export const PRESTATIONS: Prestation[] = [
  { nom: "Création de logo", url: `${SITE}/services/creation-logo/`, delai: "3 à 5 semaines", min: 1500, max: 5000 },
  { nom: "Identité visuelle complète", url: `${SITE}/services/identite-visuelle/`, delai: "6 à 10 semaines", min: 4000, max: 15000 },
  { nom: "Refonte d'identité", url: `${SITE}/services/identite-visuelle/`, delai: "4 à 10 semaines", min: 3000, max: 15000 },
  { nom: "Branding global", url: `${SITE}/services/strategie-de-marque/`, delai: "8 à 14 semaines", min: 8000, max: 25000 },
  { nom: "Stratégie de communication", url: `${SITE}/services/strategie-de-marque/`, delai: "selon périmètre", min: 8000, max: 30000 },
  { nom: "Landing page", url: `${SITE}/services/site-internet/`, delai: "2 à 4 semaines", min: 1500, max: 4500 },
  { nom: "Site vitrine (5 à 8 pages)", url: `${SITE}/services/site-internet/`, delai: "6 à 8 semaines", min: 3000, max: 8000 },
  { nom: "Site vitrine premium (10 à 20 pages)", url: `${SITE}/services/site-internet/`, delai: "8 à 14 semaines", min: 8000, max: 18000 },
  { nom: "Boutique en ligne standard", url: `${SITE}/services/site-internet/`, delai: "4 à 8 semaines", min: 8000, max: 18000 },
  { nom: "E-commerce avancé", url: `${SITE}/services/site-internet/`, delai: "8 à 14 semaines", min: 18000, max: 35000 },
  { nom: "Rafraîchissement d'un site existant", url: `${SITE}/services/site-internet/`, delai: "3 à 5 semaines", min: 3000, max: 5000 },
  { nom: "Audit SEO", url: `${SITE}/services/referencement-naturel/`, delai: "1 à 3 semaines", min: 800, max: 3000 },
  { nom: "Accompagnement SEO mensuel", url: `${SITE}/services/referencement-naturel/`, delai: "engagement de 6 mois conseillé", min: 800, max: 2500, parMois: true },
  { nom: "Réseaux sociaux", url: `${SITE}/services/reseaux-sociaux/`, delai: "mensuel", min: 1500, parMois: true },
  { nom: "Carte de vœux d'entreprise", url: `${SITE}/blog/prix-carte-de-voeux-entreprise/`, delai: "octobre à novembre", texte: "quelques centaines de CHF" },
];

const fr = (n: number) => n.toLocaleString("fr-CH").replace(/[’']/g, " ");

export function fourchette(p: Prestation): string {
  if (p.texte) return p.texte;
  const mois = p.parMois ? " par mois" : "";
  if (p.min && p.max) return `${fr(p.min)} à ${fr(p.max)} CHF${mois}`;
  return `dès ${fr(p.min ?? 0)} CHF${mois}`;
}

export const AGENCE = {
  nom: "Agence Kinome",
  raison_sociale: "Agence Kinome Sàrl",
  activite:
    "Agence de communication indépendante : stratégie de marque, création de logo, identité visuelle, site internet, référencement naturel, réseaux sociaux, print et cartes de vœux.",
  adresse: "Route de Jussy 35, 1226 Thônex (Genève), Suisse",
  zones: ["Genève", "Vaud", "Suisse romande", "Haute-Savoie"],
  langues: ["français", "anglais"],
  horaires: "du lundi au vendredi, de 9 h à 18 h",
  site: SITE,
  portfolio: `${SITE}/portfolio/`,
  services: [
    { nom: "Création de logo", url: `${SITE}/services/creation-logo/` },
    { nom: "Identité visuelle", url: `${SITE}/services/identite-visuelle/` },
    { nom: "Stratégie de marque", url: `${SITE}/services/strategie-de-marque/` },
    { nom: "Création de site internet", url: `${SITE}/services/site-internet/` },
    { nom: "Référencement naturel", url: `${SITE}/services/referencement-naturel/` },
    { nom: "Réseaux sociaux", url: `${SITE}/services/reseaux-sociaux/` },
  ],
  premier_echange: "Diagnostic de 30 minutes offert, devis détaillé sous 24 h ensuite.",
  version_markdown_des_pages: "Chaque page existe en Markdown : ajoutez index.md à son adresse, ou envoyez « Accept: text/markdown ».",
};

export const CONTACT = {
  formulaire: `${SITE}/contact/`,
  email: "contact@agence-kinome.ch",
  telephone: "+41 78 265 20 14",
  whatsapp: "https://wa.me/41782652014",
  reponse: "Réponse sous 24 h ouvrées.",
  note: "Aucun outil n'envoie de message : la personne contacte l'agence elle-même par l'un de ces moyens.",
};

export function tarifs() {
  return {
    source: `${SITE}/documents/grille-tarifs-kinome-2026.pdf`,
    mise_a_jour: "2026-10-01",
    conditions:
      "Fourchettes indicatives en francs suisses, hors TVA. Chaque projet reçoit un devis au forfait après un premier échange de 30 minutes, offert.",
    prestations: PRESTATIONS.map((p) => ({ nom: p.nom, fourchette: fourchette(p), url: p.url, delai: p.delai })),
    taux_horaire: "120 à 250 CHF selon l'expertise mobilisée, pour les missions ponctuelles",
  };
}
