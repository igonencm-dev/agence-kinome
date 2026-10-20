"use client";

/**
 * Invitation à poser une question (20/10/2026). Elle s'affiche une seule fois par visite,
 * en bas à droite, quand le visiteur LIT vraiment la page : 45 s de lecture active
 * (onglet visible, activité dans les 30 dernières secondes) et 35 % de la page parcourue.
 * Un onglet resté ouvert ne compte pas : c'est le cas des « visites de 20 minutes » vues
 * dans /admin/, où le temps actif n'est souvent que de quelques secondes.
 *
 * Elle ne vient pas si le visiteur a déjà ouvert le chat, tant que le bandeau cookies
 * attend une réponse, ni par-dessus le chat ouvert. Elle masque la bulle d'accroche du
 * widget pour ne pas faire doublon. Ses questions passent par OuvrirAssistant.
 * Mesure dans /admin/ : chatbot / invitation, invitation-fermee, invitation-ecrire.
 */

import { useEffect, useState } from "react";
import { suivre } from "../lib/suivi";
import type { Invitation } from "../lib/questions-assistant";
import { CLE_CHAT_OUVERT, ouvrirSeulement } from "./OuvrirAssistant";

const CLE_VUE = "kn-invitation-vue";
const ACTIF_MS = 45_000;
const INACTIF_APRES_MS = 30_000;
const DEFILEMENT_MIN = 0.35;

function lire(cle: string) {
  try {
    return sessionStorage.getItem(cle);
  } catch {
    return null;
  }
}

function retenir(cle: string) {
  try {
    sessionStorage.setItem(cle, "1");
  } catch {
    /* stockage indisponible : l'invitation pourra revenir, sans gravité */
  }
}

/** Le bandeau cookies a reçu une réponse (sinon les deux se chevaucheraient sur mobile). */
function bandeauRegle() {
  try {
    return !!localStorage.getItem("kinome-cookie-consent");
  } catch {
    return true;
  }
}

function chatOuvert() {
  const fenetre = document.getElementById("causerie-window");
  return !!fenetre && getComputedStyle(fenetre).opacity !== "0";
}

export default function InvitationAssistant({
  invitation,
  emplacement = "invitation",
}: {
  invitation: Invitation;
  emplacement?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lire(CLE_VUE) || lire(CLE_CHAT_OUVERT)) return;
    let actif = 0;
    let derniereActivite = Date.now();
    let defilementMax = 0;
    const activite = () => {
      derniereActivite = Date.now();
    };
    const surDefilement = () => {
      activite();
      const course = document.documentElement.scrollHeight - window.innerHeight;
      if (course > 0) defilementMax = Math.max(defilementMax, window.scrollY / course);
    };
    const evenements = ["mousemove", "keydown", "touchstart", "click"] as const;
    evenements.forEach((ev) => window.addEventListener(ev, activite, { passive: true }));
    window.addEventListener("scroll", surDefilement, { passive: true });

    const minuteur = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - derniereActivite > INACTIF_APRES_MS) return;
      actif += 1000;
      if (actif < ACTIF_MS || defilementMax < DEFILEMENT_MIN) return;
      if (lire(CLE_VUE) || lire(CLE_CHAT_OUVERT) || !bandeauRegle() || chatOuvert()) return;
      window.clearInterval(minuteur);
      retenir(CLE_VUE);
      document.getElementById("causerie-bubble")?.classList.add("hidden");
      setVisible(true);
      suivre("chatbot", { action: "invitation", emplacement });
    }, 1000);

    return () => {
      window.clearInterval(minuteur);
      evenements.forEach((ev) => window.removeEventListener(ev, activite));
      window.removeEventListener("scroll", surDefilement);
    };
  }, [emplacement]);

  useEffect(() => {
    if (!visible) return;
    const echap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        suivre("chatbot", { action: "invitation-fermee", emplacement });
      }
    };
    window.addEventListener("keydown", echap);
    return () => window.removeEventListener("keydown", echap);
  }, [visible, emplacement]);

  if (!visible) return null;

  const fermer = () => {
    setVisible(false);
    suivre("chatbot", { action: "invitation-fermee", emplacement });
  };

  return (
    <aside
      aria-label="Poser une question à l'assistant"
      data-emplacement={emplacement}
      // Une question cliquée part par OuvrirAssistant (délégation sur document) : la carte
      // se retire juste après, pour que ce gestionnaire lise encore data-emplacement.
      onClick={(e) => {
        if ((e.target as Element).closest("[data-question-assistant]")) window.setTimeout(() => setVisible(false), 0);
      }}
      className="fixed bottom-[92px] left-3 right-3 z-[950] rounded-[20px] border border-kinome-black/10 bg-white p-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] motion-reduce:!animate-none sm:left-auto sm:right-6 sm:w-[340px]"
      style={{ animation: "kinome-fade-in 500ms ease-out both" }}
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={fermer}
        data-suivi-ignorer
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-kinome-black/15 text-[17px] leading-none text-kinome-black/70 transition-colors hover:border-kinome-accent hover:text-kinome-accent"
      >
        &times;
      </button>
      <p className="pr-8 font-heading text-[18px] font-semibold leading-[1.3] text-kinome-black">
        {invitation.titre}
      </p>
      <p className="mt-1.5 font-body text-[15px] font-light leading-[1.5] text-kinome-black/80">
        {invitation.texte}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {invitation.questions.map((q, i) => (
          // Sur téléphone, deux questions suffisent : la carte reste légère.
          <li key={q} className={i > 1 ? "hidden sm:block" : undefined}>
            <button
              type="button"
              data-question-assistant={q}
              data-suivi-ignorer
              className="w-full rounded-full border border-kinome-black/15 bg-kinome-cream px-4 py-2.5 text-left font-body text-[14.5px] font-normal leading-snug text-kinome-black transition-colors duration-300 hover:border-kinome-accent hover:text-kinome-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kinome-accent"
            >
              {q}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        data-suivi-ignorer
        onClick={() => {
          setVisible(false);
          suivre("chatbot", { action: "invitation-ecrire", emplacement });
          ouvrirSeulement();
        }}
        className="mt-3 font-body text-[14px] font-normal text-kinome-black/70 underline decoration-kinome-black/25 underline-offset-4 transition-colors hover:text-kinome-accent hover:decoration-kinome-accent"
      >
        Ou écrivez la vôtre
      </button>
    </aside>
  );
}
