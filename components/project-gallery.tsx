"use client";

import { useState, useCallback } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            type="button"
            key={i}
            onClick={() => open(i)}
            className="relative overflow-hidden border border-ink/10 bg-paper-deep text-left transition hover:border-ink/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} – nuotrauka ${i + 1}`}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
            <span className="sr-only">Padidinti nuotrauką {i + 1}</span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nuotraukos peržiūra"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 btn-outline border-paper-raised/30 py-2 text-sm text-paper-raised hover:bg-paper-raised/10"
          >
            Uždaryti
          </button>
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={`${title} – nuotrauka ${lightboxIndex + 1}`}
              className="max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
