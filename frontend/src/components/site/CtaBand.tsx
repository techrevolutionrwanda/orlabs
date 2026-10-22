import Link from "next/link";

/**
 * Closing call-to-action band used at the bottom of the inner pages.
 */
export function CtaBand({
  title = "Have an idea? Let’s bring it to light.",
  body = "Tell us what you’re building. We’ll reply within one working day with next steps.",
  primary = { label: "Book a free consultation", href: "/contact" },
  secondary = { label: "See our work", href: "/work" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="scroll-mt-24 pb-[clamp(4rem,8vw,6rem)]">
      <div className="container-page">
        <div
          data-reveal
          className="grid gap-8 rounded-panel bg-navy px-[clamp(24px,5vw,48px)] py-[clamp(36px,6vw,64px)] lg:grid-cols-[1.2fr_1fr] lg:items-center"
        >
          <div>
            <h2 className="text-h2 text-white">{title}</h2>
            <p className="mt-3.5 text-on-navy-muted">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3.5 lg:justify-end">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
            </Link>
            <Link href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
