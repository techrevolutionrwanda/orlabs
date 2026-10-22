import express from 'express';
import {
  createRecord,
  deleteRecord,
  getCollection,
  getStore,
  moveRecord,
  putStore,
  updateRecord,
} from '../controllers/record.controller.js';

const router = express.Router();

/**
 * The store of the portal.
 *
 * The whole store is read and written in one go, which is how the frontend
 * keeps it, and every collection also has its own routes for anything that
 * works with one record at a time.
 */
router.get('/store', getStore);
router.put('/store', putStore);

router.get('/records/:key', getCollection);
router.post('/records/:key', createRecord);
router.patch('/records/:key/:id', updateRecord);
router.delete('/records/:key/:id', deleteRecord);
router.post('/records/:key/:id/move', moveRecord);

export default router;
