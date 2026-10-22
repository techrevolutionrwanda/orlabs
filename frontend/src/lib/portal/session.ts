import { cookies } from "next/headers";

import {
  decodePortalSession,
  encodePortalSession,
  PORTAL_SESSION_COOKIE,
  type PortalRole,
  type PortalSession,
} from "./token";

/**
 * Reads and writes the portal session cookie.
 *
 * `cookies()` is asynchronous in this version of Next.js, so every helper
 * here is asynchronous too. Anything that reads the session from a page has
 * to sit inside a `<Suspense>` boundary, otherwise the page cannot be
 * prerendered.
 */

export const demoUsers: Record<PortalRole, { userId: string; name: string }> =
  {
    admin: { userId: "tm-001", name: "Demo administrator" },
    worker: { userId: "tm-002", name: "Demo worker" },
  };

export async function readPortalSession(): Promise<PortalSession | null> {
  const store = await cookies();

  return decodePortalSession(store.get(PORTAL_SESSION_COOKIE)?.value);
}

export async function createPortalSession(
  role: PortalRole,
): Promise<PortalSession> {
  const session: PortalSession = {
    role,
    userId: demoUsers[role].userId,
    name: demoUsers[role].name,
    issuedAt: new Date().toISOString(),
  };

  const store = await cookies();

  store.set(PORTAL_SESSION_COOKIE, await encodePortalSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return session;
}

export async function clearPortalSession(): Promise<void> {
  const store = await cookies();

  store.delete(PORTAL_SESSION_COOKIE);
}
