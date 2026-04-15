import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { LogoGallerySection } from "@/components/sections/logo-gallery";
import { ContactSection } from "@/components/sections/contact";
import { MainNav } from "@/components/sections/navbar";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Noro Studio",
        url: siteUrl,
        inLanguage: "lt-LT",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
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
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-400">
        <div className="container-main flex flex-col items-center justify-between gap-3 sm:flex-row">
          <span>© {new Date().getFullYear()} Noro Studio. Visos teisės saugomos.</span>
          <span className="text-slate-500">
            Sukurta su Next.js & Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}

