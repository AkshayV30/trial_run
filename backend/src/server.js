import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import { generateContent } from "./vertexService.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(
  cors({
    origin: "http://localhost:4000",
  })
);
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`
      <h1>  hello World : hackathon</h1>`);
});

// app.get("/api/test/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const pirate = getPirate(id);
//   if (!pirate) {
//     res.status(404).send({ error: `Pirate with ID ${id} not found` });
//   } else {
//     res.send({ data: pirate });
//   }
// });

// function getPirate(id) {
//   const pirates = [
//     { id: 1, name: "Pirate One", active: "1956-1999", country: "Germany" },
//     { id: 2, name: "Pirate Two", active: "1999-2000", country: "Austria" },
//     { id: 3, name: "Pirate Three", active: "2000-2100", country: "Nepal" },
//   ];
//   return pirates.find((p) => p.id === id); // Find and return the pirate object with the matching ID
// }
app.post("/api/generate", async (req, res) => {
  try {
    const { promptText, filePath } = req.body;
    const generatedResponse = await generateContent(promptText, filePath);
    res.send({ data: generatedResponse });
  } catch (error) {
    res.status(500).send({ error: "Error generating content" });
  }
});

// server
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
