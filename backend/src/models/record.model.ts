import mongoose from 'mongoose';

/**
 * One record of the portal store.
 *
 * The portal keeps thirteen kinds of record and the frontend decides what the
 * fields of a record mean, so the backend stores them as they are given: the
 * collection the record belongs to, its id, the record itself, and the place
 * it has in that collection.
 *
 * The model is not called `Record`: that name is a type of TypeScript itself,
 * and a model of that name hides it in every file that imports it.
 */
const recordSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      index: true,
    },
    id: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// A record is known by the collection it belongs to and its id.
recordSchema.index({ key: 1, id: 1 }, { unique: true });

const PortalRecord = mongoose.model('PortalRecord', recordSchema);

export default PortalRecord;
