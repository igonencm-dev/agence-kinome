# CRM de prospection : agence-kinome.ch/crm/

Mis en place le 4 novembre 2026. Outil interne de Mathias et Tanguy : chaque contact a sa fiche, son
responsable, son étape, sa prochaine action datée, un fil de suivi signé et ses PDF. Mêmes données et
même connexion que le tableau de bord /admin/ ; rien n'est indexé ni mesuré sur ces pages.

## D'où viennent les fiches

- Formulaire de contact du site : automatique (contact.php, comme avant).
- Chatbot du site (Causerie, « Kinome Assistant ») : automatique par webhook (`api/causerie.php`), une fiche
  par adresse e-mail, avec le lien vers la conversation. À brancher une fois (voir plus bas).
- À la main : bouton « + Nouveau prospect » (une entreprise ou un nom suffit).
- Par Claude : avec la clé personnelle (voir plus bas).

## Étapes

Nouveau, Contacté, Rendez-vous, Devis envoyé, Gagné, Perdu (et Spam, hors colonnes). Chaque changement
d'étape, de responsable, de montant ou de prochaine action s'écrit tout seul dans le fil.

## Mise en route (une fois)

1. Se connecter sur agence-kinome.ch/crm/ avec le mot de passe commun du tableau de bord.
2. Réglages > Comptes de l'équipe : créer un compte par personne (identifiant, prénom, mot de passe de
   12 caractères au moins), puis se reconnecter avec son identifiant.
3. Réglages > Contacts du chatbot : dans le dashboard Causerie, page Intégrations du chatbot, ajouter le
   webhook `https://agence-kinome.ch/api/causerie.php`, copier le secret et le coller dans le CRM, puis
   cliquer sur « Tester » dans le dashboard (la date du test s'affiche dans le CRM).

## Claude

Réglages > Claude : « Créer ma clé pour Claude » (affichée une seule fois, rattachée au compte personnel,
révocable). La clé permet de lire, créer, noter et mettre à jour les fiches ; jamais les exports, les
comptes ni les réglages.

- Connecteur MCP (Claude Code) :
  `claude mcp add --transport http kinome-crm https://agence-kinome.ch/api/mcp.php --header "X-Kinome-Cle: <clé>"`
  Outils : lister_prospects, voir_prospect, ajouter_prospect, noter, mettre_a_jour.
- API directe : `https://agence-kinome.ch/api/admin.php?a=crm` (liste), `a=lead&id=12` (fiche),
  `a=ajout`, `a=maj`, `a=note` en POST JSON, avec l'en-tête `X-Kinome-Cle: <clé>`.

Pour y mettre des données de prospects, Claude doit être pris dans une offre prévue pour l'usage
professionnel (Team ou API) : les offres Free, Pro et Max l'excluent dans l'EEE et en Suisse.

## Technique

- Données : `domains/agence-kinome.ch/data/kinome.sqlite` (hors du web). Tables `leads` (fiches),
  `suivis` (fil), `fichiers` (PDF, rangés dans `data/fichiers/`, 10 Mo maximum, vrais PDF uniquement),
  `comptes`, `cles_api` (empreintes seulement), `livraisons` (webhook traité une fois). Schéma v3
  posé par `api/_lib.php` à la première requête.
- Code : `api/_crm.php` (logique commune), `api/admin.php` (actions crm, lead, ajout, maj, note, fichier,
  fichier_get, fichier_suppr, comptes, compte_ajout, compte_suppr, compte_mdp, cles, cle_creer, cle_suppr,
  secret_causerie, etat_causerie), `api/causerie.php` (webhook signé HMAC), `api/mcp.php` (Claude),
  `app/crm/page.tsx` et `app/components/crm/Crm.tsx` (interface).
- Sécurité : cookie HttpOnly, Secure, SameSite=Strict limité à /api/ ; cinq échecs de connexion en
  quinze minutes bloquent l'adresse ; en-tête X-KN exigé pour toute écriture depuis le navigateur ;
  PDF servis seulement aux personnes connectées ; /crm/ exclu de robots.txt et en noindex.
