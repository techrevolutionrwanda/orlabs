import { resources, type ResourceDef, type ResourceKey } from "./resources";

/**
 * Checking what a form sends before it is saved.
 *
 * The rules come from the description of the resource, so a form and its
 * checks never drift apart. Every mistake is reported with the field it
 * belongs to, so a form can put the message next to the field.
 */

export type FieldError = {
  field: string;
  message: string;
};

/**
 * A value that is still a placeholder.
 *
 * `[EMAIL]` and `mailto:[EMAIL]` are what the site shows until the team
 * knows the real thing. They are allowed through every check — they are the
 * answer, not a mistake.
 */
export function containsPlaceholder(value: unknown): boolean {
  return typeof value === "string" && /\[[^\]]*\]/.test(value);
}

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function asList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => asText(entry)).filter((entry) => entry !== "");
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((entry) => entry.trim())
      .filter((entry) => entry !== "");
  }

  return [];
}

function isAllowedLink(value: string): boolean {
  if (value === "") return true;
  if (containsPlaceholder(value)) return true;

  return (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("/")
  );
}

function isAllowedImage(value: string): boolean {
  if (value === "") return true;
  if (containsPlaceholder(value)) return true;

  return (
    value.startsWith("/api/portal/uploads/") ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  );
}

/**
 * Checks a record and works out what should be written.
 *
 * Only the fields the resource knows about are looked at, so nothing else a
 * request carries is ever written to the store.
 */
export function validateRecord(
  definition: ResourceDef,
  body: Record<string, unknown>,
  mode: "create" | "update",
): { values: Record<string, unknown>; errors: FieldError[] } {
  const values: Record<string, unknown> = {};
  const errors: FieldError[] = [];

  for (const field of definition.fields) {
    const given = body[field.name];

    if (given === undefined) {
      if (mode === "create" && field.required) {
        errors.push({ field: field.name, message: "This field is needed." });
      }

      continue;
    }

    switch (field.kind) {
      case "number": {
        const number = typeof given === "number" ? given : Number(asText(given));

        if (!Number.isFinite(number)) {
          errors.push({ field: field.name, message: "Write a number." });
          break;
        }

        if (field.min !== undefined && number < field.min) {
          errors.push({
            field: field.name,
            message: `The smallest number is ${field.min}.`,
          });
          break;
        }

        if (field.max !== undefined && number > field.max) {
          errors.push({
            field: field.name,
            message: `The largest number is ${field.max}.`,
          });
          break;
        }

        values[field.name] = number;
        break;
      }

      case "select": {
        const value = asText(given);
        const allowed = (field.options ?? []).map((option) => option.value);

        if (value === "") {
          if (field.required) {
            errors.push({ field: field.name, message: "Choose one." });
          }
          break;
        }

        if (!allowed.includes(value)) {
          errors.push({
            field: field.name,
            message: `Choose one of: ${allowed.join(", ")}.`,
          });
          break;
        }

        values[field.name] = value;
        break;
      }

      case "tags":
      case "paragraphs": {
        const list = asList(given);

        if (field.required && list.length === 0) {
          errors.push({
            field: field.name,
            message: "Add at least one entry.",
          });
          break;
        }

        values[field.name] = list;
        break;
      }

      case "url": {
        const value = asText(given);

        if (field.required && value === "") {
          errors.push({ field: field.name, message: "This field is needed." });
          break;
        }

        if (!isAllowedLink(value)) {
          errors.push({
            field: field.name,
            message: "Write a full address, starting with https://",
          });
          break;
        }

        values[field.name] = value;
        break;
      }

      case "image": {
        const value = asText(given);

        if (!isAllowedImage(value)) {
          errors.push({
            field: field.name,
            message: "Upload an image, or write a full address.",
          });
          break;
        }

        values[field.name] = value;
        break;
      }

      case "record": {
        const value = asText(given);

        if (field.required && value === "") {
          errors.push({ field: field.name, message: "Choose one." });
          break;
        }

        values[field.name] = value;
        break;
      }

      default: {
        const value = asText(given);

        if (field.required && value === "") {
          errors.push({ field: field.name, message: "This field is needed." });
          break;
        }

        values[field.name] = value;
      }
    }
  }

  return { values, errors };
}

/**
 * The fields a worker is allowed to change.
 *
 * A worker moves tasks along and closes tickets. Everything else belongs to
 * an administrator.
 */
export const workerWritable: Partial<Record<ResourceKey, string[]>> = {
  tasks: ["status"],
  tickets: ["status"],
};

/**
 * Whether a signed-in worker may change these fields.
 */
export function workerMayWrite(
  key: ResourceKey,
  fields: string[],
): boolean {
  const allowed = workerWritable[key];

  if (!allowed) return false;

  return fields.every((field) => allowed.includes(field));
}

/**
 * The resources a worker may change at all.
 */
export function workerMayTouch(key: ResourceKey): boolean {
  return key in workerWritable;
}

/**
 * The slug of a resource, if it is one the portal knows.
 */
export function resourceFor(key: string): ResourceDef | null {
  return (resources as Record<string, ResourceDef>)[key] ?? null;
}
