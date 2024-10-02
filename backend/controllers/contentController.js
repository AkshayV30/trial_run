import {
  // generateContentWithText,
  generatdResultResponse,
} from "../services/vertexService.js";

// stage 0
export const welcomeMessage = (req, res, next) => {
  res.send(`
    <h1>Hello Devfolio: GenAI Exchange Hackathon</h1>
  `);
};
// stage 2
export const checkTheProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageFilePath = req.file.path;
    const generatedResponse = await generatdResultResponse(imageFilePath);

    // console.log("Uploaded file:", imageFilePath);
    // console.log(generatedResponse);

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

// stage 1
// export const postContentText = async (req, res, next) => {
//   try {
//     const { promptText } = req.body;

//     if (!promptText) {
//       return res.status(400).json({ error: "Prompt text is required" });
//     }
//     const generatedContent = await generateContentWithText(promptText);

//     res.status(200).json({ text: generatedContent });
//   } catch (error) {
//     res.status(500).send({ error: "Error generating text content" });
//   }

//   next();
// };
