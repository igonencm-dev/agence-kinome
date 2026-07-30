export const contact = {
  emails: {
    mathias: "mathias@agence-kinome.ch",
    tanguy: "tanguy@agence-kinome.ch",
  },
  phones: {
    mathias: { display: "+41 78 265 20 14", e164: "+41782652014" },
    tanguy: { display: "+41 78 611 44 69", e164: "+41786114469" },
  },
  social: {
    linkedinAgence: "https://www.linkedin.com/company/agence-kinome",
    instagram: "https://www.instagram.com/agencekinome/",
    linkedinMathias: "https://www.linkedin.com/in/mathias-igonenc/",
    linkedinTanguy: "https://www.linkedin.com/in/tanguy-deniel-61068191/",
  },
  agency: {
    name: "Agence Kinome Sàrl",
    domain: "agence-kinome.ch",
  },
  /** WhatsApp Business — même numéro que la ligne de Mathias. */
  whatsapp: {
    /** wa.me exige le numéro sans "+" ni espaces. */
    waNumber: "41782652014",
    display: "+41 78 265 20 14",
  },
} as const;

/**
 * Construit un lien wa.me avec un message pré-rempli.
 *
 * Le message porte le contexte de la page d'où part le clic : on sait d'où
 * vient le contact avant même d'ouvrir la conversation, exactement comme le
 * champ « Comment nous avez-vous connus ? » du formulaire.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${contact.whatsapp.waNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
