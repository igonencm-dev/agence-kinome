/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Mégamenu Portfolio — apparait au survol du lien "Portfolio" dans le header.
 *
 * Structure :
 *   • Colonne 1 : catégories cliquables (chaque clic = portfolio avec
 *     `?filter=<cat>` pré-appliqué) + lien "Voir tout"
 *   • Colonne 2 : projet vedette qui crossfade toutes les 3 s entre 4
 *     projets phares (causerie-bot, no-code, cabinet-faraday, codecircle).
 *
 * Tous les éléments sont cliquables avec une destination précise — pas de
 * placeholder, pas de cul-de-sac.
 *
 * DA stricte Kinome :
 *   - fond `bg-kinome-cream`, bordure subtile `border-kinome-black/8`
 *   - typographies `font-heading` (krub) + `font-body` (inter)
 *   - accents au hover : `text-kinome-accent` (rouge Kinome)
 *   - ratios + arrondis cohérents avec les cards portfolio
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { projets } from "../lib/projets";
import type { Locale } from "../lib/i18n";

// 4 projets vedettes — sélection qui couvre les 4 catégories du data
// (identité, branding, website, campagne) et mélange des styles visuels
// variés (sobre/tech, créatif chaleureux, humain, illustration).
const FEATURED_SLUGS = [
  "codecircle",       // identité + branding — sobre, tech
  "cabinet-faraday",  // identité + branding — chaleureux, créatif fort
  "lea-vigier",       // website + identité — projet humain, message fort
  "cinars",           // campagne + branding — illustration, arts de la scène
] as const;

const ROTATION_MS = 3000;
const CROSSFADE_MS = 700;

const labels = {
  fr: {
    catTitle: "Catégories",
    featuredTitle: "Projet vedette",
    all: "Tous les projets",
    identite: "Identités",
    branding: "Branding",
    website: "Websites",
    campagne: "Campagnes",
    viewProject: "Voir le projet",
    viewAll: "Voir tout le portfolio",
  },
  en: {
    catTitle: "Categories",
    featuredTitle: "Featured project",
    all: "All projects",
    identite: "Identities",
    branding: "Branding",
    website: "Websites",
    campagne: "Campaigns",
    viewProject: "View the project",
    viewAll: "View the full portfolio",
  },
} as const;

type Props = {
  open: boolean;
  locale: Locale;
  /** Pour annuler le timer de fermeture quand la souris entre dans le panel. */
  onMouseEnter: () => void;
  /** Pour planifier la fermeture quand la souris quitte le panel. */
  onMouseLeave: () => void;
  /** Fermer le menu (échap, clic sur un lien interne…). */
  onClose: () => void;
};

