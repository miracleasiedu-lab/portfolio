"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type Category, type Project } from "@/data/types";
import { ProjectCard } from "./project-card";

const ALL = "All";

export const categorySlug = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const searchText = (p: Project) =>
  [p.title, p.domain, p.problem, p.stakeholder, ...p.tools, ...p.categories].join(" ").toLowerCase();

function matches(project: Project, query: string) {
  if (!query) return true;
  const haystack = searchText(project);
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/**
 * Every card is rendered into the HTML and filtered by toggling `hidden`, so the
 * full list is visible without JavaScript and the page can be exported statically.
 * Filters are read from and written to the URL (?category=SQL&q=fraud or #cat-sql).
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<Category | typeof ALL>(ALL);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const fromQuery = sp.get("category");
    const fromHash = window.location.hash.startsWith("#cat-") ? window.location.hash.slice(5) : null;
    const match = CATEGORIES.find((c) => c === fromQuery || categorySlug(c) === fromHash);
    if (match) setCategory(match);
    const q = sp.get("q");
    if (q) setQuery(q);
  }, []);

  const syncUrl = (nextCategory: string, nextQuery: string) => {
    const sp = new URLSearchParams();
    if (nextCategory !== ALL) sp.set("category", nextCategory);
    if (nextQuery.trim()) sp.set("q", nextQuery.trim());
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  };

  const counts = useMemo(() => {
    const c = new Map<string, number>([[ALL, projects.length]]);
    for (const cat of CATEGORIES) c.set(cat, projects.filter((p) => p.categories.includes(cat)).length);
    return c;
  }, [projects]);

  const isVisible = (p: Project) => (category === ALL || p.categories.includes(category)) && matches(p, query);
  const visibleCount = projects.filter(isVisible).length;

  const reset = () => {
    setCategory(ALL);
    setQuery("");
    syncUrl(ALL, "");
  };

  return (
    <div data-gallery>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-1.5">
          {[ALL, ...CATEGORIES].map((cat) => {
            const active = category === cat;
            const count = counts.get(cat) ?? 0;
            return (
              <button
                key={cat}
                type="button"
                data-category={cat}
                aria-pressed={active}
                disabled={count === 0}
                onClick={() => {
                  setCategory(cat as Category | typeof ALL);
                  syncUrl(cat, query);
                }}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink disabled:opacity-40 aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-on-navy dark:aria-pressed:border-accent-fill dark:aria-pressed:bg-accent-fill dark:aria-pressed:text-navy-deep"
              >
                {cat}
                <span className="num text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              syncUrl(category, e.target.value);
            }}
            placeholder="Search projects"
            className="h-11 w-full rounded-md border border-line bg-surface pl-9 pr-9 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            data-clear-search
            hidden={!query}
            onClick={() => {
              setQuery("");
              syncUrl(category, "");
            }}
            className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-ink-3 hover:text-ink"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-3" aria-live="polite" data-result-count>
        Showing <span className="num">{visibleCount}</span> of <span className="num">{projects.length}</span> projects
        {category !== ALL && <> in {category}</>}
        {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" hidden={visibleCount === 0}>
        {projects.map((p, i) => (
          <li key={p.slug} hidden={!isVisible(p)} data-cats={p.categories.join("|")} data-search={searchText(p)}>
            <ProjectCard project={p} priority={i < 3} />
          </li>
        ))}
      </ul>

      <div data-empty hidden={visibleCount > 0} className="mt-6 rounded-xl border border-dashed border-line-strong p-10 text-center">
        <p className="font-medium text-ink">No projects match these filters.</p>
        <p className="mt-1 text-sm text-ink-2">Try a different tool or category, or clear the filters.</p>
        <button type="button" data-reset onClick={reset} className="mt-4 text-sm font-medium text-accent hover:text-accent-strong">
          Clear filters
        </button>
      </div>
    </div>
  );
}
