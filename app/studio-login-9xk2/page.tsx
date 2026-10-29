import { getAdminFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminIndex() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    redirect("/studio-login-9xk2/login");
  }
  redirect("/studio-login-9xk2/dashboard");
}

