import { BrainCircuit, ChartColumn, Code2, Database, Library, Workflow, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { skillGroups, type SkillGroup } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "Python, SQL, R, MySQL, PostgreSQL, Power BI, Tableau, Excel, DAX, Pandas, scikit-learn, ETL, data modelling, machine learning and A/B testing.",
  alternates: { canonical: "/skills" },
};

const ICONS: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  database: Database,
  chart: ChartColumn,
  library: Library,
  workflow: Workflow,
  brain: BrainCircuit,
};

/** Map a skill to the projects that show it, by matching tool names. */
const EVIDENCE: Record<string, string[]> = {
  Python: ["nhs-ae-waiting-times", "credit-card-fraud-detection", "employee-attrition-prediction"],
  SQL: ["olist-ecommerce-analytics", "student-performance-analytics"],
  MySQL: ["olist-ecommerce-analytics"],
  "Power BI": ["chocolate-sales-performance"],
  DAX: ["chocolate-sales-performance"],
  Tableau: ["hospital-operations-performance"],
  Excel: ["retail-sales-executive-dashboard"],
  "Scikit-learn": ["credit-card-fraud-detection", "online-shoppers-purchase-intention", "employee-attrition-prediction"],
  "Data Modelling": ["olist-ecommerce-analytics", "fifa23-player-recruitment", "chocolate-sales-performance"],
  "Data Validation": ["olist-ecommerce-analytics", "fifa23-player-recruitment"],
  "Power Query": ["chocolate-sales-performance"],
  ETL: ["uk-weather-analytics", "nhs-ae-waiting-times"],
  Classification: ["credit-card-fraud-detection", "employee-attrition-prediction", "online-shoppers-purchase-intention"],
  Clustering: ["online-shoppers-purchase-intention"],
  "Machine Learning": ["credit-card-fraud-detection", "employee-attrition-prediction", "online-shoppers-purchase-intention"],
  "Statistical Analysis": ["bank-marketing-conversion", "employee-attrition-prediction"],
};

const titleOf = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? slug;

export default function SkillsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        as="h1"
        title="Technical skills"
        intro="Six areas I work across, with links to the projects where each skill is used."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => {
          const Icon = ICONS[g.icon];
          const evidence = Array.from(new Set(g.skills.flatMap((s) => EVIDENCE[s] ?? []))).slice(0, 3);
          return (
            <li key={g.title} className="flex flex-col rounded-xl border border-line bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-lg font-semibold text-ink">{g.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{g.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
                {g.skills.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-page px-2.5 py-1 text-sm text-ink">
                    {s}
                  </li>
                ))}
              </ul>
              {evidence.length > 0 && (
                <div className="mt-auto pt-6">
                  <p className="text-xs text-ink-3">Used in</p>
                  <ul className="mt-1.5 space-y-1 text-sm">
                    {evidence.map((slug) => (
                      <li key={slug}>
                        <Link href={`/projects/${slug}`} className="link">
                          {titleOf(slug)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
