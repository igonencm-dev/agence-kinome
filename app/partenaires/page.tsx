/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { buildMetadata } from "../lib/seo";

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
    visuel: { type: "color", bg: "#d9d9d9" },
  },
  {
    nom: "Gianluca",
    pays: "Canada",
    description:
      "Notre partenaire montréalais, expert en direction artistique pour la scène nord-américaine. Sa connaissance du marché et son réseau étendu nous permettent d'ouvrir Kinome à de nouveaux territoires.",
    visuel: { type: "image", src: "/assets/partenaire-lucille.png", bg: "#000" },
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
      {/* Hero */}
      <section className="bg-kinome-cream px-[5%] pt-[180px] pb-[100px]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <h1 className="font-heading text-[5rem] font-normal leading-[1.1] sm:text-[2.8rem]">
            Kinome travaille avec de nombreux consultants, et ça fait
            plaisir&nbsp;!
          </h1>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/assets/visual-artist.png"
              alt=""
              className="block w-full max-w-[500px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Une expérience à l'international */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[120px]">
        <h2 className="mb-12 text-center font-heading text-[3.5rem] font-normal leading-[1.1] sm:text-[2.2rem]">
          Une expérience à l&rsquo;internationale
          <br />
          &amp; des partenaires sur différents territoires
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-[20px]">
              <img
                src="/assets/plan-de-travail-3.png"
                alt=""
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="font-body text-[1.05rem] leading-[1.7] text-kinome-grey">
            <p className="mb-5">
              Fort de notre expérience à l&rsquo;international, nous avons eu le
              privilège de collaborer avec des clients et des partenaires sur
              plusieurs territoires, dont le Canada, la Suisse et la France.
            </p>
            <p className="mb-5">
              Cette diversité géographique nous a permis d&rsquo;enrichir notre
              expertise et de développer une compréhension fine des
              spécificités culturelles, économiques et sociales de chaque
              marché. Nous avons su adapter nos stratégies de communication
              pour répondre aux besoins uniques de chaque région tout en
              maintenant une cohérence globale et une approche sur-mesure.
              Nos collaborations internationales sont un gage de notre
              capacité à penser globalement tout en agissant localement.
            </p>
            <p>
              Travailler avec des partenaires reste répandu dans le milieu de
              la communication. Autant vous présenter les visages de nos
              collègues travaillant sur vos projets&nbsp;!
            </p>
          </div>
        </div>
      </section>

      {/* Liste des partenaires */}
      <section className="bg-kinome-cream px-[5%] py-[120px]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-16 text-center font-heading text-[3.5rem] font-normal leading-[1.1] sm:text-[2.2rem]">
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
                      className="block h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
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
              className="inline-flex min-w-[300px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              Vous souhaitez vous présenter&nbsp;?
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[80px] text-center text-white">
        <h2 className="mb-6 font-heading text-[2.8rem] font-normal leading-[1.1]">
          Un projet international&nbsp;?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[1.05rem] leading-[1.6] text-white/80">
          Mobilisons les bons partenaires pour réussir votre projet, où que
          vous soyez.
        </p>
        <Link
          href="/contact/"
          className="inline-flex min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105"
        >
          Discutons-en
        </Link>
      </section>
    </main>
  );
}
