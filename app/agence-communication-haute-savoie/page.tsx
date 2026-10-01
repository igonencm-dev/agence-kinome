import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../contact/ContactForm";
import { contact } from "../lib/contact";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  jsonLdScript,
  serviceJsonLd,
} from "../lib/seo";

/**
 * Page d'ancrage Grand Genève et Haute-Savoie.
 *
 * Décision du 1er octobre 2026 : 35 % des clics de septembre venaient de
 * France, avec « agence de marketing haute-savoie » et « agence digitale
 * gaillard » déjà en page 1 sans page dédiée. Thônex touche Gaillard et
 * Annemasse : l'ancrage est réel, les références aussi (VP Conseils,
 * Microclimat). Uniquement des faits publiés ailleurs sur le site.
 */
export const metadata: Metadata = buildMetadata({
  title: "Agence de communication Grand Genève et Haute-Savoie",
  description:
    "Agence de communication à Thônex, à la frontière de la Haute-Savoie : identité de marque, site internet et référencement pour les entreprises d'Annemasse, Gaillard, Saint-Julien et du Grand Genève.",
  path: "/agence-communication-haute-savoie/",
  keywords: [
    "agence de communication Haute-Savoie",
    "agence de marketing Haute-Savoie",
    "agence digitale Gaillard",
    "agence communication Annemasse",
    "agence de communication Grand Genève",
  ],
});

const FAQ = [
  {
    question: "Une entreprise française peut-elle travailler avec une agence suisse ?",
    answer:
      "Oui. Kinome accompagne des entreprises de Haute-Savoie, et plus largement de France, depuis son bureau de Thônex dans le canton de Genève. Le devis, établi au forfait, précise les conditions et les jalons du projet. Les échanges se font chez vous, à l'agence ou en visioconférence.",
  },
  {
    question: "Pourquoi choisir une agence de Genève plutôt qu'une agence d'Annecy ou d'Annemasse ?",
    answer:
      "Parce qu'une grande partie de votre clientèle est genevoise ou frontalière. Une agence installée dans le canton connaît ses attentes, ses codes et son niveau d'exigence. Et Thônex est à quelques minutes d'Annemasse et de Gaillard, bien plus près qu'Annecy.",
  },
  {
    question: "Vous déplacez-vous en Haute-Savoie ?",
    answer:
      "Oui, pour les ateliers de cadrage et les présentations importantes, à Annemasse, Gaillard, Saint-Julien-en-Genevois, Thonon ou Annecy. Le suivi courant se fait en visioconférence et par e-mail.",
  },
  {
    question: "Quels sont vos prix pour une entreprise de Haute-Savoie ?",
    answer:
      "Les mêmes fourchettes que pour nos clients genevois : un logo entre 1 500 et 5 000 CHF, une identité visuelle complète entre 4 000 et 15 000 CHF, un site vitrine entre 3 000 et 18 000 CHF, un audit SEO entre 800 et 3 000 CHF. La grille complète 2026 est téléchargeable en PDF et chaque projet reçoit un devis détaillé après un premier échange de 30 minutes, offert.",
  },
  {
    question: "Travaillez-vous en anglais ?",
    answer:
      "Oui. Nous concevons des supports bilingues français et anglais pour les entreprises qui s'adressent à la clientèle internationale de Genève, et notre site existe en anglais.",
  },
];

const ATOUTS = [
  {
    titre: "À côté de chez vous",
    texte:
      "Notre bureau est route de Jussy, à Thônex, à quelques minutes de la douane de Moillesulaz, de Gaillard et d'Annemasse. Les ateliers se tiennent chez vous ou à l'agence.",
  },
  {
    titre: "Deux marchés, une seule marque",
    texte:
      "Fondée par des Français installés à Genève, l'agence connaît les codes des deux côtés de la frontière : clientèle frontalière, pouvoir d'achat genevois, exigence de qualité suisse.",
  },
  {
    titre: "Des prix publiés",
    texte:
      "Nos fourchettes sont en ligne, prestation par prestation, en francs suisses. Devis au forfait, jalons validés avant chaque étape, aucune surprise.",
  },
  {
    titre: "Un seul interlocuteur",
    texte:
      "Stratégie de marque, identité visuelle, site internet, référencement et réseaux sociaux sont traités par la même équipe, pour une image cohérente partout.",
  },
];

