"use client";

import type { PortalSummary, PortalTask, PortalTicket } from "@/src/data/portal/types";

import { PortalHighlights, PortalMetrics } from "./PortalMetrics";
import { PortalResource } from "./PortalResource";
import { PortalSectionHead } from "./PortalPageHeader";
import { TaskList } from "./TaskList";
import { TicketList } from "./TicketList";
import { usePortalData } from "./usePortalData";

/**
 * The worker overview: what is waiting for this person.
 */
export function WorkerOverview() {
  const summary = usePortalData<PortalSummary>("/api/portal/summary");
  const tasks = usePortalData<{ tasks: PortalTask[] }>(
    "/api/portal/tasks?mine=1",
  );
  const tickets = usePortalData<{ tickets: PortalTicket[] }>(
    "/api/portal/tickets",
  );

  return (
    <div className="grid gap-10">
      <PortalResource state={summary} rows={2}>
        {(data) => (
          <div className="grid gap-4">
            <PortalMetrics metrics={data.metrics} />
            <PortalHighlights highlights={data.highlights} />
          </div>
        )}
      </PortalResource>

      <section>
        <PortalSectionHead
          title="My open tasks"
          lead="The work assigned to you that is not finished yet."
        />
        <PortalResource state={tasks} rows={2}>
          {(data) => (
            <TaskList
              readOnly
              tasks={data.tasks.filter((task) => task.status !== "done").slice(0, 4)}
            />
          )}
        </PortalResource>
      </section>

      <section>
        <PortalSectionHead
          title="Open tickets"
          lead="What the clients are waiting for."
        />
        <PortalResource state={tickets} rows={2}>
          {(data) => (
            <TicketList
              readOnly
              tickets={data.tickets
                .filter((ticket) => ticket.status !== "resolved")
                .slice(0, 3)}
            />
          )}
        </PortalResource>
      </section>
    </div>
  );
}
