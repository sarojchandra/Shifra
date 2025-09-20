let apikey = string(import.meta.env.VITE_API_KEY)

import { GoogleGenAI } from "@google/genai";

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: apikey,
  });
  const tools = [
    {
      googleSearch: {},
    },
  ];
  const config = {
    tools,
  };
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${prompt}. Answer in maximum 20 words only.`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let finalText = "";
  for await (const chunk of response) {
    if (chunk.text) {
      finalText += chunk.text;
    }
  }
  return finalText;
}

export default main;
