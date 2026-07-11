/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../../lib/contact";
import ServiceIcon, { type ServiceIconName } from "../../components/ServiceIcon";
import VisualDiary from "../../components/VisualDiary";
import Testimonials from "../../components/Testimonials";
import { buildMetadata, faqJsonLd, jsonLdScript, SITE } from "../../lib/seo";
import ResponsiveBr from "../../components/ResponsiveBr";

export const metadata = buildMetadata({
  title: "About the agency",
  description:
    "Independent communication agency in Geneva: meet the Kinome team, our principles — commitment, transparency, creativity — and our twelve areas of expertise.",
  path: "/en/about/",
  keywords: [
    "Kinome team",
    "independent agency Geneva",
    "Geneva creative studio",
    "human branding",
  ],
});

const personsLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/a-propos/#mathias`,
      name: "Mathias Igonenc",
      givenName: "Mathias",
      familyName: "Igonenc",
      jobTitle: "Co-founder & Marketing Director",
      description:
        "Co-founder and Marketing Director of Agence Kinome (Geneva). Founder of Codecircle (web development, SEO and digital automation agency). Five years supporting entrepreneurs in their digital transformation.",
      worksFor: { "@id": `${SITE.url}/#organization` },
      image: `${SITE.url}/assets/wp/apropos-team-mathias.png`,
      email: contact.emails.mathias,
      telephone: contact.phones.mathias.e164,
      url: `${SITE.url}/en/about/`,
      sameAs: [
        contact.social.linkedinMathias,
        "https://codecircle.fr/",
      ],
      knowsAbout: [
        "Digital marketing",
        "Online presence strategy",
        "SEO (search engine optimisation)",
        "Digital automation",
        "Web development",
        "AI applied to marketing",
        "Brand strategy",
      ],
      alumniOf: {
        "@type": "Organization",
        name: "Codecircle",
        url: "https://codecircle.fr/",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Geneva",
        addressCountry: "CH",
      },
      nationality: { "@type": "Country", name: "France" },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/a-propos/#tanguy`,
      name: "Tanguy Deniel",
      givenName: "Tanguy",
      familyName: "Deniel",
      jobTitle: "Co-founder & Creative Director",
      description:
        "Co-founder and Creative Director of Agence Kinome (Geneva). Over ten years of art direction experience in international agencies: TBWA Paris, Dix-Sept, Enderby, RTS Geneva, LMG Montreal.",
      worksFor: { "@id": `${SITE.url}/#organization` },
      image: `${SITE.url}/assets/wp/apropos-team-tanguy.png`,
      email: contact.emails.tanguy,
      telephone: contact.phones.tanguy.e164,
      url: `${SITE.url}/en/about/`,
      sameAs: [
        contact.social.linkedinTanguy,
        "https://tanguydeniel.com/",
      ],
      knowsAbout: [
        "Art direction",
        "Logo design",
        "Visual identity",
        "Branding",
        "Graphic design",
        "Illustration",
        "Visual communication",
        "Brand guidelines",
      ],
      alumniOf: [
        { "@type": "Organization", name: "TBWA", url: "https://www.tbwa.com/" },
        { "@type": "Organization", name: "Dix-Sept" },
        { "@type": "Organization", name: "Enderby" },
        { "@type": "Organization", name: "RTS — Radio Télévision Suisse", url: "https://www.rts.ch/" },
        { "@type": "Organization", name: "LMG", address: { "@type": "PostalAddress", addressLocality: "Montreal", addressCountry: "CA" } },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Geneva",
        addressCountry: "CH",
      },
      nationality: { "@type": "Country", name: "France" },
    },
  ],
};

const principes = [
  {
    type: "text" as const,
    title: "Commitment",
    body: "We fully commit to every project. Your success is ours: we treat your brand with the same care as if it were our own.",
  },
  {
    type: "text" as const,
    title: "Intelligence",
    body: "Every recommendation is grounded in analysis, listening and experience. We choose relevance over trends.",
  },
  {
    type: "photo" as const,
    src: "/assets/wp/apropos-principe-photo1.jpg",
  },
  {
    type: "photo" as const,
    src: "/assets/wp/apropos-principe-photo2.jpg",
  },
  {
    type: "text" as const,
    title: "Empathy",
    body: "Understand your business, your team, your constraints. The right idea always emerges from attentive listening.",
  },
  {
    type: "text" as const,
    title: "Straight talk",
    body: "We say what we think, even when it isn't expected. Honesty is the foundation of a lasting collaboration.",
  },
];

