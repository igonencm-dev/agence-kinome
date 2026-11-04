import type { Metadata } from "next";
import Crm from "../components/crm/Crm";

// CRM de prospection (04/11/2026) : fiches, fil de suivi, PDF, responsables.
// Page statique ; toutes les données passent par /api/admin.php derrière
// connexion (cookie de session HttpOnly limité à /api/), comme /admin/.
export const metadata: Metadata = {
  title: { absolute: "CRM | Kinome" },
  robots: { index: false, follow: false, nocache: true },
};

export default function PageCrm() {
  return <Crm />;
}
