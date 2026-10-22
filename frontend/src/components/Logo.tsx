/**
 * OrLabs logo — open gold ring with three rays escaping the gap and a
 * teal centre dot, plus the "OrLabs" wordmark ("Or" in gold).
 * Matches the reference template; do not redraw or recolor the mark.
 */
export default function Logo({
  size = 36,
  showWordmark = true,
  className = "",
}: {
  /** Mark width/height in px (template uses 36 in header, 32 in footer). */
  size?: number;
  /** Render the "OrLabs" text next to the mark. */
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="-2 -2 68 68"
        width={size}
        height={size}
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M53.67 28.18 A22 22 0 1 1 35.82 10.33"
          fill="none"
          stroke="#F5B301"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M51.8 12.2 57.46 6.54M57.84 18.83 61.4 17.02M45.17 6.16 46.98 2.6"
          stroke="#F5B301"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="6" fill="#00A6A6" />
      </svg>
      {showWordmark && (
        <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-on-navy">
          <span className="text-gold">Or</span>Labs
        </span>
      )}
    </span>
  );
}
