import type { ReactNode } from "react";

/**
 * Navy hero used at the top of every inner page.
 */
export function PageHero({
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
    <section className="relative overflow-hidden bg-navy pb-14 pt-14 sm:pb-20 sm:pt-16">
      <div className="container-page">
        <div className="max-w-[760px]">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-4 text-hero text-white">{title}</h1>
          {lead ? <p className="mt-6 text-lead text-on-navy-muted">{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
