/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../../components/Testimonials";
import { buildMetadata, jsonLdScript, SITE } from "../../lib/seo";
import ResponsiveBr from "../../components/ResponsiveBr";

export const metadata = buildMetadata({
  title: "Our working process",
  description:
    "Discover Kinome's method for communication projects in Geneva: free discovery call, framing, iterative design and careful delivery. A transparent 5-step journey.",
  path: "/en/process/",
  keywords: [
    "communication agency method",
    "Geneva design process",
    "branding project workflow",
    "strategic framing",
  ],
});

const cadrageCards = [
  {
    icon: "projet",
    title: "The project itself",
    body: "A framing call helps us understand the goals, expectations and constraints of the project, so we can establish a clear and shared vision before the design phase begins.",
  },
  {
    icon: "signature-contrat",
    title: "Signing the contract",
    body: "Signing the contract formalises the agreement between both parties after validation of objectives and expectations. It specifies deliverables, deadlines, budget and conditions, guaranteeing a clear legal framework and the smooth running of the project.",
  },
];

// JSON-LD HowTo (EN version) — mirrors the FR HowTo for cross-language
// semantic coherence. Used by Google rich snippets and LLMs.
const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How a project unfolds with Agence Kinome",
  description:
    "Agence Kinome's process for your communication, branding and website projects in Geneva: 5 transparent steps from framing to delivery.",
  inLanguage: "en",
  totalTime: "P56D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "CHF",
    value: "3000-25000",
  },
  supply: [
    { "@type": "HowToSupply", name: "Client brief" },
    { "@type": "HowToSupply", name: "References and inspirations" },
    { "@type": "HowToSupply", name: "Existing content (texts, photos, logo)" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Video call (discovery call)" },
    { "@type": "HowToTool", name: "Tailored art direction" },
    { "@type": "HowToTool", name: "Professional design tools" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Discovery call",
      text: "A 30-minute call or video meeting to get acquainted, understand your project, your goals and your constraints. Free and no commitment.",
      url: `${SITE.url}/en/process/#discovery`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Framing and contract signing",
      text: "Detailed project framing (deliverables, timeline, budget) and signing the contract that formalises the agreement between both parties.",
      url: `${SITE.url}/en/process/#framing`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Art direction presentation",
      text: "Presentation of the creative vision: inspirations, stylistic references, aesthetic choices, colours, typography. Validation of the direction before production.",
      url: `${SITE.url}/en/process/#art-direction`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "First designs and iterations",
      text: "Design of first mockups, sketches or prototypes based on the validated direction. Multiple proposals, adjustments based on your feedback.",
      url: `${SITE.url}/en/process/#first-designs`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Final delivery and support",
      text: "Delivery of all files (high-definition PDF, source files AI/PSD/SVG, logo pack in multiple formats). Post-delivery support to use them.",
      url: `${SITE.url}/en/process/#delivery`,
    },
  ],
};

const etapes = [
  {
    num: "01",
    title: "Art direction presentation",
    img: "/assets/processus/presentation-1.png",
    body: "Presenting the art direction means sharing the creative vision of the project with the client, drawing on visual inspirations, stylistic references and an overall direction that will guide the design. At this stage, we set out aesthetic choices, colours, typography and visual elements that reflect the project's identity while answering the brief defined earlier. This presentation validates the orientation before moving into creation, ensuring the chosen direction matches the client's expectations and the message the project wants to convey. It's also a moment of exchange where the client can give feedback and adjust the proposals before the production phase.",
    reverse: false,
  },
  {
    num: "02",
    title: "First designs",
    img: "/assets/processus/presentation-2.png",
    body: "The first designs are a key step in the design process, where ideas take concrete shape. At this stage, we present visual concepts — mockups, sketches or prototypes — based on the validated art direction. These first proposals let us explore different approaches and test creative solutions while staying aligned with the project's objectives. It's an experimental phase, where we adjust visual elements, composition and ergonomics based on client feedback. The goal is to build a solid foundation that can be refined and perfected to deliver a coherent, impactful final design.",
    reverse: true,
  },
  {
    num: "03",
    title: "Delivery",
    img: "/assets/processus/presentation-3.png",
    body: "The final delivery includes all creative elements in formats adapted to their intended use. This generally includes high-definition PDF files for print or digital, plus source files (AI, PSD, etc.) if the client wants to make modifications or use the design flexibly in the future. For a branding project, a logo pack is also provided, including different logo versions (colour, black & white, icon only, etc.) in various formats (PNG, SVG, EPS) to guarantee optimal use across all supports. The purpose of this delivery is to give the client full autonomy in using and applying the design, while offering support for setup or future adjustments.",
    reverse: false,
  },
];

export default function ProcessPageEN() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(howToLd) }}
      />

      {/* Hero — cream background, title + Abstract Art */}
      <section className="bg-kinome-cream px-[5%] pt-[clamp(120px,18vw,180px)] pb-[clamp(50px,10vw,100px)]">
        <div className="mx-auto grid max-w-[1588px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <h1 className="max-w-[900px] font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.12] text-kinome-dark">
            A process designed to fully understand your project
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

      {/* It all starts with a call */}
      <section className="bg-white px-[5%] py-[clamp(60px,12vw,120px)]">
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
              It all starts
              <ResponsiveBr />
              with a call
            </h2>
            <div className="space-y-6 font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
              <p>
                The first step in our collaboration is a 30-minute call or
                video meeting — an essential moment to get to know each other
                and understand your communication needs. This time of exchange
                helps us grasp your objectives, your expectations and the
                specific challenges you face, while introducing you to our
                approach and our services.
              </p>
              <p>
                During this call, we define together the outlines of your
                project and lay the foundations for a productive
                collaboration. The aim is to make sure we're on the same
                wavelength before starting any concrete work, and to formalise
                our partnership with a contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Let's define your needs together — cream background, 2 cards */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mx-auto mb-16 max-w-[1100px] text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
            Let's define
            <ResponsiveBr />
            your needs together
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {cadrageCards.map((c) => (
              <article
                key={c.title}
                className="flex flex-col items-center gap-10 rounded-[24px] bg-white p-[clamp(40px,4vw,80px)] text-center"
              >
                <div className="flex h-[clamp(104px,12.5vw,150px)] w-[clamp(104px,12.5vw,150px)] items-center justify-center text-kinome-dark">
                  <picture>
                    <source type="image/webp" srcSet={`/assets/picto/${c.icon}.webp`} />
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

      {/* The design process — 3 numbered steps with photos */}
      <section className="bg-white px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-20 font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
            The design
            <ResponsiveBr />
            process
          </h2>

          {etapes.map((e) => (
            <div
              key={e.num}
              className="mb-16 grid grid-cols-1 items-center gap-[clamp(40px,5vw,90px)] last:mb-0 lg:grid-cols-2"
            >
              <div className={`overflow-hidden rounded-[24px] aspect-[4/5] ${e.reverse ? "lg:order-2" : ""}`}>
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

      {/* Testimonials (shared component) */}
      <Testimonials locale="en" />

      {/* CTA contact */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="mx-auto mb-8 max-w-[1000px] font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14]">
            Have a project you'd like
            <ResponsiveBr />
            to discuss with us?
          </h2>
          <p className="mx-auto mb-10 max-w-[700px] font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.6] text-kinome-dark">
            Every exchange is designed as the starting point of a genuine
            collaboration, where trust and shared commitment shape results
            that match your ambitions.
          </p>
          <Link
            href="/en/contact/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(15px,1.1vw,17px)] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
