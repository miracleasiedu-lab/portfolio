"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { CodeSnippet } from "@/data/types";

const LANG: Record<CodeSnippet["language"], string> = {
  sql: "SQL",
  python: "Python",
  dax: "DAX",
  excel: "Formula",
};

export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the code is still selectable */
    }
  };

  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-navy-deep">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="text-sm text-on-navy">{snippet.title}</span>
        <span className="flex items-center gap-2">
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-on-navy/75">{LANG[snippet.language]}</span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-8 items-center gap-1.5 rounded px-2 text-xs text-on-navy/75 hover:bg-white/10 hover:text-on-navy"
            aria-label={copied ? "Copied" : `Copy ${snippet.title}`}
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </span>
      </figcaption>
      <pre className="max-h-[28rem] overflow-auto p-4 text-[13px] leading-relaxed text-[#d5e6f5]">
        <code className="font-mono">{snippet.code}</code>
      </pre>
    </figure>
  );
}
