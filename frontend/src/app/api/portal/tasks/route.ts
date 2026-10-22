import { listTasks } from "@/src/data/portal/store";
import { requirePortalSession } from "@/src/lib/portal/api";

/**
 * GET /api/portal/tasks — the task list.
 *
 * `?assignee=tm-002` narrows it down to one person, `?status=todo` to one
 * state.
 */
export async function GET(request: Request) {
  const { response } = await requirePortalSession();

  if (response) return response;

  const params = new URL(request.url).searchParams;
  const assignee = params.get("assignee");
  const status = params.get("status");

  let tasks = listTasks();

  if (assignee) {
    tasks = tasks.filter((task) => task.assignee === assignee);
  }

  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  return Response.json({ tasks });
}
