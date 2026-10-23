"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TrustedByEntry = {
  _id: string;
  name: string;
  logoUrl: string;
};

export function Clients() {
  const [clients, setClients] = useState<TrustedByEntry[]>([]);

  useEffect(() => {
    let active = true;

    fetch("/api/trusted-by", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body: unknown = await response.json();
        if (!response.ok) {
          throw new Error(`Trusted by request failed (${response.status}).`);
        }
        if (!Array.isArray(body)) {
          throw new Error("Trusted by returned an unexpected response.");
        }
        return body.filter(
          (entry): entry is TrustedByEntry =>
            typeof entry === "object" &&
            entry !== null &&
            "_id" in entry &&
            typeof entry._id === "string" &&
            "name" in entry &&
            typeof entry.name === "string" &&
            "logoUrl" in entry &&
            typeof entry.logoUrl === "string" &&
            ["http:", "https:"].includes(new URL(entry.logoUrl).protocol),
        );
      })
      .then((entries) => {
        if (active) setClients(entries);
      })
      .catch((error: unknown) => {
        if (active) {
          console.error("Unable to load Trusted by logos:", error);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      className="border-b border-border bg-surface"
      aria-label="Clients"
    >
      <div className="container-page flex flex-wrap items-center justify-between gap-6 py-9">
        <p
          data-reveal
          className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle"
        >
          Trusted by teams across Rwanda
        </p>
        {clients.length > 0 ? (
          <ul data-reveal-group className="flex flex-wrap gap-4">
          {clients.map((client) => (
            <li
              key={client._id}
              className="flex h-11 w-[132px] items-center justify-center"
            >
              <Image
                src={client.logoUrl}
                alt={client.name}
                width={132}
                height={44}
                unoptimized
                className="max-h-11 w-auto max-w-full object-contain"
              />
            </li>
          ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
