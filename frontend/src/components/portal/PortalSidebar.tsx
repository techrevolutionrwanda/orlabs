"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/src/components/site/Logo";

type NavItem = {
  label: string;
  href: string;
  icon: "grid" | "folder" | "document" | "users" | "check" | "ticket";
};

const areas: Record<string, { title: string; items: NavItem[] }> = {
  admin: {
    title: "Administration",
    items: [
      { label: "Overview", href: "/portal/admin", icon: "grid" },
      { label: "Projects", href: "/portal/admin/projects", icon: "folder" },
      { label: "Content", href: "/portal/admin/content", icon: "document" },
      { label: "Team", href: "/portal/admin/team", icon: "users" },
    ],
  },
  worker: {
    title: "Worker area",
    items: [
      { label: "Overview", href: "/portal/worker", icon: "grid" },
      { label: "My tasks", href: "/portal/worker/tasks", icon: "check" },
      { label: "Tickets", href: "/portal/worker/tickets", icon: "ticket" },
    ],
  },
};

const paths: Record<NavItem["icon"], string> = {
  grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  folder:
    "M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.5h7A1.5 1.5 0 0 1 19 10v7.5A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5v-10Z",
  document:
    "M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6M9 16h6",
  users:
    "M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.7-5 6-5s6 2 6 5m2-5c2.6.3 4 2 4 5",
  check: "M4 12.5 9 17.5 20 6.5",
  ticket:
    "M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V7Zm8 0v10",
};

function NavIcon({ icon }: { icon: NavItem["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[icon]} />
    </svg>
  );
}

/**
 * The portal navigation.
 *
 * It reads the current path so the sidebar can show the area the visitor
 * belongs to and mark the page they are on.
 */
export function PortalSidebar() {
  const pathname = usePathname();

  const area = pathname.startsWith("/portal/admin") ? "admin" : "worker";
  const { title, items } = areas[area];

  return (
    <aside className="border-b border-border bg-surface lg:w-[268px] lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-6 lg:py-6">
        <Link
          href="/"
          aria-label="OrLabs — back to the website"
          className="inline-flex items-center no-underline"
        >
          <Logo />
        </Link>
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle lg:mt-4">
          {title}
        </p>
      </div>

      <nav
        aria-label="Portal"
        className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:px-4"
      >
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group flex shrink-0 items-center gap-3 rounded-[12px] px-3 py-2.5 text-[0.9375rem] font-medium no-underline transition-colors ${
                active
                  ? "bg-navy text-white"
                  : "text-ink-muted hover:bg-chip hover:text-navy"
              }`}
            >
              <span
                className={`transition-transform duration-200 ${
                  active ? "text-gold" : "text-ink-subtle"
                }`}
              >
                <NavIcon icon={item.icon} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden px-4 pb-5 lg:block">
        <Link
          href="/"
          className="link-arrow text-[0.875rem] text-ink-subtle no-underline"
        >
          Back to the website
        </Link>
      </div>
    </aside>
  );
}
