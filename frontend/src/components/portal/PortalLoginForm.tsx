"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "min-h-[48px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

/**
 * The sign-in form.
 *
 * There is no identity provider behind it yet, so it says so instead of
 * pretending. The values a visitor types stay in the form.
 */
export function PortalLoginForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(
      "Sign-in is not connected yet — this build has no identity provider. Use the development role switcher below to open the portal.",
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="portal-email">
          Work email
        </label>
        <input
          className={fieldClass}
          id="portal-email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="you@orlabs.co"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="portal-password">
          Password
        </label>
        <input
          className={fieldClass}
          id="portal-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" type="submit">
          Sign in
        </button>
        <p
          className={`min-h-5 text-sm text-ink-muted ${message ? "status-in" : ""}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </form>
  );
}
