import { getAdminFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminIndex() {
  const admin = getAdminFromCookies();
  if (!admin) {
    redirect("/studio-login-9xk2/login");
  }
  redirect("/studio-login-9xk2/dashboard");
}

