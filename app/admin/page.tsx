import type { Metadata } from "next";
import Admin from "../components/admin/Admin";

// Tableau de bord interne : visites, provenance, demandes, blog. Page
// statique ; toutes les données passent par /api/admin.php derrière mot de
// passe (cookie de session HttpOnly limité à /api/).
export const metadata: Metadata = {
  title: { absolute: "Tableau de bord | Kinome" },
  robots: { index: false, follow: false, nocache: true },
};

export default function PageAdmin() {
  return <Admin />;
}
