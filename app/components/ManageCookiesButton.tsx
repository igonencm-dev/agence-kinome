"use client";

/**
 * Petit bouton client isolé pour "Gérer les cookies" dans le footer.
 * Permet de garder le reste du Footer en server component (zero JS sur
 * 99 % des éléments du footer).
 */

import { usePathname } from "next/navigation";
import { getLocaleFromPath, t } from "../lib/i18n";

export default function ManageCookiesButton() {
  const locale = getLocaleFromPath(usePathname() ?? "/");
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("open-cookie-settings"))
      }
      className="cursor-pointer underline-offset-4 hover:text-kinome-cream hover:underline"
    >
      {t("footer_manage_cookies", locale)}
    </button>
  );
}
