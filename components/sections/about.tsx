import { Container } from "@/components/ui";
import { MotionReveal } from "@/components/motion-reveal";

export function AboutSection() {
  return (
    <Container id="about">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <MotionReveal className="space-y-4">
          <h2 className="section-title">Apie mane ir Noro studiją</h2>
          <p className="section-subtitle">
            Sveiki, mano vardas Pijus. Esu web kūrėjas ir verslo entuziastas, įkūręs „Noro studiją“ –
            studiją, kuri specializuojasi modernių interneto svetainių kūrime, portfolio ir verslo
            puslapiuose mažoms įmonėms bei freelancer‘iams Lietuvoje.
          </p>
          <p className="section-subtitle">
            Kiekvieną projektą kuriu individualiai: nuo interneto svetainių ir vizualinio identiteto
            iki aiškiai struktūruoto turinio ir SEO. Mano tikslas – kad jūsų verslas internete
            atrodytų profesionaliai, būtų lengvai randamas „Google“ ir pritrauktų daugiau klientų iš
            organinės paieškos.
          </p>
          <div className="grid gap-3 text-xs sm:grid-cols-2">
            <SkillPill title="Frontend" items={["React", "Next.js", "TypeScript", "Tailwind CSS"]} />
            <SkillPill title="Backend" items={["Node.js", "REST API", "PostgreSQL", "Prisma"]} />
            <SkillPill title="Kūryba" items={["Logotipai", "Vizualinis identitetas", "Posteriai", "Turinys"]} />
            <SkillPill title="Fokusas" items={["Kokybė", "Greitis", "SEO", "Realūs rezultatai"]} />
          </div>
        </MotionReveal>
        <MotionReveal delayMs={120} className="card space-y-4">
          <h3 className="text-sm font-semibold text-white">
            Mano darbo principai
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li>• Aiški komunikacija ir paprastas bendradarbiavimas</li>
            <li>• Šiuolaikiškas dizainas, kuris atrodo solidžiai ir parduoda</li>
            <li>• Greitas, atsakingas darbas su realiais terminais</li>
            <li>• Ilgalaikis požiūris: ne tik paleisti, bet padėti augti</li>
          </ul>
        </MotionReveal>
      </div>
    </Container>
  );
}

function SkillPill({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs">
      <p className="mb-1 font-medium text-white">{title}</p>
      <p className="text-[11px] text-slate-300">{items.join(" · ")}</p>
    </div>
  );
}

