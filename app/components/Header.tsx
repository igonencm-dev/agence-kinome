"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services/", label: "Nos services" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/processus/", label: "Processus" },
  { href: "/blog/", label: "Blog" },
  { href: "/partenaires/", label: "Partenaires" },
  { href: "/a-propos/", label: "À propos" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjet = pathname?.startsWith("/projets/") ?? false;
  const isServices =
    pathname === "/services/" || pathname === "/services";

  // Pages avec un hero plein écran (image / vidéo) :
  // - Home : vidéo MP4 plein écran
  // - Services : vidéo scroll-driven
  // - Pages projet : image hero plein écran
  // Sur ces pages, le header est transparent au start, s'opacifie au scroll.
  // Sur les pages projet uniquement, comportement « auto-hide » au mouvement
  // souris pour ne pas masquer l'image.
  const isHero = isHome || isProjet || isServices;

  const [scrolled, setScrolled] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Détection du scroll sur les pages hero
  useEffect(() => {
    if (!isHero) return;
    const onScroll = () => setScrolled(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

  // Auto-hide uniquement sur pages projet (le header peut masquer la photo)
  useEffect(() => {
    if (!isProjet) return;
    let timeoutId: number;
    const onMove = () => {
      setMouseActive(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setMouseActive(false), 3000);
    };
    const onTouchStart = () => onMove();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchStart);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.clearTimeout(timeoutId);
    };
  }, [isProjet]);

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  // Ferme le menu mobile si on change de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const visible = !isProjet || scrolled || mouseActive;
  const solid = !isHero || scrolled;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[1000] transition-[opacity,transform,background-color,box-shadow] duration-500 ${
          solid || menuOpen
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
              className={solid || menuOpen ? "[filter:invert(1)]" : ""}
            />
          </Link>

          {/* Nav desktop (lg+) */}
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

          {/* Mobile : burger (toggle menu) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`relative block h-[18px] w-[26px] transition-transform duration-300 ${
                menuOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute left-0 h-[2.5px] w-full rounded transition-all duration-300 ${
                  solid || menuOpen ? "bg-kinome-black" : "bg-white"
                } ${menuOpen ? "top-[8px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-[8px] h-[2.5px] w-full rounded transition-opacity duration-300 ${
                  solid || menuOpen ? "bg-kinome-black" : "bg-white"
                } ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-[2.5px] w-full rounded transition-all duration-300 ${
                  solid || menuOpen ? "bg-kinome-black" : "bg-white"
                } ${menuOpen ? "top-[8px] -rotate-45" : "top-[16px]"}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Drawer menu mobile — full screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        className={`fixed inset-0 z-[999] lg:hidden ${
          menuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* Overlay sombre derrière */}
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-kinome-black/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panneau du menu */}
        <nav
          className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-kinome-cream pt-[88px] transition-transform duration-400 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-8 py-6">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                style={{
                  transitionDelay: menuOpen ? `${100 + i * 50}ms` : "0ms",
                }}
                className={`transition-[opacity,transform] duration-400 ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group block border-b border-kinome-black/10 py-5 font-heading text-[1.5rem] font-medium leading-[1.2] text-kinome-black transition-colors hover:text-kinome-accent"
                >
                  <span className="inline-flex items-center justify-between gap-3 w-full">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="text-[1rem] text-kinome-grey transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Contact + infos en bas du drawer */}
          <div className="border-t border-kinome-black/10 px-8 py-6">
            <Link
              href="/contact/"
              onClick={() => setMenuOpen(false)}
              className="mb-5 flex w-full items-center justify-center rounded-full bg-kinome-black px-6 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Nous contacter
            </Link>
            <div className="space-y-1 font-body text-[0.85rem] text-kinome-grey">
              <p>
                <a
                  href="mailto:contact@agence-kinome.ch"
                  className="hover:text-kinome-black"
                >
                  contact@agence-kinome.ch
                </a>
              </p>
              <p>Genève, Suisse</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
