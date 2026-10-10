"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "theme";

/**
 * Runs before first paint so the page never flashes the wrong theme.
 * Uses the saved choice if there is one, otherwise the system setting.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('${KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable: the choice lasts for this page view only */
    }
    setDark(next);
  };

  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {dark === null ? (
        <span className="h-[18px] w-[18px]" />
      ) : dark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
