"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  cmsPath,
  resourceSlugs,
  type ResourceDef,
} from "@/src/lib/portal/resources";

import { CmsDeleteButton } from "./CmsDeleteButton";
import { CmsError, CmsNotice } from "./CmsFeedback";
import { CmsFields } from "./CmsFields";
import { useCmsSources, type CmsRow } from "./useCms";
import { toApiValues, toFormValues } from "./values";

/**
 * One record, and the form that changes it.
 *
 * The same screen adds a record and changes one. What it shows comes from
 * the description of the resource, so every collection is edited the same
 * way and the checks stay in one place.
 */
export function CmsRecord({
  definition,
  record,
}: {
  definition: ResourceDef;
  record: CmsRow | null;
}) {
  const slug = resourceSlugs[definition.key];

  // The form starts from the record it is about. The key makes sure it
  // starts again when another record is opened.
  return (
    <CmsForm
      key={record?.id ?? "new"}
      definition={definition}
      slug={slug}
      record={record}
    />
  );
}

function CmsForm({
  definition,
  slug,
  record,
}: {
  definition: ResourceDef;
  slug: string;
  record: CmsRow | null;
}) {
  const router = useRouter();

  const [values, setValues] = useState(() =>
    toFormValues(definition.fields, record),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Some fields point at a record of another collection — a task points at a
  // project. The choices come from those records.
  const sourceKey = useMemo(() => {
    const slugs = definition.fields
      .filter((field) => field.kind === "record" && field.source)
      .map(
        (field) => resourceSlugs[field.source as keyof typeof resourceSlugs],
      );

    return [...new Set(slugs)].sort().join("|");
  }, [definition]);

  const sources = useCmsSources(sourceKey);

  async function save() {
    setSaving(true);
    setErrors({});
    setMessage("");
    setSaved(false);

    try {
      const response = await fetch(
        record ? `/api/portal/${slug}/${record.id}` : `/api/portal/${slug}`,
        {
          method: record ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toApiValues(definition.fields, values)),
        },
      );

      const answer = (await response.json().catch(() => null)) as {
        record?: CmsRow;
        errors?: { field: string; message: string }[];
        error?: string;
      } | null;

      if (!response.ok) {
        if (answer?.errors?.length) {
          const fieldErrors: Record<string, string> = {};

          for (const entry of answer.errors) {
            fieldErrors[entry.field] = entry.message;
          }

          setErrors(fieldErrors);
          setMessage("Some fields need another look.");
        } else {
          setMessage(answer?.error ?? "The record could not be saved.");
        }

        return;
      }

      if (!record) {
        router.push(cmsPath(definition.key, answer?.record?.id));
        return;
      }

      setSaved(true);
    } catch (failure) {
      setMessage(
        failure instanceof Error
          ? failure.message
          : "The record could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-8">
      <form
        className="grid gap-6 rounded-card border border-border bg-surface p-6"
        onSubmit={(event) => {
          event.preventDefault();
          void save();
        }}
      >
        <CmsFields
          fields={definition.fields}
          values={values}
          errors={errors}
          sources={sources}
          onChange={(name, value) =>
            setValues((current) => ({ ...current, [name]: value }))
          }
        />

        {message ? <CmsError message={message} /> : null}
        {saved ? <CmsNotice>The record is saved.</CmsNotice> : null}

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>

          <Link href={cmsPath(definition.key)} className="btn btn-quiet">
            Back to the list
          </Link>
        </div>
      </form>

      {record ? (
        <section className="grid gap-4 border-t border-border pt-8">
          <div>
            <h2 className="text-h3 font-semibold">Remove this record</h2>
            <p className="mt-2 text-[0.9375rem] text-ink-muted">
              A record other records point at is not removed straight away —
              the portal says what depends on it first.
            </p>
          </div>

          <CmsDeleteButton
            slug={slug}
            id={record.id}
            onRemoved={() => router.push(cmsPath(definition.key))}
          />
        </section>
      ) : null}
    </div>
  );
}
