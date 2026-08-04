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
// Page service « Création de site internet » — design Figma de Tanguy
// (node 2201:3419 « Services - Site internet »).
//
// L'URL existait depuis juillet avec une landing plus simple. On garde le même
// chemin pour ne rien perdre de l'acquis SEO : seul le contenu change, et les
// deux questions de FAQ de l'ancienne version qui visaient de vraies requêtes
// (refonte, choix de techno) sont conservées en plus des 5 du design.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Création de site internet à Genève",
  description:
    "Création de site internet à Genève : site vitrine, e-commerce ou application web. Livraison en 6 à 10 semaines, dès 3 000 CHF. Diagnostic de 30 minutes offert.",
  path: "/services/site-internet/",
  keywords: [
    "création site internet Genève",
    "agence web Genève",
    "site vitrine Suisse romande",
    "création site e-commerce Genève",
    "refonte site internet Genève",
    "prix site internet Suisse",
  ],
});

/* --------------------------------- Données -------------------------------- */

const CHIFFRES = [
  { valeur: "6 à 10", label: "Semaines de la conception à la mise en ligne" },
  { valeur: "100 %", label: "Responsive, mobile et tablette" },
  { valeur: "< 3 s", label: "Temps de chargement visé" },
  { valeur: "0", label: "Template : chaque site est sur-mesure" },
];

const PILIERS = [
  {
    titre: "Le site vitrine",
    body: "Il présente l'entreprise, ses services et ses preuves de crédibilité, pour convertir un visiteur en prise de contact.",
  },
  {
    titre: "Le site e-commerce",
    body: "Il permet la vente en ligne directe, avec catalogue, paiement et gestion des commandes.",
  },
  {
    titre: "L'application web",
    body: "Un outil interactif sur-mesure, au-delà du simple site : espace client, plateforme, outil métier.",
  },
];

const ENJEUX = [
  {
    titre: "3 secondes",
    body: "Passé ce délai de chargement, une part importante des visiteurs quitte la page sans attendre.",
  },
  {
    titre: "Mobile d'abord",
    body: "La majorité du trafic web se fait aujourd'hui sur mobile : un site non adapté perd une audience importante.",
  },
  {
    titre: "Confiance",
    body: "Un site clair, rapide et à jour rassure un visiteur avant même qu'il ait lu le moindre argument commercial.",
  },
];

const METHODE = [
  {
    n: "01",
    titre: "Définir les objectifs et l'arborescence",
    body: "Les objectifs du site (prise de contact, vente, notoriété) et la structure des pages sont définis en premier, pour que chaque page ait un rôle clair.",
  },
  {
    n: "02",
    titre: "Construire les parcours utilisateurs",
    body: "Des maquettes fonctionnelles (wireframes) organisent le contenu et les actions attendues sur chaque page, avant tout habillage visuel.",
  },
  {
    n: "03",
    titre: "Concevoir le design visuel",
    body: "L'identité de marque est déclinée en interface : couleurs, typographies, images, dans un design qui installe la confiance et guide l'oeil.",
  },
  {
    n: "04",
    titre: "Développer et intégrer",
    body: "Le site est développé pour être rapide, sécurisé et facile à maintenir, avec un back-office adapté à votre niveau d'autonomie souhaité.",
  },
  {
    n: "05",
    titre: "Tester avant la mise en ligne",
    body: "Chaque page est vérifiée sur mobile, tablette et ordinateur, et les bases du référencement technique sont posées avant le lancement.",
  },
];

