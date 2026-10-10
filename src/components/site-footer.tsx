import { Mail } from "lucide-react";
import Link from "next/link";
import { navItems, site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-navy-deep text-on-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-3xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-on-navy/70">
            Data Analyst in {site.location}. SQL, Python, Power BI, Tableau and machine learning.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-medium text-on-navy/60">Pages</p>
          <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-on-navy/85 hover:text-accent-fill">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-medium text-on-navy/60">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-on-navy/85 hover:text-accent-fill">
                <Mail className="h-4 w-4" aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-navy/85 hover:text-accent-fill">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-navy/85 hover:text-accent-fill">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-on-navy/55 sm:px-6">
          © {year} {site.name}. Figures on this site come from each project&apos;s own outputs.
        </p>
      </div>
    </footer>
  );
}
