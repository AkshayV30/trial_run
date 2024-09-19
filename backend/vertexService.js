// import {
//   VertexAI,
//   FunctionDeclarationSchemaType,
//   HarmBlockThreshold,
//   HarmCategory,
// } from "@google-cloud/vertexai";
// import { Storage } from "@google-cloud/storage";

// import fs from "fs";
// import path from "path";

// const model = "gemini-1.5-flash-001";
// const bucketName = "bucket-test-hackathon";

// // Initialize Vertex with your Cloud project and location
// const vertex_ai = new VertexAI({
//   project: "my-project-sept-2024",
//   location: "us-central1",
// });

// // Instantiate the models
// const generativeModel = vertex_ai.preview.getGenerativeModel({
//   model: model,
//   generationConfig: {
//     maxOutputTokens: 1000,
//     temperature: 0.5,
//     topP: 0.5,
//   },

//   safetySettings: [
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ],
// });
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

// export async function generateContent(promptText, filePath) {
//   // const textPrompt = "Describe this image.";
//   // const imagePath = "./testImage.jpeg";
//   // const filePart = fileToGenerativePart(imagePath, "image/jpeg");

//   const localFilePath = "./resources/Screenshot.jpeg";
//   // const localFilePath = "./GreatRedSpot.mp4";
//   const fileName = path.basename(localFilePath);
//   const destinationUri = `gs://${bucketName}/${fileName}`;

//   try {
//     const fileInBucketExists = await fileExists(bucketName, fileName);

//     // Upload file if it does not exist
//     if (!fileInBucketExists) {
//       const startTime = Date.now();

//       // Track upload progress
//       const uploadProgressInterval = setInterval(() => {
//         const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//         console.log(`Uploading... Time elapsed: ${elapsedTime} seconds`);
//       }, 1000);

//       // Upload file and get the URI
//       await storage.bucket(bucketName).upload(localFilePath, {
//         destination: fileName,
//       });

//       clearInterval(uploadProgressInterval);
//       console.log(`File uploaded to ${destinationUri}`);
//     } else {
//       console.log(`File already exists at ${destinationUri}`);
//     }

//     const filePart = {
//       // for images
//       fileData: { fileUri: destinationUri, mimeType: "image/jpeg" },
//       // for videos
//       // fileData: { fileUri: destinationUri, mimeType: "video/mp4" },
//     };
//     const textPart = {
//       text: "optimize the missing dimesion in order to manufacture the part, and create cnc machine gcode",
//     };

//     const req = {
//       contents: [
//         {
//           role: "user",
//           //  parts: [ {   text: `tell me about yourself`,     }, ],

//           // parts: [{ text: textPrompt }, filePart],

//           parts: [textPart, filePart],
//         },
//       ],
//     };

//     // ----------------------------------------
//     // For streamed Text Response
//     // ----------------------------------------

//     // const streamingResp = await generativeModel.generateContentStream(req);

//     // // const aggregatedResponse = await streamingResp.response;
//     // let aggregatedResponse = "";

//     // for await (const item of streamingResp.stream) {
//     //   // console.log("stream chunk: ", JSON.stringify(item));

//     //   if (item.candidates && item.candidates.length > 0) {
//     //     const content = item.candidates[0].content.parts
//     //       .map((part) => part.text)
//     //       .join("");
//     //     // process.stdout.write(`Model: ${content}\n`);
//     //     // process.stdout.write(`${content}\n`);
//     //     aggregatedResponse += content;
//     //   }
//     //   // if (item.candidates[0].safetyRatings) {
//     //   //   const safetyRatings = item.candidates[0].safetyRatings
//     //   //     .map((rating) => {
//     //   //       return `${rating.category
//     //   //         .replace("HARM_CATEGORY_", "")
//     //   //         .replace("_", " ")}: Probability - ${
//     //   //         rating.probability
//     //   //       }, Severity - ${rating.severity}`;
//     //   //     })
//     //   //     .join("\n");
//     //   //   // process.stdout.write(`Safety Ratings:\n${safetyRatings}\n\n`);
//     //   // }
//     // }

//     // // console.log("aggregated response: ", JSON.stringify(aggregatedResponse));

//     //process.stdout.write(`| Aggregated Response |  \n\n ${aggregatedResponse}\n`);

//     // ----------------------------------------
//     // For nonstreamed Text Response
//     // ----------------------------------------

//     const nonStreamingResp = await generativeModel.generateContent(req);
//     const response = nonStreamingResp.response;
//     // console.log("Response: ", JSON.stringify(response));

//     // Extract and log the value from candidates.content.parts.text using optional chaining
//     const extractedText = response?.candidates
//       ?.map((candidate) =>
//         candidate?.content?.parts?.map((part) => part.text).join(" ")
//       )
//       .filter(Boolean)
//       .join("\n");

//     // Optional Chaining (?.): This ensures that if any property is undefined or null, it safely bypasses errors.
//     // map and join: Collects all text parts into one string per candidate and then joins them into one final string.
//     // filter(Boolean): Removes any undefined or empty candidates from the result.
//     // Conciseness: It makes the code more concise and avoids deeper nesting of conditionals.

//     if (extractedText) {
//       console.log("Extracted Text: ", extractedText);
//     } else {
//       console.log("No valid text found in the response.");
//     }

//     const extractedCandidatesTokenCount =
//       response?.usageMetadata.candidatesTokenCount;
//     const extractedPromptTokenCount = response?.usageMetadata.promptTokenCount;
//     const extractedTotalTokenCount = response?.usageMetadata.totalTokenCount;
//     console.log(
//       `\n ---------------------------------------------------------- \n`
//     );
//     console.log(`
//       ExtractedPromptTokenCount :   ${extractedPromptTokenCount},
//       ExtractedCandidatesTokenCount :  ${extractedCandidatesTokenCount},
//       ExtractedTotalTokenCount :   ${extractedTotalTokenCount}
//       `);

//     // Append the extracted text to a file
//     // if (extractedText) {
//     //   fs.appendFile(
//     //     "generated_responses.txt",
//     //     `${extractedText}\n\n`,
//     //     (err) => {
//     //       if (err) {
//     //         console.error("Error appending to file: ", err);
//     //       } else {
//     //         console.log("Response successfully appended to file.");
//     //       }
//     //     }
//     //   );
//     // }
//   } catch (error) {
//     console.error("Error generating story:", error);
//   }
// }

// generateContent();
