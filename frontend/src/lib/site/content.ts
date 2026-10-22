import { cacheTag } from "next/cache";

import type {
  CareerRole,
  ClientLogo,
  ContactChannel,
  IndustryItem,
  LabNote,
  PublicTeamMember,
  PublishState,
  ServiceItem,
  SocialLink,
  WorkItem,
} from "@/src/data/portal/types";
import { readPortalData } from "@/src/lib/portal/db";
import { resources } from "@/src/lib/portal/resources";

/**
 * The content the public website shows.
 *
 * The portal keeps the content of the website in its store, and the website
 * reads it from here. Every read is cached under the tag of the collection it
 * comes from, so a record saved in the portal refreshes the page that shows
 * it: the portal writes the record and revalidates the tag, and the page is
 * built again the next time it is asked for.
 *
 * Only published records are handed out. A draft that is still being written
 * never reaches the website.
 */

/** A record that can be published and put in order. */
type Publishable = {
  state: PublishState;
  order?: number;
};

/**
 * Keeps the published records of a collection, in the order they are shown.
 */
function published<T extends Publishable>(records: T[]): T[] {
  return records
    .filter((record) => record.state === "published")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/* -------------------------------------------------------------------------- */
/* The work — the case studies                                                  */
/* -------------------------------------------------------------------------- */

/** The published case studies, in the order they are shown. */
export async function siteWork(): Promise<WorkItem[]> {
  "use cache";
  cacheTag(resources.work.tag);

  const data = await readPortalData();

  return published(data.work);
}

/** One published case study, or nothing when there is no such one. */
export async function siteWorkBySlug(slug: string): Promise<WorkItem | null> {
  "use cache";
  cacheTag(resources.work.tag);

  const work = await siteWork();

  return work.find((item) => item.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* The services                                                                */
/* -------------------------------------------------------------------------- */

/** The published services, in the order they are shown. */
export async function siteServices(): Promise<ServiceItem[]> {
  "use cache";
  cacheTag(resources.services.tag);

  const data = await readPortalData();

  return published(data.services);
}

/** One published service, or nothing when there is no such one. */
export async function siteServiceBySlug(
  slug: string,
): Promise<ServiceItem | null> {
  "use cache";
  cacheTag(resources.services.tag);

  const services = await siteServices();

  return services.find((item) => item.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* The industries                                                              */
/* -------------------------------------------------------------------------- */

/** The published industries, in the order they are shown. */
export async function siteIndustries(): Promise<IndustryItem[]> {
  "use cache";
  cacheTag(resources.industries.tag);

  const data = await readPortalData();

  return published(data.industries);
}

/* -------------------------------------------------------------------------- */
/* The labs                                                                    */
/* -------------------------------------------------------------------------- */

/** The published lab notes, newest first as the team orders them. */
export async function siteLabNotes(): Promise<LabNote[]> {
  "use cache";
  cacheTag(resources.labNotes.tag);

  const data = await readPortalData();

  return published(data.labNotes);
}

/** One published lab note, or nothing when there is no such one. */
export async function siteLabNoteBySlug(slug: string): Promise<LabNote | null> {
  "use cache";
  cacheTag(resources.labNotes.tag);

  const notes = await siteLabNotes();

  return notes.find((note) => note.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* The people                                                                  */
/* -------------------------------------------------------------------------- */

/** The published open roles. */
export async function siteRoles(): Promise<CareerRole[]> {
  "use cache";
  cacheTag(resources.roles.tag);

  const data = await readPortalData();

  return published(data.roles);
}

/** The published people on the team grid of the about page. */
export async function sitePublicTeam(): Promise<PublicTeamMember[]> {
  "use cache";
  cacheTag(resources.publicTeam.tag);

  const data = await readPortalData();

  return published(data.publicTeam);
}

/* -------------------------------------------------------------------------- */
/* The details every page shares                                               */
/* -------------------------------------------------------------------------- */

/** The published client logos of the “Trusted by” row. */
export async function siteClients(): Promise<ClientLogo[]> {
  "use cache";
  cacheTag(resources.clients.tag);

  const data = await readPortalData();

  return published(data.clients);
}

/** The published contact details — the address, the email, the phone number. */
export async function siteContactChannels(): Promise<ContactChannel[]> {
  "use cache";
  cacheTag(resources.contactChannels.tag);

  const data = await readPortalData();

  return published(data.contactChannels);
}

/** The published social links of the footer. */
export async function siteSocialLinks(): Promise<SocialLink[]> {
  "use cache";
  cacheTag(resources.socialLinks.tag);

  const data = await readPortalData();

  return published(data.socialLinks);
}
