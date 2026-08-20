import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma, withTimeout } from "@/lib/db";
import { asStringArray } from "@/lib/json-array";
import { getProjectFeatures, getProjectScreens } from "@/lib/project-features";

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
  params: { id: string };
}) {
  const project = await withTimeout(
    prisma.portfolioProject.findFirst({
      where: { id: params.id, isPublished: true }
    }),
    8000,
    "project metadata query"
  ).catch(() => null);
  if (!project) return { title: "Projektas nerastas" };
  return {
    title: `${project.title} | Noro Studio Portfolio`,
    description: project.description
  };
}

export default async function ProjectPage({
  params
}: {
  params: { id: string };
}) {
  const project = await withTimeout(
    prisma.portfolioProject.findFirst({
      where: { id: params.id, isPublished: true }
    }),
    8000,
    "project page query"
  ).catch(() => null);

  if (!project) notFound();

  const technologies = asStringArray(project.technologies);
  const images = asStringArray(project.images)
    .map((src) => normalizeProjectImageUrl(src))
    .filter(Boolean);
  const features = getProjectFeatures(project.title);
  const screens = getProjectScreens(project.title, images);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-paper-raised/90 backdrop-blur-sm">
        <div className="container-main flex items-center justify-between py-5">
          <Link
            href="/#portfolio"
            className="text-sm font-medium text-ink-mute transition hover:text-ink"
          >
            ← Atgal į portfolio
          </Link>
          <Link href="/" className="font-display text-base font-semibold text-ink">
            Noro Studio
          </Link>
        </div>
      </header>

      <main className="container-main py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-copper">
            Funkcionalumo galerija
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-brand text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-mute sm:text-lg">
            {project.description}
          </p>

          {technologies.length > 0 && (
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ink-mute">
              {technologies.join(" · ")}
            </p>
          )}

          <section className="mt-12 border-t border-ink/10 pt-10">
            <h2 className="font-display text-2xl tracking-brand text-ink">Ką apima sistema</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border border-ink/10 bg-paper-raised px-4 py-3 text-sm text-ink-soft"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 space-y-14">
            <h2 className="font-display text-2xl tracking-brand text-ink">Ekranai</h2>
            {screens.map((screen) => (
              <figure key={screen.src} className="space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-3">
                  <div>
                    <p className="font-mono text-[11px] text-copper">{screen.label}</p>
                    <p className="mt-1 text-sm text-ink-mute">{screen.blurb}</p>
                  </div>
                </div>
                <div className="overflow-hidden border border-ink/10 bg-paper-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screen.src}
                    alt={`${project.title} — ${screen.label}`}
                    width={1600}
                    height={900}
                    className="h-auto w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </section>

          <div className="mt-16 border-t border-ink/10 pt-8">
            <p className="text-sm text-ink-mute">Norite tokios sistemos savo verslui?</p>
            <Link href="/#contact" className="btn-primary mt-4">
              Pradėti projektą
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
