"use client";

import { CountUp } from "@/src/components/motion/CountUp";
import type { PortalSummary } from "@/src/data/portal/types";

/**
 * The numbers on the dashboard.
 *
 * Each figure counts up when it comes into view. The final number is what the
 * server renders, so the value is right even without animation.
 */
export function PortalMetrics({ metrics }: { metrics: PortalSummary["metrics"] }) {
  return (
    <ul
      data-reveal-group
      className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="motion-lift rounded-card border border-border bg-surface p-6"
        >
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            {metric.label}
          </p>
          <p className="mt-3 font-display text-[2.5rem] font-semibold leading-none text-navy">
            <CountUp value={metric.value} suffix={metric.suffix} />
          </p>
          <p className="mt-2.5 text-[0.875rem] text-ink-muted">{metric.hint}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * A short row of facts under the numbers.
 */
export function PortalHighlights({
  highlights,
}: {
  highlights: PortalSummary["highlights"];
}) {
  return (
    <dl
      data-reveal-group
      className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3"
    >
      {highlights.map((highlight) => (
        <div
          key={highlight.label}
          className="rounded-card border border-border bg-chip px-6 py-5"
        >
          <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            {highlight.label}
          </dt>
          <dd className="mt-2 font-display text-[1.375rem] font-semibold text-navy">
            {highlight.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
