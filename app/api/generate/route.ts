import { NextRequest } from "next/server";
import { z } from "zod";
import { getFreeImage, getFreeImageByToken } from "./utils";

const schema = z.object({
  type: z.string(),
  description: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = schema.required().parse(body);
  const { type, description } = data;

  if (type === "free") {
    try {
      const data = await getFreeImage(description);
      return Response.json(data);
    } catch (error) {
      console.log(error)
      return Response.json(error, { status: 400 });
    }
  } else {
    const data = await getFreeImageByToken(description);
    return Response.json(data);
  }
}
