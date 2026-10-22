import type { ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const services: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Custom Software",
    body: "Business systems built around how you actually work — ERPs, portals and management platforms.",
    icon: (
      <svg {...iconProps}>
        <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />
      </svg>
    ),
  },
  {
    title: "Web & Mobile Apps",
    body: "Fast, beautiful apps for Android, iOS and the web, designed for African users and networks.",
    icon: (
      <svg {...iconProps}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    body: "Secure hosting, migration and infrastructure that scales as you grow.",
    icon: (
      <svg {...iconProps}>
        <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.5A3.5 3.5 0 0 0 7 18z" />
      </svg>
    ),
  },
  {
    title: "Data, AI & Automation",
    body: "Dashboards, analytics and smart automation that turn your data into decisions.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20h16" />
        <rect x="6" y="11" width="3" height="7" />
        <rect x="11" y="6" width="3" height="12" />
        <rect x="16" y="13" width="3" height="5" />
      </svg>
    ),
  },
  {
    title: "Integrations & Fintech",
    body: "Mobile money, payment gateways, government and third-party API integrations.",
    icon: (
      <svg {...iconProps}>
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </svg>
    ),
  },
  {
    title: "IT Consulting",
    body: "Strategy, audits and roadmaps to take your organisation digital, step by step.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container-page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="grid max-w-[640px] gap-3">
            <p className="eyebrow">What we do</p>
            <h2 className="text-h2">
              From first idea to a system your team relies on.
            </h2>
          </div>
          <a className="link-arrow text-navy" href="#contact">
            Talk to an engineer →
          </a>
        </div>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="grid content-start gap-3.5 rounded-card border border-border bg-surface p-7 transition-[border-color,box-shadow] duration-150 hover:border-border-strong hover:shadow-[0_8px_24px_rgba(11,31,58,0.06)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
                {service.icon}
              </span>
              <h3 className="text-h3 font-semibold">{service.title}</h3>
              <p className="text-[0.9375rem] text-ink-muted">{service.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
