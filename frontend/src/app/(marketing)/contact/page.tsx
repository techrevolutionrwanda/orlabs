import type { Metadata } from "next";
import { ContactForm } from "@/src/components/site/ContactForm";
import { PageHero } from "@/src/components/site/PageHero";
import { RevealController } from "@/src/components/site/RevealController";
import { siteContactChannels, siteServices } from "@/src/lib/site/content";

export const metadata: Metadata = {
  title: "Contact — Talk to an engineer in Kigali | OrLabs",
  description:
    "Start a project with OrLabs Tech Industries. Tell us what you are building and we will reply within one working day. Based in Kigali, Rwanda, working across Africa.",
};

const mapEmbed =
  "https://www.openstreetmap.org/export/embed.html?bbox=30.02%2C-1.99%2C30.10%2C-1.90&layer=mapnik&marker=-1.9441%2C30.0619";

const mapLink =
  "https://www.openstreetmap.org/?mlat=-1.9441&mlon=30.0619#map=13/30.0619/-1.9441";

export default async function ContactPage() {
  // The details the page shows come from the portal, and the services in the
  // form are the ones the studio offers.
  const channels = await siteContactChannels();
  const services = await siteServices();

  const address = channels.find((channel) => channel.kind === "address");
  const phone = channels.find(
    (channel) => channel.kind === "phone" || channel.kind === "whatsapp",
  );
  const email = channels.find((channel) => channel.kind === "email");

  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="Contact"
        title="Have an idea? Let’s bring it to light."
        lead="Tell us what you’re building. We’ll reply within one working day with next steps — whether it is a full product, an integration or an idea that needs shaping first."
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div data-reveal>
            <p className="eyebrow">Send a message</p>
            <h2 className="mt-3 text-h2">Start the conversation.</h2>
            <div className="mt-8">
              <ContactForm
                services={services.map((service) => ({
                  slug: service.slug,
                  title: service.title,
                }))}
              />
            </div>
          </div>

          <div data-reveal-group className="grid content-start gap-6">
            <div className="motion-lift grid content-start gap-3.5 rounded-card border border-border bg-surface p-7">
              <h2 className="text-h3 font-semibold">OrLabs Tech Industries</h2>
              <address className="grid gap-3 text-[0.9375rem] not-italic text-ink-muted">
                {address ? <span>{address.label}</span> : null}
                {phone ? (
                  <span>
                    <span className="font-semibold text-ink">Phone &amp; WhatsApp</span>
                    <br />
                    {phone.label}
                  </span>
                ) : null}
                {email ? (
                  <span>
                    <span className="font-semibold text-ink">Email</span>
                    <br />
                    <a
                      href={email.href || `mailto:${email.value}`}
                      className="text-teal-text underline decoration-1 underline-offset-4"
                    >
                      {email.label}
                    </a>
                  </span>
                ) : null}
              </address>
              {phone ? (
                <p className="text-[0.875rem] text-ink-subtle">
                  WhatsApp messages are welcome.
                </p>
              ) : null}
            </div>

            <div className="motion-lift grid content-start gap-3.5 overflow-hidden rounded-card border border-border bg-surface">
              <iframe
                className="h-[280px] w-full border-0"
                src={mapEmbed}
                title="Map showing Kigali, Rwanda"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="px-7 pb-6 text-[0.875rem] text-ink-subtle">
                Kigali, Rwanda.{" "}
                <a
                  href={mapLink}
                  className="link-arrow text-teal-text"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the map
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
