import Link from "next/link";
import { buildMetadata, SITE, BUSINESS } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Legal notice",
  description:
    "Legal notice of Agence Kinome Sàrl, a communication agency in Geneva (Switzerland): publisher, hosting provider, intellectual property.",
  path: "/en/legal/",
});

export default function LegalEN() {
  return (
    <main className="bg-kinome-cream pt-[clamp(110px,16vw,160px)]">
      <article className="mx-auto max-w-[820px] px-[5%] pb-[clamp(60px,12vw,120px)]">
        <h1 className="mb-10 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
          Legal notice
        </h1>

        <p className="mb-10 font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
          In compliance with the Swiss Federal Act against Unfair Competition
          (UCA) and the French law n° 2004-575 of June 21, 2004 (LCEN),
          visitors and users of agence-kinome.ch are informed of the
          identities of the various parties involved in its creation and
          operation.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Site editor
          </h2>
          <div className="space-y-1 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <p><strong>Legal name:</strong> {SITE.legalName}</p>
            <p><strong>Legal form:</strong> Swiss Sàrl (limited liability company)</p>
            <p><strong>Registered office:</strong> {BUSINESS.city}, {BUSINESS.countryName}</p>
            <p><strong>Email:</strong>{" "}
              <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
                {BUSINESS.email}
              </a>
            </p>
            <p><strong>Legal representatives:</strong> Mathias Igonenc &amp; Tanguy Deniel, co-founders</p>
            <p><strong>Publication director:</strong> Mathias Igonenc</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Hosting
          </h2>
          <div className="space-y-1 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <p><strong>Host:</strong> Hostinger International Ltd.</p>
            <p><strong>Address:</strong> 61 Lordou Vironos Street, 6023 Larnaca, Cyprus</p>
            <p><strong>Website:</strong>{" "}
              <a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer" className="underline text-kinome-accent">
                hostinger.com
              </a>
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Intellectual property
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            All content present on agence-kinome.ch (texts, images,
            illustrations, logos, videos, blog articles, client projects) is,
            unless otherwise stated, the exclusive property of {SITE.legalName}
            {" "}or of its respective clients, and is protected by Swiss and
            international intellectual property laws.
          </p>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            Project visuals displayed in the portfolio are published with the
            agreement of the clients concerned. Third-party brands and logos
            (clients, partners) remain the property of their respective owners.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            Applicable law and jurisdiction
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            This legal notice is governed by Swiss law. In the event of a
            dispute and absent amicable agreement, the competent court of the
            canton of Geneva shall have sole jurisdiction.
          </p>
        </section>

        <p className="mt-10 font-body text-[0.85rem] italic text-kinome-grey">
          Last updated: 11 May 2026.
        </p>

        <div className="mt-12 border-t border-[#e0ddd6] pt-8 text-center">
          <Link
            href="/en/privacy/"
            className="font-heading text-[0.95rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
          >
            See also: Privacy policy →
          </Link>
        </div>
      </article>
    </main>
  );
}
