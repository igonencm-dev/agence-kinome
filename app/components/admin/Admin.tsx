"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Canal, Carte, Histogramme, STATUTS, Tableau, Tuile, chf, date, decrire, duree, ilya, nb } from "./Blocs";

// Tableau de bord interne d'agence-kinome.ch, porté de codecircle.fr. Toutes
// les données viennent de
// /api/admin.php (cookie de session HttpOnly limité à /api/). Rien n'est
// indexé, rien n'est suivi sur cette page.

const API = "/api/admin.php";

// Réponses de la question « Comment nous avez-vous connus ? » du formulaire
// de contact (libellés FR de app/lib/i18n.ts), pour la saisie manuelle.
const ORIGINES = [
  "ChatGPT ou une autre IA",
  "Recherche Google",
  "Réseaux sociaux (LinkedIn, Instagram…)",
  "Recommandation, bouche-à-oreille",
  "Événement, CCIFS",
  "Autre",
] as const;

function Marque({ taille }: { taille: string }) {
  return <span className={`font-heading font-semibold tracking-tight text-kinome-black ${taille}`}>Kinome</span>;
}

type Ligne = Record<string, unknown>;
type Stats = {
  totaux: Record<string, number>;
  precedente: Record<string, number> | null;
  serie: { jour: string; sessions: number; leads: number }[];
  canaux: Ligne[];
  sources: Ligne[];
  entrees: Ligne[];
  pages: Ligne[];
  appareils: Ligne[];
  clics: Ligne[];
  entonnoir: { etape: string; n: number }[];
  abandons: Ligne[];
  blog: Ligne[];
  origines: Ligne[];
  statuts: Ligne[];
  heures: { heure: number; sessions: number }[];
  en_direct: number;
  premiere_mesure: number;
};

class NonConnecte extends Error {}

