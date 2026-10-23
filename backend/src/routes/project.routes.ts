import express from "express";
import { workCreate, getAllWorks, getWorkById, updateWorkById, deleteWorkById } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", workCreate);
router.get("/", getAllWorks);
router.get("/:id", getWorkById);
router.put("/:id", updateWorkById);
router.delete("/:id", deleteWorkById);

export default router;