"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative h-96 rounded-xl bg-surface-alt sm:h-[32rem]">
        <Image
          src={images[activeIndex]}
          alt={`${productName} — photo ${activeIndex + 1}/${images.length}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-contain p-6"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((i) => (i - 1 + images.length) % images.length)
              }
              aria-label="Photo précédente"
              className="absolute start-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface-alt/90 text-text shadow hover:bg-surface-alt"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              aria-label="Photo suivante"
              className="absolute end-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface-alt/90 text-text shadow hover:bg-surface-alt"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Voir la photo ${index + 1}`}
              aria-current={index === activeIndex}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-surface-alt transition-colors ${
                index === activeIndex ? "border-secondary" : "border-border hover:border-secondary/50"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
