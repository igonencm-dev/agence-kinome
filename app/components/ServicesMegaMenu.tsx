/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Mégamenu Services — apparait au survol du lien "Nos services" du header.
 *
 * Structure alignée sur PortfolioMegaMenu : une colonne de liens à gauche, un
 * visuel mis en avant à droite. C'est ce qui permet de tenir 6 services dans
 * la hauteur de fenêtre. La version précédente affichait 6 cartes illustrées
 * en grille : 867 px de haut pour 720 px de fenêtre, la dernière ligne et le
 * pied de menu passaient sous l'écran, hors d'atteinte.
 *
 * Le visuel de droite suit la ligne survolée, ce qui donne un aperçu sans
 * clic. Sans survol, il montre le premier service.
 *
 * FR uniquement : les landings service n'ont pas encore de version anglaise.
 */

import { useEffect, useState } from "react";
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
  {
    titre: "Référencement naturel",
    href: "/services/referencement-naturel/",
    resume:
      "Audit technique, mots-clés, contenu et netlinking, pour être trouvé là où vos clients cherchent.",
    prix: "audit dès 800 CHF",
    image: "/assets/projets/no-code/1.png",
    alt: "NOCODE IA, organisme de formation accompagné par Kinome",
  },
  {
    titre: "Stratégie de marque",
    href: "/services/strategie-de-marque/",
    resume:
      "Positionnement, plateforme de marque et ton de voix : le socle qui précède toute création.",
    prix: "cadrage 3 à 5 semaines",
    image: "/assets/projets/authentik-peak/1.png",
    alt: "Authentik Peak, marque accompagnée par Kinome",
  },
  {
    titre: "Réseaux sociaux",
    href: "/services/reseaux-sociaux/",
    resume:
      "Ligne éditoriale, production de contenus et animation quotidienne de votre communauté.",
    prix: "dès 1 500 CHF/mois",
    image: "/assets/projets/lea-vigier/1.png",
    alt: "Léa Vigier, marque accompagnée par Kinome",
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
  const [actif, setActif] = useState(0);

  useEffect(() => {
    if (open) setActif(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const courant = SERVICES[actif];

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
      <div className="mx-auto grid max-w-[1728px] grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-16 px-[5%] py-10">
        {/* ─────────── Colonne 1 : les 6 services ─────────── */}
        <div>
          <p className="mb-5 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-kinome-grey">
            Nos prestations
          </p>
          <ul className="flex flex-col">
            {SERVICES.map((s, i) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  onClick={onClose}
                  onMouseEnter={() => setActif(i)}
                  onFocus={() => setActif(i)}
                  className={`group flex items-baseline justify-between gap-6 border-b border-kinome-black/8 py-2.5 transition-colors ${
                    i === actif ? "border-kinome-accent/40" : ""
                  }`}
                >
                  <span
                    className={`font-heading text-[clamp(17px,1.5vw,22px)] font-normal leading-[1.2] transition-colors ${
                      i === actif ? "text-kinome-accent" : "text-kinome-black"
                    }`}
                  >
                    {s.titre}
                  </span>
                  <span className="whitespace-nowrap font-body text-[0.78rem] font-light text-kinome-grey">
                    {s.prix}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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
              className="font-body text-[0.85rem] font-light text-kinome-grey transition-colors hover:text-kinome-accent"
            >
              Diagnostic offert de 30 minutes
            </Link>
          </div>
        </div>

        {/* ─────────── Colonne 2 : aperçu du service survolé ─────────── */}
        <Link
          href={courant.href}
          onClick={onClose}
          className="group block"
          aria-label={`Découvrir ${courant.titre}`}
        >
          {/* Toutes les images sont rendues et on bascule l'opacité : évite un
              rechargement (et donc un flash) à chaque survol de ligne. */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-white">
            {SERVICES.map((s, i) => (
              <img
                key={s.href}
                src={s.image}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                  i === actif ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-kinome-black/0 transition-colors duration-500 group-hover:bg-kinome-black/10" />
          </div>
          <div
            key={courant.href}
            className="mt-4 flex items-baseline justify-between gap-8"
            style={{ animation: "kinome-fade-in 350ms ease-out both" }}
          >
            <div>
              <h3 className="font-heading text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.2] text-kinome-black transition-colors group-hover:text-kinome-accent">
                {courant.titre}
              </h3>
              <p className="mt-1.5 max-w-[520px] font-body text-[0.92rem] font-light leading-[1.5] text-kinome-grey">
                {courant.resume}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-heading text-[0.9rem] font-semibold text-kinome-black transition-colors group-hover:text-kinome-accent">
              Découvrir
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
