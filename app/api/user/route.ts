import { userCollection } from "@/db/user"
import { z } from "zod";

const schema = z.object({
    name: z.string().min(2, "名字至少需要 2 个字符"),
    email: z.string().email("请输入有效的 Email"),
    clerkId: z.string(),
    integral: z.number().optional()
});
export const POST = async (req: Request) => {
    const body = await req.json()

    try {
        const data = schema.parse(body);
        const { clerkId } = data;
        const hasUser = await userCollection.findOne({ clerkId })
        if (hasUser) {
            return Response.json(hasUser)
        }
        const user = await userCollection.insertOne(data)
        return Response.json(user)
    } catch (error) {
        return Response.json(error, { status: 500 })
    }
}
