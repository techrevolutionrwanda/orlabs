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

export function Footer() {
  return (
    <footer className="bg-navy-deep pb-8 pt-16 text-on-navy-muted">
      <div className="container-page">
        <div className="grid gap-10 max-[860px]:grid-cols-2">
          <div className="max-[860px]:col-span-2">
            <Link
              href="/"
              aria-label="OrLabs Tech Industries — home"
              className="inline-flex items-center no-underline"
            >
              <Logo suffix="Tech Industries" size={32} />
            </Link>
            <p className="mt-3.5 max-w-[320px] text-[0.9375rem]">
              Light, engineered. Software engineering from Kigali, for Africa and
              the world.
            </p>
          </div>

          <nav aria-label="Company">
            <h2 className="text-[0.9375rem] font-semibold tracking-normal text-white">
              Company
            </h2>
            <ul className="mt-3.5 grid list-none gap-2.5 p-0 text-[0.9375rem]">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-on-navy-muted no-underline transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-[0.9375rem] font-semibold tracking-normal text-white">
              Services
            </h2>
            <ul className="mt-3.5 grid list-none gap-2.5 p-0 text-[0.9375rem]">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-on-navy-muted no-underline transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact">
            <h2 className="text-[0.9375rem] font-semibold tracking-normal text-white">
              Contact
            </h2>
            <ul className="mt-3.5 grid list-none gap-2.5 p-0 text-[0.9375rem]">
              <li>[Street address], Kigali, Rwanda</li>
              <li>
                <a
                  href="mailto:[EMAIL]"
                  className="text-on-navy-muted no-underline transition-colors hover:text-gold"
                >
                  [EMAIL]
                </a>
              </li>
              <li>[PHONE / WHATSAPP]</li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#1C3352] pt-6 text-[0.8125rem] text-[#9AA8BA]">
          <span>
            &copy; <CopyrightYear /> OrLabs Tech Industries Ltd &middot; [RDB
            registration no.]
          </span>
          <span>Rooted in Rwanda. Built for Africa.</span>
        </div>
      </div>
    </footer>
  );
}
