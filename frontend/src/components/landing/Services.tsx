import Link from "next/link";
import { serviceIcons } from "@/src/content/service-icons";
import { services } from "@/src/content/services";

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container-page">
        <div
          data-reveal
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="grid max-w-[640px] gap-3">
            <p className="eyebrow">What we do</p>
            <h2 className="text-h2">
              From first idea to a system your team relies on.
            </h2>
          </div>
          <Link className="link-arrow text-navy" href="/services">
            Talk to an engineer <span className="motion-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

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
                {serviceIcons[service.slug]}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
