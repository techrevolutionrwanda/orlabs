"use client";

import { StatusChip } from "./StatusChip";
import type { ContentEntry } from "@/src/data/portal/types";

/**
 * The public pages and where each one stands.
 */
export function ContentList({ content }: { content: ContentEntry[] }) {
  return (
    <ul
      data-reveal-group
      className="grid list-none grid-cols-1 gap-3 p-0"
    >
      {content.map((entry) => (
        <li
          key={entry.id}
          className="motion-lift flex flex-wrap items-center justify-between gap-4 rounded-card border border-border bg-surface px-6 py-4"
        >
          <div>
            <h3 className="text-[1.0625rem] font-semibold text-navy">{entry.title}</h3>
            <p className="mt-0.5 text-[0.8125rem] text-ink-subtle">{entry.path}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-[0.8125rem] text-ink-muted">
              {entry.owner} · {entry.updatedOn}
            </p>
            <StatusChip value={entry.state} />
          </div>
        </li>
      ))}
    </ul>
  );
}
