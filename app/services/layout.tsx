import { buildMetadata, jsonLdScript, faqJsonLd } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Nos services",
  description:
    "Création de logo, identité visuelle, charte graphique, branding, sites internet et communication digitale. Agence Kinome accompagne entreprises et marques à Genève et en Suisse romande sur l'ensemble de leurs besoins de communication.",
  path: "/services/",
  keywords: [
    "création logo Genève",
    "charte graphique Genève",
    "stratégie de marque",
    "site internet vitrine Genève",
    "site internet e-commerce Genève",
    "communication digitale Suisse",
    "direction artistique",
  ],
});

const faqServices = [
  {
    question: "Quelle est la différence entre un logo et une identité visuelle ?",
    answer:
      "Le logo est le signe distinctif d'une marque ; l'identité visuelle englobe l'ensemble du système graphique : logo, palette de couleurs, typographies, principes de composition, iconographie, ainsi que les règles d'usage qui assurent la cohérence sur tous les supports. Chez Kinome, nous concevons systématiquement les deux ensemble pour garantir une marque qui tient dans la durée.",
  },
  {
    question: "Combien de temps faut-il pour créer une identité visuelle complète ?",
    answer:
      "Un projet d'identité visuelle complet (logo + charte graphique + premières déclinaisons) prend en général de 4 à 8 semaines selon le périmètre. Le délai inclut la phase de cadrage, les premières propositions, les itérations et la livraison finale avec le manuel d'usage. Une création de logo seule peut être livrée en 2 à 3 semaines.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises basées à Genève ?",
    answer:
      "Notre studio est basé à Genève et nous accompagnons en priorité des clients de Suisse romande, mais nous travaillons également avec des entreprises et indépendants en France et à l'international. Les échanges se font en visio, par téléphone et lors de rendez-vous physiques selon votre localisation.",
  },
  {
    question: "Proposez-vous la refonte de sites internet existants ?",
    answer:
      "Oui. Nous accompagnons aussi bien la création de sites depuis zéro que la refonte d'un site existant : audit du site actuel, recommandations stratégiques, redesign de l'identité numérique, refonte UX/UI, optimisation SEO et migration technique vers une stack moderne (Next.js, Astro, WordPress, Webflow…).",
  },
];

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(faqJsonLd(faqServices)),
        }}
      />
      {children}
    </>
  );
}
