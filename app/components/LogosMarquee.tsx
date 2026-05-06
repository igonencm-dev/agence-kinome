const LOGOS = [
  { src: "/assets/wp/Logo-Codecircle.svg", alt: "Codecircle" },
  { src: "/assets/wp/Logo-Black-Sheep-Valley.svg", alt: "Black Sheep Valley" },
  { src: "/assets/wp/Logo-Le-Saint-Placide.svg", alt: "Le Saint Placide" },
  { src: "/assets/wp/Logo-Adapt-Project.svg", alt: "Adapt Project" },
  { src: "/assets/wp/Logo-La-Voyagist.svg", alt: "La Voyagiste" },
  { src: "/assets/wp/Logo-Cabinet-Faraday.svg", alt: "Cabinet Faraday" },
  { src: "/assets/wp/Logo-Alministratif.svg", alt: "Alministratif" },
  { src: "/assets/wp/Logo-Authentik-Peak.svg", alt: "Authentik Peak" },
];

function LogosSet() {
  return (
    <div className="flex h-[200px] flex-shrink-0 items-center gap-[100px] px-[50px]">
      {LOGOS.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="block h-[140px] max-h-[140px] w-auto max-w-[420px] flex-shrink-0 object-contain opacity-80 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ))}
    </div>
  );
}

export default function LogosMarquee() {
  return (
    <section className="cursor-grab select-none overflow-hidden border-y border-kinome-grey/15 bg-kinome-cream py-[50px] active:cursor-grabbing">
      <div className="anim-marquee flex w-max">
        <LogosSet />
        <LogosSet />
      </div>
    </section>
  );
}
