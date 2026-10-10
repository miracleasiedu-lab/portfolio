import { ProjectGridSkeleton } from "@/components/project-grid-skeleton";
import { Container } from "@/components/ui";

export default function Loading() {
  return (
    <Container className="py-16 sm:py-20">
      <p className="sr-only" role="status">
        Loading projects
      </p>
      <div className="h-14 w-64 animate-pulse rounded bg-surface-2" />
      <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-surface-2" />
      <div className="mt-10">
        <ProjectGridSkeleton />
      </div>
    </Container>
  );
}
