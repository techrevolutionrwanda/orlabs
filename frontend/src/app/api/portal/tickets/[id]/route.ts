import { updateRecord } from "@/src/data/portal/store";
import type { TicketStatus } from "@/src/data/portal/types";
import { requirePortalSession } from "@/src/lib/portal/api";

const statuses: TicketStatus[] = ["open", "waiting", "resolved"];

/** PATCH /api/portal/tickets/[id] — move a ticket to another state. */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/portal/tickets/[id]">,
) {
  const { response } = await requirePortalSession();

  if (response) return response;

  const { id } = await params;

  let body: { status?: string };

  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return Response.json(
      { error: "Send the new status as JSON." },
      { status: 400 },
    );
  }

  if (!statuses.includes(body.status as TicketStatus)) {
    return Response.json(
      { error: `Unknown status. Use one of: ${statuses.join(", ")}.` },
      { status: 400 },
    );
  }

  const ticket = await updateRecord("tickets", id, { status: body.status });

  if (!ticket) {
    return Response.json(
      { error: "No ticket with that id." },
      { status: 404 },
    );
  }

  return Response.json({ ticket });
}
