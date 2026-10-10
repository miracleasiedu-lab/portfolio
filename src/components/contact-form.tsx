"use client";

import { Send } from "lucide-react";
import { useState } from "react";

/**
 * Composes an email in the visitor's own mail app. No server or third-party
 * form service is needed, and nothing is stored.
 */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Add your name and a message so the email has something to say.");
      return;
    }
    setError(null);
    const subject = `Portfolio enquiry from ${name.trim()}${company.trim() ? ` (${company.trim()})` : ""}`;
    const body = `${message.trim()}\n\n${name.trim()}${company.trim() ? `\n${company.trim()}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const field =
    "mt-1.5 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium text-ink">
            Your name
          </label>
          <input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} required />
        </div>
        <div>
          <label htmlFor="cf-company" className="text-sm font-medium text-ink">
            Company <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <input id="cf-company" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The role, the team, or the problem you'd like to talk about"
          className={field}
          required
        />
      </div>
      <p role="alert" data-error hidden={!error} className="text-sm text-red-700 dark:text-red-300">
        {error}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-on-navy hover:bg-accent-strong dark:bg-accent-fill dark:text-navy-deep"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Open in email app
        </button>
        <p className="text-xs text-ink-3" aria-live="polite" data-email={email}>
          {opened ? `Opened your email app. If nothing happened, email ${email} directly.` : "Opens a pre-filled email; nothing is sent from this site."}
        </p>
      </div>
    </form>
  );
}
