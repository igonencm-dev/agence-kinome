import type { BlocQuestions } from "../lib/questions-assistant";

/**
 * Bloc de questions qui ouvrent le chatbot (lib/questions-assistant.ts). Rendu statique :
 * les boutons portent la question dans data-question-assistant et c'est
 * components/OuvrirAssistant.tsx, monté dans le layout, qui ouvre le chat au clic.
 * Pastilles au trait, comme les cercles de la FAQ ; l'accent n'apparaît qu'au survol.
 * data-suivi-ignorer : le clic est compté une fois, comme question (pas comme bouton).
 */
export default function QuestionsAssistant({
  bloc,
  fond = "creme",
  className = "",
}: {
  bloc: BlocQuestions;
  /** Couleur de la section qui accueille le bloc : les pastilles prennent l'autre. */
  fond?: "creme" | "blanc";
  className?: string;
}) {
  const pastille = fond === "creme" ? "bg-white" : "bg-kinome-cream";
  return (
    <div data-emplacement={bloc.emplacement} className={`text-center ${className}`}>
      <p className="font-heading text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.3] text-kinome-black">
        {bloc.titre}
      </p>
      {bloc.texte && (
        <p className="mt-2 font-body text-[clamp(15px,1.4vw,17px)] font-light leading-[1.55] text-kinome-black/80">
          {bloc.texte}
        </p>
      )}
      <ul className="mt-[clamp(18px,2vw,26px)] flex flex-wrap justify-center gap-3">
        {bloc.questions.map((q) => (
          <li key={q}>
            <button
              type="button"
              data-question-assistant={q}
              data-suivi-ignorer
              className={`group inline-flex items-center gap-2.5 rounded-full border border-kinome-black/20 ${pastille} px-5 py-3 text-left font-body text-[15px] font-normal leading-snug text-kinome-black transition-colors duration-300 hover:border-kinome-accent hover:text-kinome-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kinome-accent`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-kinome-accent"
              >
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
              </svg>
              {q}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
