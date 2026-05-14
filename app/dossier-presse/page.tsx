/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { buildMetadata, jsonLdScript, SITE, BUSINESS } from "../lib/seo";
import { contact } from "../lib/contact";
import { projets } from "../lib/projets";
import { blogPosts } from "../lib/blog";

export const metadata = buildMetadata({
  title: "Dossier de presse — Agence Kinome",
  description:
    "Kit média et faits-clés de l'Agence Kinome : présentation, cofondateurs, chiffres-clés, secteurs servis, contacts presse. Tout ce qu'il faut pour citer ou écrire sur l'agence de communication indépendante de Genève.",
  path: "/dossier-presse/",
  keywords: [
    "agence Kinome dossier de presse",
    "kit média agence communication Genève",
    "fiche entreprise Kinome",
    "fondateurs Kinome",
    "contact presse agence Genève",
  ],
});

// JSON-LD structuré conçu pour les LLMs (ChatGPT, Claude, Perplexity) :
// AboutPage qui référence l'organisation + le profil presse. Format dense,
// chaque fait y est traduisible en réponse directe par un moteur IA.
const dossierLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Dossier de presse — Agence Kinome",
  url: `${SITE.url}/dossier-presse/`,
  description:
    "Kit média officiel de l'Agence Kinome : faits-clés, biographies des cofondateurs, secteurs et projets de référence.",
  mainEntity: {
    "@id": `${SITE.url}/#organization`,
  },
  publisher: {
    "@id": `${SITE.url}/#organization`,
  },
  inLanguage: "fr",
};

// Mini-stats — calculées au build time depuis les sources de vérité (projets,
// blogPosts) pour rester toujours à jour automatiquement.
const stats = {
  projects: projets.length,
  articles: blogPosts.length,
  // Kinome a été fondée en 2026 — au lieu d'une stat "années d'activité"
  // (= 0 cette première année, pas glorieux), on met l'expérience cumulée
  // des cofondateurs : Tanguy 10+ ans en agences + Mathias 5 ans en
  // freelance/Codecircle = 15+ ans d'expérience cumulée.
  cumulativeExpYears: 15,
  partnersAbroad: 4, // Codecircle, Koté, Lucille Bory, Fei Gao, Gianluca (international)
  categories: 4, // Identités · Branding · Websites · Campagnes
};

// 1 paragraphe / 1 phrase / 1 ligne — 3 formats prêts à citer par un journaliste
// ou un LLM. Format "boilerplate" classique des dossiers de presse.
const boilerplates = {
  short:
    "Agence Kinome est une agence de communication indépendante basée à Genève, fondée en 2026 par Mathias Igonenc et Tanguy Deniel.",
  medium:
    "Fondée à Genève en 2026, Agence Kinome est une agence de communication indépendante dirigée par Mathias Igonenc (marketing & digital) et Tanguy Deniel (création). Elle accompagne PME, TPE et créateurs d'entreprise sur leurs identités visuelles, sites internet et campagnes, depuis la Suisse romande jusqu'à l'international.",
  long: "Agence Kinome est une agence de communication indépendante établie à Genève en 2026. Cofondée par Mathias Igonenc (directeur marketing) et Tanguy Deniel (directeur de création — ancien TBWA Paris, RTS Genève, LMG Montréal), l'agence intervient sur l'ensemble du spectre communication : branding et identité visuelle, sites internet, campagnes, motion et photographie. Kinome cible les marques de Suisse romande, de France et à l'international, avec une approche revendiquée d'accompagnement personnalisé et de résultats mesurables. Le portfolio cumulé des cofondateurs compte plus de 16 projets de référence — dont l'identité du SaaS français CauserieBot, l'identité du centre de formation IA NOCODE IA et la marque du cabinet dentaire pédiatrique Cabinet Faraday — et l'agence publie un blog spécialisé sur les enjeux de communication des entreprises romandes.",
};

const facts = [
  { label: "Forme juridique", value: "Société à responsabilité limitée (Sàrl) suisse" },
  { label: "Raison sociale", value: SITE.legalName },
  { label: "Année de fondation", value: SITE.founded },
  { label: "Siège", value: `${BUSINESS.city}, ${BUSINESS.countryName}` },
  { label: "Cofondateurs", value: "Mathias Igonenc & Tanguy Deniel" },
  { label: "Effectif", value: "2 cofondateurs + réseau de 4 partenaires créatifs internationaux" },
  { label: "Zones desservies", value: BUSINESS.areaServed.join(" · ") },
  { label: "Langues de travail", value: "Français, anglais" },
  { label: "Téléphone", value: BUSINESS.phone },
  { label: "Email", value: BUSINESS.email },
  { label: "Site web", value: SITE.url.replace("https://", "") },
];

