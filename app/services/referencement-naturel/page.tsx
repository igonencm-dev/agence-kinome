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
// Page service « Référencement naturel » — design Figma de Tanguy
// (node 2187:2283 « Services - Référencement »).
//
// SEO : c'est la page la plus attendue du plan d'août. « référencement naturel
// genève » sortait déjà en position 5,5 avec 104 impressions par mois sans
// aucune page de conversion derrière : les visiteurs nous trouvaient et
// repartaient. Cette page est ce point d'arrivée.
//
// AEO / GEO : chaque H2 est une question réelle d'internaute, la FAQ couvre les
// 5 objections commerciales classiques, les fourchettes de prix et les délais
// sont énoncés en clair (c'est ce que les moteurs de réponse citent), et le
// JSON-LD déclare le service avec ses offres chiffrées.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Référencement naturel à Genève",
  description:
    "Agence SEO à Genève : audit technique, mots-clés, contenu et netlinking. Premiers résultats durables en 3 à 6 mois. Audit dès 800 CHF, suivi dès 800 CHF/mois.",
  path: "/services/referencement-naturel/",
  keywords: [
    "référencement naturel Genève",
    "agence SEO Genève",
    "consultant SEO Suisse romande",
    "audit SEO Genève",
    "prix référencement naturel",
    "être visible sur Google Genève",
  ],
});

/* --------------------------------- Données -------------------------------- */

const CHIFFRES = [
  { valeur: "93 %", label: "Des parcours d'achat démarrent sur un moteur de recherche" },
  { valeur: "1 à 3", label: "Positions Google visées en priorité" },
  { valeur: "3 à 6", label: "Mois pour les premiers résultats durables" },
  { valeur: "100 %", label: "Stratégie sur mesure, zéro pratique à risque" },
];

const PILIERS = [
  {
    titre: "Le SEO technique",
    body: "La fondation : vitesse de chargement, structure du site, compatibilité mobile, sécurité. Autant de critères que Google évalue avant même de lire votre contenu.",
  },
  {
    titre: "Le SEO de contenu",
    body: "Les mots, les pages et les réponses que vous apportez aux questions que se posent réellement vos futurs clients sur Google.",
  },
  {
    titre: "Le SEO off-site",
    body: "La réputation et l'autorité du site aux yeux de Google, notamment via les liens externes qui pointent vers vos pages.",
  },
];

const ENJEUX = [
  {
    titre: "Top 3",
    body: "Les trois premiers résultats Google concentrent la grande majorité des clics sur une recherche donnée.",
  },
  {
    titre: "Trafic durable",
    body: "Contrairement à la publicité payante, une position acquise en SEO continue de générer du trafic sans coût par clic.",
  },
  {
    titre: "Confiance",
    body: "Un site rapide, structuré et bien positionné rassure autant Google que les visiteurs qui l'atteignent.",
  },
];

const METHODE = [
  {
    n: "01",
    titre: "Comprendre le marché avant d'optimiser",
    body: "Recherches des internautes, positionnement des concurrents et état actuel du site sont analysés en premier lieu. Un SEO efficace répond à une demande réelle, il ne l'invente pas.",
  },
  {
    n: "02",
    titre: "Corriger les fondations techniques",
    body: "Vitesse, indexation, structure des pages et compatibilité mobile sont assainies en priorité : sans base technique saine, aucun contenu ne peut bien se positionner.",
  },
  {
    n: "03",
    titre: "Créer du contenu qui répond aux recherches",
    body: "Chaque page est pensée pour répondre précisément à une intention de recherche, avec les mots-clés que vos clients utilisent réellement.",
  },
  {
    n: "04",
    titre: "Renforcer l'autorité du site",
    body: "Des liens externes de qualité et des signaux de confiance sont développés pour asseoir la crédibilité du site aux yeux de Google.",
  },
  {
    n: "05",
    titre: "Mesurer, ajuster, répéter",
    body: "Les positions et le trafic sont suivis en continu, pour ajuster la stratégie de contenu selon ce qui fonctionne réellement.",
  },
];

