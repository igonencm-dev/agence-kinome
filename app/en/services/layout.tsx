import { buildMetadata } from "../../lib/seo";

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

export default function ServicesEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
