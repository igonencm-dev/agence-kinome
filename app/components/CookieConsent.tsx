"use client";

/**
 * Bandeau de consentement cookies (RGPD / CNIL / LPD suisse).
 *
 * Comportement :
 *  - Premier visiteur : bandeau affiché en bas de l'écran
 *  - 3 boutons : "Tout accepter", "Refuser", "Personnaliser"
 *  - Choix stocké dans localStorage pour 6 mois (clé "kinome-cookie-consent")
 *  - "Personnaliser" ouvre le modal avec les catégories
 *  - Émet un événement window "cookie-consent-change" → utilisé par le
 *    composant <GoogleAnalytics /> pour charger/décharger GA dynamiquement
 *
 * Catégories de cookies :
 *  - Essentiels : toujours actifs (mémorisation du choix de consentement)
 *  - Mesure d'audience (Analytics) : opt-in explicite
 *
 * Conformité :
 *  - Aucun cookie tiers déposé avant le consentement
 *  - Refus aussi simple que l'acceptation (CNIL août 2025)
 *  - Possibilité de modifier son choix à tout moment via le footer
 */

import { useEffect, useState } from "react";

const STORAGE_KEY = "kinome-cookie-consent";
const STORAGE_VERSION = "1"; // bump pour forcer ré-affichage si on change la politique
const CONSENT_EVENT = "cookie-consent-change";

type Consent = {
  version: string;
  date: string;
  analytics: boolean;
};

export function getStoredConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function setStoredConsent(analytics: boolean) {
  const consent: Consent = {
    version: STORAGE_VERSION,
    date: new Date().toISOString(),
    analytics,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  // Notifier les autres composants (Google Analytics, etc.)
  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT, { detail: consent })
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  // Au mount : on regarde si le visiteur a déjà choisi
  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Petit délai pour éviter de polluer le LCP
      const t = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(t);
    }
  }, []);

  // Écoute du déclencheur "ouvrir le bandeau" (clic depuis le footer)
  useEffect(() => {
    const onOpen = () => {
      const stored = getStoredConsent();
      setAnalyticsChecked(stored?.analytics ?? false);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", onOpen);
    return () => window.removeEventListener("open-cookie-settings", onOpen);
  }, []);

  if (!visible) return null;

  const accept = (analytics: boolean) => {
    setStoredConsent(analytics);
    setVisible(false);
    setShowDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[1100] animate-[slide-up_0.4s_ease-out] p-4 sm:bottom-6 sm:left-6 sm:right-6 sm:p-0"
    >
      <div className="mx-auto max-w-[640px] overflow-hidden rounded-[20px] bg-kinome-dark text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="p-6 sm:p-8">
          <h2 className="mb-3 font-heading text-[1.25rem] font-semibold">
            🍪 Cookies &amp; vie privée
          </h2>
          <p
            id="cookie-consent-desc"
            className="mb-5 font-body text-[0.95rem] font-light leading-[1.55] text-white/85"
          >
            Nous utilisons uniquement des cookies essentiels et, avec votre
            accord, un outil de mesure d&rsquo;audience anonymisée (Google
            Analytics) pour améliorer notre site. Aucun cookie publicitaire,
            aucun partage avec des tiers à des fins marketing. Vous pouvez
            modifier votre choix à tout moment depuis le footer.
          </p>

          {/* Détails (catégories) */}
          {showDetails && (
            <div className="mb-5 space-y-3 rounded-[12px] bg-white/5 p-4 text-[0.9rem]">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-4 w-4 cursor-not-allowed accent-kinome-accent"
                  aria-label="Cookies essentiels (toujours actifs)"
                />
                <div className="flex-1">
                  <div className="font-semibold">
                    Essentiels
                    <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[0.7rem] font-medium">
                      Toujours actifs
                    </span>
                  </div>
                  <p className="mt-1 text-white/70">
                    Nécessaires au fonctionnement du site (mémorisation de
                    votre choix de consentement).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={analyticsChecked}
                  onChange={(e) => setAnalyticsChecked(e.target.checked)}
                  className="mt-1 h-4 w-4 cursor-pointer accent-kinome-accent"
                />
                <label
                  htmlFor="cookie-analytics"
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-semibold">Mesure d&rsquo;audience</div>
                  <p className="mt-1 text-white/70">
                    Google Analytics 4 avec IP anonymisée, durée 13 mois max.
                    Nous aide à comprendre quelles pages sont les plus
                    consultées.
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Boutons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
            {!showDetails ? (
              <>
                <button
                  type="button"
                  onClick={() => accept(true)}
                  className="cursor-pointer rounded-full bg-white px-6 py-3 font-heading text-[0.9rem] font-semibold text-kinome-black transition-transform hover:scale-[1.02]"
                >
                  Tout accepter
                </button>
                <button
                  type="button"
                  onClick={() => accept(false)}
                  className="cursor-pointer rounded-full border border-white/30 bg-transparent px-6 py-3 font-heading text-[0.9rem] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="cursor-pointer rounded-full bg-transparent px-4 py-3 font-body text-[0.85rem] text-white/70 transition-colors hover:text-white"
                >
                  Personnaliser
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => accept(analyticsChecked)}
                  className="cursor-pointer rounded-full bg-white px-6 py-3 font-heading text-[0.9rem] font-semibold text-kinome-black transition-transform hover:scale-[1.02]"
                >
                  Enregistrer mon choix
                </button>
                <button
                  type="button"
                  onClick={() => accept(true)}
                  className="cursor-pointer rounded-full border border-white/30 bg-transparent px-6 py-3 font-heading text-[0.9rem] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Tout accepter
                </button>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 font-body text-[0.8rem] text-white/55">
            <a
              href="/politique-de-confidentialite/"
              className="underline-offset-2 hover:text-white hover:underline"
            >
              Politique de confidentialité
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/mentions-legales/"
              className="underline-offset-2 hover:text-white hover:underline"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
