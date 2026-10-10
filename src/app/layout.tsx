import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "@fontsource/instrument-serif/400.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeScript } from "@/components/theme";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Data Analyst in London`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Data Analyst",
    "Business Intelligence Analyst",
    "London",
    "SQL",
    "Python",
    "Power BI",
    "Tableau",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: `${site.name} | Data Analyst`,
    title: `${site.name} | Data Analyst in London`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Data Analyst in London`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#071426" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["SQL", "Python", "Power BI", "Tableau", "Excel", "Machine Learning", "Data Modelling"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
