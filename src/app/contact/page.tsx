import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}, Data Analyst in London, by email or LinkedIn.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      icon: <LinkedInIcon className="h-5 w-5" />,
      label: "LinkedIn",
      value: "miracle-asiedu-fordjour",
      href: site.linkedin,
      external: true,
    },
    {
      icon: <GitHubIcon className="h-5 w-5" />,
      label: "GitHub",
      value: site.githubUsername,
      href: site.github,
      external: true,
    },
  ];

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        as="h1"
        title="Contact"
        intro="I'm open to Data Analyst and Business Intelligence Analyst roles. The quickest way to reach me is email."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-ink-3">{c.label}</span>
                    <span className="block truncate text-ink">{c.value}</span>
                  </span>
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 px-5 py-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-2">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-ink-3">Location</span>
                <span className="block text-ink">{site.location}</span>
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <ButtonLink href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Email me
            </ButtonLink>
          </div>
        </div>

        <section aria-labelledby="form-heading" className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <h2 id="form-heading" className="text-lg font-semibold text-ink">
            Write a message
          </h2>
          <p className="mt-1 text-sm text-ink-2">This opens your email app with the message ready to send.</p>
          <div className="mt-6">
            <ContactForm email={site.email} />
          </div>
        </section>
      </div>
    </Container>
  );
}
