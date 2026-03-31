import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-only";
import { HttpError, optionalString, requireStringArray } from "@/lib/validation";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    requireAdmin();
    const body = await req.json();
    const data: any = {};

    if (body?.title !== undefined) data.title = optionalString(body.title, "title", { max: 120 });
    if (body?.description !== undefined) data.description = optionalString(body.description, "description", { max: 4000 });
    if (body?.price !== undefined) data.price = optionalString(body.price, "price", { max: 120 });
    if (body?.features !== undefined)
      data.features = requireStringArray(body.features, "features", { maxItems: 30, maxLen: 80 });
    if (body?.order !== undefined) data.order = typeof body.order === "number" ? body.order : 0;
    if (body?.isActive !== undefined) data.isActive = !!body.isActive;

    const service = await prisma.servicePlan.update({ where: { id: params.id }, data });
    return NextResponse.json({ ok: true, service });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    requireAdmin();
    await prisma.servicePlan.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

