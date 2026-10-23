"use client";

import { useActionState } from "react";
import { signInToPortal } from "@/src/app/(portal)/portal/actions";

const fieldClass =
  "min-h-[48px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

export function PortalLoginForm() {
  const [state, action, isPending] = useActionState(signInToPortal, {});

  return (
    <form className="grid gap-5" action={action}>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="portal-username">
          Username
        </label>
        <input
          className={fieldClass}
          id="portal-username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Admin username"
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
          placeholder="Your password"
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </button>
        <p
          className={`min-h-5 text-sm ${state.error ? "text-red-700" : "text-ink-muted"}`}
          role={state.error ? "alert" : "status"}
          aria-live="polite"
        >
          {state.error}
        </p>
      </div>
    </form>
  );
}
