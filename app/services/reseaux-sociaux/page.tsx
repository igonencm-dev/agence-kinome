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
// Page service « Réseaux sociaux et contenus créatifs » — design Figma de
// Tanguy (node 2216:4364 « Services - Réseaux sociaux »).
//
// C'est le second service à revenu récurrent avec le SEO, et celui qui
// hébergera l'offre de fin d'année (cartes de voeux, posts créatifs) prévue
// pour la rentrée.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Réseaux sociaux et community management à Genève",
  description:
    "Gestion des réseaux sociaux à Genève : ligne éditoriale, production de contenus, community management et reporting mensuel. Forfaits dès 1 500 CHF par mois.",
  path: "/services/reseaux-sociaux/",
  keywords: [
    "community management Genève",
    "gestion réseaux sociaux Genève",
    "agence social media Suisse romande",
    "création de contenu Instagram LinkedIn",
    "prix community management",
  ],
});

/* --------------------------------- Données -------------------------------- */

const CHIFFRES = [
  { valeur: "1", label: "Ligne éditoriale claire pour tous vos formats" },
  { valeur: "4 à 12", label: "Contenus produits par mois selon le rythme choisi" },
  { valeur: "100 %", label: "Des contenus produits sur mesure pour votre marque" },
  { valeur: "0", label: "Contenu générique : chaque post sert un objectif" },
];

const PILIERS = [
  {
    titre: "La ligne éditoriale",
    body: "Les thématiques, le ton et les formats récurrents qui structurent votre prise de parole dans la durée.",
  },
  {
    titre: "La production créative",
    body: "Photo, vidéo, motion design ou graphisme, adaptés aux codes de chaque plateforme.",
  },
  {
    titre: "Le community management",
    body: "La publication, la modération et l'animation des échanges avec votre audience au quotidien.",
  },
];

const ENJEUX = [
  {
    titre: "Preuve sociale",
    body: "Un compte actif et soigné rassure un prospect qui vérifie votre sérieux avant de vous contacter.",
  },
  {
    titre: "Régularité",
    body: "Une présence constante entretient la mémorisation de la marque, bien au-delà du moment de la publication.",
  },
  {
    titre: "Proximité",
    body: "Le format social permet un dialogue direct avec votre audience, impossible sur d'autres supports plus formels.",
  },
];

const METHODE = [
  {
    n: "01",
    titre: "Choisir les bonnes plateformes",
    body: "Toutes les plateformes ne servent pas votre audience de la même façon. La priorité est donnée à celles où se trouve réellement votre cible.",
  },
  {
    n: "02",
    titre: "Définir une ligne éditoriale",
    body: "Thématiques récurrentes, ton et formats sont posés pour que chaque publication serve la mémorisation de la marque, pas seulement le moment présent.",
  },
  {
    n: "03",
    titre: "Planifier avant de produire",
    body: "Un calendrier éditorial organise les contenus à l'avance, pour garder de la cohérence sans improviser au dernier moment.",
  },
  {
    n: "04",
    titre: "Produire avec exigence",
    body: "Chaque contenu (photo, vidéo, design) est produit avec un vrai soin créatif, adapté aux codes visuels et techniques de chaque plateforme.",
  },
  {
    n: "05",
    titre: "Analyser et ajuster",
    body: "Les performances de chaque contenu sont suivies pour affiner la ligne éditoriale au fil du temps, selon ce qui engage réellement votre audience.",
  },
];

const PROCESSUS = [
  {
    n: "01",
    titre: "Audit et benchmark",
    body: "On ne publie pas sans savoir d'où l'on part. Cette première étape analyse vos comptes existants, votre audience et les meilleures pratiques de vos concurrents et références sectorielles.",
    note: "Livrable : rapport d'audit social",
  },
  {
    n: "02",
    titre: "Stratégie éditoriale et direction créative",
    body: "Les thématiques, le ton et l'identité visuelle des contenus sont définis, pour poser une direction claire avant toute production.",
    note: "Objectif : valider une ligne éditoriale avant production",
  },
  {
    n: "03",
    titre: "Calendrier éditorial",
    body: "Les contenus à venir sont planifiés dans un calendrier mensuel, avec un équilibre pensé entre notoriété, engagement et conversion.",
  },
  {
    n: "04",
    titre: "Production des contenus",
    body: "Photo, vidéo, motion design ou graphisme sont produits selon le calendrier validé, avec des allers-retours d'ajustement jusqu'à validation, sans jamais repartir de zéro.",
    note: "Objectif : des contenus fidèles à la marque",
  },
  {
    n: "05",
    titre: "Publication et community management",
    body: "Les contenus sont publiés aux moments optimaux, et la communauté est animée au quotidien : commentaires, messages, modération.",
    note: "Livrable : comptes actifs et animés",
  },
  {
    n: "06",
    titre: "Reporting et ajustements",
    body: "Les performances sont analysées chaque mois, avec un rapport clair et des ajustements réguliers de la ligne éditoriale selon ce qui fonctionne réellement.",
    note: "Livrable : rapport mensuel + plan d'action",
  },
];

