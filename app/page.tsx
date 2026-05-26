/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SplashScreen from "./components/SplashScreen";
import HeroAnimatedWord from "./components/HeroAnimatedWord";
import LogosMarquee from "./components/LogosMarquee";
import ContactForm from "./contact/ContactForm";
import Testimonials from "./components/Testimonials";
import { contact } from "./lib/contact";
import {
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
  jsonLdScript,
} from "./lib/seo";

export const metadata = buildMetadata({
  title: "Agence de communication à Genève",
  bareTitle: true,
  description:
    "Agence de communication indépendante à Genève : branding, identité visuelle, création de logo et sites internet pour PME et marques en Suisse romande.",
  path: "/",
  keywords: [
    "agence Kinome",
    "agence communication indépendante",
    "communication Genève",
    "agence créative Genève",
    "Suisse romande",
  ],
});

// Questions/réponses pensées pour l'AEO (ChatGPT, Perplexity, Google AI Overview).
// Le contenu est aussi affiché sur la page pour cohérence + JSON-LD FAQPage.
const faqHome = [
  {
    question: "Quels services propose l'agence Kinome à Genève ?",
    answer:
      "Kinome est une agence de communication basée à Genève qui couvre l'ensemble de la chaîne d'image de marque : création de logo, identité visuelle complète, charte graphique, direction artistique, conception de sites internet, communication digitale et campagnes print. Nous accompagnons aussi bien des indépendants que des PME et des structures plus établies, en Suisse romande comme à l'international.",
  },
  {
    question: "Pour qui travaille l'agence Kinome ?",
    answer:
      "Nous travaillons principalement avec des entreprises et marques basées à Genève, Lausanne et plus largement en Suisse romande, mais aussi avec des clients en France et à l'international. Notre clientèle inclut des cabinets de conseil, des restaurants, des artisans, des agences de voyage haut de gamme, des éditeurs de logiciels et des entrepreneurs indépendants.",
  },
  {
    question: "Comment se déroule un projet avec Kinome ?",
    answer:
      "Chaque projet débute par un appel de découverte gratuit. Nous établissons ensuite un cadrage précis (objectifs, audience, contraintes), puis nous entrons en phase de création avec des allers-retours réguliers. La transparence est centrale : vous êtes informé en temps réel, et un point d'étape est systématique avant chaque livraison majeure. Le détail complet est exposé sur notre page « Notre processus ».",
  },
  {
    question: "Combien coûte la création d'un logo à Genève avec Kinome ?",
    answer:
      "Le tarif d'une création de logo dépend du périmètre : logo seul, identité visuelle complète, ou système de marque incluant la charte et les déclinaisons. Nous établissons un devis personnalisé après l'appel de découverte, qui prend en compte vos contraintes, le nombre de variantes attendues et le délai. Un projet de logo professionnel à Genève démarre généralement à partir de quelques milliers de francs suisses.",
  },
  {
    question: "Pourquoi choisir une agence indépendante à Genève ?",
    answer:
      "Une agence indépendante comme Kinome offre un contact direct avec les créatifs, sans intermédiaires. Vous bénéficiez d'une réactivité supérieure, d'une vraie écoute et d'un suivi personnalisé du début à la fin. À Genève, où la qualité de l'image de marque est essentielle pour se distinguer, ce mode de collaboration garantit un résultat fidèle à votre identité plutôt qu'un travail standardisé.",
  },
];

const HERO_VIDEO =
  "/assets/wp/Header-Menu_Nouvelles-versions.mp4";

