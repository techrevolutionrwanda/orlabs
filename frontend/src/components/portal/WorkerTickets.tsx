"use client";

import type { PortalTicket } from "@/src/data/portal/types";

import { PortalResource } from "./PortalResource";
import { TicketList } from "./TicketList";
import { usePortalData } from "./usePortalData";

/**
 * The support tickets.
 */
export function WorkerTickets() {
  const tickets = usePortalData<{ tickets: PortalTicket[] }>(
    "/api/portal/tickets",
  );

  return (
    <PortalResource state={tickets} rows={3}>
      {(data) => <TicketList tickets={data.tickets} />}
    </PortalResource>
  );
}
