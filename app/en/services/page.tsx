/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import ServicesHero from "../../services/ServicesHero";

const servicesDesign = [
  {
    title: "Logo design",
    body: "Logo design is approached with particular attention to uniqueness and relevance for each brand. Every project is unique, and an in-depth creative process develops logos that not only capture the brand's essence but are also memorable and functional across various supports.",
  },
  {
    title: "Brand guidelines development",
    body: "Complete brand guidelines establish the visual foundations of the brand: colour palettes, typography, graphic styles — ensuring visual coherence across all communication supports. They serve as a guide for creating all visual elements of the brand.",
  },
  {
    title: "Branding strategy",
    body: "Branding strategies are developed to strengthen the brand's identity and market presence. This includes analysing brand positioning, defining key messages, and creating a recognisable visual identity that resonates with the target audience and supports business objectives.",
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

export default function ServicesEN() {
  const [tab, setTab] = useState<"design" | "web">("design");
  const services = tab === "design" ? servicesDesign : servicesWeb;

  return (
    <main>
      <ServicesHero />

      <section className="mx-auto max-w-[1400px] px-[5%] py-[clamp(60px,12vw,120px)]">
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
            <div
              key={s.title}
              className="rounded-[24px] bg-kinome-cream p-10 text-center"
            >
              <h2 className="mb-6 font-heading text-[1.6rem] font-semibold leading-[1.2]">
                {s.title}
              </h2>
              <p className="font-body text-[1rem] leading-[1.6] text-kinome-grey">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

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
            className="btn-fill-dark mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105 hover:text-white"
          >
            <span className="relative z-10">Discuss your project</span>
          </Link>
          <Link
            href="/en/portfolio/"
            className="btn-fill-white mx-auto md:mx-0 flex w-fit min-w-[280px] items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105 hover:text-kinome-black"
          >
            <span className="relative z-10">View our projects</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
