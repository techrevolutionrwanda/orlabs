import express from "express";
import {
    createFounder,
    deleteFounderById,
    getAllFounders,
    getFounderById,
    updateFounderById,
} from "../controllers/founder.controller.js";

const router = express.Router();

router.post("/", createFounder);
router.get("/", getAllFounders);
router.get("/:id", getFounderById);
router.put("/:id", updateFounderById);
router.delete("/:id", deleteFounderById);

export default router;
