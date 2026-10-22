"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "How we work", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-navy">
      <div className="container-page flex min-h-[76px] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="OrLabs Tech Industries — home"
          className="inline-flex items-center no-underline"
        >
          <Logo />
        </Link>

        <button
          type="button"
          aria-controls="nav-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-navy-line text-white transition-colors hover:bg-white/5 min-[861px]:hidden"
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
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav
          id="nav-menu"
          aria-label="Main"
          className={`${open ? "block" : "hidden"} absolute inset-x-0 top-full border-b border-navy-line bg-navy px-6 pb-6 pt-2 min-[861px]:static min-[861px]:block min-[861px]:border-0 min-[861px]:bg-transparent min-[861px]:p-0`}
        >
          <ul className="flex list-none flex-col items-stretch gap-1 p-0 min-[861px]:flex-row min-[861px]:items-center min-[861px]:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[1.0625rem] font-medium text-[#DCE3EC] no-underline transition-colors hover:text-gold min-[861px]:py-0 min-[861px]:text-[0.9375rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 min-[861px]:mt-0">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full min-[861px]:w-auto"
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
