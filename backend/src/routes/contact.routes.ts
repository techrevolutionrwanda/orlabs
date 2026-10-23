import express from "express";
import { requireAdmin } from "../controllers/auth.controller.js";
import {
  createContact,
  getContacts,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", requireAdmin, getContacts);

export default router;
