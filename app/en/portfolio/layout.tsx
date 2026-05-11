import { buildMetadata, jsonLdScript, SITE } from "../../lib/seo";
import { projets, categoriesLabels } from "../../lib/projets";

export const metadata = buildMetadata({
  title: "Portfolio — our projects",
  description:
    "Discover the projects delivered by Kinome: logo creations, visual identities, websites and campaigns for brands in Geneva, French-speaking Switzerland, France and internationally.",
  path: "/en/portfolio/",
  keywords: [
    "Geneva agency portfolio",
    "branding case studies",
    "visual identity examples",
    "website examples",
    "creative agency projects",
  ],
});

function portfolioItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agence Kinome — projects",
    itemListElement: projets.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/projets/${p.slug}/`,
      name: p.nom,
      description: p.resume,
      image: p.cover.startsWith("http") ? p.cover : `${SITE.url}${p.cover}`,
      additionalType: p.categories.map((c) => categoriesLabels[c]).join(", "),
    })),
  };
}

export default function PortfolioEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(portfolioItemList()) }}
      />
      {children}
    </>
  );
}
