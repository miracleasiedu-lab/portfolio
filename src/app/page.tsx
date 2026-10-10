import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { CvButton } from "@/components/cv-button";
import { HeroLedger } from "@/components/hero-ledger";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { experience, skillGroups, summary } from "@/data/profile";
import { featuredProjects, getProject } from "@/data/projects";
import { site } from "@/data/site";
import type { Project } from "@/data/types";

const ledgerSlugs = [
  "nhs-ae-waiting-times",
  "credit-card-fraud-detection",
  "olist-ecommerce-analytics",
  "bank-marketing-conversion",
  "online-shoppers-purchase-intention",
  "employee-attrition-prediction",
];

const featuredSkills = ["SQL", "Python", "Power BI", "Tableau", "Excel", "Machine Learning", "Data Modelling"];

/** Business case studies: the question, what the data showed, and what to do about it. */
const businessCases: { slug: string; question: string; finding: string; action: string }[] = [
  {
    slug: "bank-marketing-conversion",
    question: "Where is a bank's telephone campaign wasting calls?",
    finding:
      "Customers called 6+ times used 34.4% of all attempts and produced 4.8% of conversions. Five simple rules put 37.4% of customers behind 63.9% of conversions.",
    action: "Re-sequence call lists by segment and cap attempts at about 3 for cold contacts and up to 5 for warm ones.",
  },
  {
    slug: "nhs-ae-waiting-times",
    question: "Is A&E pressure system-wide or concentrated?",
    finding:
      "Both: 74.21% of 22.5M attendances were seen within four hours, against a 95% standard, while breaches and 12-hour DTA waits cluster in a defined group of trusts.",
    action: "Run a two-track response: system-wide capacity planning plus targeted reviews of the trusts at the top of the priority score.",
  },
  {
    slug: "retail-sales-executive-dashboard",
    question: "Why is a growing retailer leaking profit?",
    finding:
      "Order lines discounted above 20% lost $135K, and Furniture earns a 2.5% margin on 32% of sales.",
    action: "Cap discounts at 20% with manager approval above it, and reprice Tables and Bookcases.",
  },
];

export default function HomePage() {
  const ledger = ledgerSlugs.map(getProject).filter(Boolean) as Project[];
  const current = experience[0];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-sm text-ink-2">{site.title}</p>
            <h1 className="display mt-5 text-[2.9rem] leading-[1.02] text-ink sm:text-6xl lg:text-[4.4rem]">
              {site.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              I&apos;m {site.name}, a Data Analyst in London. I turn large, messy datasets into dashboards, models and
              recommendations that managers can act on, using SQL, Python, Power BI, Tableau and machine learning.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">View projects</ButtonLink>
              <CvButton />
              <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2 hover:text-ink"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2 hover:text-ink"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2" aria-label="Featured skills">
              {featuredSkills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-fill" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <HeroLedger projects={ledger} />
        </Container>
      </section>

      {/* Professional summary */}
      <section aria-labelledby="summary-heading">
        <Container className="grid gap-10 py-20 md:grid-cols-[1fr_1.4fr]">
          <h2 id="summary-heading" className="display text-4xl text-ink sm:text-[2.75rem]">
            Analysis that holds up when someone checks it
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-ink">{summary}</p>
            <p className="mt-4 leading-relaxed text-ink-2">
              I work on business intelligence and reporting automation, data modelling, statistical analysis and predictive
              models, and I spend as much effort validating data and explaining limits as I do building visuals. My
              background in Biomedical Science taught me to think in evidence, samples and confounders.
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-ink-3">Experience</dt>
                <dd className="mt-1 text-sm text-ink">3+ years in data analytics</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-3">Current role</dt>
                <dd className="mt-1 text-sm text-ink">
                  {current.title}, {current.company}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-3">Based in</dt>
                <dd className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink">
                  <MapPin className="h-3.5 w-3.5 text-ink-3" aria-hidden="true" /> London, UK
                </dd>
              </div>
            </dl>
            <Link href="/about" className="link mt-6 inline-block text-sm">
              More about me
            </Link>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="border-y border-line bg-surface">
        <Container className="py-20">
          <SectionHeading
            id="skills-heading"
            title="Technical skills"
            intro="The tools I use from extraction to explanation."
            action={
              <Link href="/skills" className="link text-sm">
                All skills
              </Link>
            }
          />
          <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.title} className="border-t border-line pt-4">
                <dt className="text-sm font-medium text-ink">{g.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{g.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="featured-heading">
        <Container className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 id="featured-heading" className="display text-4xl text-ink sm:text-[2.75rem]">
                Featured projects
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-2">
                Four end-to-end case studies, each from raw data to recommendations.
              </p>
            </div>
            <ButtonLink href="/projects" variant="secondary">
              See all 12 projects
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Business case studies */}
      <section aria-labelledby="cases-heading" className="bg-navy-deep text-on-navy">
        <Container className="py-20">
          <h2 id="cases-heading" className="display max-w-2xl text-4xl sm:text-[2.75rem]">
            Business case studies
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-on-navy/75">
            The question a manager asked, what the data showed, and what I recommended.
          </p>
          <div className="mt-12 space-y-0 divide-y divide-white/10 border-y border-white/10">
            {businessCases.map((c) => {
              const p = getProject(c.slug);
              if (!p) return null;
              return (
                <article key={c.slug} className="grid gap-6 py-8 lg:grid-cols-[1fr_1.3fr_1.3fr] lg:gap-10">
                  <div>
                    <p className="text-xs text-on-navy/55">{p.domain}</p>
                    <h3 className="mt-1.5 text-xl font-medium leading-snug">{c.question}</h3>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-accent-fill hover:underline"
                    >
                      Read the case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">: {p.title}</span>
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs text-on-navy/55">What the data showed</p>
                    <p className="mt-1.5 leading-relaxed text-on-navy/90">{c.finding}</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-navy/55">Recommendation</p>
                    <p className="mt-1.5 leading-relaxed text-on-navy/90">{c.action}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CV */}
      <section aria-labelledby="cv-heading">
        <Container className="grid gap-10 py-20 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="cv-heading" className="display text-4xl text-ink sm:text-[2.75rem]">
              CV
            </h2>
            <p className="mt-3 leading-relaxed text-ink-2">
              Experience, education and skills on one page, ready to download.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/cv" variant="secondary">
                View CV
              </ButtonLink>
              <CvButton />
            </div>
          </div>
          <ol className="space-y-6 border-l border-line pl-6">
            {experience.map((r) => (
              <li key={r.company} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-page bg-accent-fill" aria-hidden="true" />
                <p className="text-sm text-ink-3">
                  {r.start} – {r.end}
                </p>
                <p className="mt-0.5 font-medium text-ink">
                  {r.title}, {r.company}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{r.bullets[0]}</p>
              </li>
            ))}
            <li className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-page bg-line-strong" aria-hidden="true" />
              <p className="text-sm text-ink-3">2021 – 2025</p>
              <p className="mt-0.5 font-medium text-ink">BSc (Hons) Biomedical Science, University of East London</p>
            </li>
          </ol>
        </Container>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="border-t border-line bg-surface">
        <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 id="contact-heading" className="display text-4xl text-ink sm:text-[2.75rem]">
              Hiring for a data role?
            </h2>
            <p className="mt-3 leading-relaxed text-ink-2">
              I&apos;m open to Data Analyst and Business Intelligence Analyst roles in London and across the UK.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Email me
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact details
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
