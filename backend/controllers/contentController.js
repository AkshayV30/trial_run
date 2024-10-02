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

    // Process the prompt and generate content
    // const generatedContent = `Generated content for: ${promptText}`;

    res.status(200).json({ text: generatedContent });
  } catch (error) {
    res.status(500).send({ error: "Error generating text content" });
  }
};

export const genratedResult = async (req, res, next) => {
  try {
    const { promptText } = req.body;
    // const generatedResponse = await generateContentWithText(promptText);
    // res.status(200).send({ data: generatedResponse });
    res.status(200).send("done get");
  } catch (error) {
    res.status(500).send({ error: "Error retriveing text content" });
  }
};

// export const generateContentImage = async (req, res) => {
//   try {
//     const { promptText, filePath } = req.body;
//     const generatedResponse = await generateContentWithFile(
//       promptText,
//       filePath
//     );
//     res.status(200).send({ data: generatedResponse });
//   } catch (error) {
//     res.status(500).send({ error: "Error generating image content" });
//   }
// };
