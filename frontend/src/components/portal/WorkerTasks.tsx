"use client";

import type { PortalTask } from "@/src/data/portal/types";

import { PortalResource } from "./PortalResource";
import { TaskList } from "./TaskList";
import { usePortalData } from "./usePortalData";

/**
 * The tasks of the person who is signed in.
 */
export function WorkerTasks() {
  const tasks = usePortalData<{ tasks: PortalTask[] }>(
    "/api/portal/tasks?mine=1",
  );

  return (
    <PortalResource state={tasks} rows={3}>
      {(data) => <TaskList tasks={data.tasks} />}
    </PortalResource>
  );
}
