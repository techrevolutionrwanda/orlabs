"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A progress bar that fills up when it scrolls into view.
 *
 * Without JavaScript the bar still shows the real value — the animation is
 * an addition, never the only way of reading it.
 */
export function ProgressBar({
  value,
  label,
  className = "",
}: {
  value: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setAnimate(true);
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`progress-track ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className={`progress-fill${animate ? " progress-animate" : ""}`}
        style={{ "--progress": `${value}%` } as React.CSSProperties}
      />
    </span>
  );
}
