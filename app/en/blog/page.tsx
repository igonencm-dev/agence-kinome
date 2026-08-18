/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { blogPosts } from "../../lib/blog";
import { buildMetadata, jsonLdScript, SITE } from "../../lib/seo";
import ResponsiveBr from "../../components/ResponsiveBr";

export const metadata = buildMetadata({
  title: "Blog — communication, branding & web in Geneva",
  description:
    "Expert articles by Agence Kinome in Geneva: how to choose an agency, logo and visual identity creation, pricing, websites, SEO. All the advice to succeed in your communication project in French-speaking Switzerland. Articles are currently in French.",
  path: "/en/blog/",
  keywords: ["Geneva communication blog", "Swiss branding tips", "logo design guide"],
});

function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}/en/blog/#blog`,
    name: "Blog — Agence Kinome",
    description:
      "Tips, guides and case studies by Agence Kinome, a communication agency in Geneva.",
    url: `${SITE.url}/en/blog/`,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "fr",
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

export default function BlogIndexEN() {
  // Tri anti-chronologique : le dernier article publié prend la une et la
  // grille suit du plus récent au plus ancien (à date égale, l'id tranche).
  const parDate = [...blogPosts].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id
  );
  const featured = parDate[0];
  const others = parDate.slice(1);

  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd()) }}
      />

      <section className="mx-auto max-w-[1300px] px-[5%] pt-[clamp(120px,18vw,180px)] pb-[70px]">
        <h1 className="mb-6 font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.02] text-kinome-black">
          Communication
          <ResponsiveBr />
          <span className="italic text-kinome-grey">&amp; branding</span> in
          Geneva
        </h1>
        <p className="max-w-[680px] font-body text-[clamp(17px,1.4vw,21px)] font-light leading-[1.55] text-kinome-grey">
          Our experiences, detailed guides and practical advice to succeed
          with your identity, brand and website projects.
        </p>
        <p className="mt-6 inline-block rounded-full bg-kinome-accent/10 px-4 py-2 font-body text-[0.85rem] text-kinome-accent">
          Articles are currently in French — English versions coming soon.
        </p>
      </section>

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
                    Featured
                  </span>
                  <span className="text-kinome-grey">
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  </span>
                  <span className="text-kinome-grey">
                    · {readingTime(featured.articleHtml)} min
                  </span>
                  <span className="text-kinome-grey italic">· In French</span>
                </div>

                <h2 className="font-heading text-[clamp(24px,2.8vw,40px)] font-semibold leading-[1.15] text-kinome-black group-hover:text-kinome-accent">
                  {featured.title}
                </h2>
                <p className="font-body text-[clamp(16px,1.2vw,17px)] font-light leading-[1.6] text-kinome-grey">
                  {featured.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 font-heading text-[0.95rem] font-semibold text-kinome-black">
                  Read article (FR)
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {others.length > 0 && (
        <section className="mx-auto max-w-[1300px] px-[5%] pb-[clamp(60px,12vw,120px)]">
          <h2 className="mb-12 font-heading text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.2] text-kinome-black">
            All our articles
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {others.map((post, i) => (
              <article key={post.slug} className="group flex flex-col">
                <Link
                  href={`/blog/${post.slug}/`}
                  aria-label={`Read: ${post.title}`}
                  className="mb-5 block overflow-hidden rounded-[18px]"
                >
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </Link>

                <div className="mb-3 flex items-center gap-2 text-[0.8rem]">
                  <span className="font-heading font-semibold uppercase tracking-[0.06em] text-kinome-accent">
                    {post.focusKeyword.split(" ").slice(0, 3).join(" ")}
                  </span>
                  <span aria-hidden="true" className="text-kinome-grey">·</span>
                  <time dateTime={post.date} className="text-kinome-grey">
                    {formatDate(post.date)}
                  </time>
                </div>

                <h3 className="mb-3 font-heading text-[clamp(18px,1.5vw,22px)] font-semibold leading-[1.3] text-kinome-black">
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
                  Read article (FR)
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-[5%] py-[clamp(60px,12vw,120px)] text-center">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
            Let's talk
          </p>
          <h2 className="mx-auto mb-6 max-w-[700px] font-heading text-[clamp(26px,4.5vw,52px)] font-normal leading-[1.1] text-kinome-black">
            A communication project in Geneva?
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] font-body text-[clamp(16px,1.3vw,19px)] font-light leading-[1.6] text-kinome-grey">
            First call free, reply within 48 hours. We discuss your goals and
            give you a clear scope to start with.
          </p>
          <Link
            href="/en/contact/"
            className="btn-fill-accent mx-auto flex w-fit min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105"
          >
            <span className="relative z-10">Talk to the team</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
