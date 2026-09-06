"use client";

/**
 * Sommaire d'article : encart en tête de corps avec les ancres vers les H2.
 *
 * Ouvert par défaut sur tablette et desktop, replié sur mobile pour ne pas
 * repousser le début de la lecture (le choix du lecteur prime ensuite).
 * Les liens sont dans le HTML servi, donc visibles par Google (liens de
 * saut dans les résultats) et par les assistants IA.
 */

import { useState } from "react";
import type { EntreeSommaire } from "../lib/sommaire";

export default function Sommaire({ entrees }: { entrees: EntreeSommaire[] }) {
  // null = comportement par défaut (replié sur mobile, ouvert au-delà)
  const [ouvert, setOuvert] = useState<boolean | null>(null);

  if (entrees.length < 2) return null;

  const listeClasse =
    ouvert === null ? "max-md:hidden" : ouvert ? "" : "hidden";
  const chevronClasse =
    ouvert === null ? "md:rotate-180" : ouvert ? "rotate-180" : "";

  return (
    <nav
      aria-label="Sommaire de l'article"
      className="mb-10 rounded-[20px] bg-white p-5 md:p-6"
    >
      <button
        type="button"
        onClick={() =>
          setOuvert((o) =>
            o === null
              ? !window.matchMedia("(min-width: 768px)").matches
              : !o
          )
        }
        aria-controls="sommaire-article"
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
          Sommaire · {entrees.length} sections
        </span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-kinome-black transition-transform ${chevronClasse}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ol
        id="sommaire-article"
        className={`mt-4 grid list-decimal gap-x-8 gap-y-2 pl-5 marker:font-heading marker:font-semibold marker:text-kinome-accent md:grid-cols-2 ${listeClasse}`}
      >
        {entrees.map((e) => (
          <li key={e.id} className="pl-1">
            <a
              href={`#${e.id}`}
              className="font-body text-[0.95rem] leading-[1.45] text-kinome-black hover:text-kinome-accent hover:underline"
            >
              {e.texte}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
