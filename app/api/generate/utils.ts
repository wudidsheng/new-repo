import fs from "fs";
import http from "http";
const apiKey = process.env.GEMINI_API_KEY;

export async function getFreeImage(data: string) {
  const response = await fetch(
    `https://proxyi.927367.xyz/proxy/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: data }],
          },
        ],
        generationConfig: { responseModalities: ["Text", "Image"] },
      }),
    }
  );
  const result = await response.json();
  for (const part of result.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      //图片生成完毕
      //TODO:文件命名
      fs.writeFileSync("./public/gemini-native-image.png", buffer);
    }
  }
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
      "Content-Type": "application/json",
      Authorization: `${process.env.DEERAPI_API_KEY}`,
    },
  });
  const result = await request.json();
  const image = result.data![0];
  http.get(image?.url, (res) => {
    let imgData = "";
    res.setEncoding("binary"); // 下载图片需要设置为 binary, 否则图片会打不开

    res.on("data", (chunk) => {
      imgData += chunk;
    });

    res.on("end", () => {
      fs.writeFileSync("./download.png", imgData, "binary");
      //TODO:文件命名
      return Promise.resolve("/");
    });
  });
}
