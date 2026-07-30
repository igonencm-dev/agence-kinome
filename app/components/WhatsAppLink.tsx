"use client";

/**
 * Lien WhatsApp Business — canal de contact direct.
 *
 * Deux choses le distinguent d'un simple <a href="wa.me/...">  :
 *
 *  1. Message pré-rempli contextuel. L'appelant passe `contexte` (ex. « votre
 *     page création de logo ») et la conversation s'ouvre déjà remplie. On sait
 *     d'où vient le contact avant même de répondre, comme le champ
 *     « Comment nous avez-vous connus ? » du formulaire.
 *
 *  2. Event GA4 au clic, pour que WhatsApp soit un canal mesurable à côté de
 *     `generate_lead` et pas un trou noir dans l'attribution.
 *
 * Volontairement pas de bulle flottante : le coin bas-droit est déjà occupé
 * par le widget CauserieBot, qui est lui-même un produit Kinome.
 */

import { whatsappUrl } from "../lib/contact";

type Props = {
  /** Fin de la phrase pré-remplie. Sans lui, message générique. */
  contexte?: string;
  /** Identifie l'emplacement du clic dans GA4 (footer, page_contact…). */
  emplacement: string;
  className?: string;
  children: React.ReactNode;
};

export default function WhatsAppLink({
  contexte,
  emplacement,
  className = "",
  children,
}: Props) {
  const message = contexte
    ? `Bonjour, je vous écris depuis ${contexte} du site Kinome.`
    : "Bonjour, je vous écris depuis le site Kinome.";

  const onClick = () => {
    // No-op si GA n'est pas chargé ou si l'utilisateur a refusé les cookies.
    try {
      window.gtag?.("event", "contact_whatsapp", {
        method: "whatsapp",
        emplacement,
      });
      window.dataLayer?.push({
        event: "contact_whatsapp",
        lead_source: "whatsapp",
        emplacement,
      });
    } catch {
      /* no-op */
    }
  };

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
