/* eslint-disable @next/next/no-img-element */

/**
 * Pictogrammes services Kinome — version PNG (livrée par Tanguy, mai 2026).
 *
 * Style : tracé noir sur fond transparent, avec petits "+" décoratifs.
 * Chaque fichier vit dans /assets/picto/<slug>.{webp,png} (512×512 px).
 *
 * Inversion automatique au hover : quand le parent ".group" passe en fond
 * sombre (cartes services /a-propos), filter:invert(1) bascule le trait
 * noir en blanc pour rester lisible.
 */

export type ServiceIconName =
  | "impression"
  | "illustration"
  | "chatbot"
  | "video"
  | "pictogramme"
  | "site-interactif"
  | "affiche"
  | "pdf-interactif"
  | "one-pager"
  | "reseaux-sociaux"
  | "photographie"
  | "campagne"
  // Nouvelles icônes livrées avec le batch mai 2026 — pensées pour les
  // étapes du processus (signature de devis, démarrage de projet).
  | "signature-contrat"
  | "projet";

type Props = {
  name: ServiceIconName;
  className?: string;
  /** Si true, inverse en blanc dès le rendu (utile sur fond foncé sans hover). */
  invertDefault?: boolean;
};

export default function ServiceIcon({
  name,
  className,
  invertDefault = false,
}: Props) {
  const cls =
    className ??
    `block h-full w-full object-contain transition-[filter] duration-300 ${
      invertDefault ? "invert" : "group-hover:invert"
    }`;

  return (
    <picture>
      <source type="image/webp" srcSet={`/assets/picto/${name}.webp`} />
      <img
        src={`/assets/picto/${name}.png`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={cls}
      />
    </picture>
  );
}
