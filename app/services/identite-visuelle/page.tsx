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
// Page service « Identité visuelle » — design Figma de Tanguy
// (node 2216:4048 « Services - Identité visuelle »).
//
// L'URL existait déjà : on garde le chemin pour conserver l'acquis SEO, et on
// maintient le recentrage fait en juillet, le mot-clé « création de logo »
// appartenant désormais à /services/creation-logo/.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Création d'identité visuelle à Genève",
  description:
    "Identité visuelle et charte graphique à Genève : palette, typographies, gabarits et règles d'usage. Livrée en 4 à 6 semaines, de 4 000 à 15 000 CHF.",
  path: "/services/identite-visuelle/",
  keywords: [
    "création identité visuelle Genève",
    "charte graphique entreprise",
    "agence branding Genève",
    "identité de marque PME Suisse",
    "prix charte graphique",
  ],
});

/* --------------------------------- Données -------------------------------- */

const CHIFFRES = [
  { valeur: "30 à 60", label: "Pages de charte graphique livrées" },
  { valeur: "4 à 6", label: "Semaines de la conception à la livraison" },
  { valeur: "100 %", label: "Des supports cadrés par des règles écrites" },
  { valeur: "0", label: "Template : chaque système est sur-mesure" },
];

const PILIERS = [
  {
    titre: "Une palette de couleurs",
    body: "Les teintes principales et secondaires de la marque, avec leurs codes exacts (RVB, CMJN, HEX) pour un rendu identique sur tous les supports.",
  },
  {
    titre: "Un système typographique",
    body: "Les polices de titres et de texte courant, avec leurs graisses et hiérarchies, pour une lecture cohérente partout.",
  },
  {
    titre: "Des règles d'usage",
    body: "Mise en page, iconographie, traitement photo et gabarits, qui cadrent la création de tout nouveau support sans repartir de zéro.",
  },
];

const ENJEUX = [
  {
    titre: "Reconnaissance",
    body: "Une identité cohérente sur tous les supports renforce la mémorisation de la marque à chaque point de contact.",
  },
  {
    titre: "Autonomie",
    body: "Une charte graphique claire permet à vos équipes ou à vos prestataires de produire du contenu fidèle, sans validation permanente.",
  },
  {
    titre: "Professionnalisme",
    body: "La cohérence entre les supports réduit les doutes : une marque qui se tient inspire davantage confiance qu'une marque qui change de visage.",
  },
];

const METHODE = [
  {
    n: "01",
    titre: "Partir du logo et de la stratégie",
    body: "Le logo existant ou en cours de création sert de point de départ, avec la stratégie de marque qui l'accompagne : positionnement, cible, valeurs.",
  },
  {
    n: "02",
    titre: "Définir la palette et la typographie",
    body: "Les couleurs et polices sont choisies pour prolonger l'univers du logo, avec des codes précis et des hiérarchies claires entre titres et textes.",
  },
  {
    n: "03",
    titre: "Construire les gabarits clés",
    body: "Les supports les plus utilisés (réseaux sociaux, papeterie, présentations) sont maquettés en premier, pour valider le système sur des cas concrets.",
  },
  {
    n: "04",
    titre: "Fixer les règles d'usage",
    body: "Zones de protection, interdits graphiques et bonnes pratiques sont documentés, pour que le système reste cohérent entre les mains de tous.",
  },
  {
    n: "05",
    titre: "Livrer un document de référence",
    body: "L'ensemble est compilé dans une charte graphique claire, pensée pour être consultée facilement par vos équipes et vos prestataires.",
  },
];

const PROCESSUS = [
  {
    n: "01",
    titre: "Cadrage et audit de l'existant",
    body: "On ne construit pas une identité sur du vide. Cette première étape analyse le logo et les supports existants, la cible et le positionnement de la marque, ainsi que l'univers concurrentiel, pour définir un cap clair.",
    note: "Livrable : brief stratégique validé",
  },
  {
    n: "02",
    titre: "Recherche et direction créative",
    body: "Une exploration visuelle permet d'aligner la direction avant la création : moodboard de styles, palettes et typographies candidates, références graphiques cohérentes.",
    note: "Objectif : valider une direction avant création",
  },
  {
    n: "03",
    titre: "Construction du système graphique",
    body: "Palette de couleurs, typographies, iconographie et éléments graphiques distinctifs sont définis pour former un système cohérent et reconnaissable.",
  },
  {
    n: "04",
    titre: "Maquettage des supports clés",
    body: "Les gabarits des supports prioritaires (réseaux sociaux, papeterie, présentations, signalétique) sont créés et ajustés jusqu'à validation, sans jamais repartir de zéro.",
    note: "Objectif : valider le système sur des cas réels",
  },
  {
    n: "05",
    titre: "Rédaction de la charte graphique",
    body: "L'ensemble des règles, interdits et exemples d'application est compilé dans un document de référence clair, destiné à vos équipes et prestataires.",
    note: "Livrable : charte graphique complète",
  },
  {
    n: "06",
    titre: "Livraison finale",
    body: "Un pack complet est remis, prêt à l'usage sur tous vos supports, print comme digital, accompagné de la charte et des fichiers sources.",
    note: "Livrable : pack complet + charte graphique",
  },
];

