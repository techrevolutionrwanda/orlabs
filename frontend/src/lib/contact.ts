
export async function submitContactForm(form: HTMLFormElement) {
  const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  if (!endpoint || !accessKey) {
    return {
      ok: false,
      message: "The contact form is not configured yet.",
    };
  }

  if (!/^https:\/\/api\.web3forms\.com\/submit$/.test(endpoint)) {
    return {
      ok: false,
      message: "The contact form endpoint is invalid.",
    };
  }

  const formData = new FormData(form);

  // Prevent bots from submitting the hidden honeypot field.
  if (formData.get("company_website")) {
    return { ok: true, message: "" };
  }

  formData.set("access_key", accessKey);
  formData.set("subject", "New project inquiry");
  formData.set("from_name", "Website Contact Form");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      return {
        ok: false,
        message:
          "We couldn't send your request. Please try again.",
      };
    }

    return { ok: true, message: "" };
  } catch {
    return {
      ok: false,
      message:
        "A network error occurred. Please try again.",
    };
  }
}
