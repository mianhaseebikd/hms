import express from "express";
import { createAdmin, getAdmins } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/", createAdmin);
router.get("/", getAdmins);

export default router;