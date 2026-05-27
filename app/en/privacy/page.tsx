import Link from "next/link";
import { buildMetadata, SITE, BUSINESS } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "Privacy policy of Agence Kinome: personal data processing, cookies, GDPR and Swiss FADP rights, data security.",
  path: "/en/privacy/",
});

export default function PrivacyPolicyEN() {
  return (
    <main className="bg-kinome-cream pt-[160px]">
      <article className="mx-auto max-w-[820px] px-[5%] pb-[120px]">
        <h1 className="mb-10 font-heading text-[clamp(32px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
          Privacy policy
        </h1>

        <p className="mb-10 font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
          This policy describes how {SITE.legalName} (hereafter "Kinome",
          "we") collects, uses and protects your personal data when you visit
          agence-kinome.ch or contact us. It complies with the EU General Data
          Protection Regulation (GDPR — EU 2016/679) and the Swiss Federal Act
          on Data Protection (FADP).
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            1. Data controller
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            The data controller is {SITE.legalName}, with its registered
            office in {BUSINESS.city}, {BUSINESS.countryName}. Contact:{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            2. Data we collect
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            We only collect the data strictly necessary for the purposes
            described below.
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Contact form:</strong> first name, last name, email,
              company, request, message. IP address and timestamp for
              anti-spam purposes.
            </li>
            <li>
              <strong>Email exchanges:</strong> content of messages and
              information shared as part of our business relationship.
            </li>
            <li>
              <strong>Audience analytics (Google Analytics 4):</strong> only
              after your explicit consent via the cookie banner. Pseudonymised
              data (truncated IP), pages visited, duration, traffic source,
              device type.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            3. Purposes and legal bases
          </h2>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Respond to your enquiries:</strong> performance of
              pre-contractual measures at your request (art. 6.1.b GDPR).
            </li>
            <li>
              <strong>Send you our offers and publications:</strong> only with
              your explicit consent (art. 6.1.a GDPR).
            </li>
            <li>
              <strong>Measure site audience:</strong> legitimate interest in
              improving our service, subject to your prior consent (art. 6.1.a
              GDPR).
            </li>
            <li>
              <strong>Comply with our legal and accounting obligations:</strong>{" "}
              legal obligation (art. 6.1.c GDPR).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            4. Retention period
          </h2>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Form messages:</strong> 3 years after the last contact,
              unless an earlier deletion request is made.
            </li>
            <li>
              <strong>Client data (contracts, invoices):</strong> 10 years in
              compliance with Swiss accounting obligations (art. 958f CO).
            </li>
            <li>
              <strong>Audience cookies:</strong> 13 months maximum (CNIL
              recommendation).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            5. Data recipients
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Your data is never sold. It is accessible only to:
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>The Kinome team (Mathias, Tanguy);</li>
            <li>
              Our technical subcontractors: <strong>Hostinger</strong>{" "}
              (hosting, email), <strong>Google</strong> (Analytics, if
              consented). These providers act only on our instructions and
              offer sufficient security guarantees.
            </li>
          </ul>
          <p className="mt-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            In case of transfer outside the EU/Switzerland (e.g. via Google),
            it relies on the standard contractual clauses approved by the
            European Commission.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            6. Your rights
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Under the GDPR and the Swiss FADP, you have the following rights
            at any time:
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>Right of access to your data;</li>
            <li>Right to rectification of inaccurate data;</li>
            <li>Right to erasure ("right to be forgotten");</li>
            <li>Right to restrict processing;</li>
            <li>Right to data portability;</li>
            <li>Right to object to processing;</li>
            <li>Right to withdraw your consent at any time;</li>
            <li>
              Right to lodge a complaint with a supervisory authority (Federal
              Data Protection and Information Commissioner — FDPIC in
              Switzerland, CNIL in France).
            </li>
          </ul>
          <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-black">
            To exercise these rights, write to us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline text-kinome-accent">
              {BUSINESS.email}
            </a>
            . We will reply within a maximum of 30 days.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            7. Cookies
          </h2>
          <p className="mb-3 font-body text-[1rem] leading-[1.7] text-kinome-black">
            Our site uses two categories of cookies:
          </p>
          <ul className="list-disc space-y-2 pl-6 font-body text-[1rem] leading-[1.7] text-kinome-black">
            <li>
              <strong>Strictly necessary cookies:</strong> essential for the
              site to work (remembering your choice on the consent banner).
              They do not require your consent.
            </li>
            <li>
              <strong>Audience cookies (Google Analytics 4):</strong> used
              only if you have explicitly consented via the banner. They help
              us understand site usage in an anonymised way. You can withdraw
              your consent at any time by clicking "Manage cookies" at the
              bottom of the page.
            </li>
          </ul>
          <p className="mt-4 font-body text-[1rem] leading-[1.7] text-kinome-black">
            No advertising cookie, marketing profiling cookie or third-party
            social network cookie is set.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            8. Security
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            The site is served exclusively over HTTPS (TLS 1.3). Forms are
            protected against spam (honeypot, rate limiting). Server backups
            are performed daily by the hosting provider. Access to our
            systems is restricted to the Kinome team via strong
            authentication.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-[1.6rem] font-semibold text-kinome-black">
            9. Changes
          </h2>
          <p className="font-body text-[1rem] leading-[1.7] text-kinome-black">
            This policy may evolve to adapt to legal or technical changes.
            Any significant change will be notified on the site.
          </p>
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
