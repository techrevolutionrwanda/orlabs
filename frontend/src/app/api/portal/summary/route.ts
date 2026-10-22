import { requirePortalSession } from "@/src/lib/portal/api";
import { portalSummary } from "@/src/data/portal/store";

/**
 * GET /api/portal/summary — the numbers on the dashboard.
 *
 * The figures are counted from the mock store, never written down by hand.
 */
export async function GET(request: Request) {
  const { session, response } = await requirePortalSession();

  if (response) return response;

  const requested = new URL(request.url).searchParams.get("role");
  const role = requested === "admin" || requested === "worker"
    ? requested
    : session.role;

  return Response.json(portalSummary(role, session.userId));
}
