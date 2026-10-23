import type { Metadata } from "next";
import { ContactForm } from "@/src/components/site/ContactForm";
import { PageHero } from "@/src/components/site/PageHero";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Contact — Talk to an engineer in Kigali | OrLabs",
  description:
    "Start a project with OrLabs Tech Industries. Tell us what you are building and we will reply within one working day. Based in Kigali, Rwanda, working across Africa.",
};

const mapEmbed =
  "https://maps.google.com/maps?q=Norrsken%20House%20Kigali&t=&z=16&ie=UTF8&iwloc=&output=embed";

const mapLink =
  "https://www.google.com/maps/search/?api=1&query=Norrsken+House+Kigali";
export default function ContactPage() {
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
              <ContactForm />
            </div>
          </div>

          <div data-reveal-group className="grid content-start gap-6">
            <div className="motion-lift grid content-start gap-3.5 rounded-card border border-border bg-surface p-7">
              <h2 className="text-h3 font-semibold">OrLabs Tech Industries</h2>
              <address className="grid gap-3 text-[0.9375rem] not-italic text-ink-muted">
                <span>
                  Kicukiro
                  <br />
                  <br />
                  Kigali, Rwanda
                </span>
                <span>
                  <span className="font-semibold text-ink">
                    Phone &amp; WhatsApp
                  </span>
                  <br />
                  +250 792 778 698
                </span>
                <span>
                  <span className="font-semibold text-ink">Email</span>
                  <br />
                  <a
                    href="mailto:[EMAIL]"
                    className="text-teal-text underline decoration-1 underline-offset-4"
                  >
                    orlabstech@gmail.com
                  </a>
                </span>
              </address>
              <p className="text-[0.875rem] text-ink-subtle">
                WhatsApp messages are welcome — +250 792 778 698 to be
                confirmed.
              </p>
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
