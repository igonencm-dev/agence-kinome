"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Carte, STATUTS, chf, date, ilya } from "../admin/Blocs";

// CRM de prospection d'agence-kinome.ch (04/11/2026), à deux : Mathias et
// Tanguy. Les demandes du site et du chatbot arrivent seules, le reste se
// saisit à la main ; chaque fiche a un responsable, une étape, une prochaine
// action datée, un fil de suivi signé et ses PDF. Mêmes données et même
// connexion que /admin/ (/api/admin.php, cookie HttpOnly limité à /api/).
// Rien n'est indexé ni suivi sur cette page (HorsAdmin).

const API = "/api/admin.php";

type Ligne = Record<string, unknown>;
type Moi = { nom: string; identifiant: string | null; compte: number | null };

const ETAPES = ["nouveau", "contacte", "rdv", "devis", "gagne", "perdu"] as const;
const LIBELLES: Record<string, string> = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  rdv: "Rendez-vous",
  devis: "Devis envoyé",
  gagne: "Gagné",
  perdu: "Perdu",
  spam: "Spam",
};
const ORIGINES = [
  "Réseau, rencontre",
  "CCI France Suisse",
  "Recommandation",
  "Client existant",
  "ChatGPT ou une autre IA",
  "Recherche Google",
  "Réseaux sociaux",
  "Appel entrant",
  "Salon ou événement",
  "Autre",
];

const champCls = "w-full rounded-xl border border-[#e7e3da] bg-white px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-kinome-black";
const boutonCls = "rounded-full bg-kinome-black px-5 py-2.5 text-[0.88rem] font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50";
const bouton2Cls = "rounded-full border border-[#e7e3da] bg-white px-4 py-2 text-[0.85rem] font-semibold hover:border-kinome-black disabled:opacity-50";

class NonConnecte extends Error {}

async function lire(res: Response) {
  if (res.status === 401) {
    const j = await res.json().catch(() => ({}));
    if (j.erreur === "non_connecte") throw new NonConnecte();
    throw new Error(j.erreur || "Accès refusé");
  }
  const json = await res.json().catch(() => ({ ok: false, erreur: `Erreur ${res.status}` }));
  if (!json.ok) throw new Error(json.erreur || `Erreur ${res.status}`);
  return json;
}