const RESULTAT = [
  {
    icon: "/assets/services/social/calendrier.svg",
    titre: "Calendrier éditorial mensuel",
    body: "Une planification claire des contenus à venir, équilibrée entre notoriété, engagement et conversion.",
  },
  {
    icon: "/assets/services/social/contenus.svg",
    titre: "Contenus prêts à publier",
    body: "Photos, vidéos et visuels produits selon votre identité de marque, adaptés aux codes de chaque plateforme.",
  },
  {
    icon: "/assets/services/social/community.svg",
    titre: "Community management",
    body: "Publication, modération et animation de votre communauté au quotidien, pour un compte réellement vivant.",
  },
  {
    icon: "/assets/services/social/gabarits.svg",
    titre: "Gabarits réseaux sociaux",
    body: "Des modèles réutilisables pour publier rapidement et garder une cohérence visuelle, même en dehors des périodes d'accompagnement.",
  },
  {
    icon: "/assets/services/social/rapport.svg",
    titre: "Rapport mensuel de performance",
    body: "Portée, engagement et croissance de votre audience suivis dans un rapport clair, accompagné d'un plan d'action pour le mois suivant.",
  },
  {
    icon: "/assets/services/social/duree.svg",
    titre: "Une présence qui dure",
    body: "Une ligne éditoriale pensée pour rester cohérente et pertinente, tout en s'adaptant aux tendances de chaque plateforme.",
  },
];

const SERVICES_LIES = [
  {
    icon: "/assets/services/marque/positionnement.svg",
    titre: "Stratégie de marque",
    body: "Le positionnement et le ton de voix qui donnent du sens à chacun de vos contenus.",
    href: "/services/strategie-de-marque/",
  },
  {
    icon: "/assets/services/social/service-identite.svg",
    titre: "Identité visuelle",
    body: "Palette de couleurs, typographies, iconographie et règles d'usage : le système graphique complet de votre marque.",
    href: "/services/identite-visuelle/",
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
    q: "À quelle fréquence faut-il publier sur les réseaux sociaux ?",
    a: "Le rythme est adapté à vos objectifs et à votre budget, généralement entre 4 et 12 publications par mois selon les plateformes couvertes. Il est défini ensemble lors du cadrage initial. Mieux vaut un rythme tenable dans la durée qu'un démarrage intense suivi d'un silence.",
  },
  {
    q: "Combien coûte la gestion des réseaux sociaux à Genève ?",
    a: "Les forfaits mensuels démarrent généralement autour de 1 500 CHF par mois pour un accompagnement régulier incluant la ligne éditoriale, la production des contenus et le community management. Le montant dépend du nombre de plateformes, du volume de contenus et de la part de production vidéo. Un devis est établi après le cadrage.",
  },
  {
    q: "Sur quelles plateformes faut-il être présent ?",
    a: "Uniquement celles où se trouve réellement votre cible. Pour une PME B2B genevoise, LinkedIn est souvent prioritaire. Pour un commerce ou un lieu, Instagram prime. Être présent partout avec peu de moyens donne de moins bons résultats qu'une présence soignée sur une ou deux plateformes.",
  },
  {
    q: "Puis-je garder la main sur ce qui est publié ?",
    a: "Oui. Le calendrier éditorial est validé avec vous avant toute production, et les contenus vous sont soumis avant publication. Une fois la confiance installée, certains clients préfèrent alléger ce circuit de validation pour gagner en réactivité, mais rien n'est imposé.",
  },
  {
    q: "Que se passe-t-il si nous arrêtons l'accompagnement ?",
    a: "Vous conservez vos comptes, vos contenus et les gabarits produits. La charte éditoriale et les modèles réutilisables sont conçus pour que vos équipes puissent prendre le relais sans repartir de zéro.",
  },
];

