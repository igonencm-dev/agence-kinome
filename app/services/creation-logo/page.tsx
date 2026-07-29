/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../../components/Testimonials";
import {
  buildMetadata,
  serviceJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "../../lib/seo";

// ---------------------------------------------------------------------------
// Page service « Création de logo » — intégration du design Figma de Tanguy
// (node 2167:173 « Services - Logo »).
//
// Structure fidèle au design : hero sombre, chiffres, définition du logo,
// principes, méthode, processus 01-06, résultat final, services connexes,
// portfolio, FAQ, témoignages.
//
// SEO / AEO : cible transactionnelle « création de logo Genève » (position 6,1
// en juillet côté article). Cette page devient le point d'arrivée commercial
// du cluster logo, /services/identite-visuelle/ se recentre sur l'identité
// complète pour éviter la cannibalisation. Chaque H2 est une question ou une
// promesse indexable, la FAQ est balisée FAQPage.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Création de logo à Genève",
  description:
    "Création de logo à Genève : 3 à 5 concepts, livraison en 2 à 3 semaines, pack complet et brandbook. À partir de 1 500 CHF. Diagnostic de 30 minutes offert.",
  path: "/services/creation-logo/",
  keywords: [
    "création de logo Genève",
    "créer un logo à Genève",
    "designer logo Genève",
    "agence de logo Suisse romande",
    "prix création logo",
  ],
});

/* --------------------------------- Données -------------------------------- */

const CHIFFRES = [
  { valeur: "3 à 5", label: "Concepts proposés" },
  { valeur: "2 à 3", label: "Semaines de livraison" },
  { valeur: "20 à 40", label: "Pages de brandbook" },
  { valeur: "100%", label: "Sur-mesure, zéro template" },
];

const COMPOSANTS = [
  {
    titre: "Un symbole ou un monogramme",
    body: "L'élément iconique, parfois autonome, souvent décliné seul sur les petits formats (favicon, réseaux sociaux, packaging).",
  },
  {
    titre: "Un logotype",
    body: "Le nom de la marque mis en forme par une typographie travaillée, avec un espacement, une graisse et un rythme propres à l'entreprise.",
  },
  {
    titre: "Une combinaison",
    body: "Symbole et logotype assemblés, avec des règles précises de proportion et de zone de protection entre les deux.",
  },
];

const PRINCIPES = [
  {
    titre: "7 secondes",
    body: "C'est le temps moyen qu'il faut à un visiteur pour se forger une première impression d'une marque à partir de son identité visuelle.",
  },
  {
    titre: "Plus de cohérence",
    body: "Un logo actuel et modulaire s'adapte à tous les supports : site, réseaux sociaux, print, signalétique, sans perte de lisibilité.",
  },
  {
    titre: "Moins de friction",
    body: "Une image professionnelle réduit les objections commerciales liées au sérieux perçu de l'entreprise, avant même le premier échange.",
  },
];

const METHODE = [
  {
    n: "01",
    titre: "Comprendre la marque avant de dessiner",
    body: "Mission, valeurs, positionnement, cible et concurrence sont analysés en premier lieu. Un logo réussi traduit une stratégie, il ne la précède jamais.",
  },
  {
    n: "02",
    titre: "Explorer un territoire visuel",
    body: "Formes, typographies, couleurs et références sont rassemblées pour définir un univers graphique cohérent, validé avant toute création finale.",
  },
  {
    n: "03",
    titre: "Créer plusieurs pistes distinctes",
    body: "Plusieurs concepts sont développés en parallèle, chacun porteur d'une intention différente, pour offrir un vrai choix plutôt qu'une seule proposition.",
  },
  {
    n: "04",
    titre: "Affiner jusqu'à la précision",
    body: "La piste retenue est ajustée dans le détail : proportions, courbes, espacements, couleurs, jusqu'à obtenir un symbole net à toutes les échelles.",
  },
  {
    n: "05",
    titre: "Construire les déclinaisons",
    body: "Le logo est décliné en plusieurs versions et intégré dans un système de marque complet, prêt à être utilisé sur tous les supports.",
  },
];

