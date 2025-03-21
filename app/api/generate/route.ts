import { NextRequest } from "next/server";
import { z } from "zod";
import { getFreeImage, getFreeImageByToken } from "./utilt";

const schema = z.object({
  type: z.string(),
  description: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = schema.required().parse(body);
  const { type, description } = data;
  if (type === "free") {
    return Response.json(getFreeImage(description));
  } else {
    return Response.json(getFreeImageByToken(description));
  }
}
