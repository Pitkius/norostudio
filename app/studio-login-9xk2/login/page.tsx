"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";

export default function AdminLoginPage() {
  const router = useRouter();
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
      router.replace("/studio-login-9xk2");
    } catch (e: any) {
      setError(e?.message || "Nepavyko prisijungti");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-main flex min-h-screen items-center justify-center py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border border-ink/10 bg-paper-raised p-6 sm:p-8"
      >
        <div className="space-y-1">
          <h1 className="font-display text-xl font-medium text-ink">Admin prisijungimas</h1>
          <p className="text-sm text-ink-mute">Valdykite užklausas ir turinį.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-ink">El. paštas</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-ink">Slaptažodis</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <Button type="submit" loading={loading} className="w-full text-sm">
          Prisijungti
        </Button>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </form>
    </div>
  );
}
