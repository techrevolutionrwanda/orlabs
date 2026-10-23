"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  _id: string;
  projectName: string;
  oneLineSummary: string;
  startDate: string;
  techenologies: string;
  projectScreenshotUrl: string;
  client: {
    clientName: string;
    role: string;
    companyName: string;
  };
};

function isProject(value: unknown): value is Project {
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

function safeImageUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? value : null;
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

export function LabsProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/projects", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok || !Array.isArray(body) || !body.every(isProject)) {
          throw new Error(`Projects request failed (${response.status}).`);
        }
        return body;
      })
      .then((data) => {
        if (active) setProjects(data);
      })
      .catch((requestError: unknown) => {
        console.error("Unable to load Labs projects:", requestError);
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section bg-chip">
      <div className="container-page">
        <div data-reveal className="mb-12 grid max-w-[680px] gap-3">
          <p className="eyebrow">Projects</p>
          <h2 className="text-h2">Experiments put into practice.</h2>
          <p className="text-[1.0625rem] text-ink-muted">
            A selection of projects from the OrLabs team.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-ink-subtle" role="status">
            Loading projects…
          </p>
        ) : error ? (
          <p className="text-sm text-ink-subtle" role="status">
            Projects are temporarily unavailable.
          </p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-ink-subtle">
            Project profiles will appear here soon.
          </p>
        ) : (
          <ul className="grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2">
            {projects.map((project) => {
              const imageUrl = safeImageUrl(project.projectScreenshotUrl);
              const technologies = project.techenologies
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean);

              return (
                <li
                  key={project._id}
                  className="motion-lift grid content-start gap-4 rounded-card border border-border bg-surface p-6 sm:p-7"
                >
                  {imageUrl ? (
                    <div className="relative aspect-[16/7] overflow-hidden rounded-[18px] bg-chip">
                      <Image
                        src={imageUrl}
                        alt={`${project.projectName} screenshot`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/7] items-center justify-center rounded-[18px] bg-chip text-sm text-ink-subtle">
                      Project preview unavailable
                    </div>
                  )}
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-teal-text">
                    Started {formatDate(project.startDate)}
                  </p>
                  <h3 className="text-h3 font-semibold text-navy">
                    {project.projectName}
                  </h3>
                  <p className="text-sm text-ink-subtle">
                    {project.client.clientName} · {project.client.role},{" "}
                    {project.client.companyName}
                  </p>
                  <p className="text-[0.9375rem] text-ink-muted">
                    {project.oneLineSummary}
                  </p>
                  {technologies.length > 0 ? (
                    <ul className="flex list-none flex-wrap gap-2 p-0">
                      {technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full bg-chip px-3 py-1 text-xs text-ink-muted"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
