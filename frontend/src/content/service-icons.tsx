import type { ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/**
 * The icon used for a service that has no icon of its own — a service added
 * in the portal before an icon was drawn for it.
 */
export const defaultServiceIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

/** Icon per service slug — decorative only, always beside a text label. */
export const serviceIcons: Record<string, ReactNode> = {
  "custom-software": (
    <svg {...iconProps}>
      <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />
    </svg>
  ),
  "web-mobile-apps": (
    <svg {...iconProps}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  "cloud-devops": (
    <svg {...iconProps}>
      <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.5A3.5 3.5 0 0 0 7 18z" />
    </svg>
  ),
  "data-ai-automation": (
    <svg {...iconProps}>
      <path d="M4 20h16" />
      <rect x="6" y="11" width="3" height="7" />
      <rect x="11" y="6" width="3" height="12" />
      <rect x="16" y="13" width="3" height="5" />
    </svg>
  ),
  "integrations-fintech": (
    <svg {...iconProps}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  ),
  "it-consulting": (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </svg>
  ),
};
