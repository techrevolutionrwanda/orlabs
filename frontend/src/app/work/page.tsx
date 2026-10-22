import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { projects } from "@/src/content/projects";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Work — Case studies from OrLabs Tech Industries",
  description:
    "Selected projects built by OrLabs Tech Industries in Kigali: the problem we were hired to solve, what we shipped, and what changed afterwards.",
};

export default function WorkPage() {
  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="Our work"
        title="Proof, not promises."
        lead="Case studies from the teams we build with. Each one starts with the problem, shows what we shipped and ends with what changed."
      />

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="Case studies"
            title="Selected projects."
            lead="More case studies will be published as they are approved for release."
          />

          <ul
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2"
          >
            {projects.map((project) => (
              <li key={project.slug}>
                <article className="grid h-full content-start gap-4 rounded-card border border-border bg-surface p-8">
                  <div className="flex aspect-[16/9] items-center justify-center rounded-[14px] border border-dashed border-[#c3cad5] text-sm text-ink-subtle">
                    [PROJECT SCREENSHOT]
                  </div>
                  <h3 className="text-2xl font-semibold">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-navy no-underline transition-colors hover:text-teal-text"
                    >
                      {project.name} — {project.result}
                    </Link>
                  </h3>
                  <p className="text-ink-muted">{project.summary}</p>
                  <Link
                    href={`/work/${project.slug}`}
                    className="link-arrow text-navy no-underline"
                  >
                    Read the case study →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Want a result like this?"
        body="Tell us what you are building. We will reply within one working day with next steps."
        secondary={{ label: "See our services", href: "/services" }}
      />
    </main>
  );
}
