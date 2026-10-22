"use client";

import { useState } from "react";

import { CmsError, CmsNotice } from "./CmsFeedback";

type Dependant = { type: string; id: string; label: string };

/**
 * Removing a record.
 *
 * A record other records point at is not removed straight away: the answer
 * says what depends on it, and the person decides whether to go on anyway.
 */
export function CmsDeleteButton({
  slug,
  id,
  onRemoved,
}: {
  slug: string;
  id: string;
  onRemoved: () => void;
}) {
  const [asking, setAsking] = useState(false);
  const [working, setWorking] = useState(false);
  const [dependants, setDependants] = useState<Dependant[]>([]);
  const [error, setError] = useState("");

  async function remove(force: boolean) {
    setWorking(true);
    setError("");

    try {
      const response = await fetch(
        `/api/portal/${slug}/${id}${force ? "?force=1" : ""}`,
        { method: "DELETE" },
      );

      const body = (await response.json().catch(() => null)) as {
        dependants?: Dependant[];
        error?: string;
      } | null;

      if (response.status === 409) {
        setDependants(body?.dependants ?? []);
        setAsking(false);
        setWorking(false);
        return;
      }

      if (!response.ok) {
        throw new Error(body?.error ?? "The record could not be removed.");
      }

      onRemoved();
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "The record could not be removed.",
      );
      setWorking(false);
    }
  }

  if (dependants.length > 0) {
    return (
      <div className="grid gap-3">
        <CmsNotice>
          Other records point at this one. Removing it leaves those records
          without what they were pointing at.
        </CmsNotice>

        <ul className="grid list-none gap-1.5 p-0 text-[0.875rem] text-ink-muted">
          {dependants.map((dependant) => (
            <li key={`${dependant.type}-${dependant.id}`}>
              <span className="font-semibold text-navy">{dependant.type}</span>{" "}
              — {dependant.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={working}
            onClick={() => remove(true)}
          >
            {working ? "Removing…" : "Remove anyway"}
          </button>
          <button
            type="button"
            className="btn btn-ghost !border-border !text-ink-muted"
            disabled={working}
            onClick={() => {
              setDependants([]);
              setAsking(false);
            }}
          >
            Keep it
          </button>
        </div>
      </div>
    );
  }

  if (asking) {
    return (
      <div className="grid gap-3">
        <CmsNotice>Remove this record for good?</CmsNotice>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={working}
            onClick={() => remove(false)}
          >
            {working ? "Removing…" : "Yes, remove it"}
          </button>
          <button
            type="button"
            className="btn btn-ghost !border-border !text-ink-muted"
            disabled={working}
            onClick={() => setAsking(false)}
          >
            Keep it
          </button>
        </div>

        {error ? <CmsError message={error} /> : null}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        className="btn btn-ghost !border-border !text-ink-muted"
        disabled={working}
        onClick={() => setAsking(true)}
      >
        Remove this record
      </button>

      {error ? <CmsError message={error} /> : null}
    </div>
  );
}
