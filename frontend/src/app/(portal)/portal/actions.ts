"use server";

import { redirect } from "next/navigation";

import {
  clearPortalSession,
  createPortalSession,
  readPortalSession,
  readPortalSessionToken,
} from "@/src/lib/portal/session";

export type AuthActionState = {
  error?: string;
  success?: string;
};

const backendUrl =
  process.env.ORLABS_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export async function signInToPortal(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const username = formData.get("username");
  const password = formData.get("password");
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim().length === 0 ||
    password.length === 0
  ) {
    return { error: "Enter your username and password." };
  }

  let response: Response;
  try {
    response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Portal login request failed:", error);
    return { error: "The sign-in service is unavailable. Please try again." };
  }

  const result: unknown = await response.json().catch(() => null);
  if (
    !response.ok ||
    typeof result !== "object" ||
    result === null ||
    !("user" in result) ||
    typeof result.user !== "object" ||
    result.user === null ||
    !("id" in result.user) ||
    typeof result.user.id !== "string" ||
    !("username" in result.user) ||
    typeof result.user.username !== "string"
  ) {
    return {
      error:
        response.status === 401
          ? "Invalid username or password."
          : "Unable to sign in right now. Please try again.",
    };
  }

  await createPortalSession(result.user.id, result.user.username);
  redirect("/portal/admin");
}

export async function updatePortalCredentials(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const session = await readPortalSession();
  const token = await readPortalSessionToken();
  if (!session || session.role !== "admin" || !token) {
    return { error: "Sign in again before changing account credentials." };
  }

  const currentPassword = formData.get("currentPassword");
  const newUsername = formData.get("newUsername");
  const newPassword = formData.get("newPassword");
  if (
    typeof currentPassword !== "string" ||
    typeof newUsername !== "string" ||
    typeof newPassword !== "string" ||
    currentPassword.length === 0 ||
    newUsername.trim().length < 3 ||
    newPassword.length < 12
  ) {
    return {
      error:
        "Enter your current password, a username of at least 3 characters, and a new password of at least 12 characters.",
    };
  }

  let response: Response;
  try {
    response = await fetch(`${backendUrl}/auth/credentials`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newUsername,
        newPassword,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Portal credential update request failed:", error);
    return { error: "The account service is unavailable. Please try again." };
  }

  const result: unknown = await response.json().catch(() => null);
  if (
    !response.ok ||
    typeof result !== "object" ||
    result === null ||
    !("user" in result) ||
    typeof result.user !== "object" ||
    result.user === null ||
    !("id" in result.user) ||
    typeof result.user.id !== "string" ||
    !("username" in result.user) ||
    typeof result.user.username !== "string"
  ) {
    if (response.status === 401) {
      return {
        error:
          "Your current password is incorrect, or your session has expired.",
      };
    }
    if (response.status === 409) {
      return { error: "That username is already in use." };
    }
    return { error: "Unable to update credentials. Please try again." };
  }

  await createPortalSession(result.user.id, result.user.username);
  return { success: "Your username and password have been updated." };
}

export async function endPortalSession() {
  await clearPortalSession();

  redirect("/portal");
}