const PROCESSUS = [
  {
    n: "01",
    titre: "Audit et diagnostic technique",
    body: "On n'optimise pas un site au hasard. Cette première étape analyse l'état technique du site (vitesse, indexation, structure, mobile), son positionnement actuel sur Google, et l'univers concurrentiel sur vos recherches cibles.",
    note: "Livrable : rapport d'audit SEO complet",
  },
  {
    n: "02",
    titre: "Recherche de mots-clés et stratégie",
    body: "Une exploration des recherches réelles de vos futurs clients permet de définir les mots-clés prioritaires, le volume et la difficulté associés, ainsi qu'une première architecture de contenu.",
    note: "Objectif : valider une stratégie avant production",
  },
  {
    n: "03",
    titre: "Optimisation technique et on-page",
    body: "Les corrections techniques prioritaires sont déployées, et chaque page ciblée est optimisée : balises, structure, contenu, maillage interne.",
  },
  {
    n: "04",
    titre: "Production de contenu",
    body: "Des pages et des articles sont rédigés pour répondre précisément aux intentions de recherche identifiées. Les contenus existants sont retravaillés jusqu'à validation complète, sans repartir de zéro.",
    note: "Objectif : un contenu qui répond vraiment aux recherches",
  },
  {
    n: "05",
    titre: "Netlinking et autorité",
    body: "Des liens externes de qualité sont développés pour renforcer la crédibilité du site aux yeux de Google, en évitant toute pratique risquée pouvant pénaliser le site.",
    note: "Livrable : plan de netlinking",
  },
  {
    n: "06",
    titre: "Suivi et reporting mensuel",
    body: "Les positions, le trafic et les conversions sont suivis en continu, avec un rapport mensuel clair et des ajustements réguliers de la stratégie.",
    note: "Livrable : rapport mensuel + plan d'action",
  },
];

const RESULTAT = [
  {
    icon: "/assets/services/seo/rapport-audit.svg",
    titre: "Rapport d'audit détaillé",
    body: "Un diagnostic complet de l'état technique et concurrentiel du site, avec les priorités d'action classées par impact.",
  },
  {
    icon: "/assets/services/seo/mots-cles.svg",
    titre: "Liste de mots-clés stratégiques",
    body: "Les recherches prioritaires identifiées, avec le volume, la difficulté et l'intention associés à chacune.",
  },
  {
    icon: "/assets/services/seo/pages-optimisees.svg",
    titre: "Pages optimisées et indexées",
    body: "Des pages structurées et rédigées pour Google comme pour vos visiteurs, prêtes à être positionnées.",
  },
  {
    icon: "/assets/services/seo/liens-externes.svg",
    titre: "Liens externes de qualité",
    body: "Un maillage externe construit progressivement pour renforcer l'autorité du site, sans pratique à risque.",
  },
  {
    icon: "/assets/services/seo/rapport-mensuel.svg",
    titre: "Rapport mensuel de performance",
    body: "Positions, trafic organique et conversions suivis dans un rapport clair, accompagné d'un plan d'action pour le mois suivant.",
  },
  {
    icon: "/assets/services/seo/visibilite-durable.svg",
    titre: "Une visibilité qui dure",
    body: "Un référencement pensé pour continuer à générer du trafic longtemps après les premières actions, sans dépendre d'un budget publicitaire.",
  },
];

// Le Figma plaçait « Référencement SEO » dans cette grille, sur la page
// référencement elle-même : reste d'un copier-coller depuis la page logo. On
// pointe vers les trois autres landings réellement en ligne, ce qui referme
// aussi le maillage entre pages services.
const SERVICES_LIES = [
  {
    icon: "/assets/services/logo/formats-vectoriels.svg",
    titre: "Création de logo",
    body: "Le signe qui vous identifie : cadrage stratégique, 3 à 5 concepts distincts et pack complet livré.",
    href: "/services/creation-logo/",
  },
  {
    icon: "/assets/services/seo/service-identite.svg",
    titre: "Identité visuelle",
    body: "Palette de couleurs, typographies, iconographie et règles d'usage : le système graphique complet de votre marque.",
    href: "/services/identite-visuelle/",
  },
  {
    // Icône de page web reprise des livrables : Tanguy n'a pas encore dessiné
    // d'icône dédiée au service « site internet ».
    icon: "/assets/services/seo/pages-optimisees.svg",
    titre: "Création de site internet",
    body: "Un site rapide et bien structuré, la base technique sans laquelle aucun contenu ne se positionne durablement.",
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
    alt: "Cabinet Faraday, cabinet dentaire pédiatrique accompagné par Kinome",
    href: "/projets/cabinet-faraday/",
  },
  {
    img: "/assets/wp/Alministratif-780x390px-1.png",
    alt: "Alministratif, service d'accompagnement administratif",
    href: "/projets/alministratif/",
  },
  {
    img: "/assets/wp/Authentik-Peak-780x390px-1.png",
    alt: "Authentik Peak, organisme de formation accompagné par Kinome",
    href: "/projets/authentik-peak/",
  },
];

