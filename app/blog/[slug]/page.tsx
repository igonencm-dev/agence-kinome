/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../../lib/blog";
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

  return buildMetadata({
    title: post.title,
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

/** Estime le temps de lecture (250 mots/min) */
function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(" ").length;
  return Math.max(1, Math.round(words / 250));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const minutes = readingTime(post.articleHtml);

  // JSON-LD
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
    dateModified: post.date,
    author: { "@id": `${SITE.url}/#organization` },
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

      {/* HERO en pleine largeur avec image en arrière-plan */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[clamp(420px,55vh,640px)] w-full">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-kinome-cream" />
        </div>

        {/* Bloc titre + meta superposé en bas du hero */}
        <div className="relative z-10 -mt-[260px] pb-[60px]">
          <div className="mx-auto max-w-[960px] px-[5%]">
            <nav
              aria-label="Fil d'Ariane"
              className="mb-6 font-body text-[0.8rem] text-white/80"
            >
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>
              <span aria-hidden="true" className="mx-2">
                ›
              </span>
              <Link href="/blog/" className="hover:text-white">
                Blog
              </Link>
              <span aria-hidden="true" className="mx-2">
                ›
              </span>
              <span className="text-white">{post.focusKeyword}</span>
            </nav>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-kinome-accent px-4 py-1.5 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white">
                {post.focusKeyword}
              </span>
              <span className="font-body text-[0.85rem] text-white/85">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="font-body text-[0.85rem] text-white/85">
                · {minutes} min de lecture
              </span>
            </div>

            <h1 className="font-heading text-[clamp(30px,4.2vw,56px)] font-normal leading-[1.1] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Layout 2 colonnes : contenu + sticky author/share */}
      <section className="mx-auto max-w-[1200px] px-[5%] pb-[80px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
          {/* Colonne principale : contenu */}
          <article className="min-w-0">
            <p className="mb-10 font-body text-[clamp(17px,1.35vw,21px)] font-light leading-[1.55] text-kinome-grey">
              {post.description}
            </p>

            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.articleHtml }}
            />

            {/* Tags + partage */}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#e0ddd6] pt-8">
              <div className="flex flex-wrap gap-2">
                <span className="font-heading text-[0.85rem] font-semibold uppercase tracking-[0.05em] text-kinome-grey">
                  Mots-clés :
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-kinome-black text-white transition-transform hover:scale-110"
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-kinome-black text-white transition-transform hover:scale-110"
                >
                  ✉
                </a>
              </div>
            </div>
          </article>

          {/* Colonne droite : sticky author card */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-5">
              <div className="rounded-[20px] bg-white p-6">
                <p className="mb-3 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
                  Écrit par
                </p>
                <p className="font-heading text-[1.15rem] font-semibold text-kinome-black">
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

              <div className="rounded-[20px] bg-kinome-dark p-6 text-white">
                <p className="mb-3 font-heading text-[1.05rem] font-semibold leading-[1.3]">
                  Un projet en tête&nbsp;?
                </p>
                <p className="mb-4 font-body text-[0.85rem] font-light leading-[1.55] text-white/85">
                  Discutons-en. Premier échange gratuit, réponse sous 48h.
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

      {/* CTA fond cream */}
      <section className="bg-white py-[100px]">
        <div className="mx-auto max-w-[1100px] px-[5%]">
          {/* Articles liés */}
          <h2 className="mb-12 text-center font-heading text-[clamp(28px,3vw,44px)] font-normal leading-[1.1] text-kinome-black">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="group flex flex-col overflow-hidden rounded-[16px] bg-kinome-cream transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-white">
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 font-body text-[0.8rem] text-kinome-accent">
                    {formatDate(p.date)} · {readingTime(p.articleHtml)} min
                  </p>
                  <h3 className="font-heading text-[1.1rem] font-semibold leading-[1.3] text-kinome-black group-hover:underline">
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
