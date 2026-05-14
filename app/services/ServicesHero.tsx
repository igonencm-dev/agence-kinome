"use client";

/**
 * Hero de la page Services — comportement orienté "interaction souris" :
 *  - Au chargement : la vidéo est plein écran, le titre est invisible.
 *    Le visiteur voit la vidéo intro plein cadre, sans superposition.
 *  - Dès que la souris bouge : le titre apparait (fade-in + slide-up)
 *    et la vidéo se voile/zoome légèrement pour mettre le texte en valeur.
 *  - Si la souris reste immobile pendant 2,5 s : le titre disparait à
 *    nouveau et la vidéo redevient pleinement visible.
 *  - Mobile / écrans tactiles (pas de hover possible) : le titre est
 *    affiché en permanence — sinon il serait invisible aux visiteurs
 *    tactiles.
 */

import { useEffect, useRef, useState } from "react";
import ResponsiveBr from "../components/ResponsiveBr";

const IDLE_DELAY_MS = 2500;

export default function ServicesHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // `revealed` : titre visible (true sur tactile par défaut, false sur desktop)
  const [revealed, setRevealed] = useState(false);
  const [isTouchOnly, setIsTouchOnly] = useState(false);

  // Force muted/volume 0 côté JS (ceinture+bretelles, fix bug React où
  // l'attribut HTML `muted` peut être ignoré au 1er render SSR).
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
    }
  }, []);

  useEffect(() => {
    // Détection des appareils sans hover (mobile / tactile pur).
    // On affiche alors le titre en permanence, sinon il serait inaccessible.
    const noHover =
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouchOnly(noHover);
    if (noHover) {
      setRevealed(true);
      return;
    }

    // Desktop : on écoute le mouvement souris pour révéler le titre.
    let idleTimer: number;
    const onMove = () => {
      setRevealed(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setRevealed(false), IDLE_DELAY_MS);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearTimeout(idleTimer);
    };
  }, []);

  // Effets visuels dérivés
  const titleOpacity = revealed ? 1 : 0;
  const titleTranslate = revealed ? "0px" : "16px";
  const overlayAlpha = revealed ? 0.5 : 0.1;
  const videoOpacity = revealed ? 0.8 : 1;
  const videoScale = revealed ? 1.04 : 1;

  return (
    <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/services-hero.png"
        className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out"
        style={{
          opacity: videoOpacity,
          transform: `scale(${videoScale})`,
        }}
      >
        <source src="/assets/videos/services-hero.mp4" type="video/mp4" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/services-hero.png"
          alt="Studio créatif Kinome — services de communication à Genève"
          className="block h-full w-full object-cover"
        />
      </video>

      {/* Voile : 10 % au repos, 50 % quand le titre s'affiche */}
      <div
        className="absolute inset-0 transition-[background-color] duration-500"
        style={{ backgroundColor: `rgba(0,0,0,${overlayAlpha})` }}
      />
      {/* Gradient bottom permanent : lisibilité minimale même au repos */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/60" />

      {/* Indicateur "Bougez la souris" — uniquement sur desktop, au repos */}
      {!isTouchOnly && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500"
          style={{ opacity: revealed ? 0 : 1 }}
        >
          <div className="flex flex-col items-center gap-2 text-white/85">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="animate-pulse"
            >
              <rect x="6" y="2" width="12" height="20" rx="6" />
              <line x1="12" y1="6" x2="12" y2="10" />
            </svg>
            <span className="font-body text-[0.78rem] uppercase tracking-[0.18em]">
              Bougez la souris
            </span>
          </div>
        </div>
      )}

      {/* Titre : invisible au repos (desktop), s'affiche au mouvement souris */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-start justify-end px-[5%] pb-[clamp(40px,7vh,90px)]">
        <h1
          // Retour #128 Tanguy : "taille du titre H1 comme celle de la
          // page blog". Aligné sur le H1 /blog : clamp(40px,8vw,84px).
          className="mb-6 font-heading text-[clamp(40px,8vw,84px)] font-normal leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-500 ease-out"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslate})`,
          }}
        >
          Expertise &amp; services
          <ResponsiveBr />à Genève
        </h1>
        <p
          className="max-w-[680px] font-body text-[clamp(16px,1.4vw,22px)] font-light leading-[1.5] text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] transition-[opacity,transform] duration-500 ease-out"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslate})`,
            transitionDelay: revealed ? "80ms" : "0ms",
          }}
        >
          De la création de logo à la conception de votre site internet, en
          passant par votre identité visuelle complète : Kinome regroupe
          l&rsquo;ensemble des compétences créatives à Genève pour donner
          corps à votre marque.
        </p>
      </div>
    </section>
  );
}
