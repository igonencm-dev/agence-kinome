/**
 * Questions « posez-la à l'assistant » (20/10/2026). Un clic sur l'une d'elles ouvre le
 * chatbot Causerie et lui envoie la question, comme si le visiteur l'avait tapée
 * (components/OuvrirAssistant.tsx). Chaque page déclare ses blocs dans la page, et son
 * invitation (InvitationAssistant), qui s'affiche après un vrai temps de lecture.
 *
 * Écrire des questions que le visiteur se pose sur SON projet (budget, délai, existant),
 * pas celles déjà traitées mot pour mot par la FAQ de la page : le bot y répond avec les
 * fourchettes de sa « source de vérité » (docs/chatbot/), puis propose d'être recontacté.
 */

export type BlocQuestions = {
  /** Nom court de l'endroit, lu dans /admin/ (ex. « processus », « faq »). */
  emplacement: string;
  titre: string;
  texte?: string;
  questions: string[];
};

export type Invitation = {
  titre: string;
  texte: string;
  questions: string[];
};

export const IDENTITE_VISUELLE = {
  processus: {
    emplacement: "processus",
    titre: "Une question sur votre projet ?",
    texte: "Notre assistant vous répond tout de suite, sans formulaire.",
    questions: [
      "Quel budget prévoir pour mon identité visuelle ?",
      "Pouvez-vous partir de mon logo actuel ?",
      "Que dois-je préparer avant de commencer ?",
    ],
  } satisfies BlocQuestions,
  faq: {
    emplacement: "faq",
    titre: "Votre question n'est pas dans la liste ?",
    texte: "Posez-la à notre assistant, il vous répond tout de suite.",
    questions: [
      "Comment se passe le premier échange offert ?",
      "Travaillez-vous avec des entreprises hors de Genève ?",
      "Pouvez-vous aussi créer notre site internet ?",
    ],
  } satisfies BlocQuestions,
  invitation: {
    titre: "Une question sur votre identité visuelle ?",
    texte: "Notre assistant vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon projet ?",
      "Combien de temps faut-il compter ?",
      "Comment se passe le premier échange offert ?",
    ],
  } satisfies Invitation,
};

// Pages service et articles de prix (05/11/2026, plan de novembre, action 3).

export const CREATION_LOGO = {
  faq: {
    emplacement: "faq",
    titre: "Votre question n'est pas dans la liste ?",
    texte: "Posez-la à notre assistant, il vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon logo ?",
      "Pouvez-vous moderniser mon logo actuel ?",
      "Que vais-je recevoir à la fin du projet ?",
    ],
  } satisfies BlocQuestions,
  invitation: {
    titre: "Une question sur votre logo ?",
    texte: "Notre assistant vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon logo ?",
      "Combien de temps faut-il compter ?",
      "Comment se passe le premier échange offert ?",
    ],
  } satisfies Invitation,
};

export const SITE_INTERNET = {
  faq: {
    emplacement: "faq",
    titre: "Votre question n'est pas dans la liste ?",
    texte: "Posez-la à notre assistant, il vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon site ?",
      "Pouvez-vous reprendre mon site actuel ?",
      "Combien de temps pour mettre mon site en ligne ?",
    ],
  } satisfies BlocQuestions,
  invitation: {
    titre: "Une question sur votre site ?",
    texte: "Notre assistant vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon site ?",
      "Combien de temps faut-il compter ?",
      "Comment se passe le premier échange offert ?",
    ],
  } satisfies Invitation,
};

export const REFERENCEMENT = {
  faq: {
    emplacement: "faq",
    titre: "Votre question n'est pas dans la liste ?",
    texte: "Posez-la à notre assistant, il vous répond tout de suite.",
    questions: [
      "Combien coûte un audit SEO de mon site ?",
      "En combien de temps voit-on des résultats ?",
      "Pouvez-vous aider mon site à être cité par ChatGPT ?",
    ],
  } satisfies BlocQuestions,
  invitation: {
    titre: "Une question sur votre référencement ?",
    texte: "Notre assistant vous répond tout de suite.",
    questions: [
      "Combien coûte un audit SEO de mon site ?",
      "En combien de temps voit-on des résultats ?",
      "Comment se passe le premier échange offert ?",
    ],
  } satisfies Invitation,
};

export const STRATEGIE_MARQUE = {
  faq: {
    emplacement: "faq",
    titre: "Votre question n'est pas dans la liste ?",
    texte: "Posez-la à notre assistant, il vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour une stratégie de marque ?",
      "Par quoi commencer si ma marque existe déjà ?",
      "Travaillez-vous avec des entreprises hors de Genève ?",
    ],
  } satisfies BlocQuestions,
  invitation: {
    titre: "Une question sur votre marque ?",
    texte: "Notre assistant vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon projet ?",
      "Combien de temps faut-il compter ?",
      "Comment se passe le premier échange offert ?",
    ],
  } satisfies Invitation,
};

export const RESEAUX_SOCIAUX = {
  faq: {
    emplacement: "faq",
    titre: "Votre question n'est pas dans la liste ?",
    texte: "Posez-la à notre assistant, il vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour nos réseaux sociaux ?",
      "Par quels réseaux commencer pour mon entreprise ?",
      "Travaillez-vous avec des entreprises hors de Genève ?",
    ],
  } satisfies BlocQuestions,
  invitation: {
    titre: "Une question sur vos réseaux sociaux ?",
    texte: "Notre assistant vous répond tout de suite.",
    questions: [
      "Quel budget prévoir pour mon projet ?",
      "Par quels réseaux commencer ?",
      "Comment se passe le premier échange offert ?",
    ],
  } satisfies Invitation,
};