const PROCESSUS = [
  {
    n: "01",
    titre: "Cadrage et direction stratégique",
    body: "On ne dessine pas un logo au hasard. Cette première étape pose l'ADN de la marque (mission, vision, valeurs), sa cible et son positionnement, l'univers concurrentiel, ainsi que les premières intentions créatives : mots-clés et territoire visuel.",
    note: "Livrable : brief créatif écrit et validé",
  },
  {
    n: "02",
    titre: "Recherche et inspirations",
    body: "Une exploration visuelle permet d'aligner la direction avant la création : moodboard de styles, couleurs et typographies, références graphiques cohérentes, et premières pistes d'univers.",
    note: "Objectif : valider une direction avant création",
  },
  {
    n: "03",
    titre: "Création de pistes",
    body: "De 3 à 5 concepts distincts sont développés, chacun porteur d'une intention et d'une lecture différente de votre marque.",
  },
  {
    n: "04",
    titre: "Sélection et ajustements",
    body: "Une piste principale est choisie, puis ajustée avec précision : formes, proportions, couleurs. Les retouches se poursuivent jusqu'à validation complète, sans jamais repartir de zéro.",
    note: "Objectif : affiner sans repartir de zéro",
  },
  {
    n: "05",
    titre: "Déclinaisons et brandboard",
    body: "L'univers autour du logo est développé : variantes (horizontale, verticale, icône seule), palette de couleurs, typographies associées, et mises en situation en mockups.",
    note: "Livrable : brandboard cohérent",
  },
  {
    n: "06",
    titre: "Livraison finale",
    body: "Un pack complet est remis, prêt à l'usage sur tous vos supports, print comme digital, accompagné d'un guide d'utilisation détaillé.",
    note: "Livrable : pack complet + brandbook",
  },
];

const RESULTAT = [
  {
    icon: "/assets/services/logo/formats-vectoriels.svg",
    titre: "Formats vectoriels et images",
    body: "SVG, PNG, AI et EPS, pour une exploitation sans perte de qualité, du web au grand format print.",
  },
  {
    icon: "/assets/services/logo/digital-impression.svg",
    titre: "Digital et impression",
    body: "Versions RVB pour le digital et CMJN pour l'impression, calibrées pour un rendu fidèle sur tous les supports.",
  },
  {
    icon: "/assets/services/logo/clair-sombre.svg",
    titre: "Clair, sombre, monochrome",
    body: "Des versions adaptées à tous les fonds, pour garantir la lisibilité du logo en toute circonstance.",
  },
  {
    icon: "/assets/services/logo/declinaisons.svg",
    titre: "Standard, horizontale, verticale",
    body: "Versions symbole seul et simplifiée, pour s'adapter aux contraintes d'espace de chaque support.",
  },
  {
    icon: "/assets/services/logo/brandbook.svg",
    titre: "Brandbook de 20 à 40 pages",
    body: "Règles d'utilisation, interdits graphiques, zones de protection et exemples d'application concrets, pour que le logo reste cohérent quelle que soit la personne qui le manipule.",
  },
  {
    icon: "/assets/services/logo/symbole-durable.svg",
    titre: "Un symbole prêt à durer",
    body: "Un logo pensé pour rester pertinent plusieurs années, sans nécessiter de refonte au premier changement de tendance.",
  },
];

const SERVICES_LIES = [
  {
    icon: "/assets/services/logo/service-identite.svg",
    titre: "Identité visuelle",
    body: "Palette de couleurs, typographies, iconographie et règles d'usage : le système graphique complet qui entoure votre logo.",
    href: "/services/identite-visuelle/",
  },
  {
    icon: "/assets/services/logo/service-social.svg",
    titre: "Social média",
    body: "Direction artistique et gestion de vos réseaux sociaux, pour faire vivre votre identité au quotidien auprès de votre audience.",
    href: "/services/",
  },
  {
    icon: "/assets/services/logo/service-seo.svg",
    titre: "Référencement SEO",
    body: "Une stratégie de contenu et une structure technique pensées pour être identifié durablement dans les recherches Google.",
    href: "/blog/seo-referencement-naturel-geneve/",
  },
];

