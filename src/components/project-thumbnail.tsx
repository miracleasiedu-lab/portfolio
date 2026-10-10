import Image from "next/image";
import type { Project } from "@/data/types";

/**
 * Cover image for a project. When a project has no screenshot yet, a labelled
 * placeholder is shown instead so the gap is obvious and easy to fill.
 */
export function ProjectThumbnail({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.thumbnail) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={project.thumbnail.fit === "cover" ? "object-cover object-top" : "object-contain p-3"}
        />
      </div>
    );
  }
  return (
    <div
      className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-navy p-5 text-on-navy"
      role="img"
      aria-label={`${project.title}: screenshot to be added`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" aria-hidden="true">
        <defs>
          <pattern id={`grid-${project.slug}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
      </svg>
      <p className="relative text-xs text-on-navy/70">{project.tools.slice(0, 2).join(" + ")}</p>
      <div className="relative">
        <p className="display text-4xl leading-none text-accent-fill num">{project.headline.value}</p>
        <p className="mt-2 max-w-[28ch] text-xs leading-snug text-on-navy/80">{project.headline.label}</p>
      </div>
      <p className="relative self-start rounded border border-dashed border-on-navy/40 px-2 py-0.5 text-[11px] text-on-navy/75">
        Screenshot to be added
      </p>
    </div>
  );
}
