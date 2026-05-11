import Link from "next/link";
import { buildMetadata, SITE, BUSINESS } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "Privacy policy of Agence Kinome: personal data processing, cookies, GDPR and Swiss FADP rights, data security.",
  path: "/en/privacy/",
});

export default function PrivacyEN() {
  return (
    <main className="bg-kinome-cream pt-[160px]">
      <article className="mx-auto max-w-[820px] px-[5%] pb-[120px]">
        <h1 className="mb-10 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
          Privacy policy
        </h1>

        <p className="mb-10 font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
          This policy describes how {SITE.legalName} (hereafter &ldquo;Kinome&rdquo;,
          &ldquo;we&rdquo;) collects, uses and protects your personal data when
          you visit agence-kinome.ch or contact us. It complies with the
          General Data Protection Regulation (GDPR — EU 2016/679) and the
          Swiss Federal Act on Data Protection (FADP).
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            1. Data controller
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            The data controller is {SITE.legalName}, with registered office in
            {" "}{BUSINESS.city}, {BUSINESS.countryName}. Contact:{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            2. Data collected
          </h2>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Contact form:</strong> first name, last name, email,
              company, your needs, message. IP address and timestamp for
              anti-spam purposes.
            </li>
            <li>
              <strong>Email exchanges:</strong> content of messages and
              information shared in the context of our business relationship.
            </li>
            <li>
              <strong>Audience analytics (Google Analytics 4):</strong> only
              after your explicit consent via the cookie banner. Anonymised
              data (truncated IP), pages visited, duration, traffic source,
              device type.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            3. Your rights
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Pursuant to the GDPR and Swiss FADP, you have the following rights
            at any time:
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>Right of access to your data;</li>
            <li>Right to rectify inaccurate data;</li>
            <li>Right to erasure (&ldquo;right to be forgotten&rdquo;);</li>
            <li>Right to restriction of processing;</li>
            <li>Right to data portability;</li>
            <li>Right to object to processing;</li>
            <li>Right to withdraw consent at any time;</li>
            <li>
              Right to lodge a complaint with a supervisory authority (FDPIC
              in Switzerland, CNIL in France).
            </li>
          </ul>
          <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-black">
            To exercise these rights, write to us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>
            . We will respond within a maximum of 30 days.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            4. Cookies
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Our site uses two categories of cookies:
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Strictly necessary cookies:</strong> essential for the
              site to function (remembering your consent choice on the banner).
              They do not require your approval.
            </li>
            <li>
              <strong>Audience analytics cookies (Google Analytics 4):</strong>{" "}
              used only if you have explicitly consented via the banner. They
              help us understand site usage anonymously. You can withdraw
              consent at any time by clicking &ldquo;Manage cookies&rdquo; at
              the bottom of the page.
            </li>
          </ul>
        </section>

        <p className="mt-10 font-body text-[0.85rem] italic text-kinome-grey">
          Last updated: 11 May 2026.
        </p>

        <div className="mt-12 border-t border-[#e0ddd6] pt-8 text-center">
          <Link
            href="/en/legal/"
            className="font-heading text-[0.95rem] font-semibold text-kinome-black underline-offset-4 hover:underline"
          >
            See also: Legal notice →
          </Link>
        </div>
      </article>
    </main>
  );
}
