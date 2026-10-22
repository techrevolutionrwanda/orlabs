import { MiniSite } from "./MiniSite";

export function HeroShowcase() {
  return (
    <div
      className="device-stage relative mx-auto aspect-[6/5] w-full max-w-[560px] select-none"
      role="img"
      aria-label="The OrLabs landing page shown on an animated laptop, tablet and phone"
    >
      {/* Orbit + floor shadow */}
      <div
        aria-hidden="true"
        className="orbit-spin absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-navy-line/70"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80" />
        <span className="absolute bottom-[12%] right-[8%] h-1.5 w-1.5 rounded-full bg-teal/70" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] bottom-[1%] h-[9%] rounded-[50%] bg-navy-deep/70 blur-2xl"
      />

      {/* Tablet */}
      <div className="absolute right-0 top-[2%] z-10 w-[31%] rotate-[7deg]">
        <div className="device-float-tablet rounded-[10px] border border-[#2b4e7c] bg-[#0f2a4c] p-[3%] shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] bg-bg ring-1 ring-black/30">
            <MiniSite variant="tablet" />
          </div>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[1.1%] h-1 w-1 -translate-x-1/2 rounded-full bg-black/40"
          />
        </div>
      </div>

      {/* Laptop */}
      <div className="absolute left-[5%] top-[17%] z-20 w-[78%]">
        <div className="device-float rounded-t-[14px] border border-[#2b4e7c] bg-[#0f2a4c] p-[2.2%] shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-bg ring-1 ring-black/40">
            <MiniSite variant="desktop" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[6px] ring-1 ring-inset ring-white/10"
            />
          </div>
        </div>
        <div className="relative left-1/2 h-2 w-[112%] -translate-x-1/2 rounded-b-[10px] rounded-t-[2px] bg-[#1a3a62] shadow-[0_12px_20px_rgba(0,0,0,0.3)]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[3px] w-[16%] -translate-x-1/2 rounded-b-[3px] bg-navy"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="absolute -left-[1%] bottom-[2%] z-30 w-[21%] -rotate-[8deg]">
        <div className="device-float-phone rounded-[12px] border border-[#2b4e7c] bg-[#0f2a4c] p-[7%] shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[8px] bg-bg ring-1 ring-black/40">
            <MiniSite variant="phone" />

            {/* In-page toast */}
            <div className="toast-cycle absolute inset-x-[7%] bottom-[5%] rounded-[4px] border border-border bg-surface p-[5%] shadow-[0_4px_12px_rgba(11,31,58,0.18)]">
              <div className="flex items-center gap-[6%]">
                <span className="grid aspect-square w-[22%] place-items-center rounded-full bg-teal/15">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[58%] text-teal-text"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[4.5px] font-semibold leading-none text-navy">
                    Project live
                  </div>
                  <div className="mt-[3px] h-[2px] w-[85%] rounded-full bg-border" />
                </div>
              </div>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[2.6%] h-[3px] w-[30%] -translate-x-1/2 rounded-full bg-black/40"
          />
        </div>
      </div>

      {/* Floating status chip */}
      <div className="float-chip absolute left-0 top-[5%] z-30 flex items-center gap-2 rounded-full border border-navy-line bg-navy/90 px-3 py-1.5 text-[10px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur sm:text-xs">
        <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-teal" />
        Kigali · Rwanda
      </div>
    </div>
  );
}