const PORTFOLIO = [
  {
    img: "/assets/wp/Adapt-Project-780x390px-1.png",
    alt: "Logo et identité visuelle d'Adapt Project, réalisés par Kinome",
    href: "/projets/adapt-project/",
  },
  {
    img: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    alt: "Logo du Cabinet Faraday, cabinet dentaire pédiatrique",
    href: "/projets/cabinet-faraday/",
  },
  {
    img: "/assets/wp/Alministratif-780x390px-1.png",
    alt: "Logo d'Alministratif, service d'accompagnement administratif",
    href: "/projets/alministratif/",
  },
  {
    img: "/assets/wp/Authentik-Peak-780x390px-1.png",
    alt: "Logo mascotte d'Authentik Peak, organisme de formation",
    href: "/projets/authentik-peak/",
  },
];

// Les 4 dernières réponses complètent celle rédigée dans le design, en
// cohérence avec les fourchettes déjà publiées sur le blog (1 500 à 5 000 CHF
// pour un logo seul, 4 000 à 15 000 CHF pour une identité complète).
const FAQ = [
  {
    q: "Combien de temps prend la création d'un logo ?",
    a: "Une création de logo seule se livre généralement en 2 à 3 semaines, cadrage compris. Si le projet inclut une identité visuelle complète avec charte graphique, comptez plutôt 4 à 8 semaines selon le périmètre. Votre réactivité sur les validations influence directement le planning.",
  },
  {
    q: "Combien coûte la création d'un logo à Genève ?",
    a: "À Genève, un logo professionnel se situe entre 1 500 et 5 000 CHF selon la complexité du projet et le nombre de déclinaisons attendues. Une identité visuelle complète, qui ajoute la charte graphique et les déclinaisons sur vos supports, se situe entre 4 000 et 15 000 CHF. Nous établissons toujours un devis détaillé après le cadrage.",
  },
  {
    q: "Combien de concepts de logo sont proposés ?",
    a: "De 3 à 5 concepts distincts vous sont présentés, chacun porteur d'une intention et d'une lecture différentes de votre marque. L'objectif est de vous offrir un vrai choix stratégique, pas des variantes cosmétiques du même dessin. La piste retenue est ensuite affinée jusqu'à validation, sans repartir de zéro.",
  },
  {
    q: "Ai-je les droits complets sur mon logo une fois livré ?",
    a: "Oui. À la livraison et au paiement du solde, vous détenez la pleine propriété du logo et de ses déclinaisons, sans limite de durée, de territoire ni de support. Vous recevez également les fichiers sources vectoriels, ce qui vous laisse totalement libre de votre prestataire pour la suite.",
  },
  {
    q: "Puis-je demander des retouches après la livraison ?",
    a: "Les allers-retours d'ajustement sont inclus dans la phase de sélection, jusqu'à validation complète du logo. Après la livraison finale, une évolution du logo ou une déclinaison supplémentaire fait l'objet d'un devis court, généralement à l'heure. Le brandbook est justement conçu pour limiter ce besoin en documentant tous les cas d'usage.",
  },
];

const BLOG_LINKS = [
  {
    href: "/blog/etude-de-cas-logo-tampon-audition/",
    label: "Étude de cas : le logo de Tampon Audition, du croquis à l'enseigne",
  },
  {
    href: "/blog/creation-logo-geneve-processus/",
    label: "Création de logo à Genève : prix, étapes et erreurs à éviter",
  },
  {
    href: "/blog/creer-identite-visuelle-entreprise-geneve/",
    label: "Créer une identité visuelle d'entreprise : le guide complet",
  },
  {
    href: "/blog/tarifs-agence-communication-geneve/",
    label: "Les tarifs d'une agence de communication à Genève en 2026",
  },
];

