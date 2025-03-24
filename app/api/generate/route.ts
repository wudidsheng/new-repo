import { NextRequest } from "next/server";
import { z } from "zod";
import { getFreeImage, getFreeImageByToken } from "./utils";
import { auth } from "@clerk/nextjs/server";
import { userCollection } from "@/db/user";
const schema = z.object({
  type: z.string(),
  description: z.string(),
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userInfo = await userCollection.findOne({ clerkId: userId });
  const body = await req.json();
  const data = schema.required().parse(body);
  const { type, description } = data;

  if (type === "free") {
    if (userInfo?.integral <= 0) {
      return Response.json({ error: "体验次数已到上限" }, { status: 400 });
    }
    try {
      const data = await getFreeImage(description);
      return Response.json(data);
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  } else {
    if (userInfo?.good <= 0) {
      return Response.json({ error: "体验次数已到上限" }, { status: 400 });
    }
    try {
      const data = await getFreeImageByToken(description);
      return Response.json(data);
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  }
}
