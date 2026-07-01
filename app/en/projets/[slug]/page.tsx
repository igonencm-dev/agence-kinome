/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projets, categoriesLabels } from "../../../lib/projets";
import Testimonials from "../../../components/Testimonials";
import {
  buildMetadata,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  jsonLdScript,
} from "../../../lib/seo";

type Params = Promise<{ slug: string }>;

// Mapping FR → EN pour les labels de catégories.
const categoriesLabelsEn: Record<keyof typeof categoriesLabels, string> = {
  identite: "Identities",
  campagne: "Campaigns",
  website: "Websites",
  branding: "Branding",
};

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const projet = projets.find((p) => p.slug === slug);
  if (!projet) return { title: "Project — Kinome" };
  return buildMetadata({
    title: `${projet.nom} — ${projet.domaine_en ?? "communication"} project`,
    description: projet.resume_en ?? projet.resume,
    path: `/en/projets/${projet.slug}/`,
    ogType: "article",
    ogImage: projet.cover,
    keywords: [
      projet.nom,
      projet.client,
      ...projet.categories.map((c) => categoriesLabelsEn[c]),
      "Agence Kinome project",
      "Geneva work",
    ],
  });
}

export default async function ProjetPageEN({ params }: { params: Params }) {
  const { slug } = await params;
  const projet = projets.find((p) => p.slug === slug);
  if (!projet) notFound();

  // Pseudo-shuffle déterministe basé sur le slug (cohérent côté FR/EN).
  const seed = projet.slug
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pseudoShuffle = <T,>(arr: T[]): T[] => {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = (seed * (i + 31)) % (i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const ownCats = new Set(projet.categories);
  const candidats = projets.filter((p) => p.slug !== projet.slug);
  const similaires = candidats.filter((p) =>
    p.categories.some((c) => ownCats.has(c))
  );
  const autres = pseudoShuffle([
    ...similaires,
    ...candidats.filter((p) => !similaires.includes(p)),
  ]).slice(0, 4);

  const heroImg = projet.heroImage ?? projet.cover;
  const projetUrl = `/en/projets/${projet.slug}/`;

  const ld = {
    creativeWork: creativeWorkJsonLd({
      name: projet.nom,
      description: projet.description_en ?? projet.description ?? projet.resume,
      image: projet.cover,
      url: projetUrl,
      client: projet.client,
      year: projet.annee,
      about: projet.categories.map((c) => categoriesLabelsEn[c]).join(", "),
    }),
    breadcrumb: breadcrumbJsonLd([
      { name: "Home", url: "/en/" },
      { name: "Portfolio", url: "/en/portfolio/" },
      { name: projet.nom, url: projetUrl },
    ]),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld.creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld.breadcrumb) }}
      />

      {/* Hero responsive identique à la version FR */}
      <section className="relative w-full overflow-hidden bg-kinome-cream">
        <div className="px-[5%] pt-[clamp(80px,10vw,100px)] pb-6 md:hidden">
          {/* Retour mobile #135 Tanguy : object-contain + padding pour
              que toutes les hero images (1920×1080) restent centrées dans
              le carré mobile, sans crop décalé. */}
          <div className="overflow-hidden rounded-[24px] aspect-square bg-kinome-cream p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <img
              src={heroImg}
              alt={projet.nom}
              className="block h-full w-full object-contain"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="relative hidden h-[100vh] min-h-[600px] overflow-hidden md:block">
          <img
            src={heroImg}
            alt={projet.nom}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,10vw,140px)]">
        <h1 className="mb-[clamp(40px,6vw,80px)] text-center font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black md:text-left">
          {projet.nom}
        </h1>

        <div className="grid grid-cols-1 gap-[clamp(32px,4vw,64px)] lg:grid-cols-[1fr_2fr]">
          <dl className="font-heading">
            <div className="mb-[clamp(24px,3vw,40px)]">
              <dt className="font-semibold text-[clamp(18px,1.5vw,26px)] text-kinome-black">
                Year
              </dt>
              <dd className="mt-2 font-light text-[clamp(16px,1.2vw,21px)] text-kinome-black">
                {projet.annee}
              </dd>
            </div>
            {(projet.domaine_en ?? projet.domaine) && (
              <div className="mb-[clamp(24px,3vw,40px)]">
                <dt className="font-semibold text-[clamp(18px,1.5vw,26px)] text-kinome-black">
                  Field
                </dt>
                <dd className="mt-2 font-light text-[clamp(16px,1.2vw,21px)] text-kinome-black">
                  {projet.domaine_en ?? projet.domaine}
                </dd>
              </div>
            )}
            {(projet.role_en ?? projet.role) && (
              <div>
                <dt className="font-semibold text-[clamp(18px,1.5vw,26px)] text-kinome-black">
                  Role
                </dt>
                <dd className="mt-2 font-light text-[clamp(16px,1.2vw,21px)] text-kinome-black">
                  {projet.role_en ?? projet.role}
                </dd>
              </div>
            )}
          </dl>

          <div>
            <h2 className="mb-6 font-heading text-[clamp(20px,2vw,32px)] font-semibold">
              Description
            </h2>
            <p className="font-body text-[clamp(16px,1.2vw,20px)] font-light leading-[1.6] text-kinome-black">
              {projet.description_en ?? projet.description ?? projet.resume_en ?? projet.resume}
            </p>
            {projet.caseStudyUrl && (
              <Link
                href={projet.caseStudyUrl}
                className="mt-8 inline-flex items-center gap-2 font-heading text-[clamp(15px,1.2vw,19px)] font-semibold text-kinome-accent underline-offset-4 hover:underline"
              >
                Read the full case study
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Galerie principale */}
      {projet.gallery && projet.gallery.length > 0 && (
        <section className="mx-auto max-w-[1588px] px-[5%]">
          <div className="flex flex-col gap-8">
            {projet.gallery.slice(0, 2).map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[20px] aspect-[16/9]"
              >
                <img
                  src={src}
                  alt={`${projet.nom} - visual ${i + 1}`}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section "point fort" */}
      {(projet.pointFortTitle_en ?? projet.pointFortTitle) && (
        <section className="mt-[clamp(60px,10vw,100px)] bg-kinome-cream px-[5%] py-[clamp(60px,10vw,120px)]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h2 className="mb-10 font-heading text-[clamp(28px,5vw,76px)] font-normal leading-[1.05]">
              {projet.pointFortTitle_en ?? projet.pointFortTitle}
            </h2>
            <p className="mx-auto max-w-[1100px] font-body text-[clamp(16px,1.3vw,21px)] font-light leading-[1.55] text-kinome-black">
              {projet.pointFortBody_en ?? projet.pointFortBody}
            </p>
            <h3 className="mt-[clamp(40px,6vw,80px)] mb-8 font-heading text-[clamp(24px,3.5vw,56px)] font-normal leading-[1.1]">
              Got an idea to bring to life?
            </h3>
            <Link
              href="/en/contact/"
              className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(15px,1.1vw,17px)] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              Tell us about your project
            </Link>
          </div>
        </section>
      )}

      {/* Galerie secondaire */}
      {projet.gallery && projet.gallery.length > 2 && (
        <section className="mx-auto max-w-[1588px] px-[5%] py-[clamp(60px,8vw,100px)]">
          <div className="flex flex-col gap-8">
            {projet.gallery.slice(2).map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[20px] aspect-[16/9]"
              >
                <img
                  src={src}
                  alt={`${projet.nom} - visual ${i + 3}`}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Site client */}
      {projet.siteUrl && (
        <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,8vw,100px)]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 font-heading text-[clamp(20px,2vw,30px)] font-semibold">
                Client website
              </h3>
              <a
                href={projet.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[clamp(16px,1.4vw,22px)] font-light text-kinome-black underline transition-opacity hover:opacity-70 break-words"
              >
                {projet.siteUrl.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        </section>
      )}

      <Testimonials locale="en" review={projet.testimonial} />

      {/* Projets similaires */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mb-12">
          <h2 className="font-heading text-[clamp(28px,3vw,48px)] font-normal leading-[1.1]">
            You may also like
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {autres.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/en/projets/${p.slug}/`}
              className="group block overflow-hidden rounded-[20px] aspect-[16/9] transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={p.cover}
                alt={p.nom}
                className="block h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/en/portfolio/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Discover our projects
          </Link>
        </div>
      </section>
    </main>
  );
}
