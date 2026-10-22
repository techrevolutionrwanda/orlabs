import { endPortalSession } from "@/src/app/(portal)/portal/actions";
import { readPortalSession } from "@/src/lib/portal/session";
import { roleLabels } from "@/src/lib/portal/token";

/**
 * The bar across the top of the portal.
 *
 * It is a server component because it reads the session. The layout keeps it
 * inside a `<Suspense>` boundary so the page around it can still be
 * prerendered.
 */
export async function PortalTopbar() {
  const session = await readPortalSession();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface px-5 py-3.5 sm:px-8">
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
        OrLabs internal portal
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[0.9375rem] font-medium text-ink">
          {session?.name ?? "Not signed in"}
        </span>
        <span className="rounded-full bg-navy px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-gold">
          {session ? roleLabels[session.role] : "Guest"}
        </span>
        <form action={endPortalSession}>
          <button
            type="submit"
            className="rounded-[10px] border border-border px-3.5 py-2 text-[0.875rem] font-medium text-ink-muted transition-colors hover:border-border-strong hover:text-navy"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}

/** The placeholder shown while the session is still being read. */
export function PortalTopbarFallback() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface px-5 py-3.5 sm:px-8">
      <span className="skeleton h-3 w-40 rounded-full" aria-hidden="true" />
      <span className="skeleton h-8 w-44 rounded-full" aria-hidden="true" />
    </header>
  );
}
