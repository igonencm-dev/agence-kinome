/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import ServicesHero from "./ServicesHero";
import ResponsiveBr from "../components/ResponsiveBr";
import { jsonLdScript, faqJsonLd, SITE, BUSINESS } from "../lib/seo";

const servicesCrea = [
  {
    title: "Création de logo",
    href: "/services/creation-logo/",
    prix: "dès 1 500 CHF",
    body: "La conception de logos est réalisée avec une attention particulière à l'unicité et à la pertinence pour chaque marque. Un processus créatif approfondi développe des logos qui captent l'essence de la marque, mémorables et fonctionnels sur tous les supports.",
  },
  {
    title: "Identité visuelle et charte graphique",
    href: "/services/identite-visuelle/",
    prix: "4 000 à 15 000 CHF",
    body: "Des chartes graphiques complètes établissent les fondations visuelles de la marque : palettes de couleurs, typographies, iconographie et styles. La charte sert de guide à la création de tous vos supports, avec les règles d'usage qui garantissent la cohérence.",
  },
  {
    title: "Stratégie de marque",
    href: "/services/strategie-de-marque/",
    prix: "cadrage 3 à 5 semaines",
    body: "Le positionnement, la plateforme de marque et le ton de voix sont formulés avant toute création visuelle. L'objectif : une image forte et cohérente qui résonne avec votre cible et soutient vos objectifs commerciaux.",
  },
];

const servicesWeb = [
  {
    title: "Création de site internet",
    href: "/services/site-internet/",
    prix: "dès 3 000 CHF",
    body: "Sites vitrines, boutiques e-commerce et plateformes métier sur mesure. Conçus pour être rapides, sécurisés, faciles à mettre à jour et prêts pour le référencement dès la mise en ligne.",
  },
  {
    title: "Référencement naturel",
    href: "/services/referencement-naturel/",
    prix: "audit dès 800 CHF",
    body: "Audit technique, recherche de mots-clés, production de contenu et netlinking. Un travail continu qui construit une visibilité durable sur Google, avec un suivi mensuel des positions et du trafic.",
  },
  {
    title: "Réseaux sociaux",
    href: "/services/reseaux-sociaux/",
    prix: "dès 1 500 CHF/mois",
    body: "Ligne éditoriale, production de contenus photo, vidéo et motion, animation quotidienne de votre communauté et reporting mensuel. Une présence régulière qui fait vivre la marque au-delà du site.",
  },
];

const processus = [
  {
    title: "Conception et réalisation",
    body: "Le processus de conception graphique est caractérisé par une approche méthodique et créative. Chaque projet commence par une phase d'analyse approfondie, où vos besoins et vos objectifs sont identifiés. Cette étape est suivie par la création de maquettes et de prototypes au format mockups, permettant aux clients de visualiser les concepts avant leur finalisation. L'accent est mis sur une collaboration étroite pour s'assurer que le produit final correspond parfaitement à vos attentes.",
    img: "/assets/man-using-laptop.png",
    alt: "Designer en train de travailler sur un ordinateur portable lors de la phase de conception d'un projet graphique",
    reverse: false,
  },
  {
    title: "Outils et logiciels",
    body: "Des logiciels de pointe dans le domaine du graphisme et du design sont utilisés, tels que Photoshop pour le traitement d'images, Illustrator pour la création de graphiques vectoriels, et Indesign pour la mise en page de documents. Pour garantir un travail complet et global, je peux autant travailler sur Figma que sur Sketch. Ces outils permettent une grande flexibilité et précision dans la réalisation de projets variés, et surtout une réponse adaptée selon le besoin.",
    img: "/assets/designer-young-lady.png",
    alt: "Designer graphique utilisant Photoshop, Illustrator, Figma et Sketch pour la création d'identités visuelles à Genève",
    reverse: true,
  },
  {
    title: "Une relation de confiance",
    body: "J'ai à cœur d'établir une relation de confiance avec chaque client, un pilier fondamental du processus créatif. Cette confiance se construit à travers une communication transparente, une écoute attentive et une compréhension profonde de vos objectifs. Je m'engage pleinement pour vous satisfaire et répondre à vos exigences. Ainsi, chaque étape du projet est gérée avec un souci constant de répondre aux attentes tout en apportant une expertise et des conseils professionnels. Cette approche permet de créer non seulement des résultats sur-mesure, mais aussi des partenariats durables et fructueux.",
    img: "/assets/interior-designer-office.png",
    alt: "Échange de confiance entre l'Agence Kinome et son client dans le bureau pour le suivi d'un projet de branding",
    reverse: false,
  },
];

