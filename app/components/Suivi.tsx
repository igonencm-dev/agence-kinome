"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { oublierVisiteur, pageVue } from "../lib/suivi";

// Suivi first-party du tableau de bord /admin/ (app/lib/suivi.ts) : une page
// vue à chaque changement de route. Si le visiteur retire son accord dans le
// bandeau cookies, son identifiant durable est effacé sur-le-champ.
export default function Suivi() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) pageVue(pathname);
  }, [pathname]);

  useEffect(() => {
    const surChoix = (e: Event) => {
      const choix = (e as CustomEvent<{ analytics?: boolean }>).detail;
      if (choix && choix.analytics === false) oublierVisiteur();
    };
    window.addEventListener("cookie-consent-change", surChoix);
    return () => window.removeEventListener("cookie-consent-change", surChoix);
  }, []);

  return null;
}
