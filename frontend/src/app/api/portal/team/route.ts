import { listRecords } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/** GET /api/portal/team — the people on the roster. */
export async function GET() {
  const { response } = await requirePortalSession();

  if (response) return response;

  return Response.json({ team: await listRecords("team") });
}
