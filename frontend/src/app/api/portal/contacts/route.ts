import { requirePortalAdmin } from "@/src/lib/portal/api";
import { readPortalSessionToken } from "@/src/lib/portal/session";

const backendUrl =
  process.env.ORLABS_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export async function GET() {
  const access = await requirePortalAdmin();
  if (access.response) return access.response;

  const token = await readPortalSessionToken();
  if (!token) {
    return Response.json({ message: "Authentication required" }, { status: 401 });
  }

  try {
    const response = await fetch(`${backendUrl}/contacts`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Contact list request failed:", error);
    return Response.json(
      { message: "The contacts service is unavailable." },
      { status: 502 },
    );
  }
}