export default function PortfolioMegaMenu({
  open,
  locale,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: Props) {
  const t = labels[locale];

  // Comptage des projets par catégorie (calculé à la volée — léger).
  const count = {
    all: projets.length,
    identite: projets.filter((p) => p.categories.includes("identite")).length,
    branding: projets.filter((p) => p.categories.includes("branding")).length,
    website: projets.filter((p) => p.categories.includes("website")).length,
    campagne: projets.filter((p) => p.categories.includes("campagne")).length,
  };

  // Récupère les objets projet correspondants aux 4 slugs vedettes.
  const featured = FEATURED_SLUGS
    .map((slug) => projets.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotation toutes les 3 s. Pause si la souris est sur le visuel
  // (l'utilisateur est probablement en train de lire).
  useEffect(() => {
    if (!open || paused || featured.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % featured.length);
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [open, paused, featured.length]);

  // À chaque ouverture, redémarrer sur le premier projet vedette.
  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      setPaused(false);
    }
  }, [open]);

  // Échap → fermer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Bases d'URL selon la locale (les slugs projet/portfolio sont les mêmes
  // côté EN, juste préfixés `/en`).
  const portfolioBase = locale === "fr" ? "/portfolio/" : "/en/portfolio/";
  const projetBase = locale === "fr" ? "/projets/" : "/en/projets/";

  const current = featured[activeIndex];
  const currentResume =
    locale === "en" && current.resume_en ? current.resume_en : current.resume;

  // Lignes de catégorie. Chaque entrée a sa destination via query string,
  // qui sera lue côté /portfolio/page.tsx pour pré-appliquer le filtre.
  const categoryLinks: Array<{
    label: string;
    href: string;
    count: number;
  }> = [
    { label: t.all, href: portfolioBase, count: count.all },
    { label: t.identite, href: `${portfolioBase}?filter=identite`, count: count.identite },
    { label: t.branding, href: `${portfolioBase}?filter=branding`, count: count.branding },
    { label: t.website, href: `${portfolioBase}?filter=website`, count: count.website },
    { label: t.campagne, href: `${portfolioBase}?filter=campagne`, count: count.campagne },
  ];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label={
        locale === "fr" ? "Aperçu du portfolio" : "Portfolio preview"
      }
      aria-hidden={!open}
      className={`fixed left-0 right-0 top-[72px] z-[999] hidden border-b border-kinome-black/10 bg-kinome-cream shadow-[0_20px_40px_-25px_rgba(0,0,0,0.18)] transition-[opacity,transform,visibility] duration-300 ease-out lg:block ${
        open
          ? "visible translate-y-0 opacity-100 pointer-events-auto"
          : "invisible -translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto grid max-w-[1728px] grid-cols-1 gap-12 px-[5%] py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-20">
        {/* ─────────── Colonne 1 : catégories ─────────── */}
        <div>
          <p className="mb-7 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-kinome-grey">
            {t.catTitle}
          </p>
          <ul className="flex flex-col gap-1">
            {categoryLinks.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between gap-6 border-b border-kinome-black/8 py-3 transition-colors hover:border-kinome-accent/40"
                >
                  <span className="font-heading text-[clamp(20px,1.9vw,28px)] font-normal leading-[1.15] text-kinome-black transition-colors group-hover:text-kinome-accent">
                    {cat.label}
                  </span>
                  <span className="font-body text-[0.8rem] font-light text-kinome-grey transition-colors group-hover:text-kinome-accent">
                    {cat.count.toString().padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href={portfolioBase}
              onClick={onClose}
              className="group inline-flex items-center gap-2 font-heading text-[0.92rem] font-semibold text-kinome-black transition-colors hover:text-kinome-accent"
            >
              {t.viewAll}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ─────────── Colonne 2 : projet vedette (rotation 3 s) ─────────── */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="mb-7 flex items-baseline justify-between gap-4">
            <p className="font-heading text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-kinome-grey">
              {t.featuredTitle}
            </p>
            {/* Indicateurs de progression (cliquables → projet i) */}
            <div className="flex items-center gap-1.5">
              {featured.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setPaused(true);
                  }}
                  aria-label={
                    locale === "fr"
                      ? `Voir le projet vedette ${i + 1} : ${p.nom}`
                      : `Show featured project ${i + 1}: ${p.nom}`
                  }
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-kinome-accent"
                      : "w-3 bg-kinome-black/20 hover:bg-kinome-black/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Carte visuelle — toute la carte est un Link vers le projet courant */}
          <Link
            href={`${projetBase}${current.slug}/`}
            onClick={onClose}
            className="group block"
            aria-label={`${t.viewProject} ${current.nom}`}
          >
            {/* Stack d'images en crossfade : toutes rendues, on switch l'opacity */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-white">
              {featured.map((p, i) => (
                <img
                  key={p.slug}
                  src={p.cover}
                  alt={p.nom}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
                    i === activeIndex
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
                />
              ))}
              {/* Voile très léger au hover + zoom subtle (matche le hover des
                  cards portfolio) */}
              <div className="absolute inset-0 bg-kinome-black/0 transition-colors duration-500 group-hover:bg-kinome-black/10" />
            </div>

            {/* Texte sous l'image — change avec un léger fade quand on
                bascule de projet */}
            <div
              key={current.slug}
              className="mt-6 grid grid-cols-1 items-baseline gap-x-8 gap-y-3 md:grid-cols-[1fr_auto]"
              style={{
                animation: "kinome-fade-in 350ms ease-out both",
              }}
            >
              <div>
                <h3 className="font-heading text-[clamp(22px,2vw,32px)] font-semibold leading-[1.15] text-kinome-black transition-colors group-hover:text-kinome-accent">
                  {current.nom}
                </h3>
                <p className="mt-2 max-w-[560px] font-body text-[0.95rem] font-light leading-[1.55] text-kinome-grey">
                  {currentResume}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-heading text-[0.92rem] font-semibold text-kinome-black transition-colors group-hover:text-kinome-accent">
                {t.viewProject}
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
    </div>
  );
}
