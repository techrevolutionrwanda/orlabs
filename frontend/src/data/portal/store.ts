import type {
  ContentEntry,
  PortalProject,
  PortalSummary,
  PortalTask,
  PortalTicket,
  TaskStatus,
  TeamMember,
  TicketStatus,
} from "./types";

/**
 * The portal mock store.
 *
 * It keeps everything in memory so the portal can be walked through without a
 * back end. Changes (a task moved to “done”, a ticket closed) last until the
 * server restarts — that is the point of a mock.
 *
 * Nothing here is a real client, a real person or a real figure. Names and
 * clients stay as `[PLACEHOLDERS]` until the team fills them in.
 */

const team: TeamMember[] = [
  {
    id: "tm-001",
    name: "[TEAM MEMBER]",
    discipline: "Engineering",
    location: "Kigali, Rwanda",
    availability: "available",
    since: "2023-04-01",
  },
  {
    id: "tm-002",
    name: "[TEAM MEMBER]",
    discipline: "Engineering",
    location: "Kigali, Rwanda",
    availability: "partly-booked",
    since: "2024-01-15",
  },
  {
    id: "tm-003",
    name: "[TEAM MEMBER]",
    discipline: "Design",
    location: "Kigali, Rwanda",
    availability: "available",
    since: "2023-09-01",
  },
  {
    id: "tm-004",
    name: "[TEAM MEMBER]",
    discipline: "Delivery",
    location: "Kigali, Rwanda",
    availability: "away",
    since: "2022-11-07",
  },
];

const projects: PortalProject[] = [
  {
    id: "prj-001",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "building",
    progress: 62,
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    team: ["tm-001", "tm-002", "tm-003"],
    startedOn: "2026-07-06",
    targetDate: "2026-11-27",
  },
  {
    id: "prj-002",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "review",
    progress: 88,
    stack: ["TypeScript", "React Native", "AWS"],
    team: ["tm-001", "tm-004"],
    startedOn: "2026-05-18",
    targetDate: "2026-10-30",
  },
  {
    id: "prj-003",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "planning",
    progress: 15,
    stack: ["Python", "PostgreSQL"],
    team: ["tm-003", "tm-004"],
    startedOn: "2026-10-05",
    targetDate: "2027-01-29",
  },
  {
    id: "prj-004",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "live",
    progress: 100,
    stack: ["Java", "Spring Boot", "Kubernetes"],
    team: ["tm-002"],
    startedOn: "2026-01-12",
    targetDate: "2026-06-26",
  },
  {
    id: "prj-005",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "paused",
    progress: 34,
    stack: ["Go", "Docker"],
    team: ["tm-001"],
    startedOn: "2026-03-02",
    targetDate: "[TARGET DATE]",
  },
];

/**
 * A task as it is kept in the store — the project and the person are still
 * only ids. The names are resolved when the task is handed out.
 */
type StoredTask = Omit<PortalTask, "projectName" | "assigneeName">;

const tasks: StoredTask[] = [
  {
    id: "tsk-001",
    title: "Wire the authentication flow end to end",
    project: "prj-001",
    assignee: "tm-002",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-10-27",
    estimate: "3 days",
    note: "[NOTE]",
  },
  {
    id: "tsk-002",
    title: "Review the reporting module",
    project: "prj-001",
    assignee: "tm-002",
    status: "todo",
    priority: "normal",
    dueDate: "2026-10-30",
    estimate: "1 day",
    note: "[NOTE]",
  },
  {
    id: "tsk-003",
    title: "Prepare the release notes for the mobile release",
    project: "prj-002",
    assignee: "tm-002",
    status: "review",
    priority: "normal",
    dueDate: "2026-10-24",
    estimate: "Half a day",
    note: "[NOTE]",
  },
  {
    id: "tsk-004",
    title: "Set up the delivery pipeline for the new service",
    project: "prj-001",
    assignee: "tm-001",
    status: "done",
    priority: "high",
    dueDate: "2026-10-17",
    estimate: "2 days",
    note: "[NOTE]",
  },
  {
    id: "tsk-005",
    title: "Draft the discovery notes for the new engagement",
    project: "prj-003",
    assignee: "tm-004",
    status: "todo",
    priority: "normal",
    dueDate: "2026-11-03",
    estimate: "1 day",
    note: "[NOTE]",
  },
  {
    id: "tsk-006",
    title: "Update the design system with the new components",
    project: "prj-002",
    assignee: "tm-003",
    status: "in-progress",
    priority: "low",
    dueDate: "2026-10-29",
    estimate: "2 days",
    note: "[NOTE]",
  },
  {
    id: "tsk-007",
    title: "Document the on-call handover",
    project: "prj-004",
    assignee: "tm-002",
    status: "done",
    priority: "normal",
    dueDate: "2026-10-10",
    estimate: "Half a day",
    note: "[NOTE]",
  },
  {
    id: "tsk-008",
    title: "Investigate the slow export job",
    project: "prj-001",
    assignee: "tm-002",
    status: "todo",
    priority: "high",
    dueDate: "2026-10-22",
    estimate: "1 day",
    note: "[NOTE]",
  },
];

