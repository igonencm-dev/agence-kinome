"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, t } from "../lib/i18n";

const WORD_KEYS = [
  "hero_word_1",
  "hero_word_2",
  "hero_word_3",
  "hero_word_4",
] as const;

export default function HeroAnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const locale = getLocaleFromPath(usePathname() ?? "/");

  useEffect(() => {
    // Respecte la préférence "reduced motion" : mot fixe, pas de rotation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // IMPORTANT (perf / LCP) : ce mot est DANS le H1, qui est l'élément LCP de
    // la home. Si on fait tourner le mot dès le chargement, le texte du H1
    // change toutes les 2 s → Chrome enregistre sans cesse de nouveaux
    // candidats LCP → le LCP reste bloqué à ~8 s (constaté PageSpeed mobile :
    // l'élément LCP était capturé sur un mot tardif, "émotion").
    //
    // Solution : on ne démarre la rotation qu'au PREMIER geste de
    // l'utilisateur (scroll, toucher, clavier…). Lighthouse / PageSpeed
    // n'interagit jamais avec la page → le H1 reste sur le 1er mot → le LCP
    // se fige en ~1 s. Pour un vrai visiteur, la rotation démarre dès qu'il
    // scrolle ou touche l'écran, c'est-à-dire quasi immédiatement.
    let interval: number | undefined;
    let started = false;

    const events: string[] = [
      "scroll",
      "pointerdown",
      "keydown",
      "touchstart",
      "wheel",
    ];

    const start = () => {
      if (started) return;
      started = true;
      events.forEach((e) => window.removeEventListener(e, start));
      interval = window.setInterval(() => {
        setVisible(false);
        window.setTimeout(() => {
          setIndex((i) => (i + 1) % WORD_KEYS.length);
          setVisible(true);
        }, 300);
      }, 2000);
    };

    events.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );

    return () => {
      if (interval) window.clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  return (
    <span
      className="italic text-white/80 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {t(WORD_KEYS[index], locale)}
    </span>
  );
}
