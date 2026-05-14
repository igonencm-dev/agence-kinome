/* eslint-disable @next/next/no-img-element */

/**
 * Bloc « Ils nous font confiance » — partagé par TOUTES les pages.
 *
 * Une seule source de vérité : modifier ce composant met à jour tous les
 * affichages (home, contact, portfolio, projets, a-propos, processus).
 *
 * Design : fond dark, image client centrée (max 480 px), citation italique,
 * nom + entreprise + 5 étoiles. Cohérent avec le reste de la marque.
 */

type TestimonialsProps = {
  /** Marge verticale standard (par défaut), ou compact pour pages denses. */
  variant?: "default" | "compact";
};

const reviews = [
  {
    image: "/assets/wp/La-Voyagist-780x390px-1.png",
    alt: "La Voyagiste — projet identité visuelle",
    quote:
      "Très belle expérience pour la création du logo de mon agence, de sa charte graphique et des différents éléments de communication réalisés tout au long de l'année. Une équipe créative, à l'écoute et toujours avant-gardiste. Je les recommande fortement.",
    name: "Manon Pichereau",
    company: "La Voyagiste",
    rating: 5,
  },
];

export default function Testimonials({
  variant = "default",
}: TestimonialsProps) {
  const review = reviews[0];
  const paddingClass =
    variant === "compact"
      ? "py-[80px]"
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
        Ils nous font confiance
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
          aria-label={`Note ${review.rating} sur 5`}
          className="text-[1.4rem] tracking-[5px]"
        >
          {"★".repeat(review.rating)}
        </div>
      </div>
    </section>
  );
}
