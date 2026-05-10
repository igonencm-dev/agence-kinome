import Image from "next/image";
import Link from "next/link";
import { contact } from "../lib/contact";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/partenaires", label: "Nos Partenaires" },
  { href: "/services", label: "Services" },
];

export default function Footer() {
  return (
    <footer className="bg-kinome-dark px-[70px] py-20 text-kinome-cream">
      <div className="mx-auto grid max-w-[1588px] grid-cols-[auto_1fr_1fr_1fr] gap-12">
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

      <div className="mx-auto mt-16 max-w-[1588px] border-t border-kinome-cream/10 pt-8 font-body text-[14px] font-light text-kinome-cream/60">
        <p>
          © {new Date().getFullYear()} {contact.agency.name}. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
}
