import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-only";
import { HttpError, requireString } from "@/lib/validation";

const allowed = new Set(["NEW", "IN_PROGRESS", "DONE"]);

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    requireAdmin();
    const body = await req.json();
    const status = requireString(body?.status, "status", { min: 1, max: 30 });
    if (!allowed.has(status)) throw new HttpError(400, "Invalid status");
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: { status: status as any }
    });
    return NextResponse.json({ ok: true, inquiry });
  } catch (err: any) {
    const code = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: code });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    requireAdmin();
    await prisma.inquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const code = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: code });
  }
}

