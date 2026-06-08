/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../lib/contact";
import ContactForm from "./ContactForm";
import Testimonials from "../components/Testimonials";
import LogosMarqueeVertical from "../components/LogosMarqueeVertical";
import { buildMetadata, jsonLdScript, SITE, BUSINESS } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez l'Agence Kinome à Genève pour votre projet de communication, identité visuelle, création de logo ou site internet. Appel découverte gratuit.",
  path: "/contact/",
  keywords: [
    "contact agence Genève",
    "devis logo Genève",
    "devis site internet Genève",
    "rendez-vous communication",
  ],
});

// JSON-LD ContactPage : signal Google + AEO clair pour la page contact.
// Référence l'Organization principale + son contactPoint (téléphone, email,
// langues, zone desservie). Optimise les rich snippets "Coordonnées" et la
// citation directe par les LLMs ("Comment contacter Kinome ?").
const contactPageLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — Agence Kinome",
  url: `${SITE.url}/contact/`,
  description:
    "Coordonnées et formulaire de contact de l'Agence Kinome, agence de communication à Genève.",
  inLanguage: "fr",
  isPartOf: { "@id": `${SITE.url}/#website` },
  mainEntity: {
    "@id": `${SITE.url}/#organization`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        availableLanguage: ["fr", "en"],
        areaServed: BUSINESS.areaServed,
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <main className="pt-[clamp(100px,14vw,140px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(contactPageLd) }}
      />
      {/* Bloc principal : adresse + formulaire */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 sm:gap-16 px-[5%] py-6 sm:py-[40px] lg:grid-cols-[1fr_1.3fr]">
        <div className="font-body text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-kinome-black">
          {/* H1 enrichi avec mots-clés locaux SEO + AEO (au lieu d'un simple
              "Échangeons." minimaliste qui perdait du signal Google). On garde
              "Échangeons" comme baseline visuelle juste en dessous. */}
          <h1 className="mb-2 text-center font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black md:text-left">
            Contact — Agence Kinome à Genève
          </h1>
          <p className="mb-12 text-center font-heading text-[clamp(18px,2.2vw,28px)] font-light italic text-kinome-grey md:text-left">
            Échangeons.
          </p>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Adresse</p>
            <p className="text-kinome-grey">
              {contact.agency.name}
              <br />
              Route de Jussy 35
              <br />
              1226 Thônex (Genève)
            </p>
          </div>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Contact — Mathias</p>
            <p className="text-kinome-grey">
              <a
                href={`tel:${contact.phones.mathias.e164}`}
                className="hover:underline"
              >
                {contact.phones.mathias.display}
              </a>
              <br />
              <a
                href={`mailto:${contact.emails.mathias}`}
                className="hover:underline"
              >
                {contact.emails.mathias}
              </a>
            </p>
          </div>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Contact — Tanguy</p>
            <p className="text-kinome-grey">
              <a
                href={`tel:${contact.phones.tanguy.e164}`}
                className="hover:underline"
              >
                {contact.phones.tanguy.display}
              </a>
              <br />
              <a
                href={`mailto:${contact.emails.tanguy}`}
                className="hover:underline"
              >
                {contact.emails.tanguy}
              </a>
            </p>
          </div>

          <div>
            <p className="mb-3 font-semibold">Autres plateformes</p>
            <p className="text-kinome-grey">
              <a
                href={contact.social.linkedinAgence}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn : Agence Kinome
              </a>
              <br />
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram : @agencekinome
              </a>
            </p>
          </div>
        </div>

        <ContactForm />
      </section>

      {/* Carrousel vertical des logos clients */}
      <section className="my-[60px] bg-kinome-cream py-[clamp(50px,8vw,80px)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-[5%] lg:grid-cols-[1fr_320px]">
          <div className="text-center lg:text-left">
            <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
              Ils nous font confiance
            </p>
            {/* Retour #110 : titre doublé en taille (clamp 28-56 → 40-100)
                pour donner le poids visuel que Tanguy souhaitait sur ce
                compteur clé. */}
            <h2 className="mb-6 font-heading text-[clamp(40px,7.5vw,100px)] font-normal leading-[1.05] text-kinome-black">
              Une trentaine de marques accompagnées depuis Genève
            </h2>
            <p className="max-w-[480px] font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.6] text-kinome-grey lg:mx-0 mx-auto">
              Identités, sites internet, campagnes — de la PME au cabinet de
              conseil, du restaurant à l&rsquo;agence de voyage, des marques
              variées choisissent Kinome pour porter leur image.
            </p>
          </div>
          <LogosMarqueeVertical />
        </div>
      </section>

      {/* Témoignages (composant partagé) */}
      <Testimonials />

      {/* CTA bas (section "Vous avez un projet ?") */}
      <section className="mx-auto my-[100px] max-w-[1300px] rounded-[24px] bg-kinome-cream px-[5%] py-[clamp(50px,8vw,80px)] text-center">
        <h2 className="mx-auto mb-6 max-w-[900px] font-heading text-[clamp(24px,4.5vw,48px)] font-normal leading-[1.1]">
          Vous avez un projet sur lequel vous souhaitez échanger&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[700px] font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.6] text-kinome-grey">
          Chaque échange est pensé comme le point de départ d&rsquo;une
          collaboration sincère, où la confiance et l&rsquo;engagement commun
          façonnent des résultats à la hauteur de vos ambitions.
        </p>
        <Link
          href="#top"
          className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Remplir le formulaire
        </Link>
      </section>
    </main>
  );
}
