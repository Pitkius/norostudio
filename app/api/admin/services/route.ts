import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-only";
import { HttpError, requireString, requireStringArray } from "@/lib/validation";

export async function GET() {
  try {
    requireAdmin();
    const services = await prisma.servicePlan.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
    return NextResponse.json({ ok: true, services });
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
    const price = requireString(body?.price, "price", { min: 1, max: 120 });
    const features = requireStringArray(body?.features ?? [], "features", { maxItems: 30, maxLen: 80 });
    const order = typeof body?.order === "number" ? body.order : 0;
    const isActive = typeof body?.isActive === "boolean" ? body.isActive : true;

    const service = await prisma.servicePlan.create({
      data: { title, description, price, features, order, isActive }
    });
    return NextResponse.json({ ok: true, service }, { status: 201 });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

