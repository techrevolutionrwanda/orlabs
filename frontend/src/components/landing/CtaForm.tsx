"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/src/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function CtaForm() {
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
    <form className="grid" action="[FORM_ENDPOINT]" method="post" onSubmit={handleSubmit}>
      <label
        className="mb-2.5 block text-sm font-medium text-[#dce3ec]"
        htmlFor="cta-email"
      >
        Work email
      </label>
      <div className="flex flex-wrap gap-2.5">
        <input
          className="min-h-[52px] flex-1 basis-[220px] rounded-full border border-[#4a6488] bg-[#102a4a] px-5 font-[inherit] text-white placeholder:text-[#8fa0b6]"
          id="cta-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.rw"
          required
        />
        <button
          className="btn btn-primary min-h-[52px]"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span className="ml-2.5">Sending…</span>
            </>
          ) : (
            "Start a project"
          )}
        </button>
      </div>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          id="company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p
        className={`mt-3 min-h-5 text-sm ${
          status === "success" ? "text-gold" : "text-white"
        } ${message ? "status-in" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
