"use client";

import { useEffect, useState, type FormEvent } from "react";

import type { BackendProject } from "@/src/data/portal/types";

import { PortalPageHeader } from "./PortalPageHeader";
import { ProjectList } from "./ProjectList";

type ProjectForm =
  | { mode: "create" }
  | { mode: "edit"; project: BackendProject };

type ProjectPayload = {
  projectName: string;
  oneLineSummary: string;
  startDate: string;
  targetDate: string;
  techenologies: string;
  client: {
    clientName: string;
    role: string;
    companyName: string;
  };
  projectScreenshotUrl?: string;
};

const fieldClass =
  "min-h-[48px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

function responseMessage(body: unknown, fallback: string): string {
  if (typeof body !== "object" || body === null) return fallback;
  if ("message" in body && typeof body.message === "string") return body.message;
  if ("error" in body && typeof body.error === "string") return body.error;
  return fallback;
}

function isProject(value: unknown): value is BackendProject {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "projectName" in value &&
    typeof value.projectName === "string" &&
    "oneLineSummary" in value &&
    typeof value.oneLineSummary === "string" &&
    "startDate" in value &&
    typeof value.startDate === "string" &&
    "targetDate" in value &&
    typeof value.targetDate === "string" &&
    "techenologies" in value &&
    typeof value.techenologies === "string" &&
    "client" in value &&
    typeof value.client === "object" &&
    value.client !== null &&
    "clientName" in value.client &&
    typeof value.client.clientName === "string" &&
    "role" in value.client &&
    typeof value.client.role === "string" &&
    "companyName" in value.client &&
    typeof value.client.companyName === "string"
  );
}

