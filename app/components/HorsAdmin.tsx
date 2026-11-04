"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Le tableau de bord /admin/ et le CRM /crm/ sont des outils internes : ni
// en-tête, ni pied de page, ni chatbot, ni bandeau cookies, ni Google
// Analytics, ni suivi de visite.
export default function HorsAdmin({ children }: { children: ReactNode }) {
  const chemin = usePathname();
  if (chemin?.startsWith("/admin") || chemin?.startsWith("/crm")) return null;
  return <>{children}</>;
}
