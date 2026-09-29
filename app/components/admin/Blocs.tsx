"use client";

import type { ReactNode } from "react";

// Briques du tableau de bord : formats, tuiles, tableaux à barre intégrée,
// histogramme par jour. Une seule série par graphique (pas de double axe),
// le noir pour les volumes, le rouge Kinome pour ce qui rapporte (les demandes).

export const STATUTS: Record<string, { label: string; cls: string }> = {
  nouveau: { label: "Nouveau", cls: "bg-kinome-accent text-white" },
  contacte: { label: "Contacté", cls: "bg-kinome-black/10 text-kinome-black" },
  rdv: { label: "RDV", cls: "bg-kinome-black text-white" },
  devis: { label: "Devis envoyé", cls: "bg-kinome-black text-white" },
  gagne: { label: "Gagné", cls: "bg-[#15803d] text-white" },
  perdu: { label: "Perdu", cls: "bg-kinome-black/5 text-kinome-grey line-through" },
  spam: { label: "Spam", cls: "bg-kinome-black/5 text-kinome-grey" },
};

const NF = new Intl.NumberFormat("fr-CH");
export const nb = (n: number | string | null | undefined) => NF.format(Number(n ?? 0));
export const chf = (n: number | null | undefined) =>
  n == null ? "" : new Intl.NumberFormat("fr-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

export function duree(s: number | null | undefined): string {
  const t = Math.max(0, Math.round(Number(s ?? 0)));
  if (t < 60) return `${t} s`;
  if (t < 3600) return `${Math.floor(t / 60)} min ${String(t % 60).padStart(2, "0")} s`;
  return `${Math.floor(t / 3600)} h ${String(Math.floor((t % 3600) / 60)).padStart(2, "0")}`;
}

export function date(ms: number | null | undefined, avecHeure = true): string {
  if (!ms) return "";
  return new Date(Number(ms)).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    ...(avecHeure ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function ilya(ms: number | null | undefined): string {
  if (!ms) return "";
  const s = (Date.now() - Number(ms)) / 1000;
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  return `il y a ${Math.floor(s / 86400)} j`;
}

export function Carte({ titre, aide, children, className = "" }: { titre: string; aide?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#e7e3da] bg-white p-5 ${className}`}>
      <h2 className="text-[0.95rem] font-bold">{titre}</h2>
      {aide && <p className="mt-0.5 text-[0.8rem] text-kinome-grey">{aide}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Tuile({ label, valeur, avant, format = (v) => nb(v), accent = false, inverse = false }: {
  label: string;
  valeur: number;
  avant?: number | null;
  format?: (v: number) => string;
  accent?: boolean;
  /** Une hausse est une mauvaise nouvelle (taux de rebond) */
  inverse?: boolean;
}) {
  let delta: ReactNode = null;
  if (avant != null && avant > 0) {
    const pct = Math.round(((valeur - avant) / avant) * 100);
    const bon = inverse ? pct <= 0 : pct >= 0;
    delta = (
      <span className={`text-[0.78rem] font-semibold ${pct === 0 ? "text-kinome-grey" : bon ? "text-[#15803d]" : "text-[#b91c1c]"}`}>
        {pct > 0 ? "▲" : pct < 0 ? "▼" : "="} {Math.abs(pct)} %
      </span>
    );
  }
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "border-kinome-accent bg-kinome-accent text-white" : "border-[#e7e3da] bg-white"}`}>
      <p className={`text-[0.78rem] font-semibold ${accent ? "text-white" : "text-kinome-grey"}`}>{label}</p>
      <p className="font-heading mt-1 text-3xl font-extrabold tracking-tight tabular-nums">{format(valeur)}</p>
      <div className={accent ? "[&_span]:!text-white" : ""}>{delta ?? <span className="text-[0.78rem]">&nbsp;</span>}</div>
    </div>
  );
}

/** Tableau dont la première colonne chiffrée porte une barre proportionnelle. */
export function Tableau<T extends Record<string, unknown>>({ lignes, colonnes, barre, vide = "Pas encore de données.", onLigne }: {
  lignes: T[];
  colonnes: { cle: string; label: string; rendu?: (l: T) => ReactNode; droite?: boolean }[];
  barre?: string;
  vide?: string;
  onLigne?: (l: T) => void;
}) {
  if (!lignes.length) return <p className="text-[0.85rem] text-kinome-grey">{vide}</p>;
  const max = barre ? Math.max(1, ...lignes.map((l) => Number(l[barre] ?? 0))) : 1;
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full text-left text-[0.85rem]">
        <thead>
          <tr className="text-[0.75rem] text-kinome-grey">
            {colonnes.map((c) => (
              <th key={c.cle} className={`px-1 pb-2 font-semibold ${c.droite ? "text-right" : ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((l, i) => (
            <tr
              key={i}
              onClick={onLigne ? () => onLigne(l) : undefined}
              className={`border-t border-[#e7e3da] ${onLigne ? "cursor-pointer hover:bg-kinome-black/[0.03]" : ""}`}
            >
              {colonnes.map((c, j) => (
                <td key={c.cle} className={`px-1 py-2 align-top ${c.droite ? "text-right tabular-nums" : ""}`}>
                  {j === 0 && barre ? (
                    <div className="relative">
                      <div
                        className="absolute inset-y-[-3px] left-0 rounded-[4px] bg-kinome-black/[0.06]"
                        style={{ width: `${(Number(l[barre] ?? 0) / max) * 100}%` }}
                      />
                      <span className="relative">{c.rendu ? c.rendu(l) : String(l[c.cle] ?? "")}</span>
                    </div>
                  ) : c.rendu ? (
                    c.rendu(l)
                  ) : (
                    String(l[c.cle] ?? "")
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Visites par jour : barres d'encre. Les jours avec demande reçoivent une
 * pastille orange chiffrée au-dessus de la barre (annotation, pas un second axe).
 */
export function Histogramme({ serie, jours }: { serie: { jour: string; sessions: number; leads: number }[]; jours: number }) {
  // Jours sans visite inclus, pour que les creux se voient
  const n = jours > 0 && jours <= 120 ? jours : serie.length;
  const parJour = new Map(serie.map((s) => [s.jour, s]));
  const points: { jour: string; sessions: number; leads: number }[] = [];
  if (jours > 0 && jours <= 120) {
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const cle = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      points.push(parJour.get(cle) ?? { jour: cle, sessions: 0, leads: 0 });
    }
  } else {
    points.push(...serie);
  }
  if (!points.length) return <p className="text-[0.85rem] text-kinome-grey">Pas encore de visites mesurées.</p>;
  const max = Math.max(1, ...points.map((p) => Number(p.sessions)));
  return (
    <div>
      <div className="flex h-44 items-end gap-[2px]">
        {points.map((p) => (
          <div key={p.jour} className="group relative flex h-full flex-1 flex-col justify-end">
            {Number(p.leads) > 0 && (
              <span className="mx-auto mb-1 grid h-5 min-w-5 place-items-center rounded-full bg-kinome-accent px-1 text-[0.65rem] font-bold text-white">
                {p.leads}
              </span>
            )}
            <div
              className="min-h-[2px] rounded-t-[4px] bg-kinome-black/80 transition-colors group-hover:bg-kinome-black"
              style={{ height: `${(Number(p.sessions) / max) * 100}%` }}
            />
            {/* Infobulle : zone de survol = toute la colonne */}
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-kinome-black px-2.5 py-1.5 text-[0.75rem] text-white group-hover:block">
              {new Date(p.jour).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} : {nb(p.sessions)} visite
              {Number(p.sessions) > 1 ? "s" : ""}
              {Number(p.leads) > 0 ? `, ${p.leads} demande${Number(p.leads) > 1 ? "s" : ""}` : ""}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.72rem] text-kinome-grey">
        <span>{new Date(points[0].jour).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
        <span>
          max {nb(max)} visites/jour · <span className="font-semibold text-kinome-accent">●</span> demandes
        </span>
        <span>{new Date(points[points.length - 1].jour).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
      </div>
    </div>
  );
}

/** Pastille de canal : l'IA ressort en orange, c'est le canal qu'on surveille. */
export function Canal({ canal, source }: { canal?: string | null; source?: string | null }) {
  if (!canal) return <span className="text-kinome-grey">?</span>;
  const ia = canal === "IA";
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span className={`rounded-full px-2 py-0.5 text-[0.72rem] font-bold ${ia ? "bg-kinome-accent text-white" : "bg-kinome-black/[0.07]"}`}>{canal}</span>
      {source && source !== canal && <span className="text-[0.78rem] text-kinome-grey">{source}</span>}
    </span>
  );
}

// Lecture humaine d'un événement de la chronologie
export function decrire(type: string, chemin: string | null, brut: string | null): { icone: string; texte: string } {
  let d: Record<string, unknown> = {};
  try {
    d = brut ? JSON.parse(brut) : {};
  } catch {
    d = {};
  }
  const p = chemin ?? "";
  switch (type) {
    case "vue":
      return { icone: "◉", texte: `Page ${p}${d.titre ? ` · ${d.titre}` : ""}` };
    case "lecture":
      return { icone: "◔", texte: `Lu ${duree(Number(d.duree ?? 0) / 1000)}, ${d.scroll ?? 0} % de la page ${p}` };
    case "clic":
      if (d.cible === "whatsapp") return { icone: "✆", texte: "A cliqué sur WhatsApp" };
      if (d.cible === "tel") return { icone: "☎", texte: `A cliqué sur le téléphone (${d.libelle})` };
      if (d.cible === "mail") return { icone: "✉", texte: `A cliqué sur l'email (${d.libelle})` };
      if (d.cible === "externe") return { icone: "↗", texte: `Lien sortant : ${d.href}` };
      return { icone: "➜", texte: `Bouton « ${d.libelle} »${d.vers ? ` vers ${d.vers}` : ""}` };
    case "formulaire":
      if (d.etape === "debut") return { icone: "✎", texte: `A commencé le formulaire ${d.form}` };
      if (d.etape === "abandon") return { icone: "✕", texte: `A abandonné le formulaire ${d.form} (${d.remplis} champ(s) rempli(s), dernier : ${d.dernier})` };
      return { icone: "✓", texte: `A envoyé le formulaire ${d.form}` };
    case "jaime":
      return { icone: "♥", texte: d.action === "retrait" ? `A retiré son j'aime (${d.slug})` : `A aimé l'article ${d.slug}` };
    case "media":
      return { icone: "▣", texte: `A ouvert en plein écran : ${d.media}` };
    case "chatbot":
      return { icone: "💬", texte: "A ouvert le chatbot" };
    case "copie":
      return { icone: "⧉", texte: `A copié ${d.quoi === "email" ? "l'adresse email" : "le numéro de téléphone"}` };
    case "lead":
      return { icone: "★", texte: `DEMANDE ENVOYÉE (${d.formulaire})` };
    default:
      return { icone: "·", texte: `${type} ${p}` };
  }
}
