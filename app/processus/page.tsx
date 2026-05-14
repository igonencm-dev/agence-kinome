/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../components/Testimonials";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Notre processus de travail",
  description:
    "Découvrez la méthode Kinome pour mener vos projets de communication à Genève : appel découverte gratuit, cadrage stratégique, conception itérative et livraison soignée. Un parcours transparent en quatre étapes pensé pour bâtir des résultats à la hauteur de vos ambitions.",
  path: "/processus/",
  keywords: [
    "méthode agence communication",
    "processus design Genève",
    "déroulement projet branding",
    "cadrage stratégique",
  ],
});

// Nouvelles icônes livrées par Tanguy (swisstransfer mai 2026) — slugs
// correspondent aux fichiers /assets/picto/<slug>.{webp,png}.
const cadrageCards = [
  {
    icon: "projet",
    title: "Le projet en lui-même",
    body: "Un appel de cadrage permet de comprendre les objectifs, attentes et contraintes du projet afin d'établir une vision claire et partagée avant la phase de conception.",
  },
  {
    icon: "signature-contrat",
    title: "La signature du contrat",
    body: "La signature du contrat formalise l'accord entre les parties après validation des objectifs et des attentes. Il précise les livrables, délais, budget et conditions, garantissant un cadre juridique clair et le bon déroulement du projet.",
  },
];

const etapes = [
  {
    num: "01",
    title: "Présentation de la direction",
    img: "/assets/processus/presentation-1.png",
    body: "La présentation de la direction artistique vise à partager la vision créative du projet avec le client, en s'appuyant sur des inspirations visuelles, des références stylistiques et une direction générale qui guidera la conception. Lors de cette étape, on expose les choix esthétiques, les couleurs, les typographies et les éléments visuels qui reflètent l'identité du projet tout en répondant aux besoins définis précédemment. Cette présentation permet de valider l'orientation avant de se lancer dans la phase de création, tout en s'assurant que la direction choisie correspond aux attentes du client et au message que le projet souhaite véhiculer. C'est aussi un moment d'échange où le client peut donner son avis et ajuster les propositions avant la phase de production.",
    reverse: false,
  },
  {
    num: "02",
    title: "Premières créations",
    img: "/assets/processus/presentation-2.png",
    body: "Les premières créations sont une étape clé dans le processus de design, où les idées prennent forme de manière concrète. À ce stade, on présente des concepts visuels, tels que des maquettes, des croquis ou des prototypes, basés sur la direction artistique validée. Ces premières propositions permettent d'explorer différentes approches et de tester des solutions créatives tout en restant aligné avec les objectifs du projet. C'est une phase d'expérimentation, où l'on ajuste les éléments visuels, la composition et l'ergonomie, en fonction des retours du client. L'objectif est de créer une base solide sur laquelle on pourra affiner et perfectionner les détails pour aboutir à un design final cohérent et percutant.",
    reverse: true,
  },
  {
    num: "03",
    title: "Livraison des créations",
    img: "/assets/processus/presentation-3.png",
    body: "La livraison du projet final comprend l'ensemble des éléments créatifs dans des formats adaptés à l'usage prévu. Cela inclut généralement des fichiers PDF haute définition pour les supports imprimés ou numériques, ainsi que les fichiers sources (par exemple, AI, PSD, etc.) si le client souhaite apporter des modifications ou utiliser le design de manière flexible à l'avenir. Pour un projet de branding, un pack logo est également fourni, comprenant différentes versions du logo (couleur, noir et blanc, icône seule, etc.) dans divers formats (PNG, SVG, EPS) pour garantir une utilisation optimale sur tous les supports. L'objectif de cette livraison est de donner au client une totale autonomie dans l'utilisation et l'application du design tout en offrant un accompagnement pour la mise en place ou la modification de ses supports à long terme.",
    reverse: false,
  },
];

