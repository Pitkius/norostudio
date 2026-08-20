"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#about", label: "Apie" },
  { href: "#services", label: "Paslaugos" },
  { href: "#portfolio", label: "Darbai" },
  { href: "#logos", label: "Logotipai" },
  { href: "#contact", label: "Kontaktai" }
];

export function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper-raised/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between gap-4 py-3.5">
        <Link
          href="#home"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/Logo.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-[1.35rem] tracking-brand text-ink">
            Noro Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Pagrindinė navigacija">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden py-2 text-xs sm:inline-flex sm:text-sm">
            Susisiekti
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-ink/15 text-ink md:hidden"
            aria-expanded={open}
            aria-label="Meniu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-px w-5 bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper-raised md:hidden">
          <nav className="container-main flex flex-col py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-ink/5 py-3.5 text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary mt-4 w-full" onClick={() => setOpen(false)}>
              Susisiekti
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
