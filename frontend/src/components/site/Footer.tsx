import Link from "next/link";
import {
  siteContactChannels,
  siteServices,
  siteSocialLinks,
} from "@/src/lib/site/content";
import { CopyrightYear } from "./CopyrightYear";
import { Logo } from "./Logo";

const company = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Labs & insights", href: "/labs" },
  { label: "Careers — Join the Lab", href: "/careers" },
  { label: "Staff portal", href: "/portal" },
];

export async function Footer() {
  // The services, the contact details and the social links come from the
  // portal, so the footer shows what the studio has published.
  const services = await siteServices();
  const channels = await siteContactChannels();
  const social = await siteSocialLinks();

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
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-on-navy-muted no-underline transition-colors hover:text-gold"
                  >
                    {service.title}
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
              {channels.map((channel) => (
                <li key={channel.id}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="text-on-navy-muted no-underline transition-colors hover:text-gold"
                    >
                      {channel.label}
                    </a>
                  ) : (
                    channel.label
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {social.length > 0 ? (
            <nav aria-label="Elsewhere">
              <h2 className="text-[0.9375rem] font-semibold tracking-normal text-white">
                Elsewhere
              </h2>
              <ul className="mt-3.5 grid list-none gap-2.5 p-0 text-[0.9375rem]">
                {social.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="text-on-navy-muted no-underline transition-colors hover:text-gold"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
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
