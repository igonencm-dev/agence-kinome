/**
 * Accès côté navigateur aux compteurs de vues / j'aime (public/api/stats.php).
 *
 * Une seule requête « tous les articles » est partagée entre les composants
 * d'une même page (cache de promesse), et un petit bus d'abonnement permet
 * aux instances affichant le même article de rester synchronisées.
 */

export type Compteurs = { vues: number; jaime: number };

const API = "/api/stats.php";

let promesseTous: Promise<Record<string, Compteurs>> | null = null;
const abonnes = new Map<string, Set<(c: Compteurs) => void>>();

export function chargerTous(): Promise<Record<string, Compteurs>> {
  if (!promesseTous) {
    promesseTous = fetch(`${API}?all=1`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => (json && json.ok ? (json.articles as Record<string, Compteurs>) : {}))
      .catch(() => ({}));
  }
  return promesseTous;
}

export async function chargerUn(slug: string): Promise<Compteurs | null> {
  try {
    const r = await fetch(`${API}?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!r.ok) return null;
    const json = await r.json();
    return json && json.ok ? { vues: json.vues, jaime: json.jaime } : null;
  } catch {
    return null;
  }
}

export async function envoyer(
  slug: string,
  action: "vue" | "jaime" | "retirer_jaime"
): Promise<Compteurs | null> {
  try {
    const r = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action }),
      keepalive: true,
    });
    if (!r.ok) return null;
    const json = await r.json();
    return json && json.ok ? { vues: json.vues, jaime: json.jaime } : null;
  } catch {
    return null;
  }
}

export function abonner(slug: string, fn: (c: Compteurs) => void): () => void {
  if (!abonnes.has(slug)) abonnes.set(slug, new Set());
  abonnes.get(slug)!.add(fn);
  return () => abonnes.get(slug)?.delete(fn);
}

export function publier(slug: string, c: Compteurs): void {
  abonnes.get(slug)?.forEach((fn) => fn(c));
}

const formateur = new Intl.NumberFormat("fr-CH");
export function formaterNombre(n: number): string {
  return formateur.format(n);
}

export function libelleVues(n: number): string {
  return `${formaterNombre(n)} ${n > 1 ? "vues" : "vue"}`;
}

export function lireStockage(cle: string): string | null {
  try {
    return window.localStorage.getItem(cle);
  } catch {
    return null;
  }
}

export function ecrireStockage(cle: string, valeur: string | null): void {
  try {
    if (valeur === null) window.localStorage.removeItem(cle);
    else window.localStorage.setItem(cle, valeur);
  } catch {
    /* stockage indisponible : on continue sans mémoriser */
  }
}
