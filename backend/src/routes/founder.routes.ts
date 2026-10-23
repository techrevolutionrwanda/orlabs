import express from "express";
import { requireAdmin } from "../controllers/auth.controller.js";
import {
    createFounder,
    deleteFounderById,
    getAllFounders,
    getFounderById,
    getPublicFounders,
    updateFounderById,
} from "../controllers/founder.controller.js";

const router = express.Router();

router.get("/public", getPublicFounders);
router.use(requireAdmin);
router.post("/", createFounder);
router.get("/", getAllFounders);
router.get("/:id", getFounderById);
router.put("/:id", updateFounderById);
router.delete("/:id", deleteFounderById);

export default router;
