import Link from "next/link";
import Logo from "./Logo";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Labs & insights", href: "#" },
      { label: "Careers — Join the Lab", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Custom software", href: "#services" },
      { label: "Web & mobile apps", href: "#services" },
      { label: "Cloud & DevOps", href: "#services" },
      { label: "Data & AI", href: "#services" },
    ],
  },
];

/**
 * Site footer: brand blurb, link columns, contact block and legal bar.
 * [SQUARE BRACKETS] are unknown placeholders — never invent their values.
 */
export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 pb-8 text-on-navy-muted">
      <div className="mx-auto max-w-container px-[var(--gutter)]">
        <div className="grid gap-10 max-[860px]:grid-cols-2">
          <div className="max-[860px]:col-span-2">
            <Link
              href="/#top"
              aria-label="OrLabs Tech Industries — home"
              className="inline-flex items-center"
            >
              <Logo size={32} />
              <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-on-navy">
                {" Tech Industries"}
              </span>
            </Link>
            <p className="mt-3.5 max-w-[320px] text-[0.9375rem]">
              Light, engineered. Software engineering from Kigali, for Africa and
              the world.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3.5 font-sans text-[0.9375rem] font-semibold tracking-normal text-on-navy">
                {column.title}
              </h2>
              <ul className="m-0 grid list-none gap-2.5 p-0 text-[0.9375rem]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-on-navy-muted no-underline hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-3.5 font-sans text-[0.9375rem] font-semibold tracking-normal text-on-navy">
              Contact
            </h2>
            <ul className="m-0 grid list-none gap-2.5 p-0 text-[0.9375rem]">
              <li>[Street address], Kigali, Rwanda</li>
              <li>
                <a
                  href="mailto:[EMAIL]"
                  className="text-on-navy-muted no-underline hover:text-gold"
                >
                  [EMAIL]
                </a>
              </li>
              <li>[PHONE / WHATSAPP]</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[#1C3352] pt-6 text-[0.8125rem] text-[#9AA8BA]">
          <span>
            © {new Date().getFullYear()} OrLabs Tech Industries Ltd · [RDB
            registration no.]
          </span>
          <span>Rooted in Rwanda. Built for Africa.</span>
        </div>
      </div>
    </footer>
  );
}
