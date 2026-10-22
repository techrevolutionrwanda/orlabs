import express from 'express';

const router = express.Router();
import createTrustedBy, { getTrustedBy, DeleteTrustedBy } from '../controllers/trustedBy.controller.js';

// Route to create a new TrustedBy entry
router.post('/', createTrustedBy);

// Route to get all TrustedBy entries
router.get('/', getTrustedBy);

// Route to delete a TrustedBy entry by ID
router.delete('/:id', DeleteTrustedBy);

export default router;