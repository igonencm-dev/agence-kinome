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
// Landing page de conversion (BOFU) — Service "Création de site internet".
// Cible transactionnelle ("création site internet Genève", "refonte site").
// Même squelette que le pilote /services/identite-visuelle/ : les articles
// informationnels du cluster web pointent ici. Server component → metadata.
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Création de site internet à Genève",
  description:
    "Agence web à Genève : sites vitrines et e-commerce rapides, élégants et pensés pour convertir. Refonte ou création, devis transparent, premier appel offert.",
  path: "/services/site-internet/",
  keywords: [
    "création site internet Genève",
    "agence web Genève",
    "refonte site internet Genève",
    "site vitrine PME Suisse romande",
  ],
});

const INCLUS = [
  {
    title: "Design sur-mesure",
    body: "Un site à votre image, pas un template vu partout : direction artistique, parcours utilisateur pensé pour vos clients et cohérence totale avec votre identité de marque.",
  },
  {
    title: "Développement moderne et rapide",
    body: "Next.js, Astro, WordPress ou Webflow selon votre besoin : un site rapide (Core Web Vitals au vert), sécurisé et facile à faire évoluer.",
  },
  {
    title: "SEO dès la conception",
    body: "Structure, balises, vitesse, données structurées : votre site est construit pour être trouvé sur Google et cité par les IA, pas optimisé après coup.",
  },
  {
    title: "Autonomie et formation",
    body: "Vous restez propriétaire de votre site et capable de le mettre à jour : formation à la prise en main et documentation claire incluses à la livraison.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Cadrage et objectifs",
    body: "On définit ce que le site doit accomplir : cible, parcours, pages clés, mesure du succès. Le design vient après la stratégie.",
  },
  {
    n: "02",
    title: "Arborescence et contenus",
    body: "Structure des pages, messages et textes optimisés SEO : le squelette qui guide vos visiteurs vers l'action.",
  },
  {
    n: "03",
    title: "Design UX/UI",
    body: "Maquettes desktop et mobile fidèles à votre identité. Vous validez chaque écran avant la moindre ligne de code.",
  },
  {
    n: "04",
    title: "Développement et SEO",
    body: "Intégration soignée, performance, référencement technique et tests sur tous les écrans.",
  },
  {
    n: "05",
    title: "Mise en ligne et accompagnement",
    body: "Lancement, formation à la prise en main, suivi post-lancement. Et on reste disponibles pour la suite.",
  },
];

const PRIX = [
  {
    type: "Site vitrine",
    desc: "4 à 8 pages pour présenter votre activité et convertir vos visiteurs.",
    price: "3 000 – 12 000 CHF",
  },
  {
    type: "Site e-commerce",
    desc: "Boutique en ligne complète : paiements suisses (TWINT), TVA, livraison.",
    price: "8 000 – 30 000 CHF",
  },
  {
    type: "Refonte de site",
    desc: "Audit, redesign et migration sans perdre votre référencement.",
    price: "dès 3 000 CHF",
  },
];

const PORTFOLIO = [
  { img: "/assets/projets/causerie-bot/1.png", alt: "Causerie Bot — site SaaS conçu par Kinome" },
  { img: "/assets/projets/lea-vigier/1.png", alt: "Léa Vigier — identité et site internet" },
  { img: "/assets/projets/no-code/1.png", alt: "NOCODE IA — site d'organisme de formation" },
];

const BLOG_LINKS = [
  { href: "/blog/creation-site-internet-geneve-guide/", label: "Création de site internet à Genève : le guide complet" },
  { href: "/blog/prix-site-internet-suisse-2026/", label: "Prix d'un site internet en Suisse : les vraies fourchettes" },
  { href: "/blog/wordpress-webflow-sur-mesure-comparatif/", label: "WordPress, Webflow ou sur-mesure : que choisir ?" },
  { href: "/blog/erreurs-refonte-site-web/", label: "Refonte : 6 erreurs à éviter (sans perdre son SEO)" },
  { href: "/blog/site-vitrine-vs-ecommerce/", label: "Site vitrine ou e-commerce : comment choisir ?" },
  { href: "/blog/creer-site-ecommerce-suisse/", label: "Créer un site e-commerce en Suisse : le guide" },
];

