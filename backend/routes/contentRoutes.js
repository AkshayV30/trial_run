import express from "express";
import {
  welcomeMessage,
  // postContentText,
  checkTheProduct,
} from "../controllers/contentController.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(welcomeMessage);

router.route("/upload").post(upload.single("imageInput"), checkTheProduct);

// router.route("/generateContent/txt").post(postContentText);
export default router;