const enjeuxBlocs = [
  {
    img: "/assets/wp/working-space-close-up-office-table-with-different-documents-lying-it-1.png",
    alt: "Face à l'IA",
    title: "Face à l'IA, adaptez votre communication aux enjeux contemporains",
    subtitle:
      "Anticipez les transformations, restez pertinent et gardez une longueur d'avance.",
    body: "L'intelligence artificielle redéfinit les codes, les attentes et les usages. Nous accompagnons votre entreprise pour comprendre ces évolutions, ajuster vos messages et intégrer les bons outils de manière cohérente.",
    objectif:
      "vous aider à tirer parti de l'IA sans perdre ce qui fait votre singularité.",
    cta: { label: "Nos solutions", href: "/services" },
    reverse: false,
  },
  {
    img: "/assets/wp/business-people-meeting-1.png",
    alt: "Formations professionnelles",
    title: "Redonnez de la force à vos formations professionnelles",
    subtitle: "Rendez-les plus claires, plus visibles et réellement attractives.",
    body: "Trop souvent, les offres de formation peinent à capter l'attention ou à exprimer leur vraie valeur. Nous vous aidons à repenser leur positionnement, clarifier vos messages et structurer une communication qui parle vraiment à vos publics.",
    objectif:
      "transformer vos formations en offres lisibles, engageantes et différenciantes.",
    cta: { label: "Découvrez nos projets", href: "/portfolio" },
    reverse: true,
  },
];

const expertises = [
  {
    title: "Notre mission",
    text: "Accompagner les entreprises et les marques dans leur quête de visibilité en mettant l'humain au centre.",
  },
  {
    title: "Côté création",
    text: "Nous croyons que chaque projet mérite d'être traité avec originalité et sensibilité.",
  },
  {
    title: "La conception",
    text: "Nous prenons le temps d'écouter pour élaborer des concepts solides et alignés.",
  },
  {
    title: "Notre vision",
    text: "La vision humaine est au cœur de chaque projet pour une relation de confiance durable.",
  },
];

// "Les nouvelles" : reprend dynamiquement les 3 derniers articles publiés
// dans le blog (cohérence + zéro duplication).
import { blogPosts as _blogPosts } from "./lib/blog";
import ResponsiveBr from "./components/ResponsiveBr";
const nouvelles = _blogPosts.slice(0, 3).map((p) => ({
  title: p.title,
  excerpt: p.excerpt,
  href: `/blog/${p.slug}/`,
}));

const portfolio = [
  {
    src: "/assets/wp/Adapt-Project-780x390px-1.png",
    alt: "Adapt Project",
  },
  {
    src: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    alt: "Cabinet Faraday",
  },
  {
    src: "/assets/wp/Alministratif-780x390px-1.png",
    alt: "Alministratif",
  },
  {
    src: "/assets/wp/Authentik-Peak-780x390px-1.png",
    alt: "Authentik Peak",
  },
];

