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

function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

export default function BlogIndexPage() {
  // Le blog est entièrement dynamique : à chaque nouvel article ajouté dans
  // app/lib/blog.ts (via le script parse-blog.mjs), il apparaît automatiquement
  // ici (article en featured si plus récent, ou en grille sinon).
  const featured = blogPosts[0];
  const others = blogPosts.slice(1);

  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd()) }}
      />

      {/* Hero éditorial — sobre, sans pré-header chiffré */}
      <section className="mx-auto max-w-[1300px] px-[5%] pt-[180px] pb-[70px]">
        <h1 className="mb-6 font-heading text-[clamp(40px,6vw,84px)] font-normal leading-[1.02] text-kinome-black">
          Communication
          <br />
          <span className="italic text-kinome-grey">&amp; branding</span> à
          Genève
        </h1>
        <p className="max-w-[680px] font-body text-[clamp(17px,1.4vw,21px)] font-light leading-[1.55] text-kinome-grey">
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
                <p className="font-body text-[clamp(15px,1.2vw,17px)] font-light leading-[1.6] text-kinome-grey">
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

      {/* Grille des autres articles — affichés à 3 par ligne en desktop */}
      {others.length > 0 && (
        <section className="mx-auto max-w-[1300px] px-[5%] pb-[120px]">
          <h2 className="mb-12 font-heading text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.2] text-kinome-black">
            Tous nos articles
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {others.map((post, i) => (
              <article key={post.slug} className="group flex flex-col">
                <Link
                  href={`/blog/${post.slug}/`}
                  aria-label={`Lire : ${post.title}`}
                  className="mb-5 block aspect-[3/2] overflow-hidden rounded-[18px] bg-white"
                >
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </Link>

                <div className="mb-3 flex items-center gap-2 text-[0.8rem]">
                  <span className="font-heading font-semibold uppercase tracking-[0.06em] text-kinome-accent">
                    {post.focusKeyword.split(" ").slice(0, 3).join(" ")}
                  </span>
                  <span aria-hidden="true" className="text-kinome-grey">
                    ·
                  </span>
                  <time dateTime={post.date} className="text-kinome-grey">
                    {formatDate(post.date)}
                  </time>
                </div>

                <h3 className="mb-3 font-heading text-[clamp(18px,1.5vw,22px)] font-semibold leading-[1.3] text-kinome-black transition-colors group-hover:text-kinome-accent">
                  <Link href={`/blog/${post.slug}/`} className="line-clamp-3">
                    {post.title}
                  </Link>
                </h3>

                <p className="mb-4 line-clamp-3 font-body text-[0.95rem] font-light leading-[1.6] text-kinome-grey">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}/`}
                  className="mt-auto inline-flex items-center gap-1.5 font-heading text-[0.85rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
                >
                  Lire l&rsquo;article
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA contact en bas */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-[5%] py-[120px] text-center">
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
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105"
          >
            Échanger avec l&rsquo;équipe
          </Link>
        </div>
      </section>
    </main>
  );
}
