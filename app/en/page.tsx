/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import LogosMarquee from "../components/LogosMarquee";
import ContactForm from "../contact/ContactForm";
import Testimonials from "../components/Testimonials";
import { buildMetadata, faqJsonLd, serviceJsonLd, jsonLdScript, SITE } from "../lib/seo";
import ResponsiveBr from "../components/ResponsiveBr";

export const metadata = buildMetadata({
  title: "Independent communication agency in Geneva",
  bareTitle: true,
  description:
    "Kinome is an independent communication agency based in Geneva. Branding, visual identity, logo design, websites and brand strategy for businesses and freelancers across French-speaking Switzerland.",
  path: "/en/",
  keywords: [
    "communication agency Geneva",
    "branding Switzerland",
    "logo design Geneva",
    "creative agency",
    "Swiss design studio",
  ],
});

// AEO FAQ for English audience
const faqHome = [
  {
    question: "What services does Kinome offer in Geneva?",
    answer:
      "Kinome is a communication agency based in Geneva covering the full brand identity chain: logo design, complete visual identity, brand guidelines, art direction, website design and digital communication. We work with freelancers, SMEs and established organisations, in Switzerland and internationally.",
  },
  {
    question: "Who does Kinome work with?",
    answer:
      "We mainly work with companies and brands based in Geneva, Lausanne and French-speaking Switzerland, but also with clients in France and internationally. Our clients include consulting firms, restaurants, artisans, premium travel agencies, software publishers and independent entrepreneurs.",
  },
  {
    question: "How does a project with Kinome unfold?",
    answer:
      "Each project starts with a free discovery call. We then run a precise framing phase (goals, audience, constraints), before moving into creative work with regular check-ins. Transparency is central: you're kept up to date in real time. See our 'Process' page for full details.",
  },
  {
    question: "Why choose an independent agency in Geneva?",
    answer:
      "An independent agency like Kinome offers direct contact with the creatives, with no intermediaries. You benefit from faster response times, real listening and a personalised process. In Geneva, where brand image quality matters, this collaboration mode delivers a result truly aligned with your identity rather than a templated output.",
  },
];

const enjeuxBlocs = [
  {
    img: "/assets/wp/working-space-close-up-office-table-with-different-documents-lying-it-1.png",
    alt: "Facing AI",
    title: "Adapt your communication to today's challenges",
    subtitle:
      "Anticipate transformations, stay relevant, keep a step ahead.",
    body: "Artificial intelligence is redefining codes, expectations and uses. We help your company understand these shifts, adjust your messages and integrate the right tools coherently.",
    objectif: "help you leverage AI without losing what makes you unique.",
    cta: { label: "Our solutions", href: "/en/services/" },
    reverse: false,
  },
  {
    img: "/assets/wp/business-people-meeting-1.png",
    alt: "Professional training",
    title: "Give new strength to your professional training",
    subtitle: "Make it clearer, more visible and truly attractive.",
    body: "Too often, training programmes struggle to grab attention or express their real value. We help reposition them, clarify your messages and structure communication that truly speaks to your audiences.",
    objectif:
      "turn your training into clear, engaging and distinctive offers.",
    cta: { label: "Discover our work", href: "/en/portfolio/" },
    reverse: true,
  },
];

const expertises = [
  {
    title: "Our mission",
    text: "Support businesses and brands in their quest for visibility, with people at the centre.",
  },
  {
    title: "Creative side",
    text: "We believe every project deserves originality and sensitivity.",
  },
  {
    title: "Design",
    text: "We take time to listen and craft strong, aligned concepts.",
  },
  {
    title: "Our vision",
    text: "The human vision is at the heart of every project for a lasting relationship of trust.",
  },
];

const portfolio = [
  { src: "/assets/wp/Adapt-Project-780x390px-1.png", alt: "Adapt Project" },
  { src: "/assets/wp/Cabinet-Faraday-780x390px-1.png", alt: "Cabinet Faraday" },
  { src: "/assets/wp/Alministratif-780x390px-1.png", alt: "Alministratif" },
  { src: "/assets/wp/Authentik-Peak-780x390px-1.png", alt: "Authentik Peak" },
];

