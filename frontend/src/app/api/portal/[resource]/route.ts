import { revalidateTag } from "next/cache";

import { createRecord, listRecords } from "@/src/data/portal/store";
import {
  readJsonBody,
  requirePortalAdmin,
  requirePortalSession,
} from "@/src/lib/portal/api";
import {
  resourceKeyFromSlug,
  resources,
} from "@/src/lib/portal/resources";
import { validateRecord } from "@/src/lib/portal/validation";

/**
 * The collection routes.
 *
 * Every record the portal holds is reached through the same two routes:
 * `/api/portal/[resource]` for the whole collection and
 * `/api/portal/[resource]/[id]` for one record. What a collection is called
 * in the address, what it holds and who may change it all come from the
 * description of the resource, so a new kind of record needs no new route.
 */

type Row = { id: string } & Record<string, unknown>;

function notFound(): Response {
  return Response.json({ error: "There is no such collection." }, { status: 404 });
}

/**
 * GET /api/portal/[resource] — the records of a collection.
 *
 * Anybody who is signed in may read. A query that names a field of the
 * collection narrows the list down: `/api/portal/tasks?status=done`.
 */
export async function GET(
  request: Request,
  { params }: RouteContext<"/api/portal/[resource]">,
) {
  const { session, response } = await requirePortalSession();

  if (response) return response;

  const { resource: slug } = await params;
  const key = resourceKeyFromSlug(slug);

  if (!key) return notFound();

  const definition = resources[key];
  const search = new URL(request.url).searchParams;

  let records = (await listRecords(key)) as unknown as Row[];

  for (const [name, value] of search.entries()) {
    if (name === "mine") continue;
    if (!definition.fields.some((field) => field.name === name)) continue;

    records = records.filter(
      (record) => String(record[name] ?? "") === value,
    );
  }

  if (search.get("mine") === "1" && key === "tasks") {
    records = records.filter((record) => record.assignee === session.userId);
  }

  return Response.json({
    resource: definition.title,
    key,
    records,
  });
}

/**
 * POST /api/portal/[resource] — adds a record.
 *
 * Only an administrator may add records. The fields are checked first: a
 * record that is not right comes back with the mistakes, one by one, and
 * nothing is written.
 */
export async function POST(
  request: Request,
  { params }: RouteContext<"/api/portal/[resource]">,
) {
  const { response } = await requirePortalAdmin();

  if (response) return response;

  const { resource: slug } = await params;
  const key = resourceKeyFromSlug(slug);

  if (!key) return notFound();

  const body = await readJsonBody(request);

  if (!body) {
    return Response.json(
      { error: "Send the record as a JSON object." },
      { status: 400 },
    );
  }

  const definition = resources[key];
  const { values, errors } = validateRecord(definition, body, "create");

  if (errors.length > 0) {
    return Response.json(
      { error: "Some fields need another look.", errors },
      { status: 422 },
    );
  }

  const record = await createRecord(key, values);

  revalidateTag(definition.tag, { expire: 0 });

  return Response.json({ record }, { status: 201 });
}
