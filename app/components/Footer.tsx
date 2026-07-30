"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "../lib/contact";
import { getLocaleFromPath, ROUTES, t } from "../lib/i18n";
import ManageCookiesButton from "./ManageCookiesButton";
import WhatsAppLink from "./WhatsAppLink";

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
            <p>
              <WhatsAppLink
                emplacement="footer"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[1em] w-[1em] shrink-0"
                >
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Z" />
                </svg>
                WhatsApp
              </WhatsAppLink>
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
