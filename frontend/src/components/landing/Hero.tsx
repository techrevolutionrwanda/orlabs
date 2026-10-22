import { HeroShowcase } from "./HeroShowcase";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy" id="top">
      <div className="container-page grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <span
            className="rise-in inline-flex items-center gap-2 rounded-full border border-navy-line px-3.5 py-1.5 text-sm text-on-navy-muted"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
            Software engineering · Kigali, Rwanda
          </span>

          <h1
            className="rise-in mt-6 text-hero leading-[1.05] tracking-[-0.03em] text-white"
            style={{ animationDelay: "0.12s" }}
          >
            Software that brings <span className="text-gold">light</span> to
            your business.
          </h1>

          <p
            className="rise-in mt-6 max-w-[540px] text-lead text-on-navy-muted"
            style={{ animationDelay: "0.2s" }}
          >
            We design and build web, mobile, cloud and data solutions for
            organisations across Africa — engineered to global standards, built
            for local realities.
          </p>

          <div
            className="rise-in mt-8 flex flex-wrap gap-3.5"
            style={{ animationDelay: "0.28s" }}
          >
            <a className="btn btn-primary" href="#contact">
              Book a free consultation
            </a>
            <a className="btn btn-ghost" href="#work">
              See our work
            </a>
          </div>
        </div>

        <div className="rise-in" style={{ animationDelay: "0.34s" }}>
          <div className="overflow-hidden rounded-panel border border-navy-line/70 bg-navy-soft p-3 sm:p-5">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
