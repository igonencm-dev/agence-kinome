"use client";

/**
 * Chargement conditionnel de Google Analytics 4 :
 *  - Ne s'active QUE si l'utilisateur a consenti via le bandeau CookieConsent
 *  - IP anonymisée par défaut (`anonymize_ip: true`)
 *  - Pas de stockage publicitaire (`ad_storage: 'denied'`)
 *  - Réagit en temps réel au changement de consentement (event window
 *    "cookie-consent-change")
 *
 * Pour activer GA en prod :
 *   1. Créer une propriété GA4 sur https://analytics.google.com/
 *   2. Récupérer le Measurement ID (format G-XXXXXXXXXX)
 *   3. Le mettre dans NEXT_PUBLIC_GA_MEASUREMENT_ID (cf. .env)
 *   4. Rebuild
 */

import { useEffect, useState } from "react";
import Script from "next/script";
import { getStoredConsent } from "./CookieConsent";

// À remplacer par le vrai ID GA4 quand fourni par l'utilisateur.
// On utilise process.env (Next.js inline les NEXT_PUBLIC_* au build).
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Lecture initiale du consentement
    setConsentGiven(getStoredConsent()?.analytics ?? false);

    // Réagit au changement (l'utilisateur clique "accepter" ou "refuser")
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { analytics?: boolean };
      setConsentGiven(Boolean(detail?.analytics));
    };
    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, []);

  // En l'absence d'ID GA4 configuré OU sans consentement, on ne charge rien
  if (!GA_MEASUREMENT_ID || !consentGiven) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-bootstrap"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'granted'
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'anonymize_ip': true,
              'send_page_view': true
            });
          `,
        }}
      />
    </>
  );
}
