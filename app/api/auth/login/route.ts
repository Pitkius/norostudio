import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { AUTH_COOKIE, signAdminJwt } from "@/lib/auth";
import { HttpError, requireString } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = requireString(body?.email, "email", { min: 5, max: 200 }).toLowerCase();
    const password = requireString(body?.password, "password", { min: 6, max: 200 });

    const envAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD;
    // Keep DB admin credentials aligned with deployment env to avoid 401 after redeploys.
    if (envAdminEmail && envAdminPassword && email === envAdminEmail) {
      const passwordHash = await bcrypt.hash(envAdminPassword, 10);
      await prisma.adminUser.upsert({
        where: { email: envAdminEmail },
        update: { passwordHash },
        create: { email: envAdminEmail, passwordHash }
      });
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) throw new HttpError(401, "Neteisingi prisijungimo duomenys");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new HttpError(401, "Neteisingi prisijungimo duomenys");

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

