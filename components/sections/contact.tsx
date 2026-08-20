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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
        <MotionReveal className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-copper">Kontaktai</p>
          <h2 className="section-title">Papasakokite apie projektą</h2>
          <p className="section-subtitle">
            Trumpai apie poreikius, biudžetą ir terminą — atsakysiu su pasiūlymu ir
            konkrečiomis idėjomis.
          </p>
        </MotionReveal>

        <MotionReveal delayMs={100}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border border-ink/10 bg-paper-raised p-6 sm:p-8"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Vardas</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jūsų vardas"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">El. paštas</label>
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
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Projekto aprašymas
              </label>
              <Textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Ko reikia: svetainė, sistema, logotipas…"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  Biudžetas (apytiksliai)
                </label>
                <Input
                  value={form.budget}
                  onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                  placeholder="pvz. 1500 €"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Terminas</label>
                <Input
                  value={form.deadline}
                  onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                  placeholder="pvz. iki 2026-06"
                />
              </div>
            </div>
            <Button type="submit" loading={status === "submitting"} className="w-full text-sm">
              Siųsti užklausą
            </Button>
            {status === "success" && (
              <p className="text-sm text-moss">Ačiū! Užklausa gauta — netrukus susisieksiu.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-700">Nepavyko išsiųsti. Bandykite dar kartą.</p>
            )}
          </form>
        </MotionReveal>
      </div>
    </Container>
  );
}
