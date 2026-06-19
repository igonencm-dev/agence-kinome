import type { Metadata } from "next";
import CcifsLeadForm from "./CcifsLeadForm";
import { buildMetadata } from "../lib/seo";

/**
 * Landing page de campagne, flyer CCIFS (Chambre de commerce France-Suisse).
 * Objectif unique : convertir un scan QR en prise de RDV (diagnostic offert 30 min).
 * NOINDEX : page de campagne, pas de référencement organique souhaité.
 * Pas ajoutée au sitemap (cf. app/sitemap.ts).
 */
export const metadata: Metadata = buildMetadata({
  title: "Réussir son implantation en Suisse, Diagnostic offert | Kinome",
  description:
    "Entrepreneur français qui s'implante en Suisse ? Agence de communication fondée par des Français à Genève. Diagnostic stratégique offert de 30 minutes.",
  path: "/implantation-suisse/",
  bareTitle: true,
  noIndex: true,
});

const VALEURS = [
  {
    titre: "Visibilité",
    texte:
      "Être trouvé par vos futurs clients suisses, sur Google comme dans les réponses des IA.",
    icon: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    titre: "Image & confiance",
    texte:
      "Une marque qui inspire confiance sur un marché suisse exigeant sur la qualité.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    titre: "Efficacité",
    texte:
      "Des actions de com qui servent vos objectifs business, pas de la décoration.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
  },
  {
    titre: "Opportunités IA",
    texte:
      "Tirer parti de l'IA pour communiquer plus vite et plus malin, sans perdre votre singularité.",
    icon: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
      </>
    ),
  },
];

const DIAGNOSTIC = [
  "Vos opportunités de visibilité sur le marché suisse",
  "Les points de blocage qui freinent votre implantation",
  "Vos priorités digitales (site, SEO, image de marque)",
  "Les gains concrets possibles grâce à l'IA",
];

export default function ImplantationSuissePage() {
  return (
    <main className="bg-kinome-cream text-kinome-black">
      {/* ===================== HERO ===================== */}
      <section className="px-[6%] pt-[clamp(96px,22vw,150px)] pb-[clamp(40px,9vw,72px)]">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-block rounded-full bg-kinome-accent px-4 py-1.5 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white">
            CCIFS · Diagnostic offert
          </span>

          <h1 className="mt-6 font-heading text-[clamp(30px,8vw,52px)] font-normal leading-[1.08]">
            Bien communiquer pour réussir votre implantation en Suisse
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] font-body text-[clamp(16px,4.2vw,20px)] font-light leading-[1.5] text-[#3a3a3a]">
            Vous venez de découvrir notre guide à la CCIFS&nbsp;? Allons plus
            loin ensemble.
          </p>

          <p className="mx-auto mt-4 max-w-[560px] font-body text-[clamp(14px,3.7vw,16px)] font-light leading-[1.6] text-kinome-grey">
            Kinome est une agence de communication{" "}
            <strong className="font-semibold text-kinome-black">
              fondée par des Français installés à Genève
            </strong>
            . On connaît les deux marchés, on fait le pont entre votre culture
            d&rsquo;origine et les codes suisses.
          </p>

          <div className="mt-8">
            <a
              href="#form"
              className="inline-flex w-full max-w-[400px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[clamp(16px,4.4vw,18px)] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
            >
              Réserver mon diagnostic offert →
            </a>
            <p className="mt-3 font-body text-[0.85rem] font-light text-kinome-grey">
              30 min · sans engagement · réponse sous 24&nbsp;h
            </p>
          </div>
        </div>
      </section>

      {/* ===================== VALEUR (scannable) ===================== */}
      <section className="px-[6%] pb-[clamp(36px,8vw,64px)]">
        <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-4 sm:grid-cols-2">
          {VALEURS.map((v) => (
            <div
              key={v.titre}
              className="flex items-start gap-4 rounded-[18px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-kinome-accent">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {v.icon}
                </svg>
              </span>
              <div className="min-w-0">
                <h2 className="font-heading text-[1.05rem] font-semibold leading-tight">
                  {v.titre}
                </h2>
                <p className="mt-1 font-body text-[0.92rem] font-light leading-[1.5] text-kinome-grey">
                  {v.texte}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== L'OFFRE ===================== */}
      <section className="px-[6%] pb-[clamp(40px,9vw,72px)]">
        <div className="mx-auto max-w-[720px] rounded-[24px] border border-[#e6e2d9] bg-white p-[clamp(24px,6vw,48px)]">
          <p className="font-heading text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-kinome-accent">
            Offert · 30 minutes
          </p>
          <h2 className="mt-3 font-heading text-[clamp(24px,6vw,38px)] font-normal leading-[1.12]">
            Votre diagnostic stratégique offert
          </h2>
          <p className="mt-4 font-body text-[clamp(15px,4vw,17px)] font-light leading-[1.6] text-kinome-grey">
            Un échange concret de 30 minutes (visio ou téléphone) pour
            identifier ensemble&nbsp;:
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {DIAGNOSTIC.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 flex-shrink-0 text-kinome-accent"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-body text-[clamp(15px,4vw,17px)] leading-[1.5] text-kinome-black">
                  {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-[0.92rem] font-light leading-[1.6] text-kinome-grey">
            Repartez avec une vision claire de vos prochaines actions, que vous
            travailliez avec nous ou non.
          </p>
        </div>
      </section>

      {/* ===================== FORMULAIRE ===================== */}
      <section
        id="form"
        className="scroll-mt-[90px] px-[6%] pb-[clamp(56px,12vw,110px)]"
      >
        <div className="mx-auto max-w-[560px]">
          <CcifsLeadForm />
        </div>
      </section>
    </main>
  );
}
