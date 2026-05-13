/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../lib/contact";
import ServiceIcon, { type ServiceIconName } from "../components/ServiceIcon";
import VisualDiary from "../components/VisualDiary";
import Testimonials from "../components/Testimonials";
import { buildMetadata, jsonLdScript, SITE } from "../lib/seo";

export const metadata = buildMetadata({
  title: "À propos de l'agence",
  description:
    "Kinome est une agence de communication indépendante basée à Genève. Découvrez notre équipe, nos principes — engagement, transparence, créativité — et les douze expertises que nous mobilisons pour donner vie aux projets de marques en Suisse romande et au-delà.",
  path: "/a-propos/",
  keywords: [
    "agence Kinome équipe",
    "agence indépendante Genève",
    "studio création Genève",
    "branding humain",
  ],
});

// JSON-LD Person pour Mathias + Tanguy — apparition possible dans le
// Knowledge Graph Google avec leurs photos + intitulés.
const personsLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/a-propos/#mathias`,
      name: "Mathias Igonenc",
      jobTitle: "Cofondateur & directeur marketing",
      worksFor: { "@id": `${SITE.url}/#organization` },
      image: `${SITE.url}/assets/wp/apropos-team-mathias.png`,
      email: contact.emails.mathias,
      telephone: contact.phones.mathias.e164,
      url: `${SITE.url}/a-propos/`,
      sameAs: [contact.social.linkedinMathias],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Genève",
        addressCountry: "CH",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/a-propos/#tanguy`,
      name: "Tanguy Deniel",
      jobTitle: "Cofondateur",
      worksFor: { "@id": `${SITE.url}/#organization` },
      image: `${SITE.url}/assets/wp/apropos-team-tanguy.png`,
      email: contact.emails.tanguy,
      telephone: contact.phones.tanguy.e164,
      url: `${SITE.url}/a-propos/`,
      sameAs: [contact.social.linkedinTanguy],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Genève",
        addressCountry: "CH",
      },
    },
  ],
};

const principes = [
  {
    type: "text" as const,
    title: "Engagement",
    body: "Nous nous engageons totalement dans chaque projet. Votre réussite est la nôtre : nous traitons votre marque avec autant de soin que si elle était la nôtre.",
  },
  {
    type: "text" as const,
    title: "Intelligence",
    body: "Chaque recommandation s'appuie sur l'analyse, l'écoute et l'expérience. Nous préférons la pertinence à l'effet de mode.",
  },
  {
    type: "photo" as const,
    src: "/assets/wp/apropos-principe-photo1.jpg",
  },
  {
    type: "photo" as const,
    src: "/assets/wp/apropos-principe-photo2.jpg",
  },
  {
    type: "text" as const,
    title: "Empathie",
    body: "Comprendre votre métier, votre équipe, vos contraintes. La bonne idée naît toujours d'une écoute attentive.",
  },
  {
    type: "text" as const,
    title: "Parler vrai",
    body: "Nous disons ce que nous pensons, même quand ce n'est pas l'attendu. La franchise est le socle d'une collaboration durable.",
  },
];

const specs = [
  {
    img: "/assets/wp/apropos-preparons-photo1-scaled.jpg",
    title: "On démarre ?",
    lead: "Chaque projet commence par une conversation.",
    body: "On prend le temps d'échanger pour comprendre votre contexte, vos ambitions et vos contraintes. Ensuite seulement, on propose. Pas de template, pas de recette toute faite : une réponse sur-mesure, pensée pour vous.",
    cta: { label: "Prendre rendez-vous", href: "/contact/" },
    reverse: false,
  },
  {
    img: "/assets/wp/apropos-preparons-photo2-scaled.jpg",
    title: "Vous voulez en savoir plus ?",
    lead: "Découvrez notre processus client.",
    body: "De la première réunion à la livraison, chaque étape est pensée pour vous donner de la visibilité et vous impliquer dans les décisions clés. Transparence, cadence, livrables — tout est clair dès le départ.",
    cta: { label: "Processus client", href: "/processus/" },
    reverse: true,
  },
];

