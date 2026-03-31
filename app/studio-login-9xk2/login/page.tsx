"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Nepavyko prisijungti");
      window.location.href = "/studio-login-9xk2";
    } catch (e: any) {
      setError(e?.message || "Nepavyko prisijungti");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-main flex min-h-[calc(100vh-0px)] items-center justify-center py-16">
      <form onSubmit={onSubmit} className="card w-full max-w-sm space-y-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Admin prisijungimas</h1>
          <p className="text-xs text-slate-600 dark:text-slate-300">Prisijunkite, kad valdytumėte užklausas ir turinį.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">El. paštas</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Slaptažodis</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <Button type="submit" loading={loading} className="w-full text-xs">
          Prisijungti
        </Button>
        {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Pirmam kartui susikurkite admin vartotoją per `npm run prisma:seed`.
        </p>
      </form>
    </div>
  );
}

