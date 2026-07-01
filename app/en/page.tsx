/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SplashScreen from "../components/SplashScreen";
import HeroVideo from "../components/HeroVideo";
import HeroAnimatedWord from "../components/HeroAnimatedWord";
import LogosMarquee from "../components/LogosMarquee";
import ContactForm from "../contact/ContactForm";
import Testimonials from "../components/Testimonials";
import { contact } from "../lib/contact";
import {
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
  jsonLdScript,
} from "../lib/seo";

export const metadata = buildMetadata({
  title: "Independent communication agency in Geneva",
  bareTitle: true,
  description:
    "Kinome is an independent communication agency based in Geneva. Branding, visual identity, logo design, websites and brand strategy for businesses and freelancers across French-speaking Switzerland.",
  path: "/en/",
  keywords: [
    "Kinome agency",
    "independent communication agency",
    "Geneva communication",
    "Geneva creative agency",
    "French-speaking Switzerland",
  ],
});

// AEO FAQ for English audience (mirrors French version).
const faqHome = [
  {
    question: "What services does Kinome offer in Geneva?",
    answer:
      "Kinome is a communication agency based in Geneva covering the full brand identity chain: logo design, complete visual identity, brand guidelines, art direction, website design, digital communication and print campaigns. We work with freelancers, SMEs and established organisations, in Switzerland and internationally.",
  },
  {
    question: "Who does Kinome work with?",
    answer:
      "We mainly work with companies and brands based in Geneva, Lausanne and French-speaking Switzerland, but also with clients in France and internationally. Our clients include consulting firms, restaurants, artisans, premium travel agencies, software publishers and independent entrepreneurs.",
  },
  {
    question: "How does a project with Kinome unfold?",
    answer:
      "Each project starts with a free discovery call. We then run a precise framing phase (goals, audience, constraints), before moving into creative work with regular check-ins. Transparency is central: you're kept up to date in real time, with a milestone review before each major delivery. See our \"Process\" page for full details.",
  },
  {
    question: "How much does a logo cost with Kinome in Geneva?",
    answer:
      "The price of a logo design depends on the scope: logo only, complete visual identity, or full brand system including guidelines and applications. We provide a tailored quote after the discovery call, taking into account your constraints, expected variants and timeline. A professional logo project in Geneva typically starts from a few thousand Swiss francs.",
  },
  {
    question: "Why choose an independent agency in Geneva?",
    answer:
      "An independent agency like Kinome offers direct contact with the creatives, with no intermediaries. You benefit from faster response times, real listening and a personalised process from start to finish. In Geneva, where brand image quality is essential to stand out, this collaboration mode delivers a result truly aligned with your identity rather than a templated output.",
  },
];

const HERO_VIDEO = "/assets/wp/Header-Menu_Nouvelles-versions.mp4";

const enjeuxBlocs = [
  {
    img: "/assets/wp/working-space-close-up-office-table-with-different-documents-lying-it-1.png",
    alt: "Facing AI",
    title: "Facing AI, adapt your communication to today's challenges",
    subtitle:
      "Anticipate transformations, stay relevant and keep one step ahead.",
    body: "Artificial intelligence is redefining codes, expectations and uses. We help your company understand these shifts, adjust your messages and integrate the right tools coherently.",
    objectif:
      "help you leverage AI without losing what makes you unique.",
    cta: { label: "Our solutions", href: "/en/services/" },
    reverse: false,
  },
  {
    img: "/assets/wp/business-people-meeting-1.png",
    alt: "Professional training",
    title: "Give new strength to your professional training",
    subtitle: "Make it clearer, more visible and genuinely attractive.",
    body: "Too often, training programmes struggle to capture attention or express their real value. We help you reposition them, clarify your messages and structure communication that truly speaks to your audiences.",
    objectif:
      "turn your training programmes into clear, engaging and distinctive offers.",
    cta: { label: "Discover our work", href: "/en/portfolio/" },
    reverse: true,
  },
];

const expertises = [
  {
    title: "Our mission",
    text: "Support businesses and brands on their quest for visibility, with people at the centre.",
  },
  {
    title: "Creative side",
    text: "We believe every project deserves originality and sensitivity.",
  },
  {
    title: "Design",
    text: "We take the time to listen and craft strong, aligned concepts.",
  },
  {
    title: "Our vision",
    text: "A human-centred vision drives every project for a lasting relationship of trust.",
  },
];

// "The latest" — dynamically picks the 3 most recent blog articles (in FR
// for now, but the index has a short English summary linking through).
import { blogPosts as _blogPosts } from "../lib/blog";
import ResponsiveBr from "../components/ResponsiveBr";
const nouvelles = _blogPosts.slice(0, 3).map((p) => ({
  title: p.title,
  excerpt: p.excerpt,
  href: `/blog/${p.slug}/`,
}));

