/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projets, categoriesLabels } from "../../lib/projets";
import Testimonials from "../../components/Testimonials";
import ResponsiveBr from "../../components/ResponsiveBr";

// Filtres : "all" est l'UI English mais le mégamenu envoie les noms
// internes des catégories (identite, branding, website, campagne) ; on
// mappe au montage. Ajout de "branding" (manquant auparavant).
const filters = ["all", "identite", "branding", "website", "campagne"] as const;
type Filter = (typeof filters)[number];

const filterLabels: Record<Filter, string> = {
  all: "All",
  identite: "Identity",
  branding: "Branding",
  website: "Websites",
  campagne: "Campaigns",
};

// English labels for the category badges
const categoriesLabelsEn: Record<string, string> = {
  identite: "Identity",
  campagne: "Campaign",
  website: "Website",
  branding: "Branding",
};

const isValidFilter = (v: string | null): v is Filter =>
  v !== null && (filters as readonly string[]).includes(v);

export default function PortfolioEN() {
  const [active, setActive] = useState<Filter>("all");

  // Pré-applique le filtre depuis ?filter=<cat> (le mégamenu envoie ces URLs).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const param = new URLSearchParams(window.location.search).get("filter");
    if (isValidFilter(param)) setActive(param);
  }, []);

  // Synchronise le filtre actif avec l'URL (sans navigation).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (active === "all") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", active);
    }
    window.history.replaceState({}, "", url.toString());
  }, [active]);

  const list =
    active === "all"
      ? projets
      : projets.filter((p) =>
          p.categories.includes(active as Exclude<Filter, "all">)
        );

  return (
    <main className="px-[5%] pt-[clamp(120px,18vw,180px)] pb-[clamp(60px,12vw,120px)]">
      <section className="mx-auto max-w-[1400px]">
        <h1 className="mb-8 text-center font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black md:text-left">
          Portfolio of Kinome
          <ResponsiveBr />
          agency in Geneva
        </h1>
        <p className="mb-10 max-w-[820px] font-body text-[1.4rem] font-light leading-[1.5] text-kinome-black">
          Visual identities, logo creations, websites and campaigns: discover
          a selection of recent projects delivered from Geneva for brands in
          French-speaking Switzerland, France and internationally.
        </p>
        <Link
          href="/en/about/"
          className="btn-fill-accent mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105"
        >
          <span className="relative z-10">Meet the team</span>
        </Link>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`min-w-[180px] rounded-full px-8 py-3 font-body text-[clamp(15px,1.1vw,17px)] font-semibold transition-colors ${
                active === f
                  ? "bg-kinome-black text-white"
                  : "bg-[#f2f2f2] text-kinome-black hover:bg-[#e5e5e5]"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/en/projets/${p.slug}/`}
              className="group block overflow-hidden rounded-[20px] bg-white shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.nom}
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="px-6 py-5">
                <h3 className="mb-1 font-heading text-[1.3rem] font-semibold text-kinome-black">
                  {p.nom}
                </h3>
                <p className="mb-3 font-body text-[0.9rem] text-kinome-grey">
                  {p.resume_en ?? p.resume}
                </p>
                <div className="flex flex-wrap gap-2 text-[0.78rem] font-medium text-kinome-grey">
                  {p.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[#e0ddd6] px-3 py-1"
                    >
                      {categoriesLabelsEn[c] ?? categoriesLabels[c]}
                    </span>
                  ))}
                  <span className="ml-auto">{p.annee}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-16 text-center font-body text-kinome-grey">
            No projects in this category yet.
          </p>
        )}

        <div className="mt-20 flex justify-center">
          <Link
            href="/en/contact/"
            className="btn-fill-accent mx-auto md:mx-0 flex w-fit min-w-[300px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105"
          >
            <span className="relative z-10">Start your own project</span>
          </Link>
        </div>
      </section>

      <div className="-mx-[5%] mt-24">
        <Testimonials />
      </div>
    </main>
  );
}
