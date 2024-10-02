import {
  generateContentWithText,
  generatdResultResponse,
} from "../services/vertexService.js";

export const welcomeMessage = (req, res, next) => {
  res.send(`
    <h1>Hello Devfolio: GenAI Exchange Hackathon</h1>
  `);
};

export const postContentText = async (req, res, next) => {
  try {
    const { promptText } = req.body;

    if (!promptText) {
      return res.status(400).json({ error: "Prompt text is required" });
    }
    const generatedContent = await generateContentWithText(promptText);

    res.status(200).json({ text: generatedContent });
  } catch (error) {
    res.status(500).send({ error: "Error generating text content" });
  }

  next();
};

export const genratedResult = async (req, res, next) => {
  try {
    const { filePath } = req.body;
    const generatedResponse = await generatdResultResponse(filePath);
    res.status(200).send({ data: generatedResponse });
  } catch (error) {
    res.status(500).send({ error: "Error retriveing text content" });
  }

  next();
};

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageFilePath = req.file.path;

    console.log("Uploaded file:", imageFilePath);

    const generatedResponse = await generatdResultResponse(imageFilePath);
    // console.log("Generated response:", generatedResponse);
    console.log(generatedResponse);

    // Respond with success message or generated content
    res.json({
      message: "Image uploaded successfully",
      imagePath: imageFilePath,
      generatedResponse: generatedResponse,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send({ error: "Error uploading image" });
  }
  next();
};
