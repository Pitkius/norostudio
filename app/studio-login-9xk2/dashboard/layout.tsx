import Link from "next/link";
import { ReactNode } from "react";
import { getAdminFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const admin = getAdminFromCookies();
  if (!admin) redirect("/studio-login-9xk2/login");

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-paper-raised">
        <div className="container-main flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs font-medium text-ink-mute hover:text-ink">
              ← Į svetainę
            </Link>
            <span className="font-display text-sm font-semibold text-ink">Admin</span>
          </div>
          <form
            action={async () => {
              "use server";
              const { cookies } = await import("next/headers");
              cookies().set("portfolio_admin", "", { path: "/", maxAge: 0 });
              redirect("/studio-login-9xk2/login");
            }}
          >
            <button className="btn-outline py-2 text-xs" type="submit">
              Atsijungti
            </button>
          </form>
        </div>
      </header>
      <main className="container-main py-10">{children}</main>
    </div>
  );
}
