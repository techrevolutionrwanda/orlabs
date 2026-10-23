import { readPortalSessionToken } from "@/src/lib/portal/session";
import { requirePortalAdmin } from "@/src/lib/portal/api";

const backendUrl =
  process.env.ORLABS_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

async function forwardTrustedBy(
  id: string,
  method: "PUT" | "DELETE",
  body?: unknown,
) {
  const access = await requirePortalAdmin();
  if (access.response) return access.response;

  const token = await readPortalSessionToken();
  if (!token) {
    return Response.json({ error: "You are not signed in." }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${backendUrl}/trusted-by/${encodeURIComponent(id)}`,
      {
        method,
        headers: {
          authorization: `Bearer ${token}`,
          ...(body ? { "content-type": "application/json" } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        cache: "no-store",
      },
    );
    const responseBody = await response.text();

    return new Response(responseBody, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error(`TrustedBy ${method} request failed:`, error);
    return Response.json(
      { error: "The Trusted by service is unavailable." },
      { status: 502 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext<"/api/portal/trusted-by/[id]">,
) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send the Trusted by entry as JSON." }, { status: 400 });
  }

  const { id } = await params;
  return forwardTrustedBy(id, "PUT", body);
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/portal/trusted-by/[id]">,
) {
  const { id } = await params;
  return forwardTrustedBy(id, "DELETE");
}
