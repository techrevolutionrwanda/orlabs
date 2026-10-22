import type { FieldDef } from "@/src/lib/portal/resources";

/**
 * The values of a form and the values of a record.
 *
 * While the form is open every field is held as plain text — that is what
 * an input can hold. The API decides what the text means, so the checks live
 * in one place and never drift apart from the form.
 */

/** The value of a field as the form holds it. */
export function toFormValue(field: FieldDef, raw: unknown): string {
  if (Array.isArray(raw)) {
    return field.kind === "paragraphs" ? raw.join("\n") : raw.join(", ");
  }

  if (raw === undefined || raw === null) return "";

  return String(raw);
}

/** The value of a field as the record holds it. */
export function toApiValue(field: FieldDef, raw: string): unknown {
  if (field.kind === "number") {
    const value = Number(raw);

    return Number.isFinite(value) ? value : 0;
  }

  // Lists are sent as text: the API splits them on commas and line breaks.
  return raw;
}

/** The whole record as the form holds it. */
export function toFormValues(
  fields: FieldDef[],
  record: Record<string, unknown> | null,
): Record<string, string> {
  const values: Record<string, string> = {};

  for (const field of fields) {
    values[field.name] = toFormValue(field, record?.[field.name]);
  }

  return values;
}

/** The whole form as the record holds it. */
export function toApiValues(
  fields: FieldDef[],
  values: Record<string, string>,
): Record<string, unknown> {
  const body: Record<string, unknown> = {};

  for (const field of fields) {
    body[field.name] = toApiValue(field, values[field.name] ?? "");
  }

  return body;
}
