import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { getProject, projects } from "@/src/content/projects";
import { RevealController } from "@/src/components/site/RevealController";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// The page reads `params` while rendering, so a navigation into it is allowed
// to block on the server instead of being validated as an instant navigation.
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Case study not found | OrLabs" };
  }

  return {
    title: `${project.name} — ${project.result} | OrLabs`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero eyebrow="Case study" title={`${project.name} — ${project.result}`}>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
          <Link href="/work" className="btn btn-ghost">
            All work
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <div
            data-reveal
            className="flex aspect-[16/8] items-center justify-center rounded-[18px] border border-dashed border-[#c3cad5] text-sm text-ink-subtle"
          >
            [PROJECT SCREENSHOT]
          </div>
        </div>
      </section>

      <section className="section bg-chip">
        <div data-reveal-group className="container-page grid gap-10 lg:grid-cols-3">
          {[
            { label: "Problem", body: project.problem },
            { label: "Solution", body: project.solution },
            { label: "Result", body: project.outcome },
          ].map((block) => (
            <article
              key={block.label}
              className="motion-lift grid content-start gap-3 rounded-card border border-border bg-surface p-7"
            >
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-teal-text">
                {block.label}
              </p>
              <p className="text-[0.9375rem] text-ink-muted">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <p className="eyebrow">Tech used</p>
            <h2 className="mt-3 text-h2">What it runs on.</h2>
          </div>
          <ul
            data-reveal-group
            className="flex list-none flex-wrap gap-3 p-0"
          >
            {project.stack.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="rounded-full border border-border bg-surface px-4 py-2 text-[0.9375rem] text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-[clamp(4rem,8vw,6rem)]">
        <div className="container-page">
          <figure
            data-reveal
            className="m-0 flex flex-col justify-between gap-6 rounded-panel bg-gold p-9 text-navy"
          >
            <svg
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 18v-5a6 6 0 0 1 6-6v3a3 3 0 0 0-3 3h3v5H4zm10 0v-5a6 6 0 0 1 6-6v3a3 3 0 0 0-3 3h3v5h-6z" />
            </svg>
            <blockquote className="m-0 font-display text-[1.375rem] font-semibold leading-[1.4]">
              {project.quote}
            </blockquote>
            <figcaption>
              <strong>{project.quoteName}</strong> · {project.quoteRole}
            </figcaption>
          </figure>
        </div>
      </section>

      <CtaBand
        title="Have an idea? Let’s bring it to light."
        body="Tell us what you are building. We will reply within one working day with next steps."
        secondary={{ label: "See our work", href: "/work" }}
      />
    </main>
  );
}
