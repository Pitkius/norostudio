import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const AUTH_COOKIE = "portfolio_admin";

export type AdminJwtPayload = {
  sub: string;
  email: string;
};

export function signAdminJwt(payload: AdminJwtPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing");
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyAdminJwt(token: string): AdminJwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing");
  const decoded = jwt.verify(token, secret);
  if (typeof decoded !== "object" || decoded === null) throw new Error("Invalid token");
  const sub = (decoded as any).sub;
  const email = (decoded as any).email;
  if (typeof sub !== "string" || typeof email !== "string") throw new Error("Invalid token");
  return { sub, email };
}

export function getAdminFromCookies(): AdminJwtPayload | null {
  const token = cookies().get(AUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    return verifyAdminJwt(token);
  } catch {
    return null;
  }
}

