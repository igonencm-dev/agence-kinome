/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projets, categoriesLabels } from "../../lib/projets";
import {
  buildMetadata,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  jsonLdScript,
} from "../../lib/seo";

type Params = Promise<{ slug: string }>;

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
  if (!projet) return { title: "Projet — Kinome" };
  // Description : on privilégie `resume` (court, calibré 140-160 char) plutôt
  // que `description` (souvent 500+ char tronqués au milieu d'un mot).
  return buildMetadata({
    title: `${projet.nom} — projet ${projet.domaine ?? "communication"}`,
    description: projet.resume,
    path: `/projets/${projet.slug}/`,
    ogType: "article",
    ogImage: projet.cover,
    keywords: [
      projet.nom,
      projet.client,
      ...projet.categories.map((c) => categoriesLabels[c]),
      "projet agence Kinome",
      "réalisation Genève",
    ],
  });
}

export default async function ProjetPage({ params }: { params: Params }) {
  const { slug } = await params;
  const projet = projets.find((p) => p.slug === slug);
  if (!projet) notFound();

  const autres = projets.filter((p) => p.slug !== projet.slug).slice(0, 4);
  const heroImg = projet.heroImage ?? projet.cover;
  const projetUrl = `/projets/${projet.slug}/`;

  // JSON-LD : CreativeWork + BreadcrumbList pour cette page projet.
  const ld = {
    creativeWork: creativeWorkJsonLd({
      name: projet.nom,
      description: projet.description ?? projet.resume,
      image: projet.cover,
      url: projetUrl,
      client: projet.client,
      year: projet.annee,
      about: projet.categories.map((c) => categoriesLabels[c]).join(", "),
    }),
    breadcrumb: breadcrumbJsonLd([
      { name: "Accueil", url: "/" },
      { name: "Portfolio", url: "/portfolio/" },
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

      {/* Hero plein écran */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt={projet.nom}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      {/* Bloc intro : titre + métadonnées + description */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[140px]">
        <h1 className="mb-16 font-heading text-[6rem] font-normal leading-[1] sm:text-[3.5rem]">
          {projet.nom}
        </h1>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <dl className="font-heading">
            <div className="mb-10">
              <dt className="font-semibold text-[1.6rem] text-kinome-black">
                Année
              </dt>
              <dd className="mt-2 font-light text-[1.3rem] text-kinome-black">
                {projet.annee}
              </dd>
            </div>
            {projet.domaine && (
              <div className="mb-10">
                <dt className="font-semibold text-[1.6rem] text-kinome-black">
                  Domaine
                </dt>
                <dd className="mt-2 font-light text-[1.3rem] text-kinome-black">
                  {projet.domaine}
                </dd>
              </div>
            )}
            {projet.role && (
              <div>
                <dt className="font-semibold text-[1.6rem] text-kinome-black">
                  Rôle
                </dt>
                <dd className="mt-2 font-light text-[1.3rem] text-kinome-black">
                  {projet.role}
                </dd>
              </div>
            )}
          </dl>

          <div>
            <h2 className="mb-6 font-heading text-[1.8rem] font-semibold">
              Description
            </h2>
            <p className="font-body text-[1.25rem] font-light leading-[1.5] text-kinome-black">
              {projet.description ?? projet.resume}
            </p>
          </div>
        </div>
      </section>

      {/* Galerie principale (2 grandes images si disponibles) */}
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
                  alt={`${projet.nom} - visuel ${i + 1}`}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section "point fort" / graphisme avec goût (sur fond cream) */}
      {projet.pointFortTitle && (
        <section className="mt-[100px] bg-kinome-cream px-[5%] py-[120px]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h2 className="mb-10 font-heading text-[6rem] font-normal leading-[1.05] sm:text-[3rem]">
              {projet.pointFortTitle}
            </h2>
            <p className="mx-auto max-w-[1100px] font-body text-[1.3rem] font-light leading-[1.5] text-kinome-black">
              {projet.pointFortBody}
            </p>
            <h3 className="mt-20 mb-8 font-heading text-[3.5rem] font-normal leading-[1.1] sm:text-[2.2rem]">
              Vous souhaitez concrétiser une idée&nbsp;?
            </h3>
            <Link
              href="/contact/"
              className="inline-flex min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-10 py-4 font-heading text-[1.05rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              Racontez-nous votre projet
            </Link>
          </div>
        </section>
      )}

      {/* Galerie secondaire (3 images suivantes) */}
      {projet.gallery && projet.gallery.length > 2 && (
        <section className="mx-auto max-w-[1588px] px-[5%] py-[100px]">
          <div className="flex flex-col gap-8">
            {projet.gallery.slice(2).map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[20px] aspect-[16/9]"
              >
                <img
                  src={src}
                  alt={`${projet.nom} - visuel ${i + 3}`}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Site client + crédit */}
      {projet.siteUrl && (
        <section className="mx-auto max-w-[1400px] px-[5%] py-[100px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 font-heading text-[1.8rem] font-semibold">
                Site internet du client
              </h3>
              <a
                href={projet.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[1.4rem] font-light text-kinome-black underline transition-opacity hover:opacity-70"
              >
                {projet.siteUrl.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Témoignages dark (Ils nous font confiance) */}
      <section className="bg-kinome-dark px-[5%] py-[120px] text-center text-white">
        <h2 className="mb-12 font-heading text-[3.5rem] font-normal">
          Ils nous font confiance
        </h2>
        <div className="mx-auto flex max-w-[1100px] flex-col items-center">
          <img
            src="/assets/wp/La-Voyagist-780x390px-1.png"
            alt="La Voyagiste"
            className="mb-8 max-w-[480px] w-full rounded-[20px]"
          />
          <p className="mb-8 max-w-[900px] font-body text-[1.15rem] font-light italic leading-[1.6]">
            &ldquo;Très belle expérience pour la création du logo de mon
            agence, de sa charte graphique et des différents éléments de
            communication réalisés tout au long de l&rsquo;année. Une équipe
            créative, à l&rsquo;écoute et toujours avant-gardiste. Je les
            recommande fortement.&rdquo;
          </p>
          <div className="mb-1 font-heading text-[1.4rem] font-semibold">
            Manon Pichereau
          </div>
          <div className="mb-6 italic text-[#888]">La Voyagiste</div>
          <div className="text-[1.4rem] tracking-[5px]">★★★★★</div>
        </div>
      </section>

      {/* Autres projets */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[120px]">
        <div className="mb-12 flex items-end justify-between gap-8">
          <h2 className="font-heading text-[3rem] font-normal leading-[1.1]">
            D&rsquo;autres projets
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {autres.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/projets/${p.slug}/`}
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
            href="/portfolio/"
            className="inline-flex min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Découvrir nos projets
          </Link>
        </div>
      </section>
    </main>
  );
}
