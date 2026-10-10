import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors min-h-11 px-4";
const variants: Record<Variant, string> = {
  primary: "bg-navy text-on-navy hover:bg-accent-strong dark:bg-accent-fill dark:text-navy-deep dark:hover:bg-accent-strong",
  secondary: "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "text-accent hover:bg-accent-soft",
};

export function ButtonLink({
  href,
  variant = "primary",
  external,
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant; external?: boolean; className?: string; children: ReactNode } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith("mailto:") || href.endsWith(".pdf") || href.endsWith(".html")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** A button-shaped label for a link that does not exist yet. */
export function DisabledAction({ children, reason }: { children: ReactNode; reason: string }) {
  return (
    <span
      className={`${base} cursor-not-allowed border border-dashed border-line-strong text-ink-3`}
      aria-disabled="true"
      title={reason}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  intro,
  as: Tag = "h2",
  action,
  id,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-2xl">
        <Tag id={id} className={`display text-ink ${Tag === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-[2.75rem]"}`}>
          {title}
        </Tag>
        {intro && <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-lg">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Tag({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${
        tone === "accent" ? "bg-accent-soft text-accent-strong dark:text-accent" : "bg-surface-2 text-ink-2"
      }`}
    >
      {children}
    </span>
  );
}

/** Marks content that is missing on purpose so it is easy to find and replace. */
export function Pending({ title = "To be added", children }: { title?: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-surface/60 p-4 text-sm text-ink-3">
      <p className="font-medium text-ink-2">{title}</p>
      {children && <div className="mt-1 leading-relaxed">{children}</div>}
    </div>
  );
}
