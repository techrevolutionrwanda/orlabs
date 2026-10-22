import { listWebsiteContent } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/**
 * GET /api/portal/content — every record the public website shows, and where
 * each one stands.
 *
 * The list is worked out from the records themselves: a page is published
 * when the records on it are.
 */
export async function GET() {
  const { response } = await requirePortalSession();

  if (response) return response;

  return Response.json({ content: await listWebsiteContent() });
}
