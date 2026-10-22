import type { ReactNode } from "react";

/**
 * Section heading used on the inner pages: eyebrow, title and optional lead.
 * `tone="dark"` is for headings that sit on a navy background.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div data-reveal className="mb-12 grid max-w-[680px] gap-3">
      {eyebrow ? (
        <p className={`eyebrow ${dark ? "text-gold" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`text-h2 ${dark ? "text-white" : ""}`}>{title}</h2>
      {lead ? (
        <p
          className={`text-[1.0625rem] ${dark ? "text-on-navy-muted" : "text-ink-muted"}`}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
