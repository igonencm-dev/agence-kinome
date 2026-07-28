/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Testimonials from "../../components/Testimonials";
import {
  buildMetadata,
  serviceJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
  SITE,
} from "../../lib/seo";

// ---------------------------------------------------------------------------
// Landing page de conversion (BOFU) — Service "Identité visuelle & logo".
// Cible transactionnelle ("création identité visuelle / logo à Genève").
// Les articles de blog (informationnels) pointent vers cette page = pilier
// de conversion. Server component → exporte `metadata`.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Création d'identité visuelle & logo à Genève",
  description:
    "Agence d'identité visuelle à Genève : logo, charte graphique et stratégie de marque qui font ressortir votre PME. Devis transparent, premier appel offert.",
  path: "/services/identite-visuelle/",
  keywords: [
    "création identité visuelle Genève",
    "création de logo Genève",
    "agence branding Genève",
    "charte graphique entreprise",
  ],
});

const INCLUS = [
  {
    title: "Logo & déclinaisons",
    body: "Un logo distinctif, mémorable et fonctionnel sur tous les supports, livré dans toutes ses versions (couleur, noir, blanc, monochrome) et formats (vectoriels + raster).",
  },
  {
    title: "Charte graphique",
    body: "Palette de couleurs, typographies, iconographie, règles d'usage : le référentiel qui garantit la cohérence de votre marque dans le temps, pour vous et vos prestataires.",
  },
  {
    title: "Stratégie de marque",
    body: "Avant le visuel, le sens : positionnement, personnalité et messages clés. Une identité qui raconte vraiment qui vous êtes et vous distingue de vos concurrents.",
  },
  {
    title: "Déclinaisons clés",
    body: "Carte de visite, signature mail, templates réseaux sociaux, modèle de présentation : votre identité prête à l'emploi sur vos supports du quotidien.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Cadrage & immersion",
    body: "On comprend votre activité, votre cible, vos concurrents et vos ambitions. C'est la fondation de toute la suite.",
  },
  {
    n: "02",
    title: "Direction artistique",
    body: "2 à 3 pistes créatives distinctes, chacune argumentée stratégiquement. Vous choisissez celle qui résonne le plus.",
  },
  {
    n: "03",
    title: "Conception du système",
    body: "On affine la piste retenue au pixel près : logo finalisé, palette, typographies, iconographie, ton d'image.",
  },
  {
    n: "04",
    title: "Charte & déclinaisons",
    body: "On documente tout dans une charte claire et on décline l'identité sur vos supports clés.",
  },
  {
    n: "05",
    title: "Livraison & accompagnement",
    body: "Vous recevez tous les fichiers sources, et on vous accompagne sur le déploiement de votre nouvelle identité.",
  },
];

const PRIX = [
  {
    type: "Logo seul",
    desc: "Création de logo + déclinaisons de base.",
    price: "1 500 – 5 000 CHF",
  },
  {
    type: "Identité visuelle complète",
    desc: "Logo + charte graphique + déclinaisons clés.",
    price: "4 000 – 15 000 CHF",
  },
  {
    type: "Branding 360°",
    desc: "Stratégie de marque + identité + site internet + supports.",
    price: "dès 15 000 CHF",
  },
];

const PORTFOLIO = [
  { img: "/assets/wp/Cabinet-Faraday-780x390px-1.png", alt: "Cabinet Faraday — identité visuelle" },
  { img: "/assets/wp/Authentik-Peak-780x390px-1.png", alt: "Authentik Peak — identité visuelle" },
  { img: "/assets/wp/Adapt-Project-780x390px-1.png", alt: "Adapt Project — identité visuelle" },
];

const BLOG_LINKS = [
  { href: "/blog/etude-de-cas-logo-tampon-audition/", label: "Étude de cas concrète : le logo de Tampon Audition" },
  { href: "/blog/creer-identite-visuelle-entreprise-geneve/", label: "Créer une identité visuelle forte : le guide" },
  { href: "/blog/creation-logo-geneve-processus/", label: "Création de logo : processus et erreurs à éviter" },
  { href: "/blog/charte-graphique-pme-guide/", label: "La charte graphique expliquée" },
  { href: "/blog/strategie-branding-geneve/", label: "Stratégie de marque : le guide du branding" },
  { href: "/blog/refonte-identite-visuelle-quand-repenser-marque/", label: "Refonte d'identité : 6 signaux qu'il est temps" },
];

