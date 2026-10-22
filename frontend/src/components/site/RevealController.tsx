"use client";

import { useEffect } from "react";

/**
 * Reveals sections as they scroll into view.
 *
 * Progressive enhancement: every element marked with `data-reveal` is visible
 * by default (server rendered). After mount we only hide the ones that are
 * still below the fold and fade them in when they arrive. If JavaScript is
 * unavailable — or the visitor prefers reduced motion — nothing is hidden.
 *
 * `data-reveal="up|left|scale|fade"` picks the direction of the movement.
 * `data-reveal-group` on a container reveals its direct children one after
 * another; the delay between them comes from `--stagger-step`.
 */
type RevealVariant = "up" | "left" | "scale" | "fade";

const pendingClasses: Record<RevealVariant, string> = {
  up: "reveal-pending",
  left: "reveal-pending-left",
  scale: "reveal-pending-scale",
  fade: "reveal-pending-fade",
};

function readVariant(element: HTMLElement, attribute: string): RevealVariant {
  const value = (element.getAttribute(attribute) ?? "").trim().toLowerCase();

  if (value in pendingClasses) {
    return value as RevealVariant;
  }

  return "up";
}

export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = new Map<HTMLElement, string>();

    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      targets.set(element, pendingClasses[readVariant(element, "data-reveal")]);
    }

    for (const group of document.querySelectorAll<HTMLElement>(
      "[data-reveal-group]",
    )) {
      const variant = pendingClasses[
        readVariant(group, "data-reveal-group")
      ];

      for (const child of Array.from(group.children)) {
        if (child instanceof HTMLElement && !targets.has(child)) {
          targets.set(child, variant);
        }
      }
    }

    if (!targets.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove(
            "reveal-pending",
            "reveal-pending-left",
            "reveal-pending-scale",
            "reveal-pending-fade",
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    for (const [element, pendingClass] of targets) {
      const { top } = element.getBoundingClientRect();
      if (top > window.innerHeight * 0.92) {
        element.classList.add(pendingClass);
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
