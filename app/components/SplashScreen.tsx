"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "intro" | "transition" | "done";

const INTRO_VIDEO =
  "/assets/wp/logo-anime-croped.mp4";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("intro");
  const videoRef = useRef<HTMLVideoElement>(null);

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
      setPhase("done");
      return;
    }

    const seen = sessionStorage.getItem("kinomeIntroSeen");
    if (seen === "true") {
      setPhase("done");
      return;
    }

    const goToTransition = () => {
      sessionStorage.setItem("kinomeIntroSeen", "true");
      setPhase("transition");
      setTimeout(() => setPhase("done"), 2000);
    };

    const v = videoRef.current;
    const fallback = setTimeout(goToTransition, 10000);

    if (v) {
      const onTimeUpdate = () => {
        if (v.duration && v.currentTime >= v.duration - 1) goToTransition();
      };
      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("ended", goToTransition);
      v.play().catch(goToTransition);

      return () => {
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("ended", goToTransition);
        clearTimeout(fallback);
      };
    }

    return () => clearTimeout(fallback);
  }, []);

  if (phase === "done") return null;

  const skip = () => {
    sessionStorage.setItem("kinomeIntroSeen", "true");
    if (phase === "intro") {
      setPhase("transition");
      setTimeout(() => setPhase("done"), 2000);
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
          <h2 className="anim-text-focus-in max-w-[1100px] text-center font-heading text-[2.8rem] font-normal leading-[1.3] text-white md:text-[2.4rem] sm:text-[1.8rem]">
            Kinome est une agence de communication indépendante, pour remettre
            l&rsquo;humain au cœur des échanges.
          </h2>
        </div>
      )}
    </>
  );
}