const RESULTAT = [
  {
    icon: "/assets/services/identite/charte.svg",
    titre: "Charte graphique de 30 à 60 pages",
    body: "Palette, typographies, iconographie, règles d'usage et exemples d'application, réunis dans un document de référence clair.",
  },
  {
    icon: "/assets/services/identite/couleurs.svg",
    titre: "Codes couleurs complets",
    body: "Codes RVB, CMJN, HEX et Pantone si nécessaire, pour un rendu fidèle du digital au print.",
  },
  {
    icon: "/assets/services/identite/typographie.svg",
    titre: "Système typographique",
    body: "Polices de titres et de texte courant, licences associées, et hiérarchies définies pour tous vos supports.",
  },
  {
    icon: "/assets/services/identite/gabarits.svg",
    titre: "Gabarits prêts à l'emploi",
    body: "Modèles pour réseaux sociaux, présentations, papeterie et signalétique, directement réutilisables par vos équipes.",
  },
  {
    icon: "/assets/services/identite/interdits.svg",
    titre: "Interdits et bonnes pratiques",
    body: "Ce qu'il ne faut jamais faire avec la marque (déformations, mauvaises couleurs, associations à éviter), pour préserver la cohérence dans le temps.",
  },
  {
    icon: "/assets/services/logo/symbole-durable.svg",
    titre: "Une image prête à durer",
    body: "Un système graphique pensé pour absorber de nouveaux supports sans jamais perdre en cohérence, même plusieurs années après sa création.",
  },
];

const SERVICES_LIES = [
  {
    icon: "/assets/services/logo/brandbook.svg",
    titre: "Création de logo",
    body: "Le point de départ de toute identité : un signe graphique fort, autour duquel se construit le système complet.",
    href: "/services/creation-logo/",
  },
  {
    icon: "/assets/services/logo/service-seo.svg",
    titre: "Référencement naturel",
    body: "Une stratégie de contenu et une structure technique pensées pour être identifié durablement dans les recherches Google.",
    href: "/services/referencement-naturel/",
  },
  {
    icon: "/assets/services/marque/service-marque.svg",
    titre: "Stratégie de marque",
    body: "Le socle qui précède l'identité : positionnement, plateforme de marque et ton de voix, formulés noir sur blanc.",
    href: "/services/strategie-de-marque/",
  },
];

const PORTFOLIO = [
  {
    img: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    alt: "Identité visuelle du Cabinet Faraday, cabinet dentaire pédiatrique",
    href: "/projets/cabinet-faraday/",
  },
  {
    img: "/assets/wp/Authentik-Peak-780x390px-1.png",
    alt: "Identité visuelle d'Authentik Peak, organisme de formation",
    href: "/projets/authentik-peak/",
  },
  {
    img: "/assets/wp/Adapt-Project-780x390px-1.png",
    alt: "Identité visuelle d'Adapt Project",
    href: "/projets/adapt-project/",
  },
  {
    img: "/assets/wp/Alministratif-780x390px-1.png",
    alt: "Identité visuelle d'Alministratif",
    href: "/projets/alministratif/",
  },
];

const FAQ = [
  {
    q: "Combien de temps prend la création d'une identité visuelle ?",
    a: "Une identité visuelle complète se livre généralement en 4 à 6 semaines, cadrage compris. Ce délai peut varier selon le nombre de supports à maquetter et si le logo doit être créé en parallèle. Un logo seul, sans charte, se livre en 2 à 3 semaines.",
  },
  {
    q: "Combien coûte une identité visuelle à Genève ?",
    a: "Pour un logo seul, comptez 1 500 à 5 000 CHF. Pour une identité visuelle complète (logo, charte graphique et déclinaisons), 4 000 à 15 000 CHF. Pour un branding 360° incluant la stratégie de marque et le site internet, à partir de 15 000 CHF. Nous établissons toujours un devis transparent adapté à votre projet.",
  },
  {
    q: "Quelle est la différence entre un logo et une identité visuelle ?",
    a: "Le logo est le signe qui identifie la marque. L'identité visuelle est le système complet qui l'entoure : palette de couleurs, typographies, iconographie, traitement photo et règles d'usage. Un logo seul ne suffit pas à rendre une marque reconnaissable sur tous ses supports, c'est le système qui crée la cohérence.",
  },
  {
    q: "Faut-il déjà avoir un logo pour commencer ?",
    a: "Non. Nous pouvons partir d'un logo existant, le retravailler, ou le créer en même temps que l'identité. Dans ce dernier cas, le projet est simplement plus long et le logo est validé avant la construction du système graphique.",
  },
  {
    q: "Mes équipes pourront-elles créer des supports elles-mêmes ?",
    a: "Oui, c'est même l'objectif de la charte. Elle contient des gabarits prêts à l'emploi pour vos réseaux sociaux, vos présentations et votre papeterie, ainsi que les règles et les interdits. Vos équipes ou vos prestataires produisent des supports fidèles sans avoir à demander une validation à chaque fois.",
  },
  {
    q: "Que se passe-t-il si la marque évolue dans quelques années ?",
    a: "Le système est conçu pour absorber de nouveaux supports sans perdre en cohérence. Si le positionnement change en profondeur, une refonte d'identité est justifiée : nous la traitons alors comme un projet à part entière, en préservant ce qui reste pertinent.",
  },
];

