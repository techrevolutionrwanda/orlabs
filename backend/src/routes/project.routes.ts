import express from "express";
import { requireAdmin } from "../controllers/auth.controller.js";
import {
    deleteWorkById,
    getAllWorks,
    getPublicWorks,
    getWorkById,
    updateWorkById,
    workCreate,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/public", getPublicWorks);
router.use(requireAdmin);
router.post("/", workCreate);
router.get("/", getAllWorks);
router.get("/:id", getWorkById);
router.put("/:id", updateWorkById);
router.delete("/:id", deleteWorkById);

export default router;