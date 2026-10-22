const steps = [
  {
    title: "Discover",
    body: "Understand the problem, your users and your goals.",
  },
  { title: "Design", body: "Map the solution, prototype and validate early." },
  { title: "Build", body: "Agile sprints with demos you can see and test." },
  { title: "Launch", body: "Test, deploy and train your team to own it." },
  { title: "Support", body: "Maintain, monitor and keep improving." },
];

export function Process() {
  return (
    <section className="section" id="process">
      <div className="container-page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="grid max-w-[640px] gap-3">
            <p className="eyebrow">How we work</p>
            <h2 className="text-h2">Five steps, no black boxes.</h2>
          </div>
        </div>

        <ol className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid content-start gap-2 border-t-[3px] border-gold pt-[18px]"
            >
              <span className="font-display text-sm font-bold text-teal-text">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-h3 font-semibold text-navy">
                {step.title}
              </span>
              <p className="text-[0.9375rem] text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
