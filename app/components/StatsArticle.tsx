"use client";

/**
 * Vues et « j'aime » d'un article (compteurs servis par /api/stats.php).
 *
 * - variante "meta" : s'insère dans la ligne date · lecture, enregistre la
 *   vue (une fois par onglet grâce à sessionStorage, le serveur filtre aussi
 *   par IP) et affiche « n vues · n j'aime ».
 * - variante "fin" : encart de fin d'article avec le bouton J'aime.
 *
 * Les deux instances d'une même page partagent leurs compteurs via le bus
 * de app/lib/stats-client.ts, donc un clic en bas met à jour le haut.
 */

import { useCallback, useEffect, useState } from "react";
import {
  abonner,
  chargerUn,
  ecrireStockage,
  envoyer,
  formaterNombre,
  libelleVues,
  lireStockage,
  publier,
  type Compteurs,
} from "../lib/stats-client";

function useCompteurs(slug: string, enregistrerVue: boolean) {
  const [compteurs, setCompteurs] = useState<Compteurs | null>(null);
  const [aime, setAime] = useState(false);

  useEffect(() => {
    setAime(lireStockage(`kinome-jaime:${slug}`) === "1");
    const desabonner = abonner(slug, setCompteurs);

    let actif = true;
    const cleVue = `kinome-vue:${slug}`;
    let dejaVu = false;
    try {
      dejaVu = window.sessionStorage.getItem(cleVue) === "1";
    } catch {
      dejaVu = false;
    }

    const charger = async () => {
      let c: Compteurs | null = null;
      if (enregistrerVue && !dejaVu) {
        c = await envoyer(slug, "vue");
        try {
          window.sessionStorage.setItem(cleVue, "1");
        } catch {
          /* ignoré */
        }
      }
      if (!c) c = await chargerUn(slug);
      if (actif && c) publier(slug, c);
    };
    charger();

    return () => {
      actif = false;
      desabonner();
    };
  }, [slug, enregistrerVue]);

  const basculerJaime = useCallback(async () => {
    const prochain = !aime;
    setAime(prochain);
    ecrireStockage(`kinome-jaime:${slug}`, prochain ? "1" : null);
    if (compteurs) {
      publier(slug, {
        vues: compteurs.vues,
        jaime: Math.max(0, compteurs.jaime + (prochain ? 1 : -1)),
      });
    }
    const c = await envoyer(slug, prochain ? "jaime" : "retirer_jaime");
    if (c) publier(slug, c);
  }, [aime, compteurs, slug]);

  return { compteurs, aime, basculerJaime };
}

function Coeur({ plein }: { plein: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.05em] w-[1.05em] shrink-0"
      fill={plein ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.2 5 6.8 5c2 0 3.4 1.1 5.2 3 1.8-1.9 3.2-3 5.2-3 3.6 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

export default function StatsArticle({
  slug,
  variante,
}: {
  slug: string;
  variante: "meta" | "fin";
}) {
  const { compteurs, aime, basculerJaime } = useCompteurs(slug, variante === "meta");

  if (variante === "meta") {
    if (!compteurs) return null;
    return (
      <>
        <span className="font-body text-[0.88rem] text-kinome-grey">
          · {libelleVues(compteurs.vues)}
        </span>
        <span className="inline-flex items-center gap-1 font-body text-[0.88rem] text-kinome-grey">
          · <Coeur plein={aime} /> {formaterNombre(compteurs.jaime)}
        </span>
      </>
    );
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-white px-6 py-5 md:px-8">
      <div>
        <p className="font-heading text-[clamp(17px,1.3vw,20px)] font-semibold leading-[1.3] text-kinome-black">
          Cet article vous a été utile&nbsp;?
        </p>
        <p className="mt-1 font-body text-[0.9rem] font-light text-kinome-grey">
          {compteurs
            ? `${libelleVues(compteurs.vues)} · ${formaterNombre(compteurs.jaime)} j'aime`
            : "Un clic pour nous dire que ça vous a aidé."}
        </p>
      </div>
      <button
        type="button"
        onClick={basculerJaime}
        aria-pressed={aime}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-heading text-[0.9rem] font-semibold transition-all hover:scale-105 ${
          aime
            ? "bg-kinome-accent text-white"
            : "btn-fill-accent bg-kinome-black text-white"
        }`}
      >
        <Coeur plein={aime} />
        {aime ? "Merci !" : "J'aime"}
        {compteurs && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.8rem] tabular-nums">
            {formaterNombre(compteurs.jaime)}
          </span>
        )}
      </button>
    </div>
  );
}
