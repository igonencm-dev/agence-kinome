/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Reveal from "../../components/Reveal";
import Testimonials from "../../components/Testimonials";
import {
  buildMetadata,
  serviceJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "../../lib/seo";

// ---------------------------------------------------------------------------
// Page service « Stratégie de marque » — design Figma de Tanguy
// (node 2202:3734 « Services - Stratégie de marque »).
//
// Deux coquilles du Figma corrigées ici : « Document de référencement » devenu
// « Document de référence » (il s'agit du document de marque, pas de SEO), et
// « Fontation » devenu « Fondation ».
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Stratégie de marque à Genève",
  description:
    "Stratégie de marque à Genève : positionnement, plateforme de marque, personas et ton de voix. Cadrage en 3 à 5 semaines, livré en un document actionnable.",
  path: "/services/strategie-de-marque/",
  keywords: [
    "stratégie de marque Genève",
    "positionnement de marque",
    "plateforme de marque PME",
    "agence branding Genève",
    "atelier de positionnement",
    "ton de voix marque",
  ],
});

/* --------------------------------- Données -------------------------------- */

const CHIFFRES = [
  { valeur: "3 à 5", label: "Semaines de cadrage stratégique" },
  { valeur: "1", label: "Document de référence pour toutes vos équipes" },
  { valeur: "100 %", label: "Fondation posée avant toute création visuelle" },
  { valeur: "0", label: "Jargon : un positionnement dit en une phrase" },
];

const PILIERS = [
  {
    titre: "Le positionnement",
    body: "La place que vous occupez dans l'esprit de votre cible, par rapport à vos concurrents et à ce qu'elle recherche vraiment.",
  },
  {
    titre: "La plateforme de marque",
    body: "Mission, vision, valeurs et promesse, qui expliquent pourquoi l'entreprise existe au-delà de son chiffre d'affaires.",
  },
  {
    titre: "Le ton de voix",
    body: "La manière dont la marque s'exprime, à l'écrit comme à l'oral, pour être reconnaissable même sans logo visible.",
  },
];

const ENJEUX = [
  {
    titre: "Cohérence",
    body: "Une direction commune évite qu'un logo, un site et des réseaux sociaux racontent trois histoires différentes.",
  },
  {
    titre: "Différenciation",
    body: "Un positionnement clair explique pourquoi choisir votre entreprise plutôt qu'un concurrent aux services similaires.",
  },
  {
    titre: "Rapidité",
    body: "Une stratégie posée en amont accélère toutes les décisions créatives qui suivent, sans repartir de zéro à chaque fois.",
  },
];

const METHODE = [
  {
    n: "01",
    titre: "Comprendre l'entreprise de l'intérieur",
    body: "Histoire, ambitions, forces réelles et contraintes sont recueillies directement auprès des dirigeants et des équipes clés.",
  },
  {
    n: "02",
    titre: "Analyser le marché et la concurrence",
    body: "Les concurrents directs et indirects sont étudiés pour identifier les espaces de différenciation encore disponibles.",
  },
  {
    n: "03",
    titre: "Écouter la cible réelle",
    body: "Les attentes, freins et déclencheurs d'achat de votre audience sont pris en compte, au-delà des suppositions internes.",
  },
  {
    n: "04",
    titre: "Formuler un positionnement clair",
    body: "Toutes ces informations convergent vers une formulation simple : ce que vous promettez, à qui, et pourquoi c'est crédible.",
  },
  {
    n: "05",
    titre: "Documenter pour que ça serve vraiment",
    body: "La stratégie est mise par écrit dans un document actionnable, pensé pour guider les décisions créatives à venir, pas pour rester dans un tiroir.",
  },
];

