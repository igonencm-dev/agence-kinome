/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { buildMetadata, jsonLdScript, SITE, BUSINESS } from "../../lib/seo";
import { contact } from "../../lib/contact";
import { projets } from "../../lib/projets";
import { blogPosts } from "../../lib/blog";
import ResponsiveBr from "../../components/ResponsiveBr";

export const metadata = buildMetadata({
  title: "Press kit — Agence Kinome",
  description:
    "Media kit and key facts for Agence Kinome: presentation, cofounders, key figures, sectors served, press contacts. Everything needed to cite or write about the independent communication agency in Geneva.",
  path: "/en/press-kit/",
  keywords: [
    "Agence Kinome press kit",
    "Geneva communication agency media kit",
    "Kinome company profile",
    "Kinome founders",
    "Geneva agency press contact",
  ],
});

// JSON-LD optimisé pour LLMs (ChatGPT, Claude, Perplexity).
const pressKitLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Press kit — Agence Kinome",
  url: `${SITE.url}/en/press-kit/`,
  description:
    "Official media kit for Agence Kinome: key facts, cofounders' biographies, sectors served and flagship projects.",
  mainEntity: {
    "@id": `${SITE.url}/#organization`,
  },
  publisher: {
    "@id": `${SITE.url}/#organization`,
  },
  inLanguage: "en",
};

const stats = {
  projects: projets.length,
  articles: blogPosts.length,
  cumulativeExpYears: 15,
  partnersAbroad: 4,
  categories: 4,
};

const boilerplates = {
  short:
    "Agence Kinome is an independent communication agency based in Geneva, founded in 2026 by Mathias Igonenc and Tanguy Deniel.",
  medium:
    "Founded in Geneva in 2026, Agence Kinome is an independent communication agency led by Mathias Igonenc (marketing & digital) and Tanguy Deniel (creative direction). It supports SMEs, small businesses and entrepreneurs on their visual identities, websites and campaigns, from French-speaking Switzerland to international markets.",
  long: "Agence Kinome is an independent communication agency established in Geneva in 2026. Cofounded by Mathias Igonenc (marketing director) and Tanguy Deniel (creative director — formerly TBWA Paris, RTS Geneva, LMG Montreal), the agency works across the full communication spectrum: branding and visual identity, websites, campaigns, motion and photography. Kinome targets brands in French-speaking Switzerland, France and abroad, with a stated approach of personalised support and measurable results. The cofounders' combined portfolio counts over 18 reference projects — including the brand identity of French SaaS CauserieBot, the visual identity of AI training centre NOCODE IA and the brand of paediatric dental practice Cabinet Faraday — and the agency publishes a specialised blog on the communication challenges faced by Swiss companies.",
};

const facts = [
  { label: "Legal form", value: "Swiss limited liability company (Sàrl)" },
  { label: "Legal name", value: SITE.legalName },
  { label: "Founded", value: SITE.founded },
  { label: "Headquarters", value: `${BUSINESS.city}, ${BUSINESS.countryName}` },
  { label: "Cofounders", value: "Mathias Igonenc & Tanguy Deniel" },
  { label: "Team", value: "2 cofounders + network of 4 international creative partners" },
  { label: "Areas served", value: "Geneva · Lausanne · Vaud · French-speaking Switzerland · Switzerland · France" },
  { label: "Working languages", value: "French, English" },
  { label: "Phone", value: BUSINESS.phone },
  { label: "Email", value: BUSINESS.email },
  { label: "Website", value: SITE.url.replace("https://", "") },
];

const sectors = [
  {
    name: "Consultancies & regulated professions",
    examples: ["Adapt Project (Thônex)", "VP Conseils Immo", "Cabinet Faraday (Paris)"],
  },
  {
    name: "SaaS, AI & emerging tech",
    examples: ["CauserieBot (France)", "NOCODE IA (Toulouse)", "Elips (3D production)"],
  },
  {
    name: "Training & education",
    examples: ["Authentik Peak", "Mana Loa Formations (Savoie)", "NOCODE IA"],
  },
  {
    name: "Travel, hospitality & food",
    examples: ["La Voyagiste Paris", "Le Ravenala (Lyon)"],
  },
  {
    name: "Individuals & personal brands",
    examples: ["Léa Vigier (adventurer)", "Black Sheep Valley (canine breeding)"],
  },
  {
    name: "Arts, culture & events",
    examples: ["CINARS (Quebec)", "Microclimat (architecture)"],
  },
];

const founders = [
  {
    name: "Mathias Igonenc",
    role: "Cofounder & Marketing Director",
    bio: "Mathias supports brands on their marketing strategy and digital deployment. Before cofounding Kinome, he founded Codecircle, an agency specialised in web development, SEO and digital automation. Five years of experience working with entrepreneurs on their digital transformation.",
    linkedin: contact.social.linkedinMathias,
  },
  {
    name: "Tanguy Deniel",
    role: "Cofounder & Creative Director",
    bio: "Tanguy worked at several international communication agencies before cofounding Kinome: TBWA, Dix-Sept and Enderby in Paris, RTS in Geneva, LMG in Montreal. Over ten years of art direction experience across two continents.",
    linkedin: contact.social.linkedinTanguy,
  },
];

