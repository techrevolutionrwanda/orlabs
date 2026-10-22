"use client";

import { ProgressBar } from "@/src/components/motion/ProgressBar";
import { Picture } from "@/src/components/site/Picture";
import { StatusChip } from "./StatusChip";
import type { PortalProject } from "@/src/data/portal/types";

/**
 * The delivery projects, each with the progress of the work.
 */
export function ProjectList({ projects }: { projects: PortalProject[] }) {
  return (
    <ul
      data-reveal-group
      className="grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2"
    >
      {projects.map((project) => (
        <li
          key={project.id}
          className="motion-lift grid content-start gap-4 rounded-card border border-border bg-surface p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-h3 font-semibold text-navy">{project.name}</h3>
              <p className="mt-1 text-[0.875rem] text-ink-subtle">{project.client}</p>
            </div>
            <StatusChip value={project.status} />
          </div>

          {project.imageUrl ? (
            // The picture of the project, when the record carries one. A
            // record without a picture simply shows none.
            <Picture
              src={project.imageUrl}
              alt={project.name}
              placeholder="No picture yet"
              className="aspect-[16/9] w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          ) : null}

          <p className="text-[0.9375rem] text-ink-muted">{project.summary}</p>

          <div>
            <div className="mb-2 flex items-center justify-between text-[0.8125rem] text-ink-muted">
              <span>Progress</span>
              <span className="font-semibold text-navy">{project.progress}%</span>
            </div>
            <ProgressBar
              value={project.progress}
              label={`${project.name} progress`}
            />
          </div>

          <dl className="grid grid-cols-2 gap-4 text-[0.8125rem]">
            <div>
              <dt className="text-ink-subtle">Started</dt>
              <dd className="mt-0.5 text-ink">{project.startedOn}</dd>
            </div>
            <div>
              <dt className="text-ink-subtle">Target</dt>
              <dd className="mt-0.5 text-ink">{project.targetDate}</dd>
            </div>
          </dl>

          <ul className="flex list-none flex-wrap gap-2 p-0">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full bg-chip px-3 py-1 text-[0.75rem] text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
