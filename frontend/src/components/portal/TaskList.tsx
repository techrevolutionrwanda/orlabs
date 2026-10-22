"use client";

import { useState } from "react";

import type { PortalTask, TaskStatus } from "@/src/data/portal/types";

import { StatusChip, statusLabel } from "./StatusChip";

const statuses: TaskStatus[] = ["todo", "in-progress", "review", "done"];

/**
 * The task list.
 *
 * The state of a task can be changed here. The change goes to the API and
 * the row is only updated once the server has accepted it. `tasks` seeds the
 * list — the rows then belong to this component.
 */
export function TaskList({
  tasks,
  readOnly = false,
}: {
  tasks: PortalTask[];
  readOnly?: boolean;
}) {
  const [items, setItems] = useState(tasks);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function changeStatus(id: string, status: TaskStatus) {
    setPendingId(id);
    setError("");

    try {
      const response = await fetch(`/api/portal/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const body = (await response.json()) as {
        record?: PortalTask;
        error?: string;
      };

      if (!response.ok || !body.record) {
        throw new Error(body.error ?? "The change could not be saved.");
      }

      setItems((current) =>
        current.map((task) => (task.id === id ? body.record! : task)),
      );
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "The change could not be saved.",
      );
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="grid gap-4">
      {error ? (
        <p
          className="status-in rounded-card border border-border bg-surface px-5 py-4 text-[0.9375rem] text-ink-muted"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <ul
        data-reveal-group
        className="grid list-none grid-cols-1 gap-4 p-0"
      >
        {items.map((task) => (
          <li
            key={task.id}
            className="motion-lift grid gap-4 rounded-card border border-border bg-surface p-6 lg:grid-cols-[1.6fr_1fr_auto] lg:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[1.0625rem] font-semibold text-navy">
                  {task.title}
                </h3>
                <StatusChip value={task.priority} label={statusLabel(task.priority)} />
              </div>
              <p className="mt-1.5 text-[0.875rem] text-ink-muted">
                {task.projectName} · {task.assigneeName}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 text-[0.8125rem]">
              <div>
                <dt className="text-ink-subtle">Due</dt>
                <dd className="mt-0.5 text-ink">{task.dueDate}</dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Estimate</dt>
                <dd className="mt-0.5 text-ink">{task.estimate}</dd>
              </div>
            </dl>

            <div className="flex items-center gap-3">
              <StatusChip value={task.status} />
              {readOnly ? null : (
                <>
                  <label className="sr-only" htmlFor={`status-${task.id}`}>
                    Change the state of {task.title}
                  </label>
                  <select
                    id={`status-${task.id}`}
                    className="min-h-[40px] rounded-[10px] border border-border bg-surface px-3 text-[0.875rem] text-ink transition-colors focus:border-border-strong disabled:opacity-60"
                    value={task.status}
                    disabled={pendingId === task.id}
                    onChange={(event) =>
                      changeStatus(task.id, event.target.value as TaskStatus)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabel(status)}
                      </option>
                    ))}
                  </select>
                  {pendingId === task.id ? (
                    <span className="spinner text-ink-subtle" aria-hidden="true" />
                  ) : null}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