const BLOG_LINKS = [
  {
    href: "/blog/communication-360-geneve/",
    label: "Communication 360° à Genève : canaux et budget",
  },
  {
    href: "/blog/strategie-branding-geneve/",
    label: "Stratégie de marque : le guide du branding pour PME",
  },
  {
    href: "/blog/tarifs-agence-communication-geneve/",
    label: "Les tarifs d'une agence de communication à Genève",
  },
  {
    href: "/blog/tendances-design-graphique-2026/",
    label: "Tendances design graphique 2026",
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

export default function ReseauxSociauxPage() {
  const service = {
    ...serviceJsonLd(
      "Gestion des réseaux sociaux et création de contenus à Genève",
      "Prestation social media à Genève : audit et benchmark, ligne éditoriale, calendrier, production de contenus photo, vidéo et motion, community management et reporting mensuel."
    ),
    // Les offres chiffrées sont ce que les moteurs de réponse citent quand on
    // leur demande « combien coûte le SEO à Genève ».
    offers: [
      {
        "@type": "Offer",
        name: "Forfait mensuel réseaux sociaux",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 1500,
          priceCurrency: "CHF",
          unitCode: "MON",
        },
      },
    ],
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Réseaux sociaux", url: "/services/reseaux-sociaux/" },
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
          src="/assets/services/logo/hero-creation-logo.webp"
          alt="Carte de visite Microclimat posée sur une pierre, projet Kinome"
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
            Réseaux sociaux et contenus créatifs
          </h1>
          <p
            className="mt-[clamp(20px,3vw,44px)] max-w-[56ch] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.5] text-white/90 motion-reduce:!animate-none"
            style={{ animation: "kinome-fade-in 800ms 220ms ease-out both" }}
          >
            Publier pour publier ne construit rien. Nous concevons une ligne
            éditoriale claire et des contenus soignés, pensés pour faire vivre
            votre marque au quotidien et créer un vrai lien avec votre
            audience.
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
              Qu'est-ce que la gestion des réseaux sociaux&nbsp;?
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(24px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              La gestion des réseaux sociaux couvre trois métiers qui avancent
              ensemble : la ligne éditoriale, la production créative et le
              community management au quotidien.
            </p>
            <p className={BODY}>
              Contrairement à une idée reçue, ce n'est pas une accumulation de
              publications isolées : c'est un exercice éditorial, où chaque
              contenu répond à un objectif précis (notoriété, confiance,
              conversion) et s'inscrit dans une ligne visuelle reconnaissable.
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
              className="group overflow-hidden rounded-[20px]"
            >
              <img
                src="/assets/services/logo/icone-app-codecircle.webp"
                alt="Interface Codecircle sur mobile, projet web optimisé par Kinome"
                width={554}
                height={835}
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
              Pourquoi une présence régulière renforce la confiance
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(28px,4vw,60px)] grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Les réseaux sociaux sont souvent le premier réflexe d'un prospect
              qui veut vérifier votre sérieux après vous avoir découvert. Un
              contenu bâclé ou irrégulier fragilise en quelques secondes une
              réputation construite ailleurs.
            </p>
            <p className={BODY}>
              À l'inverse, un compte vivant et cohérent agit comme une preuve
              continue : il montre que l'entreprise est active, qu'elle a des
              choses à dire, et qu'elle prend soin de son image jusque dans les
              détails du quotidien.
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
                Comment construit-on une présence qui compte
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Une bonne présence sociale ne se résume pas à publier souvent.
                Elle répond à une intention claire, propre à chaque plateforme et
                à chaque type de contenu.
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
              <div className="group overflow-hidden rounded-[20px]">
                <img
                  src="/assets/services/logo/brandboard-tampon-audition.webp"
                  alt="Brandboard de Tampon Audition affiché sur un ordinateur"
                  width={1040}
                  height={1570}
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
                <br className="hidden sm:block" /> de gestion des réseaux sociaux
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Six étapes cadrées, de l'audit initial au reporting mensuel.
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
                Les réseaux sociaux sont un travail continu : au-delà du
                lancement, vous bénéficiez d'une production et d'un suivi
                réguliers qui font vivre votre marque mois après mois.
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
                Des contenus percutants s'appuient sur une marque claire et bien
                identifiée. Ces prestations renforcent la cohérence de votre
                présence en ligne.
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
              Des marques vivantes, suivies au quotidien
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
              <br className="hidden sm:block" /> sur les réseaux sociaux
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
