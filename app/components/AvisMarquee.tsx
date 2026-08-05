/**
 * Bande d'avis clients défilants — retour Pastel #189 de Tanguy sur la page
 * « Création de site internet » : remplacer l'avis unique statique par un
 * défilement de commentaires.
 *
 * Même mécanique que LogosMarquee : piste dupliquée + translation de -50 %
 * en boucle (keyframe marquee-scroll). Le défilement se met en pause au
 * survol et reste figé si l'utilisateur préfère réduire les animations.
 *
 * Seuls des avis clients réels figurent ici ; en ajouter un = compléter AVIS.
 */

const AVIS = [
  {
    quote:
      "Un grand merci à Tanguy, de l'agence Kinome, qui m'a accompagnée et guidée dans la création de l'image de mon cabinet d'odontologie pédiatrique. Disponible, efficace, patient et passionné, il possède toutes les qualités nécessaires pour aider à faire aboutir un projet de création.",
    name: "Dre Esther Attal Surman",
    company: "Cabinet Faraday",
  },
  {
    quote:
      "Très belle expérience pour la création du logo de mon agence, de sa charte graphique et des différents éléments de communication réalisés tout au long de l'année. Une équipe créative, à l'écoute et toujours avant-gardiste. Je les recommande fortement.",
    name: "Manon Pichereau",
    company: "La Voyagiste",
  },
];

function Etoiles() {
  return (
    <div
      className="flex gap-1 text-kinome-accent"
      role="img"
      aria-label="5 étoiles sur 5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function PisteAvis() {
  return (
    <div className="flex w-max flex-shrink-0 items-stretch gap-[clamp(20px,2.5vw,36px)] px-[clamp(10px,1.25vw,18px)]">
      {AVIS.map((a) => (
        <figure
          key={a.name}
          className="flex w-[min(82vw,540px)] flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-[clamp(28px,3vw,44px)] shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        >
          <blockquote className="font-body text-[clamp(15px,1.4vw,17px)] font-light italic leading-[1.6] text-kinome-black">
            «&nbsp;{a.quote}&nbsp;»
          </blockquote>
          <figcaption className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-[1rem] font-semibold text-kinome-black">
                {a.name}
              </p>
              <p className="font-body text-[0.875rem] font-light text-kinome-grey">
                {a.company}
              </p>
            </div>
            <Etoiles />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function AvisMarquee() {
  return (
    <section className="overflow-hidden bg-kinome-cream py-[clamp(60px,9vw,110px)]">
      <div className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[1588px] px-[5%]">
        <h2 className="font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.14] text-kinome-black">
          Ils nous font confiance
        </h2>
      </div>
      {/* Piste dupliquée : la première moitié sort de l'écran pendant que la
          seconde la remplace, d'où la translation de -50 % en boucle. */}
      <div
        className="anim-marquee flex w-max hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
        style={{ animationDuration: "46s" }}
      >
        <PisteAvis />
        <PisteAvis />
        <PisteAvis />
        <PisteAvis />
      </div>
    </section>
  );
}
