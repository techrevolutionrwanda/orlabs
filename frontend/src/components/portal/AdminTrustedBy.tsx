"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

import { PortalPageHeader } from "./PortalPageHeader";

type TrustedByEntry = {
  _id: string;
  name: string;
  logoUrl: string;
};

type EntryForm =
  | { mode: "create" }
  | { mode: "edit"; entry: TrustedByEntry };

function responseMessage(body: unknown, fallback: string): string {
  if (typeof body !== "object" || body === null) return fallback;
  if ("message" in body && typeof body.message === "string") return body.message;
  if ("error" in body && typeof body.error === "string") return body.error;
  return fallback;
}

const fieldClass =
  "min-h-[48px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

export function AdminTrustedBy() {
  const [entries, setEntries] = useState<TrustedByEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState<EntryForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/portal/trusted-by", {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(responseMessage(body, `Request failed (${response.status}).`));
        }
        if (!Array.isArray(body)) {
          throw new Error("The Trusted by service returned an invalid response.");
        }
        return body as TrustedByEntry[];
      })
      .then((data) => {
        if (!active) return;
        setEntries(data);
        setLoadError("");
      })
      .catch((error: Error) => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!modal) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !saving) setModal(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [modal, saving]);

  async function saveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modal) return;

    const formData = new FormData(event.currentTarget);
    const entry = {
      name: String(formData.get("name") ?? "").trim(),
      logoUrl: String(formData.get("logoUrl") ?? "").trim(),
    };
    const isEdit = modal.mode === "edit" && modal.entry;
    const url = isEdit
      ? `/api/portal/trusted-by/${encodeURIComponent(modal.entry._id)}`
      : "/api/portal/trusted-by";

    setSaving(true);
    setSaveError("");
    setNotice("");

    try {
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(entry),
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(responseMessage(body, `Save failed (${response.status}).`));
      }
      if (
        typeof body !== "object" ||
        body === null ||
        !("_id" in body) ||
        typeof body._id !== "string" ||
        !("name" in body) ||
        typeof body.name !== "string" ||
        !("logoUrl" in body) ||
        typeof body.logoUrl !== "string"
      ) {
        throw new Error("The Trusted by service returned an invalid entry.");
      }

      const saved = body as TrustedByEntry;
      setEntries((current) =>
        isEdit
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setModal(null);
      setNotice(isEdit ? "Trusted by entry updated." : "Trusted by entry created.");
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save this entry.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteEntry(entry: TrustedByEntry) {
    if (!window.confirm(`Delete "${entry.name}" from Trusted by?`)) return;

    setDeletingId(entry._id);
    setNotice("");
    setLoadError("");
    try {
      const response = await fetch(
        `/api/portal/trusted-by/${encodeURIComponent(entry._id)}`,
        { method: "DELETE" },
      );
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(responseMessage(body, `Delete failed (${response.status}).`));
      }

      setEntries((current) => current.filter((item) => item._id !== entry._id));
      setNotice("Trusted by entry deleted.");
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unable to delete this entry.",
      );
    } finally {
      setDeletingId("");
    }
  }

  return (
    <>
      <PortalPageHeader
        eyebrow="Administration"
        title="Trusted by"
        lead="Manage the organizations whose logos appear on the website."
      >
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setSaveError("");
            setModal({ mode: "create" });
          }}
        >
          Add organization
        </button>
      </PortalPageHeader>

      {notice ? (
        <p className="mb-5 text-sm text-ink-muted" role="status">
          {notice}
        </p>
      ) : null}
      {loadError ? (
        <p className="mb-5 rounded-card border border-border bg-surface p-5 text-sm text-red-700" role="alert">
          {loadError}
        </p>
      ) : null}

      {loading ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          Loading trusted organizations…
        </p>
      ) : loadError && entries.length === 0 ? null : entries.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          No trusted organizations have been added yet.
        </p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <li
              key={entry._id}
              className="flex min-w-0 flex-col rounded-card border border-border bg-surface p-5"
            >
              <div className="flex min-h-24 items-center justify-center rounded-[12px] bg-chip p-4">
                <Image
                  src={entry.logoUrl}
                  alt={`${entry.name} logo`}
                  width={180}
                  height={72}
                  unoptimized
                  className="max-h-[72px] w-auto max-w-full object-contain"
                />
              </div>
              <h2 className="mt-4 break-words text-lg font-semibold text-navy">
                {entry.name}
              </h2>

              <div className="mt-5 flex gap-3">
                <button
                  className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-border-strong disabled:opacity-60"
                  type="button"
                  onClick={() => {
                    setSaveError("");
                    setModal({ mode: "edit", entry });
                  }}
                >
                  Edit
                </button>
                <button
                  className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-700 disabled:opacity-60"
                  type="button"
                  disabled={deletingId === entry._id}
                  onClick={() => void deleteEntry(entry)}
                >
                  {deletingId === entry._id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {modal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setModal(null);
          }}
        >
          <section
            className="my-auto w-full max-w-xl rounded-panel border border-border bg-surface p-6 shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trusted-by-form-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Trusted by</p>
                <h2 id="trusted-by-form-title" className="mt-2 text-h3">
                  {modal.mode === "edit" ? "Edit organization" : "Add organization"}
                </h2>
              </div>
              <button
                className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-muted hover:border-border-strong disabled:opacity-60"
                type="button"
                disabled={saving}
                onClick={() => setModal(null)}
                aria-label="Close form"
              >
                Close
              </button>
            </div>

            <form className="grid gap-5" onSubmit={saveEntry}>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink" htmlFor="trusted-by-name">
                  Organization name
                </label>
                <input
                  className={fieldClass}
                  id="trusted-by-name"
                  name="name"
                  type="text"
                  maxLength={160}
                  defaultValue={modal.mode === "edit" ? modal.entry.name : ""}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink" htmlFor="trusted-by-logo-url">
                  Logo URL
                </label>
                <input
                  className={fieldClass}
                  id="trusted-by-logo-url"
                  name="logoUrl"
                  type="url"
                  maxLength={2048}
                  placeholder="https://example.com/logo.png"
                  defaultValue={modal.mode === "edit" ? modal.entry.logoUrl : ""}
                  required
                />
              </div>

              {saveError ? (
                <p className="text-sm text-red-700" role="alert">
                  {saveError}
                </p>
              ) : null}

              <div className="flex flex-wrap justify-end gap-3">
                <button
                  className="rounded-[40px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-border-strong disabled:opacity-60"
                  type="button"
                  disabled={saving}
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving
                    ? "Saving…"
                    : modal.mode === "edit"
                      ? "Save changes"
                      : "Add organization"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
