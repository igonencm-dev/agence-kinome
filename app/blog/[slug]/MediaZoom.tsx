"use client";

/**
 * Agrandissement plein écran des médias de la vitrine carte de vœux.
 *
 * Lightbox maison plutôt que l'API Fullscreen native : cette dernière ne
 * fonctionne pas pour les images sur iOS Safari et impose un rendu brut.
 * Ici : overlay sombre, média centré, fermeture par clic, bouton ou Échap,
 * défilement de la page verrouillé pendant l'ouverture.
 */

import { useCallback, useEffect, useState } from "react";

type Props = {
  type: "image" | "video";
  /** Source haute définition affichée dans l'overlay. */
  src: string;
  /** Poster pour les vidéos. */
  poster?: string;
  /** Description du média (alt de l'image agrandie / aria-label). */
  label: string;
  /** La vignette cliquable (img ou video déjà stylée). */
  children: React.ReactNode;
};

export default function MediaZoom({ type, src, poster, label, children }: Props) {
  const [ouvert, setOuvert] = useState(false);

  const fermer = useCallback(() => setOuvert(false), []);

  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [ouvert, fermer]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-label={`Agrandir : ${label}`}
        className="group/zoom relative block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left"
      >
        {children}
        {/* Indice visuel discret au survol */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-kinome-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/zoom:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={fermer}
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-kinome-black/95 p-[4vw]"
          style={{ animation: "kinome-fade-in 200ms ease-out both" }}
        >
          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer l'aperçu"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          {type === "image" ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={label}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-[12px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-[12px] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            />
          )}
        </div>
      )}
    </>
  );
}
