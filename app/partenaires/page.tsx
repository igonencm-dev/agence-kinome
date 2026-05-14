/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../components/Testimonials";
import { buildMetadata } from "../lib/seo";
import ResponsiveBr from "../components/ResponsiveBr";

export const metadata = buildMetadata({
  title: "Nos partenaires",
  description:
    "Kinome s'appuie sur un réseau international de partenaires créatifs sélectionnés : Codecircle, Koté, Propagande Guerilla, Fei Gao, Lucille Bory et Gianluca. Une force collective au service de vos projets de communication, depuis Genève jusqu'à l'international.",
  path: "/partenaires/",
  keywords: [
    "partenaires agence Genève",
    "réseau créatif",
    "collaborations design",
  ],
});

type Partenaire = {
  nom: string;
  pays: string;
  description: string;
  visuel: { type: "color" | "image"; src?: string; bg?: string };
  site?: string;
  linkedin?: string;
};

const partenaires: Partenaire[] = [
  {
    nom: "Codecircle",
    pays: "Suisse",
    description:
      "Codecircle est NOTRE partenaire web ! S'ils peuvent compter sur nous pour de la Direction Artistique, ce sont nos champions en production Web. Avec eux, nous sommes assurés d'avoir des sites efficaces, bien référencés, et aboutis !",
    visuel: { type: "image", src: "/assets/partenaire-codecircle.svg", bg: "#000" },
    site: "https://codecircle.com",
  },
  {
    nom: "Fei Gao",
    pays: "Shanghai - Chine",
    description:
      "Directeur artistique basé à Shanghai, Fei est notre expert en création sur le territoire asiatique. Si son retour en Chine après dix ans passé en Europe aurait pu nous éloigner, cela a produit l'effet inverse ! Il est aujourd'hui notre responsable sur les projets à destination de l'Asie, et notre renfort pour des projets plus costaud.",
    visuel: { type: "image", src: "/assets/partenaire-fei-gao.png", bg: "#010101" },
  },
  {
    nom: "Lucille Bory",
    pays: "France & Canada",
    description:
      "Designer expérimentée travaillant entre la France et le Canada, Lucille apporte son regard sensible et son exigence créative sur de nombreux projets. Sa pluridisciplinarité fait d'elle un atout majeur pour les projets transversaux.",
    visuel: { type: "image", src: "/assets/partenaire-lucille.svg", bg: "#000" },
  },
  {
    nom: "Gianluca",
    pays: "Canada",
    description:
      "Notre partenaire montréalais, expert en direction artistique pour la scène nord-américaine. Sa connaissance du marché et son réseau étendu nous permettent d'ouvrir Kinome à de nouveaux territoires.",
    visuel: { type: "image", src: "/assets/partenaire-gianluca.png", bg: "#000" },
  },
  {
    nom: "Propagande Guerilla",
    pays: "Canada",
    description:
      "Ce sont nos camarades créatifs au Canada. Travailler avec eux sur des projets internationaux, est la garantie d'une bonne compréhension des différents territoires Nord-américain et Européen. Ce rapprochement entre nos deux agences apporte un enrichissement culturel, une polyvalence créative et un partage de connaissances. Nous sommes heureux d'avoir créer cette grande amitié avec eux.",
    visuel: { type: "image", src: "/assets/partenaire-propagande.png", bg: "#000" },
  },
  {
    nom: "Koté",
    pays: "France",
    description:
      "Quentin, partenaire créatif en web design, est un expert en développement de site. Avec son studio de création web Koté, nous avons travaillé de nombreuses fois, main dans la main, pour définir la direction artistique, l'architecture et le design global de sites.",
    visuel: { type: "image", src: "/assets/partenaire-kote.svg", bg: "#4a47ed" },
  },
];

