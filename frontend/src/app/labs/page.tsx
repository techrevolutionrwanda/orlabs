import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { RevealController } from "@/src/components/site/RevealController";
import { labPosts } from "@/src/content/labs";

export const metadata: Metadata = {
  title: "Labs — Experiments and insights from OrLabs Tech Industries",
  description:
    "Labs is the OrLabs playground: experiments, engineering notes and insights from our team in Kigali, Rwanda.",
};

export default function LabsPage() {
  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="Labs"
        title="Experiments, notes and things we learned."
        lead="Labs is where we try ideas in the open — small experiments, engineering notes and insights from the team in Kigali."
      />

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="Latest"
            title="Nothing published yet."
            lead="The first lab notes are being written. In the meantime, the fastest way to see how we work is to talk to an engineer."
          />

          <ul
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-1 gap-6 p-0"
          >
            {labPosts.map((post, index) => (
              <li
                key={post.slug}
                className="grid content-start gap-4 rounded-card border border-border bg-surface p-7"
              >
                <div
                  className="flex aspect-[16/7] items-center justify-center rounded-[18px] border border-dashed border-[#c3cad5] text-sm text-ink-subtle"
                  style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
                >
                  [LAB POST PREVIEW]
                </div>
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-teal-text">
                  {post.date}
                </p>
                <h2 className="text-h3 font-semibold">{post.title}</h2>
                <p className="text-[0.9375rem] text-ink-muted">{post.excerpt}</p>
                <Link href={`/labs/${post.slug}`} className="link-arrow text-teal-text">
                  Read the note
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Something you want us to look at?"
        body="Tell us what you are building. We will reply within one working day with next steps."
        secondary={{ label: "See our work", href: "/work" }}
      />
    </main>
  );
}
