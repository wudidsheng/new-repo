"use client";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { useActionState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Ierror = {
  name?: string;
};

export default function Home() {
  const router = useRouter();
  const initialState: Ierror = {};

  const createAction = useCallback(
    (_prev: Ierror | undefined, formData: FormData): Ierror | undefined => {
      const createError: Ierror = {};
      const name = formData.get("name");
      if (!name) {
        createError.name = "请输入你的logo名称";
        return createError;
      }
      router.push(`/create?name=${name}`);
    },
    [router]
  );

  const [error, submitCreate, isPending] = useActionState<
    Ierror | undefined,
    FormData
  >(createAction, initialState);

  return (
    <div className="mt-32 flex flex-col items-center gap-5">
      <h1 className="text-5xl text-primary mb-4 font-bold">AI 图标制作器</h1>
      <h3 className="text-3xl mb-4 font-bold">利用AI生成你喜欢的图标</h3>
      <p className="text-xl text-gray-500">
        使用我们的 AI
        工具轻松制作独特而专业的图标。非常适合应用程序、企业、网站等！
      </p>
      <Form
        action={submitCreate}
        className="flex gap-3 w-full max-w-2xl mt-10 items-center"
      >
        <input
          name="name"
          id="start"
          placeholder="输入你的logo名称"
          className={`p-2 border-1 border-gray-100 rounded-md w-full hover:border-primary shadow-sm `}
        ></input>
        <Button
          id="start"
          className="cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          立即开始
        </Button>
      </Form>
      {error?.name && <span className="text-red-700">{error.name}</span>}`
    </div>
  );
}
