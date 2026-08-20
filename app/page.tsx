import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { LogoGallerySection } from "@/components/sections/logo-gallery";
import { ContactSection } from "@/components/sections/contact";
import { MainNav } from "@/components/sections/navbar";

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Noro Studio",
        url: siteUrl,
        inLanguage: "lt-LT"
      },
      {
        "@type": "ProfessionalService",
        name: "Noro Studio",
        url: siteUrl,
        logo: `${siteUrl}/logo/Logo.svg`,
        image: `${siteUrl}/logo/Logo.svg`,
        description:
          "Kuriame modernias interneto svetaines ir portfolio sprendimus: dizainas, programavimas ir SEO optimizacija.",
        areaServed: "Lietuva",
        serviceType: [
          "Interneto svetainių kūrimas",
          "UI/UX dizainas",
          "SEO optimizacija",
          "Svetainių priežiūra"
        ]
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainNav />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <LogoGallerySection />
        <ContactSection />
      </main>
      <footer className="border-t border-ink/10 bg-ink text-paper-raised">
        <div className="container-main flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-3xl tracking-brand">Noro Studio</p>
            <p className="mt-2 text-sm text-paper-raised/60">Svetainės su charakteriu.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <a href="#contact" className="text-copper-soft hover:text-copper">
              Pradėti projektą →
            </a>
            <span className="text-paper-raised/45">
              © {new Date().getFullYear()} Visos teisės saugomos.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
