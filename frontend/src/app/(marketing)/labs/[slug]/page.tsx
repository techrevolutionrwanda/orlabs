import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { RevealController } from "@/src/components/site/RevealController";
import { siteLabNoteBySlug, siteLabNotes } from "@/src/lib/site/content";

export async function generateStaticParams() {
  // The published notes are known when the site is built, so each one gets a
  // page of its own.
  const notes = await siteLabNotes();

  return notes.map((note) => ({ slug: note.slug }));
}

// The page reads `params` while rendering, so a navigation into it is allowed
// to block on the server instead of being validated as an instant navigation.
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/labs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await siteLabNoteBySlug(slug);

  if (!post) {
    return { title: "Lab note not found | OrLabs" };
  }

  return {
    title: `${post.title} — Labs | OrLabs`,
    description: post.excerpt,
  };
}

export default async function LabPostPage({
  params,
}: PageProps<"/labs/[slug]">) {
  const { slug } = await params;
  const post = await siteLabNoteBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero eyebrow="Labs" title={post.title}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <p className="text-[0.9375rem] text-on-navy-muted">{post.date}</p>
          <ul className="flex list-none flex-wrap gap-2.5 p-0">
            {post.tags.map((tag, index) => (
              <li
                key={`${tag}-${index}`}
                className="rounded-full border border-navy-line px-3.5 py-1.5 text-[0.8125rem] text-on-navy-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <p className="eyebrow">In short</p>
            <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-muted">
              {post.excerpt}
            </p>
            <Link href="/labs" className="link-arrow mt-6 inline-flex text-teal-text">
              All lab notes
            </Link>
          </div>

          <div data-reveal-group className="grid content-start gap-6">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-[1.7] text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to build something like this?"
        body="Tell us what you are building. We will reply within one working day with next steps."
        secondary={{ label: "See our work", href: "/work" }}
      />
    </main>
  );
}
