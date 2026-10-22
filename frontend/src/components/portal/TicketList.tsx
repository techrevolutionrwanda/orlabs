"use client";

import { useState } from "react";

import type { PortalTicket, TicketStatus } from "@/src/data/portal/types";

import { StatusChip } from "./StatusChip";

const statuses: TicketStatus[] = ["open", "waiting", "resolved"];

/**
 * The support tickets.
 *
 * The state of a ticket can be changed here. `tickets` seeds the list — the
 * rows then belong to this component.
 */
export function TicketList({
  tickets,
  readOnly = false,
}: {
  tickets: PortalTicket[];
  readOnly?: boolean;
}) {
  const [items, setItems] = useState(tickets);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function changeStatus(id: string, status: TicketStatus) {
    setPendingId(id);
    setError("");

    try {
      const response = await fetch(`/api/portal/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const body = (await response.json()) as {
        ticket?: PortalTicket;
        error?: string;
      };

      if (!response.ok || !body.ticket) {
        throw new Error(body.error ?? "The change could not be saved.");
      }

      setItems((current) =>
        current.map((ticket) => (ticket.id === id ? body.ticket! : ticket)),
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
        {items.map((ticket) => (
          <li
            key={ticket.id}
            className="motion-lift grid gap-4 rounded-card border border-border bg-surface p-6 lg:grid-cols-[1.6fr_1fr_auto] lg:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[1.0625rem] font-semibold text-navy">
                  {ticket.subject}
                </h3>
                <StatusChip value={ticket.severity} label={ticket.severity} />
              </div>
              <p className="mt-1.5 text-[0.875rem] text-ink-muted">
                {ticket.requester} · {ticket.channel}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 text-[0.8125rem]">
              <div>
                <dt className="text-ink-subtle">Updated</dt>
                <dd className="mt-0.5 text-ink">{ticket.updatedOn}</dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Reference</dt>
                <dd className="mt-0.5 text-ink">{ticket.id.toUpperCase()}</dd>
              </div>
            </dl>

            <div className="flex items-center gap-3">
              <StatusChip value={ticket.status} />
              {readOnly ? null : (
                <>
                  <label className="sr-only" htmlFor={`ticket-status-${ticket.id}`}>
                    Change the state of {ticket.subject}
                  </label>
                  <select
                    id={`ticket-status-${ticket.id}`}
                    className="min-h-[40px] rounded-[10px] border border-border bg-surface px-3 text-[0.875rem] text-ink transition-colors focus:border-border-strong disabled:opacity-60"
                    value={ticket.status}
                    disabled={pendingId === ticket.id}
                    onChange={(event) =>
                      changeStatus(ticket.id, event.target.value as TicketStatus)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  {pendingId === ticket.id ? (
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
