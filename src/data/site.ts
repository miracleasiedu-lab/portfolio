/**
 * Site-wide personal details.
 * Edit this file to update contact details, links and the CV file name.
 */
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
  /** Set NEXT_PUBLIC_SITE_URL in Vercel (or .env.local) to your live URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
