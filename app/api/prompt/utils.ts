import { currentUser } from "@clerk/nextjs/server";
import fs from "fs";
import https from "https";
import path from "path";
import crypto from "crypto";
import { recordCollection } from "@/db/record";
import { userCollection } from "@/db/user";
const apiKey = process.env.GEMINI_API_KEY;

async function downloadFile(url: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(new URL(url).pathname);
    const pathName = `${outputPath}${ext}`;
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      console.error("File not found:", pathName);
    }
    const file = fs.createWriteStream(`${pathName}`);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          console.error(`下载失败，状态码: ${response.statusCode}`);
          reject(response);
        }

        response.pipe(file);

        file.on("finish", () => {
          console.log(file);
          file.close();
          resolve(file);
        });
      })
      .on("error", (err) => {
        console.error(`下载出错: ${err.message}`);
        reject(err);
      });
  });
}

export async function getFreeImage(
  data: string,
  name: string,
  description: string
) {
  const user = await currentUser();
  if (!fs.existsSync(`./public/${user!.id}`)) {
    fs.mkdirSync(`./public/${user!.id}`, { recursive: true });
  }

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
      const imageName =
        crypto.createHash("sha256", imageData).digest("hex") + Date.now();
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync(`./public/${user!.id}/${imageName}.png`, buffer);
      // 更新用户信息
      await userCollection.updateOne(
        { clerkId: user?.id },
        {
          $inc: { integral: -1 },
        }
      );
      await recordCollection.insertOne({
        clerkId: user?.id,
        imageName: `/${user!.id}/${imageName}.png`,
        name: name,
        description: description,
      });
      return { data: `/${user!.id}/${imageName}.png` };
    }
  }
  return { error: "图片生成错误" };
}

export async function getFreeImageByToken(
  data: string,
  name: string,
  description: string
) {
  const user = await currentUser();
  if (!fs.existsSync(`./public/${user!.id}`)) {
    fs.mkdirSync(`./public/${user!.id}`, { recursive: true });
  }

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

  if (image?.url) {
    const imageName =
      crypto.createHash("sha256").update(image.url).digest("hex").slice(0, 24) +
      Date.now();
    const ext = path.extname(new URL(image?.url).pathname);
    const pathName = `/${user!.id}/${imageName}${ext}`;
    const file = await downloadFile(
      image?.url,
      `./public/${user!.id}/${imageName}`
    );
    console.log(file?.path, "===");
    // 更新用户信息
    await userCollection.updateOne(
      { clerkId: user?.id },
      {
        $inc: { good: -1 },
      }
    );
    await recordCollection.insertOne({
      clerkId: user?.id,
      imageName: pathName,
      name: name,
      description: description,
    });
    return { data: file };
  }

  return { error: "图片生成错误" };
}

export async function getImageByType(
  type: string,
  prompt: string,
  userId: string,
  name: string,
  description: string
) {
  const userInfo = await userCollection.findOne({ clerkId: userId });
  if (type === "free") {
    if (userInfo?.integral <= 0) {
      return Response.json({ error: "体验次数已到上限" }, { status: 400 });
    }
    try {
      const data = await getFreeImage(prompt, name, description);
      return Response.json(data);
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  } else {
    if (userInfo?.good <= 0) {
      return Response.json({ error: "体验次数已到上限" }, { status: 400 });
    }
    try {
      const data = await getFreeImageByToken(description, name, description);
      return Response.json(data);
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  }
}
