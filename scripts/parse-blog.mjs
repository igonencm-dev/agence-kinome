/**
 * Parse les fichiers HTML exportés de WordPress (.blog-raw/*.html)
 * et génère app/lib/blog.ts avec tous les articles structurés.
 *
 * Pour chaque article on extrait :
 *   - title           (<title>)
 *   - description     (<meta name="description">)
 *   - canonical       (<link rel="canonical">)
 *   - ogImage         (<meta property="og:image">)
 *   - articleHtml     (contenu entre <article>...</article>)
 *   - publishedDate   (<meta property="article:published_time"> ou par défaut)
 *   - slug            (déduit du canonical ou du nom de fichier)
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAW = join(ROOT, ".blog-raw");
const OUT = join(ROOT, "app/lib/blog.ts");

// Mapping ID → featured image locale (récupérées via SCP plus tôt)
const FEATURED_IMAGES = {
  509: "/assets/blog/agence-de-communication-geneve.png",
  515: null, // pas de featured image dans WP, on utilise la 1ère image du contenu
  528: "/assets/blog/creation-site-web-a-geneve.png",
  535: "/assets/blog/tarif-agence-de-communication-geneve.png",
  548: "/assets/blog/creation-logo-geneve.png",
};

// Métadonnées Rank Math récupérées via MySQL (pour fallback / cohérence)
const RANK_MATH = {
  509: {
    title: "Comment choisir son agence de communication à Genève",
    description:
      "Découvrez comment choisir la meilleure agence de communication à Genève. Critères, questions à poser, erreurs à éviter.",
    focusKw: "Comment choisir son agence de communication à Genève",
  },
  515: {
    title: "Créer une identité visuelle forte pour votre entreprise à Genève",
    description:
      "Comment créer une identité visuelle forte et cohérente ? Logo, charte graphique, branding : le guide complet par Kinome, agence créative à Genève",
    focusKw: "Créer une identité visuelle forte pour votre entreprise à Genève",
  },
  528: {
    title: "Création de site internet à Genève : le guide ultime",
    description:
      "Tout savoir pour créer un site internet à Genève : choix technologique, coûts, délais, SEO. Guide complet par Kinome, agence de communication 360°.",
    focusKw: "Création de site internet à Genève",
  },
  535: {
    title: "Combien coûte une agence de communication à Genève ?",
    description:
      "Quels sont les tarifs d'une agence de communication à Genève en 2026 ? Fourchettes de prix, forfaits et conseils pour optimiser votre budget",
    focusKw: "Combien coûte une agence de communication à Genève ?",
  },
  548: {
    title: "Création de logo à Genève : processus et erreurs à éviter",
    description:
      "Besoin d'un logo professionnel à Genève ? Découvrez le processus créatif, les erreurs courantes et nos conseils pour un logo qui marque les esprits",
    focusKw: "Création de logo à Genève",
  },
};

// Slugs récupérés depuis WP
const SLUGS = {
  509: "choisir-agence-communication-geneve",
  515: "creer-identite-visuelle-entreprise-geneve",
  528: "creation-site-internet-geneve-guide",
  535: "tarifs-agence-communication-geneve",
  548: "creation-logo-geneve-processus",
};

const DATES = {
  509: "2026-04-09",
  515: "2026-04-11",
  528: "2026-04-13",
  535: "2026-04-14",
  548: "2026-04-14",
};

// Excerpts manuels (les meilleurs pour le SEO + lecture rapide)
const EXCERPTS = {
  509:
    "Critères, questions à poser et erreurs à éviter pour bien choisir l'agence qui accompagnera votre projet de marque à Genève et en Suisse romande.",
  515:
    "Logo, charte graphique, ton et expérience visuelle : un guide complet pour bâtir une identité forte et cohérente, depuis Genève.",
  528:
    "Choix technologique, coûts, délais, SEO : tout ce qu'il faut connaître avant de lancer la création de votre site internet à Genève.",
  535:
    "Fourchettes de prix, forfaits et conseils concrets pour budgétiser sereinement un projet de communication à Genève en 2026.",
  548:
    "Processus créatif, étapes-clés et pièges à éviter pour la création de logo à Genève. Une lecture pratique avant de lancer votre projet de marque.",
};

function extractBetween(html, openRegex, closeRegex) {
  const open = html.search(openRegex);
  if (open === -1) return null;
  const after = html.slice(open);
  const close = after.search(closeRegex);
  if (close === -1) return null;
  return after.slice(0, close + close.toString().length);
}

function extractMeta(html, name, attr = "name") {
  const re = new RegExp(
    `<meta\\s+${attr}=["']${name}["']\\s+content=["']([^"']*)["']`,
    "i"
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractArticleBody(html) {
  // Cherche <article ...>...</article>
  const re = /<article[^>]*>([\s\S]*?)<\/article>/i;
  const m = html.match(re);
  if (m) return m[1].trim();
  // Fallback : <body ...>...</body>
  const re2 = /<body[^>]*>([\s\S]*?)<\/body>/i;
  const m2 = html.match(re2);
  return m2 ? m2[1].trim() : null;
}

/** Extrait les FAQ d'un article : couples (question, réponse). */
function extractFaqs(fullHtml) {
  // La section FAQ commence à <h2 id="faq"...>...</h2> et va jusqu'à </article>
  const faqStart = fullHtml.search(/<h2[^>]*id=["']faq["'][^>]*>/i);
  if (faqStart === -1) return [];
  const articleEnd = fullHtml.indexOf("</article>", faqStart);
  let section = fullHtml
    .slice(faqStart, articleEnd === -1 ? fullHtml.length : articleEnd)
    .replace(/<h2[^>]*>[^<]*<\/h2>/i, ""); // retire le titre H2 "Questions fréquentes"

  // Normalise : retire les <button>, <summary>, <details> qui entourent les questions
  // dans certains articles (ex: 509). Après ça, structure uniforme :
  //   "question?   ▾   <p>réponse</p>"
  section = section
    .replace(/<button[^>]*>/gi, "")
    .replace(/<\/button>/gi, "")
    .replace(/<summary[^>]*>/gi, "")
    .replace(/<\/summary>/gi, "")
    .replace(/<details[^>]*>/gi, "")
    .replace(/<\/details>/gi, "");

  // Pattern : texte qui se termine par "?" puis "▾" puis <p>...</p>
  const faqs = [];
  const re = /([^▾]*?\?)\s*▾\s*<p>(.*?)<\/p>/gs;
  let m;
  while ((m = re.exec(section)) !== null) {
    const question = m[1].replace(/\s+/g, " ").trim();
    const answer = m[2].replace(/\s+/g, " ").replace(/<[^>]+>/g, "").trim();
    if (question && answer && question.length < 250) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

function cleanArticleHtml(html) {
  return (
    html
      // Supprime les commentaires HTML
      .replace(/<!--[\s\S]*?-->/g, "")
      // Supprime les balises <script>...</script>
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      // Supprime les balises <style>...</style>
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      // Remplace les images WP par les chemins locaux quand on les a
      .replace(
        /https:\/\/agence-kinome\.ch\/wp-content\/uploads\/2026\/04\//g,
        "/assets/blog/"
      )
      // Trim whitespace inter-balises
      .replace(/>\s+</g, ">\n<")
      .trim()
  );
}

// ---------- Génération ----------
const files = readdirSync(RAW).filter((f) => f.endsWith(".html"));
console.log(`Trouvé ${files.length} fichiers HTML à parser.\n`);

const posts = [];

for (const file of files.sort()) {
  const id = parseInt(file.replace(".html", ""), 10);
  const html = readFileSync(join(RAW, file), "utf8");

  const fullTitle = extractTitle(html);
  const description = extractMeta(html, "description");
  const ogImage = extractMeta(html, "og:image", "property");
  const canonical =
    html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1] ??
    null;
  const articleBody = extractArticleBody(html);

  if (!articleBody) {
    console.warn(`✗ ${file} : pas d'<article> trouvé, skip.`);
    continue;
  }

  const faqs = extractFaqs(html);

  posts.push({
    id,
    slug: SLUGS[id],
    title: RANK_MATH[id].title,
    fullTitle: fullTitle ?? RANK_MATH[id].title,
    description: RANK_MATH[id].description,
    excerpt: EXCERPTS[id],
    focusKeyword: RANK_MATH[id].focusKw,
    date: DATES[id],
    featuredImage:
      FEATURED_IMAGES[id] ?? "/assets/blog/creation-logo-geneve.png",
    articleHtml: cleanArticleHtml(articleBody),
    canonical: canonical ?? `https://agence-kinome.ch/blog/${SLUGS[id]}`,
    faqs,
  });

  console.log(
    `✓ ${file} : "${RANK_MATH[id].title.slice(0, 50)}…" (${
      articleBody.length
    } char, ${faqs.length} FAQ)`
  );
}

// Trie par date desc
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

// Génère le fichier TypeScript
const ts = `// Auto-généré par scripts/parse-blog.mjs — NE PAS ÉDITER À LA MAIN
// Pour mettre à jour : modifier le HTML brut dans .blog-raw/ puis relancer le script.

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  /** Title HTML brut (peut inclure "| Kinome"). */
  fullTitle: string;
  description: string;
  excerpt: string;
  focusKeyword: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  featuredImage: string;
  /** HTML du contenu, à rendre via dangerouslySetInnerHTML. */
  articleHtml: string;
  canonical: string;
  /** FAQ extraites du HTML — utilisées pour le JSON-LD FAQPage. */
  faqs: Array<{ question: string; answer: string }>;
};

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
`;

writeFileSync(OUT, ts, "utf8");

console.log(`\n✓ ${OUT} généré (${posts.length} articles, ${ts.length} char)`);
