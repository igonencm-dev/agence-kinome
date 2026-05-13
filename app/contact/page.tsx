/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../lib/contact";
import ContactForm from "./ContactForm";
import Testimonials from "../components/Testimonials";
import LogosMarqueeVertical from "../components/LogosMarqueeVertical";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez l'Agence Kinome à Genève pour discuter de votre projet de communication, identité visuelle, création de logo ou site internet. Un appel découverte gratuit pour explorer ensemble les possibilités.",
  path: "/contact/",
  keywords: [
    "contact agence Genève",
    "devis logo Genève",
    "devis site internet Genève",
    "rendez-vous communication",
  ],
});

export default function ContactPage() {
  return (
    <main className="pt-[140px]">
      {/* Bloc principal : adresse + formulaire */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-[5%] py-[40px] lg:grid-cols-[1fr_1.3fr]">
        <div className="font-body text-[1.15rem] leading-[1.6] text-kinome-black">
          <h1 className="mb-12 font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.05] text-kinome-black">
            Échangeons.
          </h1>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Adresse</p>
            <p className="text-kinome-grey">
              {contact.agency.name}
              <br />
              Genève, Suisse
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
            <p className="max-w-[480px] font-body text-[clamp(15px,1.2vw,18px)] font-light leading-[1.6] text-kinome-grey lg:mx-0 mx-auto">
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
      <section className="mx-auto my-[100px] max-w-[1300px] rounded-[24px] bg-kinome-cream px-[5%] py-[80px] text-center">
        <h2 className="mx-auto mb-6 max-w-[900px] font-heading text-[clamp(24px,4.5vw,48px)] font-normal leading-[1.1]">
          Vous avez un projet sur lequel vous souhaitez échanger&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[700px] font-body text-[1.1rem] font-light leading-[1.6] text-kinome-grey">
          Chaque échange est pensé comme le point de départ d&rsquo;une
          collaboration sincère, où la confiance et l&rsquo;engagement commun
          façonnent des résultats à la hauteur de vos ambitions.
        </p>
        <Link
          href="#top"
          className="inline-flex min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Remplir le formulaire
        </Link>
      </section>
    </main>
  );
}
