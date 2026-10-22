import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { defaultServiceIcon, serviceIcons } from "@/src/content/service-icons";
import { RevealController } from "@/src/components/site/RevealController";
import { siteServices } from "@/src/lib/site/content";

export const metadata: Metadata = {
  title: "Services — Software, apps, cloud, data and integrations | OrLabs",
  description:
    "Custom software, web and mobile apps, cloud and DevOps, data and AI, integrations and fintech, and IT consulting — engineered from Kigali, Rwanda for organisations across Africa.",
};

export default async function ServicesPage() {
  // The services come from the portal, so a service that is published there
  // is a service the website offers.
  const services = await siteServices();

  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="What we do"
        title="From first idea to a system your team relies on."
        lead="Six practices, one engineering team. We design and build web, mobile, cloud and data solutions for organisations across Africa — engineered to global standards, built for local realities."
      />

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="Our services"
            title="Pick the starting point. We will handle the rest."
            lead="Every engagement begins with discovery, so the scope is clear before a line of code is written."
          />

          <ul
            data-reveal-group
            className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <li
                key={service.slug}
                className="motion-lift grid content-start gap-3.5 rounded-card border border-border bg-surface p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
                  {serviceIcons[service.slug] ?? defaultServiceIcon}
                </span>
                <h3 className="text-h3 font-semibold">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-navy no-underline transition-colors hover:text-teal-text"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="text-[0.9375rem] text-ink-muted">{service.short}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="link-arrow mt-1 text-navy no-underline"
                >
                  Learn more <span className="motion-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container-page">
          <SectionHead
            tone="dark"
            eyebrow="How we work"
            title="Five steps, no black boxes."
            lead="Discover → Design → Build → Launch → Support. You see the same progress we do."
          />

          <ol
            data-reveal-group
            className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5"
          >
            {["Discover", "Design", "Build", "Launch", "Support"].map(
              (step, index) => (
                <li
                  key={step}
                  className="motion-lift motion-lift-dark grid content-start gap-2 rounded-card border border-navy-line bg-navy-soft p-6"
                >
                  <span className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.125rem] font-semibold text-white">
                    {step}
                  </span>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      <CtaBand
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />
    </main>
  );
}
