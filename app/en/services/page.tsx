/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import ServicesHero from "../../services/ServicesHero";
import ResponsiveBr from "../../components/ResponsiveBr";

const servicesCrea = [
  {
    title: "Logo design",
    body: "Logo design is approached with particular attention to uniqueness and relevance for each brand. Every project is unique. An in-depth creative process develops logos that not only capture the brand's essence but are also memorable and functional across various supports. This crucial step ensures the logo becomes a recognisable and powerful symbol of the brand's identity.",
  },
  {
    title: "Brand guidelines development",
    body: "Complete brand guidelines establish the visual foundations of the brand. This process includes defining colour palettes, typography and graphic styles, ensuring visual coherence across all communication supports. The guidelines serve as a reference for creating every visual element of the brand, guaranteeing a strong and unified visual identity. They also include usage rules so you know how to apply every graphic element.",
  },
  {
    title: "Branding strategy",
    body: "Branding strategies are developed to strengthen the brand's identity and presence in the market. This includes brand positioning analysis, defining key visual messages and creating a recognisable visual identity. The goal is to build a strong, coherent brand image that resonates with the target audience and supports the client's business objectives.",
  },
];

const servicesWeb = [
  {
    title: "Showcase websites",
    body: "Design and development of elegant showcase websites, SEO-optimised and built to convert. We work with modern technologies (Next.js, Astro, headless WordPress) according to each project's needs.",
  },
  {
    title: "E-commerce",
    body: "Robust online stores (Shopify, WooCommerce, custom builds), with particular attention paid to shopping experience, performance and conversion funnel.",
  },
  {
    title: "Platforms & dashboards",
    body: "Custom web applications, client portals, dashboards and internal tools — from UX design to deployment, including integration with existing APIs.",
  },
];

const processus = [
  {
    title: "Design and delivery",
    body: "The graphic design process is methodical and creative. Each project starts with an in-depth analysis phase where your needs and objectives are identified. This step is followed by the creation of mockups and prototypes, allowing clients to visualise concepts before finalisation. The emphasis is placed on close collaboration to ensure the final product matches your expectations perfectly.",
    img: "/assets/man-using-laptop.png",
    alt: "Designer working on a laptop during the design phase of a graphic project",
    reverse: false,
  },
  {
    title: "Tools and software",
    body: "Industry-leading software is used in graphic design: Photoshop for image editing, Illustrator for vector graphics, InDesign for layouts. To guarantee complete and global work, we also use Figma and Sketch. These tools allow great flexibility and precision in delivering varied projects, with a tailored response to each need.",
    img: "/assets/designer-young-lady.png",
    alt: "Graphic designer using Photoshop, Illustrator, Figma and Sketch to create visual identities in Geneva",
    reverse: true,
  },
  {
    title: "A relationship of trust",
    body: "Establishing a relationship of trust with each client is a fundamental pillar of our creative process. This trust is built through transparent communication, attentive listening and deep understanding of your goals. We commit fully to satisfying you and meeting your demands. Every step of the project is handled with constant care for expectations while bringing expertise and professional advice. This approach creates tailored results and lasting, fruitful partnerships.",
    img: "/assets/interior-designer-office.png",
    alt: "Trusting exchange between Agence Kinome and its client in the office for a branding project",
    reverse: false,
  },
];

const pourquoiNous = [
  {
    num: "01",
    title: "Flexibility and personalisation",
    body: "Thanks to the quality and rigour learned in agencies, you can access a 360° professional service. Every project benefits from a tailored approach adapted to your specific needs. Our graphic design skills serve your brand's story and the values you want to convey, finding the graphic identity that suits and adapts to every communication support.",
  },
  {
    num: "02",
    title: "Transparent and efficient communication",
    body: "Working directly with us guarantees clear and efficient communication. You have direct access to the creator of your graphic elements, making it easier to exchange ideas and get fast feedback. This proximity ensures better understanding of project objectives and faster response to modification or adjustment requests.",
  },
  {
    num: "03",
    title: "Creativity and innovation",
    body: "Our experience across multiple sectors brings creative richness and innovative perspectives to each project. With our diversified background, we offer design solutions that combine aesthetics, functionality and originality. By being proactive in our proposals, we let your brand image shine across all communication supports.",
  },
  {
    num: "04",
    title: "A privileged relationship",
    body: "A relationship with us is characterised by mutual commitment and trust. We invest fully in each project, with the goal of building lasting relationships based on satisfaction and success. Our commitment to clients translates into consistent quality and a desire to exceed expectations.",
  },
  {
    num: "05",
    title: "Cost-effectiveness",
    body: "Choosing us can also be more profitable. Without the overhead of a large agency, clients often benefit from more competitive rates while receiving high-quality work. This cost-quality efficiency is particularly advantageous for small businesses and startups.",
  },
  {
    num: "06",
    title: "Proximity",
    body: "To enable local meetings, we mainly operate in the Geneva area and sometimes in Savoie. We prefer remote work with regular video calls to follow your project in detail. But physical meetings are always possible.",
  },
];