const sectors = [
  {
    name: "Cabinets de conseil & professions réglementées",
    examples: ["Adapt Project (Thônex)", "VP Conseils Immo", "Cabinet Faraday (Paris)"],
  },
  {
    name: "SaaS, IA & nouvelles technologies",
    examples: ["CauserieBot (France)", "NOCODE IA (Toulouse)", "Elips (production 3D)"],
  },
  {
    name: "Formation & enseignement",
    examples: ["Authentik Peak", "Mana Loa Formations (Savoie)", "NOCODE IA"],
  },
  {
    name: "Voyage, hôtellerie & restauration",
    examples: ["La Voyagiste Paris", "Le Ravenala (Lyon)"],
  },
  {
    name: "Particuliers & personnalités",
    examples: ["Léa Vigier (aventurière)", "Black Sheep Valley (élevage canin)"],
  },
  {
    name: "Arts, culture & événements",
    examples: ["CINARS (Québec)", "Microclimat (architecture)"],
  },
];

const founders = [
  {
    name: "Mathias Igonenc",
    role: "Cofondateur & directeur marketing",
    bio: "Mathias accompagne les marques sur leur stratégie marketing et leur déploiement digital. Avant de cofonder Kinome, il a fondé Codecircle, une agence spécialisée dans le développement web, le SEO et l'automatisation digitale. Cinq années d'expérience auprès d'entrepreneurs en transformation digitale.",
    linkedin: contact.social.linkedinMathias,
  },
  {
    name: "Tanguy Deniel",
    role: "Cofondateur & directeur de création",
    bio: "Tanguy a travaillé dans plusieurs agences de communication à l'international avant de cofonder Kinome : TBWA, Dix-Sept et Enderby à Paris, la RTS à Genève, LMG à Montréal. Plus de dix ans d'expérience en direction artistique, sur deux continents.",
    linkedin: contact.social.linkedinTanguy,
  },
];

