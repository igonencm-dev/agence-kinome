/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../../components/Testimonials";
import VisualDiary from "../../components/VisualDiary";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About the agency",
  description:
    "Kinome is an independent communication agency based in Geneva. Discover our team, our principles — commitment, transparency, creativity — and the expertises we bring to each brand project.",
  path: "/en/about/",
  keywords: ["Kinome team", "independent agency Geneva", "creative studio Switzerland"],
});

const principles = [
  { title: "Commitment", body: "We fully commit to every project. Your success is ours: we treat your brand with as much care as if it were our own." },
  { title: "Intelligence", body: "Every brand has its own logic. We listen, we research, we cross perspectives to build informed, relevant, sustainable proposals." },
  { title: "Transparency", body: "Clear communication, realistic expectations, regular check-ins. You always know where you stand on your project." },
  { title: "Creativity", body: "We believe in originality. Each project is treated as a unique opportunity to invent a singular visual identity." },
];

export default function AboutEN() {
  return (
    <main>
      <section className="bg-kinome-cream px-[5%] pt-[clamp(120px,18vw,180px)] pb-[clamp(50px,10vw,100px)]">
        <div className="mx-auto grid max-w-[1588px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <h1 className="max-w-[900px] font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.12] text-kinome-black">
            Kinome, the communication agency that walks with you with sincerity.
          </h1>
          <div className="flex justify-center lg:justify-end">
            <VisualDiary />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(50px,10vw,100px)]">
        <h2 className="mb-16 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
          Our principles
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-[20px] bg-kinome-cream p-10">
              <h3 className="mb-4 font-heading text-[1.6rem] font-semibold">
                {p.title}
              </h3>
              <p className="font-body text-[1rem] leading-[1.7] text-kinome-grey">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-kinome-cream px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-16 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
            Meet the team
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <article>
              <div className="mb-8 aspect-[3/4] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/assets/wp/apropos-team-mathias.webp"
                  />
                  <img
                    src="/assets/wp/apropos-team-mathias.png"
                    alt="Mathias Igonenc — Kinome co-founder"
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="lazy"
                  />
                </picture>
              </div>
              <h3 className="mb-3 font-heading text-[clamp(20px,1.9vw,28px)] font-bold leading-[1.3]">
                Mathias Igonenc{" "}
                <span className="font-light">— co-founder &amp; marketing director</span>
              </h3>
              <p className="mb-4 font-body text-[1rem] font-light leading-[1.55] text-kinome-dark">
                Co-founder and marketing director of Kinome, Mathias started
                out as a freelancer by building Codecircle, an agency
                specialised in web development, SEO and digital automation.
                With 5 years of experience supporting entrepreneurs in their
                digital transformation, he has developed concrete expertise
                in online presence strategy.
              </p>
              <p className="mb-4 font-body text-[1rem] font-light leading-[1.55] text-kinome-dark">
                His encounter with Tanguy gave rise to Kinome, a 360°
                communication agency based in Geneva. Convinced that every
                project deserves dedicated attention, Mathias invests himself
                alongside SMEs, micro-businesses and entrepreneurs to build
                communication strategies that generate measurable results,
                from branding to social media.
              </p>
            </article>

            <article>
              <div className="mb-8 aspect-[3/4] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/assets/wp/apropos-team-tanguy.webp"
                  />
                  <img
                    src="/assets/wp/apropos-team-tanguy.png"
                    alt="Tanguy Deniel — Kinome co-founder"
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="lazy"
                  />
                </picture>
              </div>
              <h3 className="mb-3 font-heading text-[clamp(20px,1.9vw,28px)] font-bold leading-[1.3]">
                Tanguy Deniel{" "}
                <span className="font-light">— co-founder &amp; creative director</span>
              </h3>
              <p className="mb-4 font-body text-[1rem] font-light leading-[1.55] text-kinome-dark">
                Founder and director of Kinome, Tanguy has worked in various
                communication agencies around the world (TBWA, Dix-Sept and
                Enderby in Paris, RTS in Geneva, LMG in Montreal) to ensure
                a rich and complete experience in creative work and art
                direction.
              </p>
              <p className="mb-4 font-body text-[1rem] font-light leading-[1.55] text-kinome-dark">
                After ten years in agencies and a stint across three
                countries on two continents, he decided to found his own
                communication studio in Geneva, to keep this direct,
                emotional and privileged bond with his clients.
              </p>
            </article>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[clamp(50px,8vw,80px)] text-center text-white">
        <h2 className="mb-6 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
          Want to start a project?
        </h2>
        <Link
          href="/en/contact/"
          className="btn-fill-dark mt-4 mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105 hover:text-white"
        >
          <span className="relative z-10">Let's talk</span>
        </Link>
      </section>
    </main>
  );
}