function dateInputValue(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

/**
 * Every project currently stored by the backend.
 */
export function AdminProjects() {
  const [projects, setProjects] = useState<BackendProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState<ProjectForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [progressValues, setProgressValues] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    let active = true;

    fetch("/api/portal/projects", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(responseMessage(body, `Request failed (${response.status}).`));
        }
        if (!Array.isArray(body) || !body.every(isProject)) {
          throw new Error("The project service returned invalid project data.");
        }
        return body;
      })
      .then((data) => {
        if (active) setProjects(data);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load projects.",
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

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    const fields = new FormData(event.currentTarget);
    const payload: ProjectPayload = {
      projectName: String(fields.get("projectName") ?? "").trim(),
      oneLineSummary: String(fields.get("oneLineSummary") ?? "").trim(),
      startDate: String(fields.get("startDate") ?? ""),
      targetDate: String(fields.get("targetDate") ?? ""),
      techenologies: String(fields.get("techenologies") ?? "").trim(),
      client: {
        clientName: String(fields.get("clientName") ?? "").trim(),
        role: String(fields.get("role") ?? "").trim(),
        companyName: String(fields.get("companyName") ?? "").trim(),
      },
    };
    if (form.mode === "create") {
      payload.projectScreenshotUrl = String(
        fields.get("projectScreenshotUrl") ?? "",
      ).trim();
    }

    setSaving(true);
    setFormError("");
    setNotice("");
    try {
      const isEdit = form.mode === "edit";
      const response = await fetch(
        isEdit
          ? `/api/portal/projects/${encodeURIComponent(form.project._id)}`
          : "/api/portal/projects",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(responseMessage(body, `Save failed (${response.status}).`));
      }
      if (!isProject(body)) {
        throw new Error("The project service returned invalid project data.");
      }

      setProjects((current) =>
        isEdit
          ? current.map((project) => (project._id === body._id ? body : project))
          : [body, ...current],
      );
      setProgressValues((current) =>
        isEdit
          ? current
          : { ...current, [body._id]: "0" },
      );
      setForm(null);
      setNotice(isEdit ? "Project updated." : "Project created.");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to save the project.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(project: BackendProject) {
    if (!window.confirm(`Delete "${project.projectName}"?`)) return;

    setDeletingId(project._id);
    setLoadError("");
    setNotice("");
    try {
      const response = await fetch(
        `/api/portal/projects/${encodeURIComponent(project._id)}`,
        { method: "DELETE" },
      );
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(responseMessage(body, `Delete failed (${response.status}).`));
      }

      setProjects((current) =>
        current.filter((item) => item._id !== project._id),
      );
      setProgressValues((current) => {
        const next = { ...current };
        delete next[project._id];
        return next;
      });
      setNotice("Project deleted.");
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unable to delete this project.",
      );
    } finally {
      setDeletingId("");
    }
  }

  return (
    <>
      <PortalPageHeader
        eyebrow="Administration"
        title="Projects"
        lead="Every engagement, the people on it and how far along it is."
      >
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setFormError("");
            setForm({ mode: "create" });
          }}
        >
          Add project
        </button>
      </PortalPageHeader>

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
      <p className="mb-5 text-sm text-ink-subtle">
        Progress values are temporary and will reset when the page reloads.
      </p>
      {loading ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          Loading projects…
        </p>
      ) : loadError && projects.length === 0 ? null : projects.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          No projects have been added yet.
        </p>
      ) : (
        <ProjectList
          projects={projects}
          progressValues={progressValues}
          deletingId={deletingId}
          onProgressChange={(id, value) =>
            setProgressValues((current) => ({ ...current, [id]: value }))
          }
          onEdit={(project) => {
            setFormError("");
            setForm({ mode: "edit", project });
          }}
          onDelete={(project) => void deleteProject(project)}
        />
      )}

      {form ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setForm(null);
          }}
        >
          <section
            className="my-auto w-full max-w-2xl rounded-panel border border-border bg-surface p-6 shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-form-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Projects</p>
                <h2 id="project-form-title" className="mt-2 text-h3">
                  {form.mode === "edit" ? "Edit project" : "Add project"}
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

            <form className="grid gap-5 sm:grid-cols-2" onSubmit={saveProject}>
              <ProjectTextField
                id="project-name"
                name="projectName"
                label="Project name"
                maxLength={160}
                defaultValue={form.mode === "edit" ? form.project.projectName : ""}
                required
              />
              <ProjectTextField
                id="project-technologies"
                name="techenologies"
                label="Technologies"
                placeholder="React, Node.js, MongoDB"
                maxLength={500}
                defaultValue={
                  form.mode === "edit" ? form.project.techenologies : ""
                }
                required
              />
              <ProjectTextField
                id="project-summary"
                name="oneLineSummary"
                label="One-line summary"
                maxLength={500}
                defaultValue={
                  form.mode === "edit" ? form.project.oneLineSummary : ""
                }
                required
                className="sm:col-span-2"
              />
              <ProjectTextField
                id="project-client-name"
                name="clientName"
                label="Client name"
                maxLength={160}
                defaultValue={
                  form.mode === "edit" ? form.project.client.clientName : ""
                }
                required
              />
              <ProjectTextField
                id="project-client-role"
                name="role"
                label="Client role"
                maxLength={160}
                defaultValue={form.mode === "edit" ? form.project.client.role : ""}
                required
              />
              <ProjectTextField
                id="project-company-name"
                name="companyName"
                label="Company name"
                maxLength={160}
                defaultValue={
                  form.mode === "edit" ? form.project.client.companyName : ""
                }
                required
              />
              <ProjectTextField
                id="project-start-date"
                name="startDate"
                label="Start date"
                type="date"
                defaultValue={
                  form.mode === "edit"
                    ? dateInputValue(form.project.startDate)
                    : ""
                }
                required
              />
              <ProjectTextField
                id="project-target-date"
                name="targetDate"
                label="Target date"
                type="date"
                defaultValue={
                  form.mode === "edit"
                    ? dateInputValue(form.project.targetDate)
                    : ""
                }
                required
              />
              {form.mode === "create" ? (
                <ProjectTextField
                  id="project-screenshot-url"
                  name="projectScreenshotUrl"
                  label="Project screenshot URL"
                  type="url"
                  placeholder="https://example.com/project.png"
                  maxLength={2048}
                  required
                  className="sm:col-span-2"
                />
              ) : null}

              {formError ? (
                <p className="text-sm text-red-700 sm:col-span-2" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="flex flex-wrap justify-end gap-3 sm:col-span-2">
                <button
                  className="rounded-[40px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-border-strong disabled:opacity-60"
                  type="button"
                  disabled={saving}
                  onClick={() => setForm(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving…"
                    : form.mode === "edit"
                      ? "Save changes"
                      : "Add project"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

function ProjectTextField({
  id,
  name,
  label,
  type = "text",
  defaultValue,
  placeholder,
  maxLength,
  required = false,
  className = "",
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        className="mb-2 block text-sm font-medium text-ink"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={fieldClass}
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}
