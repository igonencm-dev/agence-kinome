/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Reveal from "../../components/Reveal";
import { type BlogPost } from "../../lib/blog";
import { jsonLdScript, SITE } from "../../lib/seo";
import VisionneuseVoeux from "./VisionneuseVoeux";

/**
 * Corps enrichi de l'article « Carte de vœux d'entreprise », d'après la
 * maquette Figma de Tanguy (node 2228:5486). Ce composant remplace le rendu
 * .blog-prose générique pour ce seul slug : sections numérotées comme sur les
 * pages services, cartes chiffres, rétroplanning, checklists à coche, citation
 * et CTA sombre. Le hero, la sidebar et « À lire aussi » restent ceux du
 * template commun.
 *
 * SEO/AEO : les H2 sont les questions de Tanguy (une intention de recherche
 * par section), la FAQ visible reprend exactement `post.faqs` (source du
 * JSON-LD FAQPage émis par le template), et les liens internes préservent le
 * maillage posé lors de la publication initiale (communication-360, charte
 * graphique, tendances design, services identité et réseaux sociaux).
 */

const H2 = "font-heading text-[clamp(26px,3.2vw,46px)] font-normal leading-[1.2] text-kinome-black";
const BODY = "font-body text-[clamp(16px,1.35vw,21px)] font-light leading-[1.6] text-kinome-black";
const NUM = "select-none font-body text-[clamp(40px,4.5vw,70px)] font-thin leading-none text-kinome-black";

