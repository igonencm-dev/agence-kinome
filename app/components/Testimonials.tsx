/* eslint-disable @next/next/no-img-element */

/**
 * Bloc « Ils nous font confiance » — partagé par TOUTES les pages.
 *
 * Une seule source de vérité : modifier ce composant met à jour tous les
 * affichages (home, contact, portfolio, projets, a-propos, processus).
 *
 * Design : fond dark, image client centrée (max 480 px), citation italique,
 * nom + entreprise + 5 étoiles. Cohérent avec le reste de la marque.
 *
 * i18n : accepte une prop `locale` (server component). Si non fournie,
 * fallback FR. Les pages sous /en/ doivent passer `locale="en"`.
 */

import { t, type Locale } from "../lib/i18n";
import { type ProjetTestimonial } from "../lib/projets";

type TestimonialsProps = {
  /** Marge verticale standard (par défaut), ou compact pour pages denses. */
  variant?: "default" | "compact";
  locale?: Locale;
  /** Avis spécifique (ex. avis client d'une page projet). Sinon avis par défaut. */
  review?: ProjetTestimonial;
};

export default function Testimonials({
  variant = "default",
  locale = "fr",
  review: override,
}: TestimonialsProps) {
  // Avis par défaut — Manon Pichereau (La Voyagiste). Une page projet peut
  // fournir son propre avis client via la prop `review`.
  const review = override
    ? {
        image: override.image,
        alt: override.alt,
        quote:
          locale === "en"
            ? override.quote_en ?? override.quote
            : override.quote,
        name: override.name,
        company: override.company,
        rating: 5,
      }
    : {
        image: "/assets/wp/La-Voyagist-780x390px-1.png",
        alt: t("testimonials_voyagiste_alt", locale),
        quote: t("testimonials_voyagiste_quote", locale),
        name: "Manon Pichereau",
        company: "La Voyagiste",
        rating: 5,
      };

  const paddingClass =
    variant === "compact"
      ? "py-[clamp(50px,8vw,80px)]"
      : "py-[clamp(80px,12vw,140px)]";

  return (
    <section
      className={`bg-kinome-dark px-[5%] ${paddingClass} text-center text-white`}
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="mb-[clamp(36px,5vw,72px)] font-heading text-[clamp(28px,4vw,56px)] font-normal leading-[1.1]"
      >
        {t("testimonials_heading", locale)}
      </h2>
      <div className="mx-auto flex max-w-[900px] flex-col items-center">
        <img
          src={review.image}
          alt={review.alt}
          className="mb-[clamp(24px,3vw,40px)] block w-full max-w-[480px] rounded-[20px]"
          loading="lazy"
        />
        <blockquote className="mb-8 max-w-[820px] font-body text-[clamp(16px,1.3vw,20px)] font-light italic leading-[1.6]">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <div className="mb-1 font-heading text-[clamp(18px,1.5vw,24px)] font-semibold">
          {review.name}
        </div>
        <div className="mb-6 italic text-[#888]">{review.company}</div>
        <div
          aria-label={t("testimonials_rating_aria", locale).replace(
            "{n}",
            String(review.rating)
          )}
          className="text-[1.4rem] tracking-[5px]"
        >
          {"★".repeat(review.rating)}
        </div>
      </div>
    </section>
  );
}
