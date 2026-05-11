import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Bouton CTA Kinome — 3 variantes cohérentes avec micro-interactions :
 *  - primary    : fond noir, texte blanc (CTA principal)
 *  - secondary  : fond blanc, texte noir (CTA sur fond sombre)
 *  - outline    : border noir, texte noir (action secondaire sur fond clair)
 *
 * Effets au hover :
 *  - Scale 1.03 + ombre douce
 *  - Flèche → translateX +4px
 *  - Transition cubic-bezier
 */

type Variant = "primary" | "secondary" | "outline" | "outline-white";

type CommonProps = {
  variant?: Variant;
  /** Affiche une flèche → animée au hover (true par défaut). */
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-kinome-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:bg-[#1d1d1d] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
  secondary:
    "bg-white text-kinome-black shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:bg-kinome-cream hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]",
  outline:
    "border-2 border-kinome-black bg-transparent text-kinome-black hover:bg-kinome-black hover:text-white",
  "outline-white":
    "border-2 border-white bg-transparent text-white hover:bg-white hover:text-kinome-black",
};

const BASE =
  "group inline-flex min-w-[260px] items-center justify-center gap-2 rounded-full px-8 py-4 font-heading text-[1rem] font-semibold transition-[transform,background-color,color,box-shadow] duration-300 ease-out hover:scale-[1.03] focus-visible:scale-[1.03]";

function renderContent(children: React.ReactNode, withArrow: boolean) {
  return (
    <>
      <span>{children}</span>
      {withArrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
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
