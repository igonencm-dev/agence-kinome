/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { projets, categoriesLabels } from "../lib/projets";

const filtres = ["tous", "identite", "campagne", "website"] as const;
type Filtre = (typeof filtres)[number];

const filtreLabels: Record<Filtre, string> = {
  tous: "Tous",
  identite: "Identités",
  campagne: "Campagnes",
  website: "Websites",
};

export default function PortfolioPage() {
  const [actif, setActif] = useState<Filtre>("tous");

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
        <h1 className="mb-8 font-heading text-[5.5rem] font-normal leading-[1.05]">
          Portfolio de l&rsquo;agence
          <br />
          Kinome à Genève
        </h1>
        <p className="mb-10 max-w-[820px] font-body text-[1.4rem] font-light leading-[1.5] text-kinome-black">
          Identités visuelles, créations de logo, sites internet et campagnes :
          découvrez une sélection de projets récents menés depuis Genève pour
          des marques en Suisse romande, en France et à l&rsquo;international.
        </p>
        <Link
          href="/a-propos/"
          className="inline-flex min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Découvrir l&rsquo;équipe
        </Link>
      </section>

      {/* Filtres */}
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
                  : "bg-[#f2f2f2] text-kinome-black hover:bg-[#e5e5e5]"
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
              className="group block overflow-hidden rounded-[20px] bg-white shadow-sm transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.nom}
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
            className="inline-flex min-w-[300px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Découvrir d&rsquo;autres projets
          </Link>
        </div>
      </section>

      {/* Témoignages dark (Ils nous font confiance) */}
      <section className="-mx-[5%] mt-24 bg-kinome-dark px-[5%] py-[120px] text-center text-white">
        <h2 className="mb-16 font-heading text-[3.5rem] font-normal">
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
    </main>
  );
}
