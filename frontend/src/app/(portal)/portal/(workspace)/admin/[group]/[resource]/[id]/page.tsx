import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { CmsRecord } from "@/src/components/portal/cms/CmsRecord";
import { RevealController } from "@/src/components/site/RevealController";
import { getRecord } from "@/src/data/portal/store";
import {
  portalGroups,
  resourceFromPath,
} from "@/src/lib/portal/resources";

/**
 * Changing a record.
 *
 * The record is read on the server, so the form is filled in the moment the
 * page arrives — and an address that points at nothing is a page not
 * found, not an empty form.
 */

export async function generateMetadata({
  params,
}: PageProps<"/portal/admin/[group]/[resource]/[id]">): Promise<Metadata> {
  const { group, resource } = await params;
  const definition = resourceFromPath(group, resource);

  if (!definition) {
    return { title: "Not found — OrLabs portal" };
  }

  return {
    title: `Edit ${definition.singular} — OrLabs portal`,
    description: definition.lead,
    robots: { index: false, follow: false },
  };
}

export default async function CmsEditPage({
  params,
}: PageProps<"/portal/admin/[group]/[resource]/[id]">) {
  const { group, resource, id } = await params;
  const definition = resourceFromPath(group, resource);

  if (!definition) notFound();

  const record = await getRecord(definition.key, id);

  if (!record) notFound();

  const area = portalGroups.find((entry) => entry.key === definition.group);

  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow={area?.title ?? "Administration"}
        title={`Edit ${definition.singular}`}
        lead={definition.lead}
      />
      <CmsRecord definition={definition} record={record} />
    </>
  );
}
