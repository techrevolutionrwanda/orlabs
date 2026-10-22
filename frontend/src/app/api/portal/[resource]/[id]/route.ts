import { revalidateTag } from "next/cache";

import {
  deleteRecord,
  getRecord,
  listDependants,
  moveRecord,
  packOrder,
  updateRecord,
} from "@/src/data/portal/store";
import {
  readJsonBody,
  requirePortalAdmin,
  requirePortalSession,
} from "@/src/lib/portal/api";
import {
  resourceKeyFromSlug,
  resources,
} from "@/src/lib/portal/resources";
import {
  validateRecord,
  workerMayTouch,
  workerMayWrite,
} from "@/src/lib/portal/validation";

/**
 * The single record routes.
 *
 * `GET` reads a record, `PATCH` changes it, `DELETE` removes it. Everything
 * comes from the description of the resource, so every collection behaves the
 * same way.
 */

type Row = { id: string } & Record<string, unknown>;

function notFound(): Response {
  return Response.json({ error: "There is no such record." }, { status: 404 });
}

/**
 * GET /api/portal/[resource]/[id] — one record.
 */
export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/portal/[resource]/[id]">,
) {
  const { response } = await requirePortalSession();

  if (response) return response;

  const { resource: slug, id } = await params;
  const key = resourceKeyFromSlug(slug);

  if (!key) return notFound();

  const record = await getRecord(key, id);

  if (!record) return notFound();

  return Response.json({ record });
}

/**
 * PATCH /api/portal/[resource]/[id] — changes a record.
 *
 * Only the fields that are sent are changed; the rest of the record stays as
 * it was. An administrator may change anything. A worker may only move a
 * task along or close a ticket.
 *
 * `?move=up` and `?move=down` put a record one place earlier or later in
 * the order of its collection.
 */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/portal/[resource]/[id]">,
) {
  const { session, response } = await requirePortalSession();

  if (response) return response;

  const { resource: slug, id } = await params;
  const key = resourceKeyFromSlug(slug);

  if (!key) return notFound();

  const definition = resources[key];
  const search = new URL(request.url).searchParams;
  const move = search.get("move");

  if (move === "up" || move === "down") {
    const { response: denied } = await requirePortalAdmin();

    if (denied) return denied;

    const moved = await moveRecord(key, id, move);

    if (!moved) return notFound();

    revalidateTag(definition.tag, { expire: 0 });

    return Response.json({ record: moved });
  }

  const body = await readJsonBody(request);

  if (!body) {
    return Response.json(
      { error: "Send the record as a JSON object." },
      { status: 400 },
    );
  }

  const { values, errors } = validateRecord(definition, body, "update");

  if (errors.length > 0) {
    return Response.json(
      { error: "Some fields need another look.", errors },
      { status: 422 },
    );
  }

  if (session.role !== "admin") {
    if (!workerMayTouch(key) || !workerMayWrite(key, Object.keys(values))) {
      return Response.json(
        { error: "Only an administrator can change this." },
        { status: 403 },
      );
    }
  }

  const record = await updateRecord(key, id, values);

  if (!record) return notFound();

  revalidateTag(definition.tag, { expire: 0 });

  return Response.json({ record });
}

/**
 * DELETE /api/portal/[resource]/[id] — removes a record.
 *
 * A record other records point at is not removed straight away: the answer
 * says what depends on it, so a screen can ask whether to go on anyway.
 * `?force=1` goes on anyway.
 */
export async function DELETE(
  request: Request,
  { params }: RouteContext<"/api/portal/[resource]/[id]">,
) {
  const { response } = await requirePortalAdmin();

  if (response) return response;

  const { resource: slug, id } = await params;
  const key = resourceKeyFromSlug(slug);

  if (!key) return notFound();

  const definition = resources[key];
  const force = new URL(request.url).searchParams.get("force") === "1";

  const record = await getRecord(key, id);

  if (!record) return notFound();

  if (!force) {
    const dependants = await listDependants(key, id);

    if (dependants.length > 0) {
      return Response.json(
        {
          error: "Other records point at this one.",
          dependants,
        },
        { status: 409 },
      );
    }
  }

  const removed = await deleteRecord(key, id);

  if (!removed) return notFound();

  if (definition.orderable) {
    await packOrder(key);
  }

  revalidateTag(definition.tag, { expire: 0 });

  return Response.json({
    removed: true,
    record: record as unknown as Row,
  });
}
