"use client";

import Image from "next/image";
import Link from "next/link";
import { contact } from "../lib/contact";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/processus", label: "Notre processus" },
  { href: "/blog", label: "Blog" },
  { href: "/partenaires", label: "Nos Partenaires" },
  { href: "/a-propos", label: "À propos" },
];

export default function Footer() {
  return (
    <footer className="bg-kinome-dark px-[clamp(20px,5vw,70px)] py-[clamp(60px,8vw,80px)] text-kinome-cream">
      <div className="mx-auto grid max-w-[1588px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[auto_1fr_1fr_1fr]">
        <Link href="/" aria-label="Accueil Kinome" className="block">
          <Image
            src="/assets/logo-kinome.svg"
            alt="Kinome"
            width={156}
            height={34}
          />
        </Link>

        <div className="space-y-3 font-body text-[18px] font-light leading-[26px]">
          <p className="font-semibold">{contact.agency.name}</p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 font-body text-[18px] font-light leading-[26px]">
          <div>
            <p className="text-kinome-cream/60">Mathias</p>
            <p>
              <a
                href={`tel:${contact.phones.mathias.e164}`}
                className="hover:underline"
              >
                {contact.phones.mathias.display}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.emails.mathias}`}
                className="hover:underline"
              >
                {contact.emails.mathias}
              </a>
            </p>
          </div>
          <div className="pt-2">
            <p className="text-kinome-cream/60">Tanguy</p>
            <p>
              <a
                href={`tel:${contact.phones.tanguy.e164}`}
                className="hover:underline"
              >
                {contact.phones.tanguy.display}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.emails.tanguy}`}
                className="hover:underline"
              >
                {contact.emails.tanguy}
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-2 font-body text-[18px] font-light leading-[26px]">
          <p className="text-kinome-cream/60">Suivez-nous</p>
          <ul className="space-y-2">
            <li>
              <a
                href={contact.social.linkedinAgence}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn Kinome
              </a>
            </li>
            <li>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram Kinome
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1588px] flex-col items-start justify-between gap-4 border-t border-kinome-cream/10 pt-8 font-body text-[14px] font-light text-kinome-cream/60 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {contact.agency.name}. Tous droits
          réservés.
        </p>
        <nav
          aria-label="Liens légaux"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <Link
            href="/mentions-legales/"
            className="hover:text-kinome-cream hover:underline"
          >
            Mentions légales
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/politique-de-confidentialite/"
            className="hover:text-kinome-cream hover:underline"
          >
            Politique de confidentialité
          </Link>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-cookie-settings"))
            }
            className="cursor-pointer underline-offset-4 hover:text-kinome-cream hover:underline"
          >
            Gérer les cookies
          </button>
        </nav>
      </div>
    </footer>
  );
}
