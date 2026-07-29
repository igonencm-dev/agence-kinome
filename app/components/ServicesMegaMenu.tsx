/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Mégamenu Services — apparait au survol du lien "Nos services" du header.
 *
 * Même mécanique que PortfolioMegaMenu (intent delay géré par le Header, échap
 * pour fermer, desktop uniquement), mais une grille de cartes plutôt qu'un
 * projet vedette en rotation : ici l'utilisateur choisit une prestation, il ne
 * feuillette pas.
 *
 * On n'affiche que les pages service réellement en ligne. Les prestations dont
 * la landing n'existe pas encore (SEO, stratégie de marque, réseaux sociaux)
 * restent accessibles via le hub, on n'écrit pas de lien mort dans la nav.
 *
 * Le menu est FR uniquement : les landings service n'ont pas encore de version
 * anglaise, donc côté /en/ le header garde un lien simple vers /en/services/.
 */

import { useEffect } from "react";
import Link from "next/link";

type Service = {
  titre: string;
  href: string;
  resume: string;
  prix: string;
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    titre: "Création de logo",
    href: "/services/creation-logo/",
    resume:
      "Cadrage stratégique, 3 à 5 concepts distincts, déclinaisons complètes et brandbook.",
    prix: "dès 1 500 CHF",
    image: "/assets/services/logo/hero-creation-logo.webp",
    alt: "Carte de visite Microclimat, logo créé par Kinome",
  },
  {
    titre: "Identité visuelle",
    href: "/services/identite-visuelle/",
    resume:
      "Charte graphique, palette, typographies et règles d'usage : le système complet.",
    prix: "4 000 à 15 000 CHF",
    image: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    alt: "Identité visuelle du Cabinet Faraday",
  },
  {
    titre: "Création de site internet",
    href: "/services/site-internet/",
    resume:
      "Site vitrine ou e-commerce, rapide, optimisé pour le référencement et pensé pour convertir.",
    prix: "dès 3 000 CHF",
    image: "/assets/projets/causerie-bot/1.png",
    alt: "Site internet de Causerie Bot réalisé par Kinome",
  },
];

type Props = {
  open: boolean;
  /** Pour annuler le timer de fermeture quand la souris entre dans le panel. */
  onMouseEnter: () => void;
  /** Pour planifier la fermeture quand la souris quitte le panel. */
  onMouseLeave: () => void;
  /** Fermer le menu (échap, clic sur un lien interne…). */
  onClose: () => void;
};

export default function ServicesMegaMenu({
  open,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Aperçu des services"
      aria-hidden={!open}
      className={`fixed left-0 right-0 top-[72px] z-[999] hidden border-b border-kinome-black/10 bg-kinome-cream shadow-[0_20px_40px_-25px_rgba(0,0,0,0.18)] transition-[opacity,transform,visibility] duration-300 ease-out lg:block ${
        open
          ? "visible translate-y-0 opacity-100 pointer-events-auto"
          : "invisible -translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-[1728px] px-[5%] py-12">
        <p className="mb-7 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-kinome-grey">
          Nos prestations
        </p>

        <ul className="grid grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link href={s.href} onClick={onClose} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-white">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-kinome-black/0 transition-colors duration-500 group-hover:bg-kinome-black/10" />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-[clamp(19px,1.5vw,24px)] font-semibold leading-[1.2] text-kinome-black transition-colors group-hover:text-kinome-accent">
                    {s.titre}
                  </h3>
                  <span className="whitespace-nowrap font-body text-[0.78rem] font-light text-kinome-grey">
                    {s.prix}
                  </span>
                </div>
                <p className="mt-2 font-body text-[0.92rem] font-light leading-[1.5] text-kinome-grey">
                  {s.resume}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-kinome-black/8 pt-6">
          <Link
            href="/services/"
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-heading text-[0.92rem] font-semibold text-kinome-black transition-colors hover:text-kinome-accent"
          >
            Voir toutes nos expertises
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact/"
            onClick={onClose}
            className="font-body text-[0.88rem] font-light text-kinome-grey transition-colors hover:text-kinome-accent"
          >
            Diagnostic stratégique offert de 30 minutes
          </Link>
        </div>
      </div>
    </div>
  );
}
