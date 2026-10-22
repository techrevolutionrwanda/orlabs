"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/src/components/site/Logo";
import {
  cmsPath,
  portalGroups,
  resourcesInGroup,
  type PortalGroup,
  type ResourceIcon,
} from "@/src/lib/portal/resources";

/**
 * The portal navigation.
 *
 * The administration area reads its items from the description of the
 * resources: every collection the portal knows is one link, grouped the way
 * the resources are grouped. A new kind of record therefore finds its place
 * in the navigation without anybody writing it in.
 */

type NavItem = {
  label: string;
  href: string;
  icon: ResourceIcon;
  /** The item stands for this one address only, not for everything under it. */
  exact?: boolean;
};

const paths: Record<ResourceIcon, string> = {
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
  image:
    "M4 5h16v14H4V5Zm3 8 4-4 5 6H7l3-4Zm12-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  link:
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
};

function NavIcon({ icon }: { icon: ResourceIcon }) {
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
 * Whether an item is the page the visitor is on.
 *
 * An item that stands for a collection is also the current page when a
 * record of that collection is open; the overview is only the current page
 * when it is the address itself.
 */
function isCurrent(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isCurrent(pathname, item);

  return (
    <Link
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
}

/**
 * The portal navigation.
 *
 * It reads the current path so the sidebar can show the area the visitor
 * belongs to and mark the page they are on.
 */
export function PortalSidebar() {
  const pathname = usePathname();

  const admin = pathname.startsWith("/portal/admin");

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
          {admin ? "Administration" : "Worker area"}
        </p>
      </div>

      <nav
        aria-label="Portal"
        className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:px-4"
      >
        {admin ? <AdminNav pathname={pathname} /> : <WorkerNav pathname={pathname} />}
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

/**
 * The screens that are not a collection but belong to a group.
 *
 * The content overview shows every record the public website shows, whatever
 * collection it comes from — it cannot sit in one collection, so it sits with
 * the group the website belongs to.
 */
const extraItems: Partial<Record<PortalGroup, NavItem[]>> = {
  website: [
    {
      label: "All content",
      href: "/portal/admin/content",
      icon: "document",
    },
  ],
};

/**
 * The administration navigation.
 *
 * One link for every collection, grouped the way the resources are grouped.
 * On a narrow screen the groups are dropped and the links run in one row;
 * the group names are only of use where there is room for them.
 */
function AdminNav({ pathname }: { pathname: string }) {
  const overview: NavItem = {
    label: "Overview",
    href: "/portal/admin",
    icon: "grid",
    exact: true,
  };

  return (
    <>
      <NavLink item={overview} pathname={pathname} />

      {portalGroups.map((group) => {
        const items: NavItem[] = [
          ...(extraItems[group.key] ?? []),
          ...resourcesInGroup(group.key).map((resource) => ({
            label: resource.title,
            href: cmsPath(resource.key),
            icon: resource.icon,
          })),
        ];

        if (items.length === 0) return null;

        return (
          <div key={group.key} className="contents lg:mt-5">
            <p className="hidden px-3 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle lg:block">
              {group.title}
            </p>

            {items.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        );
      })}
    </>
  );
}

/**
 * The navigation of the worker area.
 *
 * A worker moves tasks along and closes tickets — the rest of the portal
 * belongs to an administrator.
 */
function WorkerNav({ pathname }: { pathname: string }) {
  const items: NavItem[] = [
    { label: "Overview", href: "/portal/worker", icon: "grid", exact: true },
    { label: "My tasks", href: "/portal/worker/tasks", icon: "check" },
    { label: "Tickets", href: "/portal/worker/tickets", icon: "ticket" },
  ];

  return (
    <>
      {items.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}
    </>
  );
}
