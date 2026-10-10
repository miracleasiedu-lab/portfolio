export function ProjectGridSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-10 w-24 animate-pulse rounded-md bg-surface-2" />
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="aspect-[16/10] animate-pulse bg-surface-2" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
