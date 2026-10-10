"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import { ThemeToggle } from "./theme";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/85 backdrop-blur-md supports-[backdrop-filter]:bg-page/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${site.name}, home`}>
          <span className="display text-[1.6rem] leading-none text-ink">{site.name}</span>
          <span className="hidden text-xs text-ink-3 sm:inline">Data Analyst, London</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                      active ? "text-ink" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-accent-fill" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-surface md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-line py-3.5 text-base last:border-0 ${
                      active ? "font-medium text-ink" : "text-ink-2"
                    }`}
                  >
                    {item.label}
                    {active && <span className="h-2 w-2 rounded-full bg-accent-fill" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
