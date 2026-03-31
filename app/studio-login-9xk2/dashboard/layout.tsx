import Link from "next/link";
import { ReactNode } from "react";
import { getAdminFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const admin = getAdminFromCookies();
  if (!admin) redirect("/studio-login-9xk2/login");

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70">
        <div className="container-main flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
              ← Į svetainę
            </Link>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">Admin</span>
          </div>
          <form
            action={async () => {
              "use server";
              // server action calls API-like logout by clearing cookie
              const { cookies } = await import("next/headers");
              cookies().set("portfolio_admin", "", { path: "/", maxAge: 0 });
              redirect("/studio-login-9xk2/login");
            }}
          >
            <button className="btn-outline text-xs" type="submit">
              Atsijungti
            </button>
          </form>
        </div>
      </header>
      <main className="container-main py-10">{children}</main>
    </div>
  );
}

