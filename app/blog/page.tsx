/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { blogPosts } from "../lib/blog";
import { buildMetadata, jsonLdScript, SITE } from "../lib/seo";
import ResponsiveBr from "../components/ResponsiveBr";
import ArticlesPopulaires from "../components/ArticlesPopulaires";
import GrilleArticles, { type ArticleCarte } from "../components/GrilleArticles";
import { CATEGORIES, resumer, trierParPopulariteInitiale } from "../lib/populaires";

export const metadata = buildMetadata({
  title: "Blog Kinome — branding & web à Genève",
  description:
    "Articles d'expertise Kinome à Genève : choisir une agence, création de logo et identité, tarifs, sites internet, SEO — conseils pour votre projet en Suisse.",
  path: "/blog/",
  keywords: [
    "blog agence communication Genève",
    "conseils branding Suisse",
    "guide création logo",
    "tarif agence communication",
    "création site internet Genève",
  ],
});

function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}/blog/#blog`,
    name: "Blog — Agence Kinome",
    description:
      "Conseils, guides et retours d'expérience par l'Agence Kinome, agence de communication à Genève.",
    url: `${SITE.url}/blog/`,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "fr",
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE.url}/blog/${p.slug}/`,
      headline: p.title,
      description: p.description,
      image: `${SITE.url}${p.featuredImage}`,
      datePublished: p.date,
      articleSection: CATEGORIES[p.categorie],
      author: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: `${SITE.url}/blog/${p.slug}/`,
    })),
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

export default function BlogIndexPage() {
  // Tri anti-chronologique : le dernier article publié prend la une et la
  // grille suit du plus récent au plus ancien (à date égale, l'id tranche).
  const parDate = [...blogPosts].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id
  );
  const featured = parDate[0];
  const others = parDate.slice(1);

  // Les plus lus : ordre de repli Search Console, reclassé côté client
  // d'après les vues réelles (api/stats.php).
  const populaires = trierParPopulariteInitiale(blogPosts).map(resumer);

  // Cartes de la grille filtrable (données sérialisables pour le client).
  const cartes: ArticleCarte[] = others.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    date: p.date,
    dateAffichee: formatDate(p.date),
    minutes: readingTime(p.articleHtml),
    categorie: p.categorie,
  }));

  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd()) }}
      />

      {/* Hero éditorial — sobre, sans pré-header chiffré */}
      <section className="mx-auto max-w-[1300px] px-[5%] pt-[clamp(120px,18vw,180px)] pb-[70px]">
        <h1 className="mb-6 text-center font-heading text-[clamp(40px,8vw,84px)] font-normal leading-[1.05] text-kinome-black md:text-left">
          Communication
          <ResponsiveBr />
          <span className="italic text-kinome-grey">&amp; branding</span> à
          Genève
        </h1>
        <p className="mx-auto max-w-[680px] text-center font-body text-[clamp(16px,1.4vw,21px)] font-light leading-[1.55] text-kinome-grey md:mx-0 md:text-left">
          Nos retours d&rsquo;expérience, guides détaillés et conseils
          pratiques pour réussir vos projets d&rsquo;identité, de marque et
          de site internet.
        </p>
      </section>

      {/* Article featured (le + récent, en grand) */}
      {featured && (
        <section className="mx-auto max-w-[1300px] px-[5%] pb-[80px]">
          <Link
            href={`/blog/${featured.slug}/`}
            className="group block overflow-hidden rounded-[24px] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_12px_50px_rgba(0,0,0,0.10)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
              <div className="aspect-[3/2] overflow-hidden bg-kinome-cream md:aspect-auto">
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,56px)]">
                <div className="flex flex-wrap items-center gap-3 text-[0.85rem]">
                  <span className="rounded-full bg-kinome-accent px-3 py-1 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white">
                    À la une
                  </span>
                  <span className="text-kinome-grey">
                    <time dateTime={featured.date}>
                      {formatDate(featured.date)}
                    </time>
                  </span>
                  <span className="text-kinome-grey">
                    · {readingTime(featured.articleHtml)} min
                  </span>
                </div>

                <h2 className="font-heading text-[clamp(24px,2.8vw,40px)] font-semibold leading-[1.15] text-kinome-black group-hover:text-kinome-accent">
                  {featured.title}
                </h2>
                <p className="font-body text-[clamp(16px,1.2vw,17px)] font-light leading-[1.6] text-kinome-grey">
                  {featured.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 font-heading text-[0.95rem] font-semibold text-kinome-black">
                  Lire l&rsquo;article
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Les plus lus : 4 cartes classées d'après les vues réelles */}
      <section className="mx-auto max-w-[1300px] px-[5%] pb-[clamp(60px,10vw,100px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <h2 className="font-heading text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.2] text-kinome-black">
            Les articles les plus lus
          </h2>
          <p className="font-body text-[0.9rem] font-light text-kinome-grey">
            Classement d&rsquo;après les lectures réelles sur le site.
          </p>
        </div>
        <ArticlesPopulaires articles={populaires} limite={4} variante="cartes" />
      </section>

      {/* Tous les articles, filtrables par rubrique (3 par ligne en desktop) */}
      {others.length > 0 && (
        <section
          id="articles"
          className="mx-auto max-w-[1300px] px-[5%] pb-[clamp(60px,12vw,120px)]"
        >
          <h2 className="mb-8 font-heading text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.2] text-kinome-black">
            Tous nos articles
          </h2>
          <GrilleArticles articles={cartes} />
        </section>
      )}

      {/* CTA contact en bas */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-[5%] py-[clamp(60px,12vw,120px)] text-center">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
            Discutons
          </p>
          <h2 className="mx-auto mb-6 max-w-[700px] font-heading text-[clamp(28px,3.5vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Un projet de communication à Genève&nbsp;?
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] font-body text-[clamp(16px,1.3vw,19px)] font-light leading-[1.6] text-kinome-grey">
            Premier appel gratuit, réponse sous 48 heures. On échange autour
            de vos enjeux et on vous propose un cadrage clair.
          </p>
          <Link
            href="/contact/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105"
          >
            Échanger avec l&rsquo;équipe
          </Link>
        </div>
      </section>
    </main>
  );
}
