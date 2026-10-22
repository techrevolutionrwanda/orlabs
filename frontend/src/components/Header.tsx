"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "How we work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
];

/**
 * Sticky site header with the OrLabs logo, primary nav and a gold CTA.
 * Nav collapses to a menu button below 860px (matches the template).
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-navy text-on-navy">
      <div className="mx-auto flex min-h-[76px] max-w-container items-center justify-between gap-4 px-[var(--gutter)]">
        <Link
          href="/#top"
          aria-label="OrLabs Tech Industries — home"
          className="inline-flex items-center"
        >
          <Logo />
        </Link>

        <button
          type="button"
          aria-controls="nav-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-navy-line text-on-navy max-[860px]:inline-flex"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav
          id="nav-menu"
          aria-label="Main"
          className={`${open ? "block" : "hidden"} absolute left-0 right-0 top-full border-b border-navy-line bg-navy px-[var(--gutter)] pb-6 pt-2 min-[861px]:static min-[861px]:block min-[861px]:border-0 min-[861px]:p-0`}
        >
          <ul className="m-0 flex list-none flex-col items-stretch gap-1 p-0 min-[861px]:flex-row min-[861px]:items-center min-[861px]:gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block p-3 text-[1.0625rem] font-medium text-[#DCE3EC] no-underline hover:text-gold min-[861px]:p-0 min-[861px]:text-[0.9375rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                onClick={closeMenu}
                className="mt-3 inline-flex min-h-12 items-center justify-center rounded-pill border border-transparent bg-gold px-[26px] font-semibold text-navy no-underline transition-transform duration-150 hover:-translate-y-px hover:bg-gold-hover min-[861px]:mt-0"
              >
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
