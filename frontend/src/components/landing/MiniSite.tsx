type Variant = "desktop" | "tablet" | "phone";

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

const steps = ["Discover", "Design", "Build", "Launch", "Support"];

function MiniMark() {
  return (
    <span className="grid aspect-square w-[3cqw] place-items-center rounded-[0.6cqw] border border-white/15 bg-navy-deep">
      <svg viewBox="-2 -2 68 68" className="w-[82%]" aria-hidden="true">
        <path
          d="M53.67 28.18 A22 22 0 1 1 35.82 10.33"
          fill="none"
          stroke="#F5B301"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="6" fill="#00A6A6" />
      </svg>
    </span>
  );
}

function MiniCard() {
  return (
    <div className="rounded-[1.2cqw] border border-border bg-surface p-[1.6cqw]">
      <div className="grid aspect-square w-[2.6cqw] place-items-center rounded-[0.6cqw] bg-navy">
        <div className="w-[1cqw] rounded-[0.2cqw] border border-gold/80 p-[0.15cqw]">
          <div className="h-[0.18cqw] rounded-full bg-gold" />
        </div>
      </div>
      <div className="mt-[1.1cqw] h-[0.7cqw] w-[68%] rounded-full bg-navy/80" />
      <div className="mt-[0.8cqw] space-y-[0.5cqw]">
        <div className="h-[0.4cqw] w-full rounded-full bg-border" />
        <div className="h-[0.4cqw] w-[84%] rounded-full bg-border" />
      </div>
    </div>
  );
}

