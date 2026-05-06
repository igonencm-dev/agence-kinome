/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../lib/contact";
import ContactForm from "./ContactForm";
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
          <h1 className="mb-12 font-heading text-[3rem] font-normal leading-[1.1]">
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

      {/* Bandeau Plan de travail */}
      <section className="my-[60px] bg-kinome-cream py-[80px]">
        <div className="mx-auto max-w-[1728px]">
          <img
            src="/assets/plan-de-travail.png"
            alt="Notre plan de travail"
            className="block h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-kinome-dark px-[5%] py-[120px] text-center text-white">
        <h2 className="mb-16 font-heading text-[3.5rem] font-normal">
          Ils nous font confiance
        </h2>
        <div className="mx-auto flex max-w-[1100px] flex-col items-center">
          <img
            src="/assets/wp/La-Voyagist-780x390px-1.png"
            alt="La Voyagiste"
            className="mb-8 max-w-[480px] w-full rounded-[20px]"
          />
          <p className="mb-8 max-w-[900px] font-body text-[1.15rem] font-light italic leading-[1.6]">
            &ldquo;Très belle expérience pour la création du logo de mon
            agence, de sa charte graphique et des différents éléments de
            communication réalisés tout au long de l&rsquo;année. Une équipe
            créative, à l&rsquo;écoute et toujours avant-gardiste. Je les
            recommande fortement.&rdquo;
          </p>
          <div className="mb-1 font-heading text-[1.4rem] font-semibold">
            Manon Pichereau
          </div>
          <div className="mb-6 italic text-[#888]">La Voyagiste</div>
          <div className="text-[1.4rem] tracking-[5px]">★★★★★</div>
        </div>
      </section>

      {/* CTA bas (section "Vous avez un projet ?") */}
      <section className="mx-auto my-[100px] max-w-[1300px] rounded-[24px] bg-kinome-cream px-[5%] py-[80px] text-center">
        <h2 className="mx-auto mb-6 max-w-[900px] font-heading text-[3rem] font-normal leading-[1.1]">
          Vous avez un projet sur lequel vous souhaitez échanger&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[700px] font-body text-[1.1rem] font-light leading-[1.6] text-kinome-grey">
          Chaque échange est pensé comme le point de départ d&rsquo;une
          collaboration sincère, où la confiance et l&rsquo;engagement commun
          façonnent des résultats à la hauteur de vos ambitions.
        </p>
        <Link
          href="#top"
          className="inline-flex min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Remplir le formulaire
        </Link>
      </section>
    </main>
  );
}