/** Section numérotée : gros numéro à gauche (desktop), contenu à droite. */
function Section({
  numero,
  titre,
  id,
  children,
}: {
  numero: string;
  titre: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-[clamp(48px,6vw,90px)] scroll-mt-28">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(72px,96px)_1fr] md:gap-8">
        <Reveal effect="fade-left">
          <span aria-hidden="true" className={NUM}>
            {numero}
          </span>
        </Reveal>
        <div className="min-w-0">
          <Reveal>
            <h2 className={H2}>{titre}</h2>
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Ligne de checklist avec la coche dessinée par Tanguy. */
function Coche({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <img
        src="/assets/blog/coche-voeux.svg"
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        loading="lazy"
        className="mt-0.5 h-[clamp(28px,2.3vw,40px)] w-[clamp(28px,2.3vw,40px)] shrink-0"
      />
      <span className={BODY}>{children}</span>
    </li>
  );
}

const RETROPLANNING = [
  {
    periode: "Mi-septembre",
    titre: "Cadrage du concept",
    detail:
      "Définir le message clé de l'année, le ton souhaité et le format (carte imprimée, animation digitale, vidéo courte).",
  },
  {
    periode: "Octobre",
    titre: "Création & validation",
    detail:
      "Conception du visuel, allers-retours d'ajustement, validation finale du design et du texte.",
  },
  {
    periode: "Début novembre",
    titre: "Production",
    detail:
      "Impression et façonnage pour un support physique, ou finalisation technique pour un format digital.",
  },
  {
    periode: "Fin novembre à fin décembre",
    titre: "Envoi",
    detail:
      "Diffusion échelonnée avant les fêtes, pour être reçue au bon moment plutôt que dans la précipitation du 24 décembre.",
  },
];

const ATOUTS_CREATIF = [
  "Un concept qui vous ressemble, plutôt qu'un modèle générique déjà vu ailleurs.",
  "Une cohérence totale avec votre identité visuelle : couleurs, typographies, ton.",
  "Un choix de format adapté à votre audience (carte imprimée, e-carte animée, courte vidéo).",
  "Un accompagnement sur les délais d'impression et d'envoi, pour éviter les mauvaises surprises.",
  "Un message qui évite les formules toutes faites, pensé pour votre année et vos clients réels.",
];

/** JSON-LD VideoObject des deux vœux animés : éligibilité Google Vidéos. */
const VIDEOS_LD = [
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vœux animés La Voyagiste : Paris s'illumine",
    description:
      "Carte de vœux en motion design créée par l'agence Kinome pour La Voyagiste : les toits de Paris et la tour Eiffel s'illuminent d'un feu d'artifice.",
    thumbnailUrl: `${SITE.url}/assets/blog/voeux/poster-voeux-paris.webp`,
    contentUrl: `${SITE.url}/assets/blog/voeux/motion-voeux-la-voyagiste-paris.mp4`,
    uploadDate: "2026-08-18T20:45:00+02:00",
    duration: "PT20S",
    inLanguage: "fr",
    publisher: { "@id": `${SITE.url}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vœux animés La Voyagiste : la montgolfière au clair de lune",
    description:
      "Second vœu animé créé par Kinome pour La Voyagiste : une montgolfière survole la mer au clair de lune.",
    thumbnailUrl: `${SITE.url}/assets/blog/voeux/poster-voeux-montgolfiere.webp`,
    contentUrl: `${SITE.url}/assets/blog/voeux/motion-voeux-la-voyagiste-montgolfiere.mp4`,
    uploadDate: "2026-08-18T20:45:00+02:00",
    duration: "PT14S",
    inLanguage: "fr",
    publisher: { "@id": `${SITE.url}/#organization` },
  },
];

export default function CorpsCarteVoeux({ post }: { post: BlogPost }) {
  return (
    <div className="min-w-0">
      {VIDEOS_LD.map((v) => (
        <script
          key={v.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(v) }}
        />
      ))}
      {/* ------------------------------ Introduction ------------------------------ */}
      <Reveal>
        <p className={`${BODY} font-medium`}>
          Chaque année, la même question revient en novembre&nbsp;: «&nbsp;est-ce
          qu'on refait une carte de vœux&nbsp;?&nbsp;». Et chaque année, la
          réponse honnête est la même&nbsp;: oui, mais il aurait fallu commencer
          plus tôt.
        </p>
        <p className={`${BODY} mt-5`}>
          La carte de vœux d'entreprise a parfois mauvaise réputation, perçue
          comme une tradition datée face aux e-mails automatisés et aux stories
          Instagram. C'est pourtant l'inverse qui se produit&nbsp;: à l'heure où
          tout le monde envoie le même message générique au même moment, un
          geste pensé et bien exécuté se remarque immédiatement, précisément
          parce qu'il est devenu rare.
        </p>
      </Reveal>

      {/* ------------------------ 01 · Pourquoi ça a du sens ------------------------ */}
      <Section numero="01" id="pourquoi" titre="Pourquoi envoyer une carte de vœux a encore du sens">
        <Reveal delay={100}>
          <p className={`${BODY} mt-6`}>
            Une carte de vœux n'est pas qu'une formalité de fin d'année&nbsp;:
            c'est un point de contact avec vos clients, partenaires et équipes,
            à un moment où ils sont particulièrement réceptifs. C'est l'occasion
            de dire merci, de rappeler discrètement que vous existez, et de
            laisser une dernière impression positive avant de tourner la page
            sur l'année.
          </p>
          <p className={`${BODY} mt-5`}>
            Contrairement à une newsletter commerciale, la carte de vœux n'a
            rien à vendre&nbsp;: elle est reçue avec moins de méfiance, et
            davantage de considération. Ce climat de confiance en fait un
            support à part, difficile à recréer avec d'autres formats de{" "}
            <a
              href="https://agence-kinome.ch/blog/communication-360-geneve/"
              className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
            >
              communication
            </a>
            .
          </p>
        </Reveal>
        <div className="mt-[clamp(28px,4vw,48px)] grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              chiffre: "1/an",
              texte:
                "Un des rares moments où contacter l'ensemble de vos clients sans paraître commercial est parfaitement légitime.",
            },
            {
              chiffre: "Mémorable",
              texte:
                "Une carte soignée se distingue immédiatement dans un flux d'e-mails automatiques et de messages génériques.",
            },
            {
              chiffre: "Durable",
              texte:
                "Une carte imprimée reste visible sur un bureau pendant des semaines, contrairement à un e-mail vite archivé.",
            },
          ].map((c, i) => (
            <Reveal key={c.chiffre} delay={i * 120}>
              <div className="flex h-full flex-col items-center rounded-[20px] bg-white px-[clamp(18px,2vw,30px)] py-[clamp(28px,3.5vw,48px)] text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <p className="font-body text-[clamp(26px,2.6vw,44px)] font-light leading-[1.1] text-kinome-black">
                  {c.chiffre}
                </p>
                <p className="mt-4 font-body text-[clamp(14px,1.15vw,16.5px)] font-light leading-[1.55] text-kinome-black">
                  {c.texte}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------ 02 · S'y prendre tôt ------------------------ */}
      <Section numero="02" id="calendrier" titre="Pourquoi il faut s'y prendre tôt&nbsp;?">
        <Reveal delay={100}>
          <p className={`${BODY} mt-6`}>
            La carte de vœux est presque toujours pensée trop tard, coincée
            entre les bilans de fin d'année et les derniers dossiers à boucler
            avant les fêtes. Résultat&nbsp;: un visuel bricolé en urgence, ou
            une carte envoyée après le 31 décembre, ce qui en dit plus long sur
            votre organisation que sur votre attention portée au destinataire.
          </p>
          <p className={`${BODY} mt-5`}>
            Une bonne carte de vœux suit pourtant un calendrier précis, entre la
            réflexion créative, la validation, la production (impression ou
            animation) et l'envoi (postal ou digital). Anticiper, c'est se
            laisser le temps de faire les choses bien plutôt que de les faire
            vite.
          </p>
        </Reveal>
        {/* Rétroplanning : colonne période sombre + détail, comme la maquette. */}
        <Reveal delay={160}>
          <div className="mt-[clamp(28px,4vw,48px)] overflow-hidden rounded-[20px] border border-[#e0ddd6]">
            {RETROPLANNING.map((e, i) => (
              <div
                key={e.periode}
                className={`grid grid-cols-1 sm:grid-cols-[minmax(150px,205px)_1fr] ${
                  i > 0 ? "border-t border-[#e0ddd6]" : ""
                }`}
              >
                <div className="flex items-center justify-center bg-[#47453c] px-4 py-3 sm:py-6">
                  <p className="text-center font-body text-[clamp(12px,0.95vw,14px)] font-semibold uppercase tracking-[0.08em] leading-[1.4] text-white">
                    {e.periode}
                  </p>
                </div>
                <div className="bg-white px-[clamp(18px,2.2vw,34px)] py-[clamp(16px,1.8vw,26px)]">
                  <p className="font-body text-[clamp(15.5px,1.3vw,19px)] font-medium leading-[1.4] text-kinome-black">
                    {e.titre}
                  </p>
                  <p className="mt-1 font-body text-[clamp(14px,1.15vw,16.5px)] font-light leading-[1.55] text-kinome-grey">
                    {e.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className={`${BODY} mt-[clamp(24px,3vw,40px)]`}>
            En partant dès septembre, chaque étape dispose du temps nécessaire
            pour être soignée, sans course contre la montre ni compromis de
            dernière minute sur la qualité.
          </p>
        </Reveal>
      </Section>

      {/* ------------------ 03 · Se faire accompagner par un créatif ------------------ */}
      <Section
        numero="03"
        id="creatif"
        titre="Pourquoi se faire accompagner par un créatif change tout"
      >
        <Reveal delay={100}>
          <p className={`${BODY} mt-6`}>
            Une carte de vœux réalisée en interne, sur un coin de table avec les
            outils du bord, se voit presque toujours. Un visuel bricolé, une
            typographie mal choisie ou un message trop convenu produisent
            l'effet inverse de celui recherché&nbsp;: au lieu de valoriser votre
            marque, ils la banalisent.
          </p>
          <p className={`${BODY} mt-5`}>
            Un créatif apporte un regard extérieur et une exigence que l'urgence
            de fin d'année ne permet pas toujours en interne. Il traduit votre{" "}
            <a
              href="https://agence-kinome.ch/services/identite-visuelle/"
              className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
            >
              identité de marque
            </a>{" "}
            en un visuel cohérent avec le reste de votre communication, plutôt
            qu'un élément isolé qui jure avec votre logo ou votre site. C'est
            aussi ce regard qui permet de puiser dans les{" "}
            <a
              href="https://agence-kinome.ch/blog/tendances-design-graphique-2026/"
              className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
            >
              tendances graphiques du moment
            </a>{" "}
            sans les suivre aveuglément.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <blockquote className="mt-[clamp(24px,3vw,40px)] border-l-[3px] border-kinome-accent pl-[clamp(18px,2vw,28px)]">
            <p className={`${BODY} font-medium`}>
              «&nbsp;La différence entre une carte qu'on ouvre poliment et une
              carte qu'on garde affichée tout l'hiver, c'est souvent une semaine
              de travail créatif en amont.&nbsp;»
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-[clamp(28px,4vw,48px)] rounded-[20px] bg-white p-[clamp(24px,3vw,44px)] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <p className="font-body text-[clamp(17px,1.45vw,22px)] font-medium leading-[1.45] text-kinome-black">
              Ce qu'un accompagnement créatif apporte concrètement
            </p>
            <ul className="mt-[clamp(18px,2vw,28px)] flex flex-col gap-[clamp(14px,1.6vw,22px)]">
              {ATOUTS_CREATIF.map((a) => (
                <Coche key={a}>{a}</Coche>
              ))}
            </ul>
          </div>
        </Reveal>
        {/* ---------- Vitrine + visionneuse plein ecran ---------- */}
        <VisionneuseVoeux
          texteCartes={
            <Reveal delay={100}>
              <h3
                id="carte-kinome-2026"
                className="mt-[clamp(36px,5vw,64px)] scroll-mt-28 font-heading text-[clamp(20px,1.9vw,28px)] font-semibold leading-[1.3] text-kinome-black"
              >
                La carte Kinome 2026, par exemple
              </h3>
              <p className={`${BODY} mt-4`}>
                Notre propre carte pour 2026&nbsp;: un lettrage doré entrelacé
                sur papier violet profond, décliné de notre identité, imprimé
                sur un papier épais qu'on a envie de garder. Exactement le
                niveau de soin que nous mettons dans celles de nos clients.
                Cliquez sur les visuels pour les voir en plein écran.
              </p>
            </Reveal>
          }
          texteMotion={
            <Reveal delay={100}>
              <h3
                id="motion-design"
                className="mt-[clamp(36px,5vw,64px)] scroll-mt-28 font-heading text-[clamp(20px,1.9vw,28px)] font-semibold leading-[1.3] text-kinome-black"
              >
                Et en motion design&nbsp;: des vœux qui s'animent
              </h3>
              <p className={`${BODY} mt-4`}>
                Une carte peut aussi prendre vie. Pour{" "}
                <Link
                  href="/projets/la-voyagiste/"
                  className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
                >
                  La Voyagiste
                </Link>
                , nous avons animé les vœux en courtes séquences illustrées,
                partagées par e-mail et sur les réseaux&nbsp;: le format idéal
                pour toucher largement, en prolongement de la carte imprimée.
              </p>
            </Reveal>
          }
        />
      </Section>

      {/* ------------------------ 04 · Nos conseils ------------------------ */}
      <Section numero="04" id="conseils" titre="Nos conseils pour une carte de vœux réussie">
        <Reveal delay={100}>
          <ul className="mt-[clamp(24px,3vw,40px)] flex flex-col gap-[clamp(16px,1.8vw,26px)]">
            <Coche>
              Commencez la réflexion dès septembre, avant que l'agenda de fin
              d'année ne se remplisse.
            </Coche>
            <Coche>
              Choisissez un message sincère plutôt qu'une formule
              générique&nbsp;: parlez de votre année, pas juste du calendrier.
            </Coche>
            <Coche>
              Restez fidèle à votre{" "}
              <a
                href="https://agence-kinome.ch/blog/charte-graphique-pme-guide/"
                className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
              >
                charte graphique
              </a>
              &nbsp;: une carte de vœux n'est pas l'endroit pour improviser un
              nouveau style visuel.
            </Coche>
            <Coche>
              Pensez au format en fonction de votre audience&nbsp;: un client
              B2B n'attend pas la même chose qu'une communauté suivie sur les{" "}
              <a
                href="https://agence-kinome.ch/services/reseaux-sociaux/"
                className="underline decoration-kinome-accent underline-offset-4 hover:text-kinome-accent"
              >
                réseaux sociaux
              </a>
              .
            </Coche>
            <Coche>
              Prévoyez une marge de sécurité sur les délais de production et
              d'envoi, pour ne jamais arriver après les fêtes.
            </Coche>
          </ul>
        </Reveal>
      </Section>

      {/* ------------------------ FAQ (source du JSON-LD FAQPage) ------------------------ */}
      <section id="faq" className="mt-[clamp(48px,6vw,90px)] scroll-mt-28">
        <Reveal>
          <h2 className={H2}>Questions fréquentes</h2>
        </Reveal>
        <div className="mt-[clamp(20px,2.5vw,36px)] flex flex-col gap-[clamp(20px,2.5vw,32px)]">
          {post.faqs.map((f, i) => (
            <Reveal key={f.question} delay={i * 80}>
              <h3 className="font-heading text-[clamp(17px,1.5vw,22px)] font-semibold leading-[1.35] text-kinome-black">
                {f.question}
              </h3>
              <p className={`${BODY} mt-2`}>{f.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------ CTA sombre de la maquette ------------------------ */}
      <Reveal>
        <div className="mt-[clamp(48px,6vw,90px)] rounded-[20px] bg-kinome-dark px-[clamp(24px,4vw,60px)] py-[clamp(40px,5.5vw,80px)] text-center">
          <h2 className="mx-auto max-w-[640px] font-heading text-[clamp(24px,2.9vw,42px)] font-normal leading-[1.2] text-white">
            Une carte de vœux qui vous ressemble, cette année
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-body text-[clamp(15px,1.3vw,19px)] font-light leading-[1.55] text-white/85">
            Parlons-en dès maintenant&nbsp;: nous cadrons le concept avec vous
            et vous accompagnons jusqu'à l'envoi, sans course contre la montre
            en décembre.
          </p>
          <div className="mt-[clamp(24px,3vw,40px)]">
            <Link
              href="/contact/"
              className="btn-fill-accent inline-flex min-w-[260px] items-center justify-center rounded-full bg-white px-8 py-4 font-body text-[1rem] font-semibold text-kinome-black transition-transform duration-300 hover:scale-105 hover:text-white"
            >
              Démarrer ma carte de vœux
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Cross-sell « Explorer nos services » de la maquette, rendu pleine largeur
 * entre l'article et « À lire aussi ». Reprend le pattern des pages services
 * (icônes existantes, boîtes 92 px harmonisées, cartes blanches sur crème).
 */
const SERVICES_VOEUX = [
  {
    icon: "/assets/services/marque/service-marque.svg",
    titre: "Stratégie de marque",
    body: "Le positionnement et le ton de voix qui donnent du sens à chacun de vos contenus.",
    href: "/services/strategie-de-marque/",
  },
  {
    icon: "/assets/services/social/service-identite.svg",
    titre: "Identité visuelle",
    body: "Palette de couleurs, typographies, iconographie et règles d'usage : le système graphique complet de votre marque.",
    href: "/services/identite-visuelle/",
  },
  {
    icon: "/assets/services/logo/service-seo.svg",
    titre: "Référencement SEO",
    body: "Une stratégie de contenu et une structure technique pensées pour être identifié durablement dans les recherches Google.",
    href: "/services/referencement-naturel/",
  },
];

export function CrossSellVoeux() {
  return (
    <section className="bg-kinome-cream px-[5%] pb-[clamp(60px,9vw,110px)]">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-[clamp(16px,3vw,60px)] lg:grid-cols-2">
          <Reveal>
            <h2 className={H2}>Explorer nos services</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-body text-[clamp(15px,1.3vw,19px)] font-light leading-[1.55] text-kinome-black">
              Des contenus percutants s'appuient sur une marque claire et bien
              identifiée. Ces prestations renforcent la cohérence de votre
              présence en ligne.
            </p>
          </Reveal>
        </div>
        <div className="mt-[clamp(28px,4vw,56px)] grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SERVICES_VOEUX.map((s, i) => (
            <Reveal key={s.titre} delay={i * 120}>
              <div className="group flex h-full flex-col items-center rounded-[20px] bg-white px-[clamp(24px,3vw,48px)] py-[clamp(36px,4.5vw,64px)] text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)]">
                <img
                  src={s.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={92}
                  height={92}
                  className="mb-[clamp(20px,2.5vw,40px)] block h-[clamp(60px,5.8vw,92px)] w-[clamp(60px,5.8vw,92px)] object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="font-heading text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.3] text-kinome-black">
                  {s.titre}
                </h3>
                <p className="mt-[clamp(14px,1.8vw,28px)] flex-1 font-body text-[clamp(14px,1.15vw,16.5px)] font-light leading-[1.55] text-kinome-black">
                  {s.body}
                </p>
                <Link
                  href={s.href}
                  className="btn-fill-accent mt-[clamp(20px,2.5vw,36px)] inline-flex items-center justify-center rounded-full bg-kinome-black px-8 py-3.5 font-body text-[0.95rem] font-semibold text-white transition-transform duration-300 hover:scale-105"
                >
                  Découvrir le service
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
