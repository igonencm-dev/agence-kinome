/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../lib/contact";
import ContactForm from "./ContactForm";
import Testimonials from "../components/Testimonials";
import WhatsAppLink from "../components/WhatsAppLink";
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
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: "WhatsApp",
        telephone: BUSINESS.phone,
        url: "https://wa.me/41782652014",
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
          <p className="mb-3 text-center font-heading text-[clamp(18px,2.2vw,28px)] font-light italic text-kinome-grey md:text-left">
            Échangeons.
          </p>
          <p className="mb-12 text-center font-body text-[clamp(15px,1.2vw,18px)] font-light text-kinome-grey md:text-left">
            Premier rendez-vous : un{" "}
            <strong className="font-semibold text-kinome-black">
              diagnostic stratégique offert de 30 minutes
            </strong>
            , sans engagement.
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

          {/* WhatsApp mis en avant comme second canal : le formulaire reste la
              voie principale, mais une partie des prospects ne le remplira
              jamais. Le délai annoncé évite de créer une attente d'instantané
              que l'agence ne peut pas tenir. */}
          <div className="mb-10 rounded-[20px] bg-kinome-cream p-6">
            <p className="mb-2 font-semibold">Vous préférez écrire&nbsp;?</p>
            <p className="mb-4 font-body text-[0.95rem] font-light leading-[1.55] text-kinome-grey">
              Posez votre question directement sur WhatsApp. Réponse en général
              dans la journée, du lundi au vendredi.
            </p>
            <WhatsAppLink
              contexte="la page contact"
              emplacement="page_contact"
              className="btn-fill-accent inline-flex items-center gap-2.5 rounded-full bg-kinome-black px-6 py-3 font-body text-[0.95rem] font-semibold text-white transition-transform duration-300 hover:scale-105"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[1.15em] w-[1.15em] shrink-0"
              >
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Z" />
              </svg>
              Écrire sur WhatsApp
            </WhatsAppLink>
          </div>

          <div className="mb-10">
            <p className="font-semibold">Contact — Mathias</p>
            <p className="mb-3 font-body text-[0.85rem] text-kinome-grey">
              Cofondateur — Directeur marketing &amp; stratégie
            </p>
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
            <p className="font-semibold">Contact — Tanguy</p>
            <p className="mb-3 font-body text-[0.85rem] text-kinome-grey">
              Cofondateur — Directeur de création
            </p>
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
            {/* Retour Pastel #152 : « Ils nous font confiance » devient le
                titre, la trentaine de marques passe en sous-titre. */}
            <h2 className="mb-4 font-heading text-[clamp(30px,3.8vw,56px)] font-normal leading-[1.1] text-kinome-black">
              Ils nous font confiance
            </h2>
            <p className="mb-6 font-heading text-[clamp(18px,1.8vw,26px)] font-light leading-[1.35] text-kinome-dark">
              Une trentaine de marques accompagnées depuis Genève
            </p>
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
