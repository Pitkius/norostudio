import Link from "next/link";
import { Container } from "@/components/ui";
import { prisma } from "@/lib/db";
import { MotionReveal } from "@/components/motion-reveal";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  url: string;
};

const fallback: ProjectCardProps[] = [
  {
    id: "demo",
    title: "SaaS Analytics Dashboard",
    description: "Interaktyvi administravimo panelė su realaus laiko grafika ir ataskaitomis.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://example-saas-app.vercel.app"
  }
];

export async function PortfolioSection() {
  let fromDb: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    images: string[];
    liveUrl: string;
  }> = [];
  try {
    fromDb = await prisma.portfolioProject.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  } catch (error) {
    console.error("Failed to load portfolio projects from DB:", error);
  }
  const projects: ProjectCardProps[] =
    fromDb.length > 0
      ? fromDb.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          technologies: p.technologies,
          image: p.images?.[0] || fallback[0].image,
          url: p.liveUrl
        }))
      : fallback;

  return (
    <Container id="portfolio">
      <div className="space-y-10">
        <MotionReveal>
          <div className="space-y-3">
            <h2 className="section-title">Portfolio</h2>
            <p className="section-subtitle">
              Atrinkti projektai su moderniu UI/UX, orientuoti į konversiją, našumą ir premium
              vizualiką.
            </p>
          </div>
        </MotionReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <MotionReveal key={project.title} delayMs={idx * 90}>
              <ProjectCard {...project} large={idx % 3 === 0} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </Container>
  );
}

function ProjectCard({
  id,
  title,
  description,
  technologies,
  image,
  url,
  large
}: ProjectCardProps & { large?: boolean }) {
  const hasDetailPage = id !== "demo";
  const hasLiveSite = url && url !== "#" && !url.startsWith("https://example");
  return (
    <article className={["group h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/30 shadow-soft", large ? "md:col-span-2 lg:col-span-2" : ""].join(" ")}>
      <div className={["relative w-full overflow-hidden", large ? "h-72 md:h-80" : "h-64"].join(" ")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="chip text-[10px]">{tech}</span>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="min-h-[72px] text-sm text-slate-200/90">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          {hasDetailPage && (
            <Link
              href={`/projects/${id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition group-hover:translate-x-1 group-hover:border-indigo-300/80 group-hover:bg-indigo-500/25"
            >
              Detaliau ir galerija
              <span>→</span>
            </Link>
          )}
          {hasLiveSite && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-indigo-300/80 hover:text-white"
            >
              Atidaryti svetainę ↗
            </a>
          )}
          {!hasDetailPage && !hasLiveSite && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-400">
              Demo projektas
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

