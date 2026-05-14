/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projets, categoriesLabels } from "../lib/projets";
import Testimonials from "../components/Testimonials";

// Filtres exposés à l'UI. Ordre = ordre d'affichage des boutons. "branding"
// est désormais inclus (auparavant manquant alors qu'il existait dans le
// data), pour rester cohérent avec le mégamenu Portfolio.
const filtres = ["tous", "identite", "branding", "website", "campagne"] as const;
type Filtre = (typeof filtres)[number];

const filtreLabels: Record<Filtre, string> = {
  tous: "Tous",
  identite: "Identités",
  branding: "Branding",
  website: "Websites",
  campagne: "Campagnes",
};

const isValidFilter = (v: string | null): v is Filtre =>
  v !== null && (filtres as readonly string[]).includes(v);

export default function PortfolioPage() {
  const [actif, setActif] = useState<Filtre>("tous");

  // Pré-applique le filtre depuis ?filter=<cat> (le mégamenu envoie ces URLs).
  // Lu côté client après mount — pas de Suspense boundary nécessaire car
  // on évite useSearchParams (qui pose problème en export static).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const param = new URLSearchParams(window.location.search).get("filter");
    if (isValidFilter(param)) setActif(param);
  }, []);

  // Synchronise le filtre actif avec l'URL (sans navigation) pour qu'un
  // partage de lien reflète l'état courant.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (actif === "tous") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", actif);
    }
    window.history.replaceState({}, "", url.toString());
  }, [actif]);

  const liste =
    actif === "tous"
      ? projets
      : projets.filter((p) =>
          p.categories.includes(
            actif as Exclude<Filtre, "tous">
          )
        );

  return (
    <main className="px-[5%] pt-[180px] pb-[120px]">
      {/* Hero */}
      <section className="mx-auto max-w-[1400px]">
        {/* Retour #123 Tanguy : "Enlever le sur-titre". La 1ère ligne
            "Portfolio de l'agence" faisait doublon avec l'URL /portfolio/.
            H1 simplifié en une seule ligne, le mot-clé "portfolio" reste
            présent pour le SEO. */}
        <h1 className="mb-8 font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.05] text-kinome-black">
          Notre portfolio à Genève
        </h1>
        <p className="mb-10 max-w-[820px] font-body text-[1.4rem] font-light leading-[1.5] text-kinome-black">
          Identités visuelles, créations de logo, sites internet et campagnes :
          découvrez une sélection de projets récents menés depuis Genève pour
          des marques en Suisse romande, en France et à l&rsquo;international.
        </p>
        <Link
          href="/a-propos/"
          className="inline-flex min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Découvrir l&rsquo;équipe
        </Link>
      </section>

      {/* Filtres — couleur retour #94 : passer du gris froid #f2f2f2 au
          beige chaud #dfdbd0, cohérent avec la charte sable Kinome. */}
      <section className="mx-auto mt-24 max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filtres.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActif(f)}
              className={`min-w-[180px] rounded-full px-8 py-3 font-body text-[1.05rem] font-semibold transition-colors ${
                actif === f
                  ? "bg-kinome-black text-white"
                  : "bg-[#dfdbd0] text-kinome-black hover:bg-[#cbc6b8]"
              }`}
            >
              {filtreLabels[f]}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {liste.map((p) => (
            <Link
              key={p.slug}
              href={`/projets/${p.slug}/`}
              className="group block overflow-hidden rounded-[20px] bg-white shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.nom}
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Voile subtil + flèche au hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-kinome-black opacity-0 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  <span aria-hidden="true" className="font-heading text-[1.1rem]">→</span>
                </div>
              </div>
              <div className="px-6 py-5">
                <h3 className="mb-1 font-heading text-[1.3rem] font-semibold text-kinome-black">
                  {p.nom}
                </h3>
                <p className="mb-3 font-body text-[0.9rem] text-kinome-grey">
                  {p.resume}
                </p>
                <div className="flex flex-wrap gap-2 text-[0.78rem] font-medium text-kinome-grey">
                  {p.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[#e0ddd6] px-3 py-1"
                    >
                      {categoriesLabels[c]}
                    </span>
                  ))}
                  <span className="ml-auto">{p.annee}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {liste.length === 0 && (
          <p className="mt-16 text-center font-body text-kinome-grey">
            Aucun projet dans cette catégorie pour le moment.
          </p>
        )}

        <div className="mt-20 flex justify-center">
          <Link
            href="/contact/"
            className="inline-flex min-w-[300px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Découvrir d&rsquo;autres projets
          </Link>
        </div>
      </section>

      {/* Témoignages (composant partagé) */}
      <div className="-mx-[5%] mt-24">
        <Testimonials />
      </div>

      {/* Bloc contact bas de page (retour #95 : combler la zone vide avant
          le footer avec un CTA conversion).
          Retour mobile #124 Tanguy : passage en clair (cream + noir) au lieu
          de fond sombre, plus cohérent avec le reste de la page. */}
      <section className="-mx-[5%] mt-0 bg-kinome-cream px-[5%] py-[clamp(70px,10vw,120px)] text-center text-kinome-black">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
            Parlons de votre projet
          </p>
          <h2 className="mb-6 font-heading text-[clamp(28px,4.5vw,52px)] font-normal leading-[1.1]">
            Un nouveau projet à faire éclore&nbsp;?
          </h2>
          <p className="mx-auto mb-10 max-w-[680px] font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.6] text-kinome-grey">
            Branding, identité visuelle, site internet&nbsp;: racontez-nous
            votre projet, on revient vers vous sous 48 h avec une première
            piste de travail.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact/"
              className="btn-fill-accent group inline-flex min-w-[260px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,color] duration-300 hover:scale-105"
            >
              <span className="relative z-10">Vous avez un projet&nbsp;?</span>
            </Link>
            <Link
              href="/processus/"
              className="btn-fill-dark group inline-flex min-w-[260px] items-center justify-center rounded-full border-2 border-kinome-black bg-transparent px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
            >
              <span className="relative z-10">Notre processus</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