export default function HomeEN() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(faqHome)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceJsonLd(
              "Communication agency in Geneva",
              "Branding, visual identity, logo design, brand guidelines and website design for businesses and brands in French-speaking Switzerland."
            )
          ),
        }}
      />

      {/* HERO video */}
      <section className="relative flex h-screen w-full items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        >
          <source
            src="/assets/wp/Header-Menu_Nouvelles-versions.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 z-[2] bg-black/40" />
        <div className="relative z-[3] mx-auto flex w-full max-w-[1400px] flex-col items-start px-[5%]">
          <div className="max-w-[800px] text-left text-white">
            <h1 className="mb-[30px] font-heading text-[clamp(38px,8vw,76px)] font-semibold leading-[1.05]">
              Communication agency
              <ResponsiveBr />
              in Geneva
            </h1>
            <p className="mb-[35px] max-w-[520px] text-[clamp(16px,1.3vw,19px)] leading-[1.7]">
              Branding, visual identity and websites
              <ResponsiveBr />
              blending strategy and emotion, from French-speaking Switzerland.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                href="#contact"
                className="btn-fill-accent group mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center whitespace-nowrap rounded-full bg-white px-8 py-4 text-center font-heading text-[1rem] font-bold text-black transition-transform hover:scale-105"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Have a project?
                </span>
              </Link>
              <Link
                href="/en/portfolio/"
                className="btn-fill-white group mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-bold text-white transition-transform hover:scale-105"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Discover our projects
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who are we */}
      <section className="mx-auto my-[60px] max-w-[1300px] rounded-[20px] px-[clamp(20px,5vw,60px)] py-[clamp(50px,8vw,80px)]">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div>
            <h2 className="mb-10 font-heading text-[clamp(28px,5.2vw,64px)] font-normal leading-[1.1]">
              &ldquo;Ki&rdquo; are we?
            </h2>
            <p className="my-10 font-body text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-kinome-black">
              Our human and exacting approach creates{" "}
              <strong className="font-semibold">coherent</strong> projects,
              meaningful and built to last.
            </p>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem] font-medium text-kinome-grey">
              <span>1 local studio</span>
              <span aria-hidden="true">·</span>
              <span>12 expertises</span>
              <span aria-hidden="true">·</span>
              <span>6 partners</span>
            </div>
          </div>
          <div>
            <p className="mb-5 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              Kinome is a young, versatile creative agency specialising in
              identity, campaigns and websites.
            </p>
            <p className="mb-5 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              Our ambition: do beautiful, modern, original work. Keep, nurture
              and maintain direct contact with our clients, without
              intermediaries. Collaborate with other talents whose
              specialities ensure your projects succeed.
            </p>
            <p className="mb-8 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              Transparency and honesty are at the heart of our philosophy.
              Clear communication is maintained, realistic expectations are
              set. You're kept informed in real time, with professional
              recommendations.
            </p>
            <Link
              href="/en/about/"
              className="btn-fill-accent inline-block rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              <span className="relative z-10">Our agency</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tomorrow's challenges */}
      <section className="mx-auto max-w-[1400px] bg-kinome-cream px-[5%] py-[clamp(50px,10vw,100px)]">
        <h2 className="mb-20 max-w-[600px] font-heading text-[clamp(28px,5vw,60px)] font-normal leading-[1.1]">
          Let's prepare
          <ResponsiveBr />
          tomorrow's challenges
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
              <h3 className="mb-4 font-heading text-[1.6rem] font-bold leading-[1.2]">
                {bloc.title}
              </h3>
              <p className="mb-5 font-body text-[1rem] font-bold text-kinome-black">
                {bloc.subtitle}
              </p>
              <p className="mb-5 font-body text-[1rem] leading-[1.75] text-kinome-grey">
                {bloc.body}
              </p>
              <p className="mb-8 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.5] text-kinome-black">
                <strong className="font-bold">Our goal:</strong> {bloc.objectif}
              </p>
              <Link
                href={bloc.cta.href}
                className="btn-fill-accent inline-block rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
              >
                <span className="relative z-10">{bloc.cta.label}</span>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <h2 className="mb-20 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
          Our expertise
          <ResponsiveBr />
          &amp; our support
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
            href="/en/services/"
            className="btn-fill-accent mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105"
          >
            <span className="relative z-10">Our services</span>
          </Link>
          <Link
            href="/en/portfolio/"
            className="btn-fill-dark mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full border-2 border-kinome-black bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105 hover:text-white"
          >
            <span className="relative z-10">Discover our projects</span>
          </Link>
        </div>
      </section>

      {/* Portfolio dark */}
      <section className="bg-kinome-dark px-[5%] pt-20 pb-[60px]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2">
          {portfolio.map((p) => (
            <Link
              key={p.alt}
              href="/en/portfolio/"
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
            href="/en/portfolio/"
            className="btn-fill-white mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:text-kinome-black"
          >
            <span className="relative z-10">Discover our projects</span>
          </Link>
        </div>
      </section>

      {/* Logos marquee */}
      <LogosMarquee />

      {/* CTA process */}
      <section className="px-[5%] py-[clamp(70px,14vw,140px)] text-center">
        <h2 className="mx-auto mb-16 max-w-[1000px] font-heading text-[clamp(28px,5vw,60px)] font-normal leading-[1.1]">
          Let's talk about what you need, before what we offer!
        </h2>
        <Link
          href="/en/process/"
          className="btn-fill-accent inline-block rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105"
        >
          <span className="relative z-10">Discover our process</span>
        </Link>
      </section>

      {/* Testimonials */}
      <Testimonials locale="en" />

      {/* FAQ */}
      <section className="mx-auto max-w-[1100px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <h2 className="mb-12 text-center font-heading text-[clamp(24px,4.5vw,48px)] font-normal leading-[1.1]">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqHome.map((item) => (
            <details
              key={item.question}
              className="group rounded-[16px] border border-[#e0ddd6] bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-[clamp(16px,1.3vw,19px)] font-semibold text-kinome-black">
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

      {/* Contact form */}
      <div id="contact">
        <section className="px-[5%] pt-[clamp(90px,12vw,120px)] pb-10 text-center">
          <h2 className="mx-auto max-w-[900px] font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
            Have a project you'd like to discuss?
          </h2>
        </section>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-20 px-[5%] pb-[clamp(60px,12vw,120px)] lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="mb-12 font-heading text-[2.8rem] font-bold">Kinome</h3>
            <div className="mb-9">
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#888]">
                Mathias
              </strong>
              <p className="m-0 font-body text-[clamp(16px,1.2vw,18px)] text-kinome-grey">
                <a href="mailto:mathias@agence-kinome.ch" className="hover:underline">
                  mathias@agence-kinome.ch
                </a>
                <ResponsiveBr />
                <a href="tel:+41782652014" className="hover:underline">
                  +41 78 265 20 14
                </a>
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
