"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/src/lib/contact";
import { services } from "@/src/content/services";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "min-h-[52px] w-full rounded-[12px] border border-border bg-surface px-4 font-[inherit] text-ink placeholder:text-ink-subtle transition-colors focus:border-border-strong";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("submitting");
    setMessage("");

    const result = await submitContactForm(form);

    if (result.ok) {
      setStatus("success");
      setMessage("Thanks — we'll reply within one working day.");
      form.reset();
      return;
    }

    setStatus("error");
    setMessage(result.message);
  }

  return (
    <form
      className="grid gap-5"
      action="[FORM_ENDPOINT]"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-name">
            Name
          </label>
          <input
            className={fieldClass}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-email">
            Work email
          </label>
          <input
            className={fieldClass}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.rw"
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-company">
            Company
          </label>
          <input
            className={fieldClass}
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Organisation name"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-service">
            Service of interest
          </label>
          <select
            className={fieldClass}
            id="contact-service"
            name="service"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className={`${fieldClass} min-h-[160px] resize-y py-3`}
          id="contact-message"
          name="message"
          rows={6}
          placeholder="What are you building, and what would success look like?"
          required
        />
      </div>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p
          className={`min-h-5 text-sm ${
            status === "success" ? "text-teal-text" : "text-ink-muted"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </form>
  );
}