const projetsApercu = [
  { src: "/assets/wp/Cabinet-Faraday-780x390px-1.png", alt: "Cabinet Faraday", slug: "cabinet-faraday" },
  { src: "/assets/wp/Adapt-Project-780x390px-1.png", alt: "Adapt Project", slug: "adapt-project" },
  { src: "/assets/wp/Alministratif-780x390px-1.png", alt: "Alministratif", slug: "alministratif" },
  { src: "/assets/wp/Authentik-Peak-780x390px-1.png", alt: "Authentik Peak", slug: "authentik-peak" },
];

export default function ServicesEN() {
  const [tab, setTab] = useState<"design" | "web">("design");
  const services = tab === "design" ? servicesCrea : servicesWeb;

  return (
    <main>
      <ServicesHero locale="en" />

      {/* Services tabs (Creative / Web) */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,12vw,120px)]">
        <h2 className="mb-12 text-center font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
          Our services
        </h2>
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => setTab("design")}
            className={`rounded-full px-12 py-3 font-body text-[clamp(16px,1.2vw,18px)] font-medium transition-colors ${
              tab === "design"
                ? "bg-kinome-black text-white"
                : "bg-[#f2f2f2] text-kinome-black hover:bg-[#e5e5e5]"
            }`}
          >
            Creative services
          </button>
          <button
            type="button"
            onClick={() => setTab("web")}
            className={`rounded-full px-12 py-3 font-body text-[clamp(16px,1.2vw,18px)] font-medium transition-colors ${
              tab === "web"
                ? "bg-kinome-black text-white"
                : "bg-[#f2f2f2] text-kinome-black hover:bg-[#e5e5e5]"
            }`}
          >
            Web services
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-[24px] bg-kinome-cream p-10 text-center">
              <h3 className="mb-6 font-heading text-[1.6rem] font-semibold leading-[1.2]">
                {s.title}
              </h3>
              <p className="font-body text-[1rem] leading-[1.6] text-kinome-grey">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our work process with illustrations */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(40px,8vw,80px)]">
        <h2 className="mb-12 text-center font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
          Our work process
        </h2>

        {processus.map((p) => (
          <div
            key={p.title}
            className="mb-8 grid grid-cols-1 items-center gap-12 rounded-[24px] bg-kinome-cream p-[clamp(24px,5vw,60px)] lg:grid-cols-2"
          >
            <div className={p.reverse ? "lg:order-2" : ""}>
              <h3 className="mb-4 font-heading text-[1.8rem] font-semibold leading-[1.2]">
                {p.title}
              </h3>
              <p className="font-body text-[1rem] leading-[1.7] text-kinome-grey">
                {p.body}
              </p>
            </div>
            <div className={`overflow-hidden rounded-[20px] aspect-[4/3] ${p.reverse ? "lg:order-1" : ""}`}>
              <img
                src={p.img}
                alt={p.alt}
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <Link
            href="/en/process/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Our process
          </Link>
        </div>
      </section>

      {/* Recent projects preview */}
      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(50px,10vw,100px)]">
        <h2 className="mb-12 text-center font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
          A few recent projects
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projetsApercu.map((p) => (
            <Link
              key={p.alt}
              href={`/en/projets/${p.slug}/`}
              className="group block aspect-[16/9] overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="block h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/en/portfolio/"
            className="mx-auto flex w-fit min-w-[280px] items-center justify-center btn-fill-accent rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105 hover:bg-[#333]"
          >
            Discover our projects
          </Link>
        </div>
      </section>

      {/* Why work with us */}
      <section className="bg-kinome-cream px-[5%] py-[clamp(60px,12vw,120px)]">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-16 text-center font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
            Why work with us
            <ResponsiveBr />
            for your communication
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pourquoiNous.map((p) => (
              <article
                key={p.num}
                className="rounded-[20px] bg-white p-[clamp(24px,2.5vw,40px)]"
              >
                <p className="mb-3 font-heading text-[clamp(40px,4vw,56px)] font-bold leading-none text-kinome-accent">
                  {p.num}
                </p>
                <h3 className="mb-3 font-heading text-[1.2rem] font-semibold leading-[1.3]">
                  {p.title}
                </h3>
                <p className="font-body text-[0.95rem] leading-[1.6] text-kinome-grey">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contact */}
      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[clamp(50px,8vw,80px)] text-center text-white">
        <h2 className="mb-6 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
          A project in mind?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-white/80">
          Tell us about your challenges and constraints — we'll come back with a structured proposal.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/en/contact/"
            className="btn-fill-dark mx-auto flex w-fit min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105 hover:text-white"
          >
            <span className="relative z-10">Discuss your project</span>
          </Link>
          <Link
            href="/en/portfolio/"
            className="btn-fill-white mx-auto flex w-fit min-w-[280px] items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105 hover:text-kinome-black"
          >
            <span className="relative z-10">View our projects</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
