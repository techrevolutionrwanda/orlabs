import express from 'express';
import { requireAdmin } from '../controllers/auth.controller.js';
import {
  createTrustedBy,
  deleteTrustedBy,
  getTrustedBy,
  updateTrustedBy,
} from '../controllers/trustedBy.controller.js';

const router = express.Router();

router.get('/', getTrustedBy);
router.use(requireAdmin);
router.post('/', createTrustedBy);
router.put('/:id', updateTrustedBy);
router.delete('/:id', deleteTrustedBy);

export default router;