import { ArrowLeft, ArrowRight, BarChart3, Database, ExternalLink, NotebookText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart, BulletList, DataTable, KpiGrid, NumberedList } from "@/components/case-study-parts";
import { CaseStudyToc, type TocItem } from "@/components/case-study-toc";
import { CodeBlock } from "@/components/code-block";
import { GitHubIcon } from "@/components/icons";
import { ImageGallery } from "@/components/image-gallery";
import { ProjectThumbnail } from "@/components/project-thumbnail";
import { Container, Pending } from "@/components/ui";
import { getProject, projects } from "@/data/projects";
import type { Project } from "@/data/types";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.problem} ${project.headline.value} ${project.headline.label.toLowerCase()}.`;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: `/projects/${project.slug}`,
      ...(project.thumbnail ? { images: [{ url: project.thumbnail.src, alt: project.thumbnail.alt }] } : {}),
    },
  };
}

/** The 15-stage case-study structure, in order. */
function buildSections(p: Project): { id: string; label: string; content: ReactNode | null }[] {
  const cs = p.caseStudy;
  const has = <T,>(v: T[] | undefined): v is T[] => Array.isArray(v) && v.length > 0;

  return [
    {
      id: "business-problem",
      label: "Business problem",
      content: has(cs.businessProblem) ? (
        <div className="prose-body">
          {cs.businessProblem.map((t) => (
            <p key={t.slice(0, 30)}>{t}</p>
          ))}
          <p className="mt-4 text-sm text-ink-3">
            Stakeholder: <span className="text-ink-2">{p.stakeholder}</span>
          </p>
        </div>
      ) : null,
    },
    {
      id: "dataset",
      label: "Dataset",
      content: cs.dataset ? (
        <div className="space-y-6">
          {cs.dataset.facts && <KpiGrid kpis={cs.dataset.facts} columns={4} />}
          <div className="prose-body">
            {cs.dataset.summary.map((t) => (
              <p key={t.slice(0, 30)}>{t}</p>
            ))}
          </div>
          {p.links.dataset ? (
            <a href={p.links.dataset.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 text-sm">
              <Database className="h-4 w-4" aria-hidden="true" /> {p.links.dataset.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <Pending title="Dataset source link to be added" />
          )}
        </div>
      ) : null,
    },
    { id: "objectives", label: "Objectives", content: has(cs.objectives) ? <NumberedList items={cs.objectives} /> : null },
    {
      id: "tools",
      label: "Tools",
      content: (
        <div className="space-y-5">
          <ul className="flex flex-wrap gap-2">
            {p.tools.map((t) => (
              <li key={t} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink">
                {t}
              </li>
            ))}
          </ul>
          {has(cs.toolsDetail) && (
            <dl className="divide-y divide-line rounded-lg border border-line bg-surface">
              {cs.toolsDetail.map((t) => (
                <div key={t.tool} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                  <dt className="text-sm font-medium text-ink">{t.tool}</dt>
                  <dd className="text-sm leading-relaxed text-ink-2">{t.use}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      ),
    },
    { id: "data-quality", label: "Data quality", content: has(cs.dataQuality) ? <BulletList items={cs.dataQuality} /> : null },
    { id: "cleaning", label: "Cleaning", content: has(cs.cleaning) ? <BulletList items={cs.cleaning} /> : null },
    {
      id: "data-modelling",
      label: "Data modelling",
      content: has(cs.dataModelling) ? (
        <div className="prose-body">
          {cs.dataModelling.map((t) => (
            <p key={t.slice(0, 30)}>{t}</p>
          ))}
        </div>
      ) : null,
    },
    { id: "kpis", label: "KPIs", content: has(cs.kpis) ? <KpiGrid kpis={cs.kpis} /> : null },
    { id: "eda", label: "Exploratory analysis", content: has(cs.eda) ? <BulletList items={cs.eda} /> : null },
    {
      id: "advanced-analysis",
      label: "Advanced analysis",
      content:
        has(cs.advanced) || has(cs.code) ? (
          <div className="space-y-10">
            {cs.advanced?.map((b) => (
              <div key={b.title}>
                <h3 className="text-lg font-semibold text-ink">{b.title}</h3>
                {b.paragraphs && (
                  <div className="prose-body mt-3">
                    {b.paragraphs.map((t) => (
                      <p key={t.slice(0, 30)}>{t}</p>
                    ))}
                  </div>
                )}
                {b.bullets && (
                  <div className="mt-3">
                    <BulletList items={b.bullets} />
                  </div>
                )}
                {b.table && (
                  <div className="mt-4">
                    <DataTable table={b.table} />
                  </div>
                )}
              </div>
            ))}
            {cs.code?.map((c) => (
              <CodeBlock key={c.title} snippet={c} />
            ))}
          </div>
        ) : null,
    },
    {
      id: "visualisations",
      label: "Visualisations",
      content:
        p.gallery.length > 0 || has(cs.charts) ? (
          <div className="space-y-6">
            {cs.charts?.map((c) => (
              <BarChart key={c.title} chart={c} />
            ))}
            {p.gallery.length > 0 && <ImageGallery images={p.gallery} />}
          </div>
        ) : null,
    },
    { id: "key-insights", label: "Key insights", content: has(cs.insights) ? <NumberedList items={cs.insights} /> : null },
    {
      id: "recommendations",
      label: "Recommendations",
      content: has(cs.recommendations) ? <NumberedList items={cs.recommendations} /> : null,
    },
    { id: "limitations", label: "Limitations", content: has(cs.limitations) ? <BulletList items={cs.limitations} /> : null },
    {
      id: "conclusion",
      label: "Conclusion",
      content: has(cs.conclusion) ? (
        <div className="border-l-2 border-accent-fill pl-5 text-lg leading-relaxed text-ink">
          {cs.conclusion.map((t) => (
            <p key={t.slice(0, 30)}>{t}</p>
          ))}
        </div>
      ) : null,
    },
  ];
}

function LinkRow({ project }: { project: Project }) {
  const { links } = project;
  const item = "inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm";
  return (
    <ul className="flex flex-wrap gap-2">
      <li>
        {links.github ? (
          <a href={links.github} target="_blank" rel="noopener noreferrer" className={`${item} border-line-strong bg-surface text-ink hover:border-accent hover:text-accent`}>
            <GitHubIcon className="h-4 w-4" /> View GitHub
          </a>
        ) : (
          <span className={`${item} border-dashed border-line-strong text-ink-3`} title="Repository link to be added">
            <GitHubIcon className="h-4 w-4 opacity-60" /> GitHub repo coming soon
          </span>
        )}
      </li>
      {links.dashboard && (
        <li>
          <a href={links.dashboard.href} className={`${item} border-navy bg-navy text-on-navy hover:bg-accent-strong dark:border-accent-fill dark:bg-accent-fill dark:text-navy-deep`}>
            <BarChart3 className="h-4 w-4" aria-hidden="true" /> {links.dashboard.label}
          </a>
        </li>
      )}
      {links.notebook && (
        <li>
          <a href={links.notebook.href} className={`${item} border-line-strong bg-surface text-ink hover:border-accent hover:text-accent`}>
            <NotebookText className="h-4 w-4" aria-hidden="true" /> {links.notebook.label}
          </a>
        </li>
      )}
      {links.dataset && (
        <li>
          <a href={links.dataset.href} target="_blank" rel="noopener noreferrer" className={`${item} border-line-strong bg-surface text-ink hover:border-accent hover:text-accent`}>
            <Database className="h-4 w-4" aria-hidden="true" /> Dataset source
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      )}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = buildSections(project);
  const toc: TocItem[] = sections.map((s) => ({ id: s.id, label: s.label, pending: s.content === null }));
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.domain,
    description: project.problem,
    keywords: project.tools.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-line">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/projects" className="hover:text-ink">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-2">
                {project.domain}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h1 className="display text-[2.6rem] leading-[1.04] text-ink sm:text-[3.4rem]">{project.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{project.problem}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Categories">
                {project.categories.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/projects?category=${encodeURIComponent(c)}`}
                      className="inline-flex rounded bg-accent-soft px-2 py-0.5 text-xs text-accent-strong hover:underline dark:text-accent"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <LinkRow project={project} />
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-line">
              <ProjectThumbnail project={project} priority sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-6">
            <span className="num display text-5xl text-accent">{project.headline.value}</span>
            <span className="max-w-md text-ink-2">{project.headline.label}</span>
          </div>

          {project.pendingAssets && project.pendingAssets.length > 0 && (
            <div className="mt-8">
              <Pending title="Still to come for this case study">
                <ul className="mt-1 list-inside list-disc">
                  {project.pendingAssets.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </Pending>
            </div>
          )}
        </Container>
      </header>

      {/* Body */}
      <Container className="grid gap-12 py-14 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <CaseStudyToc items={toc} />
          </div>
        </aside>

        <div className="min-w-0 space-y-16">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
              <h2 id={`${s.id}-h`} className="flex items-baseline gap-3 border-b border-line pb-3 text-2xl font-semibold tracking-tight text-ink">
                <span className="num text-sm font-normal text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </h2>
              <div className="mt-6">
                {s.content ?? (
                  <Pending>
                    This section will be added once the analysis outputs are available. No figures have been estimated.
                  </Pending>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-t border-line">
        <Container className="grid gap-4 py-10 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group rounded-lg border border-line bg-surface p-5 hover:border-line-strong">
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-3">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous project
            </span>
            <span className="mt-1 block font-medium text-ink group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group rounded-lg border border-line bg-surface p-5 text-right hover:border-line-strong">
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-3">
              Next project <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-medium text-ink group-hover:text-accent">{next.title}</span>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
