import express from "express";
import { requireAdmin } from "../controllers/auth.controller.js";
import { workCreate, getAllWorks, getWorkById, updateWorkById, deleteWorkById } from "../controllers/project.controller.js";

const router = express.Router();

router.use(requireAdmin);
router.post("/", workCreate);
router.get("/", getAllWorks);
router.get("/:id", getWorkById);
router.put("/:id", updateWorkById);
router.delete("/:id", deleteWorkById);

export default router;