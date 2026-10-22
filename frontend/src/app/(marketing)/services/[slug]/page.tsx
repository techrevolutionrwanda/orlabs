import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { defaultServiceIcon, serviceIcons } from "@/src/content/service-icons";
import { RevealController } from "@/src/components/site/RevealController";
import { siteServiceBySlug, siteServices } from "@/src/lib/site/content";

export async function generateStaticParams() {
  // The published services are known when the site is built, so each one gets
  // a page of its own.
  const services = await siteServices();

  return services.map((service) => ({ slug: service.slug }));
}

// The page reads `params` while rendering, so a navigation into it is allowed
// to block on the server instead of being validated as an instant navigation.
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await siteServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found | OrLabs" };
  }

  return {
    title: `${service.title} — Software engineering from Kigali | OrLabs`,
    description: service.short,
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await siteServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero eyebrow="Service" title={service.title} lead={service.short}>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Link href="/contact" className="btn btn-primary">
            Book a free consultation
          </Link>
          <Link href="/services" className="btn btn-ghost">
            All services
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div data-reveal className="grid content-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
              {serviceIcons[service.slug] ?? defaultServiceIcon}
            </span>
            <h2 className="text-h2">The problem we solve</h2>
          </div>
          <p
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="text-[1.125rem] leading-[1.7] text-ink-muted"
          >
            {service.problem}
          </p>
        </div>
      </section>

      <section className="section bg-chip">
        <div className="container-page">
          <SectionHead
            eyebrow="What is included"
            title="Everything a delivery needs."
          />

          <ul
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-card border border-border bg-surface p-5 text-[0.9375rem] text-ink-muted"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-text"
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="How we deliver"
            title="Five steps, no black boxes."
          />

          <ol
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5"
          >
            {["Discover", "Design", "Build", "Launch", "Support"].map(
              (step, index) => (
                <li
                  key={step}
                  className="grid content-start gap-2 rounded-card border border-border bg-surface p-6"
                >
                  <span className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.125rem] font-semibold text-navy">
                    {step}
                  </span>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      <CtaBand
        title={`Need ${service.title.toLowerCase()}?`}
        body="Tell us what you are building. We will reply within one working day with next steps."
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />
    </main>
  );
}
