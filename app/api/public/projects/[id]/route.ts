import { NextResponse } from "next/server";
import { prisma, withTimeout } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await withTimeout(
      prisma.portfolioProject.findFirst({
        where: { id, isPublished: true }
      }),
      8000,
      "project query"
    );
    if (!project) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, project });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
