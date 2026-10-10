import type { Metadata } from "next";
import { CvButton } from "@/components/cv-button";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { aboutParagraphs, education, strengths } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Data Analyst in London with 3+ years of experience in SQL, Python, Power BI, Tableau and Excel, business intelligence, data modelling and machine learning.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading as="h1" title="About me" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="prose-body text-[1.05rem]">
          {aboutParagraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects">View projects</ButtonLink>
            <CvButton />
          </div>
        </div>

        <aside aria-labelledby="edu-heading" className="h-fit rounded-xl border border-line bg-surface p-6">
          <h2 id="edu-heading" className="text-sm font-medium text-ink">
            Education
          </h2>
          <ul className="mt-4 space-y-5">
            {education.map((e) => (
              <li key={e.qualification}>
                <p className="font-medium leading-snug text-ink">{e.qualification}</p>
                {e.institution && <p className="mt-0.5 text-sm text-ink-2">{e.institution}</p>}
                <p className="mt-0.5 text-sm text-ink-3">{e.dates}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section aria-labelledby="strengths-heading" className="mt-20">
        <h2 id="strengths-heading" className="display text-4xl text-ink">
          What I bring to a team
        </h2>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s) => (
            <div key={s.title} className="border-t-2 border-accent-fill pt-4">
              <dt className="font-medium text-ink">{s.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Container>
  );
}
