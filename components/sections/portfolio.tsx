"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui";
import { MotionReveal } from "@/components/motion-reveal";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  url: string;
};

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

const fallback: ProjectCardProps[] = [
  {
    id: "demo",
    title: "Pavyzdinis projektas",
    description: "Čia atsiras jūsų publikuoti portfolio darbai iš admin panelės.",
    technologies: ["Next.js", "TypeScript"],
    image: "/projects/motel-mockup-booking.png",
    url: "#"
  }
];

type PublicProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  liveUrl: string;
};

export function PortfolioSection() {
  const [projects, setProjects] = useState<ProjectCardProps[]>(fallback);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/public/projects", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!mounted || !res.ok || !data?.ok) return;
        const items: PublicProject[] = Array.isArray(data.projects) ? data.projects : [];
        if (items.length === 0) {
          setProjects(fallback);
          return;
        }
        const mapped: ProjectCardProps[] = items.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          image:
            normalizeProjectImageUrl((Array.isArray(p.images) ? p.images[0] : "") || "") ||
            fallback[0].image,
          url: p.liveUrl || "#"
        }));
        setProjects(mapped);
      } catch {
        if (mounted) setProjects(fallback);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container id="portfolio">
      <div className="space-y-14">
        <MotionReveal className="max-w-2xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-copper">Portfolio</p>
          <h2 className="section-title">Atrinkti darbai</h2>
          <p className="section-subtitle">
            Spauskite projektą — atsidarys galerija su ekranais ir funkcionalumu.
          </p>
        </MotionReveal>

        <div className="space-y-16">
          {projects.map((project, idx) => (
            <MotionReveal key={`${project.id}-${project.title}`} delayMs={idx * 60}>
              <ProjectRow {...project} reverse={idx % 2 === 1} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </Container>
  );
}

function ProjectRow({
  id,
  title,
  description,
  technologies,
  image,
  reverse
}: ProjectCardProps & { reverse?: boolean }) {
  const galleryHref = id !== "demo" ? `/projects/${id}` : undefined;

  const media = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={title}
      width={1280}
      height={800}
      className="aspect-[16/10] h-auto w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="group overflow-hidden bg-paper-deep">
        {galleryHref ? (
          <Link href={galleryHref} aria-label={`Atidaryti ${title} galeriją`}>
            {media}
          </Link>
        ) : (
          media
        )}
      </div>
      <div className="space-y-4">
        {technologies.length > 0 && (
          <p className="text-xs uppercase tracking-[0.16em] text-ink-mute">
            {technologies.slice(0, 4).join(" · ")}
          </p>
        )}
        <h3 className="font-display text-3xl tracking-brand text-ink sm:text-4xl">
          {galleryHref ? (
            <Link href={galleryHref} className="hover:text-moss">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="max-w-md text-base leading-relaxed text-ink-mute">{description}</p>
        {galleryHref && (
          <Link
            href={galleryHref}
            className="inline-flex text-sm font-semibold text-moss underline-offset-4 hover:underline"
          >
            Atidaryti funkcionalumo galeriją →
          </Link>
        )}
      </div>
    </article>
  );
}
