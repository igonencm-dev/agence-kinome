#!/usr/bin/env node
/**
 * Versions Markdown des pages pour les agents IA (25/11/2026).
 *
 * Après le build, chaque out/<chemin>/index.html reçoit un index.md à côté : titre,
 * adresse, description et texte de la page, sans en-tête, pied de page, scripts ni
 * décor. Le .htaccess sert ce fichier quand une requête envoie « Accept: text/markdown »
 * (négociation de contenu), et chaque page HTML l'annonce dans un en-tête « Link »
 * (rel="alternate"; type="text/markdown").
 *
 * Pas de dépendance : petit convertisseur maison, suffisant pour le HTML produit par le
 * site (titres, paragraphes, listes, liens, tableaux, citations, images).
 * Pages ignorées : /admin/, /crm/, /signature/, 404.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
const SITE = "https://agence-kinome.ch";
const IGNORES = [/^admin(\/|$)/, /^crm(\/|$)/, /^signature(\/|$)/, /^404(\/|$)/, /^_next(\/|$)/, /^api(\/|$)/];

const ENTITES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", laquo: "«", raquo: "»", hellip: "…", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç", oelig: "œ", euro: "€", middot: "·", times: "×", rarr: "→", larr: "←", ndash: "-", mdash: "-", copy: "©" };
function decoder(t) {
  return t
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITES[n.toLowerCase()] ?? m)
    .replace(/[  ]/g, " ");
}

function absolu(href) {
  if (!href) return "";
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith("#")) return "";
  return SITE + (href.startsWith("/") ? href : "/" + href);
}

function attr(balise, nom) {
  const m = balise.match(new RegExp(`\\s${nom}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decoder(m[2] ?? m[3] ?? "") : "";
}

/** Retire un élément et tout son contenu (non imbriqué du même nom, cas du site). */
function retirer(html, re) {
  return html.replace(re, "");
}

function enMarkdown(html) {
  let h = html;
  // Bruit : scripts, styles, svg, formulaires cachés, éléments masqués.
  h = retirer(h, /<(script|style|noscript|template|svg|iframe|video|audio|canvas|select|form|nav)\b[\s\S]*?<\/\1>/gi);
  h = retirer(h, /<([a-z0-9]+)\b[^>]*\s(hidden|aria-hidden="true")[^>]*>[\s\S]*?<\/\1>/gi);
  h = h.replace(/<!--[\s\S]*?-->/g, "");

  // Tableaux : rendus en Markdown ligne par ligne.
  h = h.replace(/<table\b[\s\S]*?<\/table>/gi, (t) => {
    const lignes = [...t.matchAll(/<tr\b[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => texte(c[1]).replace(/\|/g, "\\|")),
    );
    if (!lignes.length) return "";
    const n = Math.max(...lignes.map((l) => l.length));
    const fmt = (l) => "| " + Array.from({ length: n }, (_, i) => l[i] ?? "").join(" | ") + " |";
    return "\n\n" + [fmt(lignes[0]), "| " + Array(n).fill("---").join(" | ") + " |", ...lignes.slice(1).map(fmt)].join("\n") + "\n\n";
  });

  h = h.replace(/<img\b[^>]*>/gi, (b) => {
    const alt = attr(b, "alt");
    const src = absolu(attr(b, "src"));
    return alt && src && !src.startsWith("data:") ? `![${alt}](${src})` : "";
  });
  h = h.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, a, contenu) => {
    // Les images d'une carte cliquable ne gardent que leur texte : le lien suffit.
    const t = texte(contenu.replace(/!\[[^\]]*\]\([^)]*\)/g, " "));
    const href = absolu(attr(`<a ${a}>`, "href"));
    if (!t) return "";
    return href ? `[${t}](${href})` : t;
  });
  h = h.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, c) => `\n\n${"#".repeat(Number(n))} ${texte(c)}\n\n`);
  h = h.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `\n- ${texte(c)}`);
  h = h.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, c) => {
    const t = texte(c);
    return t ? `**${t}**` : "";
  });
  h = h.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, c) => {
    const t = texte(c);
    return t ? `*${t}*` : "";
  });
  h = h.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, c) => `\n\n> ${texte(c)}\n\n`);
  h = h.replace(/<br\s*\/?>/gi, "\n");
  h = h.replace(/<\/(p|div|section|article|ul|ol|dl|dd|dt|figure|figcaption|summary|details)>/gi, "\n\n");
  h = h.replace(/<[^>]+>/g, " ");
  h = decoder(h);
  return h
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function texte(fragment) {
  return decoder(fragment.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function pages(dir) {
  const res = [];
  for (const nom of readdirSync(dir)) {
    const p = join(dir, nom);
    if (statSync(p).isDirectory()) res.push(...pages(p));
    else if (nom === "index.html") res.push(p);
  }
  return res;
}

let n = 0;
for (const fichier of pages(OUT)) {
  const rel = relative(OUT, fichier).split(sep).join("/").replace(/index\.html$/, "");
  if (IGNORES.some((re) => re.test(rel))) continue;
  const html = readFileSync(fichier, "utf8");
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
  const titre = texte((html.match(/<title>([\s\S]*?)<\/title>/i) ?? [])[1] ?? "");
  const description = attr((html.match(/<meta[^>]+name="description"[^>]*>/i) ?? [""])[0], "content");
  const canonique = attr((html.match(/<link[^>]+rel="canonical"[^>]*>/i) ?? [""])[0], "href") || `${SITE}/${rel}`;
  const langue = attr((html.match(/<html[^>]*>/i) ?? [""])[0], "lang") || "fr";

  let corps = (html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i) ?? [])[1] ?? "";
  const main = corps.match(/<main\b[^>]*>([\s\S]*)<\/main>/i);
  if (main) corps = main[1];
  else {
    // Accueil sans <main> : on retire l'en-tête (premier <header>) et le pied de page (dernier <footer>).
    corps = corps.replace(/<header\b[\s\S]*?<\/header>/i, "");
    const fin = corps.lastIndexOf("<footer");
    if (fin > -1) corps = corps.slice(0, fin);
  }
  const md = enMarkdown(corps);
  if (md.length < 200) continue;

  const entete = [`# ${titre}`, "", `> ${description}`, "", `Source : ${canonique}`, `Langue : ${langue}`, `Agence Kinome, agence de communication à Genève · contact@agence-kinome.ch · +41 78 265 20 14`, "", "---", ""].join("\n");
  writeFileSync(fichier.replace(/index\.html$/, "index.md"), entete + md + "\n");
  n++;
}
console.log(`markdown-agents : ${n} pages en Markdown`);
