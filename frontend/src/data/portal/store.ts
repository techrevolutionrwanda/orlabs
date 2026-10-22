import { enqueueWrite, readPortalData, writePortalData } from "@/src/lib/portal/db";
import {
  isResourceKey,
  resources,
  type ResourceKey,
} from "@/src/lib/portal/resources";

import { seedPortalData } from "./seed";
import type {
  PortalData,
  PortalProject,
  PortalSummary,
  PortalTask,
  PortalTicket,
  StoredTask,
  TeamMember,
} from "./types";

/**
 * The portal store.
 *
 * Everything the portal holds is one object on disk. This module is the only
 * place that reads and writes it, so every screen sees the same records and
 * every change is written in one go.
 *
 * The records are handed out as copies: a screen can change what it received
 * without changing the store, until it saves.
 */

type AnyRecord = { id: string; [key: string]: unknown };

/* -------------------------------------------------------------------------- */
/* Reading                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The records of a collection.
 *
 * A few records carry the names of the things they point at, so a list can be
 * read without a second request.
 */
export async function listRecords<K extends ResourceKey>(
  key: K,
): Promise<PortalData[K]> {
  const data = await readPortalData();
  const records = data[key].map((record) => ({ ...record })) as AnyRecord[];

  if (key === "tasks") {
    const projects = index(data.projects);
    const people = index(data.team);

    for (const task of records) {
      task.projectName = projects[task.project as string]?.name ?? "";
      task.assigneeName = people[task.assignee as string]?.name ?? "";
    }
  }

  return records as PortalData[K];
}

export async function getRecord<K extends ResourceKey>(
  key: K,
  id: string,
): Promise<PortalData[K][number] | null> {
  const records = await listRecords(key);

  return (
    (records as AnyRecord[]).find((record) => record.id === id) ?? null
  ) as PortalData[K][number] | null;
}

