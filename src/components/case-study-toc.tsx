"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; pending: boolean };

/** Sticky contents list for the 15-stage case-study structure; highlights the section in view. */
export function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="text-sm">
      <p className="mb-3 font-medium text-ink">Case study</p>
      <ol className="space-y-0.5 border-l border-line">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px flex items-baseline gap-2.5 border-l-2 py-1 pl-3 transition-colors ${
                  isActive ? "border-accent-fill text-ink" : "border-transparent text-ink-3 hover:text-ink"
                }`}
              >
                <span className="num w-5 shrink-0 text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className={item.pending ? "italic opacity-70" : ""}>
                  {item.label}
                  {item.pending && <span className="sr-only"> (to be added)</span>}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
