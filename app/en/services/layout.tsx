import { buildMetadata, faqJsonLd, jsonLdScript } from "../../lib/seo";

// Metadata isolée dans un layout car la page elle-même est "use client"
// (state des onglets crea/web) et ne peut pas exporter `export const metadata`.
// Sans ce layout, on hérite du `/en/layout.tsx` parent dont le canonical
// pointe vers `/en/` — bug détecté dans Search Console.
export const metadata = buildMetadata({
  title: "Services — branding, identity & web in Geneva",
  description:
    "Discover Agence Kinome's services: logo creation, brand identity, branding strategy, website design, e-commerce and dashboards. A hand-picked range delivered from Geneva for brands in French-speaking Switzerland, France and beyond.",
  path: "/en/services/",
  keywords: [
    "Geneva communication services",
    "Swiss branding agency",
    "logo design Geneva",
    "web design Switzerland",
    "creative services French-speaking Switzerland",
  ],
});

const faqServicesEn = [
  {
    question: "What is the difference between a logo and a visual identity?",
    answer:
      "The logo is your brand's distinctive mark. The visual identity covers the whole graphic system: logo, colour palette, typography, composition principles, iconography and the usage rules that keep everything consistent. At Kinome we always design both together, so the brand holds up over time.",
  },
  {
    question: "How long does it take to create a complete visual identity?",
    answer:
      "A complete project (logo, brand guidelines and first applications) usually takes 4 to 8 weeks depending on scope. That includes discovery, first creative routes, iterations and final delivery with usage guidelines. A logo alone can be delivered in 2 to 3 weeks.",
  },
  {
    question: "Do you only work with companies based in Geneva?",
    answer:
      "Our studio is based in Geneva and we mainly support clients across French-speaking Switzerland, but we also work with companies and independents in France and internationally, in French or in English. Meetings happen by video call, phone or in person depending on your location.",
  },
  {
    question: "Do you redesign existing websites?",
    answer:
      "Yes. We handle both brand-new websites and redesigns: audit of the current site, strategic recommendations, digital identity redesign, UX/UI overhaul, SEO optimisation and technical migration to a modern stack (Next.js, Astro, WordPress, Webflow and more).",
  },
];

export default function ServicesEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(faqServicesEn)) }}
      />
      {children}
    </>
  );
}
