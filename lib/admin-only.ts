import { HttpError } from "@/lib/validation";
import { getAdminFromCookies } from "@/lib/auth";

export async function requireAdmin() {
  const admin = await getAdminFromCookies();
  if (!admin) throw new HttpError(401, "Unauthorized");
  return admin;
}