const FAQ = [
  {
    q: "Combien coûte un site internet à Genève ?",
    a: "Un site vitrine professionnel se situe entre 3 000 et 12 000 CHF selon le nombre de pages et le niveau de design. Un site e-commerce entre 8 000 et 30 000 CHF. Une refonte démarre autour de 3 000 CHF. Nous établissons toujours un devis transparent après un premier échange offert.",
  },
  {
    q: "Combien de temps faut-il pour créer un site ?",
    a: "Comptez 4 à 8 semaines pour un site vitrine et 8 à 16 semaines pour un e-commerce, selon le périmètre et votre réactivité sur les contenus et les validations. Un planning précis est posé dès le cadrage.",
  },
  {
    q: "Pouvez-vous refaire mon site internet existant ?",
    a: "Oui, la refonte est une part importante de notre activité : audit de l'existant, redesign aligné sur votre marque, migration technique et préservation de votre référencement (redirections, balises, positions acquises).",
  },
  {
    q: "WordPress, Webflow ou sur-mesure : que choisirez-vous pour mon site ?",
    a: "Cela dépend de votre besoin réel : autonomie de mise à jour, budget, fonctionnalités. Nous travaillons avec les deux mondes (CMS et sur-mesure Next.js ou Astro) et recommandons l'approche la plus simple qui remplit vos objectifs, pas la plus chère.",
  },
  {
    q: "Le référencement (SEO) est-il inclus ?",
    a: "Le SEO technique est inclus d'office : structure propre, vitesse, balises, données structurées, sitemap. Pour viser des positions concurrentielles, nous proposons aussi un accompagnement contenu et SEO local en continu.",
  },
];

export default function SiteInternetPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", url: `${SITE.url}/` },
    { name: "Services", url: `${SITE.url}/services/` },
    { name: "Site internet", url: `${SITE.url}/services/site-internet/` },
  ]);
  const service = serviceJsonLd(
    "Création de sites internet",
    "Conception de sites vitrines et e-commerce pour PME à Genève et en Suisse romande : design sur-mesure, développement moderne, SEO intégré et refonte sans perte de référencement."
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
            <span className="text-kinome-cream/80">Site internet</span>
          </nav>
          <span className="mb-5 inline-block rounded-full border border-kinome-cream/20 px-4 py-1.5 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-kinome-cream/80">
            Service · Web
          </span>
          <h1 className="mb-6 font-heading text-[clamp(34px,5.5vw,64px)] font-semibold leading-[1.05]">
            Création de site internet à Genève
          </h1>
          <p className="mx-auto mb-9 max-w-[640px] font-body text-[clamp(17px,1.5vw,21px)] font-light leading-[1.55] text-kinome-cream/85">
            Un site rapide, élégant et pensé pour convertir : vitrine ou
            e-commerce, on conçoit l&apos;outil qui travaille pour vous, en
            cohérence avec votre marque.
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
            Votre site devrait être votre meilleur commercial
          </h2>
          <p className="font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.7] text-kinome-grey">
            Un site lent, daté ou invisible sur Google vous coûte des clients
            chaque semaine, sans que vous le voyiez. À l&apos;inverse, un site
            clair, rapide et bien référencé travaille pour vous en continu : il
            rassure, il explique et il transforme les visites en demandes de
            devis. C&apos;est cet outil-là qu&apos;on construit.
          </p>
        </div>
      </section>

      {/* CE QUE NOUS CRÉONS */}
      <section className="bg-white px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-[clamp(36px,5vw,64px)] text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Ce que comprend votre site internet
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
            Pour le détail complet, consultez notre article sur les{" "}
            <Link
              href="/blog/prix-site-internet-suisse-2026/"
              className="text-kinome-accent underline underline-offset-2 hover:text-kinome-black"
            >
              prix d&apos;un site internet en Suisse
            </Link>
            .
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="px-[5%] py-[clamp(60px,9vw,110px)]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-[clamp(36px,5vw,56px)] text-center font-heading text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.15] text-kinome-black">
            Quelques sites que nous avons conçus
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
            Prêt à avoir un site qui travaille pour vous&nbsp;?
          </h2>
          <p className="mx-auto mb-9 max-w-[540px] font-body text-[clamp(16px,1.35vw,19px)] font-light leading-[1.6] text-kinome-cream/85">
            Diagnostic stratégique offert de 30 minutes, sans engagement : on
            cadre votre projet et on vous dit ce qui ferait sens dans votre
            cas.
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