const BLOG_LINKS = [
  {
    href: "/blog/creer-identite-visuelle-entreprise-geneve/",
    label: "Créer une identité visuelle d'entreprise : le guide complet",
  },
  {
    href: "/blog/charte-graphique-pme-guide/",
    label: "La charte graphique d'entreprise expliquée",
  },
  {
    href: "/blog/etude-de-cas-logo-tampon-audition/",
    label: "Étude de cas : l'identité de Tampon Audition",
  },
  {
    href: "/blog/refonte-identite-visuelle-quand-repenser-marque/",
    label: "Refonte d'identité : 6 signaux qu'il est temps",
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

export default function IdentiteVisuellePage() {
  const service = {
    ...serviceJsonLd(
      "Création d'identité visuelle et de charte graphique à Genève",
      "Conception du système graphique complet d'une marque à Genève : palette de couleurs, typographies, iconographie, gabarits de supports et charte graphique de 30 à 60 pages."
    ),
    // Les offres chiffrées sont ce que les moteurs de réponse citent quand on
    // leur demande « combien coûte le SEO à Genève ».
    offers: [
      {
        "@type": "Offer",
        name: "Identité visuelle complète (logo + charte graphique)",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 4000,
          maxPrice: 15000,
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "Offer",
        name: "Branding 360° (stratégie + identité + site internet)",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 15000,
          priceCurrency: "CHF",
        },
      },
    ],
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Identité visuelle", url: "/services/identite-visuelle/" },
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
          src="/assets/services/identite/hero-identite-hd.webp"
          alt="Tote bag Le Ravenala, déclinaison d'une identité visuelle"
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
            Identité visuelle et charte graphique
          </h1>
          <p
            className="mt-[clamp(20px,3vw,44px)] max-w-[56ch] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.5] text-white/90 motion-reduce:!animate-none"
            style={{ animation: "kinome-fade-in 800ms 220ms ease-out both" }}
          >
            Un logo seul ne suffit pas à faire reconnaître une marque. Nous
            construisons le système graphique complet autour de lui : couleurs,
            typographies, règles d'usage, pour une image cohérente sur tous vos
            supports.
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
              Qu'est-ce qu'une identité visuelle&nbsp;?
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(24px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              L'identité visuelle est le système graphique complet qui entoure
              votre logo. Elle repose sur trois ensembles de décisions : une
              palette de couleurs, un système typographique et des règles
              d'usage.
            </p>
            <p className={BODY}>
              Chaque support incohérent dilue la mémorisation de la marque : un
              site qui ne ressemble pas aux réseaux sociaux, une plaquette qui
              ne ressemble pas au site. Une charte graphique claire évite cette
              dispersion et permet à quiconque, en interne comme en externe, de
              produire un support fidèle.
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
                src="/assets/services/identite/totebag-authentik-peak.webp"
                alt="Tote bag imprimé, déclinaison d'identité visuelle sur un support textile"
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
              Pourquoi une identité cohérente renforce la marque
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(28px,4vw,60px)] grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Une marque se mémorise par répétition. Si chaque support raconte
              une histoire visuelle différente, la répétition n'opère pas et
              l'effort de communication se dilue au lieu de s'accumuler.
            </p>
            <p className={BODY}>
              La cohérence est aussi un gain de temps : avec des règles écrites
              et des gabarits prêts, vos équipes produisent sans repartir de zéro
              et sans solliciter une validation à chaque support.
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
                Comment construit-on une identité cohérente
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Une charte graphique ne s'improvise pas après coup. Elle se
                construit en même temps que la réflexion de marque, pour que
                chaque règle réponde à un usage réel.
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
                  src="/assets/services/identite/badges-cinars.webp"
                  alt="Badges imprimés reprenant l'identité visuelle d'une marque"
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
                <br className="hidden sm:block" /> de création d'identité
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Six étapes cadrées, du cadrage stratégique à la livraison de la
                charte complète. Chaque étape produit un livrable concret, validé
                avant de passer à la suivante.
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
                Au terme du projet, vous recevez un système graphique complet et
                un document de référence qui garantit une image cohérente sur
                tous vos supports, pour plusieurs années.
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
                L'identité visuelle prend tout son sens une fois déployée et
                rendue visible. Ces prestations complètent votre présence de
                marque.
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
              Des identités déployées, des marques reconnues
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
              <br className="hidden sm:block" /> sur l'identité visuelle
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
