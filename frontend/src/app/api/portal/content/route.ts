import { listContent } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/** GET /api/portal/content — the public pages and where they stand. */
export async function GET() {
  const { response } = await requirePortalSession();

  if (response) return response;

  return Response.json({ content: listContent() });
}
