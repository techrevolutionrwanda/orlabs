"use client";

import type { ReactNode } from "react";

/**
 * The messages the content screens show.
 *
 * The portal has one palette, so a message is told apart by its border and
 * its wording, not by a colour of its own.
 */

export function CmsError({ message }: { message: string }) {
  return (
    <p
      className="status-in rounded-card border border-border bg-surface px-5 py-4 text-[0.9375rem] text-ink-muted"
      role="alert"
    >
      {message}
    </p>
  );
}

export function CmsNotice({ children }: { children: ReactNode }) {
  return (
    <p
      className="status-in rounded-card border border-border bg-surface px-5 py-4 text-[0.9375rem] text-ink-muted"
      role="status"
    >
      {children}
    </p>
  );
}

/**
 * The message that belongs to one field.
 */
export function CmsFieldError({ message }: { message: string }) {
  return (
    <p className="mt-1.5 border-l-2 border-l-gold pl-2.5 text-[0.8125rem] font-semibold text-navy">
      {message}
    </p>
  );
}
