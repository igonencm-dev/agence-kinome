/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Grille des articles du blog avec filtres par rubrique.
 *
 * Toutes les cartes sont dans le HTML livré au serveur (Google voit tout) ;
 * les puces filtrent côté client et synchronisent l'ancre de l'URL
 * (/blog/#seo) pour qu'un filtre soit partageable. Le nombre de vues
 * (api/stats.php) s'affiche sur chaque carte dès qu'il est connu.
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CategorieBlog } from "../lib/blog";
import { CATEGORIES } from "../lib/populaires";
import { chargerTous, libelleVues, type Compteurs } from "../lib/stats-client";

export type ArticleCarte = {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  dateAffichee: string;
  minutes: number;
  categorie: CategorieBlog;
};

type Filtre = "toutes" | CategorieBlog;

const ORDRE: CategorieBlog[] = ["identite", "site-web", "seo", "agence", "communication"];

function lireFiltreDepuisUrl(): Filtre {
  const h = window.location.hash.replace(/^#/, "");
  return (ORDRE as string[]).includes(h) ? (h as CategorieBlog) : "toutes";
}

export default function GrilleArticles({ articles }: { articles: ArticleCarte[] }) {
  const [filtre, setFiltre] = useState<Filtre>("toutes");
  const [stats, setStats] = useState<Record<string, Compteurs> | null>(null);

  useEffect(() => {
    setFiltre(lireFiltreDepuisUrl());
    const onHash = () => setFiltre(lireFiltreDepuisUrl());
    window.addEventListener("hashchange", onHash);
    let actif = true;
    chargerTous().then((s) => {
      if (actif) setStats(s);
    });
    return () => {
      actif = false;
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const choisir = (f: Filtre) => {
    setFiltre(f);
    const url = f === "toutes" ? window.location.pathname : `#${f}`;
    window.history.replaceState(null, "", url);
  };

  const compte = useMemo(() => {
    const c: Record<string, number> = {};
    for (const a of articles) c[a.categorie] = (c[a.categorie] ?? 0) + 1;
    return c;
  }, [articles]);

  const visibles = filtre === "toutes" ? articles : articles.filter((a) => a.categorie === filtre);

  const puce = (cle: Filtre, label: string, n: number) => {
    const actif = filtre === cle;
    return (
      <button
        key={cle}
        type="button"
        onClick={() => choisir(cle)}
        aria-pressed={actif}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-heading text-[0.82rem] font-semibold transition-colors ${
          actif
            ? "border-kinome-black bg-kinome-black text-white"
            : "border-[#e0ddd6] bg-white text-kinome-black hover:border-kinome-black"
        }`}
      >
        {label}
        <span className={`tabular-nums ${actif ? "text-white/70" : "text-kinome-grey"}`}>{n}</span>
      </button>
    );
  };

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2.5" role="group" aria-label="Filtrer par rubrique">
        {puce("toutes", "Tous les articles", articles.length)}
        {ORDRE.filter((c) => compte[c]).map((c) => puce(c, CATEGORIES[c], compte[c]))}
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visibles.map((post, i) => {
          const vues = stats?.[post.slug]?.vues ?? 0;
          return (
            <article key={post.slug} className="group flex flex-col">
              <Link
                href={`/blog/${post.slug}/`}
                aria-label={`Lire : ${post.title}`}
                className="mb-5 block overflow-hidden rounded-[18px] bg-white"
              >
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  width={1600}
                  height={900}
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </Link>

              <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.8rem]">
                <span className="font-heading font-semibold uppercase tracking-[0.06em] text-kinome-accent">
                  {CATEGORIES[post.categorie]}
                </span>
                <span aria-hidden="true" className="text-kinome-grey">
                  ·
                </span>
                <time dateTime={post.date} className="text-kinome-grey">
                  {post.dateAffichee}
                </time>
                <span aria-hidden="true" className="text-kinome-grey">
                  ·
                </span>
                <span className="text-kinome-grey">{post.minutes} min</span>
                {vues > 0 && (
                  <>
                    <span aria-hidden="true" className="text-kinome-grey">
                      ·
                    </span>
                    <span className="text-kinome-grey">{libelleVues(vues)}</span>
                  </>
                )}
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
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}