const pourquoiNous = [
  {
    num: "01",
    title: "Une flexibilité et une personnalisation",
    body: "Grâce à la qualité et la rigueur que j'ai apprise en agence, vous pouvez accéder à un service à 360° de qualité professionnelle. Chaque projet bénéficie d'une approche sur mesure, adaptée à vos besoins spécifiques. Mes compétences en graphisme sont mises au service de l'histoire de votre marque et des valeurs que vous souhaitez véhiculer, afin de trouver l'identité graphique qui correspond et qui saura s'adapter à tous les supports de communication.",
  },
  {
    num: "02",
    title: "Une communication transparente et efficace",
    body: "Travailler directement avec un designer freelance garantit une communication claire et efficace. Vous avez accès directement au concepteur de vos éléments graphiques, c'est-à-dire moi-même. Facilitant ainsi les échanges d'idées et les retours rapides. Cette proximité assure une meilleure compréhension des objectifs du projet et une réponse plus rapide aux demandes de modifications ou d'ajustements.",
  },
  {
    num: "03",
    title: "De la créativité et de l'innovation",
    body: "Les designers freelances, grâce à leur expérience variée et à leur exposition à de multiples secteurs, apportent une richesse créative et des perspectives innovantes à chaque projet. Avec mon background diversifié, j'offre des solutions de design qui allient esthétique, fonctionnalité et originalité. En étant force de proposition, je permets à votre image de marque de rayonner à travers tous vos supports de communication.",
  },
  {
    num: "04",
    title: "Une relation privilégiée",
    body: "Une relation avec un designer freelance est souvent caractérisée par un engagement et une confiance mutuels. Je m'investis pleinement dans chaque projet, avec l'objectif de construire des relations durables basées sur la satisfaction et la réussite. Mon engagement envers mes clients se traduit par une qualité de travail constante et une volonté de dépasser les attentes.",
  },
  {
    num: "05",
    title: "Un coût-efficacité",
    body: "Choisir un designer freelance peut également être plus rentable. Sans les frais d'une grande agence, les clients bénéficient souvent de tarifs plus compétitifs, tout en recevant un travail de haute qualité. Cette efficacité coût-qualité est particulièrement avantageuse pour les petites entreprises et les startups.",
  },
  {
    num: "06",
    title: "Une proximité",
    body: "Pour permettre de se rencontrer localement, il faut savoir que j'interviens principalement dans le secteur de Genève et parfois en Savoie. Je privilégie un travail à distance avec des échanges réguliers en visio pour réaliser un suivi détaillé de votre projet. Mais il est également possible de se rencontrer physiquement.",
  },
];

const projetsApercu = [
  {
    src: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    alt: "Cabinet Faraday",
    slug: "cabinet-faraday",
  },
  {
    src: "/assets/wp/Adapt-Project-780x390px-1.png",
    alt: "Adapt Project",
    slug: "adapt-project",
  },
  {
    src: "/assets/wp/Alministratif-780x390px-1.png",
    alt: "Alministratif",
    slug: "alministratif",
  },
  {
    src: "/assets/wp/Authentik-Peak-780x390px-1.png",
    alt: "Authentik Peak",
    slug: "authentik-peak",
  },
];

