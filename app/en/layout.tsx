import type { Metadata } from "next";
import { SITE } from "../lib/seo";

/**
 * Layout EN — surcharge la metadata par défaut pour signaler aux moteurs
 * de recherche que toutes les pages sous /en/ sont en anglais (hreflang).
 *
 * Le layout du parent (RootLayout) prend en charge le <html lang="fr">.
 * On override pas la balise HTML pour ne pas casser le SSG, mais on ajoute
 * une meta http-equiv et les alternates corrects par page.
 */

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE.url}/en/`,
    languages: {
      fr: `${SITE.url}/`,
      en: `${SITE.url}/en/`,
      "x-default": `${SITE.url}/`,
    },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: ["fr_CH"],
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
