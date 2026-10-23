"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

import { StatusChip } from "./StatusChip";

type FounderStatus =
  | "available"
  | "away"
  | "partly-booked"
  | "fully-booked";

type Founder = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  status: FounderStatus;
  withUsSince: string;
  imageUrl?: string;
};

type FounderForm =
  | { mode: "create" }
  | { mode: "edit"; founder: Founder };

const statusOptions: { value: FounderStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "partly-booked", label: "Partly booked" },
  { value: "away", label: "Away" },
  { value: "fully-booked", label: "Fully booked" },
];

const fieldClass =
  "min-h-[48px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

function apiMessage(body: unknown, fallback: string): string {
  if (typeof body !== "object" || body === null) return fallback;
  if ("message" in body && typeof body.message === "string") return body.message;
  if ("error" in body && typeof body.error === "string") return body.error;
  return fallback;
}

function validFounder(value: unknown): value is Founder {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "email" in value &&
    typeof value.email === "string" &&
    "phone" in value &&
    typeof value.phone === "string" &&
    "jobTitle" in value &&
    typeof value.jobTitle === "string" &&
    "location" in value &&
    typeof value.location === "string" &&
    "withUsSince" in value &&
    typeof value.withUsSince === "string" &&
    "status" in value &&
    typeof value.status === "string" &&
    statusOptions.some((option) => option.value === value.status) &&
    (!("imageUrl" in value) ||
      value.imageUrl === undefined ||
      typeof value.imageUrl === "string")
  );
}

function dateInputValue(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function displayDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
}

function safeImageUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? value : null;
  } catch {
    return null;
  }
}

