/**
 * Site-wide personal details.
 * Edit this file to update contact details, links and the CV file name.
 */
function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Miracle Fordjour",
  role: "Data Analyst",
  title: "Data Analyst | SQL | Python | Power BI | Machine Learning",
  headline: "Turning Complex Data into Clear Business Decisions",
  location: "London, United Kingdom",
  email: "miracleasiedu@gmail.com",
  linkedin: "https://www.linkedin.com/in/miracle-asiedu-fordjour-28125b119",
  githubUsername: "miracleasiedu-lab",
  github: "https://github.com/miracleasiedu-lab",
  /** Put your CV PDF at public/cv/<cvFileName>. The download buttons switch on automatically. */
  cvFileName: "Miracle-Fordjour-CV.pdf",
  /**
   * Live address, used for canonical links, social previews and the sitemap.
   * On Vercel it is detected automatically; set NEXT_PUBLIC_SITE_URL to override it (e.g. a custom domain).
   */
  url: siteUrl(),
  description:
    "Data Analyst in London with 3+ years of experience in SQL, Python, Power BI, Tableau and machine learning. Case studies covering NHS performance, e-commerce, fraud detection, HR attrition and marketing analytics.",
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
