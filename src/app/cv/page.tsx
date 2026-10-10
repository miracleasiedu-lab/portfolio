import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CvButton } from "@/components/cv-button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { cvProjectSlugs, cvSkills, education, experience, summary } from "@/data/profile";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "CV",
  description: `CV of ${site.name}, Data Analyst at DataMetrics Ltd in London: experience, education, skills and selected projects.`,
  alternates: { canonical: "/cv" },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 className="text-sm font-medium text-ink-3">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function CvPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="display text-5xl text-ink sm:text-6xl">{site.name}</h1>
            <p className="mt-2 text-ink-2">{site.title}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-ink-3" aria-hidden="true" /> {site.location}
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-accent">
                  <Mail className="h-4 w-4 text-ink-3" aria-hidden="true" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                  <LinkedInIcon className="h-4 w-4 text-ink-3" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                  <GitHubIcon className="h-4 w-4 text-ink-3" /> GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="no-print">
            <CvButton variant="primary" />
          </div>
        </header>

        <Block title="Professional profile">
          <p className="text-lg leading-relaxed text-ink">{summary}</p>
        </Block>

        <Block title="Professional experience">
          <ol className="space-y-8">
            {experience.map((r) => (
              <li key={r.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-ink">{r.title}</h3>
                  <p className="text-sm text-ink-3">
                    {r.start} – {r.end}
                  </p>
                </div>
                <p className="text-ink-2">
                  {r.company}, {r.location}
                </p>
                <ul className="mt-3 space-y-2">
                  {r.bullets.map((b) => (
                    <li key={b} className="relative pl-5 text-sm leading-relaxed text-ink-2">
                      <span className="absolute left-0 top-[0.6em] h-[5px] w-[5px] rounded-full bg-accent-fill" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Education">
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.qualification}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold text-ink">{e.qualification}</h3>
                  <p className="text-sm text-ink-3">{e.dates}</p>
                </div>
                {e.institution && <p className="text-ink-2">{e.institution}</p>}
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{e.detail}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Technical skills">
          <ul className="flex flex-wrap gap-2">
            {cvSkills.map((s) => (
              <li key={s} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink">
                {s}
              </li>
            ))}
          </ul>
          <Link href="/skills" className="link mt-4 inline-block text-sm">
            Full skills breakdown
          </Link>
        </Block>

        <Block title="Selected projects">
          <ul className="space-y-4">
            {cvProjectSlugs.map((slug) => {
              const p = getProject(slug);
              if (!p) return null;
              return (
                <li key={slug}>
                  <Link href={`/projects/${slug}`} className="font-medium text-ink hover:text-accent">
                    {p.title}
                  </Link>
                  <p className="text-sm text-ink-2">
                    {p.tools.slice(0, 3).join(", ")}. {p.headline.value} {p.headline.label.charAt(0).toLowerCase() + p.headline.label.slice(1)}.
                  </p>
                </li>
              );
            })}
          </ul>
        </Block>
      </div>
    </Container>
  );
}
