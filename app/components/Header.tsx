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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Sur la home : transparent au-dessus du hero vidéo (texte blanc),
  // puis solid/cream après scroll. Sur les autres pages : toujours solid/cream.
  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-500 ${
        solid
          ? "bg-kinome-cream/95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur"
          : "bg-transparent"
      }`}
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
