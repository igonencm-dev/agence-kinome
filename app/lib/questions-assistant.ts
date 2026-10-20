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