const faqServices = [
  {
    question: "Quelle est la différence entre un logo et une identité visuelle ?",
    answer:
      "Le logo est le signe distinctif d'une marque ; l'identité visuelle englobe l'ensemble du système graphique : logo, palette de couleurs, typographies, principes de composition, iconographie, ainsi que les règles d'usage qui assurent la cohérence sur tous les supports. Chez Kinome, nous concevons systématiquement les deux ensemble pour garantir une marque qui tient dans la durée.",
  },
  {
    question: "Combien de temps faut-il pour créer une identité visuelle complète ?",
    answer:
      "Un projet d'identité visuelle complet (logo + charte graphique + premières déclinaisons) prend en général de 4 à 8 semaines selon le périmètre. Le délai inclut la phase de cadrage, les premières propositions, les itérations et la livraison finale avec le manuel d'usage. Une création de logo seule peut être livrée en 2 à 3 semaines.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises basées à Genève ?",
    answer:
      "Notre studio est basé à Genève et nous accompagnons en priorité des clients de Suisse romande, mais nous travaillons également avec des entreprises et indépendants en France et à l'international. Les échanges se font en visio, par téléphone et lors de rendez-vous physiques selon votre localisation.",
  },
  {
    question: "Proposez-vous la refonte de sites internet existants ?",
    answer:
      "Oui. Nous accompagnons aussi bien la création de sites depuis zéro que la refonte d'un site existant : audit du site actuel, recommandations stratégiques, redesign de l'identité numérique, refonte UX/UI, optimisation SEO et migration technique vers une stack moderne (Next.js, Astro, WordPress, Webflow…).",
  },
];

// OfferCatalog : liste structurée des services proposés (boost AEO/GEO sur les
// requêtes type "agence de logo à Genève", "site internet PME suisse romande").
const offerCatalogLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE.url}/services/#service`,
  serviceType: "Communication, branding, design, web",
  name: "Services de communication — Agence Kinome",
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: BUSINESS.areaServed.map((n) => ({
    "@type": "AdministrativeArea",
    name: n,
  })),
  description:
    "Création de logo, identité visuelle, charte graphique, branding et conception de sites internet pour entreprises et marques en Suisse romande.",
  url: `${SITE.url}/services/`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations Agence Kinome",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de logo",
          description:
            "Conception d'un logo unique, mémorable et fonctionnel sur tous supports.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Identité visuelle & charte graphique",
          description:
            "Système graphique complet : palette, typographies, principes, règles d'usage.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Stratégie de branding",
          description:
            "Positionnement, messages-clés, et système visuel cohérent pour soutenir vos objectifs.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sites internet vitrines",
          description:
            "Conception et développement de sites élégants, optimisés SEO et pensés pour convertir.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce",
          description:
            "Boutiques en ligne robustes, attention portée au tunnel de conversion et à la performance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plateformes & dashboards",
          description:
            "Applications web métier, espaces clients, dashboards et outils internes sur mesure.",
        },
      },
    ],
  },
};


