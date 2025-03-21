import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp-image-generation",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function getFreeImage(data: string) {
  const chatSession = await model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(data);
  return result;
}

export async function getFreeImageByToken(data: string) {
  const request = await fetch("https://api.deerapi.com/v1/images/generations", {
    method: "POST",
    body: JSON.stringify({
      prompt: data,
      n: 1,
      model: "dall-e-3",
      size: "1024x1024",
    }),
    headers: {
      Authorization: `${process.env.DEERAPI}`,
    },
  });
  const result = await request.json();
  return result;
}
