import {
  VertexAI,
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
} from "@google-cloud/vertexai";
import { Storage } from "@google-cloud/storage";

import fs from "fs";
import path from "path";

//to be updated TODO:  for github secrets ,model bucketname, project name, location
const model = "gemini-1.5-flash-001";
const bucketName = "bucket-test-hackathon";

// // Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: "my-project-sept-2024",
  location: "us-central1",
});

// // Instantiate the models
export const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 50,
    temperature: 0.5,
    topP: 0.5,
  },

  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  // systemInstruction: {
  //   parts: [{ text: `Tell me about the image weather it is good or bad` }],
  // },
});
// // for cloud storage
// const storage = new Storage();
// async function fileExists(bucketName, fileName) {
//   const [files] = await storage
//     .bucket(bucketName)
//     .getFiles({ prefix: fileName });
//   return files.length > 0;
// }

// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//       mimeType,
//     },
//   };
// }

export const generateContentWithText = async (promptText) => {
  try {
    const req = {
      contents: [
        {
          role: "user",
          // parts: [{ text: `apple:what is it` }],
          parts: [{ text: promptText }],
        },
      ],
    };

    // ----------------------------------------
    // For nonstreamed Text Response
    // ----------------------------------------

    const nonStreamingResp = await generativeModel.generateContent(req);
    const response = nonStreamingResp.response;

    // Extract and log the value from candidates.content.parts.text using optional chaining
    const extractedText = response?.candidates
      ?.map((candidate) =>
        candidate?.content?.parts?.map((part) => part.text).join(" ")
      )
      .filter(Boolean)
      .join("\n");

    if (extractedText) {
      console.log("Extracted Text: ", extractedText);
      return `Extracted text for prompt  ${promptText} : ${extractedText}`;
    } else {
      console.log("No valid text found in the response.");
      return `No valid text found in the response for: ${promptText} `;
    }

    const extractedCandidatesTokenCount =
      response?.usageMetadata.candidatesTokenCount;
    const extractedPromptTokenCount = response?.usageMetadata.promptTokenCount;
    const extractedTotalTokenCount = response?.usageMetadata.totalTokenCount;
    console.log(
      `\n ---------------------------------------------------------- \n`
    );
    console.log(` 
       ExtractedPromptTokenCount :   ${extractedPromptTokenCount},
       ExtractedCandidatesTokenCount :  ${extractedCandidatesTokenCount},
       ExtractedTotalTokenCount :   ${extractedTotalTokenCount}
       `);
  } catch (error) {
    console.error("Error generating story:", error);
  }
};

// for the image

export const generatdResultResponse = async (promptText, filePath) => {
  // Logic to generate content using promptText and filePath
  try {
    const filePart = {
      // for images
      fileData: { fileUri: destinationUri, mimeType: "image/jpeg" },
      // for videos
      // fileData: { fileUri: destinationUri, mimeType: "video/mp4" },
    };
    const textPart = {
      text: "tell me about the image",
    };
    const req = {
      contents: [
        {
          role: "user",

          parts: [textPart, filePart],
        },
      ],
    };

    // ----------------------------------------
    // For nonstreamed Text Response
    // ----------------------------------------

    const nonStreamingResp = await generativeModel.generateContent(req);
    const response = nonStreamingResp.response;

    // Extract and log the value from candidates.content.parts.text using optional chaining
    const extractedText = response?.candidates
      ?.map((candidate) =>
        candidate?.content?.parts?.map((part) => part.text).join(" ")
      )
      .filter(Boolean)
      .join("\n");

    if (extractedText) {
      console.log("Extracted Text: ", extractedText);
      return `Extracted text for prompt  ${promptText} : ${extractedText}`;
    } else {
      console.log("No valid text found in the response.");
      return `No valid text found in the response for: ${promptText} `;
    }

    const extractedCandidatesTokenCount =
      response?.usageMetadata.candidatesTokenCount;
    const extractedPromptTokenCount = response?.usageMetadata.promptTokenCount;
    const extractedTotalTokenCount = response?.usageMetadata.totalTokenCount;
    console.log(
      `\n ---------------------------------------------------------- \n`
    );
    console.log(` 
       ExtractedPromptTokenCount :   ${extractedPromptTokenCount},
       ExtractedCandidatesTokenCount :  ${extractedCandidatesTokenCount},
       ExtractedTotalTokenCount :   ${extractedTotalTokenCount}
       `);
  } catch (error) {
    console.error("Error generating story:", error);
  }
};
