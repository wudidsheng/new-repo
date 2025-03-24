"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LOCAL_SAVE_KEY } from "../create/_components/LogoModel";
import { redirect, useSearchParams } from "next/navigation";
import { UserContext } from "../Provider";
import { Inform } from "../create/_components/LogoCard";

export default function Page() {
  const searchParams = useSearchParams();
  const { checkUser, userInfo } = useContext(UserContext);
  // const [loading, setLoading] = useState(false);

  const generateLogo = useCallback(async (description: string) => {
    const type = searchParams.get("type");
    const request = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ type, description }),
    });
    const data = await request.json();
    console.log(data);
  }, []);

  // 生成提示词语
  const generatePrompt = useCallback(async (body: Inform) => {
    const request = await fetch("/api/prompt", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const { prompt } = await request.json();
    if (prompt) generateLogo(prompt);
  }, []);

  useEffect(() => {
    if (!userInfo) {
      checkUser!();
      return;
    }
    const jsonFormData = localStorage.getItem(LOCAL_SAVE_KEY);
    // TODO:打开
    // localStorage.removeItem(LOCAL_SAVE_KEY);
    if (!jsonFormData) {
      return redirect("/");
    }
    const formData: Inform = JSON.parse(jsonFormData);
    generatePrompt(formData);
  }, [userInfo]);

  return <div>generate-log</div>;
}