const tickets: PortalTicket[] = [
  {
    id: "tkt-001",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "high",
    status: "open",
    updatedOn: "2026-10-21",
    channel: "Email",
    body: "[TICKET BODY]",
  },
  {
    id: "tkt-002",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "medium",
    status: "waiting",
    updatedOn: "2026-10-20",
    channel: "Phone",
    body: "[TICKET BODY]",
  },
  {
    id: "tkt-003",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "low",
    status: "open",
    updatedOn: "2026-10-18",
    channel: "Support portal",
    body: "[TICKET BODY]",
  },
  {
    id: "tkt-004",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "medium",
    status: "resolved",
    updatedOn: "2026-10-15",
    channel: "Email",
    body: "[TICKET BODY]",
  },
];

const content: ContentEntry[] = [
  {
    id: "cnt-001",
    title: "Home page",
    path: "/",
    state: "published",
    owner: "tm-004",
    updatedOn: "2026-10-19",
  },
  {
    id: "cnt-002",
    title: "About",
    path: "/about",
    state: "published",
    owner: "tm-004",
    updatedOn: "2026-10-12",
  },
  {
    id: "cnt-003",
    title: "Services",
    path: "/services",
    state: "published",
    owner: "tm-001",
    updatedOn: "2026-10-09",
  },
  {
    id: "cnt-004",
    title: "Industries",
    path: "/industries",
    state: "in-review",
    owner: "tm-003",
    updatedOn: "2026-10-21",
  },
  {
    id: "cnt-005",
    title: "Work",
    path: "/work",
    state: "draft",
    owner: "tm-004",
    updatedOn: "2026-10-22",
  },
  {
    id: "cnt-006",
    title: "Labs",
    path: "/labs",
    state: "draft",
    owner: "tm-002",
    updatedOn: "2026-10-16",
  },
  {
    id: "cnt-007",
    title: "Careers",
    path: "/careers",
    state: "published",
    owner: "tm-004",
    updatedOn: "2026-10-05",
  },
  {
    id: "cnt-008",
    title: "Contact",
    path: "/contact",
    state: "published",
    owner: "tm-004",
    updatedOn: "2026-10-08",
  },
];

/* -------------------------------------------------------------------------- */
/* The store itself                                                            */
/* -------------------------------------------------------------------------- */

type PortalStore = {
  projects: PortalProject[];
  tasks: StoredTask[];
  tickets: PortalTicket[];
  team: TeamMember[];
  content: ContentEntry[];
};

/**
 * The one store every route handler works with.
 *
 * It is kept on `globalThis` on purpose: in development every route handler
 * is compiled on its own, so a plain module variable would give each of them
 * its own copy — a task moved in one route would be invisible in the next.
 * The first copy wins and everybody shares it.
 *
 * The store lives in the memory of the server process. It is emptied when
 * the server restarts — that is what a mock is.
 */
const globalScope = globalThis as typeof globalThis & {
  __orlabsPortalStore?: PortalStore;
};

const store: PortalStore =
  globalScope.__orlabsPortalStore ??
  (globalScope.__orlabsPortalStore = {
    projects,
    tasks,
    tickets,
    team,
    content,
  });

/* -------------------------------------------------------------------------- */
/* Reads                                                                       */
/* -------------------------------------------------------------------------- */

export function listProjects(): PortalProject[] {
  return store.projects.map((project) => ({ ...project }));
}

export function listTasks(): PortalTask[] {
  return store.tasks.map((task) => ({
    ...task,
    projectName: projectName(task.project),
    assigneeName: assigneeName(task.assignee),
  }));
}

