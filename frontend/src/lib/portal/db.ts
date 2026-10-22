import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { seedPortalData } from "@/src/data/portal/seed";
import type { PortalData } from "@/src/data/portal/types";

/**
 * The store on disk.
 *
 * Everything the portal holds lives in one JSON file. The file is written
 * atomically — a temporary file is written first and then renamed over the
 * old one — so a request never reads half a file, and all writes go through
 * one queue, so two changes never overwrite each other.
 *
 * The file is not in the repository: it is created from the seed the first
 * time the portal is used. `PORTAL_DATA_FILE` points it somewhere else when
 * the site runs on a host with a persistent disk.
 */

export function portalDataFile(): string {
  return resolve(
    process.cwd(),
    process.env.PORTAL_DATA_FILE ?? "data/portal.json",
  );
}

/**
 * Reads the store.
 *
 * A missing file is not an error: it means the portal has never been written
 * to, and the seed answers until the first write.
 */
export async function readPortalData(): Promise<PortalData> {
  let raw: string;

  try {
    raw = await readFile(portalDataFile(), "utf8");
  } catch {
    return seedPortalData();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PortalData>;

    // A collection that was added after the file was written starts empty
    // instead of breaking the whole store.
    return { ...seedPortalData(), ...parsed };
  } catch {
    return seedPortalData();
  }
}

/**
 * Writes the store.
 *
 * The temporary file is written first and renamed over the old file, so the
 * file on disk is always a complete store.
 */
export async function writePortalData(next: PortalData): Promise<PortalData> {
  const file = portalDataFile();
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;

  await mkdir(dirname(file), { recursive: true });
  await writeFile(temp, `${JSON.stringify(next, null, 2)}\n`, "utf8");

  try {
    await rename(temp, file);
  } catch (error) {
    await rm(temp, { force: true }).catch(() => undefined);
    throw error;
  }

  return next;
}

/**
 * Runs writes one after another.
 *
 * Two changes that arrive at the same moment would otherwise both read the
 * same file and the second one would throw the first one away.
 */
let queue: Promise<unknown> = Promise.resolve();

export function enqueueWrite<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);

  queue = run.then(
    () => undefined,
    () => undefined,
  );

  return run;
}