export default function ProcessusPage() {
  return (
    <main>
      {/* Hero — fond cream, titre + Abstract Art */}
      <section className="bg-kinome-cream px-[5%] pt-[180px] pb-[100px]">
        <div className="mx-auto grid max-w-[1588px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <h1 className="max-w-[900px] font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.12] text-kinome-dark">
            Un processus conçu pour comprendre pleinement votre projet
          </h1>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/assets/processus/abstract-art.svg"
              alt=""
              className="block w-full max-w-[500px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Tout commence par un appel — fond blanc.
          Retour #96 : illustration agrandie ×2.5 pour s'aligner visuellement
          avec les autres illustrations du processus. */}
      <section className="bg-white px-[5%] py-[120px]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/assets/processus/online-chat.svg"
              alt=""
              className="block w-full max-w-[640px] object-contain"
            />
          </div>
          <div>
            <h2 className="mb-10 font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
              Tout commence
              <br className="hidden md:inline" />
              par un appel
            </h2>
            <div className="space-y-6 font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
              <p>
                La première étape de notre collaboration consiste en un appel
                ou une visio de 30 minutes, un moment essentiel pour faire
                connaissance et bien cerner vos besoins en communication. Ce
                temps d&rsquo;échange nous permet de comprendre vos objectifs,
                vos attentes, et les défis spécifiques que vous rencontrez,
                tout en vous présentant notre approche et nos services.
              </p>
              <p>
                Lors de cet appel, nous définissons ensemble les contours de
                votre projet et posons les bases d&rsquo;une collaboration
                fructueuse. L&rsquo;objectif est de s&rsquo;assurer que nous
                sommes sur la même longueur d&rsquo;onde avant d&rsquo;entamer
                toute démarche concrète et de formaliser notre partenariat par
                un contrat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Définissons ensemble vos besoins — fond cream, 2 cards */}
      <section className="bg-kinome-cream px-[5%] py-[120px]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mx-auto mb-16 max-w-[1100px] text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
            Définissons ensemble
            <br className="hidden md:inline" />
            vos besoins
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {cadrageCards.map((c) => (
              <article
                key={c.title}
                className="flex flex-col items-center gap-10 rounded-[24px] bg-white p-[clamp(40px,4vw,80px)] text-center"
              >
                {/* Retour #97 : icônes divisées par ~2 (260→130).
                    Retour Tanguy #126 (mobile) : +15 % de taille — clamp
                    passe de (90,11vw,130) à (104,12.5vw,150).
                    Nouvelles icônes Tanguy (mai 2026) servies en WebP HQ
                    + PNG fallback via <picture>. */}
                <div className="flex h-[clamp(104px,12.5vw,150px)] w-[clamp(104px,12.5vw,150px)] items-center justify-center text-kinome-dark">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/assets/picto/${c.icon}.webp`}
                    />
                    <img
                      src={`/assets/picto/${c.icon}.png`}
                      alt=""
                      className="block h-full w-full object-contain"
                    />
                  </picture>
                </div>
                <h3 className="font-heading text-[clamp(22px,1.9vw,30px)] font-semibold leading-[1.3]">
                  {c.title}
                </h3>
                <p className="max-w-[420px] font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Le processus de conception — 3 étapes numérotées avec photos */}
      <section className="bg-white px-[5%] py-[120px]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-20 font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
            Le processus
            <br className="hidden md:inline" />
            de conception
          </h2>

          {/* Retour #99 : images étapes passées d'un ratio 2:3 portrait
              très étiré à un 4:5 plus compact (réduction ~20 % de hauteur).
              Retour #98 : descriptions ramenées à la taille body standard
              (cap à 18 px au lieu de 22). */}
          {etapes.map((e) => (
            <div
              key={e.num}
              className="mb-16 grid grid-cols-1 items-center gap-[clamp(40px,5vw,90px)] last:mb-0 lg:grid-cols-2"
            >
              <div
                className={`overflow-hidden rounded-[24px] aspect-[4/5] ${
                  e.reverse ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={e.img}
                  alt={e.title}
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className={e.reverse ? "lg:order-1" : ""}>
                <p className="mb-6 font-body text-[clamp(60px,8vw,100px)] font-thin leading-none text-kinome-dark">
                  {e.num}
                </p>
                <h3 className="mb-8 font-heading text-[clamp(22px,2vw,30px)] font-semibold leading-[1.3]">
                  {e.title}
                </h3>
                <p className="font-body text-[clamp(16px,1.1vw,17px)] font-light leading-[1.65] text-kinome-dark">
                  {e.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages (composant partagé) */}
      <Testimonials />

      {/* CTA contact */}
      <section className="bg-kinome-cream px-[5%] py-[120px]">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="mx-auto mb-8 max-w-[1000px] font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
            Vous avez un projet sur lequel
            <br className="hidden md:inline" />
            vous souhaitez échanger&nbsp;?
          </h2>
          <p className="mx-auto mb-10 max-w-[700px] font-body text-[1.1rem] font-light leading-[1.6] text-kinome-dark">
            Chaque échange est pensé comme le point de départ d&rsquo;une
            collaboration sincère, où la confiance et l&rsquo;engagement
            commun façonnent des résultats à la hauteur de vos ambitions.
          </p>
          <Link
            href="/contact/"
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[1.05rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
