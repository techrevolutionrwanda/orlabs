"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PortalError, PortalSkeleton } from "@/src/components/portal/PortalResource";
import { StatusChip } from "@/src/components/portal/StatusChip";
import {
  cmsPath,
  resourceSlugs,
  resources,
  type ResourceDef,
} from "@/src/lib/portal/resources";

import { CmsPublishToggle } from "./CmsPublishToggle";
import { useCmsRecords, useCmsSources, type CmsRow } from "./useCms";

/**
 * The list of the records of one kind.
 *
 * Every collection is shown the same way: what the record is called, the
 * fields worth looking at, and the things that can be done to it. The list
 * reads itself from the description of the resource, so a new kind of record
 * gets the same screen without writing one.
 */

const actionClass =
  "rounded-full border border-border bg-chip px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-muted transition-colors hover:border-border-strong hover:text-navy disabled:opacity-50";

type Dependant = { type: string; id: string; label: string };

export function CmsList({ definition }: { definition: ResourceDef }) {
  const slug = resourceSlugs[definition.key];
  const { status, rows, error, reload } = useCmsRecords(slug);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // A row can point at a record of another collection — a task points at a
  // project. Those names are needed for the table, so they are loaded with
  // the records themselves.
  const sourceKey = useMemo(() => {
    const slugs = definition.columns
      .filter((column) => column.kind === "record" && column.source)
      .map((column) => resourceSlugs[column.source as keyof typeof resourceSlugs]);

    return [...new Set(slugs)].sort().join("|");
  }, [definition]);

  const sources = useCmsSources(sourceKey);

  const filterField = definition.published
    ? definition.fields.find((field) => field.name === "state")
    : definition.fields.find((field) => field.name === "status");

  const visible = rows.filter((row) => {
    if (filter !== "all" && filterField) {
      if (String(row[filterField.name] ?? "") !== filter) return false;
    }

    const needle = search.trim().toLowerCase();

    if (!needle) return true;

    return definition.columns.some((column) => {
      const value = cellText(row, column, sources);

      return value.toLowerCase().includes(needle);
    });
  });

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[220px] flex-1">
          <label className="field-label" htmlFor="cms-search">
            Search
          </label>
          <input
            id="cms-search"
            className="field mt-2"
            type="search"
            placeholder={`Search ${definition.title.toLowerCase()}`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {filterField ? (
          <div className="min-w-[200px]">
            <label className="field-label" htmlFor="cms-filter">
              {filterField.label}
            </label>
            <select
              id="cms-filter"
              className="field mt-2"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="all">All</option>
              {filterField.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <Link
          href={`${cmsPath(definition.key)}/new`}
          className="btn btn-primary !min-h-[44px]"
        >
          New {definition.singular}
        </Link>
      </div>

      {status === "loading" ? <PortalSkeleton rows={4} /> : null}
      {status === "error" ? <PortalError message={error} /> : null}

      {status === "ready" && visible.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-6 text-[0.9375rem] text-ink-muted">
          {rows.length === 0
            ? `There are no ${definition.title.toLowerCase()} yet.`
            : "Nothing matches the search."}
        </p>
      ) : null}

      {status === "ready" && visible.length > 0 ? (
        <div className="overflow-x-auto rounded-card border border-border bg-surface">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {definition.title} — {visible.length} of {rows.length}
            </caption>
            <thead>
              <tr className="border-b border-border">
                {definition.columns.map((column) => (
                  <th
                    key={column.name}
                    scope="col"
                    className="px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle"
                  >
                    {column.label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-5 py-3 text-right text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-b-0">
                  {definition.columns.map((column, index) => (
                    <td
                      key={column.name}
                      className="px-5 py-3.5 align-middle text-[0.9375rem] text-ink-muted"
                    >
                      {index === 0 ? (
                        <Link
                          href={cmsPath(definition.key, row.id)}
                          className="font-semibold text-navy underline decoration-1 underline-offset-4 hover:text-teal-text"
                        >
                          {cellText(row, column, sources) || "Untitled"}
                        </Link>
                      ) : (
                        cellNode(row, column, sources)
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <CmsRowActions
                      definition={definition}
                      slug={slug}
                      row={row}
                      onChanged={reload}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The buttons of one row.
 *
 * Moving a record one place up or down, putting it on the website or taking
 * it off, and removing it. A record other records point at is not removed
 * straight away — the answer says what depends on it.
 */
function CmsRowActions({
  definition,
  slug,
  row,
  onChanged,
}: {
  definition: ResourceDef;
  slug: string;
  row: CmsRow;
  onChanged: () => void;
}) {
  const [working, setWorking] = useState("");
  const [error, setError] = useState("");
  const [dependants, setDependants] = useState<Dependant[]>([]);

  async function move(direction: "up" | "down") {
    setWorking(direction);
    setError("");

    try {
      const response = await fetch(
        `/api/portal/${slug}/${row.id}?move=${direction}`,
        { method: "PATCH" },
      );

      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(body?.error ?? "The record could not be moved.");
      }

      onChanged();
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "The record could not be moved.",
      );
    } finally {
      setWorking("");
    }
  }

  async function remove(force: boolean) {
    setWorking("remove");
    setError("");

    try {
      const response = await fetch(
        `/api/portal/${slug}/${row.id}${force ? "?force=1" : ""}`,
        { method: "DELETE" },
      );

      const body = (await response.json().catch(() => null)) as {
        dependants?: Dependant[];
        error?: string;
      } | null;

      if (response.status === 409) {
        setDependants(body?.dependants ?? []);
        setWorking("");
        return;
      }

      if (!response.ok) {
        throw new Error(body?.error ?? "The record could not be removed.");
      }

      onChanged();
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "The record could not be removed.",
      );
      setWorking("");
    }
  }

  if (dependants.length > 0) {
    return (
      <div className="grid justify-items-end gap-2">
        <p className="max-w-[320px] text-right text-[0.8125rem] text-ink-muted">
          {dependants.length === 1
            ? "One other record points at this one."
            : `${dependants.length} other records point at this one.`}
        </p>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className={actionClass}
            disabled={working === "remove"}
            onClick={() => remove(true)}
          >
            {working === "remove" ? "Removing…" : "Remove anyway"}
          </button>
          <button
            type="button"
            className={actionClass}
            onClick={() => setDependants([])}
          >
            Keep it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid justify-items-end gap-2">
      <div className="flex flex-wrap justify-end gap-2">
        {definition.orderable ? (
          <>
            <button
              type="button"
              className={actionClass}
              aria-label="Move up"
              disabled={working === "up"}
              onClick={() => move("up")}
            >
              ↑
            </button>
            <button
              type="button"
              className={actionClass}
              aria-label="Move down"
              disabled={working === "down"}
              onClick={() => move("down")}
            >
              ↓
            </button>
          </>
        ) : null}

        {definition.published ? (
          <CmsPublishToggle
            slug={slug}
            id={row.id}
            state={String(row.state ?? "draft")}
            onChanged={onChanged}
          />
        ) : null}

        <button
          type="button"
          className={actionClass}
          disabled={working === "remove"}
          onClick={() => remove(false)}
        >
          {working === "remove" ? "Removing…" : "Remove"}
        </button>
      </div>

      {error ? (
        <p className="max-w-[320px] text-right text-[0.8125rem] font-semibold text-navy">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The text of a cell.
 *
 * A cell that points at another record shows the name of that record, not
 * its id.
 */
function cellText(
  row: CmsRow,
  column: { name: string; kind?: string; source?: keyof typeof resources },
  sources: Record<string, CmsRow[]>,
): string {
  const raw = row[column.name];

  if (column.kind === "record" && column.source) {
    const sourceRows = sources[resourceSlugs[column.source]] ?? [];
    const found = sourceRows.find((entry) => entry.id === String(raw ?? ""));

    if (!found) return "";

    const source = resources[column.source];

    return String(found[source.titleField] ?? "");
  }

  if (Array.isArray(raw)) return raw.join(", ");

  if (raw === undefined || raw === null || raw === "") return "";

  return String(raw);
}

/** The cell of a table, drawn the way its kind asks for. */
function cellNode(
  row: CmsRow,
  column: { name: string; kind?: string; source?: keyof typeof resources },
  sources: Record<string, CmsRow[]>,
) {
  const raw = row[column.name];

  if (column.kind === "state" || column.kind === "status") {
    const value = String(raw ?? "");

    if (!value) return <span className="text-ink-subtle">—</span>;

    return <StatusChip value={value} />;
  }

  if (column.kind === "number") {
    const value = Number(raw ?? 0);

    if (!value) return <span className="text-ink-subtle">—</span>;

    return <span>{column.name === "progress" ? `${value}%` : value}</span>;
  }

  const text = cellText(row, column, sources);

  if (!text) return <span className="text-ink-subtle">—</span>;

  return <span className="break-words">{text}</span>;
}
