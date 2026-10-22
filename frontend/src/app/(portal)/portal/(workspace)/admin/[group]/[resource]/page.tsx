import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { CmsList } from "@/src/components/portal/cms/CmsList";
import { RevealController } from "@/src/components/site/RevealController";
import {
  portalGroups,
  resourceFromPath,
} from "@/src/lib/portal/resources";

/**
 * The list of the records of one kind.
 *
 * Every collection gets the same screen. The address says which collection
 * it is — the group and the name of the collection — and the description of
 * the resource says what the screen shows.
 */

export async function generateMetadata({
  params,
}: PageProps<"/portal/admin/[group]/[resource]">): Promise<Metadata> {
  const { group, resource } = await params;
  const definition = resourceFromPath(group, resource);

  if (!definition) {
    return { title: "Not found — OrLabs portal" };
  }

  return {
    title: `${definition.title} — OrLabs portal`,
    description: definition.lead,
    robots: { index: false, follow: false },
  };
}

export default async function CmsListPage({
  params,
}: PageProps<"/portal/admin/[group]/[resource]">) {
  const { group, resource } = await params;
  const definition = resourceFromPath(group, resource);

  if (!definition) notFound();

  const area = portalGroups.find((entry) => entry.key === definition.group);

  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow={area?.title ?? "Administration"}
        title={definition.title}
        lead={definition.lead}
      />
      <CmsList definition={definition} />
    </>
  );
}