/** Articles de prix : bloc après le texte et invitation après lecture. */
const BLOC_PRIX = (titre: string, questions: string[]) => ({
  bloc: {
    emplacement: "article",
    titre,
    texte: "Notre assistant vous répond tout de suite, sans formulaire.",
    questions,
  } satisfies BlocQuestions,
  invitation: {
    titre,
    texte: "Notre assistant vous répond tout de suite.",
    questions,
  } satisfies Invitation,
});

export const ARTICLES_ASSISTANT: Record<string, { bloc: BlocQuestions; invitation: Invitation }> = {
  "tarifs-agence-communication-geneve": BLOC_PRIX("Une question sur le budget de votre projet ?", [
    "Quel budget prévoir pour mon projet ?",
    "Combien de temps faut-il compter ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "creation-logo-geneve-processus": BLOC_PRIX("Une question sur le prix de votre logo ?", [
    "Quel budget prévoir pour mon logo ?",
    "Combien de temps faut-il compter ?",
    "Pouvez-vous moderniser mon logo actuel ?",
  ]),
  "prix-referencement-seo-suisse": BLOC_PRIX("Une question sur le prix de votre référencement ?", [
    "Combien coûte un audit SEO de mon site ?",
    "En combien de temps voit-on des résultats ?",
    "Comment se passe le premier échange offert ?",
  ]),
  // 11/11/2026 : articles qui amènent le plus de visites (Search Console et /admin/).
  "textes-voeux-professionnels": BLOC_PRIX("Une question sur votre carte de vœux ?", [
    "Combien coûte une carte de vœux à notre image ?",
    "Pouvez-vous nous aider à écrire le texte ?",
    "Pouvez-vous aussi l'animer pour l'e-mail et LinkedIn ?",
  ]),
  "carte-de-voeux-entreprise": BLOC_PRIX("Une question sur votre carte de vœux ?", [
    "Combien coûte une carte de vœux à notre image ?",
    "Pouvez-vous partir de notre logo actuel ?",
    "Pouvez-vous aussi l'animer pour l'e-mail et LinkedIn ?",
  ]),
  "communication-fin-annee-entreprise": BLOC_PRIX("Une question sur votre fin d'année ?", [
    "Combien coûte une carte de vœux à notre image ?",
    "Pouvez-vous animer nos vœux pour les réseaux sociaux ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "prix-community-manager-geneve": BLOC_PRIX("Une question sur vos réseaux sociaux ?", [
    "Quel budget prévoir pour nos réseaux sociaux ?",
    "Que comprend votre gestion des réseaux sociaux ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "deposer-marque-suisse-prix-ipi": BLOC_PRIX("Une question sur votre logo ?", [
    "Quel budget prévoir pour mon logo ?",
    "Pouvez-vous créer le logo avant le dépôt de la marque ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "meilleures-agences-web-geneve-lausanne": BLOC_PRIX("Une question sur votre site ?", [
    "Quel budget prévoir pour mon site ?",
    "Pouvez-vous refaire mon site WordPress ?",
    "Combien de temps faut-il compter ?",
  ]),
  "creation-site-internet-geneve-guide": BLOC_PRIX("Une question sur votre site ?", [
    "Quel budget prévoir pour mon site ?",
    "Combien de temps faut-il compter ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "creer-site-ecommerce-suisse": BLOC_PRIX("Une question sur votre boutique en ligne ?", [
    "Quel budget prévoir pour ma boutique en ligne ?",
    "Combien de temps faut-il compter ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "refaire-site-chatgpt-claude": BLOC_PRIX("Une question sur votre site ?", [
    "Quel budget prévoir pour refaire mon site ?",
    "Pouvez-vous reprendre un site commencé avec l'IA ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "prix-refonte-logo-suisse": BLOC_PRIX("Une question sur votre logo ?", [
    "Quel budget prévoir pour moderniser mon logo ?",
    "Pouvez-vous garder l'esprit de mon logo actuel ?",
    "Combien de temps faut-il compter ?",
  ]),
  "prix-carte-de-voeux-entreprise": BLOC_PRIX("Une question sur votre carte de vœux ?", [
    "Combien coûte une carte de vœux à notre image ?",
    "Pouvez-vous nous aider à écrire le texte ?",
    "Pouvez-vous aussi l'animer pour l'e-mail et LinkedIn ?",
  ]),
  "prix-flyer-plaquette-suisse": BLOC_PRIX("Une question sur votre flyer ou votre plaquette ?", [
    "Quel budget prévoir pour mon flyer ?",
    "Pouvez-vous écrire les textes de ma plaquette ?",
    "Comment se passe le premier échange offert ?",
  ]),
  "creer-identite-visuelle-entreprise-geneve": BLOC_PRIX("Une question sur votre identité visuelle ?", [
    "Quel budget prévoir pour mon identité visuelle ?",
    "Pouvez-vous partir de mon logo actuel ?",
    "Combien de temps faut-il compter ?",
  ]),
};
