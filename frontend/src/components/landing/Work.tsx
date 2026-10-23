"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type PublicProject = {
  _id: string;
  projectName: string;
  oneLineSummary: string;
  startDate: string;
  targetDate: string;
  techenologies: string;
  client: {
    clientName: string;
    role: string;
    companyName: string;
  };
  projectScreenshotUrl: string;
};

const AUTOPLAY_MS = 5000;

function isPublicProject(value: unknown): value is PublicProject {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "projectName" in value &&
    typeof value.projectName === "string" &&
    "oneLineSummary" in value &&
    typeof value.oneLineSummary === "string" &&
    "startDate" in value &&
    typeof value.startDate === "string" &&
    "targetDate" in value &&
    typeof value.targetDate === "string" &&
    "techenologies" in value &&
    typeof value.techenologies === "string" &&
    "projectScreenshotUrl" in value &&
    typeof value.projectScreenshotUrl === "string" &&
    "client" in value &&
    typeof value.client === "object" &&
    value.client !== null &&
    "clientName" in value.client &&
    typeof value.client.clientName === "string" &&
    "role" in value.client &&
    typeof value.client.role === "string" &&
    "companyName" in value.client &&
    typeof value.client.companyName === "string"
  );
}

function responseMessage(body: unknown, fallback: string): string {
  if (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof body.message === "string"
  ) {
    return body.message;
  }
  return fallback;
}

function safeImageUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
}

