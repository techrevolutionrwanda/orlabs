import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { CmsRecord } from "@/src/components/portal/cms/CmsRecord";
import { RevealController } from "@/src/components/site/RevealController";
import {
  portalGroups,
  resourceFromPath,
} from "@/src/lib/portal/resources";

/**
 * Adding a record.
 *
 * The form is the same one the change screen uses, with nothing filled in
 * yet.
 */

export async function generateMetadata({
  params,
}: PageProps<"/portal/admin/[group]/[resource]/new">): Promise<Metadata> {
  const { group, resource } = await params;
  const definition = resourceFromPath(group, resource);

  if (!definition) {
    return { title: "Not found — OrLabs portal" };
  }

  return {
    title: `New ${definition.singular} — OrLabs portal`,
    description: definition.lead,
    robots: { index: false, follow: false },
  };
}

export default async function CmsNewPage({
  params,
}: PageProps<"/portal/admin/[group]/[resource]/new">) {
  const { group, resource } = await params;
  const definition = resourceFromPath(group, resource);

  if (!definition) notFound();

  const area = portalGroups.find((entry) => entry.key === definition.group);

  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow={area?.title ?? "Administration"}
        title={`New ${definition.singular}`}
        lead={definition.lead}
      />
      <CmsRecord definition={definition} record={null} />
    </>
  );
}
