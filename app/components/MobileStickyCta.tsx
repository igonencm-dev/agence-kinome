"use client";

/**
 * Barre CTA collante — MOBILE UNIQUEMENT (cachée dès md).
 *
 * Comportement :
 *  - reste masquée sur le hero (translate-y-full), pour ne pas voler la
 *    vedette aux CTA principaux ;
 *  - glisse depuis le bas une fois le hero passé (~70 % de la hauteur écran) ;
 *  - se cache automatiquement à l'approche du bas de page (formulaire de
 *    contact + footer), pour ne jamais recouvrir le vrai formulaire ;
 *  - dismissible (× en haut-gauche), mémorisé pour la session ;
 *  - n'apparaît pas sur les pages /contact (on y est déjà) ;
 *  - bilingue FR/EN selon l'URL ;
 *  - laisse un espace à droite pour ne pas chevaucher le chatbot flottant.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MobileStickyCta() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isEn = pathname.startsWith("/en");
  const hidePage =
    pathname === "/contact" ||
    pathname === "/contact/" ||
    pathname === "/en/contact" ||
    pathname === "/en/contact/";

  useEffect(() => {
    if (hidePage) {
      setVisible(false);
      return;
    }
    try {
      if (sessionStorage.getItem("kinome_cta_dismissed") === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* sessionStorage indisponible : on continue */
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight;
        const pastHero = y > vh * 0.7;
        const distToBottom = docH - (y + vh);
        const beforeContact = distToBottom > 1100;
        setVisible(pastHero && beforeContact);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidePage, pathname]);

  if (hidePage || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    try {
      sessionStorage.setItem("kinome_cta_dismissed", "1");
    } catch {
      /* no-op */
    }
  };

  const href = isEn ? "/en/contact/" : "/contact/";
  const title = isEn ? "Got a project?" : "Un projet en tête ?";
  const sub = isEn ? "Reply within 24 h." : "Réponse sous 24 h.";
  const cta = isEn ? "Let’s talk →" : "Parlons-en →";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[900] md:hidden transition-transform duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="relative flex items-center gap-2.5 border-t border-white/10 bg-kinome-dark px-4 pt-3 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.55)]">
        <button
          type="button"
          aria-label="Fermer"
          onClick={dismiss}
          className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-kinome-dark text-[17px] leading-none text-kinome-cream/80 shadow-md transition-colors hover:text-kinome-cream"
        >
          &times;
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[14px] font-semibold leading-tight text-kinome-cream">
            {title}
          </p>
          <p className="truncate text-[12px] leading-tight text-kinome-cream/70">
            {sub}
          </p>
        </div>

        <Link
          href={href}
          onClick={() => setVisible(false)}
          className="shrink-0 whitespace-nowrap rounded-full bg-kinome-accent px-4 py-2.5 font-heading text-[13.5px] font-semibold text-white transition-transform active:scale-95"
        >
          {cta}
        </Link>

        {/* Espace réservé pour le chatbot flottant (bas-droite) */}
        <div className="w-[52px] shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}