export default function ServicesPage() {
  const [onglet, setOnglet] = useState<"crea" | "web">("crea");
  // Les deux jeux sont rendus, on bascule la visibilité en CSS : garder les
  // 6 liens dans le HTML statique, sinon la moitié échappe au crawl (Google
  // ne clique pas sur un onglet).
  const onglets = [
    { cle: "crea" as const, services: servicesCrea },
    { cle: "web" as const, services: servicesWeb },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(faqJsonLd(faqServices)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(offerCatalogLd),
        }}
      />

      {/* Hero scroll-driven : vidéo seule au load, titre apparait au scroll
          (composant client dédié, voir ServicesHero.tsx) */}
      <ServicesHero />

      {/* Onglets services */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mb-8 sm:mb-16 flex flex-wrap justify-center gap-4">
          {/* Couleur retours #90 : passer du gris froid #f2f2f2 au beige
              chaud #dfdbd0 (cohérence avec la charte cream/sable Kinome). */}
          <button
            type="button"
            onClick={() => setOnglet("crea")}
            className={`rounded-full px-12 py-3 font-body text-[clamp(16px,1.2vw,18px)] font-medium transition-colors ${
              onglet === "crea"
                ? "bg-kinome-black text-white"
                : "bg-[#dfdbd0] text-kinome-black hover:bg-[#cbc6b8]"
            }`}
          >
            Services créa
          </button>
          <button
            type="button"
            onClick={() => setOnglet("web")}
            className={`rounded-full px-12 py-3 font-body text-[clamp(16px,1.2vw,18px)] font-medium transition-colors ${
              onglet === "web"
                ? "bg-kinome-black text-white"
                : "bg-[#dfdbd0] text-kinome-black hover:bg-[#cbc6b8]"
            }`}
          >
            Services web design
          </button>
        </div>

        {onglets.map((o) => (
          <div
            key={o.cle}
            className={`grid grid-cols-1 gap-8 lg:grid-cols-3 ${
              onglet === o.cle ? "" : "hidden"
            }`}
            aria-hidden={onglet !== o.cle}
          >
            {o.services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col rounded-[24px] bg-kinome-cream p-10 text-left transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)] lg:text-center"
              >
                <h2 className="mb-2 font-heading text-[1.6rem] font-semibold leading-[1.2] text-kinome-black transition-colors group-hover:text-kinome-accent">
                  {s.title}
                </h2>
                <p className="mb-6 font-body text-[0.85rem] font-light text-kinome-grey">
                  {s.prix}
                </p>
                <p className="flex-1 font-body text-[1rem] leading-[1.6] text-kinome-grey">
                  {s.body}
                </p>
                <span className="mt-8 inline-flex items-center justify-center gap-2 font-heading text-[0.95rem] font-semibold text-kinome-black transition-colors group-hover:text-kinome-accent">
                  Découvrir le service
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </section>

      {/* Comment les prestations se déroulent ? */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-9 sm:py-[60px]">
        <h2 className="mb-8 sm:mb-16 font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
          Comment les prestations
          <ResponsiveBr />
          se déroulent&nbsp;?
        </h2>

        {processus.map((p) => (
          <div
            key={p.title}
            className="mb-8 grid grid-cols-1 items-center gap-12 rounded-[24px] bg-kinome-cream p-[clamp(24px,5vw,60px)] lg:grid-cols-2"
          >
            <div className={p.reverse ? "lg:order-2" : ""}>
              <h3 className="mb-4 font-heading text-[1.8rem] font-semibold leading-[1.2]">
                {p.title}
              </h3>
              <p className="font-body text-[1rem] leading-[1.7] text-kinome-grey">
                {p.body}
              </p>
            </div>
            <div
              className={`overflow-hidden rounded-[20px] aspect-[4/3] ${
                p.reverse ? "lg:order-1" : ""
              }`}
            >
              <img
                src={p.img}
                alt={p.alt}
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <Link
            href="/processus/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Processus client
          </Link>
        </div>
      </section>

      {/* Aperçu projets */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {projetsApercu.map((p) => (
            <Link
              key={p.alt}
              href={`/projets/${p.slug}/`}
              className="group block aspect-[16/9] overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="block h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Découvrir nos projets
          </Link>
        </div>
      </section>

      {/* Pourquoi nous choisir — 6 raisons */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-8 sm:mb-16 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
            Pourquoi choisir Kinome&nbsp;?
          </h2>
          {/* Retour #92 : hauteur uniforme sur les blocs "raisons" pour
              éviter l'effet escalier (textes de longueur variable).
              Retour mobile #122 Tanguy : sur mobile, ordre =
              numéro (en haut) → titre → texte. En desktop, on garde
              l'ordre naturel du grid 3 colonnes (titre → texte → numéro). */}
          <ol className="flex flex-col gap-6">
            {pourquoiNous.map((p) => (
              <li
                key={p.num}
                className="grid min-h-[220px] grid-cols-1 items-start gap-6 rounded-[24px] bg-white p-7 shadow-sm md:grid-cols-[auto_1fr_auto] md:items-center md:p-12"
              >
                <div className="order-2 md:order-1">
                  {/* Retour #121 Tanguy : sur mobile, "Une flexibilité et
                      une personnalisation" débordait du cadre (16+ char
                      sur smartphone 360px - padding 48px). Réduction du
                      font min mobile (28→22px) + break-words pour
                      laisser les mots se couper proprement si besoin.
                      Padding mobile réduit aussi (p-12 → p-7) pour
                      donner plus de place au texte. */}
                  <h3 className="break-words font-heading text-[clamp(22px,3.5vw,40px)] font-medium leading-[1.15] md:max-w-[400px]">
                    {p.title}
                  </h3>
                </div>
                <p className="order-3 font-body text-[clamp(16px,1.1vw,18px)] leading-[1.7] text-kinome-grey md:order-2 md:px-12">
                  {p.body}
                </p>
                <div className="order-1 font-heading text-[clamp(60px,9vw,90px)] font-thin leading-none text-kinome-black md:order-3 md:text-[8rem]">
                  {p.num}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ — questions fréquentes services (AEO) */}
      <section className="mx-auto max-w-[1100px] px-[5%] py-[clamp(50px,10vw,100px)]">
        <h2 className="mb-12 text-center font-heading text-[clamp(24px,4.5vw,48px)] font-normal leading-[1.1]">
          Questions fréquentes sur nos services
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "Quelle est la différence entre un logo et une identité visuelle ?",
              a: "Le logo est le signe distinctif de votre marque ; l'identité visuelle englobe l'ensemble du système graphique : logo, palette de couleurs, typographies, principes de composition, iconographie, ainsi que les règles d'usage. Chez Kinome, nous concevons les deux ensemble pour garantir une marque cohérente dans le temps.",
            },
            {
              q: "Combien de temps faut-il pour créer une identité visuelle complète ?",
              a: "Un projet d'identité visuelle complet (logo + charte + premières déclinaisons) prend en général 4 à 8 semaines selon le périmètre. Ce délai inclut le cadrage, les premières propositions, les itérations et la livraison finale avec le manuel d'usage. Une création de logo seule peut être livrée en 2 à 3 semaines.",
            },
            {
              q: "Travaillez-vous uniquement avec des entreprises basées à Genève ?",
              a: "Notre studio est basé à Genève et nous accompagnons en priorité des clients de Suisse romande, mais nous travaillons aussi avec des entreprises et indépendants en France et à l'international. Les échanges se font en visio, par téléphone et lors de rendez-vous physiques selon votre localisation.",
            },
            {
              q: "Proposez-vous la refonte de sites internet existants ?",
              a: "Oui. Nous accompagnons aussi bien la création de sites depuis zéro que la refonte d'un site existant : audit, recommandations stratégiques, redesign de l'identité numérique, refonte UX/UI, optimisation SEO et migration vers une stack moderne (Next.js, Astro, WordPress, Webflow…).",
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black list-none">
                <span>{q}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[clamp(50px,8vw,80px)] text-center text-white">
        <h2 className="mb-6 font-heading text-[2.8rem] font-normal leading-[1.1]">
          Un projet en tête&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-white/80">
          Parlez-nous de vos enjeux et de vos contraintes : nous reviendrons
          vers vous avec une proposition cadrée.
        </p>
        {/* Retour #93 : bug d'affichage des deux CTA bas de page.
            Cause : le texte n'était pas dans un <span relative z-10>, donc
            le fill au hover passait DEVANT le texte (illisible). On enveloppe
            le texte + on bascule sa couleur au hover (noir↔blanc selon le
            fill). */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact/"
            className="btn-fill-dark group mx-auto flex w-fit min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
          >
            <span className="relative z-10">Discutons de votre projet</span>
          </Link>
          <Link
            href="/portfolio/"
            className="btn-fill-white group mx-auto flex w-fit min-w-[280px] items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,color] duration-300 hover:scale-105 hover:text-kinome-black"
          >
            <span className="relative z-10">Voir nos projets</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
