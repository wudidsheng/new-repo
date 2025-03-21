import { Inform } from "@/app/create/_components/LogoCard";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

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
  ideal: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});
export async function POST(req: NextRequest) {
  const body: Inform = await req.json();
  const data = schema.parse(body);
  console.log(data);
  debugger;
  const { name, color, style, description, ideal } = data;
  let word = `帮我生成一个提示词，用来生成一个张图片，请你描绘更多的细节给我，我提供了以下元素,图片的主体是${name},图片的描述是${description},图片的颜色是${color},图片风格是${style}`;
  if (ideal?.description) {
    word = word + `我的构图思路是${ideal?.description}`;
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
        content: `用json格式返回。字段为prompt`,
      },
    ],
  });
  try {
    const choices = completion.choices[0]?.message?.content;
    const cleanedJson = choices!
      .replace(/^```json\n|\n```$/g, "")
      .replace(/\\"/g, '"');
    const parsedData = JSON.parse(cleanedJson);
    return Response.json(parsedData);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
