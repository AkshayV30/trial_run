import express from "express";

import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { rateLimitMiddleware } from "./middlewares/rateLimitingMiddleware.js";

import { errorHandler } from "./utils/errorHandler.js";
import contentRoutes from "./routes/contentRoutes.js";

const app = express();

// ----------------------------------------------------
// Middleware
// ----------------------------------------------------
app.use(express.json());
app.use(corsMiddleware);
// app.use(rateLimitMiddleware);
// =====================================================

// ----------------------------------------------------
// Routes
// ----------------------------------------------------
app.use("/api/v1", contentRoutes);
app.use(errorHandler);

export default app;
