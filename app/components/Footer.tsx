"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "../lib/contact";
import { getLocaleFromPath, ROUTES, t } from "../lib/i18n";
import ManageCookiesButton from "./ManageCookiesButton";

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPath(pathname);
  const r = ROUTES[locale];

  const navLinks = [
    { href: r.services, label: t("nav_services", locale) },
    { href: r.portfolio, label: t("nav_portfolio", locale) },
    { href: r.process, label: t("nav_process", locale) },
    { href: r.blog, label: t("nav_blog", locale) },
    { href: r.partners, label: t("nav_partners", locale) },
    { href: r.about, label: t("nav_about", locale) },
  ];

  return (
    <footer className="bg-kinome-dark px-[clamp(20px,5vw,70px)] py-[clamp(60px,8vw,80px)] text-kinome-cream">
      <div className="mx-auto grid max-w-[1588px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[auto_1fr_1fr_1fr]">
        <Link href={r.home} aria-label="Kinome" className="block">
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
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-0 overflow-hidden opacity-0 transition-[width,opacity] duration-300 group-hover:w-3 group-hover:opacity-100"
                  >
                    →
                  </span>
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
          <p className="text-kinome-cream/60">{t("footer_follow", locale)}</p>
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
          © {new Date().getFullYear()} {contact.agency.name}.{" "}
          {t("footer_rights", locale)}
        </p>
        <nav
          aria-label={locale === "fr" ? "Liens légaux" : "Legal links"}
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <Link
            href={r.legal}
            className="hover:text-kinome-cream hover:underline"
          >
            {t("footer_legal", locale)}
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href={r.privacy}
            className="hover:text-kinome-cream hover:underline"
          >
            {t("footer_privacy", locale)}
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href={r.pressKit}
            className="hover:text-kinome-cream hover:underline"
          >
            {t("footer_press_kit", locale)}
          </Link>
          <span aria-hidden="true">·</span>
          <ManageCookiesButton />
        </nav>
      </div>
    </footer>
  );
}
