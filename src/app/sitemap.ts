export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/skills", "/projects", "/cv", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...caseStudies];
}
