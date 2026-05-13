/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact } from "../../lib/contact";
import ContactForm from "../../contact/ContactForm";
import Testimonials from "../../components/Testimonials";
import LogosMarqueeVertical from "../../components/LogosMarqueeVertical";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Agence Kinome in Geneva to discuss your communication project, visual identity, logo design or website. Free discovery call to explore possibilities together.",
  path: "/en/contact/",
  keywords: [
    "Geneva agency contact",
    "logo design quote Geneva",
    "website quote Geneva",
  ],
});

export default function ContactEN() {
  return (
    <main className="pt-[140px]">
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-[5%] py-[40px] lg:grid-cols-[1fr_1.3fr]">
        <div className="font-body text-[1.15rem] leading-[1.6] text-kinome-black">
          <h1 className="mb-12 font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.05] text-kinome-black">
            Let's talk.
          </h1>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Address</p>
            <p className="text-kinome-grey">
              {contact.agency.name}
              <br />
              Geneva, Switzerland
            </p>
          </div>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Contact — Mathias</p>
            <p className="text-kinome-grey">
              <a href={`tel:${contact.phones.mathias.e164}`} className="hover:underline">
                {contact.phones.mathias.display}
              </a>
              <br />
              <a href={`mailto:${contact.emails.mathias}`} className="hover:underline">
                {contact.emails.mathias}
              </a>
            </p>
          </div>

          <div className="mb-10">
            <p className="mb-3 font-semibold">Contact — Tanguy</p>
            <p className="text-kinome-grey">
              <a href={`tel:${contact.phones.tanguy.e164}`} className="hover:underline">
                {contact.phones.tanguy.display}
              </a>
              <br />
              <a href={`mailto:${contact.emails.tanguy}`} className="hover:underline">
                {contact.emails.tanguy}
              </a>
            </p>
          </div>

          <div>
            <p className="mb-3 font-semibold">Follow us</p>
            <p className="text-kinome-grey">
              <a
                href={contact.social.linkedinAgence}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn — Agence Kinome
              </a>
              <br />
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram — @agencekinome
              </a>
            </p>
          </div>
        </div>

        <ContactForm />
      </section>

      <section className="my-[60px] bg-kinome-cream py-[clamp(50px,8vw,80px)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-[5%] lg:grid-cols-[1fr_320px]">
          <div className="text-center lg:text-left">
            <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
              Trusted by
            </p>
            {/* Retour #110 : titre doublé en taille (clamp 26-56 → 40-100)
                pour donner le poids visuel sur le compteur clé. */}
            <h2 className="mb-6 font-heading text-[clamp(40px,7.5vw,100px)] font-normal leading-[1.05] text-kinome-black">
              Around thirty brands supported from Geneva
            </h2>
            <p className="mx-auto max-w-[480px] font-body text-[clamp(15px,1.2vw,18px)] font-light leading-[1.6] text-kinome-grey lg:mx-0">
              Identities, websites, campaigns — from SMEs to consulting firms,
              restaurants to travel agencies, varied brands choose Kinome to
              carry their image.
            </p>
          </div>
          <LogosMarqueeVertical />
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto my-[100px] max-w-[1300px] rounded-[24px] bg-kinome-cream px-[5%] py-[80px] text-center">
        <h2 className="mx-auto mb-6 max-w-[900px] font-heading text-[clamp(26px,4.5vw,52px)] font-normal leading-[1.1]">
          Have a project you'd like to discuss?
        </h2>
        <p className="mx-auto mb-10 max-w-[700px] font-body text-[1.1rem] font-light leading-[1.6] text-kinome-grey">
          Every conversation is the starting point of a sincere collaboration —
          where trust and shared commitment shape results that match your
          ambitions.
        </p>
        <Link
          href="#top"
          className="btn-fill-accent inline-flex min-w-[280px] items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-[transform,background-color] hover:scale-105"
        >
          <span className="relative z-10">Fill in the form</span>
        </Link>
      </section>
    </main>
  );
}
