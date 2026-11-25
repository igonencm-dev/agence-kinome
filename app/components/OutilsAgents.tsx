"use client";

/**
 * Outils WebMCP (25/11/2026) : un agent IA qui navigue sur le site (navigateur avec
 * WebMCP) trouve des outils prêts à l'emploi au lieu de lire les pages.
 * API du brouillon W3C (Web Machine Learning CG) : document.modelContext.registerTool ;
 * les premières implémentations exposaient navigator.modelContext, on enregistre sur les
 * deux quand ils existent. Sans WebMCP, ce composant ne fait rien.
 *
 * Données : /agents/kinome.json et /agents/articles.json (générés au build depuis
 * lib/agents.ts et lib/blog.ts), les mêmes que le serveur MCP public (/mcp).
 * Tous les outils sont en lecture seule, sauf « poser_question_assistant », qui ouvre
 * le chatbot du site et y pose la question, à la vue du visiteur.
 */

import { useEffect } from "react";
import { ouvrirEtPoser } from "./OuvrirAssistant";

type Outil = {
  name: string;
  title?: string;
  description: string;
  inputSchema: object;
  execute: (entree: Record<string, unknown>) => Promise<unknown>;
  annotations?: { readOnlyHint?: boolean; consequentialHint?: boolean };
};
type ContexteModele = { registerTool: (outil: Outil, options?: { signal?: AbortSignal }) => unknown };

const cache = new Map<string, Promise<Record<string, unknown>>>();
function lire(url: string) {
  if (!cache.has(url)) cache.set(url, fetch(url).then((r) => r.json()));
  return cache.get(url)!;
}

const normaliser = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe");

const VIDE = { type: "object", properties: {}, additionalProperties: false };

const OUTILS: Outil[] = [
  {
    name: "presentation_kinome",
    title: "Présentation de l'agence",
    description: "Qui est l'Agence Kinome (agence de communication à Genève) : activité, adresse, zones servies, langues, horaires, services et liens.",
    inputSchema: VIDE,
    execute: async () => (await lire("/agents/kinome.json")).agence,
    annotations: { readOnlyHint: true },
  },
  {
    name: "tarifs_kinome",
    title: "Prix 2026",
    description: "Fourchettes de prix 2026 de l'agence en CHF hors TVA (logo, identité visuelle, site internet, SEO, réseaux sociaux…), avec délais indicatifs et source PDF.",
    inputSchema: VIDE,
    execute: async () => (await lire("/agents/kinome.json")).tarifs,
    annotations: { readOnlyHint: true },
  },
  {
    name: "contacter_kinome",
    title: "Moyens de contact",
    description: "Moyens de contacter l'agence (formulaire, e-mail, téléphone, WhatsApp). N'envoie aucun message.",
    inputSchema: VIDE,
    execute: async () => (await lire("/agents/kinome.json")).contact,
    annotations: { readOnlyHint: true },
  },
  {
    name: "rechercher_articles",
    title: "Rechercher dans le blog",
    description: "Cherche dans les guides du blog de Kinome (prix, branding, sites, SEO, IA, vœux) et renvoie titres, adresses, versions Markdown et descriptions.",
    inputSchema: {
      type: "object",
      properties: {
        requete: { type: "string", description: "Mots-clés, par exemple « prix logo » ou « site multilingue »." },
        limite: { type: "integer", minimum: 1, maximum: 20, description: "Nombre de résultats (5 par défaut)." },
      },
      required: ["requete"],
      additionalProperties: false,
    },
    execute: async (entree) => {
      const requete = String(entree.requete ?? "").slice(0, 200);
      const limite = Math.max(1, Math.min(20, Number(entree.limite ?? 5) || 5));
      const index = await lire("/agents/articles.json");
      const articles = (index.articles as Record<string, string>[]) ?? [];
      const mots = normaliser(requete).split(/[^a-z0-9]+/).filter((m) => m.length > 2);
      const notes = articles
        .map((a) => {
          const [t, u, d] = [a.titre, a.url, a.description].map((v) => normaliser(String(v ?? "")));
          const note = mots.reduce((s, m) => s + (t.includes(m) ? 3 : 0) + (u.includes(m) ? 2 : 0) + (d.includes(m) ? 1 : 0), 0);
          return { note, a };
        })
        .filter((x) => !mots.length || x.note > 0)
        .sort((x, y) => y.note - x.note);
      return { requete, resultats: notes.slice(0, limite).map((x) => x.a), total_articles: articles.length };
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "poser_question_assistant",
    title: "Poser une question à l'assistant du site",
    description: "Ouvre l'assistant de Kinome dans la page et lui pose la question (budget, délai, démarche). La conversation reste visible du visiteur.",
    inputSchema: {
      type: "object",
      properties: { question: { type: "string", description: "La question, en français de préférence." } },
      required: ["question"],
      additionalProperties: false,
    },
    execute: async (entree) => {
      const question = String(entree.question ?? "").trim().slice(0, 300);
      if (!question) throw new Error("Question vide");
      ouvrirEtPoser(question);
      return { ouvert: true, question, note: "La réponse s'affiche dans la fenêtre de l'assistant." };
    },
    annotations: { readOnlyHint: false, consequentialHint: false },
  },
];

export default function OutilsAgents() {
  useEffect(() => {
    const contextes = new Set<ContexteModele>();
    const d = (document as unknown as { modelContext?: ContexteModele }).modelContext;
    const n = (navigator as unknown as { modelContext?: ContexteModele }).modelContext;
    if (d?.registerTool) contextes.add(d);
    if (n?.registerTool) contextes.add(n);
    if (!contextes.size) return;
    const fin = new AbortController();
    for (const ctx of contextes) {
      for (const outil of OUTILS) {
        try {
          const r = ctx.registerTool(outil, { signal: fin.signal });
          if (r && typeof (r as Promise<unknown>).catch === "function") (r as Promise<unknown>).catch(() => {});
        } catch {
          /* outil déjà enregistré ou API différente : sans effet sur la page */
        }
      }
    }
    return () => fin.abort();
  }, []);
  return null;
}