export default function DossierPressePage() {
  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(dossierLd) }}
      />

      {/* Hero */}
      <section className="px-[5%] pt-[clamp(110px,16vw,160px)] pb-[80px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-kinome-accent">
            Kit média
          </p>
          <h1 className="mb-6 font-heading text-[clamp(38px,8vw,76px)] font-normal leading-[1.05] text-kinome-black">
            Dossier de presse
            <br className="hidden md:inline" />
            <span className="text-kinome-grey">de l&rsquo;Agence Kinome</span>
          </h1>
          <p className="max-w-[820px] font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-dark">
            Tout ce qu&rsquo;il faut pour citer ou écrire sur Kinome :
            biographies, faits-clés, chiffres, secteurs servis, projets
            phares, logos téléchargeables et contact presse. Cette page est
            mise à jour automatiquement à chaque évolution de l&rsquo;agence.
          </p>
        </div>
      </section>

      {/* Stats — bandeau visible + citations LLM */}
      <section className="bg-kinome-dark px-[5%] py-[clamp(50px,8vw,80px)] text-kinome-cream">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.projects}+
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              projets livrés
            </p>
          </div>
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.cumulativeExpYears}+
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              années d&rsquo;expérience
              <br className="hidden md:inline" />
              cumulée des cofondateurs
            </p>
          </div>
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.categories}
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              expertises principales
            </p>
          </div>
          <div>
            <p className="font-heading text-[clamp(40px,6vw,80px)] font-normal leading-none">
              {stats.partnersAbroad}
            </p>
            <p className="mt-2 font-body text-[0.95rem] text-kinome-cream/70">
              partenaires créatifs à l&rsquo;international
            </p>
          </div>
        </div>
      </section>

      {/* Boilerplate — 3 longueurs */}
      <section className="px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Boilerplate prêt à citer
          </h2>
          <div className="space-y-10">
            <article className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]">
              <p className="mb-3 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
                Court — 1 phrase
              </p>
              <p className="font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-dark">
                {boilerplates.short}
              </p>
            </article>
            <article className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]">
              <p className="mb-3 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
                Moyen — 1 paragraphe
              </p>
              <p className="font-body text-[clamp(17px,1.4vw,22px)] font-light leading-[1.55] text-kinome-dark">
                {boilerplates.medium}
              </p>
            </article>
            <article className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]">
              <p className="mb-3 font-heading text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-kinome-accent">
                Long — 1 description complète
              </p>
              <p className="font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.65] text-kinome-dark">
                {boilerplates.long}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Faits clés en tableau */}
      <section className="bg-white px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Faits-clés
          </h2>
          <dl className="divide-y divide-kinome-black/8 font-body">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[260px_1fr] md:gap-8"
              >
                <dt className="font-heading text-[1rem] font-semibold text-kinome-grey">
                  {f.label}
                </dt>
                <dd className="text-[1rem] leading-[1.6] text-kinome-black">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cofondateurs */}
      <section className="px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Cofondateurs
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {founders.map((f) => (
              <article
                key={f.name}
                className="rounded-[20px] bg-white p-[clamp(30px,4vw,60px)]"
              >
                <h3 className="mb-2 font-heading text-[clamp(22px,2vw,30px)] font-bold leading-[1.2] text-kinome-black">
                  {f.name}
                </h3>
                <p className="mb-5 font-heading text-[0.95rem] font-light italic text-kinome-grey">
                  {f.role}
                </p>
                <p className="mb-6 font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.65] text-kinome-dark">
                  {f.bio}
                </p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-[0.95rem] font-bold underline-offset-4 hover:underline"
                >
                  Profil LinkedIn →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs servis */}
      <section className="bg-white px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Secteurs servis (avec exemples)
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sectors.map((s) => (
              <article
                key={s.name}
                className="rounded-[20px] border border-kinome-black/8 p-8"
              >
                <h3 className="mb-3 font-heading text-[1.2rem] font-semibold text-kinome-black">
                  {s.name}
                </h3>
                <p className="font-body text-[0.95rem] font-light leading-[1.6] text-kinome-grey">
                  {s.examples.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logos téléchargeables */}
      <section className="px-[5%] py-[clamp(50px,10vw,100px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1] text-kinome-black">
            Logos téléchargeables
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[20px] bg-kinome-dark p-12 text-center">
              <img
                src="/assets/logo-kinome.svg"
                alt="Logo complet Kinome (cream sur fond sombre)"
                className="mx-auto mb-8 block h-auto w-full max-w-[280px] [filter:invert(0)] brightness-0 invert"
              />
              <a
                href="/assets/logo-kinome.svg"
                download
                className="inline-block rounded-full bg-white px-6 py-3 font-heading text-[0.95rem] font-semibold text-kinome-black transition-transform hover:scale-105"
              >
                Télécharger SVG
              </a>
            </div>
            <div className="rounded-[20px] bg-kinome-dark p-12 text-center">
              <img
                src="/assets/logo-symbole.svg"
                alt="Symbole seul Kinome"
                className="mx-auto mb-8 block h-auto w-[140px] brightness-0 invert"
              />
              <a
                href="/assets/logo-symbole.svg"
                download
                className="inline-block rounded-full bg-white px-6 py-3 font-heading text-[0.95rem] font-semibold text-kinome-black transition-transform hover:scale-105"
              >
                Télécharger SVG
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact presse */}
      <section className="bg-kinome-dark px-[5%] py-[clamp(50px,10vw,100px)] text-kinome-cream">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-4 font-heading text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-kinome-accent">
            Contact presse
          </p>
          <h2 className="mb-8 font-heading text-[clamp(28px,4vw,52px)] font-normal leading-[1.1]">
            Une question, une interview,
            <br className="hidden md:inline" />
            une demande de visuel&nbsp;?
          </h2>
          <p className="mx-auto mb-10 max-w-[640px] font-body text-[clamp(16px,1.2vw,18px)] font-light leading-[1.65] text-kinome-cream/80">
            Mathias Igonenc gère les sollicitations presse et médias.
            Réponse sous 24 h ouvrées.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
            <a
              href={`mailto:${BUSINESS.email}?subject=Demande presse — Agence Kinome`}
              className="font-heading text-[clamp(16px,1.2vw,18px)] font-bold underline-offset-4 hover:underline"
            >
              {BUSINESS.email}
            </a>
            <span aria-hidden="true" className="text-kinome-cream/30">·</span>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="font-heading text-[clamp(16px,1.2vw,18px)] font-bold underline-offset-4 hover:underline"
            >
              {BUSINESS.phone}
            </a>
          </div>
          <div className="mt-12">
            <Link
              href="/a-propos/"
              className="inline-block btn-fill-accent rounded-full bg-kinome-accent px-8 py-4 font-heading text-[1rem] font-semibold text-white transition-transform hover:scale-105"
            >
              <span className="relative z-10">En savoir plus sur l&rsquo;équipe</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
