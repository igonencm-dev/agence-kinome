import Link from "next/link";
import { contact } from "../lib/contact";
import { buildMetadata, SITE, BUSINESS } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de l'Agence Kinome : traitement des données personnelles, cookies, droits RGPD et LPD suisse, sécurité des données.",
  path: "/politique-de-confidentialite/",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="bg-kinome-cream pt-[160px]">
      <article className="mx-auto max-w-[820px] px-[5%] pb-[120px]">
        <h1 className="mb-10 font-heading text-[clamp(32px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
          Politique de confidentialité
        </h1>

        <p className="mb-10 font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
          La présente politique décrit la manière dont {SITE.legalName} (ci-après
          « Kinome », « nous ») collecte, utilise et protège vos données
          personnelles lorsque vous visitez agence-kinome.ch ou que vous
          entrez en contact avec nous. Elle s&rsquo;inscrit dans le respect du
          Règlement général sur la protection des données (RGPD — UE
          2016/679) et de la Loi fédérale suisse sur la protection des
          données (LPD).
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            1. Responsable du traitement
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Le responsable du traitement des données est {SITE.legalName}, dont
            le siège est à {BUSINESS.city}, {BUSINESS.countryName}. Contact :{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            2. Données collectées
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Nous collectons uniquement les données strictement nécessaires aux
            finalités identifiées ci-dessous.
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Formulaire de contact :</strong> prénom, nom, e-mail,
              société, besoin exprimé, message. Adresse IP et horodatage à
              des fins anti-spam.
            </li>
            <li>
              <strong>Échanges par e-mail :</strong> contenu des messages et
              informations partagées dans le cadre de notre relation
              commerciale.
            </li>
            <li>
              <strong>Mesure d&rsquo;audience (Google Analytics 4) :</strong>{" "}
              uniquement après votre consentement explicite via le bandeau
              cookies. Données pseudonymisées (IP tronquée), pages visitées,
              durée, source de trafic, type d&rsquo;appareil.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            3. Finalités et bases légales
          </h2>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Répondre à vos demandes :</strong> exécution de mesures
              précontractuelles à votre demande (art. 6.1.b RGPD).
            </li>
            <li>
              <strong>Vous adresser nos offres et publications :</strong>{" "}
              uniquement avec votre consentement explicite (art. 6.1.a
              RGPD).
            </li>
            <li>
              <strong>Mesurer l&rsquo;audience du site :</strong> intérêt
              légitime à améliorer notre service, soumis à votre consentement
              préalable (art. 6.1.a RGPD).
            </li>
            <li>
              <strong>Respecter nos obligations légales et comptables :</strong>{" "}
              obligation légale (art. 6.1.c RGPD).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            4. Durée de conservation
          </h2>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Messages du formulaire :</strong> 3 ans après le dernier
              contact, sauf demande de suppression antérieure.
            </li>
            <li>
              <strong>Données clients (contrats, factures) :</strong> 10 ans
              conformément aux obligations comptables suisses (art. 958f
              CO).
            </li>
            <li>
              <strong>Cookies de mesure d&rsquo;audience :</strong> 13 mois
              maximum (recommandation CNIL).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            5. Destinataires des données
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Vos données ne sont jamais vendues. Elles sont accessibles
            uniquement à :
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>L&rsquo;équipe Kinome (Mathias, Tanguy) ;</li>
            <li>
              Nos sous-traitants techniques :{" "}
              <strong>Hostinger</strong> (hébergement, e-mail), <strong>Google</strong>{" "}
              (Analytics, si consentement). Ces prestataires agissent
              uniquement selon nos instructions et offrent des garanties
              suffisantes de sécurité.
            </li>
          </ul>
          <p className="mt-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            En cas de transfert hors UE/Suisse (par exemple via Google), il
            s&rsquo;appuie sur les clauses contractuelles types validées par
            la Commission européenne.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            6. Vos droits
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Conformément au RGPD et à la LPD suisse, vous disposez à tout
            moment des droits suivants :
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>Droit d&rsquo;accès à vos données ;</li>
            <li>Droit de rectification de données inexactes ;</li>
            <li>Droit à l&rsquo;effacement (« droit à l&rsquo;oubli ») ;</li>
            <li>Droit à la limitation du traitement ;</li>
            <li>Droit à la portabilité de vos données ;</li>
            <li>Droit d&rsquo;opposition au traitement ;</li>
            <li>Droit de retirer votre consentement à tout moment ;</li>
            <li>
              Droit d&rsquo;introduire une réclamation auprès d&rsquo;une
              autorité de contrôle (Préposé fédéral à la protection des
              données et à la transparence — PFPDT en Suisse, CNIL en
              France).
            </li>
          </ul>
          <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Pour exercer ces droits, écrivez-nous à{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>
            . Nous répondrons sous un délai maximum de 30 jours.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            7. Cookies
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Notre site utilise deux catégories de cookies :
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Cookies strictement nécessaires :</strong> indispensables
              au fonctionnement du site (mémorisation de votre choix sur le
              bandeau de consentement). Ils ne nécessitent pas votre accord.
            </li>
            <li>
              <strong>Cookies de mesure d&rsquo;audience (Google Analytics 4) :</strong>{" "}
              utilisés uniquement si vous y avez consenti explicitement via
              le bandeau. Ils nous aident à comprendre l&rsquo;usage du site
              de manière anonymisée. Vous pouvez retirer votre consentement
              à tout moment en cliquant sur « Gérer mes cookies » en bas de
              page.
            </li>
          </ul>
          <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Aucun cookie publicitaire, de profilage marketing ou de réseaux
            sociaux tiers n&rsquo;est déposé.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            8. Sécurité
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Le site est servi exclusivement en HTTPS (TLS 1.3). Les
            formulaires sont protégés contre le spam (honeypot, rate limit).
            Les sauvegardes serveur sont effectuées quotidiennement par
            l&rsquo;hébergeur. L&rsquo;accès à nos systèmes est restreint à
            l&rsquo;équipe Kinome via authentification forte.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            9. Modifications
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Cette politique peut être amenée à évoluer pour s&rsquo;adapter
            aux évolutions légales ou techniques. Toute modification
            significative vous sera signalée sur le site.
          </p>
        </section>

        <p className="mt-10 font-body text-[0.85rem] italic text-kinome-grey">
          Dernière mise à jour : 11 mai 2026.
        </p>

        <div className="mt-12 border-t border-[#e0ddd6] pt-8 text-center">
          <Link
            href="/mentions-legales/"
            className="font-heading text-[0.95rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
          >
            Voir aussi : Mentions légales →
          </Link>
        </div>
      </article>
    </main>
  );
}
