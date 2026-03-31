import { HttpError } from "@/lib/validation";
import { getAdminFromCookies } from "@/lib/auth";

export function requireAdmin() {
  const admin = getAdminFromCookies();
  if (!admin) throw new HttpError(401, "Unauthorized");
  return admin;
}

