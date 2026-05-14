/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../../components/Testimonials";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Our partners",
  description:
    "Kinome relies on a curated international network of creative partners: Codecircle, Koté, Propagande Guerilla, Fei Gao, Lucille Bory and Gianluca. A collective force serving your communication projects, from Geneva to international markets.",
  path: "/en/partners/",
  keywords: ["agency partners Geneva", "creative network", "design collaborations"],
});

type Partner = {
  nom: string;
  pays: string;
  description: string;
  visuel: { type: "color" | "image"; src?: string; bg?: string };
  site?: string;
};

const partners: Partner[] = [
  {
    nom: "Codecircle",
    pays: "Switzerland",
    description:
      "Codecircle is OUR web partner. While they can count on us for art direction, they're our champions for web production. With them, we're sure to deliver effective, well-optimised and polished websites.",
    visuel: { type: "image", src: "/assets/partenaire-codecircle.svg", bg: "#000" },
    site: "https://codecircle.com",
  },
  {
    nom: "Fei Gao",
    pays: "Shanghai — China",
    description:
      "Art director based in Shanghai, Fei is our creative expert in Asia. His return to China after ten years in Europe could have separated us — instead it brought us closer. He leads our projects targeting Asian markets.",
    visuel: { type: "image", src: "/assets/partenaire-fei-gao.png", bg: "#010101" },
  },
  {
    nom: "Lucille Bory",
    pays: "France & Canada",
    description:
      "Experienced designer working between France and Canada, Lucille brings her sensitive eye and creative rigour to many projects. Her multidisciplinary approach makes her a major asset for cross-cutting projects.",
    visuel: { type: "image", src: "/assets/partenaire-lucille.svg", bg: "#000" },
  },
  {
    nom: "Gianluca",
    pays: "Canada",
    description:
      "Our Montreal partner, expert in art direction for the North-American scene. His market knowledge and extensive network help us open Kinome to new territories.",
    visuel: { type: "image", src: "/assets/partenaire-gianluca.png", bg: "#000" },
  },
  {
    nom: "Propagande Guerilla",
    pays: "Canada",
    description:
      "Our creative comrades in Canada. Working with them on international projects guarantees a good understanding of North-American and European territories. Our partnership brings cultural enrichment, creative versatility and shared knowledge.",
    visuel: { type: "image", src: "/assets/partenaire-propagande.png", bg: "#000" },
  },
  {
    nom: "Koté",
    pays: "France",
    description:
      "Quentin, a creative partner in web design, is a development expert. With his web studio Koté, we have worked together many times to define the art direction, architecture and overall design of websites.",
    visuel: { type: "image", src: "/assets/partenaire-kote.svg", bg: "#4a47ed" },
  },
];

export default function PartnersEN() {
  return (
    <main>
      <section className="bg-kinome-cream px-[5%] pt-[clamp(120px,18vw,180px)] pb-[clamp(50px,10vw,100px)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <h1 className="font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black">
            Kinome works with many consultants, and that's a pleasure!
          </h1>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/assets/visual-artist.png"
              alt=""
              className="block w-full max-w-[500px] object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
        >
          <img
            src="/assets/world-map.png"
            alt=""
            className="block w-full max-w-[1600px] object-contain"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <h2 className="mb-14 text-center font-heading text-[clamp(26px,4vw,56px)] font-normal leading-[1.1] text-kinome-black">
            International experience
            <br className="hidden md:inline" />
            &amp; partners across territories
          </h2>
          <div className="mx-auto max-w-[900px] space-y-5 text-center font-body text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-kinome-grey">
            <p>
              Building on our international experience, we have had the privilege
              of working with clients and partners across several territories,
              including Canada, Switzerland and France.
            </p>
            <p>
              This geographic diversity has enriched our expertise and developed
              a fine understanding of cultural, economic and social specificities
              in each market. We adapt our communication strategies to each
              region's unique needs while maintaining global coherence and a
              tailored approach.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-16 text-center font-heading text-[clamp(26px,4vw,56px)] font-normal leading-[1.1] text-kinome-black">
            Our partners
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {partners.map((p) => (
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
                  <h3 className="mb-1 font-heading text-[1.6rem] font-bold">{p.nom}</h3>
                  <p className="mb-4 font-body text-[0.95rem] uppercase tracking-wider text-kinome-grey">
                    {p.pays}
                  </p>
                  <p className="mb-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                    {p.description}
                  </p>
                  {p.site && (
                    <a
                      href={p.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline hover:opacity-70"
                    >
                      Website
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[clamp(50px,8vw,80px)] text-center text-white">
        <h2 className="mb-6 font-heading text-[clamp(28px,3vw,44px)] font-normal leading-[1.1]">
          An international project?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-white/80">
          Let's mobilise the right partners to make your project succeed — wherever you are.
        </p>
        <Link
          href="/en/contact/"
          className="btn-fill-dark mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105 hover:text-white"
        >
          <span className="relative z-10">Let's talk</span>
        </Link>
      </section>
    </main>
  );
}
