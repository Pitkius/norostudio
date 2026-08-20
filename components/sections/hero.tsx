export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-paper-raised">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-copper sm:w-2" aria-hidden />

      <div className="container-main flex min-h-[calc(100svh-4.5rem)] flex-col justify-between gap-16 py-14 sm:py-16 lg:py-20">
        <div className="max-w-4xl pt-4">
          <p className="hero-copy text-[11px] font-semibold uppercase tracking-[0.26em] text-copper">
            Vilnius · web studio
          </p>
          <h1 className="hero-copy-delay mt-5 font-display text-[clamp(3.6rem,12vw,7.5rem)] leading-[0.88] tracking-brand text-ink">
            Noro Studio
          </h1>
          <p className="hero-copy-late mt-7 max-w-lg text-lg leading-relaxed text-ink-mute">
            Svetainės su charakteriu — dizainas, kodas ir SEO mažoms įmonėms Lietuvoje.
          </p>
          <div className="hero-copy-late mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#portfolio">
              Žiūrėti darbus
            </a>
            <a className="btn-outline" href="#contact">
              Pradėti projektą
            </a>
          </div>
        </div>

        <div className="hero-copy-late border-t border-ink/15 pt-8">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-copper">
            Ką kuriame
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {[
              ["01", "Dizainas", "Aiški struktūra ir vizualas"],
              ["02", "Kodas", "Greitas Next.js frontendas"],
              ["03", "SEO", "Kad rastų Google"],
              ["04", "Sistemos", "Rezervacijos ir admin"]
            ].map(([num, title, text]) => (
              <div key={num} className="border-l border-copper/50 pl-4">
                <p className="font-mono text-[11px] text-copper">{num}</p>
                <p className="mt-2 font-display text-2xl tracking-brand text-ink">{title}</p>
                <p className="mt-1 text-sm text-ink-mute">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
