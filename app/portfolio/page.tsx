/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { projets, categoriesLabels } from "../lib/projets";
import Testimonials from "../components/Testimonials";

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
        <h1 className="mb-8 font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.05] text-kinome-black">
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
                <h3 className="mb-1 font-heading text-[1.3rem] font-semibold text-kinome-black transition-colors duration-300 group-hover:text-kinome-accent">
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

      {/* Témoignages (composant partagé) */}
      <div className="-mx-[5%] mt-24">
        <Testimonials />
      </div>
    </main>
  );
}
