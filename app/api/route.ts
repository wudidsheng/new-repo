import { recordCollection } from "@/db/record";
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
});
export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = schema.required().parse(body);
  const { name, color, style, description } = data;
  const completion = await client.chat.completions.create({
    model: "deepseek/deepseek-r1-distill-qwen-32b:free",
    messages: [
      {
        role: "user",
        content: "用中文回答",
      },
      {
        role: "user",
        content: `帮我想7个创作${name}图片的灵感,图片是${description},图片颜色为${color},图片风格为${style}。并且用json格式返回。name创意名称,description为创意描述`,
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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (id) {
    const myData = await recordCollection
      .find({ clerkId: id })
      .sort({ _id: -1 });
    return Response.json(myData);
  }
  const data = await recordCollection.find({}).limit(12).sort({ _id: -1 });
  return Response.json(data);
}
