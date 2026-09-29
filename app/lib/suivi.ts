// Suivi first-party d'agence-kinome.ch, envoyé à /api/t.php (notre serveur,
// aucun tiers). Porté de codecircle.fr. Deux niveaux, calés sur les règles
// de la CNIL et de la LPD suisse :
//
// - Sans consentement : mesure d'audience exemptée. Un identifiant de visite
//   (30 min d'inactivité) en localStorage, aucune IP gardée, aucun cookie,
//   aucun croisement d'une visite à l'autre.
// - Avec consentement (bandeau « Tout accepter ») : un identifiant de visiteur
//   durable (13 mois) relie les visites entre elles. Quand ce visiteur envoie
//   une demande, on connaît son tout premier point de contact, par exemple
//   ChatGPT trois jours avant une recherche Google.
//
// Ce qui est suivi : pages vues, temps de lecture réel (onglet visible),
// profondeur de défilement, clics sur téléphone, email, liens sortants et
// boutons d'action, ouverture du chatbot, formulaires commencés et abandonnés
// (jamais leur contenu), WhatsApp, j'aime sur les articles et médias ouverts
// dans la visionneuse.

const BASE = ""; // site servi à la racine du domaine
const ENDPOINT = `${BASE}/api/t.php`;
const CLE_SESSION = "kn-s";
const CLE_VISITEUR = "kn-v";
// Choix du bandeau Kinome (app/components/CookieConsent.tsx)
const CLE_CONSENTEMENT = "kinome-cookie-consent";
const CLE_ATTENTE = "kn-attente";
const INACTIVITE_MS = 30 * 60 * 1000;
const VISITEUR_MS = 395 * 24 * 3600 * 1000; // 13 mois
const CONSENTEMENT_MS = 182 * 24 * 3600 * 1000;

// i : identifiant unique, le serveur ignore un événement déjà reçu
type Evenement = { type: string; p?: string; d?: Record<string, unknown>; t: number; i: string };
type Session = {
  id: string;
  dernier: number;
  ref: string;
  utm: Record<string, string>;
  att: string;
  vn?: number;
};
type Visiteur = { id: string; premiere: number; visites: number };

let file: Evenement[] = [];
let minuteur: ReturnType<typeof setTimeout> | null = null;
let installe = false;
let memoire: Session | null = null;

// Page en cours : temps visible et défilement maximal
let page: { p: string; debut: number; visible: number; depuis: number | null; scroll: number } | null = null;
// Formulaires commencés sur la page en cours
const formulaires = new Map<string, { dernier: string; champs: Set<string>; envoye: boolean }>();

// --- Stockage tolérant (navigation privée, stockage bloqué) ---------------------
function lire<T>(cle: string): T | null {
  try {
    const brut = window.localStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : null;
  } catch {
    return null;
  }
}
function ecrire(cle: string, valeur: unknown) {
  try {
    window.localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // Sans stockage, la session vit en mémoire le temps de la page
  }
}

function nouvelId(): string {
  try {
    return crypto.randomUUID().replace(/-/g, "");
  } catch {
    return (Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 32);
  }
}

/** Le suivi est coupé sur l'admin, pour l'équipe et pour les robots de test. */
export function suiviActif(): boolean {
  if (typeof window === "undefined") return false;
  if (window.location.pathname.startsWith(`${BASE}/admin`)) return false;
  try {
    if (window.localStorage.getItem("kn-ignorer") === "1") return false;
    if (navigator.webdriver && window.localStorage.getItem("kn-test") !== "1") return false;
  } catch {
    // Stockage bloqué : on suit quand même, en mémoire
  }
  return true;
}

/** Mesure d'audience acceptée dans le bandeau Kinome (version 1, moins de 6 mois). */
export function consentementAccepte(): boolean {
  const c = lire<{ version?: string; date?: string; analytics?: boolean }>(CLE_CONSENTEMENT);
  if (!c || c.version !== "1" || c.analytics !== true || !c.date) return false;
  const quand = Date.parse(c.date);
  return Number.isFinite(quand) && Date.now() - quand < CONSENTEMENT_MS;
}

function visiteur(nouvelleVisite = false): Visiteur | null {
  if (!consentementAccepte()) return null;
  let v = lire<Visiteur>(CLE_VISITEUR);
  if (!v || Date.now() - v.premiere > VISITEUR_MS) v = { id: nouvelId(), premiere: Date.now(), visites: 0 };
  if (nouvelleVisite || v.visites === 0) v.visites += 1;
  ecrire(CLE_VISITEUR, v);
  return v;
}

/** Oubli immédiat du visiteur (refus après un accord). */
export function oublierVisiteur() {
  try {
    window.localStorage.removeItem(CLE_VISITEUR);
  } catch {
    // rien à effacer
  }
}

function referrerExterne(): string {
  const r = document.referrer;
  if (!r) return "";
  try {
    return new URL(r).hostname === window.location.hostname ? "" : r;
  } catch {
    return "";
  }
}

function utmDeLUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid", "msclkid"]) {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }
  return utm;
}

