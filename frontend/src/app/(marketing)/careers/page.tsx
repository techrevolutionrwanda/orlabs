import type { Metadata } from "next";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Careers — Join the Lab | OrLabs Tech Industries",
  description:
    "Join the Lab: open roles at OrLabs Tech Industries in Kigali, Rwanda, how we work, and how to apply.",
};

const culture = [
  {
    title: "Engineering first",
    body: "Code review, tests and clear documentation are part of the job, not an afterthought.",
  },
  {
    title: "Curiosity",
    body: "The Lab is our excuse to try the interesting thing: a new tool, a new sector, a better way to solve a problem.",
  },
  {
    title: "Local reality, global standard",
    body: "We build for the networks, devices and workflows our users actually have — to the same standard as anywhere else.",
  },
  {
    title: "Ownership",
    body: "You will work close to the people who decide what gets built, and be trusted to make the technical calls.",
  },
  {
    title: "Kigali",
    body: "Our base. Rwanda’s technology community is young, ambitious and worth being part of.",
  },
];

const roles = [
  {
    title: "UI/UX Designer",
    discipline: "Design",
    location: "Kigali, Rwanda · Full-time",
    summary: "Design and prototype user interfaces for web and mobile applications, working closely with engineers to ensure a seamless user experience.",
  },
  {
    title: "Software Engineer",
    discipline: "Engineering",
    location: "Kigali, Rwanda · Full-time",
    summary: "Develop and maintain high-quality software solutions, collaborating with cross-functional teams to deliver value to our users.",
  },
  {
    title: "Product Manager",
    discipline: "Product",
    location: "Kigali, Rwanda · Full-time",
    summary: "Define and drive the product strategy, working closely with engineering and design teams to deliver value to our users.",
  },
];

const steps = [
  {
    title: "Send us your CV",
    body: "Email orlabstech@gmail.com with your CV and a short note on the kind of work you want to do.",
  },
  {
    title: "A conversation",
    body: "We will invite you for a chat about the role, the team and how we work.",
  },
  {
    title: "A practical exercise",
    body: "A short, practical exercise so we can see how you think and how you build.",
  },
];

export default function CareersPage() {
  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="Careers"
        title="Join the Lab."
        lead="We are a software engineering company based in Kigali, and we are looking for engineers who want their work to matter. “Labs” means experimentation — bring your curiosity."
      />

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="The culture"
            title="How it feels to work here."
            lead="Values only mean something if they show up on a Tuesday afternoon. Here is what ours look like in practice."
          />

          <ul
            data-reveal-group
            className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {culture.map((item) => (
              <li
                key={item.title}
                className="motion-lift grid content-start gap-2.5 rounded-card border border-border bg-surface p-7"
              >
                <h3 className="text-h3 font-semibold">{item.title}</h3>
                <p className="text-[0.9375rem] text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container-page">
          <SectionHead
            tone="dark"
            eyebrow="Open roles"
            title="Where you could fit in."
            lead="Nothing is published yet — send us your CV and we will tell you where you could plug in."
          />

          <ul
            data-reveal-group
            className="grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-3"
          >
            {roles.map((role, index) => (
              <li
                key={index}
                className="motion-lift motion-lift-dark grid content-start gap-2.5 rounded-card border border-navy-line bg-navy-soft p-7"
              >
                <h3 className="text-h3 font-semibold text-white">{role.title}</h3>
                <p className="text-[0.875rem] font-semibold uppercase tracking-[0.12em] text-gold">
                  {role.discipline}
                </p>
                <p className="text-[0.9375rem] text-on-navy-muted">{role.location}</p>
                <p className="text-[0.9375rem] text-on-navy-muted">{role.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="How to apply"
            title="Three steps, no mystery."
          />

          <ol
            data-reveal-group
            className="grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-3"
          >
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="motion-lift grid content-start gap-2.5 rounded-card border border-border bg-surface p-7"
              >
                <span className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 font-semibold">{step.title}</h3>
                <p className="text-[0.9375rem] text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Not seeing the right role?"
        body="Send us your CV anyway. We read every one, and the right person often arrives before the job description does."
        primary={{ label: "Email us", href: "mailto:orlabstech@gmail.com" }}
        secondary={{ label: "About OrLabs", href: "/about" }}
      />
    </main>
  );
}
