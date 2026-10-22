export function Clients() {
  return (
    <section
      className="border-b border-border bg-surface"
      aria-label="Clients"
    >
      <div className="container-page flex flex-wrap items-center justify-between gap-6 py-9">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
          Trusted by teams across Rwanda
        </p>
        <ul className="flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className="flex h-11 w-[132px] items-center justify-center rounded-[10px] border border-dashed border-[#c3cad5] text-xs text-ink-subtle"
            >
              [CLIENT LOGO]
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
