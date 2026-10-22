const industries = [
  "Finance & microfinance",
  "Health",
  "Agriculture",
  "Construction & real estate",
  "Logistics & transport",
  "Education",
  "Hospitality & tourism",
  "Government & NGOs",
  "Retail & e-commerce",
];

export function Industries() {
  return (
    <section
      className="section border-y border-border bg-surface"
      id="industries"
    >
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_2fr]">
        <div data-reveal>
          <p className="eyebrow">Industries</p>
          <h2 className="mt-3 mb-3 text-[clamp(1.75rem,2vw_+_1rem,2.25rem)]">
            One engineering team. Many industries.
          </h2>
          <p className="text-ink-muted">
            That is the &ldquo;Industries&rdquo; in our name — the same craft
            applied wherever technology can bring clarity.
          </p>
        </div>

        <ul
          data-reveal-group
          className="flex list-none flex-wrap gap-3 p-0"
        >
          {industries.map((industry) => (
            <li
              key={industry}
              className="rounded-full bg-chip px-[18px] py-3 text-[0.9375rem] font-medium text-navy"
            >
              {industry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
