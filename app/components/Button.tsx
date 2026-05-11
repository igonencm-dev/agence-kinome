import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Bouton CTA Kinome — variantes avec animation « remplissage » au hover :
 *   • primary    : fond noir → se remplit en rouge accent au hover
 *   • secondary  : fond blanc → se remplit en noir au hover (texte → blanc)
 *   • outline    : border noir transparent → se remplit en noir (texte → blanc)
 *   • outline-white : border blanc transparent → se remplit en blanc (texte → noir)
 *
 * Repose sur les classes CSS .btn-fill-accent / -dark / -white définies
 * dans globals.css (pseudo-élément ::before qui scaleY de 0 à 1).
 */

import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-white";

type CommonProps = {
  variant?: Variant;
  /** Affiche une flèche → animée au hover (true par défaut). */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  // Fond noir → fill rouge. Texte reste blanc (lisible noir comme rouge).
  primary:
    "bg-kinome-black text-white btn-fill-accent shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
  // Fond blanc → fill noir. Texte passe de noir à blanc.
  secondary:
    "bg-white text-kinome-black btn-fill-dark hover:text-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]",
  // Border noir → fill noir. Texte passe de noir à blanc.
  outline:
    "border-2 border-kinome-black bg-transparent text-kinome-black btn-fill-dark hover:text-white",
  // Border blanc → fill blanc. Texte passe de blanc à noir.
  "outline-white":
    "border-2 border-white bg-transparent text-white btn-fill-white hover:text-kinome-black",
};

const BASE =
  "group inline-flex min-w-[260px] items-center justify-center gap-2 rounded-full px-8 py-4 font-heading text-[1rem] font-semibold transition-[color,box-shadow] duration-300 ease-out";

function renderContent(children: ReactNode, withArrow: boolean) {
  return (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </span>
  );
}

type ButtonAsLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;
type ButtonAsButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children">;

/** Bouton qui rend un <a> via next/link. */
export function ButtonLink({
  variant = "primary",
  withArrow = true,
  className = "",
  children,
  ...linkProps
}: ButtonAsLinkProps) {
  return (
    <Link
      className={`${BASE} ${variantClasses[variant]} ${className}`}
      {...linkProps}
    >
      {renderContent(children, withArrow)}
    </Link>
  );
}

/** Bouton qui rend un <button> natif. */
export function Button({
  variant = "primary",
  withArrow = true,
  className = "",
  children,
  ...buttonProps
}: ButtonAsButtonProps) {
  return (
    <button
      className={`${BASE} ${variantClasses[variant]} ${className}`}
      {...buttonProps}
    >
      {renderContent(children, withArrow)}
    </button>
  );
}
