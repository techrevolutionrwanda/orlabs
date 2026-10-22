import type { ReactNode } from "react";

/**
 * The heading of a portal page.
 */
export function PortalPageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-[680px]">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-h2">{title}</h1>
        {lead ? <p className="mt-3 text-ink-muted">{lead}</p> : null}
      </div>
      {children}
    </div>
  );
}

/**
 * A heading inside a portal page, above a group of cards.
 */
export function PortalSectionHead({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-h3 font-semibold">{title}</h2>
        {lead ? <p className="mt-1.5 text-[0.9375rem] text-ink-muted">{lead}</p> : null}
      </div>
      {children}
    </div>
  );
}
