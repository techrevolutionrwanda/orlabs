import express from 'express';
const router = express.Router();
import { requireAdmin } from '../controllers/auth.controller.js';
import {
  createTrustedBy,
  deleteTrustedBy,
  getTrustedBy,
  updateTrustedBy,
} from '../controllers/trustedBy.controller.js';

router.use(requireAdmin);
router.post('/', createTrustedBy);
router.get('/', getTrustedBy);
router.put('/:id', updateTrustedBy);
router.delete('/:id', deleteTrustedBy);

export default router;