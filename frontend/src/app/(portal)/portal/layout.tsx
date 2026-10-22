import type { ReactNode } from "react";

/**
 * The shell around every portal route.
 *
 * The public website lives in its own route group with the marketing header
 * and footer; the portal gets its own chrome and nothing else.
 */
export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-bg">{children}</div>
  );
}
