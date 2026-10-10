"use client";

import { useEffect } from "react";
import { ButtonLink, Container } from "@/components/ui";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <div className="max-w-xl" role="alert">
        <h1 className="display text-5xl text-ink">This page didn&apos;t load</h1>
        <p className="mt-4 leading-relaxed text-ink-2">
          Something went wrong while showing this page. Try loading it again, or go back to the projects.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-on-navy hover:bg-accent-strong dark:bg-accent-fill dark:text-navy-deep"
          >
            Try again
          </button>
          <ButtonLink href="/projects" variant="secondary">
            Go to projects
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
