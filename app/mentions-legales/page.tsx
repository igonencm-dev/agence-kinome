import Link from "next/link";
import { contact } from "../lib/contact";
import { buildMetadata, SITE, BUSINESS } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales de l'Agence Kinome Sàrl, agence de communication à Genève (Suisse) : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales/",
  noIndex: false,
});

export default function MentionsLegalesPage() {
  return (
    <main className="bg-kinome-cream pt-[160px]">
      <article className="mx-auto max-w-[820px] px-[5%] pb-[120px]">
        <h1 className="mb-10 font-heading text-[clamp(32px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
          Mentions légales
        </h1>

        <p className="mb-10 font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
          Conformément aux dispositions de la Loi fédérale suisse contre la
          concurrence déloyale (LCD) et de la loi française n° 2004-575 du 21
          juin 2004 (LCEN), les visiteurs et utilisateurs du site
          agence-kinome.ch sont informés de l&rsquo;identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Éditeur du site
          </h2>
          <div className="space-y-1 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <p><strong>Raison sociale :</strong> {SITE.legalName}</p>
            <p><strong>Forme juridique :</strong> Société à responsabilité limitée (Sàrl) de droit suisse</p>
            <p><strong>Siège social :</strong> {BUSINESS.city}, {BUSINESS.countryName}</p>
            <p><strong>Adresse e-mail :</strong>{" "}
              <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
                {BUSINESS.email}
              </a>
            </p>
            <p>
              <strong>Représentants légaux :</strong> Mathias Igonenc &amp; Tanguy Deniel, cofondateurs
            </p>
            <p>
              <strong>Directeur de la publication :</strong> Mathias Igonenc
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Hébergement
          </h2>
          <div className="space-y-1 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <p><strong>Hébergeur :</strong> Hostinger International Ltd.</p>
            <p><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
            <p>
              <strong>Site web :</strong>{" "}
              <a
                href="https://www.hostinger.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-kinome-accent"
              >
                hostinger.fr
              </a>
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Propriété intellectuelle
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            L&rsquo;ensemble du contenu présent sur le site agence-kinome.ch
            (textes, images, illustrations, logos, vidéos, articles de blog,
            réalisations clients) est, sauf mention contraire, la propriété
            exclusive de {SITE.legalName} ou de ses clients respectifs, et est
            protégé par les lois suisses et internationales relatives à la
            propriété intellectuelle.
          </p>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Toute reproduction, représentation, modification, publication ou
            adaptation de tout ou partie des éléments du site, quel que soit
            le moyen ou le procédé utilisé, est interdite sauf autorisation
            écrite préalable de Kinome ou du client concerné.
          </p>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Les visuels des projets affichés dans le portfolio sont publiés
            avec l&rsquo;accord des clients concernés. Les marques et logos
            tiers (clients, partenaires) demeurent la propriété de leurs
            détenteurs respectifs.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Liens hypertextes
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Le site agence-kinome.ch peut contenir des liens vers d&rsquo;autres
            sites internet. Kinome n&rsquo;exerce aucun contrôle sur ces sites
            et décline toute responsabilité quant à leur contenu, leur
            politique de confidentialité ou leur disponibilité.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Responsabilité
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Kinome s&rsquo;efforce d&rsquo;assurer l&rsquo;exactitude et la
            mise à jour des informations diffusées sur ce site, dont elle se
            réserve le droit de corriger ou de modifier à tout moment le
            contenu sans préavis.
          </p>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Kinome ne peut être tenue responsable des dommages directs ou
            indirects résultant de l&rsquo;utilisation du site, de l&rsquo;impossibilité
            d&rsquo;y accéder ou de la confiance accordée à une information
            qu&rsquo;il contient.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Droit applicable et juridiction
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Les présentes mentions légales sont régies par le droit suisse.
            En cas de litige et à défaut d&rsquo;accord amiable, le tribunal
            compétent du canton de Genève sera seul habilité à connaître du
            différend.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Contact
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Pour toute question relative à ces mentions légales, ou pour
            signaler un contenu litigieux :{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>
          </p>
        </section>

        <p className="mt-10 font-body text-[0.85rem] italic text-kinome-grey">
          Dernière mise à jour : 11 mai 2026.
        </p>

        <div className="mt-12 border-t border-[#e0ddd6] pt-8 text-center">
          <Link
            href="/politique-de-confidentialite/"
            className="font-heading text-[0.95rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
          >
            Voir aussi : Politique de confidentialité →
          </Link>
        </div>
      </article>
    </main>
  );
}
