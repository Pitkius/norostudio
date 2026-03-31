"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Textarea } from "@/components/ui";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  description: string;
  budget?: string | null;
  deadline?: string | null;
  status: "NEW" | "IN_PROGRESS" | "DONE";
  createdAt: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  images: string[];
  order: number;
  isPublished: boolean;
};

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  order: number;
  isActive: boolean;
};

type Tab = "inquiries" | "projects" | "services";

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab>("inquiries");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const [iq, pr, sv] = await Promise.all([
        fetch("/api/admin/inquiries").then((r) => r.json()),
        fetch("/api/admin/projects").then((r) => r.json()),
        fetch("/api/admin/services").then((r) => r.json())
      ]);
      if (!iq.ok) throw new Error(iq.error || "Nepavyko užkrauti užklausų");
      if (!pr.ok) throw new Error(pr.error || "Nepavyko užkrauti projektų");
      if (!sv.ok) throw new Error(sv.error || "Nepavyko užkrauti paslaugų");
      setInquiries(iq.inquiries);
      setProjects(pr.projects);
      setServices(sv.services);
    } catch (e: any) {
      setError(e?.message || "Klaida");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAll();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Valdymo panelė</h1>
        <Button variant="outline" className="text-xs" onClick={() => loadAll()} loading={loading}>
          Atnaujinti
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <TabButton active={tab === "inquiries"} onClick={() => setTab("inquiries")}>
          Užklausos ({inquiries.length})
        </TabButton>
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projektai ({projects.length})
        </TabButton>
        <TabButton active={tab === "services"} onClick={() => setTab("services")}>
          Paslaugos ({services.length})
        </TabButton>
      </div>

      {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}

      {tab === "inquiries" && (
        <InquiriesTab
          inquiries={inquiries}
          onUpdate={async (id, status) => {
            const res = await fetch(`/api/admin/inquiries/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Nepavyko atnaujinti");
            setInquiries((prev) => prev.map((i) => (i.id === id ? data.inquiry : i)));
          }}
          onDelete={async (id) => {
            const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Nepavyko ištrinti");
            setInquiries((prev) => prev.filter((i) => i.id !== id));
          }}
        />
      )}

      {tab === "projects" && (
        <ProjectsTab
          projects={projects}
          onCreated={(p) => setProjects((prev) => [p, ...prev])}
          onUpdated={(p) => setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)))}
          onDeleted={(id) => setProjects((prev) => prev.filter((x) => x.id !== id))}
        />
      )}

      {tab === "services" && (
        <ServicesTab
          services={services}
          onCreated={(s) => setServices((prev) => [s, ...prev])}
          onUpdated={(s) => setServices((prev) => prev.map((x) => (x.id === s.id ? s : x)))}
          onDeleted={(id) => setServices((prev) => prev.filter((x) => x.id !== id))}
        />
      )}
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean; children: any; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-xs font-semibold transition",
        active
          ? "bg-primary text-white shadow-soft"
          : "border border-muted-light bg-white/70 text-slate-700 hover:border-primary hover:text-primary dark:border-muted-dark dark:bg-slate-900/60 dark:text-slate-100"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function InquiriesTab({
  inquiries,
  onUpdate,
  onDelete
}: {
  inquiries: Inquiry[];
  onUpdate: (id: string, status: Inquiry["status"]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <div className="space-y-3">
      {inquiries.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">Užklausų nėra.</p>}
      {inquiries.map((i) => (
        <div key={i.id} className="card space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{i.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {i.email} · {new Date(i.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-xl border border-muted-light bg-white/90 px-3 py-2 text-xs dark:border-muted-dark dark:bg-slate-900/80"
                value={i.status}
                onChange={(e) => onUpdate(i.id, e.target.value as any)}
              >
                <option value="NEW">NEW</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <Button variant="outline" className="text-xs" onClick={() => onDelete(i.id)}>
                Ištrinti
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{i.description}</p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            {i.budget && <span className="chip">Biudžetas: {i.budget}</span>}
            {i.deadline && <span className="chip">Terminas: {i.deadline}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsTab({
  projects,
  onCreated,
  onUpdated,
  onDeleted
}: {
  projects: Project[];
  onCreated: (p: Project) => void;
  onUpdated: (p: Project) => void;
  onDeleted: (id: string) => void;
}) {
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    technologies: "Next.js, TypeScript, Tailwind CSS",
    liveUrl: "",
    images: "",
    order: 0,
    isPublished: true
  });

  async function create() {
    setCreateError(null);
    setCreating(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title,
          description: draft.description,
          technologies: splitCsv(draft.technologies),
          liveUrl: draft.liveUrl,
          images: splitCsv(draft.images),
          order: Number(draft.order) || 0,
          isPublished: !!draft.isPublished
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Nepavyko sukurti projekto");
      onCreated(data.project);
      setDraft((d) => ({ ...d, title: "", description: "", liveUrl: "", images: "" }));
    } catch (e: any) {
      setCreateError(e?.message || "Klaida kuriant projektą");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="card space-y-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Naujas projektas</p>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Pavadinimas</label>
          <Input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Aprašymas</label>
          <Textarea
            rows={4}
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
            Technologijos (CSV)
          </label>
          <Input
            value={draft.technologies}
            onChange={(e) => setDraft((d) => ({ ...d, technologies: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Live URL</label>
          <Input value={draft.liveUrl} onChange={(e) => setDraft((d) => ({ ...d, liveUrl: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
            Nuotraukos URL (CSV)
          </label>
          <Input value={draft.images} onChange={(e) => setDraft((d) => ({ ...d, images: e.target.value }))} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Eiliškumas</label>
            <Input
              type="number"
              value={draft.order}
              onChange={(e) => setDraft((d) => ({ ...d, order: Number(e.target.value) }))}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Publikuotas</label>
            <select
              className="w-full rounded-xl border border-muted-light bg-white/90 px-3 py-2 text-sm dark:border-muted-dark dark:bg-slate-900/80"
              value={draft.isPublished ? "yes" : "no"}
              onChange={(e) => setDraft((d) => ({ ...d, isPublished: e.target.value === "yes" }))}
            >
              <option value="yes">Taip</option>
              <option value="no">Ne</option>
            </select>
          </div>
        </div>
        <Button className="w-full text-xs" onClick={() => void create()} loading={creating}>
          Pridėti
        </Button>
        {createError && <p className="text-xs text-rose-600 dark:text-rose-400">{createError}</p>}
      </div>

      <div className="space-y-3">
        {projects.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">Projektų nėra.</p>}
        {projects.map((p) => (
          <ProjectRow key={p.id} project={p} onUpdated={onUpdated} onDeleted={onDeleted} />
        ))}
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  onUpdated,
  onDeleted
}: {
  project: Project;
  onUpdated: (p: Project) => void;
  onDeleted: (id: string) => void;
}) {
  const [edit, setEdit] = useState<Project>(project);
  const changed = useMemo(() => JSON.stringify(edit) !== JSON.stringify(project), [edit, project]);

  async function save() {
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: edit.title,
        description: edit.description,
        technologies: edit.technologies,
        liveUrl: edit.liveUrl,
        images: edit.images,
        order: edit.order,
        isPublished: edit.isPublished
      })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Nepavyko išsaugoti");
    onUpdated(data.project);
  }

  async function del() {
    const res = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Nepavyko ištrinti");
    onDeleted(project.id);
  }

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{project.title}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-xs" disabled={!changed} onClick={() => void save()}>
            Išsaugoti
          </Button>
          <Button variant="outline" className="text-xs" onClick={() => void del()}>
            Ištrinti
          </Button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Pavadinimas</label>
          <Input value={edit.title} onChange={(e) => setEdit((x) => ({ ...x, title: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Live URL</label>
          <Input value={edit.liveUrl} onChange={(e) => setEdit((x) => ({ ...x, liveUrl: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Aprašymas</label>
        <Textarea rows={3} value={edit.description} onChange={(e) => setEdit((x) => ({ ...x, description: e.target.value }))} />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Technologijos</label>
          <Input
            value={edit.technologies.join(", ")}
            onChange={(e) => setEdit((x) => ({ ...x, technologies: splitCsv(e.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Publikuotas</label>
          <select
            className="w-full rounded-xl border border-muted-light bg-white/90 px-3 py-2 text-sm dark:border-muted-dark dark:bg-slate-900/80"
            value={edit.isPublished ? "yes" : "no"}
            onChange={(e) => setEdit((x) => ({ ...x, isPublished: e.target.value === "yes" }))}
          >
            <option value="yes">Taip</option>
            <option value="no">Ne</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Nuotraukos URL</label>
        <Input
          value={edit.images.join(", ")}
          onChange={(e) => setEdit((x) => ({ ...x, images: splitCsv(e.target.value) }))}
        />
      </div>
    </div>
  );
}

function ServicesTab({
  services,
  onCreated,
  onUpdated,
  onDeleted
}: {
  services: Service[];
  onCreated: (s: Service) => void;
  onUpdated: (s: Service) => void;
  onDeleted: (id: string) => void;
}) {
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    price: "",
    features: "Modernus dizainas, SEO, Paleidimas",
    order: 0,
    isActive: true
  });

  async function create() {
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: draft.title,
        description: draft.description,
        price: draft.price,
        features: splitCsv(draft.features),
        order: Number(draft.order) || 0,
        isActive: !!draft.isActive
      })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Nepavyko sukurti paslaugos");
    onCreated(data.service);
    setDraft((d) => ({ ...d, title: "", description: "", price: "" }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="card space-y-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Nauja paslauga</p>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Pavadinimas</label>
          <Input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Aprašymas</label>
          <Textarea rows={4} value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Kaina</label>
          <Input value={draft.price} onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Savybės (CSV)</label>
          <Input value={draft.features} onChange={(e) => setDraft((d) => ({ ...d, features: e.target.value }))} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Eiliškumas</label>
            <Input type="number" value={draft.order} onChange={(e) => setDraft((d) => ({ ...d, order: Number(e.target.value) }))} />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Aktyvi</label>
            <select
              className="w-full rounded-xl border border-muted-light bg-white/90 px-3 py-2 text-sm dark:border-muted-dark dark:bg-slate-900/80"
              value={draft.isActive ? "yes" : "no"}
              onChange={(e) => setDraft((d) => ({ ...d, isActive: e.target.value === "yes" }))}
            >
              <option value="yes">Taip</option>
              <option value="no">Ne</option>
            </select>
          </div>
        </div>
        <Button className="w-full text-xs" onClick={() => void create()}>
          Pridėti
        </Button>
      </div>

      <div className="space-y-3">
        {services.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">Paslaugų nėra.</p>}
        {services.map((s) => (
          <ServiceRow key={s.id} service={s} onUpdated={onUpdated} onDeleted={onDeleted} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  onUpdated,
  onDeleted
}: {
  service: Service;
  onUpdated: (s: Service) => void;
  onDeleted: (id: string) => void;
}) {
  const [edit, setEdit] = useState<Service>(service);
  const changed = useMemo(() => JSON.stringify(edit) !== JSON.stringify(service), [edit, service]);

  async function save() {
    const res = await fetch(`/api/admin/services/${service.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: edit.title,
        description: edit.description,
        price: edit.price,
        features: edit.features,
        order: edit.order,
        isActive: edit.isActive
      })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Nepavyko išsaugoti");
    onUpdated(data.service);
  }

  async function del() {
    const res = await fetch(`/api/admin/services/${service.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Nepavyko ištrinti");
    onDeleted(service.id);
  }

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{service.title}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-xs" disabled={!changed} onClick={() => void save()}>
            Išsaugoti
          </Button>
          <Button variant="outline" className="text-xs" onClick={() => void del()}>
            Ištrinti
          </Button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Pavadinimas</label>
          <Input value={edit.title} onChange={(e) => setEdit((x) => ({ ...x, title: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Kaina</label>
          <Input value={edit.price} onChange={(e) => setEdit((x) => ({ ...x, price: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Aprašymas</label>
        <Textarea rows={3} value={edit.description} onChange={(e) => setEdit((x) => ({ ...x, description: e.target.value }))} />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Savybės</label>
          <Input
            value={edit.features.join(", ")}
            onChange={(e) => setEdit((x) => ({ ...x, features: splitCsv(e.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Aktyvi</label>
          <select
            className="w-full rounded-xl border border-muted-light bg-white/90 px-3 py-2 text-sm dark:border-muted-dark dark:bg-slate-900/80"
            value={edit.isActive ? "yes" : "no"}
            onChange={(e) => setEdit((x) => ({ ...x, isActive: e.target.value === "yes" }))}
          >
            <option value="yes">Taip</option>
            <option value="no">Ne</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function splitCsv(input: string) {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

