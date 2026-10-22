"use client";

import { useEffect, useRef } from "react";

/**
 * The copyright year is updated on the client — `new Date()` cannot run while
 * the page is prerendered. The rendered value matches the template, so there
 * is no layout shift and no hydration mismatch.
 */
export function CopyrightYear() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  return <span ref={ref}>2026</span>;
}
