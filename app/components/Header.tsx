"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services/", label: "Nos services" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/blog/", label: "Blog" },
  { href: "/partenaires/", label: "Partenaires" },
  { href: "/a-propos/", label: "À propos" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjet = pathname?.startsWith("/projets/") ?? false;

  // Pages avec un hero plein écran (image / vidéo) :
  // - Home : vidéo MP4 plein écran
  // - Pages projet : image hero plein écran
  // Sur ces pages, on veut un header transparent au start, qui s'opacifie au scroll.
  // Sur les pages projet uniquement, on veut aussi un comportement « auto-hide » :
  // le header disparaît si la souris reste immobile (pour ne pas masquer la photo).
  const isHero = isHome || isProjet;

  const [scrolled, setScrolled] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);

  // Détection du scroll (uniquement sur pages hero)
  useEffect(() => {
    if (!isHero) return;
    const onScroll = () => setScrolled(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

  // Détection du mouvement souris — uniquement sur pages projet (auto-hide)
  // La home garde le comportement scroll-only (sinon, animation gênante au start).
  useEffect(() => {
    if (!isProjet) return;
    let timeoutId: number;
    const onMove = () => {
      setMouseActive(true);
      window.clearTimeout(timeoutId);
      // Le header reste visible 3 secondes après le dernier mouvement
      timeoutId = window.setTimeout(() => setMouseActive(false), 3000);
    };
    const onTouchStart = () => onMove(); // support tactile
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchStart);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.clearTimeout(timeoutId);
    };
  }, [isProjet]);

  // Sur les pages projet : le header est visible si scrolled OU mouseActive
  // Sur la home : le header est toujours visible (juste son style change au scroll)
  // Sur les autres pages : toujours visible
  const visible = !isProjet || scrolled || mouseActive;

  // Le header est "solid" (fond cream) dès qu'on a scrollé ou qu'on n'est pas sur une hero page.
  const solid = !isHero || scrolled;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[1000] transition-[opacity,transform,background-color,box-shadow] duration-500 ${
        solid
          ? "bg-kinome-cream/95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur"
          : "bg-transparent"
      } ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[1728px] items-center justify-between px-[5%] py-4">
        <Link href="/" aria-label="Accueil Kinome" className="block">
          <Image
            src="/assets/logo-kinome.svg"
            alt="Kinome"
            width={186}
            height={41}
            priority
            className={solid ? "[filter:invert(1)]" : ""}
          />
        </Link>

        <nav className="hidden items-center gap-9 font-body lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.95rem] font-medium transition-opacity hover:opacity-70 ${
                solid ? "text-kinome-black" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            className={`flex items-center gap-1.5 text-[0.95rem] font-medium ${
              solid ? "text-kinome-black" : "text-white"
            }`}
            aria-label="Changer la langue"
          >
            EN
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            href="/contact/"
            className={`rounded-full px-6 py-2.5 text-[0.9rem] font-semibold transition-opacity hover:opacity-90 ${
              solid
                ? "bg-kinome-black text-white"
                : "bg-white text-kinome-black"
            }`}
          >
            Nous contacter
          </Link>
        </nav>

        {/* Mobile : juste le bouton contact */}
        <Link
          href="/contact/"
          className={`rounded-full px-5 py-2 text-[0.85rem] font-semibold lg:hidden ${
            solid ? "bg-kinome-black text-white" : "bg-white text-kinome-black"
          }`}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
