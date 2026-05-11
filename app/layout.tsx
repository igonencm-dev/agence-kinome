import type { Metadata, Viewport } from "next";
import { Krub, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CauserieBotWidget from "./components/CauserieBotWidget";
import {
  SITE,
  KEYWORDS_BASE,
  organizationJsonLd,
  jsonLdScript,
} from "./lib/seo";

const krub = Krub({
  variable: "--font-krub",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Metadata par défaut — surchargée par chaque page via `buildMetadata`.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Kinome — Agence de communication à Genève",
    template: "%s — Kinome | Agence à Genève",
  },
  description:
    "Agence de communication indépendante à Genève. Branding, identité visuelle, création de logo et site internet pour entreprises et marques en Suisse romande.",
  keywords: [...KEYWORDS_BASE].join(", "),
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: "Kinome — Agence de communication à Genève",
    description:
      "Agence indépendante à Genève. Branding, identité visuelle, sites internet et communication digitale, pour remettre l'humain au cœur des échanges.",
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: `${SITE.name} — Agence de communication à Genève`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    title: "Kinome — Agence de communication à Genève",
    description:
      "Agence indépendante à Genève. Branding, identité visuelle, sites internet pour les marques de Suisse romande.",
    images: [SITE.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
  category: "Communication, design, branding",
  // Google Search Console : laissé vide tant que le code n'est pas fourni
  // (NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION dans .env). Évite une balise
  // <meta name="google-site-verification" content=""> qui peut bloquer la vérif.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    // Géolocalisation explicite (héritage SEO local)
    "geo.region": "CH-GE",
    "geo.placename": "Genève",
    "geo.position": "46.2044;6.1432",
    ICBM: "46.2044, 6.1432",
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f7f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${krub.variable} ${inter.variable}`}>
      <head>
        {/* DNS prefetch + preconnect vers les origines tierces.
            Réduit le temps de la 1ère requête vers ces hôtes une fois
            qu'on en a besoin (chatbot, Analytics, fonts). */}
        <link rel="dns-prefetch" href="https://dashboard.causeriebot.com" />
        <link
          rel="preconnect"
          href="https://dashboard.causeriebot.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* JSON-LD Organization + LocalBusiness — visible sur toutes les pages */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(organizationJsonLd()),
          }}
        />
      </head>
      <body className="bg-kinome-cream text-kinome-black">
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <GoogleAnalytics />

        {/* Chatbot CauserieBot : chargé après la 1ère interaction utilisateur
            ou 8 s d'inactivité — préserve les Core Web Vitals (TBT, LCP). */}
        <CauserieBotWidget />
      </body>
    </html>
  );
}
