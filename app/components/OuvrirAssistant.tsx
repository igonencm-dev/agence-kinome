"use client";

/**
 * Questions qui ouvrent le chatbot (20/10/2026) : un clic sur un bouton
 * data-question-assistant ouvre le chat Causerie et lui pose la question, comme si le
 * visiteur l'avait tapée. Même geste que sur nocodetoulouse.fr (OuvrirAssistant.tsx) :
 * - on passe par la porte prévue par le widget, window.Causerie.open() ;
 * - le widget se charge après la première interaction (CauserieBotWidget) : un clic très
 *   tôt l'attend jusqu'à 12 s ;
 * - la question part quand le fil est prêt, et les suggestions de l'accueil du chat
 *   (.cz-suggestions) s'effacent, comme après un clic sur l'une d'elles.
 * Le clic est compté dans /admin/ (événement chatbot, action question).
 */

import { useEffect } from "react";
import { suivre } from "../lib/suivi";

type Registre = { _bots?: unknown[]; open: () => void };

/** Lu par InvitationAssistant : une fois le chat ouvert, plus d'invitation. */
export const CLE_CHAT_OUVERT = "kn-assistant-ouvert";

export function marquerChatOuvert() {
  try {
    sessionStorage.setItem(CLE_CHAT_OUVERT, "1");
  } catch {
    /* stockage indisponible : sans effet */
  }
}

/** Ouvre le chat dès que le widget est chargé (jusqu'à 12 s d'attente), puis enchaîne. */
function quandPret(suite?: () => void) {
  const debut = Date.now();
  const tenter = () => {
    const registre = (window as unknown as { Causerie?: Registre }).Causerie;
    if (!registre?._bots?.length) {
      if (Date.now() - debut < 12000) window.setTimeout(tenter, 150);
      return;
    }
    document.getElementById("causerie-bubble")?.classList.add("hidden");
    registre.open();
    suite?.();
  };
  tenter();
}

export function ouvrirEtPoser(question: string) {
  quandPret(() => poser(question));
}

/** Ouvre le chat sans question : le visiteur écrit la sienne. */
export function ouvrirSeulement() {
  marquerChatOuvert();
  quandPret();
}

/** Écrit la question dans le champ du chat et l'envoie, quand le fil est prêt. */
function poser(question: string) {
  const debut = Date.now();
  let enfants = -1;
  let stableDepuis = debut;
  const tenter = () => {
    const champ = document.getElementById("causerie-input") as HTMLInputElement | HTMLTextAreaElement | null;
    const bouton = document.getElementById("causerie-send");
    const fil = document.getElementById("causerie-messages");
    const ecoule = Date.now() - debut;
    if (!champ || !bouton) {
      if (ecoule < 6000) window.setTimeout(tenter, 120);
      return;
    }
    // Le fil est prêt quand le widget rend la main au champ, ou quand plus rien n'y bouge
    // (une conversation en cours se recharge en arrière-plan).
    const n = fil?.children.length ?? 0;
    if (n !== enfants) {
      enfants = n;
      stableDepuis = Date.now();
    }
    const pret = document.activeElement === champ || (n > 0 && Date.now() - stableDepuis > 600) || ecoule > 3000;
    if (!pret) {
      window.setTimeout(tenter, 120);
      return;
    }
    fil?.querySelector(".cz-suggestions")?.remove();
    champ.value = question;
    champ.dispatchEvent(new Event("input", { bubbles: true }));
    bouton.click();
  };
  window.setTimeout(tenter, 150);
}

export default function OuvrirAssistant() {
  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      const cible = e.target as Element | null;
      // Ouverture du chat par le visiteur lui-même (bouton rond, bulle d'accroche).
      if (cible?.closest?.("#causerie-widget")) marquerChatOuvert();
      const b = cible?.closest?.("[data-question-assistant]");
      if (!b) return;
      e.preventDefault();
      const question = b.getAttribute("data-question-assistant") || "";
      if (!question) return;
      const emplacement = b.closest("[data-emplacement]")?.getAttribute("data-emplacement") || "page";
      suivre("chatbot", { action: "question", emplacement, question: question.slice(0, 140) });
      marquerChatOuvert();
      ouvrirEtPoser(question);
    };
    document.addEventListener("click", surClic);
    return () => document.removeEventListener("click", surClic);
  }, []);
  return null;
}