const FAQ = [
  {
    q: "Combien coûte une identité visuelle à Genève ?",
    a: "Pour un logo seul, comptez 1 500 à 5 000 CHF. Pour une identité visuelle complète (logo + charte graphique + déclinaisons), 4 000 à 15 000 CHF. Pour un branding 360° incluant la stratégie et le site internet, à partir de 15 000 CHF. Nous établissons toujours un devis transparent adapté à votre projet.",
  },
  {
    q: "Combien de temps faut-il pour créer une identité visuelle ?",
    a: "Comptez 3 à 6 semaines pour un logo, 6 à 12 semaines pour une identité visuelle complète avec charte graphique. Votre réactivité sur les validations influence le planning : un retour rapide fait gagner 1 à 2 semaines.",
  },
  {
    q: "Les fichiers sources m'appartiennent-ils ?",
    a: "Oui. À la livraison, vous recevez l'ensemble des fichiers vectoriels (AI, SVG, EPS) et raster (PNG, JPG), ainsi que votre charte graphique. Votre identité vous appartient entièrement — vous n'êtes dépendant de personne pour la faire évoluer.",
  },
  {
    q: "Travaillez-vous avec des entreprises hors de Genève ?",
    a: "Oui. Nous sommes basés à Genève (Thônex) et accompagnons des marques dans toute la Suisse romande, en France et à l'international. La majorité de nos échanges se font à distance, avec des points de contact réguliers.",
  },
  {
    q: "Faut-il une stratégie de marque avant le logo ?",
    a: "Idéalement, oui. Un logo posé sur une stratégie floue ne raconte rien. Nous commençons toujours par cadrer votre positionnement, même brièvement, pour que l'identité visuelle qui en découle ait du sens et vous différencie réellement.",
  },
];

