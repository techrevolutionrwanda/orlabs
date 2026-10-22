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

/**
 * Reads the body of a request as a set of fields.
 *
 * Anything that is not a plain object of fields — no body at all, a list, a
 * broken piece of JSON — comes back as `null`, so a handler can answer with a
 * clear message instead of failing somewhere further down.
 */
export async function readJsonBody(
  request: Request,
): Promise<Record<string, unknown> | null> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return null;
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return null;

  return body as Record<string, unknown>;
}

/**
 * Requires an administrator.
 *
 * Reading is open to everybody who is signed in; writing is not. A worker
 * moves tasks along and closes tickets — nothing else — and those changes
 * are made through the routes that know the difference.
 */
export async function requirePortalAdmin(): Promise<PortalRequest> {
  const { session, response } = await requirePortalSession();

  if (response) return { session: null, response };

  if (session.role !== "admin") {
    return {
      session: null,
      response: Response.json(
        { error: "Only an administrator can make this change." },
        { status: 403 },
      ),
    };
  }

  return { session, response: null };
}
