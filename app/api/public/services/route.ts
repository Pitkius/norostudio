import { NextResponse } from "next/server";
import { prisma, withTimeout } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await withTimeout(
      prisma.servicePlan.findMany({
        where: { isActive: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }]
      }),
      8000,
      "services query"
    );
    return NextResponse.json({ ok: true, services });
  } catch {
    return NextResponse.json({ ok: true, services: [] });
  }
}

