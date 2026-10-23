import { connection } from "next/server";

const backendUrl =
  process.env.ORLABS_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export async function GET() {
  await connection();

  try {
    const response = await fetch(`${backendUrl}/work/public`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Public projects request failed:", error);
    return Response.json(
      { message: "Projects are temporarily unavailable." },
      { status: 502 },
    );
  }
}
