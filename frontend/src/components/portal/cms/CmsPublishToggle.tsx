"use client";

import { useState } from "react";

import { CmsError } from "./CmsFeedback";

/**
 * Putting a record on the website, or taking it off.
 *
 * A record that is not published stays in the portal and does not show up on
 * the public pages.
 */
export function CmsPublishToggle({
  slug,
  id,
  state,
  onChanged,
}: {
  slug: string;
  id: string;
  state: string;
  onChanged: (state: string) => void;
}) {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const published = state === "published";

  async function toggle() {
    setWorking(true);
    setError("");

    try {
      const response = await fetch(`/api/portal/${slug}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: published ? "draft" : "published" }),
      });

      const body = (await response.json().catch(() => null)) as {
        record?: { state?: string };
        error?: string;
      } | null;

      if (!response.ok || !body?.record) {
        throw new Error(body?.error ?? "The change could not be saved.");
      }

      onChanged(body.record.state ?? "draft");
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "The change could not be saved.",
      );
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        className="rounded-full border border-border bg-chip px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-muted transition-colors hover:border-border-strong hover:text-navy disabled:opacity-60"
        disabled={working}
        onClick={toggle}
      >
        {working
          ? "Working…"
          : published
            ? "Take off the website"
            : "Put on the website"}
      </button>

      {error ? <CmsError message={error} /> : null}
    </div>
  );
}
