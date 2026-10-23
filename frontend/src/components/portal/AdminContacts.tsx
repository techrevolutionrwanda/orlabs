"use client";

import { useEffect, useState } from "react";

type Contact = {
  _id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  createdAt: string;
};

function isContact(value: unknown): value is Contact {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    typeof value._id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "email" in value &&
    typeof value.email === "string" &&
    "company" in value &&
    typeof value.company === "string" &&
    "service" in value &&
    typeof value.service === "string" &&
    "message" in value &&
    typeof value.message === "string" &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/portal/contacts", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          const message =
            typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
              ? body.message
              : `Request failed (${response.status}).`;
          throw new Error(message);
        }
        if (!Array.isArray(body) || !body.every(isContact)) {
          throw new Error("The contacts service returned invalid data.");
        }
        return body;
      })
      .then((data) => {
        if (active) setContacts(data);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load contact requests.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section aria-labelledby="contacts-heading">
      <div className="mb-6">
        <p className="eyebrow">Administration</p>
        <h1 id="contacts-heading" className="mt-3 text-h2">
          Contacts
        </h1>
        <p className="mt-3 text-ink-muted">
          Messages submitted through the website contact form.
        </p>
      </div>

      {loading ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          Loading contact requests…
        </p>
      ) : error ? (
        <p
          className="rounded-card border border-border bg-surface p-6 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : contacts.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-6 text-ink-muted">
          No contact requests yet.
        </p>
      ) : (
        <ul className="grid list-none gap-4 p-0">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="grid gap-4 rounded-card border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-navy">
                    {contact.name}
                  </h2>
                  <a
                    className="text-sm text-teal-text underline decoration-1 underline-offset-4"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </div>
                <time
                  className="text-sm text-ink-subtle"
                  dateTime={contact.createdAt}
                >
                  {formatDate(contact.createdAt)}
                </time>
              </div>
              <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <dt className="inline text-ink-subtle">Company: </dt>
                  <dd className="inline text-ink">
                    {contact.company || "Not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="inline text-ink-subtle">Service: </dt>
                  <dd className="inline text-ink">{contact.service}</dd>
                </div>
              </dl>
              <p className="whitespace-pre-wrap text-[0.9375rem] text-ink-muted">
                {contact.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
