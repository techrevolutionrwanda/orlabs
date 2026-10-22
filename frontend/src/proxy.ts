import { NextResponse, type NextRequest } from "next/server";

import {
  decodePortalSession,
  PORTAL_SESSION_COOKIE,
} from "@/src/lib/portal/token";

/**
 * Guards the portal.
 *
 * - Without a session every protected page goes back to the sign-in screen.
 * - With a session a visitor only sees the area that belongs to their role.
 * - The sign-in page itself sends a signed-in visitor to their own area.
 *
 * The proxy only reads the signed cookie — it never shares state with the
 * application, so it stays safe to run close to the edge.
 */

const adminArea = "/portal/admin";
const workerArea = "/portal/worker";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Server actions post to the page they belong to. A redirect would turn
  // that post into a request for a page, so only documents are guarded.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const session = await decodePortalSession(
    request.cookies.get(PORTAL_SESSION_COOKIE)?.value,
  );

  const wantedArea = pathname.startsWith(adminArea)
    ? adminArea
    : pathname.startsWith(workerArea)
      ? workerArea
      : null;

  if (!wantedArea) {
    if (!session) return NextResponse.next();

    return NextResponse.redirect(
      new URL(session.role === "admin" ? adminArea : workerArea, request.url),
    );
  }

  if (!session) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  const ownArea = session.role === "admin" ? adminArea : workerArea;

  if (ownArea !== wantedArea) {
    return NextResponse.redirect(new URL(ownArea, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal", "/portal/admin/:path*", "/portal/worker/:path*"],
};
