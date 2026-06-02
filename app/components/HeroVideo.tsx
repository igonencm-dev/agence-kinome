"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

type Props = {
  videoSrc: string;
  poster: string;
  /** Classes partagées par le poster <img> ET la <video> (même cadrage). */
  className?: string;
};

/**
 * Hero vidéo optimisé pour le LCP mobile.
 *
 * Problème (PageSpeed juin 2026, LCP ~9 s sur 4G lente) : le `poster` d'une
 * balise <video> n'est PAS considéré comme élément LCP par Chrome — c'est la
 * 1re frame de la vidéo qui l'est. Et `autoPlay` force le téléchargement de
 * la vidéo quel que soit le `preload`. Le LCP attendait donc le téléchargement
 * complet de la vidéo de fond.
 *
 * Solution : on rend d'abord une vraie <img> (le poster, `fetchPriority="high"`)
 * qui devient l'élément LCP et s'affiche en ~1 s. La <video> n'est montée
 * qu'APRÈS l'évènement `load` de la page (+ court délai), pour ne pas
 * concurrencer le LCP. Elle vient ensuite recouvrir le poster et joue
 * normalement. Bénéfice secondaire : les bots/crawlers reçoivent un vrai
 * <img> côté SSR (meilleur fallback visuel que le poster d'une <video>).
 *
 * Respecte `prefers-reduced-motion` : on conserve alors uniquement le poster.
 */
export default function HeroVideo({ videoSrc, poster, className }: Props) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    let timer: number | undefined;
    const arm = () => {
      // Délai après le load : laisse le LCP (= poster) se finaliser avant
      // d'introduire la vidéo dans le DOM.
      timer = window.setTimeout(() => setShowVideo(true), 300);
    };

    if (document.readyState === "complete") {
      arm();
    } else {
      window.addEventListener("load", arm, { once: true });
    }

    return () => {
      window.removeEventListener("load", arm);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Poster = élément LCP (vraie <img>, prioritaire). Décoratif → alt="". */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className={className}
      />
      {/* Vidéo montée après le load, recouvre le poster (même cadrage/z-index). */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className={className}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </>
  );
}