async function api<T = Ligne>(action: string, params: Record<string, string | number> = {}, corps?: unknown): Promise<T> {
  const qs = new URLSearchParams({ a: action, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  const res = await fetch(`${API}?${qs}`, {
    method: corps === undefined ? "GET" : "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: corps === undefined ? {} : { "Content-Type": "application/json", "X-KN": "1" },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  return (await lire(res)) as T;
}

async function joindrePdf(id: number, fichier: File) {
  const corps = new FormData();
  corps.append("id", String(id));
  corps.append("fichier", fichier);
  const res = await fetch(`${API}?a=fichier`, { method: "POST", credentials: "same-origin", headers: { "X-KN": "1" }, body: corps });
  return lire(res);
}

// Jour au format AAAA-MM-JJ (heure locale) pour les champs date
function jourIso(ms: unknown): string {
  if (!ms) return "";
  const d = new Date(Number(ms));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Retard de la prochaine action : -1 en retard, 0 aujourd'hui, 1 plus tard, null sans date. */
function echeance(ms: unknown, auj: string): -1 | 0 | 1 | null {
  if (!ms) return null;
  const j = jourIso(ms);
  return j < auj ? -1 : j === auj ? 0 : 1;
}

// Date du jour figée au premier rendu (une fonction de rendu doit rester pure)
function useJour(decalageJours = 0): string {
  const [j] = useState(() => jourIso(Date.now() + decalageJours * 86400000));
  return j;
}

function titre(l: Ligne): string {
  return String(l.entreprise || l.nom || l.email || l.telephone || "Sans nom");
}

function Pastille({ statut }: { statut: string }) {
  const st = STATUTS[statut] ?? STATUTS.nouveau;
  return <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[0.72rem] font-bold ${st.cls}`}>{LIBELLES[statut] ?? st.label}</span>;
}

function Initiale({ nom }: { nom: unknown }) {
  if (!nom) return <span className="text-[0.75rem] text-kinome-grey">Sans responsable</span>;
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-kinome-black text-[0.65rem] font-bold text-white">{String(nom).slice(0, 1).toUpperCase()}</span>
      {String(nom)}
    </span>
  );
}

function Echeance({ action, ms }: { action: unknown; ms: unknown }) {
  const auj = useJour();
  if (!action && !ms) return null;
  const e = echeance(ms, auj);
  const cls = e === -1 ? "bg-[#fde8e6] text-[#b91c1c]" : e === 0 ? "bg-[#fdf3d7] text-[#8a5a00]" : "bg-kinome-black/[0.05] text-kinome-black";
  return (
    <span className={`inline-block rounded-lg px-2 py-0.5 text-[0.75rem] font-semibold ${cls}`}>
      {e === -1 ? "En retard · " : e === 0 ? "Aujourd'hui · " : ""}
      {String(action ?? "Relance")}
      {ms ? ` · ${new Date(Number(ms)).toLocaleDateString("fr-CH", { day: "numeric", month: "short" })}` : ""}
    </span>
  );
}

// ---------------------------------------------------------------------------
export default function Crm() {
  const [etat, setEtat] = useState<"verif" | "connexion" | "ok">("verif");
  const [moi, setMoi] = useState<Moi | null>(null);
  const [equipe, setEquipe] = useState<string[]>([]);
  const [vue, setVue] = useState<"colonnes" | "liste" | "relances" | "reglages">("colonnes");
  const [fiche, setFiche] = useState<number | null>(null);
  const [creation, setCreation] = useState(false);

  const charger = useCallback(() => {
    api<{ moi: Moi; equipe: string[] }>("moi")
      .then((r) => {
        setMoi(r.moi);
        setEquipe(r.equipe);
        setEtat("ok");
      })
      .catch(() => setEtat("connexion"));
  }, []);

  useEffect(() => {
    // L'appareil de l'équipe n'est jamais compté dans les visites du site
    try {
      window.localStorage.setItem("kn-ignorer", "1");
    } catch {
      // stockage indisponible
    }
    charger();
    const lireAncre = () => {
      const m = window.location.hash.match(/^#lead-(\d+)$/);
      setFiche(m ? Number(m[1]) : null);
    };
    lireAncre();
    window.addEventListener("hashchange", lireAncre);
    return () => window.removeEventListener("hashchange", lireAncre);
  }, [charger]);

  const ouvrir = useCallback((id: number | null) => {
    if (id === null) {
      history.replaceState(null, "", window.location.pathname);
      setFiche(null);
    } else {
      window.location.hash = `lead-${id}`;
      setFiche(id);
    }
  }, []);

  const deconnecte = useCallback(() => setEtat("connexion"), []);

  async function seDeconnecter() {
    await api("deconnexion", {}, {}).catch(() => undefined);
    setEtat("connexion");
  }

  if (etat === "verif") return <div className="min-h-screen bg-kinome-cream" />;
  if (etat === "connexion") return <Connexion onOk={charger} />;

  return (
    <div className="min-h-screen bg-kinome-cream text-kinome-black">
      <header className="sticky top-0 z-30 border-b border-[#e7e3da] bg-kinome-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="font-heading text-[1.35rem] font-semibold tracking-tight">Kinome</span>
            <span className="rounded-full bg-kinome-accent px-2.5 py-0.5 text-[0.72rem] font-bold text-white">CRM</span>
          </div>
          <nav className="flex flex-wrap gap-1" aria-label="Vues">
            {(
              [
                ["colonnes", "Prospects"],
                ["relances", "À relancer"],
                ["reglages", "Réglages"],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setVue(v);
                  ouvrir(null);
                }}
                className={`rounded-full px-3.5 py-1.5 text-[0.86rem] font-semibold ${(vue === v || (v === "colonnes" && vue === "liste")) && fiche === null ? "bg-kinome-black text-white" : "hover:bg-kinome-black/5"}`}
              >
                {l}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex flex-wrap items-center gap-3 text-[0.82rem]">
            <span className="text-kinome-grey">
              Connecté : <strong className="text-kinome-black">{moi?.nom}</strong>
            </span>
            <a href="/admin/" className="font-semibold underline-offset-4 hover:underline">
              Tableau de bord
            </a>
            <button type="button" onClick={seDeconnecter} className="font-semibold text-kinome-grey hover:text-kinome-black">
              Se déconnecter
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6">
        {fiche !== null ? (
          <Fiche id={fiche} equipe={equipe} onRetour={() => ouvrir(null)} onDeconnecte={deconnecte} />
        ) : vue === "reglages" ? (
          <Reglages moi={moi} onDeconnecte={deconnecte} onEquipe={charger} />
        ) : (
          <Prospects
            vue={vue}
            setVue={setVue}
            moi={moi}
            equipe={equipe}
            onOuvrir={ouvrir}
            onCreer={() => setCreation(true)}
            onDeconnecte={deconnecte}
          />
        )}
      </main>

      {creation && (
        <Creation
          moi={moi}
          equipe={equipe}
          onFermer={() => setCreation(false)}
          onCree={(id) => {
            setCreation(false);
            ouvrir(id);
          }}
        />
      )}
    </div>
  );
}

function Connexion({ onOk }: { onOk: () => void }) {
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  async function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    const f = new FormData(e.currentTarget);
    try {
      const identifiant = String(f.get("identifiant") ?? "").trim();
      await api("connexion", {}, { identifiant: identifiant || undefined, motdepasse: f.get("motdepasse") });
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
        <span className="font-heading text-[1.6rem] font-semibold tracking-tight">Kinome</span>
        <h1 className="font-heading mt-6 text-2xl font-extrabold tracking-tight">CRM de prospection</h1>
        <label htmlFor="identifiant" className="mt-6 block text-[0.88rem] font-semibold">
          Identifiant
        </label>
        <input id="identifiant" name="identifiant" autoComplete="username" autoCapitalize="none" placeholder="mathias ou tanguy" className={`${champCls} mt-1.5`} />
        <label htmlFor="motdepasse" className="mt-4 block text-[0.88rem] font-semibold">
          Mot de passe
        </label>
        <input id="motdepasse" name="motdepasse" type="password" required autoComplete="current-password" className={`${champCls} mt-1.5`} />
        <p className="mt-2 text-[0.75rem] text-kinome-grey">Sans identifiant : mot de passe commun du tableau de bord.</p>
        {erreur && <p className="mt-3 text-[0.85rem] text-[#b91c1c]">{erreur}</p>}
        <button type="submit" disabled={envoi} className={`${boutonCls} mt-5 w-full`}>
          {envoi ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

// --- Liste des prospects : colonnes par étape, liste, relances -------------------
function useProspects(onDeconnecte: () => void) {
  const [leads, setLeads] = useState<Ligne[] | null>(null);
  const [erreur, setErreur] = useState("");
  const recharger = useCallback(() => {
    api<{ leads: Ligne[] }>("crm")
      .then((r) => setLeads(r.leads))
      .catch((e) => {
        if (e instanceof NonConnecte) onDeconnecte();
        else setErreur(e.message);
      });
  }, [onDeconnecte]);
  useEffect(() => {
    recharger();
  }, [recharger]);
  return { leads, setLeads, erreur, recharger };
}

function Prospects({
  vue,
  setVue,
  moi,
  equipe,
  onOuvrir,
  onCreer,
  onDeconnecte,
}: {
  vue: "colonnes" | "liste" | "relances";
  setVue: (v: "colonnes" | "liste") => void;
  moi: Moi | null;
  equipe: string[];
  onOuvrir: (id: number) => void;
  onCreer: () => void;
  onDeconnecte: () => void;
}) {
  const { leads, setLeads, erreur, recharger } = useProspects(onDeconnecte);
  const [recherche, setRecherche] = useState("");
  const [qui, setQui] = useState("tous");
  const [alerte, setAlerte] = useState("");

  // Glisser-déposer entre colonnes : la carte change de colonne tout de suite,
  // l'étape s'enregistre (et s'écrit dans le fil) ; en cas d'échec, retour en arrière.
  const deplacer = useCallback(
    (id: number, statut: string) => {
      const avant = leads;
      const l = (avant ?? []).find((x) => Number(x.id) === id);
      if (!l || l.statut === statut) return;
      setAlerte("");
      setLeads((ls) => (ls ?? []).map((x) => (Number(x.id) === id ? { ...x, statut } : x)));
      api("maj", {}, { id, statut })
        .then(() => recharger())
        .catch((e) => {
          if (e instanceof NonConnecte) return onDeconnecte();
          setLeads(avant);
          setAlerte(`Étape non enregistrée : ${e.message}`);
        });
    },
    [leads, setLeads, recharger, onDeconnecte],
  );

  const filtres = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return (leads ?? []).filter((l) => {
      const resp = String(l.responsable ?? "").toLowerCase();
      if (qui === "moi" && resp !== String(moi?.nom ?? "").toLowerCase()) return false;
      if (qui === "aucun" && resp) return false;
      if (!["tous", "moi", "aucun"].includes(qui) && resp !== qui.toLowerCase()) return false;
      if (q && ![l.nom, l.entreprise, l.email, l.projet, l.extrait, l.dernier_suivi].some((v) => String(v ?? "").toLowerCase().includes(q))) return false;
      return true;
    });
  }, [leads, recherche, qui, moi]);

  if (erreur) return <p className="text-[#b91c1c]">{erreur}</p>;
  if (!leads) return <p className="text-kinome-grey">Chargement…</p>;

  const actifs = filtres.filter((l) => !["gagne", "perdu", "spam"].includes(String(l.statut)));
  const enJeu = actifs.reduce((s, l) => s + Number(l.valeur ?? 0), 0);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher une entreprise, un nom, un mot du fil…" className={`${champCls} max-w-sm`} />
        <select value={qui} onChange={(e) => setQui(e.target.value)} className="rounded-full border border-[#e7e3da] bg-white px-3 py-2 text-[0.85rem] font-semibold" aria-label="Responsable">
          <option value="tous">Tous les responsables</option>
          {moi?.compte !== null && <option value="moi">Mes prospects</option>}
          {equipe.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value="aucun">Sans responsable</option>
        </select>
        {vue !== "relances" && (
          <div className="flex rounded-full border border-[#e7e3da] bg-white p-0.5 text-[0.82rem] font-semibold">
            {(
              [
                ["colonnes", "Colonnes"],
                ["liste", "Liste"],
              ] as const
            ).map(([v, l]) => (
              <button key={v} type="button" onClick={() => setVue(v)} className={`rounded-full px-3 py-1.5 ${vue === v ? "bg-kinome-black text-white" : ""}`}>
                {l}
              </button>
            ))}
          </div>
        )}
        <button type="button" onClick={onCreer} className={`${boutonCls} ml-auto`}>
          + Nouveau prospect
        </button>
      </div>
      <p className="text-[0.85rem] text-kinome-grey">
        {actifs.length} prospect{actifs.length > 1 ? "s" : ""} en cours
        {enJeu ? ` · ${chf(enJeu)} en jeu` : ""} · {filtres.filter((l) => l.statut === "gagne").length} gagné(s)
        {vue === "colonnes" && <span className="hidden md:inline"> · glissez une carte d&apos;une colonne à l&apos;autre pour changer d&apos;étape</span>}
      </p>
      {alerte && <p className="text-[0.85rem] text-[#b91c1c]">{alerte}</p>}

      {vue === "colonnes" && <Colonnes leads={filtres} onOuvrir={onOuvrir} onDeplacer={deplacer} />}
      {vue === "liste" && <Liste leads={filtres} onOuvrir={onOuvrir} />}
      {vue === "relances" && <Relances leads={actifs} onOuvrir={onOuvrir} />}
    </div>
  );
}

function CarteProspect({ l, onOuvrir, onGlisser, glissee }: { l: Ligne; onOuvrir: (id: number) => void; onGlisser?: (id: number | null) => void; glissee?: boolean }) {
  const id = Number(l.id);
  return (
    <div
      role="button"
      tabIndex={0}
      draggable={Boolean(onGlisser)}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", String(id));
        e.dataTransfer.effectAllowed = "move";
        onGlisser?.(id);
      }}
      onDragEnd={() => onGlisser?.(null)}
      onClick={() => onOuvrir(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOuvrir(id);
        }
      }}
      className={`grid w-full gap-1.5 rounded-xl border border-[#e7e3da] bg-white p-3 text-left transition-shadow hover:shadow-md ${onGlisser ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"} ${glissee ? "opacity-40" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <strong className="text-[0.92rem] leading-snug">{titre(l)}</strong>
        {l.valeur ? <span className="whitespace-nowrap text-[0.8rem] font-semibold">{chf(l.valeur as number)}</span> : null}
      </div>
      {l.entreprise && l.nom ? <span className="text-[0.8rem] text-kinome-grey">{String(l.nom)}</span> : null}
      {l.projet ? <span className="line-clamp-2 text-[0.8rem]">{String(l.projet)}</span> : null}
      <Echeance action={l.prochaine_action} ms={l.prochaine_date} />
      {l.dernier_suivi ? (
        <span className="line-clamp-2 text-[0.76rem] text-kinome-grey">
          {String(l.dernier_suivi)} · {ilya(l.dernier_suivi_date as number)}
        </span>
      ) : null}
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <Initiale nom={l.responsable} />
        <span className="text-[0.72rem] text-kinome-grey">
          {l.formulaire === "chatbot" ? "Chatbot" : l.formulaire === "contact" ? "Site" : ""}
          {Number(l.nb_fichiers) ? ` · ${l.nb_fichiers} PDF` : ""}
        </span>
      </div>
    </div>
  );
}

function Colonnes({ leads, onOuvrir, onDeplacer }: { leads: Ligne[]; onOuvrir: (id: number) => void; onDeplacer: (id: number, statut: string) => void }) {
  const [glisse, setGlisse] = useState<number | null>(null);
  const [survol, setSurvol] = useState<string | null>(null);
  const glisser = (id: number | null) => {
    setGlisse(id);
    if (id === null) setSurvol(null);
  };
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2">
      <div className="grid min-w-[1150px] grid-cols-6 gap-3">
        {ETAPES.map((k) => {
          const col = leads.filter((l) => l.statut === k);
          const total = col.reduce((s, l) => s + Number(l.valeur ?? 0), 0);
          return (
            <section
              key={k}
              aria-label={LIBELLES[k]}
              onDragOver={(e) => {
                if (glisse === null) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (survol !== k) setSurvol(k);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSurvol((s) => (s === k ? null : s));
              }}
              onDrop={(e) => {
                e.preventDefault();
                const id = Number(e.dataTransfer.getData("text/plain"));
                glisser(null);
                if (id) onDeplacer(id, k);
              }}
              className={`grid content-start gap-2 rounded-2xl p-2.5 transition-colors ${survol === k ? "bg-kinome-accent/10 ring-2 ring-kinome-accent/40" : "bg-kinome-black/[0.035]"}`}
            >
              <div className="flex items-baseline justify-between px-1">
                <h2 className="text-[0.85rem] font-bold">
                  {LIBELLES[k]} <span className="font-normal text-kinome-grey">{col.length}</span>
                </h2>
                {total ? <span className="text-[0.75rem] text-kinome-grey">{chf(total)}</span> : null}
              </div>
              {col.map((l) => (
                <CarteProspect key={String(l.id)} l={l} onOuvrir={onOuvrir} onGlisser={glisser} glissee={glisse === Number(l.id)} />
              ))}
              {!col.length && <p className="px-1 py-3 text-[0.78rem] text-kinome-grey">Aucun prospect</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Liste({ leads, onOuvrir }: { leads: Ligne[]; onOuvrir: (id: number) => void }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e7e3da] bg-white">
      <table className="w-full min-w-[900px] text-left text-[0.86rem]">
        <thead className="text-[0.75rem] text-kinome-grey">
          <tr>
            {["Prospect", "Étape", "Responsable", "Prochaine action", "Montant", "Dernière nouvelle"].map((h) => (
              <th key={h} className="px-3 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={String(l.id)} onClick={() => onOuvrir(Number(l.id))} className="cursor-pointer border-t border-[#e7e3da] align-top hover:bg-kinome-black/[0.03]">
              <td className="px-3 py-2.5">
                <strong>{titre(l)}</strong>
                {l.entreprise && l.nom ? <div className="text-[0.78rem] text-kinome-grey">{String(l.nom)}</div> : null}
              </td>
              <td className="px-3 py-2.5">
                <Pastille statut={String(l.statut)} />
              </td>
              <td className="px-3 py-2.5">
                <Initiale nom={l.responsable} />
              </td>
              <td className="min-w-[190px] px-3 py-2.5">
                <Echeance action={l.prochaine_action} ms={l.prochaine_date} />
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-right">{chf(l.valeur as number | null)}</td>
              <td className="max-w-[320px] px-3 py-2.5">
                <span className="line-clamp-2 text-[0.8rem]">{String(l.dernier_suivi ?? "")}</span>
                <span className="text-[0.72rem] text-kinome-grey">{ilya((l.dernier_suivi_date ?? l.date) as number)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!leads.length && <p className="p-5 text-[0.9rem] text-kinome-grey">Aucun prospect pour ces filtres.</p>}
    </div>
  );
}

function Relances({ leads, onOuvrir }: { leads: Ligne[]; onOuvrir: (id: number) => void }) {
  const auj = useJour();
  const dans7 = useJour(7);
  const tries = [...leads].sort((a, b) => Number(a.prochaine_date ?? Infinity) - Number(b.prochaine_date ?? Infinity));
  const groupes: [string, Ligne[]][] = [
    ["En retard", tries.filter((l) => echeance(l.prochaine_date, auj) === -1)],
    ["Aujourd'hui", tries.filter((l) => echeance(l.prochaine_date, auj) === 0)],
    ["Dans les 7 jours", tries.filter((l) => echeance(l.prochaine_date, auj) === 1 && jourIso(l.prochaine_date) <= dans7)],
    ["Plus tard", tries.filter((l) => echeance(l.prochaine_date, auj) === 1 && jourIso(l.prochaine_date) > dans7)],
    ["À dater", tries.filter((l) => !l.prochaine_date && l.prochaine_action)],
    ["Sans prochaine action", tries.filter((l) => !l.prochaine_date && !l.prochaine_action)],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {groupes.map(([g, ls]) => (
        <Carte key={g} titre={`${g} (${ls.length})`}>
          <div className="grid gap-2">
            {ls.map((l) => (
              <button key={String(l.id)} type="button" onClick={() => onOuvrir(Number(l.id))} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e7e3da] p-3 text-left hover:border-kinome-black">
                <span>
                  <strong>{titre(l)}</strong> <Pastille statut={String(l.statut)} />
                  <span className="mt-1 block">
                    <Echeance action={l.prochaine_action} ms={l.prochaine_date} />
                  </span>
                </span>
                <Initiale nom={l.responsable} />
              </button>
            ))}
            {!ls.length && <p className="text-[0.85rem] text-kinome-grey">Rien ici.</p>}
          </div>
        </Carte>
      ))}
    </div>
  );
}

// --- Nouveau prospect -----------------------------------------------------------
function Creation({ moi, equipe, onFermer, onCree }: { moi: Moi | null; equipe: string[]; onFermer: () => void; onCree: (id: number) => void }) {
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  async function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await api<{ id: number }>("ajout", {}, f);
      onCree(r.id);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur");
      setEnvoi(false);
    }
  }
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-kinome-black/40 p-4" onClick={onFermer}>
      <form onSubmit={valider} onClick={(e) => e.stopPropagation()} className="grid max-h-[92vh] w-full max-w-2xl gap-3 overflow-y-auto rounded-3xl bg-white p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="font-heading text-xl font-extrabold">Nouveau prospect</h2>
          <p className="text-[0.82rem] text-kinome-grey">Une entreprise ou un nom suffit ; le reste se complète dans la fiche.</p>
        </div>
        <input name="entreprise" placeholder="Entreprise" autoFocus className={champCls} />
        <input name="nom" placeholder="Personne de contact" className={champCls} />
        <input name="email" type="email" placeholder="E-mail" className={champCls} />
        <input name="telephone" placeholder="Téléphone" className={champCls} />
        <input name="projet" placeholder="Projet (site, identité, campagne…)" className={`${champCls} md:col-span-2`} />
        <select name="origine" className={champCls} defaultValue="">
          <option value="">D&apos;où vient le contact ?</option>
          {ORIGINES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select name="responsable" className={champCls} defaultValue={moi?.compte !== null ? moi?.nom : ""}>
          <option value="">Responsable…</option>
          {equipe.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        <select name="statut" className={champCls} defaultValue="nouveau">
          {ETAPES.map((k) => (
            <option key={k} value={k}>
              {LIBELLES[k]}
            </option>
          ))}
        </select>
        <input name="valeur" type="number" min={0} step={100} placeholder="Montant estimé (CHF HT)" className={champCls} />
        <input name="prochaine_action" placeholder="Prochaine action (rappeler, envoyer le devis…)" className={champCls} />
        <input name="prochaine_date" type="date" className={champCls} aria-label="Date de la prochaine action" />
        <textarea name="note" rows={3} placeholder="Où ça en est : premier message du fil" className={`${champCls} md:col-span-2`} />
        <div className="flex items-center gap-3 md:col-span-2">
          <button type="submit" disabled={envoi} className={boutonCls}>
            {envoi ? "Création…" : "Créer la fiche"}
          </button>
          <button type="button" onClick={onFermer} className={bouton2Cls}>
            Annuler
          </button>
          {erreur && <span className="text-[0.85rem] text-[#b91c1c]">{erreur}</span>}
        </div>
      </form>
    </div>
  );
}

// --- Fiche d'un prospect ----------------------------------------------------------
type Detail = { lead: Ligne; sessions: Ligne[]; suivis: Ligne[]; fichiers: Ligne[] };

const ICONES: Record<string, string> = { note: "✎", statut: "→", creation: "★", fichier: "📎", action: "⏰", responsable: "👤", montant: "CHF" };

function Fiche({ id, equipe, onRetour, onDeconnecte }: { id: number; equipe: string[]; onRetour: () => void; onDeconnecte: () => void }) {
  const [data, setData] = useState<Detail | null>(null);
  const [erreur, setErreur] = useState("");
  const [msg, setMsg] = useState("");
  const [note, setNote] = useState("");
  const [envoiPdf, setEnvoiPdf] = useState(false);

  const recharger = useCallback(() => {
    api<Detail>("lead", { id })
      .then(setData)
      .catch((e) => {
        if (e instanceof NonConnecte) onDeconnecte();
        else setErreur(e.message);
      });
  }, [id, onDeconnecte]);
  useEffect(() => {
    recharger();
  }, [recharger]);

  async function maj(champs: Record<string, unknown>) {
    setMsg("Enregistrement…");
    try {
      await api("maj", {}, { id, ...champs });
      setMsg("Enregistré ✓");
      recharger();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur");
    }
  }

  async function noter() {
    if (!note.trim()) return;
    try {
      await api("note", {}, { id, texte: note });
      setNote("");
      recharger();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur");
    }
  }

  async function envoyerPdf(f: File | undefined) {
    if (!f) return;
    setEnvoiPdf(true);
    setMsg("");
    try {
      await joindrePdf(id, f);
      recharger();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur");
    } finally {
      setEnvoiPdf(false);
    }
  }

  async function retirerPdf(f: Ligne) {
    if (!window.confirm(`Retirer « ${String(f.nom)} » de la fiche ? Le fichier sera supprimé.`)) return;
    await api("fichier_suppr", {}, { id: f.id }).catch((e) => setMsg(e.message));
    recharger();
  }

  if (erreur) return <p className="text-[#b91c1c]">{erreur}</p>;
  if (!data) return <p className="text-kinome-grey">Chargement…</p>;
  const l = data.lead;
  const champ = (cle: string, label: string, type = "text") => (
    <label className="text-[0.8rem] font-semibold">
      {label}
      <input
        key={`${cle}${String(l.maj)}`}
        type={type}
        defaultValue={String(l[cle] ?? "")}
        onBlur={(e) => e.target.value !== String(l[cle] ?? "") && maj({ [cle]: e.target.value })}
        className={`${champCls} mt-1`}
      />
    </label>
  );

  return (
    <div className="grid gap-5">
      <button type="button" onClick={onRetour} className="justify-self-start text-[0.88rem] font-semibold text-kinome-grey hover:text-kinome-black">
        ← Tous les prospects
      </button>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">{titre(l)}</h1>
        <Pastille statut={String(l.statut)} />
        <span className="text-[0.82rem] text-kinome-grey">
          Fiche n° {String(l.id)} · {l.formulaire === "chatbot" ? "contact du chatbot" : l.formulaire === "contact" ? "formulaire du site" : "saisie à la main"} · {date(l.date as number)}
        </span>
        {msg && <span className="text-[0.82rem]">{msg}</span>}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="grid content-start gap-5">
          <Carte titre="Où ça en est" aide="Un petit message à chaque étape : appel, rendez-vous, devis, relance. Daté et signé.">
            <div className="grid gap-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) noter();
                }}
                rows={3}
                placeholder="Ex. : RDV jeudi 10 h chez eux, ils veulent un devis site + identité avant fin novembre."
                className={champCls}
              />
              <div>
                <button type="button" onClick={noter} disabled={!note.trim()} className={boutonCls}>
                  Ajouter au fil
                </button>
              </div>
            </div>
            <ol className="mt-5 grid gap-3">
              {data.suivis.map((s) => (
                <li key={String(s.id)} className={`grid grid-cols-[28px_1fr] gap-2 ${s.type === "note" ? "" : "text-kinome-grey"}`}>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-kinome-black/[0.06] text-[0.72rem]">{ICONES[String(s.type)] ?? "•"}</span>
                  <div>
                    <p className={`whitespace-pre-wrap text-[0.9rem] ${s.type === "note" ? "text-kinome-black" : ""}`}>{String(s.texte ?? "")}</p>
                    <p className="text-[0.72rem] text-kinome-grey">
                      {String(s.auteur ?? "")} · {date(s.date as number)}
                    </p>
                  </div>
                </li>
              ))}
              {!data.suivis.length && <li className="text-[0.85rem] text-kinome-grey">Pas encore de message.</li>}
            </ol>
          </Carte>

          {l.message ? (
            <Carte titre={l.formulaire === "manuel" ? "Notes de départ" : "Message reçu"}>
              <p className="whitespace-pre-wrap text-[0.9rem] leading-relaxed">{String(l.message)}</p>
            </Carte>
          ) : null}
        </div>

        <div className="grid content-start gap-5">
          <Carte titre="Suivi">
            <div className="grid gap-4">
              <div className="flex flex-wrap gap-1.5">
                {ETAPES.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => l.statut !== k && maj({ statut: k })}
                    className={`rounded-full px-3 py-1 text-[0.8rem] font-bold ${l.statut === k ? STATUTS[k].cls : "bg-kinome-black/[0.05] text-kinome-grey hover:text-kinome-black"}`}
                  >
                    {LIBELLES[k]}
                  </button>
                ))}
              </div>
              <label className="text-[0.8rem] font-semibold">
                Responsable
                <select key={`r${String(l.responsable)}`} defaultValue={String(l.responsable ?? "")} onChange={(e) => maj({ responsable: e.target.value })} className={`${champCls} mt-1`}>
                  <option value="">Sans responsable</option>
                  {[...new Set([...equipe, ...(l.responsable ? [String(l.responsable)] : [])])].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <ProchaineAction key={`${String(l.prochaine_action)}|${String(l.prochaine_date)}`} l={l} onMaj={maj} />
              <label className="text-[0.8rem] font-semibold">
                Montant estimé (CHF HT)
                <input
                  key={`v${String(l.valeur)}`}
                  type="number"
                  min={0}
                  step={100}
                  defaultValue={l.valeur == null ? "" : String(l.valeur)}
                  onBlur={(e) => e.target.value !== (l.valeur == null ? "" : String(l.valeur)) && maj({ valeur: e.target.value === "" ? null : Number(e.target.value) })}
                  className={`${champCls} mt-1`}
                />
              </label>
            </div>
          </Carte>

          <Carte titre="PDF" aide="Devis, brief, contrat : 10 Mo maximum par fichier, visibles seulement une fois connecté.">
            <div className="grid gap-2">
              {data.fichiers.map((f) => (
                <div key={String(f.id)} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e7e3da] px-3 py-2">
                  <a href={`${API}?a=fichier_get&id=${String(f.id)}`} target="_blank" rel="noopener" className="font-semibold underline-offset-4 hover:underline">
                    📄 {String(f.nom)}
                  </a>
                  <span className="text-[0.75rem] text-kinome-grey">
                    {Math.max(1, Math.round(Number(f.taille) / 1024))} Ko · {String(f.auteur ?? "")} · {date(f.date as number, false)}
                    <button type="button" onClick={() => retirerPdf(f)} className="ml-3 font-semibold hover:text-[#b91c1c]">
                      Retirer
                    </button>
                  </span>
                </div>
              ))}
              <label className={`${bouton2Cls} cursor-pointer justify-self-start`}>
                {envoiPdf ? "Envoi…" : "+ Joindre un PDF"}
                <input type="file" accept="application/pdf,.pdf" className="hidden" disabled={envoiPdf} onChange={(e) => envoyerPdf(e.target.files?.[0])} />
              </label>
            </div>
          </Carte>

          <Carte titre="Coordonnées">
            <div className="grid gap-3 sm:grid-cols-2">
              {champ("entreprise", "Entreprise")}
              {champ("nom", "Personne de contact")}
              {champ("email", "E-mail", "email")}
              {champ("telephone", "Téléphone")}
              <div className="sm:col-span-2">{champ("projet", "Projet")}</div>
              <div className="sm:col-span-2">{champ("origine_declaree", "D'où vient le contact")}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem]">
              {l.email ? (
                <a href={`mailto:${String(l.email)}`} className="font-semibold underline">
                  Écrire
                </a>
              ) : null}
              {l.telephone ? (
                <a href={`tel:${String(l.telephone).replace(/\s/g, "")}`} className="font-semibold underline">
                  Appeler
                </a>
              ) : null}
            </div>
          </Carte>

          {l.formulaire !== "manuel" ? (
            <Carte titre="Provenance">
              <p className="text-[0.88rem]">
                {String(l.canal ?? "")} {l.source && l.source !== l.canal ? `· ${String(l.source)}` : ""}
                {Number(l.nb_visites) > 1 ? ` · ${String(l.nb_visites)} visites avant la demande` : ""}
              </p>
              {data.sessions.length ? (
                <a href={`/admin/#lead-${String(l.id)}`} className="mt-2 inline-block text-[0.85rem] font-semibold underline">
                  Voir le parcours de la visite dans le tableau de bord
                </a>
              ) : null}
            </Carte>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Remontée à chaque changement enregistré (clé posée par Fiche) : les champs repartent de la fiche
function ProchaineAction({ l, onMaj }: { l: Ligne; onMaj: (c: Record<string, unknown>) => void }) {
  const [action, setAction] = useState(String(l.prochaine_action ?? ""));
  const [jour, setJour] = useState(jourIso(l.prochaine_date));
  const change = action !== String(l.prochaine_action ?? "") || jour !== jourIso(l.prochaine_date);
  return (
    <div className="grid gap-1.5">
      <span className="text-[0.8rem] font-semibold">Prochaine action</span>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <input value={action} onChange={(e) => setAction(e.target.value)} placeholder="Rappeler, envoyer le devis…" className={champCls} />
        <input type="date" value={jour} onChange={(e) => setJour(e.target.value)} className={champCls} aria-label="Date" />
      </div>
      <div className="flex gap-2">
        <button type="button" disabled={!change} onClick={() => onMaj({ prochaine_action: action, prochaine_date: jour || null })} className={bouton2Cls}>
          Enregistrer
        </button>
        {Boolean(l.prochaine_action || l.prochaine_date) && (
          <button type="button" onClick={() => onMaj({ prochaine_action: null, prochaine_date: null })} className={bouton2Cls}>
            Fait ✓
          </button>
        )}
      </div>
    </div>
  );
}

// --- Réglages : comptes, mot de passe, clé pour Claude, chatbot --------------------
function Reglages({ moi, onDeconnecte, onEquipe }: { moi: Moi | null; onDeconnecte: () => void; onEquipe: () => void }) {
  return (
    <div className="grid max-w-3xl gap-5">
      <Comptes moi={moi} onDeconnecte={onDeconnecte} onEquipe={onEquipe} />
      <MonMotDePasse moi={moi} />
      <ClesClaude moi={moi} />
      <Chatbot />
    </div>
  );
}

function Comptes({ moi, onDeconnecte, onEquipe }: { moi: Moi | null; onDeconnecte: () => void; onEquipe: () => void }) {
  const [comptes, setComptes] = useState<Ligne[] | null>(null);
  const [msg, setMsg] = useState("");
  const charger = useCallback(() => {
    api<{ comptes: Ligne[] }>("comptes")
      .then((r) => setComptes(r.comptes))
      .catch((e) => (e instanceof NonConnecte ? onDeconnecte() : setMsg(e.message)));
  }, [onDeconnecte]);
  useEffect(() => {
    charger();
  }, [charger]);
  async function ajouter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      await api("compte_ajout", {}, Object.fromEntries(new FormData(form)));
      form.reset();
      setMsg("Compte créé.");
      charger();
      onEquipe();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erreur");
    }
  }
  async function supprimer(c: Ligne) {
    if (!window.confirm(`Supprimer le compte de ${String(c.nom)} ? Ses sessions et ses clés seront fermées.`)) return;
    await api("compte_suppr", {}, { id: c.id }).catch((e) => setMsg(e.message));
    charger();
    onEquipe();
  }
  return (
    <Carte titre="Comptes de l'équipe" aide="Un compte par personne : chacun signe ses messages et peut créer sa clé pour Claude. Le mot de passe commun reste valable pour le tableau de bord.">
      <div className="grid gap-2">
        {(comptes ?? []).map((c) => (
          <div key={String(c.id)} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e7e3da] px-3 py-2 text-[0.88rem]">
            <span>
              <strong>{String(c.nom)}</strong> <span className="text-kinome-grey">· identifiant {String(c.identifiant)}</span>
            </span>
            <span className="text-[0.75rem] text-kinome-grey">
              {c.derniere_connexion ? `connecté ${ilya(c.derniere_connexion as number)}` : "jamais connecté"}
              {Number(c.id) !== moi?.compte && (
                <button type="button" onClick={() => supprimer(c)} className="ml-3 font-semibold hover:text-[#b91c1c]">
                  Supprimer
                </button>
              )}
            </span>
          </div>
        ))}
        {comptes && !comptes.length && <p className="text-[0.85rem] text-kinome-grey">Aucun compte personnel pour l&apos;instant.</p>}
      </div>
      <form onSubmit={ajouter} className="mt-4 grid gap-2 sm:grid-cols-3">
        <input name="identifiant" required placeholder="Identifiant (ex. tanguy)" autoCapitalize="none" className={champCls} />
        <input name="nom" required placeholder="Prénom affiché" className={champCls} />
        <input name="motdepasse" type="password" required minLength={12} placeholder="Mot de passe (12 car. min.)" autoComplete="new-password" className={champCls} />
        <div className="sm:col-span-3">
          <button type="submit" className={boutonCls}>
            Créer le compte
          </button>
          {msg && <span className="ml-3 text-[0.85rem]">{msg}</span>}
        </div>
      </form>
    </Carte>
  );
}

function MonMotDePasse({ moi }: { moi: Moi | null }) {
  const [msg, setMsg] = useState("");
  async function changer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    try {
      await api(moi?.compte !== null ? "compte_mdp" : "motdepasse", {}, { actuel: f.get("actuel"), nouveau: f.get("nouveau") });
      setMsg("Mot de passe changé. Vos autres appareils sont déconnectés.");
      form.reset();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erreur");
    }
  }
  return (
    <Carte titre={moi?.compte !== null ? "Mon mot de passe" : "Mot de passe commun"} aide={moi?.compte !== null ? undefined : "Vous êtes connecté avec le mot de passe commun. Créez vos comptes ci-dessus, puis reconnectez-vous avec votre identifiant."}>
      <form onSubmit={changer} className="grid gap-2 sm:grid-cols-2">
        <input name="actuel" type="password" required placeholder="Mot de passe actuel" autoComplete="current-password" className={champCls} />
        <input name="nouveau" type="password" required minLength={12} placeholder="Nouveau (12 caractères minimum)" autoComplete="new-password" className={champCls} />
        <div className="sm:col-span-2">
          <button type="submit" className={boutonCls}>
            Changer
          </button>
          {msg && <span className="ml-3 text-[0.85rem]">{msg}</span>}
        </div>
      </form>
    </Carte>
  );
}

function ClesClaude({ moi }: { moi: Moi | null }) {
  const [cles, setCles] = useState<Ligne[]>([]);
  const [nouvelle, setNouvelle] = useState("");
  const [msg, setMsg] = useState("");
  const charger = useCallback(() => {
    api<{ cles: Ligne[] }>("cles")
      .then((r) => setCles(r.cles))
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    charger();
  }, [charger]);
  if (moi?.compte === null) {
    return (
      <Carte titre="Claude">
        <p className="text-[0.88rem]">Connectez-vous avec votre compte personnel pour créer votre clé d&apos;accès pour Claude.</p>
      </Carte>
    );
  }
  async function creer() {
    try {
      const r = await api<{ cle: string }>("cle_creer", {}, { libelle: "Claude" });
      setNouvelle(r.cle);
      charger();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur");
    }
  }
  async function revoquer(c: Ligne) {
    if (!window.confirm("Révoquer cette clé ? Claude ne pourra plus accéder au CRM avec elle.")) return;
    await api("cle_suppr", {}, { id: c.id }).catch((e) => setMsg(e.message));
    charger();
  }
  const commande = nouvelle ? `claude mcp add --transport http kinome-crm https://agence-kinome.ch/api/mcp.php --header "X-Kinome-Cle: ${nouvelle}"` : "";
  return (
    <Carte titre="Claude" aide="Votre clé personnelle permet à Claude Code (terminal ou onglet Code de l'app Claude) de lire les fiches, d'en créer, d'écrire dans le fil et de changer une étape, en votre nom. Jamais les exports ni les réglages.">
      <div className="grid gap-3">
        {cles.map((c) => (
          <div key={String(c.id)} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e7e3da] px-3 py-2 text-[0.85rem]">
            <span>
              Clé « {String(c.libelle ?? "Claude")} » · créée {date(c.cree as number, false)}
            </span>
            <span className="text-[0.75rem] text-kinome-grey">
              {c.derniere ? `utilisée ${ilya(c.derniere as number)}` : "jamais utilisée"}
              <button type="button" onClick={() => revoquer(c)} className="ml-3 font-semibold hover:text-[#b91c1c]">
                Révoquer
              </button>
            </span>
          </div>
        ))}
        {nouvelle ? (
          <div className="grid gap-2 rounded-xl bg-[#fdf3d7] p-3 text-[0.85rem]">
            <strong>Votre clé, affichée une seule fois :</strong>
            <code className="break-all rounded-lg bg-white px-2 py-1.5 text-[0.8rem]">{nouvelle}</code>
            <span>Pour Claude Code, dans un terminal :</span>
            <code className="break-all rounded-lg bg-white px-2 py-1.5 text-[0.75rem]">{commande}</code>
            <div className="flex gap-2">
              <button type="button" onClick={() => navigator.clipboard?.writeText(commande)} className={bouton2Cls}>
                Copier la commande
              </button>
              <button type="button" onClick={() => setNouvelle("")} className={bouton2Cls}>
                J&apos;ai noté la clé
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button type="button" onClick={creer} className={boutonCls}>
              Créer ma clé pour Claude
            </button>
            {msg && <span className="ml-3 text-[0.85rem]">{msg}</span>}
          </div>
        )}
      </div>
    </Carte>
  );
}

function Chatbot() {
  const [etat, setEtat] = useState<Ligne | null>(null);
  const [msg, setMsg] = useState("");
  const charger = useCallback(() => {
    api<Ligne>("etat_causerie")
      .then(setEtat)
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    charger();
  }, [charger]);
  async function enregistrer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      await api("secret_causerie", {}, { secret: new FormData(form).get("secret") });
      form.reset();
      setMsg("Secret enregistré.");
      charger();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erreur");
    }
  }
  const ligne = (t: string, v: ReactNode) => (
    <div className="grid grid-cols-[170px_1fr] gap-3 text-[0.88rem]">
      <span className="text-kinome-grey">{t}</span>
      <span>{v}</span>
    </div>
  );
  return (
    <Carte titre="Contacts du chatbot" aide="Chaque contact laissé dans l'assistant du site (Causerie) crée une fiche ici, avec le lien vers la conversation.">
      <div className="grid gap-2">
        {ligne("Branchement", etat?.secret ? <strong className="text-[#15803d]">Secret enregistré</strong> : <strong className="text-[#b91c1c]">À brancher</strong>)}
        {ligne("Dernier test reçu", etat?.dernier_test ? `${date(etat.dernier_test as number)} (${ilya(etat.dernier_test as number)})` : "aucun")}
        {ligne("Dernier contact reçu", etat?.dernier_contact ? date(etat.dernier_contact as number) : "aucun")}
      </div>
      <ol className="mt-4 grid list-decimal gap-1 pl-5 text-[0.85rem] leading-relaxed">
        <li>
          Dans le dashboard Causerie, page <strong>Intégrations</strong> du chatbot « Kinome Assistant », ajoutez le webhook <code className="rounded bg-kinome-black/[0.06] px-1">https://agence-kinome.ch/api/causerie.php</code>.
        </li>
        <li>Copiez le secret affiché sous l&apos;adresse et collez-le ci-dessous.</li>
        <li>Cliquez sur « Tester » dans le dashboard : la date du test s&apos;affiche ici.</li>
      </ol>
      <form onSubmit={enregistrer} className="mt-3 flex flex-wrap gap-2">
        <input name="secret" type="password" required placeholder="Secret du webhook (whsec_…)" autoComplete="off" className={`${champCls} max-w-sm`} />
        <button type="submit" className={boutonCls}>
          Enregistrer
        </button>
        {msg && <span className="self-center text-[0.85rem]">{msg}</span>}
      </form>
    </Carte>
  );
}