export default function PartenairesPage() {
  return (
    <main>
      {/* Hero — H1 standardisé sur le standard du site */}
      <section className="bg-kinome-cream px-[5%] pt-[clamp(120px,18vw,180px)] pb-[clamp(50px,10vw,100px)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <h1 className="text-center font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black lg:text-left">
            Kinome travaille avec de nombreux consultants, et ça fait
            plaisir&nbsp;!
          </h1>
          <div className="flex justify-center lg:justify-end">
            {/* Retour #101 : nouvelle illustration HD livrée par Tanguy (mai 2026)
                — personnage choisissant entre smileys. Remplace l'ancienne
                qui pixelisait. WebP HQ + PNG fallback. */}
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/partenaires-hero.webp"
              />
              <img
                src="/assets/partenaires-hero.png"
                alt=""
                className="block w-full max-w-[500px] object-contain mix-blend-multiply"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Une expérience internationale — section avec la carte du monde en fond.
          Retour #102 : carte plus visible (opacité 0.3 → 0.55) pour
          retrouver l'effet apprécié par Tanguy. */}
      <section className="relative overflow-hidden bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-55"
        >
          <img
            src="/assets/world-map.png"
            alt=""
            className="block w-full max-w-[1500px] object-contain"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <h2 className="mb-14 text-center font-heading text-[clamp(28px,4vw,56px)] font-normal leading-[1.1] text-kinome-black">
            Une expérience à l&rsquo;internationale
            <ResponsiveBr />
            &amp; des partenaires sur différents territoires
          </h2>
          <div className="mx-auto max-w-[900px] space-y-5 text-center font-body text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-kinome-grey">
            <p>
              Fort de notre expérience à l&rsquo;international, nous avons eu
              le privilège de collaborer avec des clients et des partenaires
              sur plusieurs territoires, dont le Canada, la Suisse et la
              France.
            </p>
            <p>
              Cette diversité géographique nous a permis d&rsquo;enrichir
              notre expertise et de développer une compréhension fine des
              spécificités culturelles, économiques et sociales de chaque
              marché. Nous adaptons nos stratégies de communication pour
              répondre aux besoins uniques de chaque région tout en
              maintenant une cohérence globale et une approche sur-mesure.
            </p>
            <p>
              Travailler avec des partenaires reste répandu dans le milieu
              de la communication. Autant vous présenter les visages de nos
              collègues travaillant sur vos projets&nbsp;!
            </p>
          </div>
        </div>
      </section>

      {/* Liste des partenaires */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-16 text-center font-heading text-[clamp(28px,4vw,56px)] font-normal leading-[1.1] text-kinome-black">
            Nos partenaires
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {partenaires.map((p) => (
              <article
                key={p.nom}
                className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1fr]"
              >
                <div
                  className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[20px] sm:w-[200px]"
                  style={{ backgroundColor: p.visuel.bg ?? "#d9d9d9" }}
                >
                  {p.visuel.type === "image" && p.visuel.src ? (
                    <img
                      src={p.visuel.src}
                      alt={p.nom}
                      // Retour #103 : logo Koté un peu plus contenu (cap 60% au
                      // lieu de 70/80) pour l'équilibrer optiquement avec les
                      // autres logos partenaires.
                      className={`block h-auto w-auto object-contain ${
                        p.nom === "Koté"
                          ? "max-h-[55%] max-w-[68%]"
                          : "max-h-[70%] max-w-[80%]"
                      }`}
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-[1.6rem] font-bold">
                    {p.nom}
                  </h3>
                  <p className="mb-4 font-body text-[0.95rem] uppercase tracking-wider text-kinome-grey">
                    {p.pays}
                  </p>
                  <p className="mb-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-[0.95rem] font-bold">
                    {p.site && (
                      <a
                        href={p.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-70"
                      >
                        Site internet
                      </a>
                    )}
                    {p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-70"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link
              href="/contact/"
              className="mx-auto md:mx-0 flex w-fit min-w-[300px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              Vous souhaitez vous présenter&nbsp;?
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages (composant partagé) */}
      <Testimonials />

      {/* CTA — retour #104 : bug d'affichage du bouton (texte avalé par le
          fill noir au hover, manque le span z-10 + bascule de couleur).
          Retour mobile #131 Tanguy : passage en clair (cream + noir) au
          lieu du fond sombre, plus en ligne avec le reste de la page. */}
      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-cream px-[5%] py-[clamp(50px,8vw,80px)] text-center text-kinome-black">
        <h2 className="mb-6 font-heading text-[clamp(28px,3vw,44px)] font-normal leading-[1.1]">
          Un projet international&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[clamp(16px,1.1vw,19px)] leading-[1.6] text-kinome-grey">
          Mobilisons les bons partenaires pour réussir votre projet, où que
          vous soyez.
        </p>
        <Link
          href="/contact/"
          className="btn-fill-accent group mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,color] duration-300 hover:scale-105"
        >
          <span className="relative z-10">Discutons-en</span>
        </Link>
      </section>
    </main>
  );
}
