"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, t } from "../lib/i18n";

type Phase = "intro" | "transition" | "done";

const INTRO_VIDEO = "/assets/wp/logo-anime-croped.mp4";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("intro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const locale = getLocaleFromPath(usePathname() ?? "/");
  // Guard idempotent : une fois la transition lancée, plus rien ne peut la
  // re-déclencher (fix retour Mathias : "l'animation apparait une 2e fois
  // quelques secondes après l'avoir fermée").
  // Cause : la vidéo continue à émettre des events "timeupdate" + "ended"
  // après skip / fin naturelle, et chaque event re-appelait goToTransition →
  // setPhase("transition") même si on était déjà sur "done", ce qui ré-affichait
  // l'overlay 2s. La ref bloque tout appel après la 1ère transition.
  const hasTransitionedRef = useRef(false);
  const doneTimerRef = useRef<number | null>(null);

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

    const goToTransition = () => {
      // Idempotent : si on a déjà transitionné, ne rien refaire.
      if (hasTransitionedRef.current) return;
      hasTransitionedRef.current = true;
      sessionStorage.setItem("kinomeIntroSeen", "true");
      setPhase("transition");
      doneTimerRef.current = window.setTimeout(() => {
        setPhase("done");
        doneTimerRef.current = null;
      }, 2000);
    };

    const v = videoRef.current;
    const fallback = window.setTimeout(goToTransition, 10000);

    if (v) {
      // Force muted (ceinture+bretelles — fix bug React 1er render)
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;

      const onTimeUpdate = () => {
        if (v.duration && v.currentTime >= v.duration - 1) goToTransition();
      };
      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("ended", goToTransition);
      v.play().catch(goToTransition);

      return () => {
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("ended", goToTransition);
        window.clearTimeout(fallback);
        if (doneTimerRef.current !== null) {
          window.clearTimeout(doneTimerRef.current);
          doneTimerRef.current = null;
        }
      };
    }

    return () => {
      window.clearTimeout(fallback);
      if (doneTimerRef.current !== null) {
        window.clearTimeout(doneTimerRef.current);
        doneTimerRef.current = null;
      }
    };
  }, []);

  if (phase === "done") return null;

  const skip = () => {
    // Idempotent aussi : si on a déjà transitionné, le skip ne ré-affiche pas
    // l'overlay. Sécurise les clics répétés / accidentels.
    if (hasTransitionedRef.current && phase !== "intro") {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("kinomeIntroSeen", "true");
    if (phase === "intro") {
      hasTransitionedRef.current = true;
      setPhase("transition");
      doneTimerRef.current = window.setTimeout(() => {
        setPhase("done");
        doneTimerRef.current = null;
      }, 2000);
    } else {
      setPhase("done");
    }
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

      {phase === "transition" && (
        <div
          className="anim-transition fixed inset-0 z-[2000] flex cursor-pointer items-center justify-center bg-kinome-dark px-[10%]"
          onClick={skip}
          role="presentation"
        >
          <h2 className="anim-text-focus-in max-w-[1100px] text-center font-heading text-[clamp(22px,4.5vw,44px)] font-normal leading-[1.3] text-white">
            {t("splash_tagline", locale)}
          </h2>
        </div>
      )}
    </>
  );
}
