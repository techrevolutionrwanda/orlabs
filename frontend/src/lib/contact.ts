export type FormResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Shared submit logic for the contact forms.
 *
 * The endpoint is configured with `NEXT_PUBLIC_FORM_ENDPOINT`. Until it is set
 * the form reports that it is not connected yet — it never pretends to have
 * sent something.
 */
export async function submitContactForm(
  form: HTMLFormElement,
): Promise<FormResult> {
  const data = new FormData(form);

  // Honeypot — real people never fill this in.
  if (data.get("company_website")) {
    return { ok: true };
  }

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  if (!endpoint) {
    return {
      ok: false,
      message:
        "The contact form isn't connected yet. Set NEXT_PUBLIC_FORM_ENDPOINT to enable submissions.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (!response.ok) throw new Error("Request failed");

    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "Something went wrong. Please try again, or email us at [EMAIL].",
    };
  }
}
