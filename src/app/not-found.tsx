import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="max-w-xl">
        <p className="num text-sm text-ink-3">404</p>
        <h1 className="display mt-2 text-5xl text-ink">There&apos;s no page at this address</h1>
        <p className="mt-4 leading-relaxed text-ink-2">
          The link may be out of date or mistyped. All case studies are listed on the projects page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/projects">Browse projects</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Go to the home page
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
