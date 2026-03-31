import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { LogoGallerySection } from "@/components/sections/logo-gallery";
import { ContactSection } from "@/components/sections/contact";
import { MainNav } from "@/components/sections/navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
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

