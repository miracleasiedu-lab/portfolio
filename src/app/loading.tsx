import { Container } from "@/components/ui";

export default function Loading() {
  return (
    <Container className="py-20">
      <p className="sr-only" role="status">
        Loading
      </p>
      <div aria-hidden="true" className="space-y-4">
        <div className="h-14 w-2/3 max-w-lg animate-pulse rounded bg-surface-2" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-surface-2" />
        <div className="h-5 w-4/5 max-w-xl animate-pulse rounded bg-surface-2" />
      </div>
    </Container>
  );
}
