import Link from "next/link";
import type { Project } from "@/data/types";

/**
 * The home page's signature element: one verified headline result per project,
 * set like a findings ledger. Rows reveal once, in sequence, on first load.
 */
export function HeroLedger({ projects }: { projects: Project[] }) {
  return (
    <figure className="rounded-xl border border-line bg-surface shadow-[0_1px_0_var(--color-line)]">
      <figcaption className="flex items-baseline justify-between border-b border-line px-5 py-3.5">
        <span className="text-sm font-medium text-ink">Findings ledger</span>
        <span className="text-xs text-ink-3">From each project&apos;s own outputs</span>
      </figcaption>
      <ol>
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className="ledger-row border-b border-line last:border-0"
            style={{ animationDelay: `${180 + i * 110}ms` }}
          >
            <Link
              href={`/projects/${p.slug}`}
              className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 px-5 py-3.5 transition-colors hover:bg-surface-2 sm:grid-cols-[7.5rem_1fr]"
            >
              <span className="num text-right text-xl font-semibold tracking-tight text-accent sm:text-2xl">
                {p.headline.value}
              </span>
              <span>
                <span className="block text-sm leading-snug text-ink">{p.headline.label}</span>
                <span className="mt-0.5 block text-xs text-ink-3">{p.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </figure>
  );
}
