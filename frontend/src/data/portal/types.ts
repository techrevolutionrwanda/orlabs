/**
 * Types shared by the portal store, the portal API and the public website.
 *
 * These describe the shape of the data the administration and worker areas
 * expect. A real back end would return the same shapes.
 */

export type ProjectStatus =
  | "planning"
  | "building"
  | "review"
  | "live"
  | "paused";

export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export type Priority = "low" | "normal" | "high";

export type TicketStatus = "open" | "waiting" | "resolved";

export type Severity = "low" | "medium" | "high";

export type PublishState = "published" | "draft" | "in-review";

/** The social platforms the footer can carry a link to. */
export type SocialPlatform =
  | "linkedin"
  | "x"
  | "github"
  | "facebook"
  | "instagram"
  | "youtube"
  | "whatsapp"
  | "telegram"
  | "other";

/** The kinds of contact detail the footer and the contact page carry. */
export type ContactKind = "address" | "email" | "phone" | "whatsapp";

export type PortalProject = {
  id: string;
  name: string;
  client: string;
  summary: string;
  status: ProjectStatus;
  progress: number;
  stack: string[];
  team: string[];
  startedOn: string;
  targetDate: string;
};

export type PortalTask = {
  id: string;
  title: string;
  project: string;
  projectName: string;
  assignee: string;
  assigneeName: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  estimate: string;
  note: string;
};

/** A task as it is kept in the store — the project and the person are still
 * only ids. The names are resolved when the task is handed out. */
export type StoredTask = Omit<PortalTask, "projectName" | "assigneeName">;

export type PortalTicket = {
  id: string;
  subject: string;
  requester: string;
  severity: Severity;
  status: TicketStatus;
  updatedOn: string;
  channel: string;
  body: string;
};

export type TeamMember = {
  id: string;
  name: string;
  discipline: string;
  location: string;
  availability: "available" | "partly-booked" | "away";
  since: string;
};

/* -------------------------------------------------------------------------- */
/* The content of the public website                                          */
/* -------------------------------------------------------------------------- */

/** A case study on the work page. */
export type WorkItem = {
  id: string;
  slug: string;
  /** Client and project name. */
  name: string;
  client: string;
  /** One-line outcome. */
  result: string;
  /** Short summary used on cards. */
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  /** Technologies used. */
  stack: string[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  /** An uploaded cover image, or an empty string while there is none. */
  imageUrl: string;
  state: PublishState;
  order: number;
};

/** A service on the services page. */
export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  /** One-line summary used on cards. */
  short: string;
  /** The problem the service solves. */
  problem: string;
  /** What a delivery includes. */
  includes: string[];
  state: PublishState;
  order: number;
};

/** A sector on the industries page. */
export type IndustryItem = {
  id: string;
  slug: string;
  name: string;
  /** The kind of pressure the sector works under. */
  challenge: string;
  /** How OrLabs helps. */
  help: string;
  state: PublishState;
  order: number;
};

/** A note on the labs page. */
export type LabNote = {
  id: string;
  slug: string;
  title: string;
  /** Publication date. */
  date: string;
  /** One-line summary used on cards and in the meta description. */
  excerpt: string;
  /** Body paragraphs. */
  body: string[];
  /** Topics the note is filed under. */
  tags: string[];
  state: PublishState;
  order: number;
};

/** An open role on the careers page. */
export type CareerRole = {
  id: string;
  title: string;
  discipline: string;
  location: string;
  summary: string;
  state: PublishState;
  order: number;
};

/** A person on the public team grid of the about page. */
export type PublicTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** An uploaded portrait, or an empty string while there is none. */
  photoUrl: string;
  state: PublishState;
  order: number;
};

/** A logo in the "Trusted by teams across Rwanda" row. */
export type ClientLogo = {
  id: string;
  name: string;
  /** An uploaded logo, or an empty string while there is none. */
  logoUrl: string;
  websiteUrl: string;
  order: number;
  state: PublishState;
};

/** A contact detail — an address, an email address, a phone number. */
export type ContactChannel = {
  id: string;
  kind: ContactKind;
  /** The visible text, e.g. `[EMAIL]`. */
  label: string;
  /** The raw value behind the label. */
  value: string;
  /** Where the label links to, e.g. `mailto:[EMAIL]`. Empty for plain text. */
  href: string;
  order: number;
  state: PublishState;
};

/** A link to a social network in the footer. */
export type SocialLink = {
  id: string;
  platform: SocialPlatform;
  /** The accessible name of the link, e.g. `LinkedIn`. */
  label: string;
  url: string;
  order: number;
  state: PublishState;
};

export type PortalSummary = {
  role: "admin" | "worker";
  metrics: {
    label: string;
    value: number;
    suffix: string;
    hint: string;
  }[];
  highlights: {
    label: string;
    value: string;
  }[];
};

/* -------------------------------------------------------------------------- */
/* The store                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Everything the site holds, in one object.
 *
 * This is the shape that is written to disk. Every collection is a list of
 * records with an `id`.
 */
export type PortalData = {
  projects: PortalProject[];
  tasks: StoredTask[];
  tickets: PortalTicket[];
  team: TeamMember[];
  work: WorkItem[];
  services: ServiceItem[];
  industries: IndustryItem[];
  labNotes: LabNote[];
  roles: CareerRole[];
  publicTeam: PublicTeamMember[];
  clients: ClientLogo[];
  contactChannels: ContactChannel[];
  socialLinks: SocialLink[];
};