// Les 5 questions viennent du design. Les réponses reprennent les fourchettes
// déjà publiées sur le blog (audit 800 à 3 000 CHF, suivi 800 à 2 500 CHF par
// mois) pour que le site dise partout la même chose.
const FAQ = [
  {
    q: "Au bout de combien de temps voit-on des résultats en SEO ?",
    a: "Les premiers effets techniques sont souvent visibles en quelques semaines, mais des positions durables sur des recherches concurrentielles demandent généralement 3 à 6 mois de travail continu. Le référencement local, lui, bouge plus vite : 4 à 8 semaines suffisent souvent sur des requêtes peu disputées. Le SEO reste un investissement de moyen à long terme, pas un levier d'urgence.",
  },
  {
    q: "Combien coûte une prestation de référencement naturel à Genève ?",
    a: "À Genève, un audit SEO complet se situe généralement entre 800 et 3 000 CHF selon la taille du site. Un accompagnement mensuel, qui couvre le contenu, les optimisations techniques et le suivi, démarre autour de 800 CHF par mois et monte jusqu'à 2 500 CHF selon l'ambition et la concurrence sur vos mots-clés. Nous établissons toujours un devis après l'audit, jamais avant.",
  },
  {
    q: "Quelle est la différence entre le SEO et les Google Ads ?",
    a: "Les Google Ads achètent une position : la visibilité est immédiate mais s'arrête net dès que le budget s'arrête. Le SEO construit une position : c'est plus lent, mais le trafic acquis continue d'arriver sans coût par clic. Les deux sont complémentaires. En pratique, nous recommandons souvent les Ads pour tester rapidement des messages et le SEO pour installer une visibilité qui tient dans la durée.",
  },
  {
    q: "Le référencement naturel fonctionne-t-il pour toutes les entreprises ?",
    a: "Il fonctionne dès lors que des gens cherchent activement ce que vous proposez. Pour un commerce, un cabinet ou un artisan à Genève, le référencement local donne des résultats rapides et très rentables. Pour un marché de niche où personne ne fait de recherche, le SEO seul ne suffira pas et il vaut mieux investir ailleurs. C'est précisément ce que l'audit tranche, avant tout engagement.",
  },
  {
    q: "Utilisez-vous des pratiques risquées pour aller plus vite ?",
    a: "Non. Achat massif de liens, contenu généré en masse, pages satellites : ces techniques peuvent donner un gain court puis faire chuter durablement un site lors d'une mise à jour d'algorithme. Nous travaillons uniquement avec des méthodes conformes aux consignes de Google, ce qui est plus lent mais ne met jamais votre site en danger.",
  },
];

