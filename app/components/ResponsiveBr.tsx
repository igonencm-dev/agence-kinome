/**
 * <ResponsiveBr /> — saut de ligne UNIQUEMENT en desktop, espace en mobile.
 *
 * Utile pour les titres et phrases avec une composition typographique
 * pensée pour le grand écran ("Titre principal\nDeuxième partie") :
 *   - desktop : retour à la ligne explicite (composition voulue)
 *   - mobile  : le texte se renvoie naturellement avec un espace, plus de
 *               mots collés ("agenceKinome" devient "agence Kinome")
 *
 * Remplace l'ancien pattern br responsive qui avait pour effet de coller
 * les 2 mots en mobile (le <br> masqué ne laissait aucun caractère blanc
 * à la place).
 *
 * Pour les <br /> "fonctionnels" (séparation email/téléphone/adresse),
 * garder un `<br />` simple — ils doivent rester visibles en mobile.
 */
export default function ResponsiveBr() {
  return (
    <>
      <span className="md:hidden"> </span>
      <br className="hidden md:inline" />
    </>
  );
}
