# Suivi des visites et tableau de bord /admin/

Mis en place le 29 septembre 2026, porté du système de codecircle.fr (même
architecture que codecircle.fr et causeriebot.com).

## Ce qui tourne

- **Collecte** : `app/lib/suivi.ts` (navigateur, monté par `app/components/Suivi.tsx`
  dans le layout) envoie des lots d'événements à `public/api/t.php`. Aucun tiers.
- **Demandes** : `public/api/contact.php` envoie l'email comme avant, puis enregistre
  la demande en base via `kn_enregistrer_lead()` (`public/api/_lib.php`). Une erreur
  de base ne bloque jamais l'envoi.
- **Tableau de bord** : https://agence-kinome.ch/admin/ (`app/admin/page.tsx`,
  `app/components/admin/`), qui lit `public/api/admin.php` derrière mot de passe.
  Sur /admin/, ni en-tête, ni pied de page, ni bandeau, ni Analytics (`HorsAdmin.tsx`).

## Où sont les données

- `~/domains/agence-kinome.ch/data/` sur l'hébergement u334827235, **hors du
  public_html** : base `kinome.sqlite` (tables sessions, evenements, leads, jetons,
  connexions, reglages) et `config.php` (hash du mot de passe, sel, email d'alerte).
- Le déploiement (rsync de `out/` vers `public_html`) ne touche jamais ce dossier.
  Ne jamais versionner `config.php` ni la base (`/data/` est dans `.gitignore`).
- Analyse directe : `sqlite3 ~/domains/agence-kinome.ch/data/kinome.sqlite` en SSH.
- Les compteurs de vues et j'aime du blog restent dans `public_html/api/data/stats.json`
  (`public/api/stats.php`) ; le tableau de bord les affiche aussi.

## Exports (onglet Exports de /admin/)

- `admin.php?a=export&quoi=visites&j=30` : CSV des visites (j=0 pour tout).
- `quoi=evenements` : CSV des interactions, une ligne par événement avec le canal et
  la source de la visite ; `quoi=demandes` : CSV des demandes (toutes périodes) ;
  `quoi=tout` : JSON visites + interactions + demandes + compteurs du blog ;
  `quoi=base` : copie cohérente de `kinome.sqlite` (VACUUM INTO).
- Depuis le 01/10/2026, tous les clics sont mesurés : liens internes (cible `lien`),
  ancres de sommaire (`ancre`), boutons (`bouton`), fichiers (`fichier`), en plus de
  tel, mail, whatsapp, externe et cta. Les éléments portant `data-suivi-ignorer` et
  les boîtes de dialogue ne sont pas doublés.

## Mot de passe

- Défini par Mathias avec `bash scripts/admin-motdepasse.sh` : saisie sans écho,
  hachage sur le serveur, jamais écrit en clair. Relancer le script pour le réinitialiser.
- Modifiable ensuite dans /admin/ > Réglages (le hash passe alors en base).
- Cinq échecs en quinze minutes bloquent la connexion depuis l'adresse concernée.

## Ce qui est mesuré

- Pages vues, temps de lecture réel (onglet visible), défilement, clics sur
  téléphone, email, WhatsApp, liens sortants et boutons vers le contact, ouverture
  du chatbot, formulaires commencés et abandonnés (jamais leur contenu), copies
  d'email ou de numéro, j'aime des articles, médias ouverts dans la visionneuse.
- Provenance classée par canal : IA (ChatGPT, Perplexity, Gemini, Copilot, Claude…),
  Google, autres moteurs, réseaux sociaux, annuaires (local.ch, search.ch, Sortlist,
  CCIFS…), publicité, email, sites référents, direct.
- Sans consentement : identifiant de visite de 30 minutes, pas de cookie, pas d'IP,
  pas de lien entre visites. Avec « Tout accepter » (mesure d'audience cochée dans le
  bandeau Kinome) : identifiant de visiteur de 13 mois, d'où le « tout premier contact »
  des demandes. Purge automatique à 25 mois. Décrit dans la politique de confidentialité
  (FR et EN) : la tenir à jour si le suivi change.
- Robots et navigateurs automatisés ne sont pas comptés ; l'appareil qui ouvre /admin/
  est exclu (localStorage `kn-ignorer`). Pour tester le suivi avec un navigateur piloté :
  User-Agent normal et localStorage `kn-test=1`.
