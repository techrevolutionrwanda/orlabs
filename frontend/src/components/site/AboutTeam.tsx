"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionHead } from "./SectionHead";

type Founder = {
  _id: string;
  name: string;
  jobTitle: string;
  imageUrl?: string;
};

function isFounder(value: unknown): value is Founder {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "jobTitle" in value &&
    typeof value.jobTitle === "string" &&
    (!("imageUrl" in value) ||
      value.imageUrl === undefined ||
      typeof value.imageUrl === "string")
  );
}

function safeImageUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}

export function AboutTeam() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/founders", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(`Team request failed (${response.status}).`);
        }
        if (!Array.isArray(body) || !body.every(isFounder)) {
          throw new Error("Team returned an unexpected response.");
        }
        return body;
      })
      .then((data) => {
        if (active) setFounders(data);
      })
      .catch((error: unknown) => {
        console.error("Unable to load About page team:", error);
        if (active) setFailed(true);
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
        <SectionHead
          eyebrow="The team"
          title="Engineers in Kigali."
          lead="The people behind the work."
        />

        {loading ? (
          <p className="text-sm text-ink-subtle" role="status">
            Loading team…
          </p>
        ) : failed ? (
          <p className="text-sm text-ink-subtle" role="status">
            Team information is temporarily unavailable.
          </p>
        ) : founders.length === 0 ? (
          <p className="text-sm text-ink-subtle">
            Team profiles will appear here soon.
          </p>
        ) : (
          <ul
            data-reveal-group
            className="grid list-none grid-cols-2 gap-5 p-0 lg:grid-cols-4"
          >
            {founders.map((founder) => {
              const imageUrl = safeImageUrl(founder.imageUrl);
              return (
                <li
                  key={founder._id}
                  className="motion-lift grid content-start gap-3 rounded-card border border-border bg-surface p-5"
                >
                  {imageUrl ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-chip">
                      <Image
                        src={imageUrl}
                        alt={founder.name}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="grid aspect-[4/3] w-full place-items-center rounded-xl bg-chip text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle"
                    >
                      {founder.name
                        .split(/\s+/)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
                  <span className="text-[1.0625rem] font-semibold text-navy">
                    {founder.name}
                  </span>
                  <span className="text-[0.9375rem] text-ink-subtle">
                    {founder.jobTitle}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
