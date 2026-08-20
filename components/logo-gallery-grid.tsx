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
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {logos.map((logo, idx) => (
          <button
            key={`${logo.name}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group text-left"
          >
            <div className="flex aspect-[5/4] items-center justify-center border border-ink/10 bg-paper-raised p-8 transition group-hover:border-ink/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full w-auto max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-ink">{logo.name}</p>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-3xl bg-paper p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-xl text-ink">{logos[activeIndex].name}</h3>
              <button type="button" className="btn-outline py-1.5 text-xs" onClick={() => setActiveIndex(null)}>
                Uždaryti
              </button>
            </div>
            <div className="flex min-h-[280px] items-center justify-center bg-paper-raised p-6">
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