const services: { title: string; icon: ServiceIconName; desc: string }[] = [
  {
    title: "Impression",
    icon: "impression",
    desc: "Flyers, cartes de visite, brochures… Tous vos supports imprimés conçus avec soin.",
  },
  {
    title: "Illustration",
    icon: "illustration",
    desc: "Des illustrations sur-mesure pour donner vie à vos idées et enrichir vos contenus.",
  },
  {
    title: "Chatbot",
    icon: "chatbot",
    desc: "Automatisez la relation client avec des chatbots intelligents et personnalisés.",
  },
  {
    title: "Vidéo",
    icon: "video",
    desc: "Motion design, captations, montages — racontez votre marque en images animées.",
  },
  {
    title: "Pictogramme",
    icon: "pictogramme",
    desc: "Icônes et pictogrammes créés pour renforcer votre identité visuelle.",
  },
  {
    // Retour #111 : "Site interactif" remplacé par "Site internet" — terme
    // plus standard et plus aligné sur le SEO recherché par les visiteurs.
    title: "Site internet",
    icon: "site-interactif",
    desc: "Sites web modernes, rapides, performants et adaptés à tous les écrans.",
  },
  {
    title: "Affiche",
    icon: "affiche",
    desc: "Affiches et posters percutants pour vos événements et campagnes.",
  },
  {
    title: "PDF interactif",
    icon: "pdf-interactif",
    desc: "Documents interactifs avec navigation fluide et éléments cliquables.",
  },
  {
    title: "One pager",
    icon: "one-pager",
    desc: "Une page web unique pour présenter votre projet de manière élégante.",
  },
  {
    title: "Réseaux sociaux",
    icon: "reseaux-sociaux",
    desc: "Stratégie, visuels, planning éditorial — nous boostons votre présence en ligne.",
  },
  {
    title: "Photographie",
    icon: "photographie",
    desc: "Shootings produits, corporate, événements — des images qui valorisent votre marque.",
  },
  {
    title: "Campagne",
    icon: "campagne",
    desc: "Concepts créatifs et déploiement multicanal pour vos campagnes de communication.",
  },
];

