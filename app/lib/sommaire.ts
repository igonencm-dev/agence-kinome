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

/**
 * Niveaux de titres sans saut (25/11/2026) : les agents IA et les lecteurs d'écran lisent
 * le plan d'une page par ses titres, et un saut (H1 → H3, H2 → H4) le casse. Les corps
 * d'articles en contiennent : encadrés d'offre en H3 avant le premier H2, sous-parties en
 * H4 directement sous un H2.
 * - Un titre plus profond que son parent + 1 remonte d'un cran (H4 sous H2 → H3), et
 *   ses frères suivants du même niveau le suivent.
 * - Un titre placé avant le premier H2 (titre d'encadré) devient un paragraphe.
 * L'aspect ne change pas : la classe t-h3 / t-h4 garde le style du niveau d'origine
 * (globals.css, .blog-prose).
 */
export function suivreNiveaux(html: string): string {
  const pile: { origine: number; niveau: number }[] = [];
  return html.replace(
    /<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_tout, n: string, attrs: string, contenu: string) => {
      const origine = Number(n);
      while (pile.length && pile[pile.length - 1].origine >= origine) pile.pop();
      const parent = pile[pile.length - 1];
      const avecClasse = (a: string) =>
        /\sclass="/.test(a)
          ? a.replace(/\sclass="([^"]*)"/, ` class="$1 t-h${origine}"`)
          : `${a} class="t-h${origine}"`;
      if (!parent && origine > 2) {
        return `<p${avecClasse(attrs)}>${contenu}</p>`;
      }
      const niveau = parent ? parent.niveau + 1 : 2;
      pile.push({ origine, niveau });
      if (niveau === origine) return `<h${n}${attrs}>${contenu}</h${n}>`;
      return `<h${niveau}${avecClasse(attrs)}>${contenu}</h${niveau}>`;
    },
  );
}
