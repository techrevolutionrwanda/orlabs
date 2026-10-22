"use client";

import {
  resourceSlugs,
  resources,
  type FieldDef,
} from "@/src/lib/portal/resources";

import { CmsFieldError } from "./CmsFeedback";
import type { CmsRow } from "./useCms";

/**
 * The fields of a form.
 *
 * Every kind of field knows how to draw itself, so a form of any resource is
 * written once. The name of a field points at the collection it belongs to,
 * and the choices come from the records of that collection.
 */
export function CmsFields({
  fields,
  values,
  errors,
  sources,
  onChange,
}: {
  fields: FieldDef[];
  values: Record<string, string>;
  errors: Record<string, string>;
  sources: Record<string, CmsRow[]>;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="grid gap-6">
      {fields.map((field) => (
        <CmsField
          key={field.name}
          field={field}
          value={values[field.name] ?? ""}
          error={errors[field.name]}
          sources={sources}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

function CmsField({
  field,
  value,
  error,
  sources,
  onChange,
}: {
  field: FieldDef;
  value: string;
  error?: string;
  sources: Record<string, CmsRow[]>;
  onChange: (name: string, value: string) => void;
}) {
  const id = `field-${field.name}`;
  const describedBy =
    [field.help ? `${id}-help` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const invalid = error ? "true" : undefined;

  function control() {
    switch (field.kind) {
      case "textarea":
      case "paragraphs":
        return (
          <textarea
            id={id}
            className="field mt-2 min-h-[120px] py-3"
            rows={field.rows ?? (field.kind === "paragraphs" ? 8 : 4)}
            value={value}
            placeholder={field.placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        );

      case "select":
        return (
          <select
            id={id}
            className="field mt-2"
            value={value}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(field.name, event.target.value)}
          >
            <option value="">—</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "record": {
        const sourceRows = sources[resourceSlugs[field.source as never]] ?? [];
        const source = field.source ? resources[field.source] : null;

        return (
          <select
            id={id}
            className="field mt-2"
            value={value}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(field.name, event.target.value)}
          >
            <option value="">—</option>
            {sourceRows.map((row) => (
              <option key={row.id} value={row.id}>
                {String(row[source?.titleField ?? "name"] ?? row.id)}
              </option>
            ))}
          </select>
        );
      }

      case "number":
        return (
          <input
            id={id}
            className="field mt-2"
            type="number"
            inputMode="numeric"
            min={field.min}
            max={field.max}
            value={value}
            placeholder={field.placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        );

      case "url":
        return (
          <input
            id={id}
            className="field mt-2"
            type="url"
            value={value}
            placeholder={field.placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        );

      case "image":
        return (
          <div className="mt-2 grid gap-3">
            <input
              id={id}
              className="field"
              type="text"
              value={value}
              placeholder={field.placeholder ?? "https://"}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(event) => onChange(field.name, event.target.value)}
            />

            {value.startsWith("http") || value.startsWith("/api/portal/uploads/") ? (
              // A plain picture on purpose: the preview shows whatever the
              // administrator pasted, and `next/image` would refuse an
              // address that is not on the allowlist.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt=""
                className="h-24 w-auto rounded-[12px] border border-border bg-chip object-contain"
              />
            ) : null}
          </div>
        );

      default:
        return (
          <input
            id={id}
            className="field mt-2"
            type="text"
            value={value}
            placeholder={field.placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        );
    }
  }

  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {field.label}
        {field.required ? (
          <span className="text-ink-subtle" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>

      {control()}

      {field.help ? (
        <p className="field-help" id={`${id}-help`}>
          {field.help}
        </p>
      ) : null}

      {error ? (
        // A block of its own, not a paragraph: the message below is already
        // a paragraph, and a paragraph may not sit inside another one.
        <div id={`${id}-error`}>
          <CmsFieldError message={error} />
        </div>
      ) : null}
    </div>
  );
}
