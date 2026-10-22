/**
 * The portal session token.
 *
 * The session is a signed cookie: a base64url payload and an HMAC signature.
 * Everything here is plain Web Crypto so the same code runs in the Node
 * runtime (route handlers and server actions) and in the proxy (Edge).
 *
 * This is still a placeholder: it proves who the visitor is *within this
 * build*, not who they are in the world. A real deployment replaces the
 * demo sign-in with the identity provider and keeps this format.
 */

export const PORTAL_SESSION_COOKIE = "orlabs_portal_session";

export type PortalRole = "admin" | "worker";

export type PortalSession = {
  role: PortalRole;
  userId: string;
  name: string;
  issuedAt: string;
};

export const roleLabels: Record<PortalRole, string> = {
  admin: "Administrator",
  worker: "Worker",
};

export function isPortalRole(value: unknown): value is PortalRole {
  return value === "admin" || value === "worker";
}

function secret(): string {
  return (
    process.env.PORTAL_SESSION_SECRET ?? "orlabs-portal-development-secret"
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function signatureFor(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return toBase64Url(new Uint8Array(signed));
}

function equal(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let difference = 0;

  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return difference === 0;
}

export async function encodePortalSession(
  session: PortalSession,
): Promise<string> {
  const payload = toBase64Url(
    new TextEncoder().encode(JSON.stringify(session)),
  );

  return `${payload}.${await signatureFor(payload)}`;
}

export async function decodePortalSession(
  token: string | undefined | null,
): Promise<PortalSession | null> {
  if (!token) return null;

  const [payload, signature] = token.split(".");

  if (!payload || !signature) return null;

  if (!equal(signature, await signatureFor(payload))) return null;

  try {
    const parsed = JSON.parse(
      new TextDecoder().decode(fromBase64Url(payload)),
    ) as Partial<PortalSession>;

    if (!isPortalRole(parsed.role)) return null;
    if (typeof parsed.userId !== "string") return null;

    return {
      role: parsed.role,
      userId: parsed.userId,
      name: typeof parsed.name === "string" ? parsed.name : "Signed in",
      issuedAt:
        typeof parsed.issuedAt === "string"
          ? parsed.issuedAt
          : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}