function durationLabel(start: string, end: string): string | null {
  const a = new Date(start);
  const b = new Date(end);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime()) || b < a) {
    return null;
  }
  const months = Math.max(
    1,
    Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 30.4)),
  );
  return months === 1 ? "1 month" : `${months} months`;
}

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Work() {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/projects", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(
            responseMessage(
              body,
              `Projects request failed (${response.status}).`,
            ),
          );
        }
        if (!Array.isArray(body) || !body.every(isPublicProject)) {
          throw new Error("Projects returned an unexpected response.");
        }
        return body;
      })
      .then((data) => {
        if (active) setProjects(data);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        const message =
          requestError instanceof Error
            ? requestError.message
            : "Unable to load projects.";
        console.error("Unable to load public projects:", requestError);
        setError(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Respect "reduce motion": no autoplay and no slide animation.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const count = projects.length;

  const goNext = useCallback(() => {
    if (count < 2) return;
    setDirection("next");
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count < 2) return;
    setDirection("prev");
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goTo = useCallback(
    (target: number) => {
      if (target === index) return;
      setDirection(target > index ? "next" : "prev");
      setIndex(target);
    },
    [index],
  );

  const autoplay = count > 1 && !reduceMotion && !userPaused;
  const barPaused = hoverPaused;

  const project = projects[index];
  const screenshotUrl = project
    ? safeImageUrl(project.projectScreenshotUrl)
    : null;
  const technologies = project
    ? project.techenologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean)
    : [];
  const duration = project
    ? durationLabel(project.startDate, project.targetDate)
    : null;

  return (
    <section
      className="section relative overflow-hidden"
      id="work"
      aria-labelledby="work-heading"
    >
      {/* Slide + progress animations (kept local to this component) */}
      <style>{`
        @keyframes work-in-next {
          from { opacity: 0; transform: translateX(64px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes work-in-prev {
          from { opacity: 0; transform: translateX(-64px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes work-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .work-slide-next { animation: work-in-next 600ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .work-slide-prev { animation: work-in-prev 600ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .work-progress   { transform-origin: left; animation: work-progress ${AUTOPLAY_MS}ms linear forwards; }
        @media (prefers-reduced-motion: reduce) {
          .work-slide-next, .work-slide-prev, .work-progress { animation: none; }
        }
      `}</style>

      {/* Soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-navy/5 blur-3xl"
      />

      <div className="container-page relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading" className="mt-3 text-h2">
              Projects built with our clients
            </h2>
            <p className="mt-3 text-ink-muted">
              Real products, shipped for real teams. Take a look at what we have
              delivered.
            </p>
          </div>

          {count > 1 ? (
            <div className="flex items-center gap-3">
              <span
                className="mr-2 hidden text-sm tabular-nums text-ink-subtle sm:inline"
                aria-hidden="true"
              >
                <span className="text-lg font-semibold text-navy">
                  {pad(index + 1)}
                </span>{" "}
                / {pad(count)}
              </span>
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Resume auto-play" : "Pause auto-play"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-navy transition hover:border-navy hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                {userPaused ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-navy transition hover:border-navy hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div
            className="grid gap-6 rounded-[24px] border border-border bg-surface p-6 sm:p-8 lg:grid-cols-5"
            aria-busy="true"
          >
            <div className="aspect-[16/10] animate-pulse rounded-[14px] bg-chip lg:col-span-3" />
            <div className="space-y-4 lg:col-span-2">
              <div className="h-8 w-3/4 animate-pulse rounded bg-chip" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-chip" />
              <div className="h-20 animate-pulse rounded bg-chip" />
            </div>
          </div>
        ) : error ? (
          <p
            className="rounded-card border border-border bg-surface p-6 text-ink-muted"
            role="status"
          >
            Project examples are temporarily unavailable.
          </p>
        ) : !project ? (
          <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
            Project examples will appear here soon.
          </p>
        ) : (
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            onFocus={() => setHoverPaused(true)}
            onBlur={() => setHoverPaused(false)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") goNext();
              if (event.key === "ArrowLeft") goPrev();
            }}
            onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchStartX === null) return;
              const delta = event.changedTouches[0].clientX - touchStartX;
              if (Math.abs(delta) > 50) {
                if (delta < 0) goNext();
                else goPrev();
              }
              setTouchStartX(null);
            }}
            className="rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_24px_60px_-30px_rgba(10,25,60,0.35)]">
              {/* Auto-play progress bar. When it finishes, the next project slides in. */}
              {autoplay ? (
                <div className="absolute inset-x-0 top-0 z-10 h-1 bg-chip">
                  <div
                    key={`${project._id}-${index}`}
                    className="work-progress h-full bg-navy"
                    style={{
                      animationPlayState: barPaused ? "paused" : "running",
                    }}
                    onAnimationEnd={goNext}
                  />
                </div>
              ) : null}

              <article
                key={project._id}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${project.projectName}`}
                aria-live={autoplay ? "off" : "polite"}
                className={`grid gap-8 p-6 sm:p-10 lg:grid-cols-5 lg:items-center lg:gap-12 ${
                  direction === "next" ? "work-slide-next" : "work-slide-prev"
                }`}
              >
                {/* Screenshot in a browser frame */}
                <div className="lg:col-span-3">
                  <div className="overflow-hidden rounded-[16px] border border-border bg-chip shadow-[0_18px_40px_-24px_rgba(10,25,60,0.45)]">
                    <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 truncate rounded-full bg-chip px-3 py-0.5 text-[11px] text-ink-subtle">
                        {project.client.companyName
                          .toLowerCase()
                          .replace(/\s+/g, "")}
                        .com
                      </span>
                    </div>
                    {screenshotUrl ? (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={screenshotUrl}
                          alt={`${project.projectName} project screenshot`}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex aspect-[16/10] items-center justify-center text-sm text-ink-subtle"
                        aria-label="Project screenshot unavailable"
                      >
                        Preview unavailable
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-5 lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-navy px-3 py-1 text-xs font-medium text-white">
                      Case study {pad(index + 1)}
                    </span>
                    {duration ? (
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted">
                        Delivered in {duration}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h3 className="text-3xl font-semibold leading-tight text-navy">
                      {project.projectName}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {project.oneLineSummary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-[14px] bg-chip p-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
                    >
                      {initials(project.client.clientName)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {project.client.clientName}
                      </p>
                      <p className="truncate text-xs text-ink-subtle">
                        {project.client.role}, {project.client.companyName}
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-ink-subtle">
                        Started
                      </dt>
                      <dd className="mt-1 font-medium text-ink">
                        {formatDate(project.startDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-ink-subtle">
                        Target
                      </dt>
                      <dd className="mt-1 font-medium text-ink">
                        {formatDate(project.targetDate)}
                      </dd>
                    </div>
                  </dl>

                  {technologies.length > 0 ? (
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wide text-ink-subtle">
                        Built with
                      </p>
                      <ul className="flex list-none flex-wrap gap-2 p-0">
                        {technologies.map((technology) => (
                          <li
                            key={technology}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>

            {/* Pagination dots */}
            {count > 1 ? (
              <div
                className="mt-6 flex items-center justify-center gap-2"
                role="tablist"
                aria-label="Choose project"
              >
                {projects.map((item, i) => (
                  <button
                    key={item._id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show project ${i + 1}: ${item.projectName}`}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                      i === index
                        ? "w-8 bg-navy"
                        : "w-2.5 bg-border hover:bg-ink-subtle"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
