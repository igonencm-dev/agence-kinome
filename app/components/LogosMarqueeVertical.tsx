/* eslint-disable @next/next/no-img-element */

/**
 * Carrousel vertical de logos clients — variante de LogosMarquee
 * pensée pour la page contact (colonne verticale qui défile en boucle).
 *
 * Mêmes logos que la version horizontale (cohérence visuelle) mais
 * animation translateY pour un défilement bas → haut, infini.
 *
 * i18n : prop `locale` optionnelle pour l'aria-label uniquement (les logos
 * eux-mêmes sont des noms propres, pas traduits).
 */

import { t, type Locale } from "../lib/i18n";

const LOGOS = [
  { src: "/assets/wp/Logo-Codecircle.svg", alt: "Codecircle" },
  { src: "/assets/wp/Logo-Black-Sheep-Valley.svg", alt: "Black Sheep Valley" },
  { src: "/assets/wp/Logo-Le-Saint-Placide.svg", alt: "Le Saint Placide" },
  { src: "/assets/wp/Logo-Adapt-Project.svg", alt: "Adapt Project" },
  { src: "/assets/wp/Logo-La-Voyagist.svg", alt: "La Voyagiste" },
  { src: "/assets/wp/Logo-Cabinet-Faraday.svg", alt: "Cabinet Faraday" },
  { src: "/assets/wp/Logo-Alministratif.svg", alt: "Alministratif" },
  { src: "/assets/wp/Logo-Authentik-Peak.svg", alt: "Authentik Peak" },
];

function LogosColumn() {
  return (
    <div className="flex w-full flex-shrink-0 flex-col items-center gap-[clamp(40px,5vw,72px)] py-[clamp(40px,5vw,72px)]">
      {LOGOS.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="block max-h-[104px] w-auto max-w-[250px] flex-shrink-0 object-contain opacity-80 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
          loading="lazy"
        />
      ))}
    </div>
  );
}

type Props = {
  /** Hauteur visible du carrousel (px ou clamp), défaut 540 px. */
  height?: string;
  locale?: Locale;
};

export default function LogosMarqueeVertical({
  height = "clamp(420px,55vh,640px)",
  locale = "fr",
}: Props) {
  return (
    <section
      aria-label={t("logos_aria", locale)}
      className="relative overflow-hidden rounded-[24px] bg-kinome-cream"
      style={{ height }}
    >
      {/* Fade haut et bas pour adoucir l'entrée / sortie des logos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-kinome-cream to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-kinome-cream to-transparent"
      />

      <div className="anim-marquee-vertical flex h-max flex-col">
        <LogosColumn />
        <LogosColumn />
      </div>
    </section>
  );
}
