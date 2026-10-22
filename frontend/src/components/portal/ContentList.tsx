"use client";

import type { ResourceKey } from "@/src/lib/portal/resources";

import { StatusChip } from "./StatusChip";

/**
 * One website record, as the content overview shows it.
 */
export type WebsiteContentRow = {
  key: ResourceKey;
  title: string;
  singular: string;
  id: string;
  label: string;
  state: string;
};

/**
 * Every record the public website shows, and where each one stands.
 */
export function ContentList({ content }: { content: WebsiteContentRow[] }) {
  if (content.length === 0) {
    return (
      <p className="rounded-card border border-border bg-surface p-6 text-[0.9375rem] text-ink-muted">
        There is nothing to publish yet. Add a record to one of the website
        collections and it will show up here.
      </p>
    );
  }

  return (
    <ul
      data-reveal-group
      className="grid list-none grid-cols-1 gap-3 p-0"
    >
      {content.map((entry) => (
        <li
          key={`${entry.key}-${entry.id}`}
          className="motion-lift flex flex-wrap items-center justify-between gap-4 rounded-card border border-border bg-surface px-6 py-4"
        >
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-teal-text">
              {entry.title}
            </p>
            <h3 className="mt-1 text-[1.0625rem] font-semibold text-navy">
              {entry.label}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <StatusChip value={entry.state} />
          </div>
        </li>
      ))}
    </ul>
  );
}