export default function Home() {
  return (
    <>
      {/* JSON-LD : FAQPage (AEO) + Service (déclinaison Genève) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(faqJsonLd(faqHome)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceJsonLd(
              "Agence de communication à Genève",
              "Branding, identité visuelle, création de logo, charte graphique et conception de sites internet pour entreprises et marques en Suisse romande."
            )
          ),
        }}
      />

      <SplashScreen />

      {/* HERO — vidéo de fond */}
      <section className="relative flex h-screen w-full items-center overflow-hidden">
        {/* Hero vidéo :
            - `preload="auto"` : on charge la vidéo dès le départ (c'est le LCP de
              la home, on ne veut pas attendre le user gesture).
            - `poster` : image affichée pendant le chargement de la vidéo. Réduit
              le LCP perçu et donne un fallback visuel aux bots qui ne lisent pas
              la vidéo (Google, ChatGPT, Perplexity…). */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Overlay gradient : plus sombre en bas (zone CTA) pour assurer la
            lisibilité des boutons même quand la vidéo de fond montre des
            frames clairs (retours #86 #88). Au-dessus, voile uniforme léger
            pour conserver le contraste du titre (retour #87 — apprécié). */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-black/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[55%] bg-gradient-to-t from-black/70 via-black/45 to-transparent" />
        <div className="relative z-[3] mx-auto flex w-full max-w-[1400px] flex-col items-start px-[5%]">
          <div className="max-w-[800px] text-left text-white">
            <h1 className="mb-[30px] text-center font-heading text-[clamp(38px,8vw,76px)] font-semibold leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] md:text-left">
              {/* Retour #113/#115 Tanguy : les <ResponsiveBr /> forcés cassaient le
                  flow naturel en mobile (laisse le texte se renvoyer à la
                  ligne tout seul). Sur desktop on garde un <ResponsiveBr /> caché en
                  mobile (hidden md:inline) pour la composition voulue. */}
              Agence de communication{" "}
              <ResponsiveBr />à Genève — <HeroAnimatedWord />
            </h1>
            <p className="mb-[35px] max-w-[520px] text-center text-[clamp(16px,1.3vw,19px)] leading-[1.7] [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] md:text-left">
              Branding, identité visuelle et sites internet{" "}
              <ResponsiveBr />
              en alliant stratégie et émotion, depuis la Suisse romande.
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
              {/* Bouton 1 (primaire) : fond blanc/texte noir + ombre pour
                  rester lisible même devant les frames vidéo blancs. */}
              <Link
                href="#contact"
                className="btn-fill-dark group inline-flex min-w-[280px] items-center justify-center whitespace-nowrap rounded-full bg-white px-8 py-4 text-center font-heading text-[1rem] font-bold text-black shadow-[0_6px_24px_rgba(0,0,0,0.25)] transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
              >
                <span className="relative z-10">Vous avez un projet&nbsp;?</span>
              </Link>
              {/* Bouton 2 (secondaire) : bordure + texte blanc avec ombre.
                  Au hover, fond se remplit en blanc → texte doit passer
                  noir pour rester lisible (retour #86). */}
              <Link
                href="/portfolio"
                className="btn-fill-white group inline-flex min-w-[280px] items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] transition-[transform,color,text-shadow] duration-300 hover:scale-105 hover:text-black hover:[text-shadow:none]"
              >
                <span className="relative z-10">Découvrir nos projets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* "Ki" sommes-nous ? */}
      <section className="mx-auto my-[60px] max-w-[1300px] rounded-[20px] px-[clamp(20px,5vw,60px)] py-[clamp(50px,8vw,80px)]">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div>
            <h2 className="mb-10 text-center font-heading text-[clamp(28px,5.2vw,64px)] font-normal leading-[1.1] md:text-left">
              &ldquo;Ki&rdquo; sommes-nous&nbsp;?
            </h2>
            <p className="my-10 font-body text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-kinome-black">
              Cette approche humaine et exigeante permet de créer des projets{" "}
              <strong className="font-semibold">cohérents</strong>, porteurs de
              sens, et pensés pour s&rsquo;inscrire durablement dans le temps.
            </p>
            {/* Retour #114 Tanguy : ancien bloc en ligne avec séparateurs
                "·" qui s'empilait mal en mobile (texte coupé, séparateurs
                orphelins). Refonte en mini-stats à 3 colonnes avec chiffres
                proéminents et label dessous — toujours en 3 colonnes même
                en mobile car les contenus sont courts. */}
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
              <div className="text-center md:text-left">
                <p className="font-heading text-[clamp(32px,5vw,48px)] font-normal leading-none text-kinome-black">
                  1
                </p>
                <p className="mt-2 font-body text-[clamp(11px,1vw,14px)] font-medium uppercase tracking-[0.05em] text-kinome-grey">
                  Bureau local
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="font-heading text-[clamp(32px,5vw,48px)] font-normal leading-none text-kinome-black">
                  12
                </p>
                <p className="mt-2 font-body text-[clamp(11px,1vw,14px)] font-medium uppercase tracking-[0.05em] text-kinome-grey">
                  Expertises
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="font-heading text-[clamp(32px,5vw,48px)] font-normal leading-none text-kinome-black">
                  6
                </p>
                <p className="mt-2 font-body text-[clamp(11px,1vw,14px)] font-medium uppercase tracking-[0.05em] text-kinome-grey">
                  Partenaires
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-5 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              Kinome est une jeune agence créative et polyvalente, spécialisée
              en identité, campagne et website.
            </p>
            <p className="mb-5 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              Notre volonté est de faire du beau, du moderne et de
              l&rsquo;original. De garder, d&rsquo;entretenir et de conserver
              ce lien direct avec nos clients, sans passer par un prestataire.
              Enfin, de collaborer avec d&rsquo;autres talents dont les
              spécialités assureraient la réussite de vos projets.
            </p>
            <p className="mb-8 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              La transparence et l&rsquo;honnêteté sont placées au cœur de
              notre philosophie. Une communication claire est maintenue, et
              des attentes réalistes sont établies. Vous êtes informés en
              temps réel des progrès de votre projet, avec des recommandations
              professionnelles.
            </p>
            <Link
              href="/a-propos"
              className="mx-auto block w-fit btn-fill-accent rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              Notre agence
            </Link>
          </div>
        </div>
      </section>

      {/* Préparons ensemble les enjeux de demain */}
      <section className="mx-auto max-w-[1400px] bg-kinome-cream px-[5%] py-[clamp(50px,10vw,100px)]">
        <h2 className="mx-auto mb-20 max-w-[600px] text-center font-heading text-[clamp(28px,5vw,60px)] font-normal leading-[1.1] md:mx-0 md:text-left">
          Préparons ensemble
          <ResponsiveBr />
          les enjeux de demain
        </h2>

        {enjeuxBlocs.map((bloc, i) => (
          <div
            key={i}
            className="mb-[100px] grid grid-cols-1 items-center gap-20 lg:grid-cols-2"
          >
            <div
              className={`overflow-hidden rounded-[20px] aspect-[4/3] ${
                bloc.reverse ? "lg:order-2" : ""
              }`}
            >
              <img
                src={bloc.img}
                alt={bloc.alt}
                className="block h-full w-full object-cover"
              />
            </div>
            <div className={bloc.reverse ? "lg:order-1" : ""}>
              {/* Retour #115 Tanguy : "Redonnez de la force à vos formations
                  professionnelles" débordait avec un retour à la ligne moche
                  en mobile (titre à 1.6rem fixe = 25.6px sur smartphone, trop
                  gros pour le contexte). Passage en clamp responsif. */}
              <h3 className="mb-4 font-heading text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.2]">
                {bloc.title}
              </h3>
              <p className="mb-5 font-body text-[1rem] font-bold text-kinome-black">
                {bloc.subtitle}
              </p>
              <p className="mb-5 font-body text-[1rem] leading-[1.75] text-kinome-grey">
                {bloc.body}
              </p>
              <p className="mb-8 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.5] text-kinome-black">
                <strong className="font-bold">Notre objectif&nbsp;:</strong>{" "}
                {bloc.objectif}
              </p>
              <Link
                href={bloc.cta.href}
                className="mx-auto block w-fit btn-fill-accent rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
              >
                {bloc.cta.label}
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Notre expertise & notre accompagnement */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <h2 className="mb-20 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
          Notre expertise
          <ResponsiveBr />
          &amp; notre accompagnement
        </h2>
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 lg:grid-cols-4">
          {expertises.map((item) => (
            <div key={item.title}>
              <h3 className="mb-5 font-heading text-[1.5rem] font-semibold">
                {item.title}
              </h3>
              <p className="font-body text-[1rem] leading-[1.7] text-kinome-grey">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-5">
          <Link
            href="/services"
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Découvrez nos services
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-dark rounded-full border-2 border-kinome-black bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105"
          >
            Découvrir nos projets
          </Link>
        </div>
      </section>

      {/* Portfolio (fond dark) */}
      <section className="bg-kinome-dark px-[5%] pt-20 pb-[60px]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2">
          {portfolio.map((p) => (
            <Link
              key={p.alt}
              href="/portfolio"
              className="group relative block aspect-[16/9] overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="block h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="mt-16 flex justify-center pb-5">
          <Link
            href="/portfolio"
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-white rounded-full border-2 border-white bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-white/10"
          >
            Découvrir nos projets
          </Link>
        </div>
      </section>

      {/* Logos marquee */}
      <LogosMarquee />

      {/* CTA processus */}
      <section className="px-[5%] py-[clamp(70px,14vw,140px)] text-center">
        <h2 className="mx-auto mb-16 max-w-[1000px] font-heading text-[clamp(28px,5vw,60px)] font-normal leading-[1.1]">
          Parlons de ce dont vous avez besoin, avant ce que nous offrons&nbsp;!
        </h2>
        <Link
          href="/processus"
          className="mx-auto block w-fit btn-fill-accent rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Découvrir notre processus de travail
        </Link>
      </section>

      {/* Émotion */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[60px]">
        <div className="grid grid-cols-1 items-center gap-[100px] py-[60px] lg:grid-cols-2">
          <div>
            <h2 className="mb-2 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1] md:text-left">
              Kinome, c&rsquo;est avant
              <ResponsiveBr />
              tout de l&rsquo;émotion&nbsp;!
            </h2>
            <div className="relative mt-20 w-full max-w-[420px]">
              {/* Retour #89 — RÉSOLU : nouvelle illustration HD livrée par
                  Tanguy (mai 2026, transfer swisstransfer). Le trait
                  parasite n'existe plus sur cette version. WebP HQ + PNG
                  fallback. */}
              <picture>
                <source
                  type="image/webp"
                  srcSet="/assets/home-illustration.webp"
                />
                <img
                  src="/assets/home-illustration.png"
                  alt="Illustration Kinome — atelier créatif"
                  className="relative z-[1] block w-full object-contain"
                />
              </picture>
            </div>
          </div>
          <div>
            <p className="mb-6 font-body text-[clamp(15px,1.1vw,17px)] leading-[1.8] text-kinome-grey">
              En optant pour nos services, c&rsquo;est la garantie d&rsquo;avoir
              un projet de communication fort et abouti, aussi bien en print
              qu&rsquo;en digital. C&rsquo;est l&rsquo;assurance d&rsquo;avoir
              de l&rsquo;impact sur le public cible, et de remplir vos
              objectifs de communication.
            </p>
            <p className="font-body text-[clamp(15px,1.1vw,17px)] leading-[1.8] text-kinome-grey">
              Nous choisir, c&rsquo;est avoir la qualité attendue en agence,
              mais à taille humaine. De par notre contact direct avec le
              client, nous sommes plus à même de prendre en compte les besoins
              et inquiétudes de nos clients. Notre objectif est de devenir un
              partenaire de confiance pour tous les aspects, offrant des
              conseils en stratégie, en marketing digital et en communication.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages (composant partagé) */}
      <Testimonials />

      {/* Les nouvelles (blog).
          Retour #119 Tanguy : "tout en vertical, mauvaise structure du
          design". Ancien layout en grid 3 cols (numéro · titre+excerpt
          · bouton) s'effondrait moche en mobile (chaque article prenait
          3 lignes empilées sans hiérarchie).
          Nouvelle structure responsive :
          - Mobile : article entier cliquable, numéro à gauche compact,
            titre + excerpt à droite, plus de bouton (card entière =
            cliquable, gain de place).
          - Desktop : layout horizontal 3 cols préservé. */}
      <section className="mx-auto my-[60px] max-w-[1300px] rounded-[20px] bg-kinome-cream px-[clamp(20px,5vw,60px)] py-[clamp(50px,8vw,80px)]">
        <h2 className="mb-10 text-center font-heading text-[clamp(28px,4.5vw,48px)] font-normal md:mb-12 md:text-left">
          Les nouvelles
        </h2>
        <div className="flex flex-col">
          {nouvelles.map((n, i) => (
            <Link
              key={n.title}
              href={n.href}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 border-b border-[#e0ddd6] py-6 last:border-b-0 md:grid-cols-[60px_1fr_auto] md:gap-[30px] md:py-7"
            >
              <div className="font-heading text-[clamp(28px,3vw,42px)] font-bold leading-none text-[#d8d4cc] md:text-right">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="min-w-0">
                <h3 className="mb-1 font-heading text-[clamp(17px,1.5vw,22px)] font-semibold text-kinome-black transition-colors group-hover:text-kinome-accent md:mb-2">
                  {n.title}
                </h3>
                <p className="m-0 font-body text-[clamp(13px,1vw,15px)] leading-[1.55] text-kinome-grey">
                  {n.excerpt}
                </p>
              </div>
              {/* Bouton "Consulter" visible uniquement en desktop (la card
                  entière est cliquable en mobile, ça libère de la place). */}
              <span className="hidden whitespace-nowrap rounded-full border-[1.5px] border-kinome-black bg-transparent px-[22px] py-[10px] font-body text-[0.9rem] font-medium text-kinome-black transition-colors group-hover:bg-kinome-black group-hover:text-white md:inline-flex">
                Consulter l&rsquo;article
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Découvrir nos articles
          </Link>
        </div>
      </section>

      {/* Contact */}
      <div id="contact">
        <section className="px-[5%] pt-[clamp(90px,12vw,120px)] pb-10 text-center">
          <h2 className="mx-auto max-w-[900px] font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
            Vous avez un projet sur lequel vous souhaitez échanger&nbsp;?
          </h2>
        </section>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-20 px-[5%] pb-[clamp(60px,12vw,120px)] lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="mb-12 font-heading text-[2.8rem] font-bold">
              Kinome
            </h3>
            <div className="mb-9">
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#888]">
                Mathias
              </strong>
              <p className="m-0 font-body text-[clamp(16px,1.2vw,18px)] text-kinome-grey">
                <a
                  href={`mailto:${contact.emails.mathias}`}
                  className="hover:underline"
                >
                  {contact.emails.mathias}
                </a>
                {/* <br /> "fonctionnel" : doit rester visible en mobile pour
                    séparer email et téléphone (sinon ils se collent visuellement). */}
                <br />
                <a
                  href={`tel:${contact.phones.mathias.e164}`}
                  className="hover:underline"
                >
                  {contact.phones.mathias.display}
                </a>
              </p>
            </div>
            <div className="mb-9">
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#888]">
                Tanguy
              </strong>
              <p className="m-0 font-body text-[clamp(16px,1.2vw,18px)] text-kinome-grey">
                <a
                  href={`mailto:${contact.emails.tanguy}`}
                  className="hover:underline"
                >
                  {contact.emails.tanguy}
                </a>
                <br />
                <a
                  href={`tel:${contact.phones.tanguy.e164}`}
                  className="hover:underline"
                >
                  {contact.phones.tanguy.display}
                </a>
              </p>
            </div>
            <div>
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#888]">
                Suivez-nous
              </strong>
              <p className="m-0 flex flex-col gap-1 font-body text-[clamp(16px,1.2vw,18px)] text-kinome-grey">
                <a
                  href={contact.social.linkedinAgence}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      {/* FAQ — questions posées sur Kinome (AEO + GEO Genève) */}
      <section className="mx-auto max-w-[1100px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <h2 className="mb-12 text-center font-heading text-[clamp(24px,4.5vw,48px)] font-normal leading-[1.1]">
          Questions fréquentes
        </h2>
        <div className="flex flex-col gap-4">
          {faqHome.map((item) => (
            <details
              key={item.question}
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black list-none">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
