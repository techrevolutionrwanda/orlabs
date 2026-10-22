import type { ReactNode } from "react";

import type { PortalState } from "./usePortalData";

/**
 * The frames the portal data arrives in: a shimmering placeholder while the
 * request is on its way, a clear message when it fails, and the content
 * itself when it is ready.
 */
export function PortalSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <ul className="grid list-none gap-4 p-0" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <li key={index} className="skeleton h-[124px] rounded-card" />
      ))}
    </ul>
  );
}

export function PortalError({ message }: { message: string }) {
  return (
    <p
      className="rounded-card border border-border bg-surface p-6 text-[0.9375rem] text-ink-muted"
      role="alert"
    >
      {message}
    </p>
  );
}

export function PortalResource<T>({
  state,
  rows = 3,
  children,
}: {
  state: PortalState<T>;
  rows?: number;
  children: (data: T) => ReactNode;
}) {
  if (state.status === "loading") return <PortalSkeleton rows={rows} />;

  if (state.status === "error") return <PortalError message={state.error} />;

  return children(state.data);
}
