"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageAsset } from "@/data/types";

/**
 * Grid of project visuals that open in an accessible lightbox (<dialog>).
 * Arrow keys move between images; Escape closes.
 */
export function ImageGallery({ images }: { images: ImageAsset[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (!d.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    window.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index !== null ? images[index] : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 && images.length % 2 === 1 ? "sm:col-span-2" : ""}>
            <figure className="overflow-hidden rounded-lg border border-line bg-surface">
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full bg-white"
                aria-label={`Enlarge: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <span className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-navy/80 text-on-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
              {img.caption && (
                <figcaption className="border-t border-line px-4 py-3 text-sm leading-snug text-ink-2">{img.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current?.alt ?? "Image viewer"}
        className="m-auto max-h-[94vh] w-[min(96vw,1400px)] rounded-xl bg-surface p-0 text-ink backdrop:bg-navy-deep/85"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        {current && (
          <div className="flex max-h-[94vh] flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
              <p className="text-sm text-ink-2">
                <span className="num">{(index ?? 0) + 1}</span> / <span className="num">{images.length}</span>
                <span className="ml-3 hidden text-ink sm:inline">{current.alt}</span>
              </p>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => step(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface-2" aria-label="Previous image">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface-2" aria-label="Next image">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={close} className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface-2" aria-label="Close image viewer" autoFocus>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="overflow-auto bg-white p-2">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="96vw"
                className="mx-auto h-auto max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>
            {current.caption && current.caption !== current.alt && (
              <p className="border-t border-line px-4 py-3 text-sm text-ink-2">{current.caption}</p>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
