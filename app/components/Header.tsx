"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPath,
  getAlternateUrl,
  ROUTES,
  t,
} from "../lib/i18n";
import PortfolioMegaMenu from "./PortfolioMegaMenu";
import ServicesMegaMenu from "./ServicesMegaMenu";

/** Sous-liens services affichés dans le drawer mobile (FR uniquement : les
 *  landings service n'ont pas encore de version anglaise). */
const SERVICES_MOBILE = [
  { href: "/services/creation-logo/", label: "Création de logo" },
  { href: "/services/identite-visuelle/", label: "Identité visuelle" },
  { href: "/services/site-internet/", label: "Création de site internet" },
];

export default function Header() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPath(pathname);
  const r = ROUTES[locale];

  // Identifiant unique pour les liens du nav. Les `kind` en "mega-*" sont
  // traités spécialement plus bas (hover ouvre le mégamenu correspondant).
  // Le mégamenu services est FR seulement : côté /en/ les landings n'existent
  // pas encore, on garde donc un lien simple vers le hub anglais.
  const navLinks = [
    {
      href: r.services,
      label: t("nav_services", locale),
      kind: (locale === "fr" ? "mega-services" : "link") as
        | "mega-services"
        | "link",
    },
    {
      href: r.portfolio,
      label: t("nav_portfolio", locale),
      kind: "mega-portfolio" as const,
    },
    { href: r.process, label: t("nav_process", locale), kind: "link" as const },
    { href: r.blog, label: t("nav_blog", locale), kind: "link" as const },
    { href: r.partners, label: t("nav_partners", locale), kind: "link" as const },
    { href: r.about, label: t("nav_about", locale), kind: "link" as const },
  ];

  const isHome = pathname === r.home;
  const isProjet = pathname?.startsWith("/projets/") ?? false;
  const isServices =
    pathname === r.services || pathname === r.services.replace(/\/$/, "");
  const isHero = isHome || isProjet || isServices;

  const [scrolled, setScrolled] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ──────────── Mégamenu Portfolio (desktop uniquement) ────────────
  // Intent delay : on n'ouvre qu'après 120 ms de hover (évite l'ouverture
  // si le curseur ne fait que traverser le lien).
  // Close delay : 250 ms après leave, pour donner le temps de glisser dans
  // le panel sans qu'il se ferme bêtement.
  // `mega` porte l'identifiant du panel ouvert (ou null) : deux mégamenus
  // cohabitent désormais, passer d'un lien à l'autre doit basculer le panel
  // sans le refermer entre les deux.
  type MegaId = "services" | "portfolio";
  const [mega, setMega] = useState<MegaId | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearOpenTimer = () => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  };
  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMegaSoon = (id: MegaId) => {
    clearCloseTimer();
    clearOpenTimer();
    // Si un panel est déjà ouvert, on bascule immédiatement : l'utilisateur a
    // déjà exprimé son intention, réappliquer le délai ferait clignoter.
    if (mega !== null) {
      setMega(id);
      return;
    }
    openTimerRef.current = window.setTimeout(() => setMega(id), 120);
  };
  const scheduleCloseMega = () => {
    clearOpenTimer();
    closeTimerRef.current = window.setTimeout(() => setMega(null), 250);
  };
  const closeMegaNow = () => {
    clearOpenTimer();
    clearCloseTimer();
    setMega(null);
  };

  useEffect(() => {
    if (!isHero) return;
    const onScroll = () => setScrolled(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

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

  useEffect(() => {
    if (menuOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    // Fermer aussi le mégamenu au changement de page (sinon il reste ouvert
    // si on clique un lien depuis l'intérieur du panel).
    closeMegaNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cleanup des timers au démontage (évite des setState après unmount).
  useEffect(() => {
    return () => {
      clearOpenTimer();
      clearCloseTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = !isProjet || scrolled || mouseActive;
  const solid = !isHero || scrolled;

  // Retour mobile #134 Tanguy : sur les pages projet (et services), le hero
  // mobile a été refait en card carrée — pas de plein écran qui justifie un
  // header transparent. On force donc le header en mode "solid" sur mobile,
  // tout en gardant le comportement transparent classique en desktop.
  // forceMobileSolid = true → on applique bg-cream + texte noir sur mobile
  // via les classes Tailwind, et on remet lg:bg-transparent + lg:text-white
  // pour les vues desktop si on n'a pas encore scrollé.
  const forceMobileSolid = (isProjet || isServices) && !solid && !menuOpen;

  const altLocale: "fr" | "en" = locale === "fr" ? "en" : "fr";
  const altUrl = getAlternateUrl(pathname);
  const altLabel = altLocale.toUpperCase();

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[1000] transition-[opacity,transform,background-color,box-shadow] duration-500 ${
          forceMobileSolid
            ? // mobile = solid, desktop = transparent (sauf scroll)
              "bg-kinome-cream/95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur lg:bg-transparent lg:shadow-none lg:backdrop-blur-0"
            : solid || menuOpen
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
          <Link
            href={r.home}
            aria-label={locale === "fr" ? "Accueil Kinome" : "Kinome Home"}
            className="block"
          >
            <Image
              src="/assets/logo-kinome.svg"
              alt="Kinome"
              width={186}
              height={41}
              priority
              className={
                forceMobileSolid
                  ? "[filter:invert(1)] lg:[filter:none]"
                  : solid || menuOpen
                    ? "[filter:invert(1)]"
                    : ""
              }
            />
          </Link>

          {/* Nav desktop (lg+) */}
          <nav className="hidden items-center gap-9 font-body lg:flex">
            {navLinks.map((link) => {
              const megaId: MegaId | null =
                link.kind === "mega-portfolio"
                  ? "portfolio"
                  : link.kind === "mega-services"
                    ? "services"
                    : null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  // Sur les liens Services et Portfolio : hover déclenche le
                  // mégamenu (avec intent delay), leave planifie la fermeture.
                  // Le clic reste un lien classique vers la page de section.
                  onMouseEnter={megaId ? () => openMegaSoon(megaId) : undefined}
                  onMouseLeave={megaId ? scheduleCloseMega : undefined}
                  onFocus={megaId ? () => openMegaSoon(megaId) : undefined}
                  onBlur={megaId ? scheduleCloseMega : undefined}
                  aria-haspopup={megaId ? "true" : undefined}
                  aria-expanded={megaId ? mega === megaId : undefined}
                  className={`text-[0.95rem] font-medium transition-opacity hover:opacity-70 ${
                    solid ? "text-kinome-black" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Toggle FR/EN — pointe vers la même page dans l'autre langue */}
            <Link
              href={altUrl}
              hrefLang={altLocale}
              aria-label={t("nav_locale_label", locale)}
              title={t("nav_locale_label", locale)}
              className={`flex items-center gap-1.5 text-[0.95rem] font-medium transition-opacity hover:opacity-70 ${
                solid ? "text-kinome-black" : "text-white"
              }`}
            >
              {altLabel}
            </Link>

            <Link
              href={r.contact}
              className={`btn-fill-accent group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[0.9rem] font-semibold shadow-sm transition-[color,box-shadow] duration-300 hover:shadow-md hover:text-white ${
                solid
                  ? "bg-kinome-black text-white"
                  : "bg-white text-kinome-black"
              }`}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {t("nav_contact", locale)}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </nav>

          {/* Mobile : burger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={
              menuOpen
                ? locale === "fr"
                  ? "Fermer le menu"
                  : "Close menu"
                : locale === "fr"
                  ? "Ouvrir le menu"
                  : "Open menu"
            }
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
                  forceMobileSolid
                  ? "bg-kinome-black lg:bg-white"
                  : solid || menuOpen
                    ? "bg-kinome-black"
                    : "bg-white"
                } ${menuOpen ? "top-[8px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-[8px] h-[2.5px] w-full rounded transition-opacity duration-300 ${
                  forceMobileSolid
                  ? "bg-kinome-black lg:bg-white"
                  : solid || menuOpen
                    ? "bg-kinome-black"
                    : "bg-white"
                } ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-[2.5px] w-full rounded transition-all duration-300 ${
                  forceMobileSolid
                  ? "bg-kinome-black lg:bg-white"
                  : solid || menuOpen
                    ? "bg-kinome-black"
                    : "bg-white"
                } ${menuOpen ? "top-[8px] -rotate-45" : "top-[16px]"}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mégamenus (desktop uniquement, géré côté CSS via lg:block) */}
      {/* Services : monté en FR seulement, sinon son contenu français se
          retrouverait dans le DOM des pages anglaises. */}
      {locale === "fr" && (
        <ServicesMegaMenu
          open={mega === "services"}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleCloseMega}
          onClose={closeMegaNow}
        />
      )}
      <PortfolioMegaMenu
        open={mega === "portfolio"}
        locale={locale}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleCloseMega}
        onClose={closeMegaNow}
      />

      {/* Drawer menu mobile */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[999] lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-kinome-black/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

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
                  <span className="inline-flex w-full items-center justify-between gap-3">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="text-[1rem] text-kinome-grey transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>

                {/* Sous-niveau services : l'équivalent tactile du mégamenu,
                    sinon les landings ne sont atteignables que par le hub.
                    FR uniquement, comme le mégamenu. */}
                {link.kind === "mega-services" && locale === "fr" && (
                  <ul className="border-b border-kinome-black/10 py-2">
                    {SERVICES_MOBILE.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-2.5 pl-4 font-body text-[1rem] font-light text-kinome-grey transition-colors hover:text-kinome-accent"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {/* Toggle locale dans le drawer */}
            <li className="mt-4 pt-2">
              <Link
                href={altUrl}
                hrefLang={altLocale}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-kinome-black/15 px-4 py-2 font-body text-[0.85rem] font-medium text-kinome-grey hover:text-kinome-black"
              >
                <span aria-hidden="true">🌐</span>
                {locale === "fr" ? "View in English" : "Voir en français"}
              </Link>
            </li>
          </ul>

          <div className="border-t border-kinome-black/10 px-8 py-6">
            <Link
              href={r.contact}
              onClick={() => setMenuOpen(false)}
              className="btn-fill-accent mb-5 flex w-full items-center justify-center rounded-full bg-kinome-black px-6 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">
                {t("nav_contact", locale)}
              </span>
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
              <p>{locale === "fr" ? "Genève, Suisse" : "Geneva, Switzerland"}</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
