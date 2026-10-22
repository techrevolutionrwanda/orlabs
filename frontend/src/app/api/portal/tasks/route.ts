import { listRecords } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/**
 * GET /api/portal/tasks — the task list.
 *
 * `?mine=1` narrows it down to the person who is signed in,
 * `?assignee=tm-002` to one person, `?status=todo` to one state.
 */
export async function GET(request: Request) {
  const { session, response } = await requirePortalSession();

  if (response) return response;

  const params = new URL(request.url).searchParams;
  const assignee = params.get("assignee");
  const status = params.get("status");

  let tasks = await listRecords("tasks");

  if (params.get("mine") === "1") {
    tasks = tasks.filter((task) => task.assignee === session.userId);
  }

  if (assignee) {
    tasks = tasks.filter((task) => task.assignee === assignee);
  }

  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  return Response.json({ tasks });
}