export default function AProposPage() {
  return (
    <main>
      {/* JSON-LD : Person × 2 (Mathias + Tanguy) — Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personsLd) }}
      />

      {/* Hero — 2 colonnes : titre + Visual Diary */}
      <section className="bg-kinome-cream px-[5%] pt-[180px] pb-[100px]">
        <div className="mx-auto grid max-w-[1588px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <h1 className="max-w-[900px] font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.12] text-kinome-black">
            Kinome, l&rsquo;agence de communication qui vous accompagne avec
            sincérité.
          </h1>
          <div className="flex justify-center text-kinome-dark lg:justify-end">
            <VisualDiary className="block w-full max-w-[500px]" />
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="bg-white px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Notre équipe
          </h2>
          <p className="mt-6 max-w-[1100px] font-body text-[clamp(20px,1.75vw,28px)] font-light leading-[1.5]">
            Une équipe à taille humaine, animée par l&rsquo;envie de bien
            faire, l&rsquo;écoute et la curiosité.
            <br />
            On croit qu&rsquo;une agence ne se résume pas à ses créations mais
            avant tout aux personnes qui les portent.
          </p>

          <div className="mx-auto mt-[clamp(50px,6vw,90px)] grid max-w-[1200px] grid-cols-1 gap-[clamp(30px,3vw,50px)] md:grid-cols-2">
            <article>
              {/* Retour #105 : meilleur rendu image (decoding async + image
                  smoothing, eager pour la photo Mathias qui est souvent
                  above-the-fold à scroll initial). */}
              <div className="mb-8 aspect-[3/4] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                <img
                  src="/assets/wp/apropos-team-mathias.png"
                  alt="Mathias Igonenc — fondateur de Kinome"
                  className="block h-full w-full object-cover object-[center_top] [image-rendering:auto]"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <h3 className="mb-3 font-heading text-[clamp(22px,1.9vw,30px)] font-bold leading-[1.3]">
                Mathias Igonenc{" "}
                <span className="font-light">
                  — cofondateur &amp; directeur marketing
                </span>
              </h3>
              <p className="mb-4 font-body text-[clamp(15px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                Après plus de dix ans passés en agences et studios de
                création, Mathias a fondé Kinome pour accompagner les marques
                avec une approche plus humaine : écouter avant de proposer,
                construire plutôt que livrer.
              </p>
              <a
                href={contact.social.linkedinMathias}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[clamp(15px,1.2vw,18px)] font-bold underline hover:opacity-70"
              >
                LinkedIn
              </a>
            </article>

            <article>
              <div className="mb-8 aspect-[3/4] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                <img
                  src="/assets/wp/apropos-team-tanguy.png"
                  alt="Tanguy Deniel — Kinome"
                  className="block h-full w-full object-cover object-[center_top] [image-rendering:auto]"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <h3 className="mb-3 font-heading text-[clamp(22px,1.9vw,30px)] font-bold leading-[1.3]">
                Tanguy Deniel{" "}
                <span className="font-light">
                  — cofondateur &amp; directeur de création
                </span>
              </h3>
              <p className="mb-4 font-body text-[clamp(15px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                Tanguy a travaillé au sein de diverses agences de communication
                à travers le monde (TBWA, Dix-Sept et Enderby à Paris, la RTS
                à Genève, LMG à Montréal). Aujourd&rsquo;hui chez Kinome, il
                garde ce lien direct, émotionnel et privilégié avec ses
                clients.
              </p>
              <a
                href={contact.social.linkedinTanguy}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[clamp(15px,1.2vw,18px)] font-bold underline hover:opacity-70"
              >
                LinkedIn
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Nos principes — 3x2 (4 textes + 2 photos en sandwich) */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Nos principes
          </h2>
          {/* Retour #112 : sous-titre resserré à 3 lignes max (cap font-size
              + max-w + line-clamp-3 par sécurité). */}
          <p className="mt-6 line-clamp-3 max-w-[1000px] font-body text-[clamp(18px,1.5vw,24px)] font-light leading-[1.45]">
            Quatre valeurs guident chacune de nos décisions, de la première
            réunion à la livraison finale.
          </p>

          <div className="mt-[clamp(50px,6vw,90px)] grid grid-cols-1 gap-[clamp(20px,1.8vw,30px)] sm:grid-cols-2 lg:grid-cols-3">
            {principes.map((p, i) =>
              p.type === "text" ? (
                <article
                  key={i}
                  className="flex min-h-[clamp(260px,28vw,400px)] flex-col rounded-[20px] bg-white p-[clamp(30px,3vw,60px)]"
                >
                  <h3 className="mb-5 font-heading text-[clamp(22px,1.9vw,30px)] font-semibold leading-[1.3] text-kinome-black">
                    {p.title}
                  </h3>
                  <p className="font-body text-[clamp(15px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                    {p.body}
                  </p>
                </article>
              ) : (
                <div
                  key={i}
                  className="min-h-[clamp(260px,28vw,400px)] overflow-hidden rounded-[20px] bg-[#e9e4d8]"
                >
                  <img
                    src={p.src}
                    alt=""
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Préparons ensemble */}
      <section className="bg-white px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="mx-auto max-w-[1200px] text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Préparons ensemble
            <br />
            votre prochain projet&nbsp;!
          </h2>

          <div className="mt-[clamp(40px,5vw,80px)] flex flex-col gap-[clamp(30px,3vw,50px)]">
            {specs.map((s) => (
              <div
                key={s.title}
                className={`grid grid-cols-1 items-center gap-[clamp(40px,5vw,100px)] rounded-[20px] bg-kinome-cream p-[clamp(40px,5vw,90px)] lg:grid-cols-2`}
              >
                <div
                  className={`aspect-[657/536] overflow-hidden rounded-[20px] bg-[#e9e4d8] ${
                    s.reverse ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={s.img}
                    alt=""
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="lazy"
                  />
                </div>
                <div className={`max-w-[547px] ${s.reverse ? "lg:order-1" : ""}`}>
                  <h3 className="mb-5 font-heading text-[clamp(24px,2.1vw,30px)] font-semibold leading-[1.3]">
                    {s.title}
                  </h3>
                  <p className="mb-5 font-body text-[clamp(16px,1.35vw,22px)] font-bold leading-[1.55]">
                    {s.lead}
                  </p>
                  <p className="mb-6 font-body text-[clamp(15px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
                    {s.body}
                  </p>
                  <Link
                    href={s.cta.href}
                    className="inline-flex items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(16px,1.3vw,20px)] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
                  >
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos services — 12 cards 4x3 avec EFFET HOVER */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Nos services
          </h2>
          <p className="mx-auto mt-6 max-w-[900px] text-center font-body text-[clamp(20px,1.75vw,28px)] font-light leading-[1.5]">
            Un panel complet pour vous accompagner de A à Z.
          </p>

          {/* Retours #107 + #108 :
              - #107 : icônes divisées par ~2.5 (240→96 max)
              - #108 : standardisation visuelle des SVG via un padding interne
                de 12 % sur le wrapper. Les 12 SVG ont des viewBox différents
                (114×98, 104×95, etc.) qui les faisaient paraître plus ou moins
                "remplis" dans leur carré → certaines avaient l'air cassées.
                Le padding force une marge visuelle constante qui les harmonise. */}
          <div className="mt-[clamp(50px,6vw,90px)] grid grid-cols-1 gap-[clamp(12px,1vw,18px)] md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article
                key={s.title}
                className="group flex min-h-[clamp(220px,20vw,320px)] cursor-pointer flex-col items-center gap-[clamp(14px,1.2vw,20px)] rounded-[20px] bg-white p-[clamp(24px,2vw,36px)] text-center text-kinome-black transition-all duration-[350ms] hover:-translate-y-1 hover:bg-kinome-dark hover:text-kinome-cream hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)]"
              >
                <div className="flex aspect-square w-full max-w-[clamp(56px,5.6vw,96px)] flex-shrink-0 items-center justify-center p-[12%]">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3 className="font-heading text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.3]">
                  {s.title}
                </h3>
                <p className="line-clamp-3 font-body text-[clamp(14px,1.1vw,17px)] font-light leading-[1.5] opacity-90">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-[clamp(40px,4vw,60px)] text-center">
            <Link
              href="/services/"
              className="inline-flex items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(16px,1.3vw,20px)] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages (composant partagé) */}
      <Testimonials />

      {/* CTA contact form */}
      <section
        id="cta-form"
        className="bg-kinome-cream px-[5%] py-[clamp(80px,10vw,180px)]"
      >
        <div className="mx-auto max-w-[1588px]">
          <h2 className="mx-auto mb-[clamp(50px,6vw,90px)] max-w-[1100px] text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Vous avez un projet sur lequel
            <br />
            vous souhaitez échanger&nbsp;?
          </h2>

          <div className="mx-auto mb-[clamp(40px,6vw,80px)] grid max-w-[1588px] grid-cols-1 gap-[clamp(40px,5vw,90px)] lg:grid-cols-2">
            <p className="font-body text-[clamp(20px,1.75vw,28px)] font-light leading-[1.5] text-kinome-dark">
              Chaque échange est pensé comme le point de départ d&rsquo;une
              collaboration sincère, où la confiance et l&rsquo;engagement
              commun façonnent des résultats à la hauteur de vos ambitions.
            </p>
            <p className="font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
              Nous serons ravis de vous accompagner et d&rsquo;explorer
              ensemble les meilleures solutions pour le faire grandir. Que
              vous ayez une idée précise ou que vous soyez en quête
              d&rsquo;inspiration, notre équipe est à votre écoute pour
              comprendre vos besoins, partager nos idées et co-construire avec
              vous des réponses créatives et stratégiques. N&rsquo;hésitez pas
              à nous contacter pour discuter de vos ambitions, de vos défis et
              des objectifs que vous souhaitez atteindre. Ensemble, donnons
              vie à vos projets et transformons-les en succès&nbsp;!
            </p>
          </div>

          <div className="mx-auto flex justify-center">
            <Link
              href="/contact/"
              className="inline-flex min-w-[300px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(16px,1.3vw,20px)] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
            >
              Discutons de votre projet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
