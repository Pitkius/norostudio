import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-only";
import { HttpError, optionalString, requireStringArray, requireUrl } from "@/lib/validation";
import { asStringArray } from "@/lib/json-array";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const data: Record<string, unknown> = {};

    if (body?.title !== undefined) data.title = optionalString(body.title, "title", { max: 120 });
    if (body?.description !== undefined)
      data.description = optionalString(body.description, "description", { max: 4000 });
    if (body?.technologies !== undefined)
      data.technologies = requireStringArray(body.technologies, "technologies", {
        maxItems: 30,
        maxLen: 40
      });
    if (body?.liveUrl !== undefined) {
      const liveUrlRaw = typeof body.liveUrl === "string" ? body.liveUrl.trim() : "";
      data.liveUrl = liveUrlRaw === "" || liveUrlRaw === "#" ? "#" : requireUrl(liveUrlRaw, "liveUrl");
    }
    if (body?.images !== undefined)
      data.images = requireStringArray(body.images, "images", { maxItems: 12, maxLen: 2048 });
    if (body?.order !== undefined) data.order = typeof body.order === "number" ? body.order : 0;
    if (body?.isPublished !== undefined) data.isPublished = !!body.isPublished;

    const project = await prisma.portfolioProject.update({
      where: { id },
      data
    });
    return NextResponse.json({
      ok: true,
      project: {
        ...project,
        technologies: asStringArray(project.technologies),
        images: asStringArray(project.images)
      }
    });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.portfolioProject.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
