import { connection } from "next/server";

const backendUrl =
  process.env.ORLABS_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export async function GET() {
  await connection();

  try {
    const response = await fetch(`${backendUrl}/founders/public`, {
      headers: { Accept: "application/json" },
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
    console.error("Public founders request failed:", error);
    return Response.json(
      { message: "Team information is temporarily unavailable." },
      { status: 502 },
    );
  }
}
