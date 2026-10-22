import type { PortalData } from "@/src/data/portal/types";

/**
 * What the portal knows how to manage.
 *
 * Every record the site holds is described here once: the fields it has, the
 * columns its list shows, where it belongs in the navigation and whether it
 * carries a publish state. The API, the forms and the validation all read
 * this description, so a new kind of record is one entry, not three screens.
 */

export const resourceKeys = [
  "projects",
  "tasks",
  "tickets",
  "team",
  "work",
  "services",
  "industries",
  "labNotes",
  "roles",
  "publicTeam",
  "clients",
  "contactChannels",
  "socialLinks",
] as const;

export type ResourceKey = (typeof resourceKeys)[number];

export type PortalGroup = "delivery" | "website" | "people" | "site";

export type GroupDef = {
  key: PortalGroup;
  title: string;
  note: string;
};

export const portalGroups: GroupDef[] = [
  {
    key: "delivery",
    title: "Delivery",
    note: "The engagements the studio is running.",
  },
  {
    key: "website",
    title: "Website",
    note: "What the public website shows.",
  },
  {
    key: "people",
    title: "People",
    note: "The team behind the work.",
  },
  {
    key: "site",
    title: "Site",
    note: "The details every page shares.",
  },
];

/** The kinds of field a form can hold. */
export type FieldKind =
  | "text"
  | "textarea"
  | "paragraphs"
  | "number"
  | "select"
  | "tags"
  | "image"
  | "url"
  | "record";

export type FieldDef = {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  /** For `record` fields — the collection the id points at. */
  source?: ResourceKey;
  rows?: number;
  min?: number;
  max?: number;
};

/** How a list column is drawn. */
export type ColumnKind = "text" | "state" | "status" | "number" | "record" | "tags";

export type ColumnDef = {
  name: string;
  label: string;
  kind?: ColumnKind;
  /** For `record` columns — the collection the id points at. */
  source?: ResourceKey;
};

export type ResourceDef = {
  key: ResourceKey;
  title: string;
  singular: string;
  group: PortalGroup;
  lead: string;
  /** The field that carries the name of the record. */
  titleField: string;
  /** The prefix new records get, e.g. `prj` for `prj-006`. */
  prefix: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  /** Whether the records carry a draft / published state. */
  published: boolean;
  /** Whether the records can be put in order. */
  orderable: boolean;
  /** The cache tag the public pages read this collection under. */
  tag: string;
  icon: string;
};

const publishOptions = [
  { value: "draft", label: "Draft" },
  { value: "in-review", label: "In review" },
  { value: "published", label: "Published" },
];