async function api<T = Ligne>(action: string, params: Record<string, string | number> = {}, corps?: unknown): Promise<T> {
  const qs = new URLSearchParams({ a: action, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  const res = await fetch(`${API}?${qs}`, {
    method: corps === undefined ? "GET" : "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: corps === undefined ? {} : { "Content-Type": "application/json", "X-KN": "1" },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  if (res.status === 401) {
    const j = await res.json().catch(() => ({}));
    if (j.erreur === "non_connecte") throw new NonConnecte();
    throw new Error(j.erreur || "Accès refusé");
  }
  const json = await res.json();
  if (!json.ok) throw new Error(json.erreur || `Erreur ${res.status}`);
  return json as T;
}

const PERIODES = [
  { j: 1, l: "24 h" },
  { j: 7, l: "7 jours" },
  { j: 30, l: "30 jours" },
  { j: 90, l: "90 jours" },
  { j: 365, l: "12 mois" },
  { j: 0, l: "Tout" },
];
const ONGLETS = ["Vue d'ensemble", "Demandes", "Visites", "Réglages"] as const;
type Onglet = (typeof ONGLETS)[number];

const champCls = "w-full rounded-xl border border-[#e7e3da] bg-white px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-kinome-black";
const boutonCls = "rounded-full bg-kinome-black px-5 py-2.5 text-[0.88rem] font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50";

// ---------------------------------------------------------------------------
export default function Admin() {
  const [etat, setEtat] = useState<"verif" | "connexion" | "ok">("verif");
  const [onglet, setOnglet] = useState<Onglet>("Vue d'ensemble");
  const [jours, setJours] = useState(30);
  const [leadOuvert, setLeadOuvert] = useState<number | null>(null);
  const [sessionOuverte, setSessionOuverte] = useState<string | null>(null);

  useEffect(() => {
    // L'appareil de l'équipe n'est jamais compté dans les visites
    try {
      window.localStorage.setItem("kn-ignorer", "1");
    } catch {
      // stockage indisponible
    }
    api("moi")
      .then(() => setEtat("ok"))
      .catch(() => setEtat("connexion"));
    // Lien direct depuis l'email d'alerte : /admin/#lead-12
    const m = window.location.hash.match(/^#lead-(\d+)$/);
    if (m) {
      setOnglet("Demandes");
      setLeadOuvert(Number(m[1]));
    }
  }, []);

  const deconnecte = useCallback(() => setEtat("connexion"), []);

  if (etat === "verif") return <div className="min-h-screen bg-kinome-cream" />;
  if (etat === "connexion") return <Connexion onOk={() => setEtat("ok")} />;

  return (
    <div className="min-h-screen bg-kinome-cream text-kinome-black">
      <header className="sticky top-0 z-30 border-b border-[#e7e3da] bg-kinome-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Marque taille="text-[1.35rem]" />
            <span className="rounded-full bg-kinome-black px-2.5 py-0.5 text-[0.72rem] font-bold text-white">Tableau de bord</span>
          </div>
          <nav className="flex gap-1" aria-label="Sections">
            {ONGLETS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setOnglet(o);
                  setLeadOuvert(null);
                  setSessionOuverte(null);
                }}
                className={`rounded-full px-3.5 py-1.5 text-[0.86rem] font-semibold ${onglet === o ? "bg-kinome-black text-white" : "hover:bg-kinome-black/5"}`}
              >
                {o}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {onglet !== "Réglages" && (
              <select
                value={jours}
                onChange={(e) => setJours(Number(e.target.value))}
                className="rounded-full border border-[#e7e3da] bg-white px-3 py-1.5 text-[0.85rem] font-semibold"
                aria-label="Période"
              >
                {PERIODES.map((p) => (
                  <option key={p.j} value={p.j}>
                    {p.l}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={() => api("deconnexion", {}, {}).finally(deconnecte)}
              className="rounded-full px-3 py-1.5 text-[0.85rem] font-semibold text-kinome-grey hover:text-kinome-black"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {onglet === "Vue d'ensemble" && <VueEnsemble jours={jours} onDeconnecte={deconnecte} onLead={(id) => { setOnglet("Demandes"); setLeadOuvert(id); }} />}
        {onglet === "Demandes" &&
          (leadOuvert ? (
            <FicheLead id={leadOuvert} onRetour={() => { setLeadOuvert(null); history.replaceState(null, "", window.location.pathname); }} onDeconnecte={deconnecte} />
          ) : (
            <ListeLeads jours={jours} onOuvrir={setLeadOuvert} onDeconnecte={deconnecte} />
          ))}
        {onglet === "Visites" &&
          (sessionOuverte ? (
            <FicheSession id={sessionOuverte} onRetour={() => setSessionOuverte(null)} onLead={(id) => { setOnglet("Demandes"); setLeadOuvert(id); }} />
          ) : (
            <ListeSessions jours={jours} onOuvrir={setSessionOuverte} onDeconnecte={deconnecte} />
          ))}
        {onglet === "Réglages" && <Reglages />}
      </main>
    </div>
  );
}

// --- Connexion -----------------------------------------------------------------
function Connexion({ onOk }: { onOk: () => void }) {
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  async function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      await api("connexion", {}, { motdepasse: new FormData(e.currentTarget).get("motdepasse") });
      onOk();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setEnvoi(false);
    }
  }
  return (
    <div className="grid min-h-screen place-items-center bg-kinome-cream px-4">
      <form onSubmit={valider} className="w-full max-w-sm rounded-3xl border border-[#e7e3da] bg-white p-8">
        <Marque taille="text-[1.6rem]" />
        <h1 className="font-heading mt-6 text-2xl font-extrabold tracking-tight">Tableau de bord</h1>
        <label htmlFor="motdepasse" className="mt-6 block text-[0.88rem] font-semibold">
          Mot de passe
        </label>
        <input id="motdepasse" name="motdepasse" type="password" required autoComplete="current-password" autoFocus className={`${champCls} mt-1.5`} />
        {erreur && <p className="mt-3 text-[0.85rem] text-[#b91c1c]">{erreur}</p>}
        <button type="submit" disabled={envoi} className={`${boutonCls} mt-5 w-full`}>
          {envoi ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

// Charge une ressource de l'API et gère la déconnexion expirée
function useApi<T>(action: string, params: Record<string, string | number>, onDeconnecte: () => void, cle = "") {
  const [data, setData] = useState<T | null>(null);
  const [erreur, setErreur] = useState("");
  const [tour, setTour] = useState(0);
  const p = JSON.stringify(params);
  useEffect(() => {
    let vivant = true;
    setErreur("");
    api<T>(action, JSON.parse(p))
      .then((d) => vivant && setData(d))
      .catch((e) => {
        if (e instanceof NonConnecte) onDeconnecte();
        else if (vivant) setErreur(e.message);
      });
    return () => {
      vivant = false;
    };
  }, [action, p, onDeconnecte, tour, cle]);
  return { data, erreur, recharger: () => setTour((t) => t + 1) };
}

// --- Vue d'ensemble -------------------------------------------------------------
function VueEnsemble({ jours, onDeconnecte, onLead }: { jours: number; onDeconnecte: () => void; onLead: (id: number) => void }) {
  const { data: s, erreur } = useApi<Stats>("stats", { j: jours }, onDeconnecte);
  if (erreur) return <p className="text-[#b91c1c]">{erreur}</p>;
  if (!s) return <p className="text-kinome-grey">Chargement…</p>;
  const t = s.totaux;
  const av = s.precedente;
  const statut = (k: string) => Number(s.statuts.find((x) => x.statut === k)?.n ?? 0);
  const valeurGagnee = Number(s.statuts.find((x) => x.statut === "gagne")?.valeur ?? 0);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.85rem] text-kinome-grey">
        <span className="inline-flex items-center gap-2 font-semibold text-kinome-black">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#15803d]" /> {s.en_direct} visiteur{s.en_direct > 1 ? "s" : ""} en ce moment
        </span>
        {s.premiere_mesure > 0 && <span>Mesure active depuis le {date(s.premiere_mesure, false)}</span>}
        {av && <span>Variations comparées aux {jours} jours précédents</span>}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <Tuile label="Demandes" valeur={t.leads} avant={av?.leads} accent />
        <Tuile label="Visites" valeur={t.sessions} avant={av?.sessions} />
        <Tuile label="Visiteurs" valeur={t.visiteurs} avant={av?.visiteurs} />
        <Tuile label="Pages vues" valeur={t.pages} avant={av?.pages} />
        <Tuile label="Conversion" valeur={t.conversion} avant={av?.conversion} format={(v) => `${String(v).replace(".", ",")} %`} />
        <Tuile label="Visites depuis une IA" valeur={t.ia} avant={av?.ia} />
        <Tuile label="Durée moyenne" valeur={t.duree_moyenne_s} avant={av?.duree_moyenne_s} format={duree} />
        <Tuile label="Rebond" valeur={t.rebond} avant={av?.rebond} format={(v) => `${String(v).replace(".", ",")} %`} inverse />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Carte titre="Visites par jour" aide="Survolez une barre pour le détail. Pastille orange : demandes reçues ce jour-là." className="lg:col-span-2">
          <Histogramme serie={s.serie} jours={jours} />
        </Carte>
        <Carte titre="Pipeline commercial" aide="Demandes de la période, par statut.">
          <div className="grid grid-cols-2 gap-2 text-[0.85rem]">
            {Object.entries(STATUTS)
              .filter(([k]) => k !== "spam")
              .map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-xl border border-[#e7e3da] px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-[0.72rem] font-bold ${v.cls}`}>{v.label}</span>
                  <span className="font-bold tabular-nums">{statut(k)}</span>
                </div>
              ))}
          </div>
          {valeurGagnee > 0 && <p className="mt-3 text-[0.85rem]">Chiffre gagné : <strong>{chf(valeurGagnee)}</strong></p>}
        </Carte>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Carte titre="D'où viennent les visites" aide="Canal technique (référent et UTM). Une IA qui renvoie vers Google apparaît en Google : voir l'origine déclarée.">
          <Tableau
            lignes={s.canaux}
            barre="sessions"
            colonnes={[
              { cle: "canal", label: "Canal", rendu: (l) => <Canal canal={String(l.canal)} /> },
              { cle: "sessions", label: "Visites", droite: true, rendu: (l) => nb(l.sessions as number) },
              { cle: "leads", label: "Demandes", droite: true, rendu: (l) => <strong className={Number(l.leads) ? "text-kinome-accent" : ""}>{nb(l.leads as number)}</strong> },
              { cle: "conv", label: "Conv.", droite: true, rendu: (l) => `${Number(l.sessions) ? ((Number(l.leads) / Number(l.sessions)) * 100).toFixed(1).replace(".", ",") : 0} %` },
              { cle: "pages_moy", label: "Pages", droite: true },
              { cle: "duree_moy", label: "Durée", droite: true, rendu: (l) => duree(l.duree_moy as number) },
            ]}
          />
        </Carte>
        <Carte titre="Ce que disent les prospects" aide="Réponse à « Comment nous avez-vous connus ? » dans le formulaire. La source la plus fiable pour l'IA.">
          <Tableau
            lignes={s.origines}
            barre="leads"
            vide="Aucune demande avec origine déclarée sur la période."
            colonnes={[
              { cle: "origine", label: "Origine déclarée" },
              { cle: "leads", label: "Demandes", droite: true },
            ]}
          />
        </Carte>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Carte titre="Sources détaillées" aide="Quelle IA, quel moteur, quel site référent.">
          <Tableau
            lignes={s.sources}
            barre="sessions"
            colonnes={[
              { cle: "source", label: "Source", rendu: (l) => <Canal canal={String(l.canal)} source={String(l.source)} /> },
              { cle: "sessions", label: "Visites", droite: true },
              { cle: "leads", label: "Demandes", droite: true },
            ]}
          />
        </Carte>
        <Carte titre="Entonnoir de conversion" aide="Des visites jusqu'aux demandes envoyées.">
          <div className="grid gap-2.5">
            {s.entonnoir.map((e, i) => {
              const base = Math.max(1, s.entonnoir[0].n);
              return (
                <div key={e.etape}>
                  <div className="flex justify-between text-[0.85rem]">
                    <span>{e.etape}</span>
                    <span className="font-bold tabular-nums">
                      {nb(e.n)} <span className="font-normal text-kinome-grey">({((e.n / base) * 100).toFixed(1).replace(".", ",")} %)</span>
                    </span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-[4px] bg-kinome-black/[0.06]">
                    <div className={`h-full rounded-[4px] ${i === s.entonnoir.length - 1 ? "bg-kinome-accent" : "bg-kinome-black/80"}`} style={{ width: `${Math.max(0.5, (e.n / base) * 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          {s.abandons.length > 0 && (
            <div className="mt-5">
              <p className="text-[0.8rem] font-semibold text-kinome-grey">Formulaires abandonnés, par dernier champ touché</p>
              <ul className="mt-1.5 grid gap-1 text-[0.85rem]">
                {s.abandons.map((a, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {String(a.formulaire)} · <em>{String(a.dernier_champ)}</em>
                    </span>
                    <strong>{nb(a.n as number)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Carte>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Carte titre="Pages d'entrée" aide="Où les visiteurs arrivent, et combien repartent aussitôt.">
          <Tableau
            lignes={s.entrees}
            barre="sessions"
            colonnes={[
              { cle: "chemin", label: "Page" },
              { cle: "sessions", label: "Visites", droite: true },
              { cle: "rebond", label: "Rebond", droite: true, rendu: (l) => `${l.rebond} %` },
              { cle: "leads", label: "Demandes", droite: true },
            ]}
          />
        </Carte>
        <Carte titre="Pages les plus lues" aide="Temps de lecture réel (onglet visible) et défilement moyen.">
          <Tableau
            lignes={s.pages}
            barre="vues"
            colonnes={[
              { cle: "chemin", label: "Page" },
              { cle: "vues", label: "Vues", droite: true },
              { cle: "lecture_moy", label: "Lecture", droite: true, rendu: (l) => duree(l.lecture_moy as number) },
              { cle: "scroll_moy", label: "Défil.", droite: true, rendu: (l) => (l.scroll_moy == null ? "" : `${l.scroll_moy} %`) },
            ]}
          />
        </Carte>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Carte titre="Clics qui comptent" aide="Téléphone, email, boutons d'action, liens sortants.">
          <Tableau
            lignes={s.clics}
            barre="n"
            colonnes={[
              { cle: "libelle", label: "Élément", rendu: (l) => <span><span className="text-kinome-grey">{String(l.cible)} · </span>{String(l.libelle ?? "")}</span> },
              { cle: "n", label: "Clics", droite: true },
            ]}
          />
        </Carte>
        <Carte titre="Appareils">
          <Tableau
            lignes={s.appareils}
            barre="sessions"
            colonnes={[
              { cle: "appareil", label: "Appareil" },
              { cle: "sessions", label: "Visites", droite: true },
              { cle: "leads", label: "Demandes", droite: true },
            ]}
          />
        </Carte>
        <Carte titre="Heures de visite" aide="Heure de Genève.">
          <div className="flex h-28 items-end gap-[2px]">
            {Array.from({ length: 24 }, (_, h) => {
              const v = Number(s.heures.find((x) => Number(x.heure) === h)?.sessions ?? 0);
              const max = Math.max(1, ...s.heures.map((x) => Number(x.sessions)));
              return (
                <div key={h} className="group relative flex h-full flex-1 flex-col justify-end">
                  <div className="min-h-[2px] rounded-t-[3px] bg-kinome-black/70 group-hover:bg-kinome-black" style={{ height: `${(v / max) * 100}%` }} />
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-kinome-black px-2 py-1 text-[0.72rem] text-white group-hover:block">
                    {h} h : {v} visite{v > 1 ? "s" : ""}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-1 flex justify-between text-[0.72rem] text-kinome-grey">
            <span>0 h</span>
            <span>12 h</span>
            <span>23 h</span>
          </div>
        </Carte>
      </div>

      <Carte titre="Blog : vues et j'aime" aide="Compteurs affichés sur les articles, depuis leur mise en place le 6 septembre 2026 (toutes périodes confondues).">
        <Tableau
          lignes={s.blog}
          vide="Aucune lecture enregistrée pour l'instant."
          colonnes={[
            {
              cle: "slug",
              label: "Article",
              rendu: (l) => (
                <a href={`/blog/${String(l.slug)}/`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {String(l.slug)}
                </a>
              ),
            },
            { cle: "vues", label: "Vues", droite: true, rendu: (l) => nb(l.vues as number) },
            { cle: "jaime", label: "J'aime", droite: true, rendu: (l) => nb(l.jaime as number) },
          ]}
        />
      </Carte>
    </div>
  );
}

// --- Demandes -------------------------------------------------------------------
function ListeLeads({ jours, onOuvrir, onDeconnecte }: { jours: number; onOuvrir: (id: number) => void; onDeconnecte: () => void }) {
  const { data, erreur, recharger } = useApi<{ leads: Ligne[] }>("leads", {}, onDeconnecte);
  const [filtre, setFiltre] = useState("actifs");
  const [recherche, setRecherche] = useState("");
  const [ajout, setAjout] = useState(false);

  const leads = useMemo(() => {
    const depuis = jours > 0 ? Date.now() - jours * 86400000 : 0;
    const q = recherche.trim().toLowerCase();
    return (data?.leads ?? []).filter((l) => {
      if (Number(l.date) < depuis) return false;
      if (filtre === "actifs" && ["perdu", "spam"].includes(String(l.statut))) return false;
      if (filtre !== "actifs" && filtre !== "tous" && l.statut !== filtre) return false;
      if (q && !JSON.stringify(l).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data, filtre, recherche, jours]);

  if (erreur) return <p className="text-[#b91c1c]">{erreur}</p>;
  if (!data) return <p className="text-kinome-grey">Chargement…</p>;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un nom, un email, un projet…" className={`${champCls} max-w-sm`} />
        <select value={filtre} onChange={(e) => setFiltre(e.target.value)} className="rounded-full border border-[#e7e3da] bg-white px-3 py-2 text-[0.85rem] font-semibold" aria-label="Statut">
          <option value="actifs">En cours (hors perdus et spam)</option>
          <option value="tous">Tous les statuts</option>
          {Object.entries(STATUTS).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setAjout(!ajout)} className="rounded-full border border-[#e7e3da] bg-white px-4 py-2 text-[0.85rem] font-semibold hover:border-kinome-black">
            + Ajouter une demande
          </button>
          <a href={`${API}?a=export`} className="rounded-full border border-[#e7e3da] bg-white px-4 py-2 text-[0.85rem] font-semibold hover:border-kinome-black">
            Export CSV
          </a>
        </div>
      </div>

      {ajout && <AjoutLead onFait={() => { setAjout(false); recharger(); }} />}

      <p className="text-[0.85rem] text-kinome-grey">{leads.length} demande{leads.length > 1 ? "s" : ""}</p>
      <div className="overflow-x-auto rounded-2xl border border-[#e7e3da] bg-white">
        <table className="w-full text-left text-[0.86rem]">
          <thead className="text-[0.75rem] text-kinome-grey">
            <tr>
              {["Reçue", "Contact", "Projet", "Origine déclarée", "Canal (visite)", "1er contact", "Statut", "Valeur"].map((h) => (
                <th key={h} className="px-3 py-2.5 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => {
              const st = STATUTS[String(l.statut)] ?? STATUTS.nouveau;
              return (
                <tr key={String(l.id)} onClick={() => onOuvrir(Number(l.id))} className="cursor-pointer border-t border-[#e7e3da] align-top hover:bg-kinome-black/[0.03]">
                  <td className="whitespace-nowrap px-3 py-2.5">
                    {date(l.date as number)}
                    <div className="text-[0.75rem] text-kinome-grey">{ilya(l.date as number)}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <strong>{String(l.nom ?? l.site ?? "Sans nom")}</strong>
                    {l.entreprise ? <span className="text-kinome-grey"> · {String(l.entreprise)}</span> : null}
                    <div className="text-[0.78rem] text-kinome-grey">{String(l.email ?? "")}</div>
                  </td>
                  <td className="max-w-[280px] px-3 py-2.5">
                    <span className="font-semibold">{String(l.projet ?? "")}</span>
                    <div className="line-clamp-2 text-[0.78rem] text-kinome-grey">{String(l.extrait ?? "")}</div>
                  </td>
                  <td className="px-3 py-2.5">{l.origine_declaree ? <strong>{String(l.origine_declaree)}</strong> : <span className="text-kinome-grey">?</span>}</td>
                  <td className="px-3 py-2.5">
                    <Canal canal={l.canal as string} source={l.source as string} />
                  </td>
                  <td className="px-3 py-2.5">
                    {l.premier_canal && (l.premier_canal !== l.canal || l.premiere_source !== l.source) ? (
                      <>
                        <Canal canal={l.premier_canal as string} source={l.premiere_source as string} />
                        <div className="text-[0.75rem] text-kinome-grey">{Number(l.nb_visites) > 1 ? `${l.nb_visites} visites` : ""}</div>
                      </>
                    ) : (
                      <span className="text-[0.78rem] text-kinome-grey">{Number(l.nb_visites) > 1 ? `${l.nb_visites} visites` : "même visite"}</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[0.72rem] font-bold ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right">{chf(l.valeur as number | null)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!leads.length && <p className="p-5 text-[0.9rem] text-kinome-grey">Aucune demande pour ces filtres.</p>}
      </div>
    </div>
  );
}

function AjoutLead({ onFait }: { onFait: () => void }) {
  const [erreur, setErreur] = useState("");
  async function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("ajout", {}, { ...f, date: f.date ? new Date(String(f.date)).getTime() : undefined });
      onFait();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur");
    }
  }
  return (
    <form onSubmit={valider} className="grid gap-3 rounded-2xl border border-[#e7e3da] bg-white p-5 md:grid-cols-3">
      <p className="text-[0.85rem] text-kinome-grey md:col-span-3">Une demande arrivée par téléphone, par recommandation ou sur un salon : ajoutez-la pour garder le pipeline complet.</p>
      <input name="nom" placeholder="Nom" required className={champCls} />
      <input name="entreprise" placeholder="Entreprise" className={champCls} />
      <input name="email" type="email" placeholder="Email" className={champCls} />
      <input name="telephone" placeholder="Téléphone" className={champCls} />
      <input name="projet" placeholder="Projet" className={champCls} />
      <select name="origine" className={champCls} defaultValue="">
        <option value="">Origine…</option>
        {ORIGINES.map((o) => (
          <option key={o}>{o}</option>
        ))}
        <option>Appel entrant</option>
        <option>Salon ou événement</option>
      </select>
      <input name="date" type="date" className={champCls} aria-label="Date de la demande" />
      <textarea name="message" placeholder="Notes sur la demande" rows={2} className={`${champCls} md:col-span-2`} />
      <div className="md:col-span-3">
        <button type="submit" className={boutonCls}>
          Enregistrer
        </button>
        {erreur && <span className="ml-3 text-[0.85rem] text-[#b91c1c]">{erreur}</span>}
      </div>
    </form>
  );
}

type Detail = { lead: Ligne; sessions: Ligne[]; evenements: Ligne[] };

function FicheLead({ id, onRetour, onDeconnecte }: { id: number; onRetour: () => void; onDeconnecte: () => void }) {
  const { data, erreur, recharger } = useApi<Detail>("lead", { id }, onDeconnecte);
  const [enreg, setEnreg] = useState("");

  async function maj(champs: Record<string, unknown>) {
    setEnreg("Enregistrement…");
    try {
      await api("maj", {}, { id, ...champs });
      setEnreg("Enregistré ✓");
      recharger();
    } catch (e) {
      setEnreg(e instanceof Error ? e.message : "Erreur");
    }
  }

  if (erreur) return <p className="text-[#b91c1c]">{erreur}</p>;
  if (!data) return <p className="text-kinome-grey">Chargement…</p>;
  const l = data.lead;
  let contexte: Record<string, unknown> = {};
  try {
    contexte = l.contexte ? JSON.parse(String(l.contexte)) : {};
  } catch {
    contexte = {};
  }

  return (
    <div className="grid gap-5">
      <button type="button" onClick={onRetour} className="justify-self-start text-[0.88rem] font-semibold text-kinome-grey hover:text-kinome-black">
        ← Toutes les demandes
      </button>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-5 self-start">
          <section className="rounded-2xl border border-[#e7e3da] bg-white p-6">
            <p className="text-[0.8rem] text-kinome-grey">
              Demande n° {String(l.id)} · {date(l.date as number)} · formulaire {String(l.formulaire)}
              {l.import ? ` · importée (${String(l.import)})` : ""}
            </p>
            <h1 className="font-heading mt-1 text-3xl font-extrabold tracking-tight">{String(l.nom ?? l.site ?? "Sans nom")}</h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.92rem]">
              {l.email ? <a href={`mailto:${l.email}`} className="font-semibold underline">{String(l.email)}</a> : null}
              {l.telephone ? <a href={`tel:${String(l.telephone).replace(/\s/g, "")}`} className="font-semibold underline">{String(l.telephone)}</a> : null}
              {l.site ? <span>Site : {String(l.site)}</span> : null}
            </div>
            {l.projet ? <p className="mt-4 font-bold">{String(l.projet)}</p> : null}
            {l.message ? <p className="mt-2 whitespace-pre-wrap text-[0.92rem] leading-relaxed">{String(l.message)}</p> : null}
          </section>

          <Carte titre="Parcours complet" aide={data.sessions.length ? `${data.sessions.length} visite(s) connue(s) de cette personne, de la plus ancienne à la plus récente.` : "Demande importée ou saisie : pas de parcours mesuré."}>
            <Chronologie sessions={data.sessions} evenements={data.evenements} />
            {!data.sessions.length && contexte.parcours ? <p className="text-[0.85rem]">Parcours joint à l&apos;email : {String(contexte.parcours)}</p> : null}
          </Carte>
        </div>

        <div className="grid gap-5 self-start">
          <Carte titre="Suivi commercial">
            <div className="grid gap-3">
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(STATUTS).map(([k, v]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => maj({ statut: k })}
                    className={`rounded-full px-3 py-1 text-[0.8rem] font-bold transition-opacity ${l.statut === k ? v.cls : "bg-kinome-black/[0.05] text-kinome-grey hover:text-kinome-black"}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <label className="text-[0.85rem] font-semibold">
                Valeur estimée (€ HT)
                <input
                  key={`v${String(l.valeur)}`}
                  type="number"
                  min={0}
                  step={100}
                  defaultValue={l.valeur == null ? "" : String(l.valeur)}
                  onBlur={(e) => maj({ valeur: e.target.value === "" ? null : Number(e.target.value) })}
                  className={`${champCls} mt-1`}
                />
              </label>
              <label className="text-[0.85rem] font-semibold">
                Origine déclarée
                <input
                  key={`o${String(l.origine_declaree)}`}
                  list="origines"
                  defaultValue={String(l.origine_declaree ?? "")}
                  onBlur={(e) => e.target.value !== String(l.origine_declaree ?? "") && maj({ origine_declaree: e.target.value })}
                  className={`${champCls} mt-1`}
                  placeholder="Ce que le prospect vous a dit"
                />
                <datalist id="origines">
                  {ORIGINES.map((o) => (
                    <option key={o} value={o} />
                  ))}
                </datalist>
              </label>
              <label className="text-[0.85rem] font-semibold">
                Notes
                <textarea
                  key={`n${String(l.maj)}`}
                  rows={6}
                  defaultValue={String(l.notes ?? "")}
                  onBlur={(e) => e.target.value !== String(l.notes ?? "") && maj({ notes: e.target.value })}
                  className={`${champCls} mt-1`}
                  placeholder="Compte rendu d'appel, budget, prochaine étape…"
                />
              </label>
              <p className="text-[0.78rem] text-kinome-grey">{enreg || (l.maj ? `Modifiée ${ilya(l.maj as number)}` : "Les champs s'enregistrent en quittant la zone.")}</p>
            </div>
          </Carte>

          <Carte titre="Provenance">
            <dl className="grid gap-2.5 text-[0.88rem]">
              <Ligne2 t="Déclarée par le prospect">{l.origine_declaree ? <strong>{String(l.origine_declaree)}</strong> : <span className="text-kinome-grey">non renseignée</span>}</Ligne2>
              <Ligne2 t="Visite de la demande"><Canal canal={l.canal as string} source={l.source as string} /></Ligne2>
              <Ligne2 t="Tout premier contact">
                <Canal canal={l.premier_canal as string} source={l.premiere_source as string} />
                {l.premiere_visite ? <span className="text-kinome-grey"> · {date(l.premiere_visite as number)}</span> : null}
              </Ligne2>
              <Ligne2 t="Visites avant la demande">{nb(l.nb_visites as number)}</Ligne2>
              {contexte.appareil ? <Ligne2 t="Appareil">{String(contexte.appareil)}</Ligne2> : null}
              {contexte.duree_totale ? <Ligne2 t="Durée de la visite">{String(contexte.duree_totale)}</Ligne2> : null}
            </dl>
            {!l.visiteur && l.session ? (
              <p className="mt-3 text-[0.78rem] text-kinome-grey">
                Ce visiteur n&apos;a pas accepté la mesure : seule la visite de la demande est connue. L&apos;origine déclarée fait foi.
              </p>
            ) : null}
          </Carte>
        </div>
      </div>
    </div>
  );
}

function Ligne2({ t, children }: { t: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[150px_1fr] gap-3">
      <dt className="text-kinome-grey">{t}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Chronologie({ sessions, evenements }: { sessions: Ligne[]; evenements: Ligne[] }) {
  return (
    <ol className="grid gap-5">
      {sessions.map((s, i) => {
        const evts = evenements.filter((e) => e.session === s.id);
        return (
          <li key={String(s.id)} className="relative border-l-2 border-[#e7e3da] pl-4">
            <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-kinome-black" />
            <p className="text-[0.85rem] font-bold">
              Visite {i + 1} · {date(s.debut as number)} · {duree((Number(s.fin) - Number(s.debut)) / 1000)}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.8rem] text-kinome-grey">
              <Canal canal={s.canal as string} source={s.source as string} />
              <span>{String(s.appareil ?? "")} · {String(s.navigateur ?? "")} · {String(s.os ?? "")}</span>
              {s.referrer ? <span className="break-all">depuis {String(s.referrer)}</span> : null}
            </p>
            <ul className="mt-2 grid gap-1">
              {evts.map((e, j) => {
                const d = decrire(String(e.type), e.chemin as string | null, e.donnees as string | null);
                const fort = ["lead", "formulaire", "clic", "copie", "chatbot", "jaime", "media"].includes(String(e.type));
                return (
                  <li key={j} className={`grid grid-cols-[52px_18px_1fr] gap-1 text-[0.82rem] ${e.type === "lead" ? "font-bold text-kinome-accent" : fort ? "" : "text-kinome-grey"}`}>
                    <span className="tabular-nums text-kinome-grey">{new Date(Number(e.date)).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                    <span aria-hidden="true">{d.icone}</span>
                    <span className="break-words">{d.texte}</span>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

// --- Visites --------------------------------------------------------------------
function ListeSessions({ jours, onOuvrir, onDeconnecte }: { jours: number; onOuvrir: (id: string) => void; onDeconnecte: () => void }) {
  const [canal, setCanal] = useState("");
  const { data, erreur } = useApi<{ sessions: Ligne[] }>("sessions", { j: jours, canal }, onDeconnecte);
  if (erreur) return <p className="text-[#b91c1c]">{erreur}</p>;
  if (!data) return <p className="text-kinome-grey">Chargement…</p>;
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {["", "IA", "Google", "Direct", "Réseaux sociaux", "Site référent", "Autres moteurs", "Publicité", "Email", "Campagne"].map((c) => (
          <button key={c || "tous"} type="button" onClick={() => setCanal(c)} className={`rounded-full px-3 py-1.5 text-[0.82rem] font-semibold ${canal === c ? "bg-kinome-black text-white" : "border border-[#e7e3da] bg-white hover:border-kinome-black"}`}>
            {c || "Tous les canaux"}
          </button>
        ))}
      </div>
      <p className="text-[0.85rem] text-kinome-grey">{data.sessions.length} visite(s), les 300 plus récentes au maximum</p>
      <div className="overflow-x-auto rounded-2xl border border-[#e7e3da] bg-white">
        <table className="w-full text-left text-[0.85rem]">
          <thead className="text-[0.75rem] text-kinome-grey">
            <tr>
              {["Début", "Canal", "Page d'arrivée", "Pages", "Durée", "Appareil", "Visite n°", ""].map((h) => (
                <th key={h} className="px-3 py-2.5 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.sessions.map((s) => (
              <tr key={String(s.id)} onClick={() => onOuvrir(String(s.id))} className="cursor-pointer border-t border-[#e7e3da] hover:bg-kinome-black/[0.03]">
                <td className="whitespace-nowrap px-3 py-2">{date(s.debut as number)}</td>
                <td className="px-3 py-2"><Canal canal={s.canal as string} source={s.source as string} /></td>
                <td className="px-3 py-2">{String(s.atterrissage ?? "")}</td>
                <td className="px-3 py-2 tabular-nums">{String(s.pages)}</td>
                <td className="whitespace-nowrap px-3 py-2">{duree((Number(s.fin) - Number(s.debut)) / 1000)}</td>
                <td className="px-3 py-2">{String(s.appareil ?? "")}</td>
                <td className="px-3 py-2">{s.visite_n ? String(s.visite_n) : ""}</td>
                <td className="px-3 py-2">{s.lead_id ? <span className="rounded-full bg-kinome-accent px-2 py-0.5 text-[0.72rem] font-bold text-white">Demande</span> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.sessions.length && <p className="p-5 text-[0.9rem] text-kinome-grey">Aucune visite mesurée sur la période.</p>}
      </div>
    </div>
  );
}

function FicheSession({ id, onRetour, onLead }: { id: string; onRetour: () => void; onLead: (id: number) => void }) {
  const [data, setData] = useState<{ session: Ligne; autres: Ligne[]; evenements: Ligne[] } | null>(null);
  useEffect(() => {
    api<{ session: Ligne; autres: Ligne[]; evenements: Ligne[] }>("session", { id }).then(setData).catch(() => setData(null));
  }, [id]);
  if (!data) return <p className="text-kinome-grey">Chargement…</p>;
  const s = data.session;
  return (
    <div className="grid gap-5">
      <button type="button" onClick={onRetour} className="justify-self-start text-[0.88rem] font-semibold text-kinome-grey hover:text-kinome-black">
        ← Toutes les visites
      </button>
      <Carte titre={`Visite du ${date(s.debut as number)}`} aide={data.autres.length ? `Ce visiteur est venu ${data.autres.length + 1} fois.` : undefined}>
        {s.lead_id ? (
          <button type="button" onClick={() => onLead(Number(s.lead_id))} className="mb-4 rounded-full bg-kinome-accent px-4 py-1.5 text-[0.85rem] font-bold text-white">
            Voir la demande envoyée →
          </button>
        ) : null}
        <Chronologie sessions={[s]} evenements={data.evenements.map((e) => ({ ...e, session: s.id }))} />
      </Carte>
    </div>
  );
}

// --- Réglages -------------------------------------------------------------------
function Reglages() {
  const [ignore, setIgnore] = useState(true);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    try {
      setIgnore(window.localStorage.getItem("kn-ignorer") === "1");
    } catch {
      setIgnore(false);
    }
  }, []);
  function basculer() {
    try {
      if (ignore) window.localStorage.removeItem("kn-ignorer");
      else window.localStorage.setItem("kn-ignorer", "1");
      setIgnore(!ignore);
    } catch {
      // stockage indisponible
    }
  }
  async function changer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      await api("motdepasse", {}, { actuel: f.get("actuel"), nouveau: f.get("nouveau") });
      setMsg("Mot de passe changé. Les autres appareils sont déconnectés.");
      e.currentTarget.reset();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erreur");
    }
  }
  return (
    <div className="grid max-w-2xl gap-5">
      <Carte titre="Ne pas compter cet appareil" aide="Vos propres visites du site faussent les chiffres. Activé automatiquement dès que vous ouvrez le tableau de bord sur un navigateur.">
        <button type="button" onClick={basculer} className={boutonCls}>
          {ignore ? "Cet appareil est exclu ✓ (cliquer pour le recompter)" : "Exclure cet appareil"}
        </button>
      </Carte>
      <Carte titre="Changer le mot de passe">
        <form onSubmit={changer} className="grid gap-3">
          <input name="actuel" type="password" required placeholder="Mot de passe actuel" autoComplete="current-password" className={champCls} />
          <input name="nouveau" type="password" required minLength={12} placeholder="Nouveau mot de passe (12 caractères minimum)" autoComplete="new-password" className={champCls} />
          <div>
            <button type="submit" className={boutonCls}>
              Changer
            </button>
            {msg && <span className="ml-3 text-[0.85rem]">{msg}</span>}
          </div>
        </form>
      </Carte>
      <Carte titre="Ce qui est mesuré, et combien de temps">
        <ul className="grid list-disc gap-1.5 pl-5 text-[0.88rem] leading-relaxed">
          <li>Sans consentement : chaque visite isolée (pages, lecture, clics, formulaires), sans cookie, sans IP, sans lien entre deux visites.</li>
          <li>Avec « Tout accepter » : un identifiant de visiteur de 13 mois relie ses visites, d&apos;où le « tout premier contact » des demandes.</li>
          <li>Visites et événements effacés automatiquement après 25 mois. Les demandes restent jusqu&apos;à suppression.</li>
          <li>Vos visites (cet appareil) et les robots ne sont pas comptés.</li>
        </ul>
      </Carte>
    </div>
  );
}
