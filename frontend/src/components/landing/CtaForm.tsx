"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function CtaForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — real people never fill this in.
    if (data.get("company_website")) {
      setStatus("success");
      setMessage("Thanks — we'll reply within one working day.");
      form.reset();
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (!endpoint) {
      setStatus("error");
      setMessage(
        "The contact form isn't connected yet. Set NEXT_PUBLIC_FORM_ENDPOINT to enable submissions.",
      );
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setMessage("Thanks — we'll reply within one working day.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again, or email us at [EMAIL].");
    }
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
          {status === "submitting" ? "Sending…" : "Start a project"}
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
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