export function AdminTeam() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState<FounderForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/portal/founders", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(apiMessage(body, `Request failed (${response.status}).`));
        }
        if (!Array.isArray(body) || !body.every(validFounder)) {
          throw new Error("The founder service returned invalid team data.");
        }
        return body;
      })
      .then((data) => {
        if (active) setFounders(data);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load the team.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!form) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !saving) setForm(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [form, saving]);

  async function saveFounder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    const fields = new FormData(event.currentTarget);
    const payload = {
      name: String(fields.get("name") ?? "").trim(),
      email: String(fields.get("email") ?? "").trim(),
      phone: String(fields.get("phone") ?? "").trim(),
      jobTitle: String(fields.get("jobTitle") ?? "").trim(),
      location: String(fields.get("location") ?? "").trim(),
      status: String(fields.get("status") ?? ""),
      withUsSince: String(fields.get("withUsSince") ?? ""),
      imageUrl: String(fields.get("imageUrl") ?? "").trim(),
    };

    setSaving(true);
    setFormError("");
    setNotice("");

    try {
      const isEdit = form.mode === "edit";
      const response = await fetch(
        isEdit
          ? `/api/portal/founders/${encodeURIComponent(form.founder._id)}`
          : "/api/portal/founders",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(apiMessage(body, `Save failed (${response.status}).`));
      }
      if (!validFounder(body)) {
        throw new Error("The founder service returned an invalid team member.");
      }

      setFounders((current) =>
        isEdit
          ? current.map((founder) =>
              founder._id === body._id ? body : founder,
            )
          : [body, ...current],
      );
      setForm(null);
      setNotice(isEdit ? "Team member updated." : "Team member added.");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to save this team member.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteFounder(founder: Founder) {
    if (!window.confirm(`Remove ${founder.name} from the team?`)) return;

    setDeletingId(founder._id);
    setLoadError("");
    setNotice("");
    try {
      const response = await fetch(
        `/api/portal/founders/${encodeURIComponent(founder._id)}`,
        { method: "DELETE" },
      );
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(apiMessage(body, `Delete failed (${response.status}).`));
      }

      setFounders((current) =>
        current.filter((member) => member._id !== founder._id),
      );
      setNotice("Team member removed.");
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unable to remove this team member.",
      );
    } finally {
      setDeletingId("");
    }
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          {founders.length} {founders.length === 1 ? "team member" : "team members"}
        </p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setFormError("");
            setForm({ mode: "create" });
          }}
        >
          Add member
        </button>
      </div>

      {notice ? (
        <p className="mb-5 text-sm text-ink-muted" role="status">
          {notice}
        </p>
      ) : null}
      {loadError ? (
        <p
          className="mb-5 rounded-card border border-border bg-surface p-5 text-sm text-red-700"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      {loading ? (
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading team">
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="skeleton h-56 rounded-card" />
          ))}
        </ul>
      ) : loadError && founders.length === 0 ? null : founders.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          No team members have been added yet.
        </p>
      ) : (
        <ul
          data-reveal-group
          className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3"
        >
          {founders.map((founder) => {
            const imageUrl = safeImageUrl(founder.imageUrl);
            return (
              <li
                key={founder._id}
                className="motion-lift grid content-start gap-4 rounded-card border border-border bg-surface p-6"
              >
                <div className="flex items-start gap-4">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt=""
                      width={64}
                      height={64}
                      unoptimized
                      className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-chip text-lg font-semibold text-navy"
                      aria-hidden="true"
                    >
                      {founder.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((part) => part.charAt(0).toUpperCase())
                        .join("")}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-h3 font-semibold text-navy">
                      {founder.name}
                    </h2>
                    <p className="mt-1 text-sm text-ink-subtle">
                      {founder.jobTitle}
                    </p>
                  </div>
                </div>

                <StatusChip value={founder.status} />

                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-ink-subtle">Location</dt>
                    <dd className="break-words text-ink">{founder.location}</dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-ink-subtle">Email</dt>
                    <dd className="break-all text-ink">
                      <a href={`mailto:${founder.email}`} className="link-arrow">
                        {founder.email}
                      </a>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-ink-subtle">Phone</dt>
                    <dd className="break-words text-ink">
                      <a href={`tel:${founder.phone}`} className="link-arrow">
                        {founder.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
                    <dt className="text-ink-subtle">With us since</dt>
                    <dd className="text-ink">{displayDate(founder.withUsSince)}</dd>
                  </div>
                </dl>

                <div className="mt-1 flex gap-3 border-t border-border pt-4">
                  <button
                    className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-60"
                    type="button"
                    onClick={() => {
                      setFormError("");
                      setForm({ mode: "edit", founder });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-700 disabled:opacity-60"
                    type="button"
                    disabled={deletingId === founder._id}
                    onClick={() => void deleteFounder(founder)}
                  >
                    {deletingId === founder._id ? "Removing…" : "Remove"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {form ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setForm(null);
          }}
        >
          <section
            className="my-auto max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-panel border border-border bg-surface p-6 shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="founder-form-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Team</p>
                <h2 id="founder-form-title" className="mt-2 text-h3">
                  {form.mode === "edit" ? "Update member" : "Add team member"}
                </h2>
              </div>
              <button
                className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-muted hover:border-border-strong disabled:opacity-60"
                type="button"
                disabled={saving}
                onClick={() => setForm(null)}
                aria-label="Close form"
              >
                Close
              </button>
            </div>

            <form
              key={form.mode === "edit" ? form.founder._id : "new-founder"}
              className="grid gap-5 sm:grid-cols-2"
              onSubmit={saveFounder}
            >
              <Field label="Full name" name="name" required defaultValue={form.mode === "edit" ? form.founder.name : ""} />
              <Field label="Job title" name="jobTitle" required defaultValue={form.mode === "edit" ? form.founder.jobTitle : ""} />
              <Field label="Email" name="email" type="email" required defaultValue={form.mode === "edit" ? form.founder.email : ""} />
              <Field label="Phone" name="phone" type="tel" required defaultValue={form.mode === "edit" ? form.founder.phone : ""} />
              <Field label="Location" name="location" required defaultValue={form.mode === "edit" ? form.founder.location : ""} />
              <Field label="With us since" name="withUsSince" type="date" required defaultValue={form.mode === "edit" ? dateInputValue(form.founder.withUsSince) : ""} />
              <Field label="Profile image URL (optional)" name="imageUrl" type="url" defaultValue={form.mode === "edit" ? form.founder.imageUrl ?? "" : ""} />
              <div>
                <label className="mb-2 block text-sm font-medium text-ink" htmlFor="founder-status">
                  Availability
                </label>
                <select
                  className={fieldClass}
                  id="founder-status"
                  name="status"
                  defaultValue={form.mode === "edit" ? form.founder.status : "available"}
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {formError ? (
                <p className="text-sm text-red-700 sm:col-span-2" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-4 sm:col-span-2">
                <button
                  className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-60"
                  type="button"
                  disabled={saving}
                  onClick={() => setForm(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving
                    ? "Saving…"
                    : form.mode === "edit"
                      ? "Save changes"
                      : "Add member"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink" htmlFor={`founder-${name}`}>
        {label}
      </label>
      <input
        className={fieldClass}
        id={`founder-${name}`}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
