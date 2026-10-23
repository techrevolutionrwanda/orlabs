/**
 * Types shared by the portal mock store and the portal API.
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

export type BackendProject = {
  _id: string;
  projectName: string;
  oneLineSummary: string;
  startDate: string;
  targetDate: string;
  techenologies: string;
  client: {
    clientName: string;
    role: string;
    companyName: string;
  };
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

export type ContentEntry = {
  id: string;
  title: string;
  path: string;
  state: PublishState;
  owner: string;
  updatedOn: string;
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