/**
 * Session en cours. Une nouvelle commence après 30 minutes d'inactivité, ou
 * quand le visiteur revient depuis l'extérieur (autre site, campagne).
 */
function session(premierChargement = false): Session {
  const maintenant = Date.now();
  let s = lire<Session>(CLE_SESSION) ?? memoire;
  const ref = premierChargement ? referrerExterne() : "";
  const utm = premierChargement ? utmDeLUrl() : {};
  const arriveeExterne = premierChargement && (ref !== "" || Object.keys(utm).length > 0);
  if (!s || maintenant - s.dernier > INACTIVITE_MS || (arriveeExterne && (ref !== s.ref || JSON.stringify(utm) !== JSON.stringify(s.utm)))) {
    s = { id: nouvelId(), dernier: maintenant, ref, utm, att: window.location.pathname.replace(BASE, "") || "/" };
    const v = visiteur(true);
    if (v) s.vn = v.visites;
  }
  s.dernier = maintenant;
  memoire = s;
  ecrire(CLE_SESSION, s);
  return s;
}

/** Identifiants à joindre à une demande envoyée (voir lead.php). */
export function contexteSuivi(): { s?: string; v?: string; ref?: string; utm?: Record<string, string> } {
  if (typeof window === "undefined") return {};
  const s = lire<Session>(CLE_SESSION) ?? memoire;
  const v = consentementAccepte() ? lire<Visiteur>(CLE_VISITEUR) : null;
  return { s: s?.id, v: v?.id, ref: s?.ref, utm: s?.utm };
}

// --- File d'envoi ----------------------------------------------------------------
// Une page qui se ferme peut abandonner sa dernière requête : à la sortie, le
// lot est d'abord mis de côté, puis renvoyé au chargement de la page suivante.
// Les doublons éventuels sont écartés côté serveur grâce à l'identifiant i.
type Lot = { n: number; s: Record<string, unknown>; e: Evenement[] };

function poster(lot: Lot) {
  const corps = JSON.stringify(lot);
  try {
    const ok = navigator.sendBeacon?.(ENDPOINT, new Blob([corps], { type: "application/json" }));
    if (!ok) void fetch(ENDPOINT, { method: "POST", body: corps, keepalive: true, headers: { "Content-Type": "application/json" } });
  } catch {
    // Mesure perdue, la visite n'en souffre pas
  }
}

function envoyer(sortie = false) {
  if (minuteur) {
    clearTimeout(minuteur);
    minuteur = null;
  }
  if (!file.length || !suiviActif()) {
    file = [];
    return;
  }
  const s = session();
  const v = consentementAccepte() ? lire<Visiteur>(CLE_VISITEUR) : null;
  const lot: Lot = {
    n: Date.now(),
    s: {
      id: s.id,
      v: v?.id,
      vn: s.vn,
      ref: s.ref,
      utm: s.utm,
      att: s.att,
      ecran: `${window.screen.width}x${window.screen.height}`,
      lang: navigator.language,
    },
    e: file.splice(0, 60),
  };
  if (sortie) {
    const attente = lire<Lot[]>(CLE_ATTENTE) ?? [];
    attente.push(lot);
    ecrire(CLE_ATTENTE, attente.slice(-10));
  }
  poster(lot);
  if (file.length) {
    if (sortie) envoyer(true);
    else planifier();
  }
}

/** Renvoie les lots mis de côté à la sortie de la page précédente (moins d'un jour). */
function renvoyerEnAttente() {
  const attente = lire<Lot[]>(CLE_ATTENTE);
  if (!attente?.length) return;
  try {
    window.localStorage.removeItem(CLE_ATTENTE);
  } catch {
    return;
  }
  for (const lot of attente) {
    if (Date.now() - lot.n > 86400000) continue;
    // n recalé sur l'horloge actuelle : le serveur retrouve la vraie date des événements
    const decalage = Date.now() - lot.n;
    poster({ ...lot, n: Date.now(), e: lot.e.map((e) => ({ ...e, t: e.t + decalage })) });
  }
}

function planifier() {
  if (!minuteur) minuteur = setTimeout(envoyer, 4000);
}

/** Enregistre un événement (envoi groupé toutes les 4 s et à la sortie). */
export function suivre(type: string, d?: Record<string, unknown>, p?: string) {
  if (!suiviActif()) return;
  file.push({ type, p: p ?? (window.location.pathname.replace(BASE, "") || "/"), d, t: Date.now(), i: nouvelId().slice(0, 20) });
  planifier();
}

// --- Pages, lecture et formulaires --------------------------------------------------
// Le temps de lecture part par segments (à chaque passage en arrière-plan) :
// le tableau de bord additionne les segments d'une page, rien n'est compté deux fois.
function segmentLecture() {
  if (!page) return;
  const maintenant = Date.now();
  const visible = page.visible + (page.depuis ? maintenant - page.depuis : 0);
  if (visible > 0) suivre("lecture", { duree: visible, scroll: Math.round(page.scroll) }, page.p);
  page.visible = 0;
  page.depuis = document.visibilityState === "visible" ? maintenant : null;
}

