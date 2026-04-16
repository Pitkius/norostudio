import { NextResponse } from "next/server";
import { prisma, withTimeout } from "@/lib/db";

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
    return NextResponse.json({ ok: true, projects });
  } catch {
    return NextResponse.json({ ok: true, projects: [] });
  }
}