function projectName(id: string): string {
  const project = store.projects.find((entry) => entry.id === id);
  return project ? project.name : id;
}

function assigneeName(id: string): string {
  const member = store.team.find((entry) => entry.id === id);
  return member ? member.name : id;
}

export function listTickets(): PortalTicket[] {
  return store.tickets.map((ticket) => ({ ...ticket }));
}

export function listTeam(): TeamMember[] {
  return store.team.map((member) => ({ ...member }));
}

export function listContent(): ContentEntry[] {
  return store.content.map((entry) => ({ ...entry }));
}

export function findTeamMember(id: string): TeamMember | undefined {
  const member = store.team.find((entry) => entry.id === id);
  return member ? { ...member } : undefined;
}

/* -------------------------------------------------------------------------- */
/* Writes                                                                      */
/* -------------------------------------------------------------------------- */

export function updateTaskStatus(
  id: string,
  status: TaskStatus,
): PortalTask | null {
  const task = store.tasks.find((entry) => entry.id === id);

  if (!task) return null;

  task.status = status;

  return {
    ...task,
    projectName: projectName(task.project),
    assigneeName: assigneeName(task.assignee),
  };
}

export function updateTicketStatus(
  id: string,
  status: TicketStatus,
): PortalTicket | null {
  const ticket = store.tickets.find((entry) => entry.id === id);

  if (!ticket) return null;

  ticket.status = status;
  return { ...ticket };
}

/* -------------------------------------------------------------------------- */
/* Summary                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The numbers on the dashboard are counted from the mock store — they are
 * never written down by hand.
 */
export function portalSummary(
  role: "admin" | "worker",
  userId: string,
): PortalSummary {
  if (role === "admin") {
    const live = store.projects.filter((project) => project.status === "live");
    const running = store.projects.filter(
      (project) => project.status === "building" || project.status === "review",
    );
    const openTickets = store.tickets.filter(
      (ticket) => ticket.status !== "resolved",
    );
    const pendingContent = store.content.filter(
      (entry) => entry.state !== "published",
    );
    const averageProgress =
      running.length === 0
        ? 0
        : Math.round(
            running.reduce((total, project) => total + project.progress, 0) /
              running.length,
          );

    return {
      role,
      metrics: [
        {
          label: "Live projects",
          value: live.length,
          suffix: "",
          hint: "Released and supported",
        },
        {
          label: "In delivery",
          value: running.length,
          suffix: "",
          hint: "Building or in review",
        },
        {
          label: "Open tickets",
          value: openTickets.length,
          suffix: "",
          hint: "Waiting for the team",
        },
        {
          label: "Content to publish",
          value: pendingContent.length,
          suffix: "",
          hint: "Drafts and pages in review",
        },
      ],
      highlights: [
        { label: "Average progress", value: `${averageProgress}%` },
        { label: "People on the team", value: String(store.team.length) },
        {
          label: "Next release",
          value: store.projects
            .filter((project) => project.status !== "live")
            .map((project) => project.targetDate)
            .sort()[0] ?? "—",
        },
      ],
    };
  }

  const mine = store.tasks.filter((task) => task.assignee === userId);
  const open = mine.filter((task) => task.status !== "done");
  const done = mine.filter((task) => task.status === "done");
  const highPriority = open.filter((task) => task.priority === "high");
  const myTickets = store.tickets.filter((ticket) => ticket.status !== "resolved");

  return {
    role,
    metrics: [
      {
        label: "My open tasks",
        value: open.length,
        suffix: "",
        hint: "Waiting for you",
      },
      {
        label: "High priority",
        value: highPriority.length,
        suffix: "",
        hint: "Needed first",
      },
      {
        label: "Completed",
        value: done.length,
        suffix: "",
        hint: "Closed this cycle",
      },
      {
        label: "Open tickets",
        value: myTickets.length,
        suffix: "",
        hint: "Across all projects",
      },
    ],
    highlights: [
      { label: "Next due date", value: nextDueDate(open) },
      { label: "Projects involved", value: String(projectsOf(mine).length) },
      { label: "Location", value: "Kigali, Rwanda" },
    ],
  };
}

function projectsOf(list: StoredTask[]): string[] {
  return [...new Set(list.map((task) => task.project))];
}

function nextDueDate(list: StoredTask[]): string {
  const dates = list.map((task) => task.dueDate).sort();
  return dates[0] ?? "—";
}
