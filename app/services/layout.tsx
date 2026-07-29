import { buildMetadata } from "../lib/seo";

const baseMetadata = buildMetadata({
  title: "Agence de communication Genève : branding & sites internet",
  description:
    "Agence de communication à Genève : création de logo, identité visuelle, branding et sites internet pour PME en Suisse romande. Premier appel offert avec Kinome.",
  path: "/services/",
  keywords: [
    "agence communication Genève",
    "agence de communication Suisse romande",
    "création logo Genève",
    "charte graphique Genève",
    "stratégie de marque PME",
    "site internet vitrine Genève",
    "site internet e-commerce Genève",
    "communication digitale Suisse",
    "direction artistique",
  ],
});

// Un layout qui définit `title` sans `template` coupe l'héritage du template
// racine ("%s | Kinome") pour ses pages enfants : les landings service
// (/services/identite-visuelle/, /services/site-internet/) sortaient sans
// suffixe de marque. On redéclare donc le template ici, avec le title du hub
// en absolute (suffixe inclus manuellement pour un rendu identique).
export const metadata = {
  ...baseMetadata,
  title: {
    absolute: "Agence de communication Genève : branding & sites internet | Kinome",
    template: "%s | Kinome",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