function MiniHeroArt() {
  return (
    <div className="absolute right-[3.5cqw] top-[4.5cqw] w-[30%] rounded-[1.1cqw] border border-navy-line bg-navy-soft p-[1.2cqw]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5cqw] bg-bg">
        <div className="flex items-center justify-between bg-navy px-[0.8cqw] py-[0.5cqw]">
          <div className="h-[0.35cqw] w-[22%] rounded-full bg-gold" />
          <div className="flex gap-[0.3cqw]">
            <div className="h-[0.3cqw] w-[1.4cqw] rounded-full bg-white/40" />
            <div className="h-[0.3cqw] w-[1.4cqw] rounded-full bg-white/40" />
          </div>
        </div>
        <div className="bg-navy px-[1cqw] py-[1.2cqw]">
          <div className="h-[0.5cqw] w-[76%] rounded-full bg-white/80" />
          <div className="mt-[0.5cqw] h-[0.5cqw] w-[58%] rounded-full bg-white/80" />
          <div className="mt-[0.7cqw] h-[0.4cqw] w-[40%] rounded-full bg-gold" />
        </div>
        <div className="grid grid-cols-3 gap-[0.4cqw] bg-bg p-[0.7cqw]">
          <div className="h-[2cqw] rounded-[0.3cqw] border border-border bg-white" />
          <div className="h-[2cqw] rounded-[0.3cqw] border border-border bg-white" />
          <div className="h-[2cqw] rounded-[0.3cqw] border border-border bg-white" />
        </div>
      </div>
      <div className="absolute -bottom-[2.4cqw] -left-[2cqw] w-[9.5cqw] rotate-[-8deg] rounded-[0.9cqw] border border-[#2b4e7c] bg-[#0f2a4c] p-[0.5cqw] shadow-[0_0.6cqw_1.4cqw_rgba(0,0,0,0.35)]">
        <div className="aspect-[9/19] rounded-[0.45cqw] bg-bg p-[0.5cqw]">
          <div className="h-[0.35cqw] w-[70%] rounded-full bg-navy/70" />
          <div className="mt-[0.5cqw] h-[1.2cqw] w-[80%] rounded-[0.2cqw] bg-gold/90" />
          <div className="mt-[0.5cqw] space-y-[0.3cqw]">
            <div className="h-[0.25cqw] w-full rounded-full bg-border" />
            <div className="h-[0.25cqw] w-[80%] rounded-full bg-border" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MiniSite({ variant }: { variant: Variant }) {
  const compact = variant === "phone";
  const tablet = variant === "tablet";
  const cardCols = compact
    ? "grid-cols-2"
    : tablet
      ? "grid-cols-2"
      : "grid-cols-3";
  const scrollClass = compact
    ? "screen-scroll-phone"
    : tablet
      ? "screen-scroll-tablet"
      : "screen-scroll";

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg [container-type:inline-size]">
      <div className={scrollClass}>
        {/* Nav */}
        <div className="flex items-center justify-between bg-navy px-[3cqw] py-[1.6cqw]">
          <div className="flex items-center gap-[0.8cqw]">
            <MiniMark />
            <span className="font-display text-[1.7cqw] font-bold tracking-[-0.02em] text-white">
              <span className="text-gold">Or</span>Labs
            </span>
          </div>
          {compact ? (
            <div className="space-y-[0.5cqw]">
              <div className="h-[0.4cqw] w-[2.4cqw] rounded-full bg-white/70" />
              <div className="h-[0.4cqw] w-[2.4cqw] rounded-full bg-white/70" />
            </div>
          ) : (
            <div className="flex items-center gap-[1.6cqw]">
              {["Services", "Industries", "How we work", "About", "Work"].map(
                (item) => (
                  <span
                    key={item}
                    className="text-[0.95cqw] font-medium text-[#dce3ec]"
                  >
                    {item}
                  </span>
                ),
              )}
              <span className="rounded-full bg-gold px-[1.6cqw] py-[0.7cqw] text-[0.9cqw] font-semibold text-navy">
                Start a project
              </span>
            </div>
          )}
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden bg-navy px-[4cqw] pb-[4cqw] pt-[3cqw]">
          <div className={compact ? "" : "w-[62%]"}>
            <span className="inline-flex items-center gap-[0.6cqw] rounded-full border border-navy-line px-[1.2cqw] py-[0.5cqw] text-[0.85cqw] text-on-navy-muted">
              <span className="aspect-square w-[0.5cqw] rounded-full bg-teal" />
              Software engineering · Kigali, Rwanda
            </span>
            <p className="mt-[1.5cqw] font-display text-[4.4cqw] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Software that brings <span className="text-gold">light</span> to
              your business.
              {!compact && (
                <span className="caret ml-[0.4cqw] inline-block h-[3.2cqw] w-[0.3cqw] translate-y-[0.4cqw] bg-gold align-baseline" />
              )}
            </p>
            <p className="mt-[1.4cqw] text-[1.1cqw] leading-[1.55] text-on-navy-muted">
              We design and build web, mobile, cloud and data solutions for
              organisations across Africa — engineered to global standards.
            </p>
            <div className="mt-[2cqw] flex flex-wrap items-center gap-[1cqw]">
              <span className="rounded-full bg-gold px-[1.8cqw] py-[0.8cqw] text-[0.95cqw] font-semibold text-navy">
                Book a free consultation
              </span>
              <span className="rounded-full border border-[#4a6488] px-[1.8cqw] py-[0.8cqw] text-[0.95cqw] font-semibold text-white">
                See our work
              </span>
            </div>
          </div>
          {!compact && <MiniHeroArt />}
        </div>

        {/* Clients */}
        <div className="flex items-center justify-between gap-[2cqw] border-y border-border bg-surface px-[4cqw] py-[2.4cqw]">
          <div className="w-[22%] space-y-[0.45cqw]">
            <div className="h-[0.4cqw] w-full rounded-full bg-ink-subtle/60" />
            <div className="h-[0.4cqw] w-[70%] rounded-full bg-ink-subtle/40" />
          </div>
          <div className="flex flex-1 justify-end gap-[1.2cqw]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[3/1] w-[13%] rounded-[0.5cqw] border border-dashed border-[#c3cad5]"
              />
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-bg px-[4cqw] py-[4cqw]">
          <div className="h-[0.45cqw] w-[9%] rounded-full bg-teal-text" />
          <div className="mt-[1.2cqw] max-w-[70%] font-display text-[2.8cqw] font-bold leading-[1.15] text-navy">
            From first idea to a system your team relies on.
          </div>
          <div className={`mt-[2.4cqw] grid gap-[1.4cqw] ${cardCols}`}>
            {Array.from({ length: 6 }).map((_, index) => (
              <MiniCard key={index} />
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="border-y border-border bg-surface px-[4cqw] py-[4cqw]">
          <div className="h-[0.45cqw] w-[8%] rounded-full bg-teal-text" />
          <div className="mt-[1.2cqw] font-display text-[2.8cqw] font-bold leading-[1.15] text-navy">
            One engineering team. Many industries.
          </div>
          <div className="mt-[2cqw] flex flex-wrap gap-[0.9cqw]">
            {industries.slice(0, compact ? 6 : 9).map((industry) => (
              <span
                key={industry}
                className="rounded-full bg-chip px-[1.4cqw] py-[0.65cqw] text-[0.9cqw] font-medium text-navy"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-bg px-[4cqw] py-[4cqw]">
          <div className="h-[0.45cqw] w-[10%] rounded-full bg-teal-text" />
          <div className="mt-[1.2cqw] font-display text-[2.8cqw] font-bold leading-[1.15] text-navy">
            Five steps, no black boxes.
          </div>
          <div className={`mt-[2.2cqw] grid gap-[1.4cqw] ${compact ? "grid-cols-2" : "grid-cols-5"}`}>
            {steps.map((step, index) => (
              <div
                key={step}
                className="border-t-[0.4cqw] border-gold pt-[1cqw]"
              >
                <div className="text-[0.8cqw] font-bold text-teal-text">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-[0.35cqw] font-display text-[1.25cqw] font-semibold text-navy">
                  {step}
                </div>
                <div className="mt-[0.6cqw] space-y-[0.4cqw]">
                  <div className="h-[0.35cqw] w-full rounded-full bg-border-strong/70" />
                  <div className="h-[0.35cqw] w-[75%] rounded-full bg-border-strong/50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why OrLabs */}
        <div className="bg-navy px-[4cqw] py-[4cqw]">
          <div className={`grid gap-[2.4cqw] ${compact ? "grid-cols-1" : "grid-cols-[1fr_1.15fr]"}`}>
            <div>
              <div className="h-[0.45cqw] w-[18%] rounded-full bg-gold" />
              <div className="mt-[1.2cqw] font-display text-[2.6cqw] font-bold leading-[1.15] text-white">
                &ldquo;Or&rdquo; means light. That is what we build.
              </div>
              <div className="mt-[1.4cqw] space-y-[0.55cqw]">
                <div className="h-[0.4cqw] w-full rounded-full bg-white/25" />
                <div className="h-[0.4cqw] w-[86%] rounded-full bg-white/25" />
                <div className="h-[0.4cqw] w-[62%] rounded-full bg-white/25" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[1.2cqw]">
              {["Clarity", "Craft", "Built for Africa", "Partnership"].map(
                (value) => (
                  <div
                    key={value}
                    className="rounded-[1cqw] border border-navy-line p-[1.4cqw]"
                  >
                    <div className="text-[1.05cqw] font-semibold text-gold">
                      {value}
                    </div>
                    <div className="mt-[0.7cqw] space-y-[0.4cqw]">
                      <div className="h-[0.35cqw] w-full rounded-full bg-white/20" />
                      <div className="h-[0.35cqw] w-[72%] rounded-full bg-white/20" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Work */}
        <div className="bg-bg px-[4cqw] py-[4cqw]">
          <div className={compact ? "grid gap-[1.4cqw]" : "grid grid-cols-[2fr_1fr] gap-[1.4cqw]"}>
            <div className="rounded-[1.2cqw] border border-border bg-surface p-[2cqw]">
              <div className="h-[0.4cqw] w-[12%] rounded-full bg-teal-text" />
              <div className="mt-[1.2cqw] aspect-[16/6] rounded-[0.8cqw] border border-dashed border-[#c3cad5]" />
              <div className="mt-[1.2cqw] h-[0.8cqw] w-[68%] rounded-full bg-navy/70" />
              <div className="mt-[0.7cqw] space-y-[0.4cqw]">
                <div className="h-[0.35cqw] w-full rounded-full bg-border" />
                <div className="h-[0.35cqw] w-[60%] rounded-full bg-border" />
              </div>
            </div>
            {!compact && (
              <div className="flex flex-col justify-between rounded-[1.2cqw] bg-gold p-[2cqw]">
                <div className="font-display text-[3cqw] font-bold leading-none text-navy">
                  &ldquo;
                </div>
                <div className="space-y-[0.5cqw]">
                  <div className="h-[0.45cqw] w-full rounded-full bg-navy/70" />
                  <div className="h-[0.45cqw] w-[88%] rounded-full bg-navy/70" />
                  <div className="h-[0.45cqw] w-[64%] rounded-full bg-navy/70" />
                </div>
                <div className="h-[0.35cqw] w-[42%] rounded-full bg-navy/50" />
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-bg px-[4cqw] pb-[4cqw]">
          <div
            className={`rounded-[1.5cqw] bg-navy p-[3cqw] ${
              compact ? "" : "grid grid-cols-[1.2fr_1fr] items-center gap-[2cqw]"
            }`}
          >
            <div className="font-display text-[2.2cqw] font-bold leading-[1.2] text-white">
              Have an idea? Let&rsquo;s bring it to light.
            </div>
            <div className="mt-[1.4cqw] flex gap-[0.8cqw]">
              <div className="h-[2.4cqw] flex-1 rounded-full border border-[#4a6488] bg-[#102a4a]" />
              <div className="rounded-full bg-gold px-[1.6cqw] py-[0.65cqw] text-[0.9cqw] font-semibold text-navy">
                Start
              </div>
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="bg-navy-deep px-[4cqw] py-[3cqw]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.8cqw]">
              <MiniMark />
              <div className="h-[0.4cqw] w-[6cqw] rounded-full bg-white/30" />
            </div>
            <div className="flex gap-[1.4cqw]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[0.35cqw] w-[3.4cqw] rounded-full bg-white/20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
