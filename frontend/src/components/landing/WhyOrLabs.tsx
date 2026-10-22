const values = [
  {
    title: "Clarity",
    body: "Plain language, good documentation, interfaces anyone can use.",
  },
  {
    title: "Craft",
    body: "Clean, tested, secure code — pride in the details.",
  },
  {
    title: "Built for Africa",
    body: "Mobile-first, low-bandwidth ready, mobile money integrated.",
  },
  {
    title: "Partnership",
    body: "Honest timelines, transparent pricing, long-term support.",
  },
];

export function WhyOrLabs() {
  return (
    <section className="section bg-navy" id="about">
      <div className="container-page grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-gold">
            Why OrLabs
          </p>
          <h2 className="mt-4 mb-4 text-h2 text-white">
            &ldquo;Or&rdquo; means light. That is what we build.
          </h2>
          <p className="mb-4 text-[1.0625rem] text-on-navy-muted">
            We turn complexity into simple, useful tools. Rooted in Rwanda,
            built for Africa and ready for the world — we work as partners, not
            vendors.
          </p>
          <a className="link-arrow text-gold" href="#about">
            Read our story →
          </a>
        </div>

        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value.title}
              className="grid content-start gap-2 rounded-2xl border border-navy-line p-[22px]"
            >
              <span className="font-display text-lg font-semibold text-gold">
                {value.title}
              </span>
              <p className="text-[0.9375rem] text-on-navy-muted">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
