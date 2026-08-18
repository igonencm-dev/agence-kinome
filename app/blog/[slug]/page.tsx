/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../../lib/blog";
import CorpsCarteVoeux, { CrossSellVoeux } from "./CorpsCarteVoeux";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
  SITE,
} from "../../lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article — Kinome" };

  // La balise <title> privilégie `fullTitle` (variante courte optimisée SERP,
  // sans le suffixe qui est réapposé par buildMetadata) ; le H1 garde `title`.
  const titreBalise = post.fullTitle
    ? post.fullTitle.replace(/ \| Kinome$/, "")
    : post.title;

  return buildMetadata({
    title: titreBalise,
    description: post.description,
    path: `/blog/${post.slug}/`,
    ogType: "article",
    ogImage: post.featuredImage,
    keywords: [post.focusKeyword, "blog Kinome", "agence Genève"],
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(" ").length;
  return Math.max(1, Math.round(words / 250));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Tri par date DESC pour que les articles RÉCENTS apparaissent dans
  // "À lire aussi". Avant : on prenait juste les 3 premiers du tableau,
  // donc les nouveaux articles n'étaient jamais mis en avant et restaient
  // orphelins niveau maillage interne. Maintenant chaque article cousin
  // pointe vers les 3 plus récents → boost SEO automatique pour tout
  // nouvel article publié.
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  const minutes = readingTime(post.articleHtml);

  // Author par défaut = Mathias (directeur marketing = éditeur en chef du blog).
  // Chaque article peut surcharger via `authorSlug` dans lib/blog.ts.
  const authorSlug = post.authorSlug ?? "mathias";

  // JSON-LD BlogPosting enrichi (E-E-A-T) :
  // - author pointe vers le Person Schema (Mathias ou Tanguy) au lieu de
  //   l'Organization — signal d'expertise + autorité personnelle pour Google
  // - dateModified utilise lastModified si fourni, sinon date de publication
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: `${SITE.url}${post.featuredImage}`,
      width: 1200,
      height: 750,
    },
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: { "@id": `${SITE.url}/a-propos/#${authorSlug}` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
    inLanguage: "fr",
    keywords: post.focusKeyword,
    articleSection: "Communication, branding, web",
    wordCount: post.articleHtml.split(/\s+/).length,
    about: { "@type": "Thing", name: post.focusKeyword },
    contentLocation: { "@type": "Place", name: "Genève, Suisse" },
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: post.title, url: `/blog/${post.slug}/` },
  ]);

  const hasFaqs = post.faqs && post.faqs.length > 0;
  const faqLd = hasFaqs ? faqJsonLd(post.faqs) : null;

  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }}
        />
      )}

      {/* HERO ÉDITORIAL — fond cream, titre lisible, pas d'image en background */}
      <section className="pt-[clamp(110px,16vw,160px)] pb-[40px]">
        <div className="mx-auto max-w-[960px] px-[5%]">
          {/* Breadcrumb */}
          <nav
            aria-label="Fil d'Ariane"
            className="mb-8 font-body text-[0.85rem] text-kinome-grey"
          >
            <Link href="/" className="hover:text-kinome-black">
              Accueil
            </Link>
            <span aria-hidden="true" className="mx-2">
              ›
            </span>
            <Link href="/blog/" className="hover:text-kinome-black">
              Blog
            </Link>
            <span aria-hidden="true" className="mx-2">
              ›
            </span>
            <span className="text-kinome-black">{post.focusKeyword}</span>
          </nav>

          {/* Meta + tag */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-kinome-accent px-4 py-1.5 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white">
              {post.focusKeyword}
            </span>
            <span className="font-body text-[0.88rem] text-kinome-grey">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="font-body text-[0.88rem] text-kinome-grey">
              · {minutes} min de lecture
            </span>
            <span className="font-body text-[0.88rem] text-kinome-grey">
              · L&rsquo;équipe Kinome
            </span>
          </div>

          {/* H1 GRAND */}
          <h1 className="mb-7 font-heading text-[clamp(34px,5vw,64px)] font-normal leading-[1.05] text-kinome-black">
            {post.title}
          </h1>

          {/* Description / chapô */}
          <p className="max-w-[800px] font-body text-[clamp(17px,1.45vw,22px)] font-light leading-[1.5] text-kinome-grey">
            {post.description}
          </p>
        </div>
      </section>

      {/* IMAGE FEATURED — pleine largeur, ratio naturel, pas de crop, pas d'overlay */}
      <section className="mb-[60px]">
        <div className="mx-auto max-w-[1300px] px-[5%]">
          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="block w-full h-auto"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* CONTENU — 2 colonnes desktop : article + sidebar sticky */}
      <section className="mx-auto max-w-[1300px] px-[5%] pb-[80px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          {/* Colonne principale : contenu de l'article. L'article carte de
              vœux a un corps maquetté sur mesure (Figma Tanguy 2228:5486) ;
              les autres gardent le rendu .blog-prose générique. */}
          <article className="min-w-0">
            {post.slug === "carte-de-voeux-entreprise" ? (
              <CorpsCarteVoeux post={post} />
            ) : (
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.articleHtml }}
              />
            )}

            {/* Tags + partage */}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#e0ddd6] pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-kinome-grey">
                  Mots-clés
                </span>
                {post.focusKeyword
                  .split(/[ /]/)
                  .filter((w) => w.length > 3)
                  .slice(0, 5)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1 font-body text-[0.8rem] text-kinome-grey"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="flex items-center gap-3 font-body text-[0.85rem]">
                <span className="text-kinome-grey">Partager :</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://agence-kinome.ch/blog/${post.slug}/`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Partager sur LinkedIn"
                  className="flex h-9 w-9 items-center justify-center btn-fill-accent rounded-full bg-kinome-black text-white transition-transform hover:scale-110"
                >
                  in
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    post.title
                  )}&body=${encodeURIComponent(
                    `https://agence-kinome.ch/blog/${post.slug}/`
                  )}`}
                  aria-label="Partager par mail"
                  className="flex h-9 w-9 items-center justify-center btn-fill-accent rounded-full bg-kinome-black text-white transition-transform hover:scale-110"
                >
                  ✉
                </a>
              </div>
            </div>
          </article>

          {/* Colonne droite : sticky author card + CTA contact */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-5">
              <div className="rounded-[20px] bg-white p-6">
                <p className="mb-3 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
                  Écrit par
                </p>
                <p className="font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black">
                  L&rsquo;équipe Kinome
                </p>
                <p className="mt-1 font-body text-[0.85rem] leading-[1.6] text-kinome-grey">
                  Agence de communication indépendante basée à Genève.
                </p>
                <Link
                  href="/a-propos/"
                  className="mt-4 inline-flex items-center gap-1 font-heading text-[0.85rem] font-semibold text-kinome-accent hover:underline"
                >
                  En savoir plus →
                </Link>
              </div>

              {/* Card "Explorer Kinome" : maillage interne automatique vers
                  pages clés (services + processus + portfolio). Présente sur
                  TOUS les articles → boost SEO pages conversion + transparence. */}
              <div className="rounded-[20px] bg-kinome-cream p-6">
                <p className="mb-3 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
                  Explorer Kinome
                </p>
                <ul className="space-y-2 font-body text-[0.9rem]">
                  <li>
                    <Link
                      href="/services/"
                      className="inline-flex items-center gap-1 text-kinome-black hover:text-kinome-accent hover:underline"
                    >
                      → Nos services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/processus/"
                      className="inline-flex items-center gap-1 text-kinome-black hover:text-kinome-accent hover:underline"
                    >
                      → Notre processus
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio/"
                      className="inline-flex items-center gap-1 text-kinome-black hover:text-kinome-accent hover:underline"
                    >
                      → Nos réalisations
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-[20px] bg-kinome-dark p-6 text-white">
                <p className="mb-3 font-heading text-[clamp(15px,1.1vw,17px)] font-semibold leading-[1.3]">
                  Un projet en tête&nbsp;?
                </p>
                <p className="mb-4 font-body text-[0.85rem] font-light leading-[1.55] text-white/85">
                  Diagnostic stratégique offert (30 min). Réponse sous 24 h.
                </p>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 font-heading text-[0.85rem] font-semibold text-kinome-black transition-transform hover:scale-105"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Cross-sell services de la maquette carte de vœux, pleine largeur */}
      {post.slug === "carte-de-voeux-entreprise" && <CrossSellVoeux />}

      {/* Articles liés */}
      <section className="bg-white py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1300px] px-[5%]">
          <h2 className="mb-12 text-center font-heading text-[clamp(28px,3vw,44px)] font-normal leading-[1.1] text-kinome-black">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="group flex flex-col overflow-hidden rounded-[16px] bg-kinome-cream transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 font-body text-[0.8rem] text-kinome-accent">
                    {formatDate(p.date)} · {readingTime(p.articleHtml)} min
                  </p>
                  <h3 className="font-heading text-[clamp(15px,1.1vw,17px)] font-semibold leading-[1.3] text-kinome-black group-hover:underline">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 font-heading text-[0.95rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
            >
              Tous les articles
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
