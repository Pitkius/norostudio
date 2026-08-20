import { Container } from "@/components/ui";
import { MotionReveal } from "@/components/motion-reveal";

export function AboutSection() {
  return (
    <Container id="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <MotionReveal className="space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-copper">Apie</p>
          <h2 className="section-title">
            Studija, kuri kuria svetaines{" "}
            <span className="text-moss">su charakteriu</span>
          </h2>
          <p className="section-subtitle text-lg">
            Sveiki — esu Pijus. Noro Studio — tai individualus dizainas, švarus kodas ir SEO,
            kad jūsų verslas internete atrodytų rimtai ir būtų randamas.
          </p>
        </MotionReveal>

        <MotionReveal delayMs={90} className="grid gap-0 self-end">
          {[
            ["01", "Frontend", "React · Next.js · TypeScript"],
            ["02", "Backend", "Node · API · PostgreSQL"],
            ["03", "Identitetas", "Logotipai · vizualas · turinys"]
          ].map(([num, title, text]) => (
            <div key={num} className="border-t border-ink/10 py-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-copper">{num}</span>
                <p className="font-display text-xl text-ink">{title}</p>
              </div>
              <p className="mt-1 pl-8 text-sm text-ink-mute">{text}</p>
            </div>
          ))}
        </MotionReveal>
      </div>
    </Container>
  );
}
