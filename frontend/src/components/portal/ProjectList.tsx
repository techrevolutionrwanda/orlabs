"use client";

import { ProgressBar } from "@/src/components/motion/ProgressBar";
import type { BackendProject } from "@/src/data/portal/types";

/**
 * The delivery projects, each with the progress of the work.
 */
export function ProjectList({
  projects,
  progressValues = {},
  onProgressChange,
  deletingId = "",
  onEdit,
  onDelete,
}: {
  projects: BackendProject[];
  progressValues?: Record<string, string>;
  onProgressChange?: (id: string, value: string) => void;
  deletingId?: string;
  onEdit?: (project: BackendProject) => void;
  onDelete?: (project: BackendProject) => void;
}) {
  return (
    <ul
      data-reveal-group
      className="grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2"
    >
      {projects.map((project) => (
        <li
          key={project._id}
          className="motion-lift grid content-start gap-4 rounded-card border border-border bg-surface p-6"
        >
          <div>
            <h3 className="text-h3 font-semibold text-navy">
              {project.projectName}
            </h3>
            <p className="mt-1 text-[0.875rem] text-ink-subtle">
              {project.client.clientName} · {project.client.role} ·{" "}
              {project.client.companyName}
            </p>
          </div>

          <p className="text-[0.9375rem] text-ink-muted">
            {project.oneLineSummary}
          </p>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-[0.8125rem] text-ink-muted">
              <label htmlFor={`progress-${project._id}`}>
                Progress percentage
              </label>
              {onProgressChange ? (
                <div className="flex items-center gap-1">
                  <input
                    id={`progress-${project._id}`}
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    inputMode="numeric"
                    value={progressValues[project._id] ?? "0"}
                    onChange={(event) =>
                      onProgressChange(project._id, event.currentTarget.value)
                    }
                    className="min-h-9 w-20 rounded-[10px] border border-border bg-surface px-2 text-right text-ink focus:border-border-strong"
                    aria-label={`${project.projectName} progress percentage`}
                  />
                  <span>%</span>
                </div>
              ) : (
                <span className="font-semibold text-navy">0%</span>
              )}
            </div>
            <ProgressBar
              value={Math.min(
                100,
                Math.max(0, Number(progressValues[project._id] ?? 0) || 0),
              )}
              label={`${project.projectName} progress`}
            />
          </div>

          <dl className="grid grid-cols-2 gap-4 text-[0.8125rem]">
            <div>
              <dt className="text-ink-subtle">Started</dt>
              <dd className="mt-0.5 text-ink">
                {formatProjectDate(project.startDate)}
              </dd>
            </div>
            <div>
              <dt className="text-ink-subtle">Target</dt>
              <dd className="mt-0.5 text-ink">
                {formatProjectDate(project.targetDate)}
              </dd>
            </div>
          </dl>

          <ul className="flex list-none flex-wrap gap-2 p-0">
            {project.techenologies
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
              .map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-chip px-3 py-1 text-[0.75rem] text-ink-muted"
                >
                  {item}
                </li>
              ))}
          </ul>

          {onEdit && onDelete ? (
            <div className="flex flex-wrap gap-3 border-t border-border pt-4">
              <button
                className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-border-strong"
                type="button"
                onClick={() => onEdit(project)}
              >
                Edit
              </button>
              <button
                className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-700 disabled:opacity-60"
                type="button"
                disabled={deletingId === project._id}
                onClick={() => onDelete(project)}
              >
                {deletingId === project._id ? "Deleting…" : "Delete"}
              </button>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function formatProjectDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
}
