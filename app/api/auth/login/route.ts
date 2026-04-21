import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { AUTH_COOKIE, signAdminJwt } from "@/lib/auth";
import { HttpError, requireString } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = requireString(body?.email, "email", { min: 5, max: 200 }).trim().toLowerCase();
    const password = requireString(body?.password, "password", { min: 6, max: 200 });

    const envEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || "";
    let user = await prisma.adminUser.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      const canUseEnvFallback =
        email === envEmail &&
        envPassword.length >= 6 &&
        password === envPassword;

      if (!canUseEnvFallback) {
        throw new HttpError(401, "Neteisingi prisijungimo duomenys");
      }

      const passwordHash = await bcrypt.hash(envPassword, 10);
      user = await prisma.adminUser.upsert({
        where: { email: envEmail },
        update: { passwordHash },
        create: { email: envEmail, passwordHash }
      });
    }

    const token = signAdminJwt({ sub: user.id, email: user.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });
    return res;
  } catch (err: any) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