const PROCESSUS = [
  {
    n: "01",
    titre: "Immersion et audit de l'existant",
    body: "On ne définit pas une stratégie sans comprendre l'entreprise en profondeur. Cette première étape recueille l'histoire, les ambitions et les supports existants, à travers des entretiens avec les personnes clés.",
    note: "Livrable : synthèse d'immersion",
  },
  {
    n: "02",
    titre: "Recherche marché et concurrence",
    body: "Une analyse du marché et des concurrents directs et indirects permet d'identifier les espaces de différenciation encore disponibles pour votre marque.",
    note: "Objectif : cartographier le terrain de jeu",
  },
  {
    n: "03",
    titre: "Atelier de positionnement",
    body: "Un atelier collaboratif avec vos équipes fait émerger et challenge les pistes de positionnement, pour converger vers une direction partagée.",
  },
  {
    n: "04",
    titre: "Construction de la plateforme de marque",
    body: "Mission, vision, valeurs, promesse et personas sont formulés avec précision, puis ajustés jusqu'à validation complète, sans jamais repartir de zéro.",
    note: "Objectif : une plateforme claire et partagée",
  },
  {
    n: "05",
    titre: "Ton de voix et messages clés",
    body: "La manière dont la marque s'exprime à l'écrit et à l'oral est définie, avec des exemples concrets et des messages clés prêts à être déclinés.",
    note: "Livrable : guide de ton de voix",
  },
  {
    n: "06",
    titre: "Livraison du document stratégique",
    body: "L'ensemble est compilé dans un document de référence clair, présenté à vos équipes et prêt à guider toutes vos futures décisions créatives.",
    note: "Livrable : document de stratégie de marque complet",
  },
];

const RESULTAT = [
  {
    icon: "/assets/services/marque/positionnement.svg",
    titre: "Positionnement formulé",
    body: "Une formulation claire de ce que vous promettez, à qui, et pourquoi c'est crédible face à vos concurrents.",
  },
  {
    icon: "/assets/services/marque/vision-lunettes.svg",
    titre: "Mission, vision, valeurs",
    body: "Les fondements de l'entreprise, formulés simplement, pour orienter les décisions internes comme externes.",
  },
  {
    icon: "/assets/services/marque/personas.svg",
    titre: "Personas de cible",
    body: "Le profil de vos clients types, leurs attentes et leurs freins, pour ancrer chaque message dans une réalité concrète.",
  },
  {
    icon: "/assets/services/marque/ton-de-voix.svg",
    titre: "Guide de ton de voix",
    body: "La manière dont la marque s'exprime, avec des exemples concrets applicables à tous vos supports de communication.",
  },
  {
    icon: "/assets/services/marque/document-strategique.svg",
    titre: "Document stratégique complet",
    body: "Un document unique, clair et partageable, qui devient la référence de toutes les décisions créatives à venir : logo, site, contenu, campagnes.",
  },
  {
    icon: "/assets/services/marque/base-durable.svg",
    titre: "Une base prête à durer",
    body: "Une stratégie pensée pour rester pertinente plusieurs années, même si son expression visuelle évolue avec le temps.",
  },
];

const SERVICES_LIES = [
  {
    icon: "/assets/services/logo/brandbook.svg",
    titre: "Création de logo",
    body: "Le point de départ de toute identité : un signe graphique fort, qui traduit visuellement le positionnement défini.",
    href: "/services/creation-logo/",
  },
  {
    icon: "/assets/services/marque/service-identite.svg",
    titre: "Identité visuelle",
    body: "Palette de couleurs, typographies, iconographie et règles d'usage : le système graphique complet de votre marque.",
    href: "/services/identite-visuelle/",
  },
  {
    icon: "/assets/services/marque/service-site.svg",
    titre: "Création de site internet",
    body: "Votre stratégie mise en scène : un site qui traduit votre positionnement en parcours de conversion.",
    href: "/services/site-internet/",
  },
];

const PORTFOLIO = [
  {
    img: "/assets/wp/Adapt-Project-780x390px-1.png",
    alt: "Adapt Project, marque accompagnée par Kinome",
    href: "/projets/adapt-project/",
  },
  {
    img: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    alt: "Cabinet Faraday, cabinet dentaire pédiatrique",
    href: "/projets/cabinet-faraday/",
  },
  {
    img: "/assets/wp/Alministratif-780x390px-1.png",
    alt: "Alministratif, service d'accompagnement administratif",
    href: "/projets/alministratif/",
  },
  {
    img: "/assets/wp/Authentik-Peak-780x390px-1.png",
    alt: "Authentik Peak, organisme de formation",
    href: "/projets/authentik-peak/",
  },
];

