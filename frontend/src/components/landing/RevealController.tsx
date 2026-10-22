"use client";

import { useEffect } from "react";

/**
 * Reveals sections as they scroll into view.
 *
 * Progressive enhancement: every element marked with `data-reveal` is visible
 * by default (server rendered). After mount we only hide the ones that are
 * still below the fold and fade them in when they arrive. If JavaScript is
 * unavailable — or the visitor prefers reduced motion — nothing is hidden.
 */
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    for (const target of targets) {
      const { top } = target.getBoundingClientRect();
      if (top > window.innerHeight * 0.92) {
        target.classList.add("reveal-pending");
        observer.observe(target);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
