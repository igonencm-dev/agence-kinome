/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../../components/Testimonials";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Our working process",
  description:
    "Discover Kinome's method for delivering communication projects in Geneva: free discovery call, strategic framing, iterative design and careful delivery. A transparent four-step journey built to deliver results matching your ambitions.",
  path: "/en/process/",
  keywords: [
    "agency working method",
    "design process Geneva",
    "branding project flow",
  ],
});

const steps = [
  {
    n: "01",
    title: "Discovery call",
    body: "A free, no-strings call to understand who you are, what you want to achieve, and decide together whether we're a good fit for each other.",
  },
  {
    n: "02",
    title: "Strategic framing",
    body: "We define your objectives, audience, constraints and references. This phase ends with a precise brief everyone agrees on before going any further.",
  },
  {
    n: "03",
    title: "Creative work",
    body: "First proposals, then iterations together. We keep you informed in real time and present regular check-ins to make sure we're going in the right direction.",
  },
  {
    n: "04",
    title: "Delivery & follow-up",
    body: "Final files in all formats you need, with a usage guide. We stay available afterwards to support you with the daily life of your brand.",
  },
];

export default function ProcessEN() {
  return (
    <main>
      <section className="bg-kinome-cream px-[5%] pt-[180px] pb-[100px]">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="max-w-[900px] font-heading text-[clamp(30px,5.5vw,76px)] font-normal leading-[1.12] text-kinome-dark">
            A process designed to fully understand your project.
          </h1>
          <p className="mt-6 max-w-[800px] font-body text-[clamp(17px,1.4vw,21px)] font-light leading-[1.5] text-kinome-dark">
            Four clear, transparent steps to take your project from idea to
            delivery — with as few surprises as possible.
          </p>
        </div>
      </section>

      <section className="bg-white px-[5%] py-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <ol className="flex flex-col gap-6">
            {steps.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-1 items-start gap-6 rounded-[24px] bg-kinome-cream p-12 md:grid-cols-[auto_1fr_auto] md:items-center"
              >
                <h2 className="font-heading text-[clamp(22px,2.4vw,36px)] font-medium leading-[1.1] md:max-w-[400px]">
                  {s.title}
                </h2>
                <p className="font-body text-[1.05rem] leading-[1.7] text-kinome-grey md:px-12">
                  {s.body}
                </p>
                <div className="font-heading text-[6rem] font-thin leading-none text-kinome-black md:text-[8rem]">
                  {s.n}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto my-[100px] max-w-[1000px] rounded-[24px] bg-kinome-dark px-[5%] py-[80px] text-center text-white">
        <h2 className="mb-6 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
          Want to start your project?
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] font-body text-[1.1rem] font-light leading-[1.6] text-white/85">
          Free discovery call, response within 48 hours. We discuss your
          challenges and come back with a clear proposal.
        </p>
        <Link
          href="/en/contact/"
          className="btn-fill-dark inline-flex min-w-[280px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-semibold text-kinome-black transition-transform hover:scale-105 hover:text-white"
        >
          <span className="relative z-10">Let's talk</span>
        </Link>
      </section>
    </main>
  );
}
