import { updateTaskStatus } from "@/src/data/portal/store";
import type { TaskStatus } from "@/src/data/portal/types";
import { requirePortalSession } from "@/src/lib/portal/api";

const statuses: TaskStatus[] = ["todo", "in-progress", "review", "done"];

/**
 * PATCH /api/portal/tasks/[id] — move a task to another state.
 *
 * The mock store lives in memory, so the change lasts until the server
 * restarts.
 */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/portal/tasks/[id]">,
) {
  const { response } = await requirePortalSession();

  if (response) return response;

  const { id } = await params;

  let body: { status?: string };

  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return Response.json(
      { error: "Send the new status as JSON." },
      { status: 400 },
    );
  }

  if (!statuses.includes(body.status as TaskStatus)) {
    return Response.json(
      { error: `Unknown status. Use one of: ${statuses.join(", ")}.` },
      { status: 400 },
    );
  }

  const task = updateTaskStatus(id, body.status as TaskStatus);

  if (!task) {
    return Response.json({ error: "No task with that id." }, { status: 404 });
  }

  return Response.json({ task });
}
