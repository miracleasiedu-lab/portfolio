import type { BarChartData, Kpi, SimpleTable } from "@/data/types";

export function KpiGrid({ kpis, columns = 3 }: { kpis: Kpi[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <dl className={`grid gap-px overflow-hidden rounded-lg border border-line bg-line ${cols}`}>
      {kpis.map((k) => (
        <div key={k.label} className="bg-surface p-4">
          <dt className="text-xs leading-snug text-ink-3">{k.label}</dt>
          <dd className="mt-1.5">
            <span className="num text-2xl font-semibold tracking-tight text-ink">{k.value}</span>
            {k.note && <span className="mt-1 block text-xs leading-snug text-ink-2">{k.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="relative pl-5 leading-relaxed text-ink-2">
          <span className="absolute left-0 top-[0.7em] h-[5px] w-[5px] rounded-full bg-accent-fill" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="grid grid-cols-[1.75rem_1fr] gap-2 leading-relaxed text-ink-2">
          <span className="num pt-px text-sm font-semibold text-accent">{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function DataTable({ table }: { table: SimpleTable }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        {table.caption && <caption className="px-4 pt-3 text-left text-xs text-ink-3">{table.caption}</caption>}
        <thead>
          <tr className="bg-surface-2">
            {table.head.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`px-4 py-2.5 text-xs font-medium text-ink-2 ${i === 0 ? "text-left" : "text-left sm:text-right"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => {
            const hl = table.highlightRow === r;
            return (
              <tr key={r} className={`border-t border-line ${hl ? "bg-accent-soft" : "bg-surface"}`}>
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th key={c} scope="row" className={`px-4 py-2.5 text-left font-medium ${hl ? "text-ink" : "text-ink"}`}>
                      {cell}
                      {hl && <span className="sr-only"> (selected)</span>}
                    </th>
                  ) : (
                    <td key={c} className="num px-4 py-2.5 text-left text-ink-2 sm:text-right">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function fmt(v: number, f: BarChartData["format"]) {
  if (f === "percent") return `${v.toLocaleString("en-GB", { maximumFractionDigits: 2 })}%`;
  if (f === "decimal") return v.toFixed(3);
  return v.toLocaleString("en-GB");
}

/**
 * A single-series horizontal bar chart built from real result tables.
 * Bars, value labels, an optional reference line and a table view for screen readers.
 */
export function BarChart({ chart }: { chart: BarChartData }) {
  const max = Math.max(...chart.data.map((d) => d.value), chart.reference?.value ?? 0) * 1.02;
  const pct = (v: number) => `${(v / max) * 100}%`;
  const hasHighlight = Boolean(chart.highlight);

  return (
    <figure className="rounded-lg border border-line bg-surface p-5">
      <figcaption>
        <p className="font-medium text-ink">{chart.title}</p>
        <p className="mt-0.5 text-xs text-ink-3">{chart.unit}</p>
      </figcaption>

      <div className="mt-5 space-y-2.5" aria-hidden="true">
        {chart.data.map((d) => {
          const emphasised = !hasHighlight || d.label === chart.highlight;
          return (
            <div
              key={d.label}
              className="group grid grid-cols-[minmax(6.5rem,10rem)_1fr_3.75rem] items-center gap-3 sm:grid-cols-[13rem_1fr_4rem]"
              title={`${d.label}: ${fmt(d.value, chart.format)}`}
            >
              <span className="truncate text-right text-xs text-ink-2 group-hover:text-ink">{d.label}</span>
              <span className="relative flex h-6 items-center">
                <span
                  className="h-4 rounded-r-[4px] transition-opacity group-hover:opacity-80"
                  style={{
                    width: pct(d.value),
                    background: emphasised ? "var(--color-chart-bar)" : "var(--color-chart-bar-muted)",
                  }}
                />
                {chart.reference && (
                  <span
                    className="pointer-events-none absolute inset-y-[-5px] border-l border-dashed border-ink-3"
                    style={{ left: pct(chart.reference.value) }}
                  />
                )}
              </span>
              <span className="num text-xs font-medium text-ink">{fmt(d.value, chart.format)}</span>
            </div>
          );
        })}
      </div>

      {chart.reference && (
        <p className="mt-3 flex items-center gap-2 text-xs text-ink-3" aria-hidden="true">
          <span className="inline-block h-3 border-l border-dashed border-ink-3" /> {chart.reference.label}
        </p>
      )}

      <details className="mt-4 text-xs text-ink-3">
        <summary className="cursor-pointer select-none hover:text-ink">Show data table</summary>
        <table className="mt-2 w-full max-w-md text-left">
          <caption className="sr-only">{chart.title}</caption>
          <thead>
            <tr>
              <th scope="col" className="py-1 font-medium text-ink-2">Item</th>
              <th scope="col" className="py-1 text-right font-medium text-ink-2">{chart.unit}</th>
            </tr>
          </thead>
          <tbody>
            {chart.data.map((d) => (
              <tr key={d.label} className="border-t border-line">
                <th scope="row" className="py-1 font-normal text-ink-2">{d.label}</th>
                <td className="num py-1 text-right text-ink-2">{fmt(d.value, chart.format)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className="mt-3 text-[11px] text-ink-3">Source: {chart.source}</p>
    </figure>
  );
}