export const resources: Record<ResourceKey, ResourceDef> = {
  projects: {
    key: "projects",
    title: "Projects",
    singular: "project",
    group: "delivery",
    lead: "Every engagement, the people on it and how far along it is.",
    titleField: "name",
    prefix: "prj",
    fields: [
      { name: "name", label: "Project name", kind: "text", required: true },
      { name: "client", label: "Client", kind: "text", required: true },
      { name: "summary", label: "One-line summary", kind: "textarea", required: true },
      {
        name: "status",
        label: "Status",
        kind: "select",
        required: true,
        options: [
          { value: "planning", label: "Planning" },
          { value: "building", label: "Building" },
          { value: "review", label: "In review" },
          { value: "live", label: "Live" },
          { value: "paused", label: "Paused" },
        ],
      },
      {
        name: "progress",
        label: "Progress",
        kind: "number",
        min: 0,
        max: 100,
        help: "A number between 0 and 100.",
      },
      { name: "stack", label: "Stack", kind: "tags" },
      {
        name: "team",
        label: "Team",
        kind: "tags",
        help: "The id of every team member on the project.",
      },
      { name: "startedOn", label: "Started on", kind: "text", placeholder: "2026-07-06" },
      { name: "targetDate", label: "Target date", kind: "text", placeholder: "2026-11-27" },
    ],
    columns: [
      { name: "name", label: "Project" },
      { name: "client", label: "Client" },
      { name: "status", label: "Status", kind: "status" },
      { name: "progress", label: "Progress", kind: "number" },
      { name: "targetDate", label: "Target" },
    ],
    published: false,
    orderable: true,
    tag: "site:projects",
    icon: "folder",
  },

  tasks: {
    key: "tasks",
    title: "Tasks",
    singular: "task",
    group: "delivery",
    lead: "The work that is on somebody's desk.",
    titleField: "title",
    prefix: "tsk",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      {
        name: "project",
        label: "Project",
        kind: "record",
        source: "projects",
        required: true,
      },
      {
        name: "assignee",
        label: "Assigned to",
        kind: "record",
        source: "team",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        kind: "select",
        required: true,
        options: [
          { value: "todo", label: "To do" },
          { value: "in-progress", label: "In progress" },
          { value: "review", label: "In review" },
          { value: "done", label: "Done" },
        ],
      },
      {
        name: "priority",
        label: "Priority",
        kind: "select",
        options: [
          { value: "low", label: "Low" },
          { value: "normal", label: "Normal" },
          { value: "high", label: "High" },
        ],
      },
      { name: "dueDate", label: "Due date", kind: "text", placeholder: "2026-10-27" },
      { name: "estimate", label: "Estimate", kind: "text", placeholder: "2 days" },
      { name: "note", label: "Note", kind: "textarea" },
    ],
    columns: [
      { name: "title", label: "Task" },
      { name: "project", label: "Project", kind: "record", source: "projects" },
      { name: "assignee", label: "Assigned to", kind: "record", source: "team" },
      { name: "status", label: "Status", kind: "status" },
      { name: "dueDate", label: "Due" },
    ],
    published: false,
    orderable: false,
    tag: "site:tasks",
    icon: "check",
  },

  tickets: {
    key: "tickets",
    title: "Tickets",
    singular: "ticket",
    group: "delivery",
    lead: "The requests that came in and where each one stands.",
    titleField: "subject",
    prefix: "tkt",
    fields: [
      { name: "subject", label: "Subject", kind: "text", required: true },
      { name: "requester", label: "Requester", kind: "text", required: true },
      {
        name: "severity",
        label: "Severity",
        kind: "select",
        required: true,
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ],
      },
      {
        name: "status",
        label: "Status",
        kind: "select",
        required: true,
        options: [
          { value: "open", label: "Open" },
          { value: "waiting", label: "Waiting" },
          { value: "resolved", label: "Resolved" },
        ],
      },
      { name: "channel", label: "Channel", kind: "text", placeholder: "Email" },
      { name: "updatedOn", label: "Updated on", kind: "text", placeholder: "2026-10-21" },
      { name: "body", label: "Message", kind: "textarea" },
    ],
    columns: [
      { name: "subject", label: "Subject" },
      { name: "requester", label: "Requester" },
      { name: "severity", label: "Severity", kind: "status" },
      { name: "status", label: "Status", kind: "status" },
      { name: "updatedOn", label: "Updated" },
    ],
    published: false,
    orderable: false,
    tag: "site:tickets",
    icon: "ticket",
  },

  team: {
    key: "team",
    title: "Roster",
    singular: "team member",
    group: "people",
    lead: "Who is in the studio and how much room they have.",
    titleField: "name",
    prefix: "tm",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "discipline", label: "Discipline", kind: "text", required: true },
      { name: "location", label: "Location", kind: "text" },
      {
        name: "availability",
        label: "Availability",
        kind: "select",
        options: [
          { value: "available", label: "Available" },
          { value: "partly-booked", label: "Partly booked" },
          { value: "away", label: "Away" },
        ],
      },
      { name: "since", label: "Since", kind: "text", placeholder: "2023-04-01" },
    ],
    columns: [
      { name: "name", label: "Name" },
      { name: "discipline", label: "Discipline" },
      { name: "location", label: "Location" },
      { name: "availability", label: "Availability", kind: "status" },
    ],
    published: false,
    orderable: false,
    tag: "site:team",
    icon: "users",
  },

  work: {
    key: "work",
    title: "Work",
    singular: "case study",
    group: "website",
    lead: "The case studies on the work page.",
    titleField: "name",
    prefix: "wrk",
    fields: [
      { name: "name", label: "Project name", kind: "text", required: true },
      { name: "client", label: "Client", kind: "text" },
      { name: "slug", label: "Slug", kind: "text", required: true, help: "The end of the address: /work/this-one." },
      { name: "result", label: "One-line result", kind: "text" },
      { name: "summary", label: "Summary", kind: "textarea", required: true },
      { name: "problem", label: "The problem", kind: "textarea" },
      { name: "solution", label: "The solution", kind: "textarea" },
      { name: "outcome", label: "The outcome", kind: "textarea" },
      { name: "stack", label: "Technologies", kind: "tags" },
      { name: "quote", label: "Quote", kind: "textarea" },
      { name: "quoteName", label: "Quote — name", kind: "text" },
      { name: "quoteRole", label: "Quote — role", kind: "text" },
      { name: "imageUrl", label: "Cover image", kind: "image" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "name", label: "Project" },
      { name: "client", label: "Client" },
      { name: "slug", label: "Slug" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:work",
    icon: "document",
  },

  services: {
    key: "services",
    title: "Services",
    singular: "service",
    group: "website",
    lead: "The services on the services page.",
    titleField: "title",
    prefix: "svc",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true, help: "The end of the address: /services/this-one." },
      { name: "short", label: "One-line summary", kind: "textarea", required: true },
      { name: "problem", label: "The problem it solves", kind: "textarea" },
      { name: "includes", label: "What a delivery includes", kind: "paragraphs" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "title", label: "Service" },
      { name: "slug", label: "Slug" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:services",
    icon: "document",
  },

  industries: {
    key: "industries",
    title: "Industries",
    singular: "industry",
    group: "website",
    lead: "The sectors on the industries page.",
    titleField: "name",
    prefix: "ind",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "challenge", label: "The challenge", kind: "textarea", required: true },
      { name: "help", label: "How OrLabs helps", kind: "textarea", required: true },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "name", label: "Industry" },
      { name: "slug", label: "Slug" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:industries",
    icon: "document",
  },

  labNotes: {
    key: "labNotes",
    title: "Labs notes",
    singular: "note",
    group: "website",
    lead: "The notes on the labs page.",
    titleField: "title",
    prefix: "lab",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "date", label: "Date", kind: "text", placeholder: "[Date]" },
      { name: "excerpt", label: "One-line summary", kind: "textarea", required: true },
      { name: "body", label: "Body", kind: "paragraphs" },
      { name: "tags", label: "Tags", kind: "tags" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "title", label: "Note" },
      { name: "date", label: "Date" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:labs",
    icon: "document",
  },

  roles: {
    key: "roles",
    title: "Open roles",
    singular: "role",
    group: "website",
    lead: "The roles on the careers page.",
    titleField: "title",
    prefix: "rol",
    fields: [
      { name: "title", label: "Role", kind: "text", required: true },
      { name: "discipline", label: "Team or discipline", kind: "text" },
      { name: "location", label: "Location", kind: "text" },
      { name: "summary", label: "One-line description", kind: "textarea", required: true },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "title", label: "Role" },
      { name: "discipline", label: "Discipline" },
      { name: "location", label: "Location" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:roles",
    icon: "document",
  },

  publicTeam: {
    key: "publicTeam",
    title: "Public team",
    singular: "person",
    group: "website",
    lead: "The people on the team grid of the about page.",
    titleField: "name",
    prefix: "ptm",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "role", label: "Role", kind: "text", required: true },
      { name: "bio", label: "A sentence about them", kind: "textarea" },
      { name: "photoUrl", label: "Portrait", kind: "image" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "name", label: "Name" },
      { name: "role", label: "Role" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:public-team",
    icon: "users",
  },

  clients: {
    key: "clients",
    title: "Client logos",
    singular: "client",
    group: "website",
    lead: "The logos of the “Trusted by teams across Rwanda” row.",
    titleField: "name",
    prefix: "cl",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true, help: "Used as the alternative text of the logo." },
      { name: "logoUrl", label: "Logo", kind: "image" },
      { name: "websiteUrl", label: "Website", kind: "url", placeholder: "https://" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "name", label: "Client" },
      { name: "websiteUrl", label: "Website" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:clients",
    icon: "image",
  },

  contactChannels: {
    key: "contactChannels",
    title: "Contact details",
    singular: "contact detail",
    group: "site",
    lead: "The address, the email address and the phone number the site shows.",
    titleField: "label",
    prefix: "cc",
    fields: [
      {
        name: "kind",
        label: "Kind",
        kind: "select",
        required: true,
        options: [
          { value: "address", label: "Address" },
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "whatsapp", label: "WhatsApp" },
        ],
      },
      { name: "label", label: "Shown text", kind: "text", required: true },
      { name: "value", label: "Value", kind: "text", required: true },
      { name: "href", label: "Link", kind: "url", placeholder: "mailto:" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "label", label: "Shown text" },
      { name: "kind", label: "Kind", kind: "status" },
      { name: "href", label: "Link" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:contact",
    icon: "link",
  },

  socialLinks: {
    key: "socialLinks",
    title: "Social links",
    singular: "social link",
    group: "site",
    lead: "The social networks linked from the footer.",
    titleField: "label",
    prefix: "sl",
    fields: [
      {
        name: "platform",
        label: "Platform",
        kind: "select",
        required: true,
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "x", label: "X" },
          { value: "github", label: "GitHub" },
          { value: "facebook", label: "Facebook" },
          { value: "instagram", label: "Instagram" },
          { value: "youtube", label: "YouTube" },
          { value: "whatsapp", label: "WhatsApp" },
          { value: "telegram", label: "Telegram" },
          { value: "other", label: "Something else" },
        ],
      },
      { name: "label", label: "Name", kind: "text", required: true, help: "The name a screen reader reads out." },
      { name: "url", label: "Address", kind: "url", required: true, placeholder: "https://" },
      { name: "state", label: "State", kind: "select", required: true, options: publishOptions },
    ],
    columns: [
      { name: "label", label: "Name" },
      { name: "platform", label: "Platform", kind: "status" },
      { name: "url", label: "Address" },
      { name: "state", label: "State", kind: "state" },
    ],
    published: true,
    orderable: true,
    tag: "site:social",
    icon: "link",
  },
};

