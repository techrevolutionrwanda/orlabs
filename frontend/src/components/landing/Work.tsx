export function Work() {
  return (
    <section className="section" id="work">
      <div className="container-page grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article
          data-reveal
          className="motion-lift grid content-start gap-4 rounded-[20px] border border-border bg-surface p-9"
        >
          <p className="eyebrow">Case study</p>
          <div className="flex aspect-[16/7] items-center justify-center rounded-[14px] border border-dashed border-[#c3cad5] text-sm text-ink-subtle">
            [PROJECT SCREENSHOT]
          </div>
          <h3 className="text-2xl font-semibold">
            [Project name] — [one-line result]
          </h3>
          <p className="text-ink-muted">
            Problem → solution → result. Add your first client project here.
          </p>
        </article>

        <figure
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="m-0 flex flex-col justify-between gap-6 rounded-[20px] bg-gold p-9 text-navy"
        >
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 18v-5a6 6 0 0 1 6-6v3a3 3 0 0 0-3 3h3v5H4zm10 0v-5a6 6 0 0 1 6-6v3a3 3 0 0 0-3 3h3v5h-6z" />
          </svg>
          <blockquote className="m-0 font-display text-[1.375rem] font-semibold leading-[1.4]">
            [CLIENT QUOTE — what changed after working with OrLabs.]
          </blockquote>
          <figcaption>
            <strong>[Name]</strong> · [Role, Company]
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
