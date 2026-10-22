import PortalRecord from '../models/record.model.js';
import type { Request, Response } from 'express';

/**
 * The records of the portal store.
 *
 * The frontend keeps the whole store in one object: a collection of records
 * for every kind of record it knows. These routes read and write that object,
 * so the frontend and the database always hold the same records in the same
 * order.
 */

/** A record as the frontend sends it: an id and the fields of its kind. */
type StoreRecord = { id: string } & Record<string, unknown>;

/** The whole store: a collection of records for every kind of record. */
type Store = Record<string, StoreRecord[]>;

/**
 * The records of one collection, in the order they are shown.
 */
async function collectionRecords(key: string) {
  return PortalRecord.find({ key }).sort({ position: 1 }).lean();
}

/**
 * Writes a whole collection.
 *
 * The records that are not in the collection any more are removed, and the
 * others are written with the place they have in the collection.
 */
async function writeCollection(key: string, records: StoreRecord[]) {
  const incoming = new Map<string, StoreRecord>();

  for (const record of records) {
    const id = String(record.id ?? '');

    if (id !== '') incoming.set(id, record);
  }

  const existing = await PortalRecord.find({ key }).select('id').lean();
  const gone = existing.filter((document) => !incoming.has(document.id));

  if (gone.length > 0) {
    await PortalRecord.deleteMany({ key, id: { $in: gone.map((document) => document.id) } });
  }

  const operations = [...incoming.entries()].map(([id, data], position) => ({
    updateOne: {
      filter: { key, id },
      update: { $set: { key, id, data, position } },
      upsert: true,
    },
  }));

  if (operations.length > 0) {
    await PortalRecord.bulkWrite(operations);
  }
}

/**
 * GET /api/store — the whole store.
 *
 * The answer is one object with a collection of records for every kind of
 * record, which is what the frontend keeps in its file.
 */
export async function getStore(_req: Request, res: Response) {
  try {
    const documents = await PortalRecord.find({}).sort({ key: 1, position: 1 }).lean();
    const store: Store = {};

    for (const document of documents) {
      const collection = store[document.key] ?? (store[document.key] = []);

      collection.push(document.data as StoreRecord);
    }

    res.status(200).json(store);
  } catch (error) {
    console.error('Error reading the store:', error);
    res.status(500).json({ message: 'Error reading the store' });
  }
}

/**
 * PUT /api/store — writes the whole store.
 *
 * What the frontend sends is the store as it should be: the records that are
 * in it are written, and the ones that are not in it any more are removed.
 */
export async function putStore(req: Request, res: Response) {
  try {
    const store = (req.body ?? {}) as Store;
    const keys = Object.keys(store).filter((key) => Array.isArray(store[key]));

    // A collection that is not in the store any more is removed with its
    // records.
    const known = await PortalRecord.distinct('key');
    const gone = known.filter((key) => !keys.includes(key));

    if (gone.length > 0) {
      await PortalRecord.deleteMany({ key: { $in: gone } });
    }

    for (const key of keys) {
      await writeCollection(key, store[key]);
    }

    res.status(200).json({ collections: keys.length });
  } catch (error) {
    console.error('Error writing the store:', error);
    res.status(500).json({ message: 'Error writing the store' });
  }
}

/**
 * GET /api/records/:key — the records of one collection.
 */
export async function getCollection(req: Request, res: Response) {
  try {
    const key = String(req.params.key ?? '');
    const documents = await collectionRecords(key);
    const records = documents.map((document) => document.data as StoreRecord);

    res.status(200).json({ records });
  } catch (error) {
    console.error('Error reading the collection:', error);
    res.status(500).json({ message: 'Error reading the collection' });
  }
}

/**
 * POST /api/records/:key — adds a record to a collection.
 *
 * The record comes with its id: the frontend works out the ids itself, so
 * the same record is found again on the next read.
 */
export async function createRecord(req: Request, res: Response) {
  try {
    const key = String(req.params.key ?? '');
    const record = (req.body ?? {}) as StoreRecord;
    const id = String(record.id ?? '');

    if (id === '') {
      return res.status(400).json({ message: 'Send the record with an id.' });
    }

    const documents = await collectionRecords(key);
    const records = documents.map((document) => document.data as StoreRecord);

    // A new record is shown first, the way the portal adds it.
    records.unshift({ ...record, id });

    await writeCollection(key, records);

    res.status(201).json({ record: { ...record, id } });
  } catch (error) {
    console.error('Error creating the record:', error);
    res.status(500).json({ message: 'Error creating the record' });
  }
}

/**
 * PATCH /api/records/:key/:id — changes a record.
 *
 * Only the fields that are sent are changed; the rest of the record stays as
 * it was.
 */
export async function updateRecord(req: Request, res: Response) {
  try {
    const key = String(req.params.key ?? '');
    const id = String(req.params.id ?? '');
    const changes = (req.body ?? {}) as Record<string, unknown>;

    const documents = await collectionRecords(key);
    const records = documents.map((document) => document.data as StoreRecord);
    const at = records.findIndex((record) => record.id === id);

    if (at === -1) {
      return res.status(404).json({ message: 'Record not found' });
    }

    const changed = { ...records[at], ...changes, id };

    records[at] = changed;

    await writeCollection(key, records);

    res.status(200).json({ record: changed });
  } catch (error) {
    console.error('Error changing the record:', error);
    res.status(500).json({ message: 'Error changing the record' });
  }
}

/**
 * DELETE /api/records/:key/:id — removes a record.
 */
export async function deleteRecord(req: Request, res: Response) {
  try {
    const key = String(req.params.key ?? '');
    const id = String(req.params.id ?? '');

    const removed = await PortalRecord.findOneAndDelete({ key, id }).lean();

    if (!removed) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // The records that are left are put back in order.
    const documents = await collectionRecords(key);

    await writeCollection(
      key,
      documents.map((document) => document.data as StoreRecord),
    );

    res.status(200).json({ removed: true, record: removed.data });
  } catch (error) {
    console.error('Error removing the record:', error);
    res.status(500).json({ message: 'Error removing the record' });
  }
}

/**
 * POST /api/records/:key/:id/move — moves a record in its collection.
 *
 * The body says which way it goes: `up` or `down`.
 */
export async function moveRecord(req: Request, res: Response) {
  try {
    const key = String(req.params.key ?? '');
    const id = String(req.params.id ?? '');
    const direction = (req.body ?? {}).direction === 'down' ? 'down' : 'up';

    const documents = await collectionRecords(key);
    const records = documents.map((document) => document.data as StoreRecord);
    const at = records.findIndex((record) => record.id === id);

    if (at === -1) {
      return res.status(404).json({ message: 'Record not found' });
    }

    const to = direction === 'up' ? at - 1 : at + 1;

    // A record that is already at the end of the collection stays there.
    if (to < 0 || to >= records.length) {
      return res.status(200).json({ record: records[at] });
    }

    const [moved] = records.splice(at, 1);

    records.splice(to, 0, moved);

    await writeCollection(key, records);

    res.status(200).json({ record: moved });
  } catch (error) {
    console.error('Error moving the record:', error);
    res.status(500).json({ message: 'Error moving the record' });
  }
}
