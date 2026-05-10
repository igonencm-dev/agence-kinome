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

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Articles liés : on prend les 3 autres
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // JSON-LD Article + Breadcrumb
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
    about: {
      "@type": "Thing",
      name: post.focusKeyword,
    },
    contentLocation: {
      "@type": "Place",
      name: "Genève, Suisse",
    },
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: post.title, url: `/blog/${post.slug}/` },
  ]);

  // JSON-LD FAQPage : extrait des FAQ de l'article (boost AEO majeur pour
  // les Google AI Overview, Perplexity, ChatGPT).
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

      {/* Breadcrumb */}
      <section className="mx-auto max-w-[820px] px-[5%] pt-[180px]">
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
      </section>

      {/* Hero article */}
      <section className="mx-auto max-w-[820px] px-[5%]">
        <div className="mb-7 flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-kinome-accent px-4 py-1 font-heading text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-white">
            {post.focusKeyword}
          </span>
          <span className="font-body text-[0.9rem] text-kinome-grey">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="font-body text-[0.9rem] text-kinome-grey">
            · Par l&rsquo;équipe Kinome
          </span>
        </div>

        <h1 className="mb-6 font-heading text-[clamp(32px,4vw,56px)] font-normal leading-[1.1] text-kinome-black">
          {post.title}
        </h1>
        <p className="mb-10 font-body text-[clamp(17px,1.4vw,21px)] font-light leading-[1.6] text-kinome-grey">
          {post.description}
        </p>

        <div className="mb-12 overflow-hidden rounded-[20px] bg-white">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="block aspect-[16/9] w-full object-cover"
          />
        </div>
      </section>

      {/* Contenu HTML */}
      <article className="mx-auto max-w-[820px] px-[5%] pb-[100px]">
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.articleHtml }}
        />
      </article>

      {/* CTA */}
      <section className="mx-auto max-w-[820px] px-[5%] pb-[80px]">
        <div className="rounded-[24px] bg-kinome-dark p-10 text-center text-white">
          <h2 className="mb-4 font-heading text-[clamp(24px,2.5vw,36px)] font-normal leading-[1.2]">
            Vous avez un projet&nbsp;?
          </h2>
          <p className="mx-auto mb-8 max-w-[500px] font-body text-[1rem] font-light leading-[1.6] text-white/85">
            Discutons de vos enjeux et trouvons ensemble la meilleure
            approche pour votre identité ou votre site internet.
          </p>
          <Link
            href="/contact/"
            className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-white px-8 py-3 font-heading text-[0.95rem] font-semibold text-kinome-black transition-transform hover:scale-105"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      {/* Articles liés */}
      <section className="bg-white py-[100px]">
        <div className="mx-auto max-w-[1100px] px-[5%]">
          <h2 className="mb-12 text-center font-heading text-[clamp(28px,3vw,44px)] font-normal leading-[1.1] text-kinome-black">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="group block overflow-hidden rounded-[16px] bg-kinome-cream transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-white">
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-[1.05rem] font-semibold leading-[1.3] text-kinome-black group-hover:underline">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.85rem] text-kinome-grey">
                    {formatDate(p.date)}
                  </p>
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