function index(records: { id: string }[]): Record<string, { name: string }> {
  const result: Record<string, { name: string }> = {};

  for (const record of records) {
    result[record.id] = record as { name: string };
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/* Writing                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Adds a record.
 *
 * The id and the place in the order are worked out here, so the screens never
 * have to.
 */
export async function createRecord(
  key: ResourceKey,
  values: Record<string, unknown>,
): Promise<AnyRecord> {
  return enqueueWrite(async () => {
    const data = await readPortalData();
    const collection = data[key] as AnyRecord[];
    const definition = resources[key];

    const record: AnyRecord = {
      ...values,
      id: nextId(collection, definition.prefix),
    };

    if (definition.orderable && typeof record.order !== "number") {
      record.order = nextOrder(collection);
    }

    collection.unshift(record);

    await writePortalData(data);

    return { ...record };
  });
}

/**
 * Changes a record.
 *
 * Only the fields that were sent are changed; the rest of the record stays
 * as it was.
 */
export async function updateRecord(
  key: ResourceKey,
  id: string,
  values: Record<string, unknown>,
): Promise<AnyRecord | null> {
  return enqueueWrite(async () => {
    const data = await readPortalData();
    const collection = data[key] as AnyRecord[];
    const record = collection.find((entry) => entry.id === id);

    if (!record) return null;

    for (const [name, value] of Object.entries(values)) {
      if (name === "id") continue;
      record[name] = value;
    }

    await writePortalData(data);

    return { ...record };
  });
}

/**
 * Removes a record.
 *
 * The records that point at it are listed first, so a screen can warn before
 * anything is lost.
 */
export async function deleteRecord(
  key: ResourceKey,
  id: string,
): Promise<boolean> {
  return enqueueWrite(async () => {
    const data = await readPortalData();
    const collection = data[key] as AnyRecord[];
    const at = collection.findIndex((entry) => entry.id === id);

    if (at === -1) return false;

    collection.splice(at, 1);

    await writePortalData(data);

    return true;
  });
}

/**
 * The records that would break if this one was removed.
 */
export function findDependants(
  data: PortalData,
  key: ResourceKey,
  id: string,
): { type: string; id: string; label: string }[] {
  const dependants: { type: string; id: string; label: string }[] = [];

  if (key === "projects") {
    for (const task of data.tasks) {
      if (task.project === id) {
        dependants.push({ type: "task", id: task.id, label: task.title });
      }
    }
  }

  if (key === "team") {
    for (const task of data.tasks) {
      if (task.assignee === id) {
        dependants.push({ type: "task", id: task.id, label: task.title });
      }
    }

    for (const project of data.projects) {
      if (project.team.includes(id)) {
        dependants.push({ type: "project", id: project.id, label: project.name });
      }
    }
  }

  return dependants;
}

export async function listDependants(
  key: ResourceKey,
  id: string,
): Promise<{ type: string; id: string; label: string }[]> {
  const data = await readPortalData();

  return findDependants(data, key, id);
}

/**
 * Moves a record up or down in the order of its collection.
 */
export async function moveRecord(
  key: ResourceKey,
  id: string,
  direction: "up" | "down",
): Promise<AnyRecord | null> {
  return enqueueWrite(async () => {
    const data = await readPortalData();
    const collection = data[key] as AnyRecord[];
    const at = collection.findIndex((entry) => entry.id === id);

    if (at === -1) return null;

    const to = direction === "up" ? at - 1 : at + 1;

    if (to < 0 || to >= collection.length) return null;

    const moved = collection[at];
    const other = collection[to];

    collection[at] = other;
    collection[to] = moved;

    await writePortalData(data);

    return { ...moved };
  });
}

/**
 * Puts the order of a collection back in a row, so nothing is left with the
 * same number twice.
 */
export async function packOrder(key: ResourceKey): Promise<void> {
  return enqueueWrite(async () => {
    const data = await readPortalData();
    const collection = data[key] as AnyRecord[];

    collection.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    collection.forEach((record, position) => {
      record.order = position;
    });

    await writePortalData(data);
  });
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                      */
/* -------------------------------------------------------------------------- */

function nextId(collection: { id: string }[], prefix: string): string {
  let highest = 0;

  for (const record of collection) {
    const match = /^(\d+)$/.exec(record.id.replace(`${prefix}-`, ""));

    if (match) highest = Math.max(highest, Number(match[1]));
  }

  return `${prefix}-${String(highest + 1).padStart(3, "0")}`;
}

function nextOrder(collection: { order?: number }[]): number {
  let highest = -1;

  for (const record of collection) {
    if (typeof record.order === "number") {
      highest = Math.max(highest, record.order);
    }
  }

  return highest + 1;
}

/* -------------------------------------------------------------------------- */
/* The summary                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The numbers on the dashboard are counted from the store — they are never
 * written down by hand.
 */
export async function portalSummary(
  role: "admin" | "worker",
  userId: string,
): Promise<PortalSummary> {
  const data = await readPortalData();

  if (role === "admin") {
    const live = data.projects.filter((project) => project.status === "live");
    const running = data.projects.filter(
      (project) => project.status === "building" || project.status === "review",
    );
    const openTickets = data.tickets.filter(
      (ticket) => ticket.status !== "resolved",
    );
    const pendingContent = countPendingContent(data);
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
          value: pendingContent,
          suffix: "",
          hint: "Drafts and pages in review",
        },
      ],
      highlights: [
        { label: "Average progress", value: `${averageProgress}%` },
        { label: "People on the team", value: String(data.team.length) },
        {
          label: "Next release",
          value:
            data.projects
              .filter((project) => project.status !== "live")
              .map((project) => project.targetDate)
              .sort()[0] ?? "—",
        },
      ],
    };
  }

  const mine = data.tasks.filter((task) => task.assignee === userId);
  const open = mine.filter((task) => task.status !== "done");
  const done = mine.filter((task) => task.status === "done");
  const highPriority = open.filter((task) => task.priority === "high");
  const myTickets = data.tickets.filter((ticket) => ticket.status !== "resolved");

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

/**
 * The website records that are not published yet.
 */
export function countPendingContent(data: PortalData): number {
  let count = 0;

  for (const key of Object.keys(resources) as ResourceKey[]) {
    const definition = resources[key];

    if (!definition.published) continue;

    const collection = data[key] as { state?: string }[];

    count += collection.filter((record) => record.state !== "published").length;
  }

  return count;
}

/**
 * Every website record in one list, so the content overview can show where
 * each one stands.
 */
export async function listWebsiteContent(): Promise<
  {
    key: ResourceKey;
    title: string;
    singular: string;
    id: string;
    label: string;
    state: string;
  }[]
> {
  const data = await readPortalData();
  const rows: {
    key: ResourceKey;
    title: string;
    singular: string;
    id: string;
    label: string;
    state: string;
  }[] = [];

  for (const key of Object.keys(resources) as ResourceKey[]) {
    const definition = resources[key];

    if (!definition.published) continue;

    const collection = data[key] as AnyRecord[];

    for (const record of collection) {
      rows.push({
        key,
        title: definition.title,
        singular: definition.singular,
        id: record.id,
        label: String(record[definition.titleField] ?? record.id),
        state: String(record.state ?? "published"),
      });
    }
  }

  return rows;
}

/* -------------------------------------------------------------------------- */
/* The seed                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Puts the store back to the seed it started with.
 */
export async function resetPortalData(): Promise<void> {
  await enqueueWrite(async () => {
    await writePortalData(seedPortalData());
  });
}

export function isKnownResource(key: string): key is ResourceKey {
  return isResourceKey(key);
}

export type { PortalProject, PortalTask, PortalTicket, StoredTask, TeamMember };