const specs = [
  {
    img: "/assets/wp/apropos-preparons-photo1-scaled.jpg",
    title: "Shall we start?",
    lead: "Every project begins with a conversation.",
    body: "We take time to understand your context, ambitions and constraints. Only then do we propose. No template, no off-the-shelf recipe — a tailored answer designed for you.",
    cta: { label: "Book a call", href: "/en/contact/" },
    reverse: false,
  },
  {
    img: "/assets/wp/apropos-preparons-photo2-scaled.jpg",
    title: "Want to know more?",
    lead: "Discover our client process.",
    body: "From the first meeting to delivery, every step is designed to give you visibility and involve you in key decisions. Transparency, cadence, deliverables — everything is clear from the start.",
    cta: { label: "Our process", href: "/en/process/" },
    reverse: true,
  },
];

const services: { title: string; icon: ServiceIconName; desc: string }[] = [
  { title: "Print", icon: "impression", desc: "Flyers, business cards, brochures… All your printed materials designed with care." },
  { title: "Illustration", icon: "illustration", desc: "Custom illustrations to bring your ideas to life and enrich your content." },
  { title: "Chatbot", icon: "chatbot", desc: "Automate customer relationships with intelligent, personalised chatbots." },
  { title: "Video", icon: "video", desc: "Motion design, footage, editing — tell your brand story in moving images." },
  { title: "Pictograms", icon: "pictogramme", desc: "Icons and pictograms crafted to strengthen your visual identity." },
  { title: "Website", icon: "site-interactif", desc: "Modern, fast, performant websites adapted to every screen." },
  { title: "Poster", icon: "affiche", desc: "Bold posters and prints for your events and campaigns." },
  { title: "Interactive PDF", icon: "pdf-interactif", desc: "Interactive documents with smooth navigation and clickable elements." },
  { title: "One pager", icon: "one-pager", desc: "A single web page to present your project elegantly." },
  { title: "Social media", icon: "reseaux-sociaux", desc: "Strategy, visuals, editorial calendar — we boost your online presence." },
  { title: "Photography", icon: "photographie", desc: "Product, corporate, event shoots — images that elevate your brand." },
  { title: "Campaign", icon: "campagne", desc: "Creative concepts and multi-channel deployment for your communication campaigns." },
];

