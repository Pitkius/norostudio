import { NextResponse } from "next/server";
import { prisma, withTimeout } from "@/lib/db";
import { asStringArray } from "@/lib/json-array";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await withTimeout(
      prisma.portfolioProject.findMany({
        where: { isPublished: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }]
      }),
      8000,
      "projects query"
    );
    return NextResponse.json({
      ok: true,
      projects: projects.map((p) => ({
        ...p,
        technologies: asStringArray(p.technologies),
        images: asStringArray(p.images)
      }))
    });
  } catch {
    return NextResponse.json({ ok: true, projects: [] });
  }
}