const SERVICES = [
  ["/services/strategie-de-marque/", "Stratégie de marque"],
  ["/services/identite-visuelle/", "Identité visuelle"],
  ["/services/creation-logo/", "Création de logo"],
  ["/services/site-internet/", "Site internet et e-commerce"],
  ["/services/referencement-naturel/", "Référencement naturel"],
  ["/services/reseaux-sociaux/", "Réseaux sociaux"],
];

const VILLES = [
  "Annemasse",
  "Gaillard",
  "Ambilly",
  "Ville-la-Grand",
  "Saint-Julien-en-Genevois",
  "Archamps",
  "Thonon-les-Bains",
  "Annecy",
  "Pays de Gex (Ain)",
  "Genève",
  "Thônex",
  "Carouge",
  "Lancy",
  "Nyon",
];

const H2 =
  "font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.14] text-kinome-black";
const BODY =
  "font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.7] text-kinome-grey";

export default function PageHauteSavoie() {
  return (
    <main className="bg-kinome-cream text-kinome-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceJsonLd(
              "Agence de communication Grand Genève et Haute-Savoie",
              "Identité de marque, création de logo, site internet, référencement naturel et réseaux sociaux pour les entreprises du Grand Genève, de Haute-Savoie et du Pays de Gex, depuis Thônex (Genève)."
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Grand Genève et Haute-Savoie", url: "/agence-communication-haute-savoie/" },
            ])
          ),
        }}
      />

      {/* ===================== HERO ===================== */}
      <section className="px-[6%] pt-[clamp(110px,18vw,160px)] pb-[clamp(40px,8vw,70px)]">
        <div className="mx-auto max-w-[860px] text-center">
          <span className="inline-block rounded-full bg-kinome-accent px-4 py-1.5 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white">
            Thônex · Annemasse · Gaillard · Saint-Julien
          </span>
          <h1 className="mt-6 font-heading text-[clamp(32px,6vw,60px)] font-normal leading-[1.06]">
            Agence de communication pour le Grand Genève et la Haute-Savoie
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] font-body text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55] text-[#3a3a3a]">
            Kinome est une agence de communication installée à Thônex, dans le
            canton de Genève, à quelques minutes de la frontière. Nous
            accompagnons les entreprises des deux côtés&nbsp;: identité de
            marque, site internet, référencement et réseaux sociaux.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-w-[260px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105"
            >
              Parler de votre projet
            </a>
            <Link
              href="/portfolio/"
              className="inline-flex min-w-[260px] items-center justify-center btn-fill-dark rounded-full border-2 border-kinome-black bg-transparent px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105"
            >
              Voir nos réalisations
            </Link>
          </div>
          <p className="mt-4 font-body text-[0.85rem] font-light text-kinome-grey">
            Diagnostic stratégique de 30 minutes offert · réponse sous 24&nbsp;h
          </p>
        </div>
      </section>

      {/* ===================== ATOUTS ===================== */}
      <section className="px-[6%] pb-[clamp(50px,9vw,90px)]">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2">
          {ATOUTS.map((a) => (
            <div key={a.titre} className="rounded-[18px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h2 className="font-heading text-[1.15rem] font-semibold leading-tight">{a.titre}</h2>
              <p className="mt-2 font-body text-[0.95rem] font-light leading-[1.6] text-kinome-grey">{a.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== POURQUOI ===================== */}
      <section className="px-[6%] pb-[clamp(50px,9vw,90px)]">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h2 className={H2}>Une agence genevoise qui connaît la France voisine</h2>
            <p className={`mt-6 ${BODY}`}>
              Une entreprise d&rsquo;Annemasse, de Gaillard ou de Saint-Julien
              vend souvent à des clients genevois ou frontaliers. Son image doit
              donc parler aux deux publics&nbsp;: la précision et la sobriété
              attendues à Genève, la chaleur et la proximité attendues en
              Haute-Savoie. C&rsquo;est exactement l&rsquo;équilibre que nous
              cherchons dans chaque projet.
            </p>
            <p className={`mt-4 ${BODY}`}>
              Nous travaillons régulièrement avec des entreprises du Genevois
              français&nbsp;: conseil, immobilier, architecture, formation,
              artisanat et commerce. Nous connaissons les questions qui
              reviennent, du choix de la devise sur un site à la double
              clientèle en passant par le référencement sur Google depuis les
              deux pays.
            </p>
            <p className={`mt-4 ${BODY}`}>
              Et parce que le canton de Genève et la Haute-Savoie forment un seul
              bassin de vie, le Grand Genève, nous vous recevons à Thônex ou
              nous venons chez vous&nbsp;: la frontière ne change rien au suivi
              du projet.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-[18px] bg-white p-6">
              <p className="mb-3 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
                Nos références en Haute-Savoie
              </p>
              <ul className="space-y-3 font-body text-[0.95rem] leading-[1.55] text-kinome-grey">
                <li>
                  <Link href="/projets/vp-conseils/" className="font-medium text-kinome-black hover:text-kinome-accent hover:underline">
                    VP Conseils
                  </Link>
                  , cabinet de conseil immobilier et financier pour les frontaliers&nbsp;: identité de marque et site vitrine.
                </li>
                <li>
                  <Link href="/projets/microclimat/" className="font-medium text-kinome-black hover:text-kinome-accent hover:underline">
                    Microclimat
                  </Link>
                  , agence d&rsquo;architecture en Haute-Savoie&nbsp;: logo illustratif et déclinaisons.
                </li>
                <li>
                  Et des clients à Genève, Lausanne, Lyon, Paris ou Toulouse&nbsp;:{" "}
                  <Link href="/portfolio/" className="font-medium text-kinome-black hover:text-kinome-accent hover:underline">
                    toutes nos réalisations
                  </Link>
                  .
                </li>
              </ul>
            </div>
            <div className="rounded-[18px] bg-white p-6">
              <p className="mb-3 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-kinome-grey">
                Notre bureau
              </p>
              <p className="font-body text-[clamp(16px,1.15vw,18px)] leading-[1.6] text-kinome-black">
                Route de Jussy 35
                <br />
                1226 Thônex, Genève
              </p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-body text-[0.95rem]">
                <a
                  href="https://maps.app.goo.gl/Ge2EH3UVP2mfAZej9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-kinome-black underline underline-offset-4 hover:text-kinome-accent"
                >
                  Voir sur Google Maps
                </a>
                <a
                  href={`tel:${contact.phones.mathias.e164}`}
                  className="font-medium text-kinome-black underline underline-offset-4 hover:text-kinome-accent"
                >
                  {contact.phones.mathias.display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES + ZONE ===================== */}
      <section className="px-[6%] pb-[clamp(50px,9vw,90px)]">
        <div className="mx-auto max-w-[1100px] rounded-[24px] bg-white p-[clamp(24px,5vw,56px)]">
          <h2 className={H2}>Ce que nous faisons pour les entreprises du Grand Genève</h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 font-body text-[1.05rem] sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-flex items-center gap-2 text-kinome-black hover:text-kinome-accent"
                >
                  <span aria-hidden="true" className="text-kinome-accent transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`mt-8 ${BODY}`}>
            Les prix sont les mêmes qu&rsquo;à Genève et sont publiés en
            ligne&nbsp;:{" "}
            <Link href="/blog/tarifs-agence-communication-geneve/" className="font-medium text-kinome-black underline underline-offset-4 hover:text-kinome-accent">
              tarifs d&rsquo;une agence de communication
            </Link>
            , avec la{" "}
            <a href="/documents/grille-tarifs-kinome-2026.pdf" className="font-medium text-kinome-black underline underline-offset-4 hover:text-kinome-accent">
              grille 2026 en PDF
            </a>
            .
          </p>
          <h3 className="mt-10 font-heading text-[1.1rem] font-semibold text-kinome-black">Zone d&rsquo;intervention</h3>
          <p className="mt-3 flex flex-wrap gap-2">
            {VILLES.map((v) => (
              <span key={v} className="rounded-full bg-kinome-cream px-3.5 py-1.5 font-body text-[0.88rem] text-kinome-black">
                {v}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="px-[6%] pb-[clamp(50px,9vw,90px)]">
        <div className="mx-auto max-w-[900px]">
          <h2 className={`${H2} text-center`}>Questions fréquentes</h2>
          <div className="mt-10 flex flex-col gap-4">
            {FAQ.map((item) => (
              <details key={item.question} className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="scroll-mt-[90px] px-[6%] pb-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[760px]">
          <h2 className={`${H2} mb-8 text-center`}>Parlons de votre projet, de ce côté-ci ou de l&rsquo;autre de la frontière</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
