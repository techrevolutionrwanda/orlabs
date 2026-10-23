import { cookies } from "next/headers";

import {
  decodePortalSession,
  encodePortalSession,
  PORTAL_SESSION_COOKIE,
  type PortalSession,
} from "./token";

/**
 * Reads and writes the authenticated portal session cookie.
 *
 * `cookies()` is asynchronous in this version of Next.js, so every helper
 * here is asynchronous too. Anything that reads the session from a page has
 * to sit inside a `<Suspense>` boundary, otherwise the page cannot be
 * prerendered.
 */

export async function readPortalSession(): Promise<PortalSession | null> {
  const store = await cookies();

  return decodePortalSession(store.get(PORTAL_SESSION_COOKIE)?.value);
}

export async function readPortalSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(PORTAL_SESSION_COOKIE)?.value ?? null;
}

export async function createPortalSession(
  userId: string,
  name: string,
): Promise<PortalSession> {
  const lifetime = 60 * 60 * 8;
  const session: PortalSession = {
    role: "admin",
    userId,
    name,
    issuedAt: new Date().toISOString(),
    expiresAt: Date.now() + lifetime * 1000,
  };

  const store = await cookies();

  store.set(PORTAL_SESSION_COOKIE, await encodePortalSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: lifetime,
  });

  return session;
}

export async function clearPortalSession(): Promise<void> {
  const store = await cookies();

  store.delete(PORTAL_SESSION_COOKIE);
}
