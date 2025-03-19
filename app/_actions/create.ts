import { redirect } from "next/navigation";

export type Ierror = {
    name?: string
}

export const createAction = async (_prev: Ierror, formData: FormData): Promise<Ierror> => {
    const createError: Ierror = {};
    const name = formData.get("name");
    if (!name) {
        createError.name = '请输入你的logo名称'
        return createError;
    }
    redirect(`/create?name=${name}`)

}