const BLOG_LINKS = [
  {
    href: "/blog/seo-referencement-naturel-geneve/",
    label: "SEO à Genève : les 3 piliers, les délais et les coûts réels",
  },
  {
    href: "/blog/referencement-local-google-maps-geneve/",
    label: "Référencement local : entrer dans le top 3 de Google Maps",
  },
  {
    href: "/blog/creation-site-internet-geneve-guide/",
    label: "Créer un site internet à Genève : le guide complet",
  },
  {
    href: "/blog/erreurs-refonte-site-web/",
    label: "Refonte de site : 6 erreurs qui font perdre son référencement",
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

export default function ReferencementNaturelPage() {
  const service = {
    ...serviceJsonLd(
      "Référencement naturel (SEO) à Genève",
      "Prestation de référencement naturel à Genève : audit technique, recherche de mots-clés, optimisation on-page, production de contenu, netlinking et suivi mensuel."
    ),
    // Les offres chiffrées sont ce que les moteurs de réponse citent quand on
    // leur demande « combien coûte le SEO à Genève ».
    offers: [
      {
        "@type": "Offer",
        name: "Audit SEO complet",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 800,
          maxPrice: 3000,
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "Offer",
        name: "Accompagnement SEO mensuel",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 800,
          maxPrice: 2500,
          priceCurrency: "CHF",
          unitCode: "MON",
        },
      },
    ],
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Référencement naturel", url: "/services/referencement-naturel/" },
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
          src="/assets/services/seo/photo-hero.webp"
          alt="Analyse des performances d'un site web sur un ordinateur portable"
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
            Référencement naturel et visibilité Google
          </h1>
          <p
            className="mt-[clamp(20px,3vw,44px)] max-w-[56ch] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.5] text-white/90 motion-reduce:!animate-none"
            style={{ animation: "kinome-fade-in 800ms 220ms ease-out both" }}
          >
            Être bien référencé, ce n'est pas une question de chance : c'est le
            résultat d'une stratégie de contenu et d'une structure technique
            pensées pour Google. Nous construisons votre visibilité pour qu'on
            vous trouve, là où vos clients cherchent.
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
              Qu'est-ce que le référencement naturel&nbsp;?
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(36px,5vw,72px)] grid gap-[clamp(24px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Le référencement naturel, ou SEO (<em>Search Engine
              Optimization</em>), regroupe l'ensemble des techniques qui
              permettent à un site d'apparaître dans les meilleures positions
              des résultats Google, sans passer par la publicité payante.
            </p>
            <p className={BODY}>
              Contrairement aux campagnes publicitaires (SEA), le SEO ne
              s'achète pas au clic : il se construit dans la durée, à travers la
              technique, le contenu et la réputation d'un site. C'est un
              investissement qui continue de rapporter longtemps après sa mise
              en place, contrairement à une campagne qui s'arrête dès qu'on
              cesse de payer.
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
                src="/assets/services/seo/photo-portrait1.webp"
                alt="Travail d'optimisation de contenu sur un ordinateur"
                width={1100}
                height={733}
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
              Pourquoi la visibilité Google conditionne votre croissance
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-[clamp(28px,4vw,60px)] grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2"
          >
            <p className={LEAD}>
              Si votre site n'apparaît pas dans les premiers résultats, il
              n'existe pas aux yeux de la grande majorité des internautes. Peu
              de gens vont au-delà de la première page de résultats, et encore
              moins au-delà des trois premières positions.
            </p>
            <p className={BODY}>
              Être visible sur les bonnes recherches, c'est capter des visiteurs
              qui cherchent activement une solution comme la vôtre, au moment
              précis où ils la cherchent. C'est aussi une question de
              crédibilité : un site bien positionné, rapide et bien structuré
              inspire davantage confiance qu'un concurrent invisible ou mal
              indexé.
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
                Comment construit-on une visibilité qui dure
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Le SEO n'est jamais un coup unique. C'est une méthode continue,
                où la technique, le contenu et l'autorité progressent ensemble,
                étape après étape.
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
                  src="/assets/services/seo/photo-portrait2.webp"
                  alt="Poste de travail avec ordinateur et tablette, suivi des positions Google"
                  width={1100}
                  height={733}
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
                <br className="hidden sm:block" /> de référencement naturel
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={BODY}>
                Six étapes cadrées, de l'audit initial au suivi mensuel. Chaque
                étape produit un livrable concret, validé avant de passer à la
                suivante.
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
                Le SEO est un travail continu : au-delà des livrables initiaux,
                vous bénéficiez d'un suivi régulier qui fait progresser votre
                visibilité mois après mois.
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
                Le SEO fonctionne d'autant mieux qu'il s'appuie sur une marque
                forte et un site sain. Ces prestations complètent votre présence
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
              <br className="hidden sm:block" /> sur le référencement naturel
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
