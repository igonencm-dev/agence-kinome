import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — Kinome",
  description:
    "Cette page n'existe pas ou a été déplacée. Découvrez nos services, notre portfolio ou contactez notre agence à Genève.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: "/", label: "Accueil" },
  { href: "/services/", label: "Nos services" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
      <div className="mx-auto max-w-[820px] text-center">
        {/* Glyphe 404 — gros, en accent cream */}
        <p
          aria-hidden="true"
          className="select-none font-heading text-[clamp(120px,20vw,260px)] font-bold leading-none text-kinome-accent/15"
        >
          404
        </p>

        <h1 className="mt-[-40px] mb-6 font-heading text-[clamp(32px,5vw,56px)] font-normal leading-[1.05] text-kinome-black">
          Cette page s&rsquo;est égarée
        </h1>

        <p className="mx-auto mb-12 max-w-[560px] font-body text-[clamp(16px,1.4vw,21px)] font-light leading-[1.55] text-kinome-grey">
          Le lien semble avoir bougé ou la page n&rsquo;existe plus. Pas de
          panique, voici par où repartir.
        </p>

        {/* CTAs principaux */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-fill-accent group inline-flex items-center gap-2 rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Retour à l&rsquo;accueil
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>

          <Link
            href="/contact/"
            className="btn-fill-dark group inline-flex items-center gap-2 rounded-full border-2 border-kinome-black bg-transparent px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-colors duration-300 hover:text-white"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Nous écrire
            </span>
          </Link>
        </div>

        {/* Liens utiles */}
        <div className="border-t border-[#e0ddd6] pt-10">
          <p className="mb-4 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-kinome-grey">
            Pages les plus consultées
          </p>
          <nav
            aria-label="Liens utiles"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-body text-[0.95rem]"
          >
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-kinome-black underline-offset-4 transition-colors hover:text-kinome-accent hover:underline"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
