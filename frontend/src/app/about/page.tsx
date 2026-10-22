import type { Metadata } from "next";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "About OrLabs — Software engineering from Kigali, Rwanda",
  description:
    "OrLabs Tech Industries is a software engineering company based in Kigali, Rwanda. “Or” means light — and that is what we bring: clarity, speed and smart technology to organisations across many industries.",
};

const values = [
  {
    name: "Clarity",
    body: "Plain language, honest estimates and no jargon between us and the people who use what we build.",
  },
  {
    name: "Craft",
    body: "Careful engineering: reviewed code, tested releases and systems that stay maintainable after launch.",
  },
  {
    name: "Curiosity",
    body: "We keep learning, keep experimenting and keep asking what a better answer would look like.",
  },
  {
    name: "Partnership",
    body: "We work alongside your team, share the reasoning and leave you able to run what we build.",
  },
  {
    name: "Impact",
    body: "Success is measured by what changes for the people and businesses that rely on the work.",
  },
];

const team = ["[Name]", "[Name]", "[Name]", "[Name]"];

export default function AboutPage() {
  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="About"
        title="“Or” means light. That is what we build."
        lead="OrLabs Tech Industries is a software engineering company based in Kigali, Rwanda. “Or” means light — and that is what we bring: clarity, speed and smart technology to organisations across many industries."
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-h2">Light reveals what is hidden.</h2>
          </div>
          <div data-reveal className="grid gap-5 text-[1.0625rem] leading-[1.7] text-ink-muted">
            <p>
              Light reveals what is hidden, guides the way forward and makes
              growth possible. OrLabs was founded in Kigali on that idea.
            </p>
            <p>
              We believe Africa&rsquo;s next chapter will be written in code — by
              engineers who understand local realities and build to global
              standards.
            </p>
            <p>
              That means software that works on the networks and devices our
              users actually have, in the languages and workflows they actually
              use, with the support that keeps it running after launch.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container-page">
          <SectionHead
            tone="dark"
            eyebrow="Mission & vision"
            title="Why we are here, and where we are going."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <article
              data-reveal
              className="grid content-start gap-3.5 rounded-card border border-navy-line bg-navy-soft p-8"
            >
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-gold">
                Mission
              </p>
              <p className="text-[1.125rem] leading-[1.6] text-white">
                To engineer reliable, human-centred software that brings clarity
                and growth to organisations across Africa.
              </p>
            </article>
            <article
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="grid content-start gap-3.5 rounded-card border border-navy-line bg-navy-soft p-8"
            >
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-gold">
                Vision
              </p>
              <p className="text-[1.125rem] leading-[1.6] text-white">
                To be Africa&rsquo;s most trusted software engineering house — a
                source of light that powers industries, creates opportunity and
                puts African talent on the global stage.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="Values"
            title="Five things we hold to."
            lead="Clarity · Craft · Curiosity · Partnership · Impact"
          />

          <ul
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value) => (
              <li
                key={value.name}
                className="grid content-start gap-2.5 rounded-card border border-border bg-surface p-7"
              >
                <h3 className="text-h3 font-semibold">{value.name}</h3>
                <p className="text-[0.9375rem] text-ink-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-chip">
        <div className="container-page">
          <SectionHead
            eyebrow="The team"
            title="Engineers in Kigali."
            lead="The people behind the work — [TEAM PHOTO], [Name] and [Role] still to be confirmed."
          />

          <ul
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-2 gap-5 p-0 lg:grid-cols-4"
          >
            {team.map((name, index) => (
              <li
                key={index}
                className="grid content-start gap-3 rounded-card border border-border bg-surface p-5"
              >
                <span
                  aria-hidden="true"
                  className="grid aspect-[4/3] w-full place-items-center rounded-xl bg-chip text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle"
                >
                  [TEAM PHOTO]
                </span>
                <span className="text-[1.0625rem] font-semibold text-navy">
                  {name}
                </span>
                <span className="text-[0.9375rem] text-ink-subtle">[Role]</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
