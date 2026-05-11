"use client";

/**
 * Petit bouton client isolé pour "Gérer les cookies" dans le footer.
 * Permet de garder le reste du Footer en server component (zero JS sur
 * 99 % des éléments du footer).
 */

export default function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("open-cookie-settings"))
      }
      className="cursor-pointer underline-offset-4 hover:text-kinome-cream hover:underline"
    >
      Gérer les cookies
    </button>
  );
}
