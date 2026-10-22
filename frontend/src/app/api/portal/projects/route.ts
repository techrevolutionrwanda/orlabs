import { listRecords } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/** GET /api/portal/projects — every delivery project. */
export async function GET() {
  const { response } = await requirePortalSession();

  if (response) return response;

  return Response.json({ projects: await listRecords("projects") });
}
