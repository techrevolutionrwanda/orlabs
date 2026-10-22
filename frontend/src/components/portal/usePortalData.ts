"use client";

import { useEffect, useState } from "react";

/**
 * Loads a portal resource from the API.
 *
 * The portal pages are thin: the server hands over the shell and the browser
 * asks the route handlers for the data. That keeps the mock store behind one
 * API, exactly like a real back end would be.
 */
export type PortalState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: T; error: null }
  | { status: "error"; data: null; error: string };

const loading: PortalState<never> = {
  status: "loading",
  data: null,
  error: null,
};

export function usePortalData<T>(path: string): PortalState<T> {
  const [result, setResult] = useState<{ path: string; state: PortalState<T> }>(
    { path, state: loading as PortalState<T> },
  );

  useEffect(() => {
    let active = true;

    fetch(path, { headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;

          throw new Error(
            body?.error ?? `The request failed (${response.status}).`,
          );
        }

        return (await response.json()) as T;
      })
      .then((data) => {
        if (!active) return;
        setResult({ path, state: { status: "ready", data, error: null } });
      })
      .catch((error: Error) => {
        if (!active) return;
        setResult({
          path,
          state: { status: "error", data: null, error: error.message },
        });
      });

    return () => {
      active = false;
    };
  }, [path]);

  // A different resource means the old answer no longer describes the page.
  if (result.path !== path) return loading as PortalState<T>;

  return result.state;
}
