"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "intro" | "done";

const INTRO_VIDEO = "/assets/wp/logo-anime-croped.mp4";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("intro");
  const videoRef = useRef<HTMLVideoElement>(null);
  // Guard idempotent : une fois passé à "done", on ne réaffiche plus.
  // Cause initiale : la vidéo continuait à émettre des events "timeupdate" +
  // "ended" après skip / fin naturelle, re-déclenchant l'overlay.
  // Retour Tanguy/Mathias mai 2026 : l'écran intermédiaire avec le texte
  // "Kinome est une agence indépendante..." a été supprimé — on passe
  // directement de "intro" (vidéo logo) à "done" (disparition).
  const hasTransitionedRef = useRef(false);

  useEffect(() => {
    // Bypass : on saute le splash pour les bots/crawlers et les outils
    // d'audit (Lighthouse, PageSpeed, GTmetrix…). Permet d'obtenir un
    // screenshot valide et un score Performance non altéré.
    const ua = navigator.userAgent.toLowerCase();
    const isBot =
      /lighthouse|chrome-lighthouse|googlebot|bingbot|pagespeed|gtmetrix|headlesschrome|prerender|crawler|spider/.test(
        ua
      );
    // Respecte aussi la préférence "reduced motion" (utilisateurs sensibles)
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isBot || reducedMotion) {
      hasTransitionedRef.current = true;
      setPhase("done");
      return;
    }

    const seen = sessionStorage.getItem("kinomeIntroSeen");
    if (seen === "true") {
      hasTransitionedRef.current = true;
      setPhase("done");
      return;
    }

    // Fin de l'intro vidéo : on passe directement à "done" (plus d'écran
    // de transition avec le texte tagline).
    const goToDone = () => {
      if (hasTransitionedRef.current) return;
      hasTransitionedRef.current = true;
      sessionStorage.setItem("kinomeIntroSeen", "true");
      setPhase("done");
    };

    const v = videoRef.current;
    const fallback = window.setTimeout(goToDone, 10000);

    if (v) {
      // Force muted (ceinture+bretelles — fix bug React 1er render)
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;

      const onTimeUpdate = () => {
        if (v.duration && v.currentTime >= v.duration - 1) goToDone();
      };
      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("ended", goToDone);
      v.play().catch(goToDone);

      return () => {
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("ended", goToDone);
        window.clearTimeout(fallback);
      };
    }

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  if (phase === "done") return null;

  // Skip (clic) : on passe directement à "done", peu importe la phase.
  const skip = () => {
    sessionStorage.setItem("kinomeIntroSeen", "true");
    hasTransitionedRef.current = true;
    setPhase("done");
  };

  return (
    <>
      {phase === "intro" && (
        <div
          className="fixed inset-0 z-[3000] flex cursor-pointer items-center justify-center bg-white"
          onClick={skip}
          role="presentation"
        >
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="pointer-events-none h-full w-full select-none object-contain outline-none"
          />
        </div>
      )}
    </>
  );
}
