import express from "express";
import {
  welcomeMessage,
  postContentText,
  genratedResult,
} from "../controllers/contentController.js";

const router = express.Router();

router.route("/").get(welcomeMessage);

router.route("/generateContent/txt").post(postContentText);

router.route("/genrateResult").post(genratedResult);

export default router;