const FAQ = [
  {
    q: "Combien de temps prend un cadrage stratégique ?",
    a: "Un cadrage stratégique complet se livre généralement en 3 à 5 semaines, incluant les entretiens, la recherche marché et les ateliers de positionnement. Le délai dépend surtout de la disponibilité de vos équipes pour les entretiens et l'atelier.",
  },
  {
    q: "Faut-il une stratégie de marque avant de créer un logo ?",
    a: "Idéalement oui. Sans positionnement clair, chaque décision créative devient une question de goût personnel plutôt qu'une réponse à un objectif. Un logo peut être esthétiquement réussi et ne rien dire de qui vous êtes. Cela dit, pour une petite structure au positionnement déjà évident, un cadrage léger intégré au projet de logo suffit souvent.",
  },
  {
    q: "Combien coûte une stratégie de marque à Genève ?",
    a: "Le cadrage stratégique seul fait l'objet d'un devis après le premier échange, car son périmètre dépend du nombre d'entretiens et d'ateliers nécessaires. Intégré à un branding complet avec l'identité visuelle, l'ensemble se situe généralement entre 8 000 et 25 000 CHF à Genève.",
  },
  {
    q: "Qui doit participer aux ateliers de positionnement ?",
    a: "Les personnes qui décident et celles qui parlent aux clients. En pratique : la direction, et une ou deux personnes du terrain (commercial, service client). Un groupe de trois à six participants fonctionne bien. Au-delà, l'atelier perd en profondeur.",
  },
  {
    q: "Cela fonctionne-t-il pour une petite entreprise ou une startup ?",
    a: "Oui, et c'est souvent là que le retour est le plus rapide. Une petite structure prend beaucoup de décisions de communication avec peu de moyens : un positionnement clair évite de disperser ce budget. Le format est simplement resserré, avec moins d'entretiens et un atelier plus court.",
  },
  {
    q: "La stratégie de marque peut-elle évoluer avec le temps ?",
    a: "Le positionnement est conçu pour tenir plusieurs années, mais il n'est pas figé. Un changement d'offre, de cible ou de marché justifie de le revoir. En pratique, c'est l'expression visuelle qui évolue le plus souvent, pendant que le socle stratégique reste valable.",
  },
];

const BLOG_LINKS = [
  {
    href: "/blog/strategie-branding-geneve/",
    label: "Stratégie de marque à Genève : le guide du branding pour PME",
  },
  {
    href: "/blog/rebranding-refaire-identite-marque/",
    label: "Rebranding : quand et comment refaire sa marque",
  },
  {
    href: "/blog/creer-identite-visuelle-entreprise-geneve/",
    label: "Créer une identité visuelle d'entreprise : le guide",
  },
  {
    href: "/blog/tarifs-agence-communication-geneve/",
    label: "Les tarifs d'une agence de communication à Genève",
  },
];

/* --------------------------------- Styles --------------------------------- */
// Échelle alignée sur /services/creation-logo/ et /services/identite-visuelle/.
const H2 =
  "font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.14] text-kinome-black";
const LEAD =
  "font-body text-[clamp(17px,1.5vw,21px)] font-light leading-[1.5] text-kinome-black";
const BODY =
  "font-body text-[clamp(15px,1.4vw,17px)] font-light leading-[1.55] text-kinome-black";
const CARD_TITLE =
  "font-heading text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.3] text-kinome-black";
const PILL_DARK =
  "btn-fill-accent inline-flex min-w-[240px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 text-center font-body text-[1rem] font-semibold text-white transition-transform duration-300 hover:scale-105";
const STEP_NUM =
  "font-body text-[clamp(30px,3vw,48px)] font-thin leading-none text-kinome-black";
const CARD_HOVER =
  "transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)]";

