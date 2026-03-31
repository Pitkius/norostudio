"use client";

import { useState } from "react";
import { Container, Button, Input, Textarea } from "@/components/ui";
import { MotionReveal } from "@/components/motion-reveal";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    budget: "",
    deadline: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          description: form.description,
          budget: form.budget,
          deadline: form.deadline
        })
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", description: "", budget: "", deadline: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <Container id="contact">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <MotionReveal className="space-y-4">
          <h2 className="section-title">
            Papasakokite apie savo projektą
          </h2>
          <p className="section-subtitle">
            Papasakokite keliais sakiniais, ko jums reikia, koks biudžetas ir terminas. Atsakysiu
            su pasiūlymu ir idėjomis, kaip geriausiai įgyvendinti jūsų projektą.
          </p>
          <p className="text-xs text-slate-400">
            Visi užklausos duomenys bus išsaugoti duomenų bazėje, kad galėčiau sekti projektus ir
            pasiūlymus admin panelėje.
          </p>
        </MotionReveal>
        <MotionReveal delayMs={140}>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Vardas
              </label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Jūsų vardas"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                El. paštas
              </label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="jus@example.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Projekto aprašymas
            </label>
            <Textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Trumpai apibūdinkite, kokios svetainės ar sistemos jums reikia."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Biudžetas (apytiksliai)
              </label>
              <Input
                value={form.budget}
                onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                placeholder="pvz. 1500 €"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Terminas
              </label>
              <Input
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                placeholder="pvz. iki 2026-06"
              />
            </div>
          </div>
          <Button type="submit" loading={status === "submitting"} className="w-full text-xs">
            Siųsti užklausą
          </Button>
          {status === "success" && (
            <p className="text-xs text-emerald-300">
              Ačiū! Jūsų užklausa gauta – netrukus susisieksiu.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-rose-300">
              Nepavyko išsiųsti užklausos. Bandykite dar kartą.
            </p>
          )}
        </form>
        </MotionReveal>
      </div>
    </Container>
  );
}

