import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectGallery } from "@/components/project-gallery";

function normalizeProjectImageUrl(input: string) {
  const raw = input.trim().replace(/^[("'`\s]+|[)"'`\s]+$/g, "");
  if (raw === "") return "";
  if (raw.startsWith("/projects/suniukai-")) {
    return raw.replace("/projects/suniukai-", "/projects/suneliu-motelis-");
  }
  const kirpyklaMatch = raw.match(/^\/projects\/kirpykla-(\d{2})\.(png|jpe?g|webp)$/i);
  if (kirpyklaMatch) {
    return `/projects/kirpykla${Number(kirpyklaMatch[1])}.${kirpyklaMatch[2]}`;
  }
  return raw;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.portfolioProject.findFirst({
    where: { id, isPublished: true }
  });
  if (!project) return { title: "Projektas nerastas" };
  return {
    title: `${project.title} | Noro Studio Portfolio`,
    description: project.description
  };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.portfolioProject.findFirst({
    where: { id, isPublished: true }
  });

  if (!project) notFound();

  const images = project.images?.length
    ? project.images.map((src) => normalizeProjectImageUrl(src)).filter(Boolean)
    : [];
  const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && !project.liveUrl.startsWith("https://example");

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="container-main flex items-center justify-between py-4">
          <Link
            href="/#portfolio"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Atgal į portfolio
          </Link>
          <Link href="/" className="text-sm font-semibold text-white">
            Noro Studio
          </Link>
        </div>
      </header>

      <main className="container-main py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {project.description}
          </p>

          {project.technologies.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-indigo-400 hover:to-violet-400"
            >
              Atidaryti gyvai
              <span aria-hidden>↗</span>
            </a>
          )}

          {images.length > 0 ? (
            <div className="mt-12 space-y-6">
              <h2 className="text-lg font-semibold text-white">Galerija</h2>
              <ProjectGallery images={images} title={project.title} />
            </div>
          ) : (
            <p className="mt-12 text-sm text-slate-500">
              Nuotraukų dar nėra. Pridėkite per admin → Projektai → Nuotraukos URL.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
