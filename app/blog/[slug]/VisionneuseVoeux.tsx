/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Vitrine des cartes de vœux + visionneuse plein écran.
 *
 * Retour de Mathias sur la première version (médias à peine agrandis) : la
 * taille de l'aperçu est désormais calculée directement contre le viewport
 * (~92 % de la fenêtre, borné par le ratio du média), et l'aperçu devient une
 * vraie visionneuse : navigation entre les cinq médias aux flèches (boutons et
 * clavier), compteur, légende, fermeture par Échap, clic sur le fond ou bouton.
 * Le défilement de la page est verrouillé pendant l'ouverture.
 */

import { useCallback, useEffect, useState } from "react";
import Reveal from "../../components/Reveal";

type Media = {
  type: "image" | "video";
  /** Vignette affichée dans l'article. */
  apercu: string;
  /** Source haute définition pour la visionneuse (image) ou le mp4 (vidéo). */
  source: string;
  poster?: string;
  legende: string;
  /** Ratio largeur/hauteur, pour dimensionner l'aperçu plein écran. */
  ratio: number;
};

const MEDIAS: Media[] = [
  {
    type: "image",
    apercu: "/assets/blog/voeux/carte-kinome-2026-4.webp",
    source: "/assets/blog/voeux/carte-kinome-2026-4-zoom.webp",
    legende:
      "Carte de vœux Kinome 2026 posée à plat : lettrage doré entrelacé sur papier violet profond",
    ratio: 4 / 3,
  },
  {
    type: "image",
    apercu: "/assets/blog/voeux/carte-kinome-2026-2.webp",
    source: "/assets/blog/voeux/carte-kinome-2026-2-zoom.webp",
    legende: "Intérieur de la carte de vœux Kinome 2026, avec le mot de l'équipe",
    ratio: 4 / 3,
  },
  {
    type: "image",
    apercu: "/assets/blog/voeux/carte-kinome-2026-3.webp",
    source: "/assets/blog/voeux/carte-kinome-2026-3-zoom.webp",
    legende: "Carte de vœux Kinome 2026 ouverte, posée en équilibre",
    ratio: 4 / 3,
  },
  {
    type: "video",
    apercu: "/assets/blog/voeux/motion-voeux-la-voyagiste-paris.mp4",
    source: "/assets/blog/voeux/motion-voeux-la-voyagiste-paris.mp4",
    poster: "/assets/blog/voeux/poster-voeux-paris.webp",
    legende:
      "Vœux animés créés pour La Voyagiste : les toits de Paris s'illuminent d'un feu d'artifice",
    ratio: 16 / 9,
  },
  {
    type: "video",
    apercu: "/assets/blog/voeux/motion-voeux-la-voyagiste-montgolfiere.mp4",
    source: "/assets/blog/voeux/motion-voeux-la-voyagiste-montgolfiere.mp4",
    poster: "/assets/blog/voeux/poster-voeux-montgolfiere.webp",
    legende:
      "Vœux animés La Voyagiste : une montgolfière survole la mer au clair de lune",
    ratio: 16 / 9,
  },
];

/** Icône d'agrandissement affichée au survol des vignettes. */
function IndiceZoom() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-kinome-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/zoom:opacity-100"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function VisionneuseVoeux({
  texteCartes,
  texteMotion,
}: {
  texteCartes: React.ReactNode;
  texteMotion: React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const fermer = useCallback(() => setIndex(null), []);
  const aller = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + MEDIAS.length) % MEDIAS.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowLeft") aller(-1);
      if (e.key === "ArrowRight") aller(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, fermer, aller]);

  const actif = index === null ? null : MEDIAS[index];

  const vignette = (i: number, arrondi: string, hoverScale = false) => {
    const m = MEDIAS[i];
    return (
      <button
        type="button"
        onClick={() => setIndex(i)}
        aria-label={`Ouvrir dans la visionneuse : ${m.legende}`}
        className="group/zoom relative block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left"
      >
        <span className={`block overflow-hidden ${arrondi} ${m.type === "video" ? "bg-kinome-dark" : ""}`}>
          {m.type === "image" ? (
            <img
              src={m.apercu}
              alt={m.legende}
              width={1476}
              height={1107}
              loading="lazy"
              className={`block h-auto w-full ${hoverScale ? "transition-transform duration-500 group-hover/zoom:scale-[1.04]" : ""}`}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={m.poster}
              width={1280}
              height={720}
              aria-label={m.legende}
              className="block h-auto w-full"
            >
              <source src={m.apercu} type="video/mp4" />
            </video>
          )}
        </span>
        <IndiceZoom />
      </button>
    );
  };

  return (
    <>
      {texteCartes}
      <Reveal delay={140}>
        <div className="mt-[clamp(20px,2.5vw,36px)]">{vignette(0, "rounded-[20px]")}</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>{vignette(1, "rounded-[14px]", true)}</div>
          <div>{vignette(2, "rounded-[14px]", true)}</div>
        </div>
      </Reveal>
      {texteMotion}
      <Reveal delay={100}>
        <div className="mt-[clamp(20px,2.5vw,36px)]">{vignette(3, "rounded-[20px]")}</div>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-[clamp(20px,2.5vw,36px)]">{vignette(4, "rounded-[20px]")}</div>
      </Reveal>

      {/* ------------------------------ Visionneuse ------------------------------ */}
      {actif && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visionneuse : ${actif.legende}`}
          onClick={fermer}
          className="fixed inset-0 z-[1200] bg-[#0d0c0a]/97"
          style={{ animation: "kinome-fade-in 180ms ease-out both" }}
        >
          {/* Média centré, dimensionné directement contre le viewport : la
              largeur vaut 94vw, bornée pour que la hauteur tienne dans 86vh. */}
          <div className="flex h-full w-full items-center justify-center">
            <figure
              onClick={(e) => e.stopPropagation()}
              className="m-0 flex flex-col items-center gap-4"
              style={{ width: `min(94vw, calc(86vh * ${actif.ratio}))` }}
            >
              {actif.type === "image" ? (
                <img
                  key={actif.source}
                  src={actif.source}
                  alt={actif.legende}
                  className="block w-full rounded-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                />
              ) : (
                <video
                  key={actif.source}
                  src={actif.source}
                  poster={actif.poster}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block w-full rounded-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                />
              )}
              <figcaption className="flex w-full items-baseline justify-between gap-6 px-1">
                <span className="font-body text-[0.9rem] font-light leading-[1.4] text-white/80">
                  {actif.legende}
                </span>
                <span className="shrink-0 font-body text-[0.85rem] font-medium tabular-nums text-white/60">
                  {(index as number) + 1} / {MEDIAS.length}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Fermer */}
          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer la visionneuse"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {/* Navigation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              aller(-1);
            }}
            aria-label="Média précédent"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              aller(1);
            }}
            aria-label="Média suivant"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
