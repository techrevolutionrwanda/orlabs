import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { seedPortalData } from "@/src/data/portal/seed";
import type { PortalData } from "@/src/data/portal/types";

/**
 * The store.
 *
 * Everything the portal holds lives in one place: in a JSON file on disk, or
 * in the database of the backend when `PORTAL_API_URL` points at one. Either
 * way the store is read and written as a whole, so a change is one write and
 * never half a store.
 *
 * The file is written atomically — a temporary file is written first and then
 * renamed over the old one — so a request never reads half a file, and all
 * writes go through one queue, so two changes never overwrite each other.
 *
 * The file is not in the repository: it is created from the seed the first
 * time the portal is used. `PORTAL_DATA_FILE` points it somewhere else when
 * the site runs on a host with a persistent disk.
 *
 * When the backend keeps the store, the file keeps a copy of it: the website
 * still has something to show when the backend cannot be reached.
 */

/**
 * The address of the backend that keeps the store.
 *
 * Nothing is said when it is not set: the file on disk is then the store.
 */
function portalApiUrl(): string | null {
  const url = process.env.PORTAL_API_URL?.trim();

  return url ? url.replace(/\/+$/, "") : null;
}

/**
 * Where the file with the store is kept.
 */
export function portalDataFile(): string {
  return resolve(
    process.cwd(),
    process.env.PORTAL_DATA_FILE ?? "data/portal.json",
  );
}

/**
 * Reads the store from the file.
 *
 * A missing file is not an error: it means the portal has never been written
 * to, and the seed answers until the first write.
 */
async function readStoreFromFile(): Promise<PortalData> {
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
 * Writes the store to the file.
 *
 * The temporary file is written first and renamed over the old file, so the
 * file on disk is always a complete store.
 */
async function writeStoreToFile(next: PortalData): Promise<PortalData> {
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
 * Reads the store.
 *
 * The backend answers when one is set, and the file answers when there is
 * none. A backend that cannot be reached is not the end of the website: the
 * file holds the store as it was written the last time, so it is read instead.
 */
export async function readPortalData(): Promise<PortalData> {
  const api = portalApiUrl();

  if (api) {
    try {
      const response = await fetch(`${api}/api/store`);

      if (!response.ok) {
        throw new Error(`The store answered ${response.status}.`);
      }

      const parsed = (await response.json()) as Partial<PortalData>;

      // A collection that was added after the store was written starts empty
      // instead of breaking the whole store.
      return { ...seedPortalData(), ...parsed };
    } catch (error) {
      console.error(`The store at ${api} could not be read:`, error);
    }
  }

  return readStoreFromFile();
}

/**
 * Writes the store.
 *
 * The backend is written when one is set, and the file is written when there
 * is none. A write that the backend refuses is an error: the change is not
 * lost, the administrator is told, and nothing is written behind the back of
 * the store that is in use.
 */
export async function writePortalData(next: PortalData): Promise<PortalData> {
  const api = portalApiUrl();

  if (!api) {
    return writeStoreToFile(next);
  }

  const response = await fetch(`${api}/api/store`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(next),
  });

  if (!response.ok) {
    throw new Error(`The store at ${api} answered ${response.status}.`);
  }

  // A copy of the store is kept in the file, so the website still has
  // something to show when the backend cannot be reached.
  await writeStoreToFile(next).catch((error) => {
    console.error("The copy of the store could not be written:", error);
  });

  return next;
}

/**
 * Runs writes one after another.
 *
 * Two changes that arrive at the same moment would otherwise both read the
 * same store and the second one would throw the first one away.
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
