"use client";

import { useSyncExternalStore } from "react";

const getYear = () => String(new Date().getFullYear());
const getServerYear = () => "2026";
const subscribe = () => () => {};

/**
 * Current year for the footer copyright line.
 * `new Date()` is blocked during prerendering in this Next.js version, so we
 * use useSyncExternalStore: a static snapshot on the server, the real year
 * after hydration (same idea as the template's #year script).
 */
export default function CopyrightYear() {
  return <>{useSyncExternalStore(subscribe, getYear, getServerYear)}</>;
}