function fermerPage() {
  if (!page) return;
  segmentLecture();
  for (const [nom, f] of formulaires) {
    if (!f.envoye && f.champs.size > 0) suivre("formulaire", { form: nom, etape: "abandon", dernier: f.dernier, remplis: f.champs.size }, page.p);
  }
  formulaires.clear();
  page = null;
}

function mesurerScroll() {
  if (!page) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const pct = h <= 0 ? 100 : Math.min(100, ((window.scrollY + 0) / h) * 100);
  if (pct > page.scroll) page.scroll = pct;
}

/** À appeler à chaque changement de page (composant Suivi). */
export function pageVue(chemin: string) {
  if (!suiviActif()) return;
  installer();
  fermerPage();
  session();
  page = { p: chemin, debut: Date.now(), visible: 0, depuis: document.visibilityState === "visible" ? Date.now() : null, scroll: 0 };
  mesurerScroll();
  // Le titre est mis à jour juste après le rendu de la nouvelle page
  setTimeout(() => suivre("vue", { titre: document.title.replace(/ \| Kinome$/, "").slice(0, 140) }, chemin), 60);
}

/** Le formulaire vient d'être envoyé : pas d'abandon à signaler. */
export function formulaireEnvoye(nom: string) {
  const f = formulaires.get(nom);
  if (f) f.envoye = true;
  suivre("formulaire", { form: nom, etape: "envoi" });
}

function libelle(el: Element): string {
  return (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 70);
}

function installer() {
  if (installe) return;
  installe = true;
  // Premier chargement : c'est ici qu'on lit le référent et les UTM
  session(true);
  renvoyerEnAttente();

  document.addEventListener(
    "click",
    (e) => {
      const cible = e.target as Element | null;
      if (!cible) return;
      if (cible.closest('[id*="causerie" i], [class*="causerie" i], iframe[src*="causerie"]')) {
        suivre("chatbot", { action: "clic" });
        return;
      }
      const el = cible.closest("a, button");
      if (!el) return;
      const suivi = el.getAttribute("data-suivi");
      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") || "";
        if (href.startsWith("tel:")) return suivre("clic", { cible: "tel", libelle: href.slice(4) });
        if (href.startsWith("mailto:")) return suivre("clic", { cible: "mail", libelle: href.slice(7).split("?")[0] });
        try {
          const u = new URL(el.href);
          if (/(^|\.)wa\.me$|(^|\.)whatsapp\.com$/.test(u.hostname)) return suivre("clic", { cible: "whatsapp", libelle: libelle(el) });
          if (u.hostname !== window.location.hostname) return suivre("clic", { cible: "externe", libelle: libelle(el), href: u.hostname + u.pathname });
          const p = u.pathname.replace(BASE, "");
          const versContact = /^\/(en\/)?contact\//.test(p) || u.hash === "#contact";
          if (suivi || versContact) return suivre("clic", { cible: "cta", libelle: suivi || libelle(el), vers: u.hash === "#contact" ? `${p}#contact` : p });
        } catch {
          // lien sans URL valide
        }
      } else if (suivi) {
        suivre("clic", { cible: "cta", libelle: suivi });
      }
    },
    { capture: true },
  );

  // Formulaires : premier champ touché = formulaire commencé
  document.addEventListener("focusin", (e) => {
    const champ = e.target as HTMLInputElement | null;
    const form = champ?.closest?.("form[data-suivi-form]");
    if (!form || !champ?.name) return;
    const nom = form.getAttribute("data-suivi-form") || "form";
    let f = formulaires.get(nom);
    if (!f) {
      f = { dernier: champ.name, champs: new Set(), envoye: false };
      formulaires.set(nom, f);
      suivre("formulaire", { form: nom, etape: "debut", champ: champ.name });
    }
    f.dernier = champ.name;
  });
  document.addEventListener("input", (e) => {
    const champ = e.target as HTMLInputElement | null;
    const form = champ?.closest?.("form[data-suivi-form]");
    if (!form || !champ?.name) return;
    formulaires.get(form.getAttribute("data-suivi-form") || "form")?.champs.add(champ.name);
  });

  // Copie d'un email ou d'un numéro : souvent un contact qui ne passera pas par le formulaire
  document.addEventListener("copy", () => {
    const texte = String(window.getSelection() ?? "");
    if (/@/.test(texte)) suivre("copie", { quoi: "email" });
    else if (/(\d[\s.]?){9,}/.test(texte)) suivre("copie", { quoi: "telephone" });
  });

  let attente = false;
  window.addEventListener(
    "scroll",
    () => {
      if (attente) return;
      attente = true;
      requestAnimationFrame(() => {
        mesurerScroll();
        attente = false;
      });
    },
    { passive: true },
  );

  document.addEventListener("visibilitychange", () => {
    if (!page) return;
    if (document.visibilityState === "hidden") {
      // L'onglet peut ne jamais revenir : on envoie ce qui a été lu jusqu'ici
      segmentLecture();
      envoyer(true);
    } else {
      page.depuis = Date.now();
    }
  });
  window.addEventListener("pagehide", () => {
    fermerPage();
    envoyer(true);
  });
}