/**
 * The name a resource carries in an address.
 *
 * The key of a collection is the name it has in the store; the slug is the
 * name it has in a URL. They differ where the plain name would be confusing:
 * the roster of the studio is `team`, while the team on the about page is
 * `public-team`.
 */
export const resourceSlugs: Record<ResourceKey, string> = {
  projects: "projects",
  tasks: "tasks",
  tickets: "tickets",
  team: "team",
  work: "work",
  services: "services",
  industries: "industries",
  labNotes: "labs",
  roles: "careers",
  publicTeam: "public-team",
  clients: "clients",
  contactChannels: "contact",
  socialLinks: "social",
};

export function isResourceKey(value: string): value is ResourceKey {
  return (resourceKeys as readonly string[]).includes(value);
}

/** The collection a slug points at. */
export function resourceKeyFromSlug(slug: string): ResourceKey | null {
  for (const key of resourceKeys) {
    if (resourceSlugs[key] === slug) return key;
  }

  return null;
}

/** Where the screens of a resource live. */
export function cmsPath(key: ResourceKey, id?: string): string {
  const definition = resources[key];
  const base = `/portal/admin/${definition.group}/${resourceSlugs[key]}`;

  return id ? `${base}/${id}` : base;
}

export function resourcesInGroup(group: PortalGroup): ResourceDef[] {
  return resourceKeys
    .map((key) => resources[key])
    .filter((resource) => resource.group === group);
}

/** The records of a collection, keyed by their id. */
export function indexById(
  records: PortalData[ResourceKey],
): Record<string, PortalData[ResourceKey][number]> {
  const index: Record<string, PortalData[ResourceKey][number]> = {};

  for (const record of records as { id: string }[]) {
    index[record.id] = record;
  }

  return index;
}