const PROCESSUS = [
  {
    n: "01",
    titre: "Cadrage et arborescence",
    body: "On ne construit pas un site sans savoir ce qu'il doit accomplir. Cette première étape définit les objectifs du site, la cible visée, le contenu nécessaire et l'arborescence complète des pages.",
    note: "Livrable : arborescence et cahier des charges validés",
  },
  {
    n: "02",
    titre: "Wireframes et parcours utilisateur",
    body: "Des maquettes fonctionnelles organisent le contenu et les actions attendues sur chaque page clé, pour valider la structure avant tout habillage visuel.",
    note: "Objectif : valider les parcours avant le design",
  },
  {
    n: "03",
    titre: "Design UI",
    body: "L'identité de marque est déclinée en interface complète : pages principales, composants, responsive mobile et tablette.",
  },
  {
    n: "04",
    titre: "Développement et intégration",
    body: "Le site est développé et intégré avec une attention particulière portée à la vitesse, la sécurité et la facilité de mise à jour. Les ajustements se poursuivent jusqu'à validation complète.",
    note: "Objectif : un site fiable, rapide et maintenable",
  },
  {
    n: "05",
    titre: "Contenu et référencement technique",
    body: "Les textes et visuels finaux sont intégrés, et les bases du SEO technique (balises, structure, vitesse, indexation) sont posées pour préparer la visibilité du site.",
    note: "Livrable : site prêt pour l'indexation Google",
  },
  {
    n: "06",
    titre: "Tests, formation et mise en ligne",
    body: "Le site est testé sur tous les supports, vos équipes sont formées à son utilisation, puis le site est mis en ligne accompagné d'un guide d'utilisation.",
    note: "Livrable : site en ligne + guide d'utilisation",
  },
];

const RESULTAT = [
  {
    icon: "/assets/services/site/site-rapide.svg",
    titre: "Site rapide et responsive",
    body: "Optimisé pour un chargement rapide et un affichage impeccable sur mobile, tablette et ordinateur.",
  },
  {
    icon: "/assets/services/site/back-office.svg",
    titre: "Back-office autonome",
    body: "Un espace d'administration simple, pour modifier textes et images sans compétence technique.",
  },
  {
    icon: "/assets/services/site/securite.svg",
    titre: "Sécurité et hébergement",
    body: "Certificat SSL, sauvegardes régulières et recommandations d'hébergement adaptées à votre trafic.",
  },
  {
    icon: "/assets/services/site/bases-seo.svg",
    titre: "Bases SEO posées",
    body: "Structure, balises et vitesse optimisées dès le lancement, pour préparer le référencement naturel.",
  },
  {
    icon: "/assets/services/site/formation.svg",
    titre: "Formation de vos équipes",
    body: "Une session de prise en main du back-office, accompagnée d'un guide d'utilisation écrit, pour que vous soyez autonome sur les mises à jour courantes.",
  },
  {
    icon: "/assets/services/site/evolutif.svg",
    titre: "Un site prêt à évoluer",
    body: "Une architecture pensée pour accueillir de nouvelles pages ou fonctionnalités sans tout reconstruire, à mesure que votre activité grandit.",
  },
];

const SERVICES_LIES = [
  {
    icon: "/assets/services/site/service-identite.svg",
    titre: "Identité visuelle",
    body: "Palette de couleurs, typographies, iconographie et règles d'usage : le système graphique complet de votre marque.",
    href: "/services/identite-visuelle/",
  },
  {
    icon: "/assets/services/logo/formats-vectoriels.svg",
    titre: "Création de logo",
    body: "Le point de départ de toute identité : un signe graphique fort, pensé pour être décliné sur votre site.",
    href: "/services/creation-logo/",
  },
  {
    icon: "/assets/services/logo/service-seo.svg",
    titre: "Référencement naturel",
    body: "Une stratégie de contenu et une structure technique pensées pour être identifié durablement dans les recherches Google.",
    href: "/services/referencement-naturel/",
  },
];

