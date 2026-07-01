export type Categorie = "identite" | "campagne" | "website" | "branding";

export type Projet = {
  slug: string;
  nom: string;
  client: string;
  categories: Categorie[];
  cover: string;
  heroImage?: string;
  resume: string;
  annee: string;
  domaine?: string;
  role?: string;
  description?: string;
  pointFortTitle?: string;
  pointFortBody?: string;
  gallery?: string[];
  siteUrl?: string;
  // --- Traductions anglaises (optionnelles, fallback vers FR si absentes) ---
  resume_en?: string;
  domaine_en?: string;
  role_en?: string;
  description_en?: string;
  pointFortTitle_en?: string;
  pointFortBody_en?: string;
  /** Avis client optionnel — affiché dans le bloc « Ils nous font confiance »
   *  de la page projet. Si absent, le bloc affiche l'avis par défaut. */
  testimonial?: ProjetTestimonial;
};

/** Avis client rattaché à un projet. */
export type ProjetTestimonial = {
  quote: string;
  /** Traduction anglaise (fallback FR si absente). */
  quote_en?: string;
  name: string;
  company: string;
  image: string;
  alt: string;
};

export const projets: Projet[] = [
  {
    slug: "tampon-audition",
    nom: "Tampon Audition",
    client: "Tampon Audition",
    categories: ["identite", "branding"],
    cover: "/assets/projets/tampon-audition/hero.jpg",
    heroImage: "/assets/projets/tampon-audition/hero.jpg",
    resume:
      "Identité visuelle moderne et évocatrice pour un centre de prothèses auditives à La Réunion, ancrée dans son territoire.",
    annee: "2026",
    domaine: "Identité",
    role: "Création",
    description:
      "Tampon Audition, spécialiste des solutions auditives au Tampon, à La Réunion, souhaite mettre en avant son ancrage local et la richesse de son territoire. Nous avons développé une identité visuelle moderne, illustrative et évocatrice, reflétant proximité, confiance et accompagnement, pour offrir une expérience claire, rassurante et chaleureuse.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "L'identité visuelle de Tampon Audition s'inspire de l'écoute, de la proximité et de l'ancrage réunionnais. Le logo associe une représentation subtile de l'oreille à une ligne sonore évoquant le mouvement, la précision et la qualité d'écoute. Les formes douces et contemporaines renforcent une image rassurante et accessible, tandis que l'univers graphique traduit un accompagnement humain, moderne et local.",
    gallery: [
      "/assets/projets/tampon-audition/concept.png",
      "/assets/projets/tampon-audition/carte.jpg",
      "/assets/projets/tampon-audition/enseigne.jpg",
      "/assets/projets/tampon-audition/blouse.jpg",
      "/assets/projets/tampon-audition/pochettes.jpg",
      "/assets/projets/tampon-audition/moodboard.jpg",
    ],
    resume_en:
      "Modern, evocative visual identity for a hearing-care centre in Réunion, rooted in its local territory.",
    domaine_en: "Identity",
    role_en: "Creation",
    description_en:
      "Tampon Audition, a hearing-solutions specialist based in Le Tampon, Réunion, wanted to highlight its local roots and the richness of its territory. We developed a modern, illustrative and evocative visual identity reflecting closeness, trust and support, to deliver a clear, reassuring and warm experience.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "Tampon Audition's visual identity draws on listening, closeness and Réunion roots. The logo pairs a subtle representation of the ear with a sound line evoking movement, precision and hearing quality. Soft, contemporary shapes reinforce a reassuring, accessible image, while the graphic world conveys human, modern and local care.",
  },
  {
    slug: "codecircle",
    nom: "Codecircle",
    client: "Codecircle",
    categories: ["identite", "branding"],
    cover: "/assets/projets/codecircle/1.png",
    heroImage: "/assets/projets/codecircle/1.png",
    resume:
      "Identité sobre et élégante pour une agence de développement web qui veut laisser ses projets clients s'exprimer.",
    annee: "2024",
    domaine: "Logo",
    role: "Branding",
    description:
      "Codecircle est une agence de développement web qui accompagne ses clients dans la conception et la réalisation de projets digitaux complets, de A à Z. Elle propose des solutions clé en main, alliant performance et expérience utilisateur, afin de créer des sites web sur mesure, adaptés aux besoins spécifiques de chaque activité. L'agence intègre également des outils innovants basés sur l'intelligence artificielle pour optimiser les processus et offrir des fonctionnalités avancées.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "L'entreprise est une agence web, reflétant à elle seule une diversité de projets aux univers variés, colorés et dotés de leurs propres identités graphiques. Afin de ne pas s'imposer visuellement au détriment de son portfolio, le choix s'est porté sur une identité sobre et élégante, en concentrant l'essentiel du travail créatif sur la conception du logo.",
    gallery: [
      "/assets/projets/codecircle/2.png",
      "/assets/projets/codecircle/3.png",
      "/assets/projets/codecircle/4.png",
      "/assets/projets/codecircle/5.png",
      "/assets/projets/codecircle/6.png",
    ],
    siteUrl: "https://codecircle.fr",
    resume_en:
      "Sober, elegant identity for a web development studio that prefers to let its client projects shine.",
    domaine_en: "Logo",
    role_en: "Branding",
    description_en:
      "Codecircle is a web development studio that supports its clients in designing and delivering complete digital projects, from A to Z. The team builds turnkey, performance-focused websites tailored to each business, and integrates AI-powered tools to streamline processes and unlock advanced features.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "As a web agency, Codecircle handles a wide variety of projects, each with its own visual world. To avoid competing visually with the portfolio, we opted for a sober, elegant identity, with most of the creative energy concentrated on the logo itself.",
  },
  {
    slug: "adapt-project",
    nom: "Adapt Project",
    client: "Adapt Project",
    categories: ["identite", "branding"],
    cover:
      "/assets/wp/Adapt-Project-780x390px-1.png",
    heroImage: "/assets/projets/adapt-project/1.png",
    resume:
      "Identité originale aux teintes chaudes pour un cabinet d'assistance à maîtrise d'ouvrage.",
    annee: "2024",
    domaine: "Identité",
    role: "Branding / Logo",
    description:
      "Adapt Project est une entreprise implantée à Thônex en Suisse, active en Suisse romande, et spécialisée dans l'assistance à maîtrise d'ouvrage. Elle accompagne les entreprises dans la gestion et la réalisation de leurs projets internes, de la phase de cadrage à la mise en œuvre. Pour représenter cette structure, nous avons conçu un logo aux teintes chaudes et douces, alliant impact visuel et stabilité. Ce design reflète à la fois la rigueur et le professionnalisme de l'entreprise.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Adapt Project se distingue par une identité originale, à la fois symbolique et abstraite. Nous avons eu l'opportunité de développer une palette de couleurs qui s'éloigne des codes traditionnels du secteur du conseil. Le logo a été pensé comme un tracé unique et affirmé, évoquant presque un kanji japonais. La couleur, chaleureuse et vibrante, vient renforcer cette singularité et contribue à établir une identité forte.",
    gallery: [
      "/assets/projets/adapt-project/2.png",
      "/assets/projets/adapt-project/3.png",
      "/assets/projets/adapt-project/4.png",
      "/assets/projets/adapt-project/5.png",
      "/assets/projets/adapt-project/6.png",
    ],
    // siteUrl temporairement masqué — Adapt Project est en refonte (mai 2026).
    // Le domaine adaptproject.ch retourne 503 sur /en-maintenance/. À
    // ré-activer quand le nouveau site sera en ligne.
    // siteUrl: "https://adaptproject.ch",
    resume_en:
      "Bold identity with warm hues for a consultancy specialised in project ownership assistance.",
    domaine_en: "Identity",
    role_en: "Branding / Logo",
    description_en:
      "Adapt Project is a Swiss company based in Thônex, active across French-speaking Switzerland, specialised in project ownership assistance. It supports companies through the framing and delivery of their internal projects. We designed a logo with warm, soft hues, balancing visual impact and stability — reflecting the firm's rigour and professionalism.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "Adapt Project stands out through a distinctive identity, both symbolic and abstract. We had the opportunity to build a colour palette that breaks away from the conventional codes of the consulting industry. The logo was designed as a single, assertive stroke, almost reminiscent of a Japanese kanji. The warm, vibrant colour reinforces this singularity and helps establish a strong identity.",
  },
  {
    slug: "cabinet-faraday",
    nom: "Cabinet Faraday",
    client: "Cabinet Faraday",
    categories: ["identite", "branding"],
    cover:
      "/assets/wp/Cabinet-Faraday-780x390px-1.png",
    heroImage: "/assets/projets/cabinet-faraday/1.png",
    resume:
      "Identité chaleureuse aux teintes mexicaines pour un cabinet dentaire pédiatrique.",
    annee: "2024",
    domaine: "Identité",
    role: "Branding / Logo / Signalétique",
    description:
      "Le Cabinet Faraday est un défi créatif ! Tout en respectant la demande d'une identité cohérente avec les couleurs décidées pour habiller le cabinet, il fut nécessaire de développer une identité riche en couleurs chaleureuses (rappelant le Mexique) et sympathique pour les familles. Si l'image du cabinet paraît manuelle et accidentelle, le choix des couleurs est juste, et la construction globale de l'identité bien construite.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Une palette de couleurs vives et une identité à la fois chaleureuse, festive et brute ont été pensées pour habiller un espace richement coloré, tout en préservant le standing attendu par une clientèle issue des beaux quartiers parisiens. Une attention particulière a été portée à la cible de notre cliente ainsi qu'à son souhait d'évoquer l'ambiance des haciendas dans l'univers de marque. Le logo incarne cette intention avec une typographie expressive, aux formes brutes et aux teintes éclatantes.",
    gallery: [
      "/assets/projets/cabinet-faraday/2.png",
      "/assets/projets/cabinet-faraday/3.png",
      "/assets/projets/cabinet-faraday/4.png",
      "/assets/projets/cabinet-faraday/5.png",
      "/assets/projets/cabinet-faraday/6.png",
    ],
    siteUrl: "https://cabinetfaraday.fr",
    resume_en:
      "Warm identity with Mexican-inspired tones for a paediatric dental practice.",
    domaine_en: "Identity",
    role_en: "Branding / Logo / Signage",
    description_en:
      "Cabinet Faraday was a creative challenge! While staying true to a brand identity consistent with the chosen colours for the practice's space, we had to design an identity rich in warm, Mexican-inspired hues — welcoming for families. The visual look may feel hand-drawn and spontaneous, but the colour choices are precise and the overall structure carefully built.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "A vibrant colour palette and an identity that is warm, festive and raw at the same time were designed to dress a richly coloured space, while preserving the standing expected by a clientele from upscale Parisian neighbourhoods. Particular attention was paid to our client's target audience and her wish to evoke the atmosphere of haciendas in her brand world. The logo embodies this intent with expressive typography, raw forms and dazzling hues.",
    testimonial: {
      quote:
        "Un grand merci à Tanguy, de l'agence Kinome, qui m'a accompagnée et guidée dans la création de l'image de mon cabinet d'odontologie pédiatrique. Disponible, efficace, patient et passionné, il possède toutes les qualités nécessaires pour aider à faire aboutir un projet de création.",
      quote_en:
        "A heartfelt thank you to Tanguy, from agency Kinome, who supported and guided me in creating the visual identity of my paediatric dentistry practice. Available, efficient, patient and passionate, he has every quality needed to help bring a creative project to life.",
      name: "Dre Esther Attal Surman",
      company: "Cabinet Faraday",
      image: "/assets/wp/Cabinet-Faraday-780x390px-1.png",
      alt: "Cabinet Faraday — projet d'identité visuelle",
    },
  },
  {
    slug: "alministratif",
    nom: "Alministratif",
    client: "Alministratif",
    categories: ["identite"],
    cover:
      "/assets/wp/Alministratif-780x390px-1.png",
    heroImage: "/assets/projets/alministratif/1.png",
    resume:
      "Logo abeille turquoise pour rendre l'administration plus chaleureuse.",
    annee: "2023",
    domaine: "Identité",
    role: "Logo",
    description:
      "Alministratif est une entreprise spécialisée en accompagnement, conseil et gestion de démarches administratives. Le souhait de sa responsable était de mettre en valeur l'abeille « bûcheuse et persévérante », comme symbole et mascotte de l'entreprise. L'objectif ? Rendre la définition même de l'administration plus attrayante, chaleureuse, et sympathique.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Ce logo présente une identité visuelle moderne et épurée, jouant sur un contraste marqué entre un bleu turquoise vif et un blanc pur, ce qui lui confère à la fois dynamisme et lisibilité. La forme générale du support est organique, légèrement asymétrique, ce qui rompt avec la rigidité des formes géométriques classiques et apporte une touche humaine et conviviale. Le symbole calligraphique stylisé et une typographie ronde en bas de casse, crée un équilibre entre fluidité et stabilité. L'utilisation du turquoise, couleur souvent associée à la clarté, la fiabilité et la fraîcheur, renforce l'idée de service professionnel tout en restant accueillant.",
    gallery: [
      "/assets/projets/alministratif/2.png",
      "/assets/projets/alministratif/3.png",
      "/assets/projets/alministratif/4.png",
      "/assets/projets/alministratif/5.png",
      "/assets/projets/alministratif/6.png",
    ],
    resume_en:
      "Turquoise bee logo designed to make administrative services feel warmer.",
    domaine_en: "Identity",
    role_en: "Logo",
    description_en:
      "Alministratif is a company specialised in supporting, advising on and handling administrative procedures. Its founder wanted to put the spotlight on the bee — hardworking and persevering — as the symbol and mascot of the company. The goal: to make the very idea of administration more appealing, warmer and friendlier.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "This logo features a modern, refined visual identity that plays on a strong contrast between a vivid turquoise blue and pure white, lending both energy and legibility. The overall shape is organic and slightly asymmetrical, breaking with the rigidity of classic geometry to introduce a human, welcoming touch. The stylised calligraphic symbol and the rounded lowercase typography create a balance between fluidity and stability. Turquoise — often associated with clarity, reliability and freshness — reinforces the sense of a professional yet approachable service.",
  },
  {
    slug: "authentik-peak",
    nom: "Authentik Peak",
    client: "Authentik Peak",
    categories: ["identite", "branding", "website"],
    cover:
      "/assets/wp/Authentik-Peak-780x390px-1.png",
    heroImage: "/assets/projets/authentik-peak/1.png",
    resume:
      "Identité-mascotte d'inspiration montagne pour un organisme de formation.",
    annee: "2025",
    domaine: "Identité",
    role: "Branding / Logo / Site internet",
    description:
      "Authentik Peak est un organisme de formation qui s'appuie sur l'univers de la montagne comme fil conducteur pédagogique. Ce cadre symbolique invite à explorer de nouveaux enjeux liés au management, à la dynamique d'équipe et à l'engagement professionnel. Le logo reflète cette vision à travers des couleurs marquées, à la fois apaisantes et rassurantes. L'ensemble du visuel transmet une sensation d'équilibre, de stabilité et de proximité.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Le logo d'Authentik Peak adopte une approche de type mascotte. L'idée était de créer un animal totem, à la fois symbole de l'activité du client et reflet de son environnement d'intervention. Les couleurs ont été choisies pour évoquer des sensations rassurantes, apaisantes et naturelles. L'identité globale se veut chaleureuse, accessible et facilement compréhensible par tous.",
    gallery: [
      "/assets/projets/authentik-peak/2.png",
      "/assets/projets/authentik-peak/3.png",
      "/assets/projets/authentik-peak/4.png",
      "/assets/projets/authentik-peak/5.png",
      "/assets/projets/authentik-peak/6.png",
    ],
    siteUrl: "https://authentikpeak.fr",
    resume_en:
      "Mountain-inspired mascot identity for a professional training organisation.",
    domaine_en: "Identity",
    role_en: "Branding / Logo / Website",
    description_en:
      "Authentik Peak is a training organisation that uses the mountain world as its educational backbone. This symbolic framework invites participants to explore new challenges around management, team dynamics and professional commitment. The logo reflects this vision through assertive yet calming and reassuring colours. The overall identity conveys a feeling of balance, stability and closeness.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "Authentik Peak's logo follows a mascot approach. The idea was to create a totem animal that is both a symbol of the client's activity and a reflection of the environment in which they operate. Colours were chosen to evoke reassuring, calming and natural sensations. The overall identity is warm, approachable and easy to understand for everyone.",
  },
  {
    slug: "la-voyagiste",
    nom: "La Voyagiste",
    client: "Manon Pichereau",
    categories: ["identite", "branding"],
    cover: "/assets/wp/La-Voyagist-780x390px-1.png",
    heroImage: "/assets/projets/la-voyagiste/hero.png",
    resume:
      "Logo élégant et solide pour une agence française de voyages romantiques de luxe.",
    annee: "2023",
    domaine: "Logo",
    role: "Branding",
    description:
      "La Voyagiste est une entreprise française d'organisation de voyages haut de gamme. L'entreprise propose à la carte des voyages romantiques de luxe, toujours dans le cadre des expériences exclusives à la française, locales et authentiques. Pour cette marque, j'ai pu réaliser un logo élégant et solide, à l'image du discours tenu par la marque.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Le logo de La Voyagiste Paris affirme une identité luxueuse et contemporaine. Le contraste entre le fond sombre et la typographie dorée crée un effet sophistiqué et haut de gamme. Les lettres épurées et espacées renforcent une impression d'élégance et de maîtrise. L'ensemble évoque un univers premium, tourné vers le voyage d'exception.",
    gallery: [
      "/assets/projets/la-voyagiste/2.png",
      "/assets/projets/la-voyagiste/3.png",
      "/assets/projets/la-voyagiste/4.png",
      "/assets/projets/la-voyagiste/5.png",
      "/assets/projets/la-voyagiste/6.png",
    ],
    siteUrl: "https://lavoyagisteparis.com",
    resume_en:
      "Elegant, solid logo for a French agency specialised in luxury romantic travel.",
    domaine_en: "Logo",
    role_en: "Branding",
    description_en:
      "La Voyagiste is a French high-end travel design company. The brand crafts bespoke luxury romantic getaways, always rooted in exclusive, local and authentic French experiences. For this brand, we designed an elegant and solid logo that mirrors the voice of the company.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "La Voyagiste Paris's logo asserts a luxurious, contemporary identity. The contrast between the dark background and the golden typography creates a sophisticated, premium effect. The clean, generously spaced letters reinforce a sense of elegance and mastery. The whole evokes a premium world dedicated to exceptional travel.",
  },
  {
    slug: "cinars",
    nom: "CINARS",
    client: "CINARS",
    categories: ["campagne", "branding"],
    cover: "/assets/projets/cinars/1.png",
    heroImage: "/assets/projets/cinars/1.png",
    resume:
      "Illustrations pour la saison 2024 du CINARS, organisme dédié aux arts de la scène québécois et canadiens.",
    annee: "2024",
    domaine: "Illustration",
    role: "Campagne",
    description:
      "Le CINARS est un organisme à but non lucratif dédié à la promotion et au rayonnement international des arts de la scène québécois et canadiens. Pour sa saison 2024, l'organisme a commandé deux illustrations principales : l'une mettant en scène des mains, en cohérence avec son univers graphique, et l'autre rassemblant les différents artistes invités de l'événement.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Pour ce projet, nous étions initialement partis sur une approche beaucoup plus illustrative, mettant en scène les intervenants et les artistes du festival. Toutefois, les orientations créatives ont été profondément revues par la direction en cours de processus. Le projet s'est alors recentré sur une représentation des mains des artistes, en s'inscrivant davantage dans l'identité visuelle du CINARS.",
    gallery: [
      "/assets/projets/cinars/2.png",
      "/assets/projets/cinars/3.png",
      "/assets/projets/cinars/4.png",
      "/assets/projets/cinars/5.png",
    ],
    resume_en:
      "Illustrations for the 2024 season of CINARS, an organisation dedicated to Québécois and Canadian performing arts.",
    domaine_en: "Illustration",
    role_en: "Campaign",
    description_en:
      "CINARS is a non-profit organisation dedicated to promoting Québécois and Canadian performing arts internationally. For its 2024 season, the organisation commissioned two main illustrations: one featuring hands, in line with its visual world, and another bringing together the various invited artists of the event.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "For this project, we initially set out with a much more illustrative approach, depicting the festival's speakers and artists. However, the creative direction was substantially revised by management mid-process. The project then refocused on a representation of the artists' hands, fitting more closely with CINARS's visual identity.",
  },
  {
    slug: "black-sheep-valley",
    nom: "Black Sheep Valley",
    client: "Black Sheep Valley",
    categories: ["identite", "branding"],
    cover: "/assets/projets/black-sheep-valley/1.png",
    heroImage: "/assets/projets/black-sheep-valley/1.png",
    resume:
      "Logo ludique et chaleureux pour un élevage canin familial du Tarn-Aveyron.",
    annee: "2023",
    domaine: "Logo",
    role: "Branding",
    description:
      "Blacksheep Valley est une entreprise familiale d'élevage canin basée entre le Tarn et l'Aveyron. Elle propose à sa clientèle deux types de races ; le Border Collie et le Berger des Shetlands. Cet élevage en développement constant souhaitait un logo à la hauteur de ses nouvelles offres. De nombreux supports de communication ont ainsi pu être produits à partir de ce rebranding.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Pour ce projet, l'ambiance se voulait à la fois ludique, chaleureuse et accessible. Notre cliente est arrivée avec une idée claire de son concept ainsi qu'une composition déjà imaginée. Nous l'avons accompagnée tout au long du processus en proposant de nombreux croquis préparatoires, afin d'aboutir à un résultat qui satisfait pleinement les deux parties.",
    gallery: [
      "/assets/projets/black-sheep-valley/2.png",
      "/assets/projets/black-sheep-valley/3.png",
      "/assets/projets/black-sheep-valley/4.png",
      "/assets/projets/black-sheep-valley/5.png",
      "/assets/projets/black-sheep-valley/6.png",
    ],
    siteUrl: "https://blacksheepvalley.com",
    resume_en:
      "Playful, warm logo for a family-run dog breeding farm between Tarn and Aveyron.",
    domaine_en: "Logo",
    role_en: "Branding",
    description_en:
      "Blacksheep Valley is a family-run dog breeding business based between Tarn and Aveyron. It offers two breeds to its clientele: the Border Collie and the Shetland Sheepdog. This growing breeder needed a logo worthy of its new offering. Many communication materials were then produced based on this rebranding.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "For this project, the mood was intended to be playful, warm and accessible. Our client came in with a clear vision of her concept and a composition already in mind. We supported her throughout the process with many preparatory sketches, ultimately reaching a result that fully satisfied both parties.",
  },
  {
    slug: "microclimat",
    nom: "Microclimat",
    client: "Microclimat",
    categories: ["identite", "branding"],
    cover: "/assets/projets/microclimat/1.png",
    heroImage: "/assets/projets/microclimat/hero.png",
    resume:
      "Logo poétique et naturel pour une agence d'architecture en Haute-Savoie.",
    annee: "2024",
    domaine: "Logo",
    role: "Branding",
    description:
      "Microclimat est une petite entreprise d'architecture basée en Haute-Savoie (France). Celle-ci souhaitait un logo illustratif, dans un esprit littéraire et poétique. Celui-ci est employé pour le site de l'entreprise, pour les réseaux sociaux et support de communication.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Le logo de Microclimat exprime une identité douce et naturelle. Le vert apaisant et le symbole mêlant arbre et architecture traduisent un équilibre harmonieux entre environnement et conception. La typographie fine et aérée renforce cette sensation de calme et de sensibilité. L'ensemble est élégant, cohérent et porteur d'une approche engagée et contemporaine.",
    gallery: [
      "/assets/projets/microclimat/2.png",
      "/assets/projets/microclimat/3.png",
      "/assets/projets/microclimat/4.png",
      "/assets/projets/microclimat/5.png",
    ],
    resume_en:
      "Poetic, natural logo for an architecture studio in Haute-Savoie.",
    domaine_en: "Logo",
    role_en: "Branding",
    description_en:
      "Microclimat is a small architecture studio based in Haute-Savoie (France). They wanted an illustrative logo with a literary, poetic spirit. It is used on the company's website, across social media and on their communication materials.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "Microclimat's logo expresses a soft, natural identity. The calming green and the symbol mixing tree and architecture translate a harmonious balance between environment and design. The thin, airy typography reinforces this feeling of calm and sensitivity. The whole is elegant, coherent and carries a contemporary, committed approach.",
  },
  {
    slug: "elips",
    nom: "Elips",
    client: "Elips",
    categories: ["identite", "branding"],
    cover: "/assets/projets/elips/1.png",
    heroImage: "/assets/projets/elips/1.png",
    resume:
      "Logo technologique en pixels pour une équipe d'experts en production visuelle 3D.",
    annee: "2023",
    domaine: "Logo",
    role: "Branding",
    description:
      "Elips est une équipe d'experts passionnés par la production visuelle 3D. Spécialisés dans la création et la vente de produits digitaux pour les professionnels, l'équipe propose une gamme de services allant de la création de visites VR photoréalistes ou basiques lisibles sur tous les supports, en passant par la création de perspectives 3D et de vidéos 3D.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Elips incarne une identité résolument technologique, contemporaine et moderne. À travers un jeu de pixels illustratifs formant un « E » majuscule, le concept vise à donner du relief à une forme qui semble, au premier regard, plane, mais qui se déploie pour révéler du volume. À l'image de son nom, l'intention est d'apporter une double lecture à cette forme, tout en conservant une simplicité qui évite tout effet anecdotique.",
    gallery: [
      "/assets/projets/elips/2.png",
      "/assets/projets/elips/3.png",
      "/assets/projets/elips/4.png",
      "/assets/projets/elips/5.png",
    ],
    siteUrl: "https://elips-3d.com",
    resume_en:
      "Pixel-based technological logo for a team of experts in 3D visual production.",
    domaine_en: "Logo",
    role_en: "Branding",
    description_en:
      "Elips is a team of experts passionate about 3D visual production. Specialised in the creation and sale of digital products for professionals, the team offers a range of services from photorealistic or lightweight VR tours readable on any device, to 3D perspectives and 3D videos.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "Elips embodies a resolutely technological, contemporary and modern identity. Through a play of illustrative pixels forming a capital E, the concept aims to bring relief to a shape that initially appears flat but unfolds to reveal depth. True to its name, the intention is to bring a dual reading to this form while keeping a simplicity that avoids any anecdotal effect.",
  },
  {
    slug: "le-ravenala",
    nom: "Le Ravenala",
    client: "Le Ravenala",
    categories: ["identite", "branding"],
    cover: "/assets/projets/le-ravenala/1.png",
    heroImage: "/assets/projets/le-ravenala/1.png",
    resume:
      "Identité élégante aux teintes corail pour un restaurant réunionnais et malgache à Lyon.",
    annee: "2024",
    domaine: "Logo",
    role: "Branding",
    description:
      "Le Ravenala est un restaurant à la cuisine réunionnaise et malgache ayant ouvert à Lyon (France) début 2024. J'ai pu réaliser le logo, ainsi que l'identité du restaurant selon les souhaits et attentes du client. Le client souhaitait des illustrations pour enrichir sa communication, tant pour ses rendus print (menus, sous-de-verre, etc.) que ses supports de communication digitale.",
    pointFortTitle: "Graphisme avec goût",
    pointFortBody:
      "Le logo dégage une identité élégante et raffinée. Le tracé fin et symétrique du symbole végétal évoque à la fois exotisme et précision, en écho à l'idée de voyage. La teinte corail apporte chaleur et gourmandise, tandis que la typographie serif affirme un positionnement chic et soigné. L'ensemble est harmonieux, évocateur et délicatement sophistiqué.",
    gallery: [
      "/assets/projets/le-ravenala/2.png",
      "/assets/projets/le-ravenala/3.png",
      "/assets/projets/le-ravenala/4.png",
      "/assets/projets/le-ravenala/5.png",
    ],
    resume_en:
      "Elegant identity with coral tones for a Réunion and Madagascan restaurant in Lyon.",
    domaine_en: "Logo",
    role_en: "Branding",
    description_en:
      "Le Ravenala is a Réunion and Madagascan restaurant that opened in Lyon (France) in early 2024. We designed the logo and the restaurant's overall identity in line with the client's wishes and expectations. The client wanted illustrations to enrich the brand's communication, both for print materials (menus, coasters, etc.) and digital channels.",
    pointFortTitle_en: "Tasteful graphic design",
    pointFortBody_en:
      "The logo gives off an elegant and refined identity. The thin, symmetrical lines of the plant symbol evoke both exoticism and precision, echoing the idea of travel. The coral hue brings warmth and indulgence, while the serif typography asserts a chic, polished positioning. The whole is harmonious, evocative and delicately sophisticated.",
  },
  {
    slug: "causerie-bot",
    nom: "Causerie Bot",
    client: "CauserieBot",
    categories: ["website", "branding"],
    cover: "/assets/projets/causerie-bot/1.png",
    heroImage: "/assets/projets/causerie-bot/1.png",
    resume:
      "Site et identité d'un SaaS français de chatbot IA conversationnel, alternative européenne à Intercom et Crisp.",
    annee: "2025",
    domaine: "Web-design",
    role: "Branding / Site internet",
    description:
      "CauserieBot est une solution SaaS française qui permet à n'importe quel site web d'intégrer en cinq minutes un assistant conversationnel intelligent. Le produit se positionne comme une alternative européenne et conforme RGPD aux outils américains comme Intercom, Tidio ou Crisp, avec une interface 100 % en français, un hébergement européen et le choix entre plusieurs modèles d'IA (GPT-4o, Claude, Gemini). Nous avons accompagné le projet sur la conception du site marketing et la déclinaison de son identité.",
    pointFortTitle: "Une identité claire pour un produit clair",
    pointFortBody:
      "Le défi : traduire visuellement une promesse de simplicité radicale (« lancez votre bot avant la fin de votre café »). La direction artistique mise sur une typographie franche, beaucoup d'air et un système d'icônes colorées qui guide le visiteur vers les fonctionnalités clés. Le ton, à la fois rassurant et un brin malicieux, transparaît dans chaque écran : on comprend en quelques secondes ce que fait l'outil et pourquoi le choisir.",
    gallery: [
      "/assets/projets/causerie-bot/2.png",
      "/assets/projets/causerie-bot/3.png",
      "/assets/projets/causerie-bot/4.png",
      "/assets/projets/causerie-bot/5.png",
      "/assets/projets/causerie-bot/6.png",
    ],
    siteUrl: "https://causeriebot.com",
    resume_en:
      "Website and brand identity for a French AI chatbot SaaS — the European, GDPR-friendly alternative to Intercom and Crisp.",
    domaine_en: "Web design",
    role_en: "Branding / Website",
    description_en:
      "CauserieBot is a French SaaS solution that lets any website embed a smart conversational assistant in five minutes. The product positions itself as a European, GDPR-compliant alternative to American tools like Intercom, Tidio or Crisp — with a fully French-language interface, European hosting and a choice between several AI models (GPT-4o, Claude, Gemini). We supported the project on the design of its marketing website and the rollout of its visual identity.",
    pointFortTitle_en: "A clear identity for a clear product",
    pointFortBody_en:
      "The challenge: visually translating a promise of radical simplicity (\"launch your bot before you finish your coffee\"). The art direction relies on bold typography, generous whitespace and a system of colourful icons that guide visitors to the key features. The tone — both reassuring and playfully mischievous — comes through on every screen: within seconds, you understand what the tool does and why you'd pick it.",
  },
  {
    slug: "lea-vigier",
    nom: "Léa Vigier",
    client: "Léa Vigier",
    categories: ["identite", "website"],
    cover: "/assets/projets/lea-vigier/1.png",
    heroImage: "/assets/projets/lea-vigier/1.png",
    resume:
      "Identité et site internet d'une aventurière et conférencière qui inspire au dépassement de soi et déstigmatise la santé mentale.",
    annee: "2024",
    domaine: "Web-design",
    role: "Branding / Site internet",
    description:
      "Léa Vigier est aventurière et conférencière. À travers ses expéditions extrêmes — dont son documentaire « 7000 m pour vaincre ma bipolarité » — elle partage un message de résilience et lutte contre la stigmatisation des troubles psychiques. Pour soutenir sa démarche, nous avons conçu une identité personnelle ainsi qu'un site qui accueille ses conférences, sa newsletter et ses contenus vidéo, et facilite la prise de contact des entreprises souhaitant l'inviter.",
    pointFortTitle: "Une identité au service du message",
    pointFortBody:
      "Le parti pris graphique est volontairement épuré pour laisser toute la place à la force du parcours de Léa. Un logotype sobre, une palette neutre et de grands visuels documentaires installent un climat à la fois sérieux et profondément humain. Le site lui donne une vitrine professionnelle où la puissance du témoignage peut s'exprimer sans distraction.",
    gallery: [
      "/assets/projets/lea-vigier/2.png",
      "/assets/projets/lea-vigier/3.png",
    ],
    siteUrl: "https://leavigier.com",
    resume_en:
      "Identity and website for an adventurer and keynote speaker who champions resilience and helps de-stigmatise mental health.",
    domaine_en: "Web design",
    role_en: "Branding / Website",
    description_en:
      "Léa Vigier is an adventurer and keynote speaker. Through her extreme expeditions — including her documentary \"7000 m to overcome my bipolar disorder\" — she shares a message of resilience and fights the stigma around mental health. To support her work, we designed a personal identity and a website that hosts her talks, newsletter and video content, and makes it easier for companies to get in touch and book her.",
    pointFortTitle_en: "An identity at the service of the message",
    pointFortBody_en:
      "The graphic stance is intentionally minimal, to leave all the room to the power of Léa's journey. A sober logotype, a neutral palette and large documentary visuals set a tone that is both serious and deeply human. The site offers her a professional stage where the strength of her testimony can be heard without distraction.",
  },
  {
    slug: "manaloa",
    nom: "Mana Loa Formations",
    client: "Mana Loa Formations",
    categories: ["branding", "identite"],
    cover: "/assets/projets/manaloa/1.png",
    heroImage: "/assets/projets/manaloa/1.png",
    resume:
      "Identité visuelle d'un centre de formation aux techniques de massage et au bien-être professionnel, basé en Savoie.",
    annee: "2024",
    domaine: "Branding",
    role: "Identité visuelle",
    description:
      "Mana Loa Formations est un organisme français spécialisé dans la transmission des techniques de massage : fondamentaux, massages neuro-musculaires, énergétiques (ayurvédique, balinais, hawaïen, shiatsu), beauté/bien-être, et ateliers d'« Alchimie du Toucher ». Fondé par Florence Igonenc, l'organisme forme à la fois des praticiens indépendants et des équipes de spas hôteliers et thalassothérapies, depuis ses bases d'Aix-les-Bains et Allevard-les-Bains. Notre mission a consisté à doter le projet d'une identité à la hauteur de son exigence pédagogique.",
    pointFortTitle: "Une identité ancrée dans le bien-être",
    pointFortBody:
      "Le système visuel s'inspire de l'eau, du souffle et des matières naturelles pour traduire l'approche holistique de Mana Loa. Les couleurs apaisantes, les courbes douces et la typographie sobre installent une atmosphère professionnelle et ressourçante. L'objectif : faire ressentir, dès le premier regard, l'authenticité et la qualité du programme de formation.",
    gallery: [
      "/assets/projets/manaloa/2.png",
      "/assets/projets/manaloa/3.png",
    ],
    siteUrl: "https://manaloa-formations.fr",
    resume_en:
      "Visual identity for a training centre specialised in massage techniques and professional wellbeing, based in Savoie.",
    domaine_en: "Branding",
    role_en: "Visual identity",
    description_en:
      "Mana Loa Formations is a French organisation specialised in passing on massage techniques: fundamentals, neuromuscular and energetic massages (Ayurvedic, Balinese, Hawaiian, shiatsu), beauty/wellbeing, and \"Alchemy of Touch\" workshops. Founded by Florence Igonenc, it trains both independent practitioners and teams from hotel spas and thalassotherapies, from its bases in Aix-les-Bains and Allevard-les-Bains. Our mission was to give the project an identity worthy of its pedagogical standards.",
    pointFortTitle_en: "An identity rooted in wellbeing",
    pointFortBody_en:
      "The visual system draws on water, breath and natural materials to translate Mana Loa's holistic approach. Calming colours, soft curves and a sober typography set a professional, restorative atmosphere. The goal: to convey, at first glance, the authenticity and quality of the training programme.",
  },
  {
    slug: "vp-conseils",
    nom: "VP Conseils",
    client: "VP Conseils Immo",
    categories: ["website", "identite"],
    cover: "/assets/projets/vp-conseils/1.png",
    heroImage: "/assets/projets/vp-conseils/1.png",
    resume:
      "Identité et site vitrine d'un cabinet de conseil immobilier et financier transfrontalier dédié aux frontaliers franco-suisses.",
    annee: "2024",
    domaine: "Web-design",
    role: "Branding / Site internet",
    description:
      "VP Conseils est un cabinet hybride immobilier et financier qui accompagne particuliers, frontaliers et investisseurs sur leurs opérations d'achat, de vente et de placement, avec une expertise particulière en fiscalité transfrontalière. Implanté en Haute-Savoie et au plus près de Genève, son fondateur Valentin Ponthet revendique une approche personnelle et disponible. Nous avons structuré son image de marque puis conçu et développé un site vitrine pensé comme un véritable outil de prospection.",
    pointFortTitle: "Une présence rassurante et locale",
    pointFortBody:
      "Le logo, construit autour d'un « V » minimaliste, pose une signature claire et premium. Le site se veut avant tout lisible : un parcours fluide guide le visiteur de l'estimation à la prise de rendez-vous, en passant par les expertises (achat, vente, investissement, conseil fiscal). La direction artistique soigne la confiance, indispensable dans l'immobilier, tout en préservant la chaleur d'un cabinet à taille humaine.",
    gallery: [
      "/assets/projets/vp-conseils/2.png",
      "/assets/projets/vp-conseils/3.png",
    ],
    siteUrl: "https://vpconseils-immo.com",
    resume_en:
      "Identity and showcase website for a cross-border real estate and financial advisory firm dedicated to French-Swiss cross-border workers.",
    domaine_en: "Web design",
    role_en: "Branding / Website",
    description_en:
      "VP Conseils is a hybrid real estate and financial advisory firm that supports individuals, cross-border workers and investors with their purchase, sale and investment operations, with particular expertise in cross-border taxation. Based in Haute-Savoie close to Geneva, founder Valentin Ponthet champions a personal, available approach. We structured his brand image and then designed and developed a showcase site built as a genuine prospecting tool.",
    pointFortTitle_en: "A reassuring, local presence",
    pointFortBody_en:
      "The logo, built around a minimalist V, establishes a clear, premium signature. The site is, above all, easy to read: a smooth journey takes visitors from valuation to booking a meeting, through the firm's areas of expertise (buying, selling, investment, tax advice). The art direction is built around trust — essential in real estate — while preserving the warmth of a human-scale firm.",
  },
  {
    slug: "no-code",
    nom: "NOCODE IA",
    client: "NOCODE IA",
    categories: ["website", "branding"],
    cover: "/assets/projets/no-code/1.png",
    heroImage: "/assets/projets/no-code/1.png",
    resume:
      "Site et identité d'un centre de formation IA et no-code basé à Toulouse, certifié Qualiopi.",
    annee: "2024",
    domaine: "Web-design",
    role: "Branding / Site internet",
    description:
      "NOCODE IA est un organisme de formation toulousain spécialisé dans l'intelligence artificielle et l'automatisation no-code. Au programme : 27 formations certifiées Qualiopi (ChatGPT, Claude, Copilot, N8N, Make…), des formations métier (juridique, RH, comptabilité, immobilier, santé), un accompagnement stratégique avec audit IA, ainsi qu'une activité d'agence créative et de création de SaaS sur-mesure. Nous avons posé l'identité de la structure puis conçu un site clair, conçu pour convaincre dirigeants, CODIR et professionnels d'engager leur transformation IA.",
    pointFortTitle: "Sans jargon, droit au but",
    pointFortBody:
      "La promesse de NOCODE IA tient en une phrase : un retour sur investissement concret, sans gadget ni complexité inutile. La direction artistique reflète ce parti pris : composition franche, hiérarchie typographique nette, mise en avant des chiffres clés (732 professionnels formés, 4,9/5, +80 sessions). Les logos des outils du marché sont assumés, l'agrément Qualiopi mis en avant — tout pour rassurer rapidement et déclencher la prise de contact.",
    gallery: [
      "/assets/projets/no-code/2.png",
      "/assets/projets/no-code/3.png",
      "/assets/projets/no-code/4.png",
      "/assets/projets/no-code/5.png",
      "/assets/projets/no-code/6.png",
    ],
    siteUrl: "https://nocodetoulouse.fr",
    resume_en:
      "Website and identity for a Toulouse-based AI and no-code training centre, Qualiopi-certified.",
    domaine_en: "Web design",
    role_en: "Branding / Website",
    description_en:
      "NOCODE IA is a Toulouse-based training organisation specialised in artificial intelligence and no-code automation. The programme: 27 Qualiopi-certified courses (ChatGPT, Claude, Copilot, N8N, Make…), industry-specific training (legal, HR, accounting, real estate, healthcare), strategic support with AI audits, plus a creative agency activity and bespoke SaaS creation. We set the brand's identity and then designed a clear site, built to convince executives, leadership teams and professionals to engage in their AI transformation.",
    pointFortTitle_en: "No jargon, straight to the point",
    pointFortBody_en:
      "NOCODE IA's promise can be stated in one sentence: a concrete return on investment, with no gimmicks or unnecessary complexity. The art direction mirrors that stance: bold composition, sharp typographic hierarchy, prominent key figures (732 professionals trained, 4.9/5, +80 sessions). The market's tool logos are owned, the Qualiopi accreditation showcased — everything to reassure visitors quickly and trigger the first contact.",
  },
];

export const categoriesLabels: Record<Categorie, string> = {
  identite: "Identités",
  campagne: "Campagnes",
  website: "Websites",
  branding: "Branding",
};
