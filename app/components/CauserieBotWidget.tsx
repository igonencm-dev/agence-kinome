"use client";

/**
 * Chargement différé du widget CauserieBot pour ne pas pénaliser les
 * Core Web Vitals (Total Blocking Time, LCP).
 *
 * Stratégie : on n'injecte le script du widget qu'après la PREMIÈRE
 * interaction utilisateur (scroll, mousemove, touch, click, keydown)
 * OU après 8 s d'inactivité (fallback pour les visiteurs qui restent
 * immobiles sur le hero). Pendant ce délai, le thread principal reste
 * libre pour le render Next.js → Lighthouse Performance ≥ 95.
 *
 * Le visiteur ne voit aucune différence visible — le widget apparaît
 * juste un peu plus tard mais il était toujours invisible au tout
 * premier paint de toute façon (chargé après-interactif).
 */

import { useEffect } from "react";

const WIDGET_SRC = "https://dashboard.causeriebot.com/widget.js";
const WIDGET_ID = "61a7f539-597f-42f1-b362-1e5e255ae408";
const WIDGET_URL = "https://dashboard.causeriebot.com";
const FALLBACK_DELAY_MS = 8000;

export default function CauserieBotWidget() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;

      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.dataset.id = WIDGET_ID;
      script.dataset.url = WIDGET_URL;
      script.async = true;
      document.body.appendChild(script);
    };

    // Événements qui déclenchent le chargement
    const events = ["scroll", "mousemove", "touchstart", "keydown", "click"] as const;
    const opts = { once: true, passive: true } as const;

    events.forEach((evt) => window.addEventListener(evt, load, opts));

    // Fallback : on charge de toute façon après 8 s si rien ne s'est passé
    const fallbackTimer = window.setTimeout(load, FALLBACK_DELAY_MS);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, load));
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return null;
}