export default function AboutPageEN() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personsLd) }}
      />

      <section className="bg-kinome-cream px-[5%] pt-[clamp(120px,18vw,180px)] pb-[clamp(50px,10vw,100px)]">
        <div className="mx-auto grid max-w-[1588px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <h1 className="max-w-[900px] font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.12] text-kinome-black">
            Kinome, the communication agency that walks with you with sincerity.
          </h1>
          <div className="flex justify-center text-kinome-dark lg:justify-end">
            <VisualDiary className="block w-full max-w-[500px]" />
          </div>
        </div>
      </section>

      <section className="bg-white px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Our team
          </h2>
          <p className="mt-6 max-w-[1100px] font-body text-[clamp(20px,1.75vw,28px)] font-light leading-[1.5]">
            A human-sized team, driven by the desire to do things well, by
            listening and by curiosity.
            <ResponsiveBr />
            We believe an agency isn't defined by its work alone, but above all
            by the people behind it.
          </p>

          <div className="mx-auto mt-[clamp(50px,6vw,90px)] grid max-w-[1200px] grid-cols-1 gap-[clamp(30px,3vw,50px)] md:grid-cols-2">
            <article>
              <div className="mb-8 aspect-[3/4] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                <picture>
                  <source type="image/webp" srcSet="/assets/wp/apropos-team-mathias.webp" />
                  <img
                    src="/assets/wp/apropos-team-mathias.png"
                    alt="Mathias Igonenc — co-founder of Kinome"
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>
              <h3 className="mb-3 font-heading text-[clamp(22px,1.9vw,30px)] font-bold leading-[1.3]">
                Mathias Igonenc{" "}
                <span className="font-light">— co-founder &amp; marketing director</span>
              </h3>
              <p className="mb-4 font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                Co-founder and Marketing Director of Kinome, Mathias started as a freelancer by building Codecircle, an agency specialised in web development, SEO and digital automation. With 5 years of experience supporting entrepreneurs in their digital transformation, he has developed concrete expertise in online presence strategy.
              </p>
              <p className="mb-4 font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                Meeting Tanguy led to the creation of Kinome, a 360° communication agency based in Geneva. Convinced that every project deserves personalised attention, Mathias works with SMEs, small businesses and entrepreneurs to build communication strategies that deliver measurable results — from branding to social media.
              </p>
              <a
                href={contact.social.linkedinMathias}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[clamp(16px,1.2vw,18px)] font-bold underline hover:opacity-70"
              >
                LinkedIn
              </a>
            </article>

            <article>
              <div className="mb-8 aspect-[3/4] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                <picture>
                  <source type="image/webp" srcSet="/assets/wp/apropos-team-tanguy.webp" />
                  <img
                    src="/assets/wp/apropos-team-tanguy.png"
                    alt="Tanguy Deniel — Kinome"
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>
              <h3 className="mb-3 font-heading text-[clamp(22px,1.9vw,30px)] font-bold leading-[1.3]">
                Tanguy Deniel{" "}
                <span className="font-light">— co-founder &amp; creative director</span>
              </h3>
              <p className="mb-4 font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                Co-founder and Creative Director of Kinome, Tanguy worked in several communication agencies around the world (TBWA, Dix-Sept and Enderby in Paris, RTS in Geneva, LMG in Montreal) to build a rich and complete experience in creative work and art direction.
              </p>
              <p className="mb-4 font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                After ten years in agencies and a journey across three countries (on two continents), he decided to set up his own communication studio in Geneva, to preserve that direct, emotional and personal connection with clients.
              </p>
              <a
                href={contact.social.linkedinTanguy}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[clamp(16px,1.2vw,18px)] font-bold underline hover:opacity-70"
              >
                LinkedIn
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-kinome-cream px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Our principles
          </h2>
          <p className="mt-6 line-clamp-3 max-w-[1000px] font-body text-[clamp(18px,1.5vw,24px)] font-light leading-[1.45]">
            Four values guide every decision, from the first meeting to the final delivery.
          </p>

          <div className="mt-[clamp(50px,6vw,90px)] grid grid-cols-1 gap-[clamp(20px,1.8vw,30px)] sm:grid-cols-2 lg:grid-cols-3">
            {principes.map((p, i) =>
              p.type === "text" ? (
                <article
                  key={i}
                  className="flex min-h-[clamp(260px,28vw,400px)] flex-col rounded-[20px] bg-white p-[clamp(30px,3vw,60px)]"
                >
                  <h3 className="mb-5 font-heading text-[clamp(22px,1.9vw,30px)] font-semibold leading-[1.3] text-kinome-black">
                    {p.title}
                  </h3>
                  <p className="font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.55] text-kinome-dark">
                    {p.body}
                  </p>
                </article>
              ) : (
                <div key={i} className="min-h-[clamp(260px,28vw,400px)] overflow-hidden rounded-[20px] bg-[#e9e4d8]">
                  <img
                    src={p.src}
                    alt=""
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="mx-auto max-w-[1200px] text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Let's prepare
            <ResponsiveBr />
            your next project together!
          </h2>

          <div className="mt-[clamp(40px,5vw,80px)] flex flex-col gap-[clamp(30px,3vw,50px)]">
            {specs.map((s) => (
              <div
                key={s.title}
                className={`grid grid-cols-1 items-center gap-[clamp(40px,5vw,100px)] rounded-[20px] bg-kinome-cream p-[clamp(40px,5vw,90px)] lg:grid-cols-2`}
              >
                <div
                  className={`aspect-[657/536] overflow-hidden rounded-[20px] bg-[#e9e4d8] ${s.reverse ? "lg:order-2" : ""}`}
                >
                  <img
                    src={s.img}
                    alt=""
                    className="block h-full w-full object-cover object-[center_top]"
                    loading="lazy"
                  />
                </div>
                <div className={`max-w-[547px] ${s.reverse ? "lg:order-1" : ""}`}>
                  <h3 className="mb-5 font-heading text-[clamp(24px,2.1vw,30px)] font-semibold leading-[1.3]">
                    {s.title}
                  </h3>
                  <p className="mb-5 font-body text-[clamp(16px,1.35vw,22px)] font-bold leading-[1.55]">
                    {s.lead}
                  </p>
                  <p className="mb-6 font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
                    {s.body}
                  </p>
                  <Link
                    href={s.cta.href}
                    className="inline-flex items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(16px,1.3vw,20px)] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
                  >
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-kinome-cream px-[5%] py-[clamp(70px,10vw,170px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Our services
          </h2>
          <p className="mx-auto mt-6 max-w-[900px] text-center font-body text-[clamp(20px,1.75vw,28px)] font-light leading-[1.5]">
            A complete range to support you from A to Z.
          </p>

          <div className="mt-[clamp(50px,6vw,90px)] grid grid-cols-1 gap-[clamp(12px,1vw,18px)] md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article
                key={s.title}
                className="group flex min-h-[clamp(220px,20vw,320px)] cursor-pointer flex-col items-center gap-[clamp(14px,1.2vw,20px)] rounded-[20px] bg-white p-[clamp(24px,2vw,36px)] text-center text-kinome-black transition-all duration-[350ms] hover:-translate-y-1 hover:bg-kinome-dark hover:text-kinome-cream hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)]"
              >
                <div className="flex aspect-square w-full max-w-[clamp(126px,12vw,212px)] flex-shrink-0 items-center justify-center">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3 className="font-heading text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.3]">
                  {s.title}
                </h3>
                <p className="line-clamp-3 font-body text-[clamp(14px,1.1vw,17px)] font-light leading-[1.5] opacity-90">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-[clamp(40px,4vw,60px)] text-center">
            <Link
              href="/en/services/"
              className="inline-flex items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(16px,1.3vw,20px)] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <Testimonials locale="en" />

      {/* FAQ (AEO) */}
      <section className="mx-auto max-w-[1100px] px-[5%] py-[clamp(50px,10vw,100px)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd([
          {
            question: "Who is behind Kinome?",
            answer:
              "Kinome is an independent agency founded by two French creatives based in Geneva: Tanguy, art director with ten years of agency experience, and Mathias, in charge of strategy and digital. You always work directly with the founders.",
          },
          {
            question: "Where is Kinome located?",
            answer:
              "Our studio is in Thônex, in the canton of Geneva (Route de Jussy 35). We work with clients across Geneva, French-speaking Switzerland, France and internationally.",
          },
          {
            question: "Can we work together in English?",
            answer:
              "Yes. We work in French and in English, with remote-friendly processes: video calls, shared documents and asynchronous reviews. Some of our branding projects are delivered fully remotely.",
          },
          {
            question: "How do we start a project with Kinome?",
            answer:
              "It starts with a free 30-minute call to understand your goals, constraints and timeline. You then receive a clear, structured proposal, with no obligation.",
          },
        ])) }}
        />
        <h2 className="mb-12 text-center font-heading text-[clamp(24px,4.5vw,48px)] font-normal leading-[1.1]">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4">
            <details
              key="Who is behind Kinome?"
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black list-none">
                <span>Who is behind Kinome?</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                Kinome is an independent agency founded by two French creatives based in Geneva: Tanguy, art director with ten years of agency experience, and Mathias, in charge of strategy and digital. You always work directly with the founders.
              </p>
            </details>
            <details
              key="Where is Kinome located?"
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black list-none">
                <span>Where is Kinome located?</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                Our studio is in Thônex, in the canton of Geneva (Route de Jussy 35). We work with clients across Geneva, French-speaking Switzerland, France and internationally.
              </p>
            </details>
            <details
              key="Can we work together in "
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black list-none">
                <span>Can we work together in English?</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                Yes. We work in French and in English, with remote-friendly processes: video calls, shared documents and asynchronous reviews. Some of our branding projects are delivered fully remotely.
              </p>
            </details>
            <details
              key="How do we start a projec"
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black list-none">
                <span>How do we start a project with Kinome?</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kinome-cream text-[1.4rem] font-light leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-grey">
                It starts with a free 30-minute call to understand your goals, constraints and timeline. You then receive a clear, structured proposal, with no obligation.
              </p>
            </details>
        </div>
      </section>

      <section id="cta-form" className="bg-kinome-cream px-[5%] py-[clamp(80px,10vw,180px)]">
        <div className="mx-auto max-w-[1588px]">
          <h2 className="mx-auto mb-[clamp(50px,6vw,90px)] max-w-[1100px] text-center font-heading text-[clamp(34px,4.4vw,70px)] font-normal leading-[1.14] text-kinome-black">
            Have a project you'd like
            <ResponsiveBr />
            to discuss with us?
          </h2>

          <div className="mx-auto mb-[clamp(40px,6vw,80px)] grid max-w-[1588px] grid-cols-1 gap-[clamp(40px,5vw,90px)] lg:grid-cols-2">
            <p className="font-body text-[clamp(20px,1.75vw,28px)] font-light leading-[1.5] text-kinome-dark">
              Every exchange is designed as the starting point of a genuine collaboration, where trust and shared commitment shape results that match your ambitions.
            </p>
            <p className="font-body text-[clamp(16px,1.35vw,22px)] font-light leading-[1.55] text-kinome-dark">
              We'd be glad to support you and explore the best ways to grow your project together. Whether you have a precise idea or you're looking for inspiration, our team is here to listen, share ideas and co-create creative, strategic answers with you. Don't hesitate to reach out to discuss your ambitions, your challenges and the goals you want to reach. Together, let's bring your projects to life and turn them into successes!
            </p>
          </div>

          <div className="mx-auto flex justify-center">
            <Link
              href="/en/contact/"
              className="mx-auto flex w-fit min-w-[300px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-10 py-4 font-heading text-[clamp(16px,1.3vw,20px)] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
            >
              Let's discuss your project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
