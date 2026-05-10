/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { blogPosts } from "../lib/blog";
import { buildMetadata, jsonLdScript, SITE } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Blog — communication, branding & web à Genève",
  description:
    "Articles d'expertise par l'Agence Kinome à Genève : choix d'une agence, création de logo et identité visuelle, tarifs, sites internet, SEO. Tous les conseils pour réussir votre projet de communication en Suisse romande.",
  path: "/blog/",
  keywords: [
    "blog agence communication Genève",
    "conseils branding Suisse",
    "guide création logo",
    "tarif agence communication",
    "création site internet Genève",
  ],
});

// JSON-LD Blog + ItemList des articles
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

export default function BlogIndexPage() {
  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd()) }}
      />

      {/* Hero blog */}
      <section className="mx-auto max-w-[1100px] px-[5%] pt-[180px] pb-[80px]">
        <p className="mb-4 font-heading text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-kinome-accent">
          Le blog Kinome
        </p>
        <h1 className="mb-6 font-heading text-[clamp(40px,5.5vw,80px)] font-normal leading-[1.05] text-kinome-black">
          Communication, branding
          <br />
          &amp; web à Genève
        </h1>
        <p className="max-w-[800px] font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-grey">
          Nos retours d&rsquo;expérience, conseils pratiques et guides
          détaillés pour réussir vos projets d&rsquo;identité visuelle, de
          marque et de site internet.
        </p>
      </section>

      {/* Liste articles */}
      <section className="mx-auto max-w-[1100px] px-[5%] pb-[140px]">
        <div className="flex flex-col gap-10">
          {blogPosts.map((post, i) => (
            <article
              key={post.slug}
              className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[20px] bg-white p-6 transition-shadow hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] md:grid-cols-[280px_1fr] md:items-center md:p-8"
            >
              <Link
                href={`/blog/${post.slug}/`}
                aria-label={`Lire : ${post.title}`}
                className="block aspect-[16/10] overflow-hidden rounded-[14px] bg-kinome-cream"
              >
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </Link>

              <div>
                <div className="mb-3 flex items-center gap-3 text-[0.85rem] text-kinome-grey">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-kinome-accent">
                    {post.focusKeyword}
                  </span>
                </div>
                <h2 className="mb-3 font-heading text-[clamp(20px,2.1vw,30px)] font-semibold leading-[1.25] text-kinome-black">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-5 font-body text-[clamp(15px,1.2vw,17px)] font-light leading-[1.6] text-kinome-grey">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="inline-flex items-center gap-2 font-heading text-[0.95rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
                >
                  Lire l&rsquo;article
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA contact */}
      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[80px] text-center text-white">
        <h2 className="mb-6 font-heading text-[clamp(28px,3vw,44px)] font-normal leading-[1.1]">
          Un projet en tête à Genève&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[1.05rem] leading-[1.6] text-white/80">
          Discutons-en directement. Nous revenons vers vous sous 48 heures
          avec une proposition cadrée.
        </p>
        <Link
          href="/contact/"
          className="inline-flex min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105"
        >
          Discutons de votre projet
        </Link>
      </section>
    </main>
  );
}
