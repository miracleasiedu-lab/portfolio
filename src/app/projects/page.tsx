import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGallery } from "@/components/project-gallery";
import { Container, SectionHeading } from "@/components/ui";
import { projects } from "@/data/projects";
import { ProjectGridSkeleton } from "@/components/project-grid-skeleton";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Twelve data analytics projects in Excel, SQL, Python, Power BI, Tableau and machine learning, each with a full case study.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        as="h1"
        title="Projects"
        intro="Twelve projects across healthcare, e-commerce, finance, HR, sport and retail. Filter by tool or search by topic, then open any project for the full case study."
      />
      <div className="mt-10">
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectGallery projects={projects} />
        </Suspense>
      </div>
    </Container>
  );
}
