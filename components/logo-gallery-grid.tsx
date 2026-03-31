"use client";

import { useState } from "react";

type LogoItem = {
  name: string;
  src: string;
};

export function LogoGalleryGrid({ logos }: { logos: LogoItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {logos.map((logo, idx) => (
          <button
            key={`${logo.name}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group rounded-3xl border border-white/10 bg-slate-900/30 p-5 text-left shadow-soft transition hover:border-indigo-300/40"
          >
            <div className="flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full w-auto max-w-full object-contain transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{logo.name}</p>
              <span className="text-xs font-medium text-slate-300">Plačiau →</span>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-900/90 p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{logos[activeIndex].name}</h3>
              <button
                type="button"
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/40 hover:text-white"
                onClick={() => setActiveIndex(null)}
              >
                Uždaryti
              </button>
            </div>
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-white p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logos[activeIndex].src}
                alt={logos[activeIndex].name}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
