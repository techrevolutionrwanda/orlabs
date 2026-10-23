"use client";

import { useActionState } from "react";
import { updatePortalCredentials } from "@/src/app/(portal)/portal/actions";

const fieldClass =
  "min-h-[48px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

export function AccountSettingsForm({
  username,
}: {
  username: string;
}) {
  const [state, action, isPending] = useActionState(updatePortalCredentials, {});

  return (
    <form className="grid gap-5" action={action}>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="current-password">
          Current password
        </label>
        <input
          className={fieldClass}
          id="current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="new-username">
          New username
        </label>
        <input
          className={fieldClass}
          id="new-username"
          name="newUsername"
          type="text"
          autoComplete="username"
          minLength={3}
          maxLength={128}
          defaultValue={username}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="new-password">
          New password
        </label>
        <input
          className={fieldClass}
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={1024}
          required
        />
        <p className="mt-2 text-sm text-ink-muted">
          Use at least 12 characters.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Update credentials"}
        </button>
        <p
          className={`min-h-5 text-sm ${
            state.error ? "text-red-700" : "text-ink-muted"
          }`}
          role={state.error ? "alert" : "status"}
          aria-live="polite"
        >
          {state.error ?? state.success}
        </p>
      </div>
    </form>
  );
}
