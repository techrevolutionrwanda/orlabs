import Link from "next/link";
import { CopyrightYear } from "./CopyrightYear";
import { Logo } from "./Logo";

const company = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Labs & insights", href: "/labs" },
  { label: "Careers — Join the Lab", href: "/careers" },

];

const services = [
  { label: "Custom software", href: "/#services" },
  { label: "Web & mobile apps", href: "/#services" },
  { label: "Cloud & DevOps", href: "/#services" },
  { label: "Data & AI", href: "/#services" },
];

const linkClass =
  "text-on-navy-muted no-underline transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none";

const headingClass =
  "text-xs font-semibold uppercase tracking-[0.14em] text-white";

function Pin() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-gold"
    >
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Mail() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-gold"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function Phone() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-gold"
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-on-navy-muted">
      <div className="container-page">
        {/* Call-to-action band */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#1C3352] py-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 text-[0.9375rem]">
              Tell us what you want to build and we will help you shape it.
            </p>
          </div>
          <Link className="btn btn-primary" href="/contact">
            Book a free consultation
          </Link>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="OrLabs Tech Industries — home"
              className="inline-flex items-center no-underline"
            >
              <Logo suffix="Tech Industries" size={32} />
            </Link>
            <p className="mt-4 max-w-[320px] text-[0.9375rem] leading-relaxed">
              Light, engineered. Software engineering from Kigali, for Africa
              and the world.
            </p>
          </div>

          <nav aria-label="Company">
            <h2 className={headingClass}>Company</h2>
            <ul className="mt-5 grid list-none gap-3 p-0 text-[0.9375rem]">
              {company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-5 grid list-none gap-3 p-0 text-[0.9375rem]">
              {services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-label="Contact" className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>Contact</h2>
            <ul className="mt-5 grid list-none gap-3.5 p-0 text-[0.9375rem]">
              <li className="flex gap-3">
                <Pin />
                <span>Kicukiro, Kigali, Rwanda</span>
              </li>
              <li className="flex gap-3">
                <Mail />
                <a href="mailto:[EMAIL]" className={linkClass}>
                  orlabstech@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Phone />
                <span>+250 792 778 698</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1C3352] py-6 text-[0.8125rem] text-[#9AA8BA]">
          <span>
            &copy; <CopyrightYear /> OrLabs Tech Industries Ltd &middot; REG-2026-133324
          </span>
          <span className="flex items-center gap-4">
            <span>Rooted in Rwanda. Built for Africa.</span>
            <a
              href="#top"
              className={`${linkClass} inline-flex items-center gap-1.5`}
            >
              Back to top
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
