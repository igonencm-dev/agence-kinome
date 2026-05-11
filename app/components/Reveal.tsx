"use client";

/**
 * <Reveal> — composant utilitaire qui anime ses enfants quand ils
 * entrent dans le viewport.
 *
 * Effets disponibles :
 *   - "fade-up"   : opacity 0→1 + translateY 30px → 0 (par défaut)
 *   - "fade-in"   : opacity 0→1 (sans déplacement)
 *   - "fade-left" : opacity 0→1 + translateX -30px → 0
 *   - "fade-right": opacity 0→1 + translateX  30px → 0
 *
 * Respecte `prefers-reduced-motion`.
 * SSR-safe : rend les enfants dès le 1er render côté serveur (pas
 * d'attente d'hydration), l'animation s'applique uniquement côté client.
 */

import { useEffect, useRef, useState } from "react";

type Effect = "fade-up" | "fade-in" | "fade-left" | "fade-right";

type Props = {
  effect?: Effect;
  /** Délai en ms avant d'animer (utile pour stagger). */
  delay?: number;
  /** Décale le seuil d'entrée dans le viewport. */
  rootMargin?: string;
  className?: string;
  children: React.ReactNode;
  /** Tag HTML utilisé (défaut: div). */
  as?: "div" | "section" | "article" | "li";
};

const initialStyle: Record<Effect, string> = {
  "fade-up": "opacity-0 translate-y-8",
  "fade-in": "opacity-0",
  "fade-left": "opacity-0 -translate-x-8",
  "fade-right": "opacity-0 translate-x-8",
};

export default function Reveal({
  effect = "fade-up",
  delay = 0,
  rootMargin = "0px 0px -80px 0px",
  className = "",
  children,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  const baseClasses =
    "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]";
  const stateClasses = visible
    ? "opacity-100 translate-x-0 translate-y-0"
    : initialStyle[effect];

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  const cls = `${baseClasses} ${stateClasses} ${className}`;

  // Polymorphisme simple via switch (évite la dépendance JSX globale)
  if (as === "section") {
    return (
      <section ref={ref as React.RefObject<HTMLElement>} className={cls} style={style}>
        {children}
      </section>
    );
  }
  if (as === "article") {
    return (
      <article ref={ref as React.RefObject<HTMLElement>} className={cls} style={style}>
        {children}
      </article>
    );
  }
  if (as === "li") {
    return (
      <li ref={ref as React.RefObject<HTMLLIElement>} className={cls} style={style}>
        {children}
      </li>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cls} style={style}>
      {children}
    </div>
  );
}