const portfolio = [
  { src: "/assets/projets/tampon-audition/thumb.jpg", alt: "Tampon Audition", href: "/en/projets/tampon-audition/" },
  { src: "/assets/wp/Adapt-Project-780x390px-1.png", alt: "Adapt Project", href: "/en/projets/adapt-project/" },
  { src: "/assets/wp/Cabinet-Faraday-780x390px-1.png", alt: "Cabinet Faraday", href: "/en/projets/cabinet-faraday/" },
  { src: "/assets/wp/Alministratif-780x390px-1.png", alt: "Alministratif", href: "/en/projets/alministratif/" },
];

export default function HomeEN() {
  return (
    <>
      {/* JSON-LD : FAQPage (AEO) + Service (Geneva specialisation) */}
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
              "Communication agency in Geneva",
              "Branding, visual identity, logo design, brand guidelines and website design for businesses and brands in French-speaking Switzerland."
            )
          ),
        }}
      />

      <SplashScreen />

      {/* HERO — background video. `bg-kinome-dark` : fond sombre dès le 1er
          paint CSS pour que le H1 blanc ait son contraste immédiatement
          (sinon LCP bloqué jusqu'au chargement du poster). Voir page.tsx FR. */}
      <section className="relative flex h-screen w-full items-center overflow-hidden bg-kinome-dark">
        <HeroVideo
          videoSrc={HERO_VIDEO}
          poster="/assets/hero-poster.jpg"
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-black/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[55%] bg-gradient-to-t from-black/70 via-black/45 to-transparent" />
        <div className="relative z-[3] mx-auto flex w-full max-w-[1400px] flex-col items-start px-[5%]">
          <div className="max-w-[800px] text-left text-white">
            <h1 className="mb-[30px] text-center font-heading text-[clamp(38px,8vw,76px)] font-semibold leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] md:text-left">
              Communication agency{" "}
              <ResponsiveBr />in Geneva — <HeroAnimatedWord />
            </h1>
            <p className="mb-[35px] max-w-[520px] text-center text-[clamp(16px,1.3vw,19px)] leading-[1.7] [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] md:text-left">
              Branding, visual identity and websites{" "}
              <ResponsiveBr />
              blending strategy and emotion, from French-speaking Switzerland.
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
              <Link
                href="#contact"
                className="btn-fill-dark group inline-flex min-w-[280px] items-center justify-center whitespace-nowrap rounded-full bg-white px-8 py-4 text-center font-heading text-[1rem] font-bold text-black shadow-[0_6px_24px_rgba(0,0,0,0.25)] transition-[transform,color] duration-300 hover:scale-105 hover:text-white"
              >
                <span className="relative z-10">Have a project?</span>
              </Link>
              <Link
                href="/en/portfolio/"
                className="btn-fill-white group inline-flex min-w-[280px] items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] transition-[transform,color,text-shadow] duration-300 hover:scale-105 hover:text-black hover:[text-shadow:none]"
              >
                <span className="relative z-10">Discover our projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* "Ki" are we? */}
      <section className="mx-auto my-[60px] max-w-[1300px] rounded-[20px] px-[clamp(20px,5vw,60px)] py-[clamp(50px,8vw,80px)]">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div>
            <h2 className="mb-10 text-center font-heading text-[clamp(28px,5.2vw,64px)] font-normal leading-[1.1] md:text-left">
              &ldquo;Ki&rdquo; are we?
            </h2>
            <p className="my-10 font-body text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-kinome-black">
              This human and exacting approach allows us to create{" "}
              <strong className="font-semibold">coherent</strong> projects,
              meaningful and built to last.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
              <div className="text-center md:text-left">
                <p className="font-heading text-[clamp(32px,5vw,48px)] font-normal leading-none text-kinome-black">
                  1
                </p>
                <p className="mt-2 font-body text-[clamp(11px,1vw,14px)] font-medium uppercase tracking-[0.05em] text-kinome-grey">
                  Local studio
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
                  Partners
                </p>
              </div>
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
              intermediaries. Collaborate with other talents whose specialities
              ensure your projects succeed.
            </p>
            <p className="mb-8 font-body text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-kinome-grey">
              Transparency and honesty sit at the heart of our philosophy.
              Clear communication is maintained, realistic expectations are
              set. You're kept informed in real time of your project's
              progress, with professional recommendations.
            </p>
            <Link
              href="/en/about/"
              className="mx-auto block w-fit btn-fill-accent rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
            >
              Our agency
            </Link>
          </div>
        </div>
      </section>

      {/* Let's prepare tomorrow's challenges */}
      <section className="mx-auto max-w-[1400px] bg-kinome-cream px-[5%] py-[clamp(50px,10vw,100px)]">
        <h2 className="mx-auto mb-20 max-w-[600px] text-center font-heading text-[clamp(28px,5vw,60px)] font-normal leading-[1.1] md:mx-0 md:text-left">
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
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>
            <div className={bloc.reverse ? "lg:order-1" : ""}>
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
                <strong className="font-bold">Our goal:</strong>{" "}
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

      {/* Our expertise & our support */}
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
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Discover our services
          </Link>
          <Link
            href="/en/portfolio/"
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-dark rounded-full border-2 border-kinome-black bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105"
          >
            Discover our projects
          </Link>
        </div>
      </section>

      {/* Portfolio (dark background) */}
      <section className="bg-kinome-dark px-[5%] pt-20 pb-[60px]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2">
          {portfolio.map((p) => (
            <Link
              key={p.alt}
              href={p.href}
              className="group relative block aspect-[16/9] overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="mt-16 flex justify-center pb-5">
          <Link
            href="/en/portfolio/"
            className="inline-flex min-w-[280px] items-center justify-center btn-fill-white rounded-full border-2 border-white bg-transparent px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-white/10"
          >
            Discover our projects
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
          className="mx-auto block w-fit btn-fill-accent rounded-full bg-kinome-black px-[45px] py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
        >
          Discover our process
        </Link>
      </section>

      {/* Emotion */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[60px]">
        <div className="grid grid-cols-1 items-center gap-[100px] py-[60px] lg:grid-cols-2">
          <div>
            <h2 className="mb-2 text-center font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1] md:text-left">
              Kinome is, above
              <ResponsiveBr />
              all, about emotion!
            </h2>
            <div className="relative mt-20 w-full max-w-[420px]">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/assets/home-illustration.webp"
                />
                <img
                  src="/assets/home-illustration.png"
                  alt="Kinome illustration — creative studio"
                  width={840}
                  height={840}
                  loading="lazy"
                  decoding="async"
                  className="relative z-[1] block w-full object-contain"
                />
              </picture>
            </div>
          </div>
          <div>
            <p className="mb-6 font-body text-[clamp(15px,1.1vw,17px)] leading-[1.8] text-kinome-grey">
              By choosing our services, you're guaranteed a strong, accomplished
              communication project, both in print and digital. You ensure
              impact on your target audience, and you meet your communication
              goals.
            </p>
            <p className="font-body text-[clamp(15px,1.1vw,17px)] leading-[1.8] text-kinome-grey">
              Choosing us means getting the quality of a full agency, but on a
              human scale. Through our direct contact with clients, we can
              better understand needs and concerns. Our goal is to become a
              trusted partner across the board — offering strategic, digital
              marketing and communication advice.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials (shared component) */}
      <Testimonials locale="en" />

      {/* The latest (blog).
          Note: articles are currently in French — the EN index reflects this
          with the same titles + excerpts pointing through. */}
      <section className="mx-auto my-[60px] max-w-[1300px] rounded-[20px] bg-kinome-cream px-[clamp(20px,5vw,60px)] py-[clamp(50px,8vw,80px)]">
        <h2 className="mb-10 text-center font-heading text-[clamp(28px,4.5vw,48px)] font-normal md:mb-12 md:text-left">
          The latest
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
              <span className="hidden whitespace-nowrap rounded-full border-[1.5px] border-kinome-black bg-transparent px-[22px] py-[10px] font-body text-[0.9rem] font-medium text-kinome-black transition-colors group-hover:bg-kinome-black group-hover:text-white md:inline-flex">
                Read article (FR)
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/en/blog/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 text-center font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            All our articles
          </Link>
        </div>
      </section>

      {/* Contact */}
      <div id="contact">
        <section className="px-[5%] pt-[clamp(90px,12vw,120px)] pb-10 text-center">
          <h2 className="mx-auto max-w-[900px] font-heading text-[clamp(26px,4.8vw,56px)] font-normal leading-[1.1]">
            Have a project you'd like to discuss?
          </h2>
        </section>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-20 px-[5%] pb-[clamp(60px,12vw,120px)] lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="mb-12 font-heading text-[2.8rem] font-bold">
              Kinome
            </h3>
            <div className="mb-9">
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#5b5b5b]">
                Mathias
              </strong>
              <p className="m-0 font-body text-[clamp(16px,1.2vw,18px)] text-kinome-grey">
                <a
                  href={`mailto:${contact.emails.mathias}`}
                  className="hover:underline"
                >
                  {contact.emails.mathias}
                </a>
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
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#5b5b5b]">
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
              <strong className="mb-2 block text-[0.9rem] uppercase text-[#5b5b5b]">
                Follow us
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

      {/* FAQ — questions about Kinome (AEO + GEO Geneva) */}
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
