import { listRecords } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/** GET /api/portal/tickets — the support tickets. */
export async function GET(request: Request) {
  const { response } = await requirePortalSession();

  if (response) return response;

  const status = new URL(request.url).searchParams.get("status");

  let tickets = await listRecords("tickets");

  if (status) {
    tickets = tickets.filter((ticket) => ticket.status === status);
  }

  return Response.json({ tickets });
}
