"use client";

import { StatusChip } from "./StatusChip";
import type { TeamMember } from "@/src/data/portal/types";

/**
 * The roster.
 */
export function TeamList({ team }: { team: TeamMember[] }) {
  return (
    <ul
      data-reveal-group
      className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3"
    >
      {team.map((member) => (
        <li
          key={member.id}
          className="motion-lift grid content-start gap-3 rounded-card border border-border bg-surface p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-h3 font-semibold text-navy">{member.name}</h3>
              <p className="mt-1 text-[0.875rem] text-ink-subtle">
                {member.discipline}
              </p>
            </div>
            <StatusChip value={member.availability} />
          </div>

          <dl className="grid grid-cols-2 gap-4 text-[0.8125rem]">
            <div>
              <dt className="text-ink-subtle">Location</dt>
              <dd className="mt-0.5 text-ink">{member.location}</dd>
            </div>
            <div>
              <dt className="text-ink-subtle">With us since</dt>
              <dd className="mt-0.5 text-ink">{member.since}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