export default function IdentiteVisuellePage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: `${SITE.url}/` },
    { name: "Services", url: `${SITE.url}/services/` },
    { name: "Identité visuelle", url: `${SITE.url}/services/identite-visuelle/` },
  ]);
  const service = serviceJsonLd(
    "Création d'identité visuelle et de logo",
    "Conception d'identités visuelles, logos et chartes graphiques pour PME à Genève et en Suisse romande : stratégie de marque, design sur-mesure et déclinaisons."
  );
  const faq = faqJsonLd(FAQ.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main className="bg-kinome-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faq) }}
      />

      {/* HERO */}
      <section className="bg-kinome-dark px-[5%] pt-[clamp(120px,16vw,180px)] pb-[clamp(60px,9vw,110px)] text-kinome-cream">
        <div className="mx-auto max-w-[900px] text-center">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 font-body text-[0.85rem] text-kinome-cream/55"
          >
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/services/" className="hover:text-white">Services</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-kinome-cream/80">Identité visuelle</span>
          </nav>
          <span className="mb-5 inline-block rounded-full border border-kinome-cream/20 px-4 py-1.5 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-kinome-cream/80">
            Service · Branding
          </span>
          <h1 className="mb-6 font-heading text-[clamp(34px,5.5vw,64px)] font-semibold leading-[1.05]">
            Création d&apos;identité visuelle &amp; logo à Genève
          </h1>
          <p className="mx-auto mb-9 max-w-[640px] font-body text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55] text-kinome-cream/85">
            On donne à votre PME une marque qui inspire confiance et vous
            distingue : logo, charte graphique et stratégie, alliant rigueur et
            émotion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-[1rem] font-bold text-black shadow-[0_6px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105"
            >
              Demander un devis
            </Link>
            <Link
              href="/portfolio/"
              className="inline-flex min-w-[240px] items-center justify-center rounded-full border-2 border-white/70 px-8 py-4 font-heading text-[1rem] font-bold text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* CONSTAT / PROBLÈME */}
      <section className="px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="mb-6 font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Votre travail est excellent. Votre marque le montre-t-elle&nbsp;?
          </h2>
          <p className="font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.7] text-kinome-grey">
            Un logo qui date, des supports incohérents, une image qui vous fait
            paraître plus petit que vous ne l&apos;êtes : une identité faible
            vous fait perdre des opportunités sans même que vous le sachiez. Une
            identité forte, à l&apos;inverse, installe la confiance dès le
            premier regard — et fait pencher la décision en votre faveur, à
            compétences égales.
          </p>
        </div>
      </section>

      {/* CE QUE NOUS CRÉONS */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-[clamp(36px,5vw,64px)] text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Ce que comprend votre identité visuelle
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {INCLUS.map((item) => (
              <div
                key={item.title}
                className="rounded-[20px] bg-kinome-cream p-8"
              >
                <h3 className="mb-3 font-heading text-[1.35rem] font-semibold text-kinome-black">
                  {item.title}
                </h3>
                <p className="font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-[clamp(36px,5vw,64px)] text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Notre processus, en 5 étapes
          </h2>
          <div className="space-y-5">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="flex gap-5 rounded-[18px] bg-white p-6 md:gap-8 md:p-8"
              >
                <div className="font-heading text-[clamp(28px,4vw,44px)] font-bold leading-none text-kinome-accent">
                  {step.n}
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-[1.25rem] font-semibold text-kinome-black">
                    {step.title}
                  </h3>
                  <p className="font-body text-[1rem] font-light leading-[1.6] text-kinome-grey">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-4 text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Un budget transparent
          </h2>
          <p className="mx-auto mb-[clamp(32px,4vw,52px)] max-w-[620px] text-center font-body text-[1.05rem] font-light leading-[1.6] text-kinome-grey">
            Des fourchettes claires, sans surprise. Le devis final dépend du
            périmètre exact, défini ensemble lors d&apos;un premier échange
            offert.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRIX.map((p) => (
              <div
                key={p.type}
                className="flex flex-col rounded-[20px] border border-kinome-black/10 bg-kinome-cream p-8 text-center"
              >
                <h3 className="mb-2 font-heading text-[1.25rem] font-semibold text-kinome-black">
                  {p.type}
                </h3>
                <p className="mb-5 flex-1 font-body text-[0.95rem] font-light leading-[1.55] text-kinome-grey">
                  {p.desc}
                </p>
                <div className="font-heading text-[1.2rem] font-bold text-kinome-accent">
                  {p.price}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-body text-[0.95rem] text-kinome-grey">
            Pour le détail, consultez notre{" "}
            <Link
              href="/blog/tarifs-agence-communication-geneve/"
              className="text-kinome-accent underline underline-offset-2 hover:text-kinome-black"
            >
              grille tarifaire complète
            </Link>
            .
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-[clamp(36px,5vw,56px)] text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Quelques marques que nous avons façonnées
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PORTFOLIO.map((p) => (
              <Link
                key={p.alt}
                href="/portfolio/"
                className="group block aspect-[16/9] overflow-hidden rounded-[18px] transition-transform duration-500 hover:scale-[1.02]"
              >
                <img
                  src={p.img}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/portfolio/"
              className="inline-flex items-center justify-center rounded-full bg-kinome-black px-8 py-4 font-heading text-[1rem] font-bold text-white transition-transform duration-300 hover:scale-105"
            >
              Voir tout le portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGE (composant partagé) */}
      <Testimonials />

      {/* POUR ALLER PLUS LOIN (maillage blog) */}
      <section className="px-[5%] py-[clamp(60px,9vw,100px)]">
        <div className="mx-auto max-w-[820px]">
          <h2 className="mb-8 text-center font-heading text-[clamp(24px,3vw,36px)] font-normal leading-[1.15] text-kinome-black">
            Pour aller plus loin
          </h2>
          <ul className="space-y-3">
            {BLOG_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-2 rounded-[14px] bg-white px-5 py-4 font-body text-[1.05rem] text-kinome-black transition-colors hover:bg-kinome-dark hover:text-white"
                >
                  <span aria-hidden="true" className="text-kinome-accent group-hover:text-white">→</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[820px]">
          <h2 className="mb-[clamp(32px,4vw,52px)] text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-kinome-black/10 pb-6">
                <h3 className="mb-2 font-heading text-[1.2rem] font-semibold text-kinome-black">
                  {f.q}
                </h3>
                <p className="font-body text-[1rem] font-light leading-[1.65] text-kinome-grey">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-kinome-dark px-[5%] py-[clamp(70px,10vw,120px)] text-center text-kinome-cream">
        <div className="mx-auto max-w-[720px]">
          <h2 className="mb-5 font-heading text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1]">
            Prêt à donner une vraie identité à votre marque&nbsp;?
          </h2>
          <p className="mx-auto mb-9 max-w-[540px] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.6] text-kinome-cream/85">
            Premier appel de 30 minutes offert, sans engagement, pour cadrer
            votre projet et vous dire ce qui ferait sens dans votre cas.
          </p>
          <Link
            href="/contact/"
            className="inline-flex min-w-[260px] items-center justify-center rounded-full bg-kinome-accent px-9 py-4 font-heading text-[1rem] font-bold text-white shadow-[0_8px_30px_rgba(224,64,52,0.35)] transition-transform duration-300 hover:scale-105"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </main>
  );
}