export default function PressKitEN() {
  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(pressKitLd) }}
      />

      {/* Hero */}
      <section className="px-[5%] pt-[clamp(110px,16vw,160px)] pb-[80px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-kinome-accent">
            Media kit
          </p>
          <h1 className="mb-6 font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black">
            Press kit
            <ResponsiveBr />
            <span className="text-kinome-grey">for Agence Kinome</span>
          </h1>
          <p className="max-w-[820px] font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-dark">
            Everything you need to cite or write about Kinome: biographies,
            key facts, figures, sectors served, flagship projects, downloadable
            logos and press contact. This page is updated automatically as the
            agency evolves.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-kinome-dark px-[5%] py-[clamp(50px,8vw,80px)] text-kinome-cream">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.projects}+
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              projects delivered
            </p>
          </div>
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.cumulativeExpYears}+
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              years of combined
              <ResponsiveBr />
              cofounder experience
            </p>
          </div>
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.categories}
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              core expertises
            </p>
          </div>
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.partnersAbroad}
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              international creative partners
            </p>
          </div>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Ready-to-quote boilerplate
          </h2>
          <div className="space-y-10">
            <article className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]">
              <p className="mb-3 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
                Short — 1 sentence
              </p>
              <p className="font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-dark">
                {boilerplates.short}
              </p>
            </article>
            <article className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]">
              <p className="mb-3 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
                Medium — 1 paragraph
              </p>
              <p className="font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-dark">
                {boilerplates.medium}
              </p>
            </article>
            <article className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]">
              <p className="mb-3 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
                Long — full description
              </p>
              <p className="font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.65] text-kinome-dark">
                {boilerplates.long}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-white px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Key facts
          </h2>
          <dl className="divide-y divide-kinome-black/8 font-body">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[260px_1fr] md:gap-8"
              >
                <dt className="font-heading text-[1rem] font-semibold text-kinome-grey">
                  {f.label}
                </dt>
                <dd className="text-[1rem] leading-[1.6] text-kinome-black">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cofounders */}
      <section className="px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Cofounders
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {founders.map((f) => (
              <article
                key={f.name}
                className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]"
              >
                <h3 className="mb-2 font-heading text-[clamp(22px,2vw,30px)] font-bold leading-[1.2] text-kinome-black">
                  {f.name}
                </h3>
                <p className="mb-5 font-heading text-[0.95rem] font-light italic text-kinome-grey">
                  {f.role}
                </p>
                <p className="mb-6 font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.65] text-kinome-dark">
                  {f.bio}
                </p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-[0.95rem] font-bold underline-offset-4 hover:underline"
                >
                  LinkedIn profile →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-white px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Sectors served (with examples)
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sectors.map((s) => (
              <article
                key={s.name}
                className="rounded-[20px] border border-kinome-black/8 p-8"
              >
                <h3 className="mb-3 font-heading text-[1.2rem] font-semibold text-kinome-black">
                  {s.name}
                </h3>
                <p className="font-body text-[0.95rem] font-light leading-[1.6] text-kinome-grey">
                  {s.examples.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Downloadable logos
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[20px] bg-kinome-dark p-12 text-center">
              <img
                src="/assets/logo-kinome.svg"
                alt="Full Kinome logo (cream on dark background)"
                className="mx-auto mb-8 block h-auto w-full max-w-[280px] [filter:invert(0)] brightness-0 invert"
              />
              <a
                href="/assets/logo-kinome.svg"
                download
                className="inline-block rounded-full bg-white px-6 py-3 font-heading text-[0.95rem] font-semibold text-kinome-black transition-transform hover:scale-105"
              >
                Download SVG
              </a>
            </div>
            <div className="rounded-[20px] bg-kinome-dark p-12 text-center">
              <img
                src="/assets/logo-symbole.svg"
                alt="Kinome symbol only"
                className="mx-auto mb-8 block h-auto w-[140px] brightness-0 invert"
              />
              <a
                href="/assets/logo-symbole.svg"
                download
                className="inline-block rounded-full bg-white px-6 py-3 font-heading text-[0.95rem] font-semibold text-kinome-black transition-transform hover:scale-105"
              >
                Download SVG
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press contact */}
      <section className="bg-kinome-dark px-[5%] py-[clamp(50px,10vw,100px)] text-kinome-cream">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-kinome-accent">
            Press contact
          </p>
          <h2 className="mb-8 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
            A question, an interview,
            <ResponsiveBr />
            a visual request?
          </h2>
          <p className="mx-auto mb-10 max-w-[640px] font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.65] text-kinome-cream/80">
            Mathias Igonenc handles press and media enquiries. Reply within
            24 business hours.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
            <a
              href={`mailto:${BUSINESS.email}?subject=Press enquiry — Agence Kinome`}
              className="font-heading text-[clamp(16px,1.2vw,18px)] font-bold underline-offset-4 hover:underline"
            >
              {BUSINESS.email}
            </a>
            <span aria-hidden="true" className="text-kinome-cream/30">·</span>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="font-heading text-[clamp(16px,1.2vw,18px)] font-bold underline-offset-4 hover:underline"
            >
              {BUSINESS.phone}
            </a>
          </div>
          <div className="mt-12">
            <Link
              href="/en/about/"
              className="inline-block btn-fill-accent rounded-full bg-kinome-accent px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105"
            >
              <span className="relative z-10">Learn more about the team</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