/* --------------------------------- Styles --------------------------------- */
// Classes répétées, factorisées pour garder le JSX lisible.
const H2 =
  "font-heading text-[clamp(30px,4.6vw,70px)] font-normal leading-[1.14] text-kinome-black";
const LEAD =
  "font-body text-[clamp(17px,1.9vw,28px)] font-light leading-[1.5] text-kinome-black";
const BODY =
  "font-body text-[clamp(15px,1.35vw,22px)] font-light leading-[1.55] text-kinome-black";
const CARD_TITLE =
  "font-heading text-[clamp(19px,2vw,30px)] font-semibold leading-[1.3] text-kinome-black";
const PILL_DARK =
  "btn-fill-accent inline-flex min-w-[240px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 text-center font-body text-[clamp(15px,1.1vw,20px)] font-semibold text-white transition-transform duration-300 hover:scale-105";
const STEP_NUM =
  "font-body text-[clamp(38px,4.5vw,70px)] font-thin leading-none text-kinome-black";

export default function CreationLogoPage() {
  const service = serviceJsonLd(
    "Création de logo à Genève",
    "Création de logo sur-mesure à Genève : cadrage stratégique, 3 à 5 concepts, déclinaisons complètes et brandbook de 20 à 40 pages."
  );
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Création de logo", url: "/services/creation-logo/" },
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
          alt="Carte de visite Microclimat posée sur une pierre, logo créé par Kinome"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] lg:object-center"
        />
        {/* Voile sombre : garantit le contraste AA du texte blanc sur une photo
            très claire. Sur grand écran il s'allège vers la droite pour laisser
            respirer la carte de visite, le texte restant calé à gauche. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.80)_0%,rgba(17,17,17,0.66)_45%,rgba(17,17,17,0.88)_100%)] lg:bg-[linear-gradient(100deg,rgba(17,17,17,0.90)_0%,rgba(17,17,17,0.78)_38%,rgba(17,17,17,0.46)_72%,rgba(17,17,17,0.38)_100%)]"
        />
        <div className="relative mx-auto w-full max-w-[1588px] px-[5%] pb-[clamp(56px,8vw,120px)] pt-[clamp(140px,18vw,300px)]">
          <h1 className="max-w-[16ch] font-heading text-[clamp(38px,7.4vw,90px)] font-normal leading-[1.12] text-white">
            Création de logo à Genève
          </h1>
          <p className="mt-[clamp(20px,3vw,44px)] max-w-[52ch] font-body text-[clamp(17px,1.9vw,28px)] font-light leading-[1.5] text-white/90">
            Un logo n'est pas une image, c'est la première promesse que fait
            votre marque. Nous concevons des identités graphiques fortes,
            pensées pour durer et pour être reconnues au premier coup d'oeil.
          </p>
          <div className="mt-[clamp(32px,4.5vw,60px)] flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact/"
              className="btn-fill-accent inline-flex min-w-[240px] items-center justify-center rounded-full bg-white px-8 py-4 text-center font-body text-[clamp(15px,1.1vw,20px)] font-semibold text-kinome-black transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
            >
              Vous avez un projet&nbsp;?
            </Link>
            <Link
              href="/portfolio/"
              className="btn-fill-white inline-flex min-w-[240px] items-center justify-center rounded-full border border-white px-8 py-4 text-center font-body text-[clamp(15px,1.1vw,20px)] font-semibold text-white transition-[transform,color] duration-300 hover:scale-105 hover:text-kinome-black"
            >
              Découvrir nos projets
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------- CHIFFRES ----------------------------- */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className={`${H2} text-center`}>Notre fonctionnement en chiffres</h2>
          <dl className="mt-[clamp(40px,6vw,110px)] grid grid-cols-2 gap-x-6 gap-y-[clamp(36px,5vw,60px)] lg:grid-cols-4">
            {CHIFFRES.map((c) => (
              <div key={c.label} className="text-center">
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <span className="block font-body text-[clamp(40px,6.5vw,80px)] font-light leading-[1.2] text-kinome-black">
                    {c.valeur}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-3 block font-heading text-[clamp(16px,2vw,30px)] font-semibold leading-[1.25] text-kinome-black"
                  >
                    {c.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------- QU'EST-CE QU'UN LOGO, AU JUSTE ? -------------------- */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className={`${H2} text-center`}>
            Qu'est-ce qu'un logo, au juste&nbsp;?
          </h2>
          <div className="mt-[clamp(36px,5vw,90px)] grid gap-[clamp(24px,4vw,60px)] lg:grid-cols-2">
            <p className={LEAD}>
              Un logo est le signe graphique qui identifie une marque : une
              forme, une typographie ou une combinaison des deux, conçue pour
              être reconnue instantanément, à n'importe quelle taille et sur
              n'importe quel support.
            </p>
            <p className={BODY}>
              Contrairement à une{" "}
              <Link
                href="/services/identite-visuelle/"
                className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
              >
                identité visuelle complète
              </Link>
              , le logo n'est pas l'ensemble du système de marque : c'est son
              point d'entrée, la signature qui condense en un seul symbole ce
              que l'entreprise fait, comment elle le fait, et pourquoi elle le
              fait différemment des autres.
            </p>
          </div>

          <div className="mt-[clamp(40px,6vw,90px)] grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-2">
            <div className="flex flex-col gap-[clamp(24px,3vw,40px)]">
              {COMPOSANTS.map((c) => (
                <div key={c.titre}>
                  <h3 className={CARD_TITLE}>{c.titre}</h3>
                  <p className={`${BODY} mt-2`}>{c.body}</p>
                </div>
              ))}
              <div className="mt-2">
                <Link href="/portfolio/" className={PILL_DARK}>
                  Découvrir nos projets
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/assets/services/logo/icone-app-codecircle.webp"
                alt="Symbole du logo Codecircle décliné en icône d'application sur un smartphone"
                width={554}
                height={835}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- NOS PRINCIPES ---------------------------- */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className={H2}>Nos principes</h2>
          <div className="mt-[clamp(28px,4vw,60px)] grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <p className={LEAD}>
              Un logo daté envoie un signal, même involontaire : celui d'une
              entreprise qui n'a pas suivi son époque. À l'inverse, une identité
              actuelle rassure un prospect avant même qu'il ait lu une seule
              ligne sur vos services.
            </p>
            <p className={BODY}>
              En quelques secondes, un visiteur se fait une opinion sur le
              sérieux d'une structure à partir de son image. Un logo pensé,
              cohérent et bien exécuté raccourcit la distance entre la première
              impression et la confiance : il rend crédible ce que les mots
              seuls mettent plus de temps à démontrer.
            </p>
          </div>
          <div className="mt-[clamp(40px,6vw,90px)] grid gap-[clamp(20px,2.2vw,32px)] md:grid-cols-3">
            {PRINCIPES.map((p) => (
              <div
                key={p.titre}
                className="flex flex-col items-center justify-center rounded-[20px] bg-white px-[clamp(24px,3vw,48px)] py-[clamp(40px,6vw,90px)] text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <h3 className={CARD_TITLE}>{p.titre}</h3>
                <p className={`${BODY} mt-[clamp(16px,2vw,32px)]`}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- COMMENT FAIT-ON UN LOGO QUI TIENT ------------------- */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <h2 className={H2}>
              Comment fait-on un logo qui tient dans le temps
            </h2>
            <div>
              <p className={BODY}>
                Un bon logo ne sort jamais d'un simple coup de crayon inspiré.
                C'est le résultat d'une méthode, où chaque choix graphique
                répond à une décision stratégique prise en amont.
              </p>
              <div className="mt-[clamp(24px,3vw,44px)]">
                <Link href="/contact/" className={PILL_DARK}>
                  Travaillons ensemble
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-[clamp(40px,6vw,90px)] grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-2">
            <div className="overflow-hidden rounded-[20px] lg:sticky lg:top-24">
              <img
                src="/assets/services/logo/brandboard-tampon-audition.webp"
                alt="Brandboard de Tampon Audition affiché sur un ordinateur : palette, typographie et univers photo"
                width={1040}
                height={1570}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
            <ol className="flex flex-col gap-[clamp(28px,3.5vw,52px)]">
              {METHODE.map((m) => (
                <li key={m.n} className="flex gap-[clamp(16px,2.5vw,40px)]">
                  <span aria-hidden="true" className={STEP_NUM}>
                    {m.n}
                  </span>
                  <div>
                    <h3 className={CARD_TITLE}>{m.titre}</h3>
                    <p className={`${BODY} mt-3`}>{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------ PROCESSUS ------------------------------ */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <h2 className={H2}>
              Notre processus
              <br className="hidden sm:block" /> de création de logo
            </h2>
            <div>
              <p className={BODY}>
                Six étapes cadrées, du premier échange jusqu'à la livraison du
                pack complet. Chaque étape produit un livrable concret, validé
                avant de passer à la suivante.
              </p>
              <div className="mt-[clamp(24px,3vw,44px)]">
                <Link href="/portfolio/" className={PILL_DARK}>
                  Découvrir nos projets
                </Link>
              </div>
            </div>
          </div>

          <ol className="mx-auto mt-[clamp(44px,6vw,110px)] flex max-w-[1330px] flex-col">
            {PROCESSUS.map((p, i) => (
              <li
                key={p.n}
                className="relative flex gap-[clamp(16px,3vw,60px)] pb-[clamp(32px,4vw,64px)]"
              >
                <div className="relative flex flex-col items-center">
                  <span aria-hidden="true" className={STEP_NUM}>
                    {p.n}
                  </span>
                  {/* Trait de liaison vertical entre les étapes (design Figma) */}
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
                    <p className="mt-3 font-body text-[clamp(13px,1.15vw,18px)] font-medium uppercase tracking-[0.04em] text-kinome-grey">
                      {p.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------- LE RÉSULTAT FINAL --------------------------- */}
      <section className="bg-kinome-cream px-[5%] pb-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <h2 className={H2}>Le résultat final</h2>
            <p className={BODY}>
              Au terme du projet, vous recevez un pack complet directement
              exploitable, quel que soit le support ou l'imprimeur, et un
              brandbook qui garantit l'usage cohérent du logo dans le temps.
            </p>
          </div>
          <div className="mt-[clamp(40px,6vw,110px)] grid gap-[clamp(20px,2.2vw,32px)] sm:grid-cols-2 lg:grid-cols-3">
            {RESULTAT.map((r) => (
              <div
                key={r.titre}
                className="flex flex-col items-center rounded-[20px] bg-white px-[clamp(24px,3vw,48px)] py-[clamp(36px,4.5vw,64px)] text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <img
                  src={r.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={112}
                  height={112}
                  className="mb-[clamp(24px,3vw,48px)] block h-[clamp(72px,7vw,112px)] w-[clamp(72px,7vw,112px)] object-contain"
                />
                <h3 className={CARD_TITLE}>{r.titre}</h3>
                <p className={`${BODY} mt-[clamp(14px,1.8vw,28px)]`}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------- EXPLORER NOS SERVICES ------------------------- */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <div className="grid gap-[clamp(20px,4vw,60px)] lg:grid-cols-2">
            <h2 className={H2}>Explorer nos services</h2>
            <p className={BODY}>
              Le logo est le point de départ. Ces prestations permettent de
              construire une présence de marque complète et cohérente.
            </p>
          </div>
          <div className="mt-[clamp(40px,6vw,110px)] grid gap-[clamp(20px,2.2vw,32px)] md:grid-cols-3">
            {SERVICES_LIES.map((s) => (
              <div
                key={s.titre}
                className="flex flex-col items-center rounded-[20px] bg-kinome-cream px-[clamp(24px,3vw,48px)] py-[clamp(36px,4.5vw,64px)] text-center"
              >
                <img
                  src={s.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={112}
                  height={112}
                  className="mb-[clamp(20px,2.5vw,40px)] block h-[clamp(72px,7vw,112px)] w-[clamp(72px,7vw,112px)] object-contain"
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
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- PORTFOLIO ------------------------------- */}
      <section className="bg-white px-[5%] pb-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className={`${H2} text-center`}>
            Des logos livrés, des marques renforcées
          </h2>
          <div className="mt-[clamp(40px,6vw,110px)] grid gap-[clamp(20px,2.2vw,32px)] md:grid-cols-2">
            {PORTFOLIO.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[1.02]"
              >
                <img
                  src={p.img}
                  alt={p.alt}
                  loading="lazy"
                  className="block aspect-[2/1] h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>
          <div className="mt-[clamp(36px,5vw,70px)] flex justify-center">
            <Link href="/portfolio/" className={PILL_DARK}>
              Découvrir nos projets
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------- FAQ ---------------------------------- */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,9vw,150px)]">
        <div className="mx-auto max-w-[1330px]">
          <h2 className={`${H2} text-center`}>
            Questions fréquentes
            <br className="hidden sm:block" /> sur la création de logo
          </h2>
          <div className="mt-[clamp(40px,6vw,110px)] flex flex-col gap-[clamp(12px,1.2vw,18px)]">
            {FAQ.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-[20px] bg-white px-[clamp(20px,3vw,90px)] py-[clamp(20px,2.4vw,36px)] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <h3 className={CARD_TITLE}>{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="relative block h-10 w-10 shrink-0 rounded-full border border-kinome-black/25"
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-kinome-black" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-kinome-black transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className={`${BODY} mt-[clamp(16px,2vw,28px)] max-w-[900px]`}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-[clamp(36px,5vw,70px)] flex justify-center">
            <Link href="/contact/" className={PILL_DARK}>
              D&apos;autres questions&nbsp;?
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------- POUR ALLER PLUS LOIN ---------------------------- */}
      <section className="bg-white px-[5%] py-[clamp(50px,7vw,110px)]">
        <div className="mx-auto max-w-[1330px]">
          <h2 className={`${H2} mb-[clamp(24px,3vw,48px)]`}>
            Pour aller plus loin
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {BLOG_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-3 rounded-[14px] bg-kinome-cream px-5 py-4 font-body text-[clamp(15px,1.15vw,18px)] font-light text-kinome-black transition-colors hover:bg-kinome-dark hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="text-kinome-accent group-hover:text-white"
                  >
                    &rarr;
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------- ILS NOUS FONT CONFIANCE ------------------------- */}
      <Testimonials />

      {/* ------------------------------- CTA FINAL ------------------------------- */}
      <section className="bg-kinome-dark px-[5%] py-[clamp(70px,10vw,130px)] text-center text-kinome-cream">
        <div className="mx-auto max-w-[820px]">
          <h2 className="font-heading text-[clamp(28px,4.4vw,56px)] font-normal leading-[1.12]">
            Vous avez un projet de logo
            <br className="hidden sm:block" /> sur lequel échanger&nbsp;?
          </h2>
          <p className="mx-auto mt-[clamp(18px,2.4vw,32px)] max-w-[620px] font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.6] text-kinome-cream/85">
            Diagnostic stratégique offert de 30 minutes, sans engagement, pour
            cadrer votre projet et vous dire franchement ce qui ferait sens dans
            votre cas.
          </p>
          <Link
            href="/contact/"
            className="mt-[clamp(28px,4vw,48px)] inline-flex min-w-[260px] items-center justify-center rounded-full bg-kinome-accent px-9 py-4 font-heading text-[clamp(15px,1.1vw,18px)] font-bold text-white shadow-[0_8px_30px_rgba(224,64,52,0.35)] transition-transform duration-300 hover:scale-105"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </main>
  );
}
