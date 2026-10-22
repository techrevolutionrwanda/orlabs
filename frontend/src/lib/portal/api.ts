import { readPortalSession } from "./session";
import type { PortalSession } from "./token";

/**
 * Shared plumbing for the portal API.
 *
 * Every handler needs a signed-in visitor. The proxy already keeps anonymous
 * visitors out of the portal pages, but the API is checked again here so a
 * leaked URL is not enough to read the workspace.
 */

export type PortalRequest =
  | { session: PortalSession; response: null }
  | { session: null; response: Response };

export async function requirePortalSession(): Promise<PortalRequest> {
  const session = await readPortalSession();

  if (!session) {
    return {
      session: null,
      response: Response.json(
        { error: "You are not signed in to the portal." },
        { status: 401 },
      ),
    };
  }

  return { session, response: null };
}
