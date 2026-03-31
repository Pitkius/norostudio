import { readdir } from "fs/promises";
import path from "path";
import { Container } from "@/components/ui";
import { MotionReveal } from "@/components/motion-reveal";
import { LogoGalleryGrid } from "@/components/logo-gallery-grid";

type LogoItem = {
  name: string;
  src: string;
};

async function getLogoItems(): Promise<LogoItem[]> {
  try {
    const logosDir = path.join(process.cwd(), "public", "logos");
    const files = await readdir(logosDir);
    const allowed = files.filter((file) => /\.(svg|png|jpe?g|webp)$/i.test(file));
    if (allowed.length === 0) return [];

    return allowed.slice(0, 24).map((file, idx) => ({
      name: `Logo ${String(idx + 1).padStart(2, "0")}`,
      src: `/logos/${file}`
    }));
  } catch {
    return [];
  }
}

const fallbackLogos: LogoItem[] = [
  { name: "Noro Studio", src: "/logo/Logo.svg" },
  { name: "Monograma", src: "/logo/Logo.svg" },
  { name: "Brand Mark", src: "/logo/Logo.svg" }
];

export async function LogoGallerySection() {
  const dbLikeLogos = await getLogoItems();
  const logos = dbLikeLogos.length > 0 ? dbLikeLogos : fallbackLogos;

  return (
    <Container id="logos">
      <div className="space-y-10">
        <MotionReveal>
          <div className="space-y-3">
            <h2 className="section-title">Logotipų galerija</h2>
            <p className="section-subtitle">Pavyzdiniai logotipai</p>
          </div>
        </MotionReveal>

        <MotionReveal>
          <LogoGalleryGrid logos={logos} />
        </MotionReveal>
      </div>
    </Container>
  );
}
