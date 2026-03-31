import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-only";
import { HttpError, requireString, requireStringArray, requireUrl } from "@/lib/validation";

export async function GET() {
  try {
    requireAdmin();
    const projects = await prisma.portfolioProject.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
    return NextResponse.json({ ok: true, projects });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const title = requireString(body?.title, "title", { min: 2, max: 120 });
    const description = requireString(body?.description, "description", { min: 10, max: 4000 });
    const technologies = requireStringArray(body?.technologies ?? [], "technologies", { maxItems: 30, maxLen: 40 });
    const liveUrlRaw = typeof body?.liveUrl === "string" ? body.liveUrl.trim() : "";
    const liveUrl = liveUrlRaw === "" || liveUrlRaw === "#" ? "#" : requireUrl(liveUrlRaw, "liveUrl");
    const images = requireStringArray(body?.images ?? [], "images", { maxItems: 12, maxLen: 2048 });
    const order = typeof body?.order === "number" ? body.order : 0;
    const isPublished = typeof body?.isPublished === "boolean" ? body.isPublished : true;

    const project = await prisma.portfolioProject.create({
      data: { title, description, technologies, liveUrl, images, order, isPublished }
    });
    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

