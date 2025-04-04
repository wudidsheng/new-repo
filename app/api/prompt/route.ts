import { Inform } from "@/app/create/_components/LogoCard";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { getImageByType } from "./utils";
import crypto from "crypto";
let nexRequest = "";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000/", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "AI-logo", // Optional. Site title for rankings on openrouter.ai.
  },
});

const schema = z.object({
  name: z.string(),
  color: z.string(),
  style: z.string(),
  description: z.string().optional(),
  type: z.string(),
  ideal: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const requestHash = crypto.createHash("sha256", req).digest("hex");
  const body: Inform = await req.json();
  if (nexRequest === requestHash) {
    return new Response("server busy", { status: 500 });
  }
  nexRequest = requestHash;
  const data = schema.parse(body);

  const { name, color, style, description, type } = data;
  let word = `帮我生成一个提示词，用来生成一个张图片，请你描绘更多的细节给我，我提供了以下元素,图片的主体是${name},图片的描述是${description},图片的颜色是${color},图片风格是${style}`;
  if (data?.ideal?.description) {
    word = word + `我的构图思路是${data?.ideal?.description}`;
  }

  const completion = await client.chat.completions.create({
    model: "deepseek/deepseek-r1-distill-qwen-32b:free",
    messages: [
      {
        role: "user",
        content: "用中文回答",
      },
      {
        role: "user",
        content: `${word}`,
      },
      {
        role: "user",
        content: `返回内容翻译成英文,再用json格式返回。字段为prompt`,
      },
    ],
  });

  const choices = completion.choices[0]?.message?.content;
  const cleanedJson = choices!
    .replace(/^```json\n|\n```$/g, "")
    .replace(/\\"/g, '"');
  let prompt = "";
  try {
    const parsedData = JSON.parse(`${cleanedJson}`);
    prompt = parsedData.prompt;
  } catch (error) {
    console.log(error);
    const match = cleanedJson.match(/\{[\s\S]*?\}/);
    if (match?.[0]) {
      prompt = JSON.parse(match[0])?.prompt;
    }
  }
  if (!prompt) return Response.json({ error: "解析出错" }, { status: 400 });
  const ResPonseData = await getImageByType(
    type,
    prompt,
    userId,
    name,
    description || "暂无无描述"
  );
  nexRequest = "";
  return ResPonseData;
}
