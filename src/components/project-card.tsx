import { BarChart3, FileText } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/types";
import { GitHubIcon } from "./icons";
import { ProjectThumbnail } from "./project-thumbnail";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { links } = project;
  const caseHref = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong">
      <Link href={caseHref} tabIndex={-1} aria-hidden="true" className="block border-b border-line">
        <ProjectThumbnail project={project} priority={priority} />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-ink-3">{project.domain}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">
          <Link href={caseHref} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{project.problem}</p>

        <p className="mt-4 border-l-2 border-accent-fill pl-3 text-sm text-ink">
          <span className="num font-semibold">{project.headline.value}</span>{" "}
          <span className="text-ink-2">{project.headline.label.charAt(0).toLowerCase() + project.headline.label.slice(1)}</span>
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools used">
          {project.tools.slice(0, 5).map((t) => (
            <li key={t} className="rounded bg-surface-2 px-2 py-0.5 text-xs text-ink-2">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          <Link href={caseHref} className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-strong">
            <FileText className="h-4 w-4" aria-hidden="true" />
            View case study
            <span className="sr-only">: {project.title}</span>
          </Link>
          {links.github ? (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-2 hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" /> View GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-ink-3" title="Repository link to be added">
              <GitHubIcon className="h-4 w-4 opacity-60" /> GitHub soon
            </span>
          )}
          {links.dashboard && (
            <a href={links.dashboard.href} className="inline-flex items-center gap-1.5 text-ink-2 hover:text-accent">
              <BarChart3 className="h-4 w-4" aria-hidden="true" /> View dashboard
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
