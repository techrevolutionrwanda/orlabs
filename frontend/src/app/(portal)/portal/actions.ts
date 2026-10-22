"use server";

import { redirect } from "next/navigation";

import { clearPortalSession, createPortalSession } from "@/src/lib/portal/session";
import { isPortalRole } from "@/src/lib/portal/token";

/**
 * The portal server actions.
 *
 * `startDemoSession` stands in for the real sign-in: it is the development
 * role switcher. When the identity provider is connected it is replaced by
 * the provider's own callback, and everything else stays the same.
 */
export async function startDemoSession(formData: FormData) {
  const role = formData.get("role");

  if (!isPortalRole(role)) return;

  await createPortalSession(role);

  redirect(role === "admin" ? "/portal/admin" : "/portal/worker");
}

export async function endPortalSession() {
  await clearPortalSession();

  redirect("/portal");
}
