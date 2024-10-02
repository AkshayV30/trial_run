import express from "express";
import {
  welcomeMessage,
  postContentText,
  genratedResult,
  uploadImage,
} from "../controllers/contentController.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(welcomeMessage);

router.route("/generateContent/txt").post(postContentText);

router.route("/genrateResult").post(genratedResult);

router.route("/upload").post(upload.single("imageInput"), uploadImage);

export default router;
