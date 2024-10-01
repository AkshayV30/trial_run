import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import pirateRoutes from "./routes/routes.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { generateContent } from "./services/vertexService.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(corsMiddleware); // Using custom CORS middleware

// Routes
app.use("/", pirateRoutes);

// Generate content route
app.post("/api/generate", async (req, res) => {
  try {
    const { promptText, filePath } = req.body;
    const generatedResponse = await generateContent(promptText, filePath);
    res.send({ data: generatedResponse });
  } catch (error) {
    res.status(500).send({ error: "Error generating content" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