const PORTFOLIO = [
  {
    img: "/assets/wp/Adapt-Project-780x390px-1.png",
    alt: "Adapt Project, site réalisé par Kinome",
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

// Les 5 questions du design, plus les 2 de l'ancienne version de la page qui
// visaient de vraies requêtes (refonte, choix de techno) : une refonte de page
// ne doit pas faire perdre de surface de réponse.
const FAQ = [
  {
    q: "Combien de temps prend la création d'un site internet ?",
    a: "Un site vitrine se livre généralement en 6 à 10 semaines, cadrage compris. Un site e-commerce ou une application web sur-mesure demande davantage de temps selon les fonctionnalités attendues. Votre réactivité sur les validations et la fourniture des contenus influence directement le planning.",
  },
  {
    q: "Combien coûte la création d'un site internet à Genève ?",
    a: "Un site vitrine professionnel se situe entre 3 000 et 12 000 CHF selon le nombre de pages et le niveau de sur-mesure. Un site e-commerce démarre autour de 8 000 CHF et peut monter à 30 000 CHF selon le catalogue et les intégrations. Une refonte de site existant démarre dès 3 000 CHF. Le devis est toujours établi après le cadrage.",
  },
  {
    q: "Pourrai-je modifier le contenu moi-même après la livraison ?",
    a: "Oui. Chaque site est livré avec un back-office adapté à votre niveau d'autonomie, et une session de formation est prévue avant la mise en ligne. Vous pouvez modifier les textes, les images et ajouter des pages sans compétence technique. Un guide d'utilisation écrit vous reste comme référence.",
  },
  {
    q: "Pouvez-vous refaire mon site internet existant ?",
    a: "Oui, la refonte est une part importante de notre activité : audit de l'existant, redesign aligné sur votre marque, migration technique et préservation de votre référencement (redirections, balises, positions acquises). Une refonte démarre dès 3 000 CHF.",
  },
  {
    q: "WordPress, Webflow ou sur-mesure : que choisirez-vous pour mon site ?",
    a: "Cela dépend de votre besoin réel : autonomie de mise à jour, budget, fonctionnalités. Nous travaillons avec les deux mondes (CMS et sur-mesure Next.js ou Astro) et recommandons l'approche la plus simple qui remplit vos objectifs, pas la plus chère.",
  },
  {
    q: "Le site sera-t-il bien référencé sur Google dès sa mise en ligne ?",
    a: "Les bases techniques du référencement sont posées avant le lancement : structure des URL, balises, vitesse, compatibilité mobile, indexation. Cela garantit que Google peut lire et comprendre le site. En revanche, se positionner sur des recherches concurrentielles demande un travail de contenu dans la durée, que couvre notre prestation de référencement naturel.",
  },
  {
    q: "Que se passe-t-il après la mise en ligne ?",
    a: "Vous restez propriétaire du site et de ses fichiers sources. Nous proposons un accompagnement optionnel pour la maintenance technique, les évolutions et le référencement, mais rien ne vous y oblige : le site est conçu pour être repris par n'importe quel prestataire compétent.",
  },
];

const BLOG_LINKS = [
  {
    href: "/blog/creation-site-internet-geneve-guide/",
    label: "Créer un site internet à Genève : le guide complet",
  },
  {
    href: "/blog/prix-site-internet-suisse-2026/",
    label: "Prix d'un site internet en Suisse : les fourchettes réelles",
  },
  {
    href: "/blog/wordpress-webflow-sur-mesure-comparatif/",
    label: "WordPress, Webflow ou sur-mesure : quelle techno choisir ?",
  },
  {
    href: "/blog/erreurs-refonte-site-web/",
    label: "Refonte de site : 6 erreurs à éviter sans perdre son SEO",
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

export default function SiteInternetPage() {
  const service = {
    ...serviceJsonLd(
      "Création de site internet à Genève",
      "Conception et développement de sites internet à Genève : site vitrine, e-commerce ou application web sur-mesure, livrés rapides, sécurisés et prêts pour le référencement."
    ),
    // Les offres chiffrées sont ce que les moteurs de réponse citent quand on
    // leur demande « combien coûte le SEO à Genève ».
    offers: [
      {
        "@type": "Offer",
        name: "Site vitrine",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 3000,
          maxPrice: 12000,
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "Offer",
        name: "Site e-commerce",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 8000,
          maxPrice: 30000,
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "Offer",
        name: "Refonte de site existant",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 3000,
          priceCurrency: "CHF",
        },
      },
    ],
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Création de site internet", url: "/services/site-internet/" },
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
          src="/assets/services/site/photo-hero.webp"
          alt="Site internet affiché sur un ordinateur portable"
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
            Création de site internet à Genève
          </h1>
          <p
            className="mt-[clamp(20px,3vw,44px)] max-w-[56ch] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.5] text-white/90 motion-reduce:!animate-none"
            style={{ animation: "kinome-fade-in 800ms 220ms ease-out both" }}
          >
            Un site internet n'est pas une brochure en ligne, c'est votre
            meilleur commercial : disponible 24 h/24, capable de convaincre un
            visiteur avant même le premier contact humain. Nous concevons des
            sites rapides, clairs et pensés pour convertir.
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
              Qu'est-ce qu'un site internet performant&nbsp;?
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(24px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Un site internet professionnel est bien plus qu'une suite de
              pages en ligne : c'est un outil de conversion, pensé pour guider
              un visiteur, répondre à ses questions et le transformer en client,
              sans intervention humaine.
            </p>
            <p className={BODY}>
              Un bon site combine trois dimensions qui doivent avancer
              ensemble : une structure claire qui organise l'information, un
              design qui installe la confiance, et une technique fiable qui
              garantit rapidité et sécurité. Négliger l'une des trois fragilise
              les deux autres.
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
                src="/assets/services/site/photo-portrait1.webp"
                alt="Site internet responsive affiché sur une tablette"
                width={1100}
                height={619}
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
              Pourquoi un site performant conditionne la confiance
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(28px,4vw,60px)] grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Un site lent, mal structuré ou illisible sur mobile fait fuir un
              visiteur avant même qu'il ait lu votre offre. À l'inverse, un site
              clair et rapide installe la confiance dès les premières secondes
              et laisse le temps à votre message de convaincre.
            </p>
            <p className={BODY}>
              Le site est souvent le premier contact réel avec votre entreprise,
              avant même un appel ou un rendez-vous. Sa qualité perçue devient,
              dans l'esprit du visiteur, un indicateur direct du sérieux de vos
              services : un site daté ou peu soigné fait douter, quelle que soit
              la qualité réelle de votre travail.
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
                Comment concevoir un site qui convertit
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Un bon site ne commence jamais par le design. Il commence par
                la réflexion sur ce que doit faire chaque page, avant même de
                penser à son apparence.
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
                  src="/assets/services/site/photo-portrait2.webp"
                  alt="Site internet réalisé par Kinome affiché sur un ordinateur portable"
                  width={1100}
                  height={619}
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
                <br className="hidden sm:block" /> de création de site internet
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Six étapes cadrées, du cadrage stratégique à la mise en ligne.
                Chaque étape produit un livrable concret, validé avant de passer
                à la suivante.
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
                    <p className="mt-3 font-body text-[clamp(12px,1.1vw,14px)] font-medium uppercase tracking-[0.04em] text-kinome-grey">
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
                Au terme du projet, vous recevez un site en ligne, fonctionnel,
                sur lequel votre équipe est formée, et prêt à évoluer avec votre
                activité.
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
                    className="mb-[clamp(24px,3vw,48px)] block h-[clamp(72px,7vw,112px)] w-[clamp(72px,7vw,112px)] bg-current transition-transform duration-500 group-hover:scale-110"
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
                Un site performant s'appuie sur une marque forte et une
                visibilité travaillée. Ces prestations complètent votre présence
                en ligne.
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
                    className="mb-[clamp(20px,2.5vw,40px)] block h-[clamp(72px,7vw,112px)] w-[clamp(72px,7vw,112px)] object-contain transition-transform duration-500 group-hover:scale-110"
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
              Des sites livrés, des marques renforcées
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
              <br className="hidden sm:block" /> sur la création de site internet
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
