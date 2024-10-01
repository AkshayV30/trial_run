import express from "express";
import { getPirateById, welcomeMessage } from "../controllers/controller.js";

const router = express.Router();

router.get("/", welcomeMessage);
router.get("/api/test/:id", getPirateById);

export default router;
