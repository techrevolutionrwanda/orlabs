import { CtaForm } from "./CtaForm";

export function Cta() {
  return (
    <section className="pb-[clamp(4rem,8vw,6rem)]" id="contact">
      <div className="container-page">
        <div className="grid gap-8 rounded-panel bg-navy px-[clamp(24px,5vw,48px)] py-[clamp(36px,6vw,64px)] lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="mb-3.5 text-h2 text-white">
              Have an idea? Let&rsquo;s bring it to light.
            </h2>
            <p className="text-on-navy-muted">
              Tell us what you&rsquo;re building. We&rsquo;ll reply within one
              working day with next steps.
            </p>
          </div>
          <CtaForm />
        </div>
      </div>
    </section>
  );
}
