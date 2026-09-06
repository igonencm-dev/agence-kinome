/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Articles populaires, classés d'après les vues réelles (/api/stats.php).
 *
 * Rendu serveur avec l'ordre de repli (Search Console) pour que les liens
 * existent dans le HTML livré à Google ; une fois les compteurs chargés, la
 * liste se reclasse (vues + 5 × j'aime) et affiche le nombre de vues.
 *
 * - "sidebar" : liste numérotée compacte (colonne droite des articles)
 * - "cartes"  : rangée de cartes avec image (page /blog/)
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ArticleResume } from "../lib/populaires";
import { chargerTous, libelleVues, type Compteurs } from "../lib/stats-client";

type Props = {
  articles: ArticleResume[];
  exclure?: string;
  limite?: number;
  variante: "sidebar" | "cartes";
  titre?: string;
};

export default function ArticlesPopulaires({
  articles,
  exclure,
  limite = 5,
  variante,
  titre = "Les plus lus",
}: Props) {
  const [stats, setStats] = useState<Record<string, Compteurs> | null>(null);

  useEffect(() => {
    let actif = true;
    chargerTous().then((s) => {
      if (actif) setStats(s);
    });
    return () => {
      actif = false;
    };
  }, []);

  const classement = useMemo(() => {
    const candidats = articles.filter((a) => a.slug !== exclure);
    if (!stats) return candidats.slice(0, limite);
    const score = (slug: string) => {
      const c = stats[slug];
      return c ? c.vues + 5 * c.jaime : 0;
    };
    return candidats
      .map((a, i) => ({ a, i, s: score(a.slug) }))
      .sort((x, y) => y.s - x.s || x.i - y.i)
      .slice(0, limite)
      .map((x) => x.a);
  }, [articles, exclure, limite, stats]);

  const vuesDe = (slug: string) => {
    const v = stats?.[slug]?.vues ?? 0;
    return v > 0 ? libelleVues(v) : null;
  };

  if (variante === "sidebar") {
    return (
      <nav aria-label={titre} className="rounded-[20px] bg-white p-6">
        <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
          {titre}
        </p>
        <ol className="space-y-3.5">
          {classement.map((a, i) => (
            <li key={a.slug} className="flex gap-3">
              <span className="w-5 shrink-0 font-heading text-[1rem] font-semibold leading-[1.35] text-kinome-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <Link
                  href={`/blog/${a.slug}/`}
                  className="line-clamp-2 font-heading text-[0.9rem] font-semibold leading-[1.35] text-kinome-black hover:text-kinome-accent"
                >
                  {a.title}
                </Link>
                {vuesDe(a.slug) && (
                  <span className="mt-0.5 block font-body text-[0.75rem] text-kinome-grey">
                    {vuesDe(a.slug)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {classement.map((a, i) => (
        <article key={a.slug} className="group flex flex-col">
          <Link
            href={`/blog/${a.slug}/`}
            aria-label={`Lire : ${a.title}`}
            className="relative mb-4 block overflow-hidden rounded-[16px] bg-white"
          >
            <img
              src={a.featuredImage}
              alt={a.title}
              width={1600}
              height={900}
              loading="lazy"
              className="block aspect-[16/9] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-kinome-black px-2.5 py-1 font-heading text-[0.72rem] font-semibold tabular-nums text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
          <h3 className="font-heading text-[clamp(15px,1.15vw,18px)] font-semibold leading-[1.3] text-kinome-black transition-colors group-hover:text-kinome-accent">
            <Link href={`/blog/${a.slug}/`} className="line-clamp-3">
              {a.title}
            </Link>
          </h3>
          {vuesDe(a.slug) && (
            <p className="mt-2 font-body text-[0.8rem] text-kinome-grey">{vuesDe(a.slug)}</p>
          )}
        </article>
      ))}
    </div>
  );
}
