"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LOCAL_SAVE_KEY } from "../create/_components/LogoModel";
import { redirect, useSearchParams } from "next/navigation";
import { UserContext } from "../Provider";
import { Inform } from "../create/_components/LogoCard";

export default function Page() {
  const searchParams = useSearchParams();
  const { checkUser, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  console.log(searchParams.get("type"), "===searchParams==");
  // 生成提示词语
  const generatePrompt = useCallback(async (body: Inform) => {
    setLoading(true);
    const request = await fetch("/api/prompt", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const { prompt } = await request.json();
    console.log(prompt);
  }, []);

  useEffect(() => {
    if (!userInfo) {
      return checkUser!();
    }
    if (window) {
      const jsonFormData = localStorage.getItem(LOCAL_SAVE_KEY);
      localStorage.removeItem(LOCAL_SAVE_KEY);
      if (!jsonFormData) {
        return redirect("/");
      }
      const formData: Inform = JSON.parse(jsonFormData);
      generatePrompt(formData);
    }
  }, []);

  return <div>generate-log</div>;
}