export default function StrategieDeMarquePage() {
  const service = {
    ...serviceJsonLd(
      "Stratégie de marque à Genève",
      "Cadrage stratégique de marque à Genève : immersion, analyse concurrentielle, atelier de positionnement, plateforme de marque, personas et ton de voix, livrés dans un document de référence."
    ),
    // Les offres chiffrées sont ce que les moteurs de réponse citent quand on
    // leur demande « combien coûte le SEO à Genève ».
    offers: [
      {
        "@type": "Offer",
        name: "Branding complet (stratégie de marque + identité visuelle)",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 8000,
          maxPrice: 25000,
          priceCurrency: "CHF",
        },
      },
    ],
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Stratégie de marque", url: "/services/strategie-de-marque/" },
  ]);
  const faq = faqJsonLd(FAQ.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faq) }}
      />

      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative isolate flex min-h-[clamp(560px,90vh,900px)] items-end overflow-hidden bg-kinome-dark">
        <img
          src="/assets/services/marque/hero-marque-hd.webp"
          alt="Atelier de positionnement, notes repositionnables sur une vitre"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] lg:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.80)_0%,rgba(17,17,17,0.66)_45%,rgba(17,17,17,0.88)_100%)] lg:bg-[linear-gradient(100deg,rgba(17,17,17,0.90)_0%,rgba(17,17,17,0.78)_38%,rgba(17,17,17,0.46)_72%,rgba(17,17,17,0.38)_100%)]"
        />
        <div className="relative mx-auto w-full max-w-[1588px] px-[5%] pb-[clamp(56px,8vw,120px)] pt-[clamp(140px,18vw,300px)]">
          <h1
            className="max-w-[18ch] font-heading text-[clamp(34px,5.5vw,64px)] font-normal leading-[1.12] text-white motion-reduce:!animate-none"
            style={{ animation: "text-focus-in 900ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            Stratégie de marque
          </h1>
          <p
            className="mt-[clamp(20px,3vw,44px)] max-w-[56ch] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.5] text-white/90 motion-reduce:!animate-none"
            style={{ animation: "kinome-fade-in 800ms 220ms ease-out both" }}
          >
            Avant un logo, un site ou une campagne, il y a une décision plus
            importante : savoir précisément qui vous êtes, pour qui, et pourquoi
            on devrait vous choisir vous plutôt qu'un autre. C'est le rôle de la
            stratégie de marque.
          </p>
          <div
            className="mt-[clamp(32px,4.5vw,60px)] flex flex-col gap-4 sm:flex-row sm:flex-wrap motion-reduce:!animate-none"
            style={{ animation: "kinome-fade-in 800ms 420ms ease-out both" }}
          >
            <Link
              href="/contact/"
              className="btn-fill-accent inline-flex min-w-[240px] items-center justify-center rounded-full bg-white px-8 py-4 text-center font-body text-[1rem] font-semibold text-kinome-black transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
            >
              Vous avez un projet&nbsp;?
            </Link>
            <Link
              href="/portfolio/"
              className="btn-fill-white inline-flex min-w-[240px] items-center justify-center rounded-full border border-white px-8 py-4 text-center font-body text-[1rem] font-semibold text-white transition-[transform,color] duration-300 hover:scale-105 hover:text-kinome-black"
            >
              Découvrir nos projets
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------- CHIFFRES ----------------------------- */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <Reveal>
            <h2 className={`${H2} text-center`}>
              Notre fonctionnement en chiffres
            </h2>
          </Reveal>
          <dl className="mt-[clamp(36px,5vw,72px)] grid grid-cols-2 gap-x-6 gap-y-[clamp(36px,5vw,60px)] lg:grid-cols-4">
            {CHIFFRES.map((c, i) => (
              <Reveal key={c.label} delay={i * 110} className="text-center">
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <span className="block font-body text-[clamp(34px,4.5vw,56px)] font-light leading-[1.2] text-kinome-black">
                    {c.valeur}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-3 block max-w-[22ch] font-heading text-[clamp(15px,1.3vw,20px)] font-semibold leading-[1.25] text-kinome-black"
                  >
                    {c.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------ QU'EST-CE QUE LE RÉFÉRENCEMENT NATUREL ------------------ */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <Reveal>
            <h2 className={`${H2} text-center`}>
              Qu'est-ce qu'une stratégie de marque&nbsp;?
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(24px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Une stratégie de marque définit ce que vous représentez et pour
              qui, avant toute traduction visuelle. Elle repose sur trois
              piliers : le positionnement, la plateforme de marque et le ton de
              voix.
            </p>
            <p className={BODY}>
              Sans cette clarté, chaque décision créative devient une question
              de goût personnel plutôt qu'une réponse cohérente à un objectif.
              Un logo, un site ou un post peuvent être esthétiquement réussis et
              pourtant ne rien dire de qui vous êtes réellement.
            </p>
          </Reveal>

          <div className="mt-[clamp(40px,6vw,90px)] grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-2">
            <div className="flex flex-col gap-[clamp(24px,3vw,40px)]">
              {PILIERS.map((c, i) => (
                <Reveal key={c.titre} effect="fade-left" delay={i * 130}>
                  <h3 className={CARD_TITLE}>{c.titre}</h3>
                  <p className={`${BODY} mt-2`}>{c.body}</p>
                </Reveal>
              ))}
              <Reveal delay={PILIERS.length * 130} className="mt-2">
                <Link href="/portfolio/" className={PILL_DARK}>
                  Découvrir nos projets
                </Link>
              </Reveal>
            </div>
            <Reveal
              effect="fade-right"
              className="group aspect-[516/777] overflow-hidden rounded-[20px]"
            >
              <img
                src="/assets/services/marque/atelier-post-its.webp"
                alt="Deux personnes en atelier de positionnement de marque"
                width={1100}
                height={1100}
                loading="lazy"
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------- POURQUOI LA VISIBILITÉ CONDITIONNE LA CROISSANCE --------------- */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <Reveal>
            <h2 className={H2}>
              Pourquoi une stratégie claire précède toute création
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(28px,4vw,60px)] grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Une stratégie claire agit comme un filtre de décision : elle
              permet de dire non aux idées séduisantes mais hors-sujet, et oui à
              celles qui renforcent réellement la marque.
            </p>
            <p className={BODY}>
              Elle accélère aussi le travail créatif qui suit, puisque chaque
              prestataire, interne ou externe, travaille à partir de la même
              référence écrite plutôt que d'une intuition différente à chaque
              projet.
            </p>
          </Reveal>
          <div className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(20px,2.2vw,32px)] md:grid-cols-3">
            {ENJEUX.map((p, i) => (
              <Reveal key={p.titre} delay={i * 130}>
                <div
                  className={`flex h-full flex-col items-center justify-center rounded-[20px] bg-white px-[clamp(24px,3vw,48px)] py-[clamp(40px,6vw,90px)] text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${CARD_HOVER}`}
                >
                  <h3 className={CARD_TITLE}>{p.titre}</h3>
                  <p className={`${BODY} mt-[clamp(16px,2vw,32px)]`}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- COMMENT CONSTRUIT-ON UNE VISIBILITÉ ------------------- */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <Reveal>
              <h2 className={H2}>
                Comment construit-on une stratégie qui tient
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Une bonne stratégie ne sort pas d'une intuition, ni d'un
                brainstorming isolé. Elle se construit à partir de faits : votre
                marché, vos clients, et ce que vous seul pouvez réellement
                promettre.
              </p>
              <div className="mt-[clamp(24px,3vw,44px)]">
                <Link href="/contact/" className={PILL_DARK}>
                  Travaillons ensemble
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="mt-[clamp(36px,5vw,72px)] grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-2">
            <Reveal effect="fade-left" className="lg:sticky lg:top-24">
              <div className="group aspect-[516/779] overflow-hidden rounded-[20px]">
                <img
                  src="/assets/services/marque/plateforme-marque.webp"
                  alt="Travail de recherche et d'analyse concurrentielle sur ordinateur"
                  width={1100}
                  height={684}
                  loading="lazy"
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
            <ol className="flex flex-col gap-[clamp(28px,3.5vw,52px)]">
              {METHODE.map((m, i) => (
                <Reveal
                  key={m.n}
                  as="li"
                  delay={i * 90}
                  className="flex gap-[clamp(16px,2.5vw,40px)]"
                >
                  <span aria-hidden="true" className={STEP_NUM}>
                    {m.n}
                  </span>
                  <div>
                    <h3 className={CARD_TITLE}>{m.titre}</h3>
                    <p className={`${BODY} mt-3`}>{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------ PROCESSUS ------------------------------ */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <Reveal>
              <h2 className={H2}>
                Notre processus
                <br className="hidden sm:block" /> de stratégie de marque
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Six étapes cadrées, de l'immersion initiale à la livraison de
                votre plateforme de marque. Chaque étape produit un livrable
                concret, validé avant de passer à la suivante.
              </p>
              <div className="mt-[clamp(24px,3vw,44px)]">
                <Link href="/portfolio/" className={PILL_DARK}>
                  Découvrir nos projets
                </Link>
              </div>
            </Reveal>
          </div>

          <ol className="mx-auto mt-[clamp(36px,5vw,72px)] flex max-w-[1330px] flex-col">
            {PROCESSUS.map((p, i) => (
              <Reveal
                key={p.n}
                as="li"
                className="relative flex gap-[clamp(16px,3vw,60px)] pb-[clamp(32px,4vw,64px)]"
              >
                <div className="relative flex flex-col items-center">
                  <span aria-hidden="true" className={STEP_NUM}>
                    {p.n}
                  </span>
                  {i < PROCESSUS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-4 w-px flex-1 bg-kinome-black/25"
                    />
                  )}
                </div>
                <div className="pt-[clamp(4px,1vw,14px)]">
                  <h3 className={CARD_TITLE}>{p.titre}</h3>
                  <p className={`${BODY} mt-3`}>{p.body}</p>
                  {p.note && (
                    <p className="mt-3 font-body text-[clamp(12px,1.1vw,14px)] font-semibold uppercase tracking-[0.04em] text-kinome-black">
                      {p.note}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------- LE RÉSULTAT FINAL --------------------------- */}
      <section className="bg-kinome-cream px-[5%] pb-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <Reveal>
              <h2 className={H2}>Le résultat final</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Au terme du projet, vous recevez un document de référence clair,
                qui devient le socle de toutes vos futures décisions de marque et
                de communication.
              </p>
            </Reveal>
          </div>
          <div className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(20px,2.2vw,32px)] sm:grid-cols-2 lg:grid-cols-3">
            {RESULTAT.map((r, i) => (
              <Reveal key={r.titre} delay={(i % 3) * 120}>
                <div className="group flex h-full cursor-default flex-col items-center rounded-[20px] bg-white px-[clamp(24px,3vw,48px)] py-[clamp(36px,4.5vw,64px)] text-center text-kinome-black shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-[350ms] hover:-translate-y-1 hover:bg-kinome-dark hover:text-kinome-cream hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)]">
                  {/* Icônes servies en masque CSS : elles prennent la couleur du
                      texte et s'éclaircissent quand la carte passe en sombre. */}
                  <span
                    aria-hidden="true"
                    className="mb-[clamp(24px,3vw,48px)] block h-[clamp(60px,5.8vw,92px)] w-[clamp(60px,5.8vw,92px)] bg-current transition-transform duration-500 group-hover:scale-110"
                    style={{
                      maskImage: `url(${r.icon})`,
                      WebkitMaskImage: `url(${r.icon})`,
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                    }}
                  />
                  <h3 className="font-heading text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.3]">
                    {r.titre}
                  </h3>
                  <p className="mt-[clamp(14px,1.8vw,28px)] font-body text-[clamp(15px,1.4vw,17px)] font-light leading-[1.55]">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------- EXPLORER NOS SERVICES ------------------------- */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <Reveal>
              <h2 className={H2}>Explorer nos services</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Une fois la stratégie posée, elle se déploie dans chacune de vos
                créations. Ces prestations prennent le relais.
              </p>
            </Reveal>
          </div>
          <div className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(20px,2.2vw,32px)] md:grid-cols-3">
            {SERVICES_LIES.map((s, i) => (
              <Reveal key={s.titre} delay={i * 120}>
                <div
                  className={`group flex h-full flex-col items-center rounded-[20px] bg-kinome-cream px-[clamp(24px,3vw,48px)] py-[clamp(36px,4.5vw,64px)] text-center ${CARD_HOVER}`}
                >
                  <img
                    src={s.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={112}
                    height={112}
                    className="mb-[clamp(20px,2.5vw,40px)] block h-[clamp(60px,5.8vw,92px)] w-[clamp(60px,5.8vw,92px)] object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className={CARD_TITLE}>{s.titre}</h3>
                  <p className={`${BODY} mt-[clamp(14px,1.8vw,28px)] flex-1`}>
                    {s.body}
                  </p>
                  <Link
                    href={s.href}
                    className={`${PILL_DARK} mt-[clamp(24px,3vw,44px)] min-w-0 w-full max-w-[315px]`}
                  >
                    Découvrir le service
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- PORTFOLIO ------------------------------- */}
      <section className="bg-white px-[5%] pb-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1588px]">
          <Reveal>
            <h2 className={`${H2} text-center`}>
              Des marques que nous accompagnons durablement
            </h2>
          </Reveal>
          <div className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(20px,2.2vw,32px)] md:grid-cols-2">
            {PORTFOLIO.map((p, i) => (
              <Reveal key={p.href} delay={(i % 2) * 130}>
                <Link
                  href={p.href}
                  className="group block overflow-hidden rounded-[20px]"
                >
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="block aspect-[2/1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-[clamp(36px,5vw,70px)] flex justify-center">
            <Link href="/portfolio/" className={PILL_DARK}>
              Découvrir nos projets
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------- FAQ ---------------------------------- */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1330px]">
          <Reveal>
            <h2 className={`${H2} text-center`}>
              Questions fréquentes
              <br className="hidden sm:block" /> sur la stratégie de marque
            </h2>
          </Reveal>
          <div className="mt-[clamp(36px,5vw,72px)] flex flex-col gap-[clamp(12px,1.2vw,18px)]">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <details
                  open={i === 0}
                  className="group rounded-[20px] bg-white px-[clamp(20px,3vw,90px)] py-[clamp(20px,2.4vw,36px)] transition-shadow duration-500 hover:shadow-[0_14px_34px_-18px_rgba(0,0,0,0.16)] [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <h3
                      className={`${CARD_TITLE} transition-colors duration-300 group-hover:text-kinome-accent`}
                    >
                      {f.q}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="relative block h-10 w-10 shrink-0 rounded-full border border-kinome-black/25 transition-colors duration-300 group-hover:border-kinome-accent/60"
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-kinome-black" />
                      <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-kinome-black transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p
                    className={`${BODY} mt-[clamp(16px,2vw,28px)] max-w-[900px]`}
                  >
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-[clamp(36px,5vw,70px)] flex justify-center">
            <Link href="/contact/" className={PILL_DARK}>
              D&apos;autres questions&nbsp;?
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- POUR ALLER PLUS LOIN ---------------------------- */}
      <section className="bg-white px-[5%] py-[clamp(50px,7vw,110px)]">
        <div className="mx-auto max-w-[1330px]">
          <Reveal>
            <h2 className={`${H2} mb-[clamp(24px,3vw,48px)]`}>
              Pour aller plus loin
            </h2>
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {BLOG_LINKS.map((l, i) => (
              <Reveal key={l.href} as="li" delay={(i % 2) * 110}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-3 rounded-[14px] bg-kinome-cream px-5 py-4 font-body text-[1.05rem] font-light text-kinome-black transition-colors hover:bg-kinome-dark hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="text-kinome-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                  >
                    &rarr;
                  </span>
                  {l.label}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------- ILS NOUS FONT CONFIANCE ------------------------- */}
      <Testimonials />

      {/* ------------------------------- CTA FINAL ------------------------------- */}
      {/* Carte sombre arrondie, nouveau motif introduit par Tanguy dans ce
          design (node 2236:6588). */}
      <section className="bg-white px-[5%] py-[clamp(50px,7vw,110px)]">
        <Reveal className="mx-auto max-w-[1330px] rounded-[20px] bg-kinome-dark px-[5%] py-[clamp(50px,7vw,90px)] text-center text-kinome-cream">
          <h2 className="font-heading text-[clamp(26px,3.4vw,46px)] font-normal leading-[1.15]">
            Un projet en tête&nbsp;?
          </h2>
          <p className="mx-auto mt-[clamp(16px,2.2vw,28px)] max-w-[680px] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.6] text-kinome-cream/85">
            Parlez-nous de vos enjeux et de vos contraintes : nous reviendrons
            vers vous avec une proposition cadrée. Diagnostic stratégique offert
            de 30 minutes.
          </p>
          <div className="mt-[clamp(28px,4vw,44px)] flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact/"
              className="btn-fill-accent inline-flex min-w-[260px] items-center justify-center rounded-full bg-white px-8 py-4 text-center font-body text-[1rem] font-semibold text-kinome-black transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
            >
              Discutons de votre projet
            </Link>
            <Link
              href="/portfolio/"
              className="btn-fill-white inline-flex min-w-[260px] items-center justify-center rounded-full border-2 border-white px-8 py-4 text-center font-body text-[1rem] font-semibold text-white transition-[transform,color] duration-300 hover:scale-105 hover:text-kinome-black"
            >
              Voir nos projets
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
