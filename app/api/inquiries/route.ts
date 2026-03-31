import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { HttpError, optionalString, requireString } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = requireString(body?.name, "name", { min: 2, max: 120 });
    const email = requireString(body?.email, "email", { min: 5, max: 200 });
    const description = requireString(body?.description, "description", { min: 10, max: 4000 });
    const budget = optionalString(body?.budget, "budget", { max: 120 });
    const deadline = optionalString(body?.deadline, "deadline", { max: 120 });

    const inquiry = await prisma.inquiry.create({
      data: { name, email, description, budget, deadline }
    });

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

