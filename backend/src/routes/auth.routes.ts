import express from "express";
import {
    getCurrentAdmin,
    login,
    updateAdminCredentials,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", getCurrentAdmin);
router.patch("/credentials", updateAdminCredentials);

export default router;
