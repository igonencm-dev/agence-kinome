import { buildMetadata, jsonLdScript } from "../lib/seo";
import { projets, categoriesLabels } from "../lib/projets";
import { SITE } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Portfolio Kinome : 16 projets de branding & web à Genève",
  description:
    "Découvrez 16 projets récents de l'Agence Kinome à Genève : identités visuelles, sites internet et campagnes pour PME suisses, françaises et internationales.",
  path: "/portfolio/",
  keywords: [
    "portfolio agence Genève",
    "réalisations branding Suisse romande",
    "exemples identité visuelle PME",
    "exemples site internet Genève",
    "agence créative projets",
  ],
});

// JSON-LD ItemList — liste de toutes les pages projet (utile à Google + LLMs).
function portfolioItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projets de l'Agence Kinome",
    itemListElement: projets.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/projets/${p.slug}/`,
      name: p.nom,
      description: p.resume,
      image: p.cover.startsWith("http") ? p.cover : `${SITE.url}${p.cover}`,
      additionalType: p.categories
        .map((c) => categoriesLabels[c])
        .join(", "),
    })),
  };
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(portfolioItemList()),
        }}
      />
      {children}
    </>
  );
}
