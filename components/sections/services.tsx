"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui";
import { MotionReveal } from "@/components/motion-reveal";

const fallback = [
  {
    title: "Paprasta svetainė (1 puslapio)",
    description:
      "Greitas ir tvarkingas puslapis paslaugai, asmeniniam brandui ar mažam verslui.",
    price: "nuo 300 €",
    features: ["Modernus dizainas", "Mobilus + desktop", "Viena aiški struktūra", "Paleidimas internete"]
  },
  {
    title: "Verslo svetainė",
    description:
      "Keli puslapiai, kontaktų forma ir SEO pagrindai — kai reikia atrodyti solidžiai.",
    price: "nuo 500 €",
    features: ["Individualus dizainas", "Keli puslapiai", "Kontaktų forma", "SEO pagrindai"]
  },
  {
    title: "Web aplikacija",
    description:
      "Kai reikia sistemos: paskyrų, rezervacijų ar duomenų valdymo, ne tik vitrinos.",
    price: "nuo 1000 €",
    features: ["Prisijungimas", "Vartotojų paskyros", "Admin panelė", "Duomenų valdymas"]
  }
];

type ServiceItem = {
  title: string;
  description: string;
  price: string;
  features: string[];
};

export function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>(fallback);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/public/services", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!mounted || !res.ok || !data?.ok) return;
        const items = Array.isArray(data.services) ? data.services : [];
        if (items.length === 0) {
          setServices(fallback);
          return;
        }
        setServices(
          items.map((s: any) => ({
            title: s.title,
            description: s.description,
            price: s.price,
            features: Array.isArray(s.features) ? s.features : []
          }))
        );
      } catch {
        if (mounted) setServices(fallback);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container id="services">
      <div className="space-y-12">
        <MotionReveal className="max-w-2xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-copper">Paslaugos</p>
          <h2 className="section-title">Kainos ir planai</h2>
          <p className="section-subtitle">
            Orientaciniai paketai — galutinė kaina priklauso nuo apimties. Nežinote, ko reikia?
            Parašykite, pasiūlysiu tinkamiausią variantą.
          </p>
        </MotionReveal>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {services.map((service, i) => (
            <MotionReveal key={service.title} delayMs={i * 50}>
              <article className="grid gap-6 py-9 md:grid-cols-[1.2fr_1fr_auto] md:items-start md:gap-10">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl tracking-brand text-ink">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-mute">{service.description}</p>
                </div>
                <ul className="space-y-1.5 text-sm text-ink-soft">
                  {service.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <p className="font-display text-xl text-moss">{service.price}</p>
                  <a href="#contact" className="btn-outline py-2 text-xs">
                    Gauti pasiūlymą
                  </a>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
