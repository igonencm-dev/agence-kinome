/**
 * Sommaire des articles : extrait les H2 du HTML, leur garantit un id
 * d'ancre (stable, sans accent) et renvoie la liste des entrées.
 *
 * Utilisé côté serveur par app/blog/[slug]/page.tsx : le HTML enrichi est
 * rendu à la place de l'original, les entrées alimentent <Sommaire />.
 */

export type EntreeSommaire = { id: string; texte: string };

const ENTITES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  rsquo: "’",
  lsquo: "‘",
  laquo: "«",
  raquo: "»",
  hellip: "…",
  eacute: "é",
  egrave: "è",
  ecirc: "ê",
  agrave: "à",
  acirc: "â",
  ugrave: "ù",
  ucirc: "û",
  icirc: "î",
  ocirc: "ô",
  ccedil: "ç",
};

/** Décode les entités HTML courantes pour un affichage React (texte brut). */
export function decoderEntites(texte: string): string {
  return texte
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (tout, nom) => ENTITES[nom.toLowerCase()] ?? tout);
}

/** Transforme un titre en ancre : minuscules, sans accent, tirets. */
export function slugifierAncre(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

/** Texte lisible d'un titre HTML (balises retirées, entités décodées). */
export function texteTitre(html: string): string {
  return decoderEntites(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

export function preparerSommaire(html: string): {
  html: string;
  entrees: EntreeSommaire[];
} {
  const entrees: EntreeSommaire[] = [];
  const ids = new Set<string>();

  const htmlAvecAncres = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_tout, attrs: string, contenu: string) => {
      const texte = texteTitre(contenu);
      const existant = attrs.match(/\sid="([^"]+)"/);
      let id = existant ? existant[1] : slugifierAncre(texte);
      if (!id) id = `section-${entrees.length + 1}`;
      const base = id;
      let n = 2;
      while (ids.has(id)) id = `${base}-${n++}`;
      ids.add(id);
      entrees.push({ id, texte });
      const attrsSansId = attrs.replace(/\sid="[^"]*"/, "");
      return `<h2 id="${id}"${attrsSansId}>${contenu}</h2>`;
    }
  );

  return { html: htmlAvecAncres, entrees };
}
