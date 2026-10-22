const tones: Record<string, string> = {
  // Project states
  planning: "bg-chip text-ink-muted",
  building: "bg-navy text-white",
  review: "bg-navy-soft text-gold",
  live: "bg-chip text-teal-text",
  paused: "bg-chip text-ink-subtle",

  // Task states
  todo: "bg-chip text-ink-muted",
  "in-progress": "bg-navy text-white",
  done: "bg-chip text-teal-text",

  // Ticket states
  open: "bg-navy text-white",
  waiting: "bg-navy-soft text-gold",
  resolved: "bg-chip text-teal-text",

  // Priorities and severities
  high: "bg-navy text-gold",
  medium: "bg-chip text-ink-muted",
  low: "bg-chip text-ink-subtle",

  // Publish states
  published: "bg-chip text-teal-text",
  draft: "bg-chip text-ink-muted",
  "in-review": "bg-navy-soft text-gold",

  // Availability
  available: "bg-chip text-teal-text",
  "partly-booked": "bg-navy-soft text-gold",
  away: "bg-chip text-ink-subtle",
};

const labels: Record<string, string> = {
  "in-progress": "In progress",
  "in-review": "In review",
  "partly-booked": "Partly booked",
};

export function statusLabel(value: string): string {
  return labels[value] ?? value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * A small chip that carries the state of a project, task, ticket or page.
 */
export function StatusChip({
  value,
  label,
}: {
  value: string;
  label?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.8125rem] font-semibold ${
        tones[value] ?? "bg-chip text-ink-muted"
      }`}
    >
      <span className="status-dot h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label ?? statusLabel(value)}
    </span>
  );
}
