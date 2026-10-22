"use client";

import { useEffect, useState } from "react";

/**
 * The hooks the content screens use.
 *
 * The screens are thin: the browser asks the route handlers for the records
 * and sends the changes back. The store itself never leaves the server.
 */

export type CmsRow = { id: string } & Record<string, unknown>;

export type CmsStatus = "loading" | "ready" | "error";

/**
 * The records of one collection.
 */
export function useCmsRecords(slug: string) {
  const [state, setState] = useState<{
    slug: string;
    status: CmsStatus;
    rows: CmsRow[];
    error: string;
  }>({ slug, status: "loading", rows: [], error: "" });

  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;

    fetch(`/api/portal/${slug}`, { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body = (await response.json().catch(() => null)) as {
          records?: CmsRow[];
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(
            body?.error ?? `The request failed (${response.status}).`,
          );
        }

        return body?.records ?? [];
      })
      .then((rows) => {
        if (!active) return;
        setState({ slug, status: "ready", rows, error: "" });
      })
      .catch((failure: Error) => {
        if (!active) return;
        setState({
          slug,
          status: "error",
          rows: [],
          error: failure.message,
        });
      });

    return () => {
      active = false;
    };
  }, [slug, nonce]);

  // A different collection means the old answer no longer describes the page.
  if (state.slug !== slug) {
    return {
      status: "loading" as CmsStatus,
      rows: [],
      error: "",
      reload: () => setNonce((value) => value + 1),
    };
  }

  return {
    status: state.status,
    rows: state.rows,
    error: state.error,
    reload: () => setNonce((value) => value + 1),
  };
}

/**
 * One record of a collection.
 */
export function useCmsRecord(slug: string, id: string) {
  const [state, setState] = useState<{
    id: string;
    status: CmsStatus;
    row: CmsRow | null;
    error: string;
  }>({ id, status: "loading", row: null, error: "" });

  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;

    fetch(`/api/portal/${slug}/${id}`, { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body = (await response.json().catch(() => null)) as {
          record?: CmsRow;
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(
            body?.error ?? `The request failed (${response.status}).`,
          );
        }

        return body?.record ?? null;
      })
      .then((row) => {
        if (!active) return;
        setState({ id, status: "ready", row, error: "" });
      })
      .catch((failure: Error) => {
        if (!active) return;
        setState({ id, status: "error", row: null, error: failure.message });
      });

    return () => {
      active = false;
    };
  }, [slug, id, nonce]);

  if (state.id !== id) {
    return {
      status: "loading" as CmsStatus,
      row: null,
      error: "",
      reload: () => setNonce((value) => value + 1),
    };
  }

  return {
    status: state.status,
    row: state.row,
    error: state.error,
    reload: () => setNonce((value) => value + 1),
  };
}

/**
 * The records of several collections at once.
 *
 * Some rows point at other records — a task points at a project. The list
 * needs those names, so they are loaded together.
 */
export function useCmsSources(key: string) {
  const [rows, setRows] = useState<Record<string, CmsRow[]>>({});

  useEffect(() => {
    let active = true;

    const slugs = key === "" ? [] : key.split("|");

    Promise.all(
      slugs.map(async (slug) => {
        const response = await fetch(`/api/portal/${slug}`, {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) return [slug, [] as CmsRow[]] as const;

        const body = (await response.json()) as { records?: CmsRow[] };

        return [slug, body.records ?? []] as const;
      }),
    )
      .then((entries) => {
        if (!active) return;
        setRows(Object.fromEntries(entries));
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [key]);

  return rows;
}
