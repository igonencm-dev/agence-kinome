"use client";

/**
 * Hero de la page Services avec animation scroll-driven :
 *  - Au chargement : la vidéo est plein écran, le titre est invisible
 *    (opacity 0) → le visiteur "voit" la vidéo intro complètement
 *  - Quand le visiteur commence à scroller : la vidéo se met en pause +
 *    fade out légèrement, et le titre apparaît progressivement (fade-in)
 *  - À 100 % de scroll dans le hero : la vidéo est figée (poster), le
 *    titre est ultra lisible avec un overlay sombre
 *
 * Approche : on lit `window.scrollY` (clampé entre 0 et la hauteur du
 * hero) et on calcule une `progress` 0..1 qui pilote opacités/transformations.
 */

import { useEffect, useRef, useState } from "react";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0); // 0 = top, 1 = scrolled past hero

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const h = section.offsetHeight;
      // 0 → 1 sur 70 % de la hauteur du hero (le titre est plein avant la fin)
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.7)));
      setProgress(p);

      // À partir de 75 % : on met la vidéo en pause (gain CPU + signal
      // "tu arrives sur le contenu, regarde le titre")
      const video = videoRef.current;
      if (video) {
        if (p > 0.75 && !video.paused) video.pause();
        else if (p <= 0.05 && video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mappages :
  //  - titre  : opacity 0 → 1 (apparait), translateY 24px → 0
  //  - voile  : 0.1 → 0.55 (sombre quand on lit le texte)
  //  - vidéo  : opacity 1 → 0.75, scale 1 → 1.05 (parallax discret)
  const titleOpacity = progress;
  const titleTranslate = `${(1 - progress) * 24}px`;
  const overlayAlpha = 0.1 + progress * 0.45;
  const videoOpacity = 1 - progress * 0.25;
  const videoScale = 1 + progress * 0.05;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] min-h-[600px] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/services-hero.png"
        className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[400ms] ease-out"
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

      {/* Voile dynamique : très subtil au load, sombre quand le titre apparait */}
      <div
        className="absolute inset-0 transition-opacity duration-[400ms]"
        style={{ backgroundColor: `rgba(0,0,0,${overlayAlpha})` }}
      />
      {/* Gradient bottom permanent (lisibilité minimale du titre quand il apparait) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/60" />

      {/* Indicateur "scroll" en bas de la vidéo intro (n'apparait que quand
          le titre est invisible) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-300"
        style={{ opacity: 1 - progress * 2.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/85">
          <span className="font-body text-[0.8rem] uppercase tracking-[0.18em]">
            Scroller
          </span>
          <span className="block h-9 w-[2px] animate-pulse bg-white/60" />
        </div>
      </div>

      {/* Titre : invisible au load, apparait au scroll */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-start justify-end px-[5%] pb-[clamp(40px,7vh,90px)]">
        <h1
          className="mb-6 font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-300 ease-out"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslate})`,
          }}
        >
          Expertise &amp; services
          <br />à Genève
        </h1>
        <p
          className="max-w-[680px] font-body text-[clamp(15px,1.4vw,22px)] font-light leading-[1.5] text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] transition-[opacity,transform] duration-300 ease-out"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslate})`,
            transitionDelay: "60ms",
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
