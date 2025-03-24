"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LOCAL_SAVE_KEY } from "../create/_components/LogoModel";
import { redirect, useSearchParams } from "next/navigation";
import { UserContext } from "../Provider";
import { Inform } from "../create/_components/LogoCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  const searchParams = useSearchParams();
  const { checkUser, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  // 生成提示词语
  const generatePrompt = useCallback(async (body: Inform) => {
    const type = searchParams.get("type");
    setLoading(true);
    try {
      const request = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({ ...body, type }),
      });

      if (`${request.status}` !== "200") {
        // 尝试获取服务器返回的错误消息
        const errorMessage = await request.text();
        throw new Error(`HTTP ${request.status}: ${errorMessage}`);
      }
      const { data } = await request.json();
      setImgUrl(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError((error as { message: string })!.message);
    } finally {
      setLoading(false);
      // localStorage.removeItem(LOCAL_SAVE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      checkUser!();
      return;
    }
    const jsonFormData = localStorage.getItem(LOCAL_SAVE_KEY);
    if (!jsonFormData) {
      return redirect("/");
    }
    const formData: Inform = JSON.parse(jsonFormData);
    generatePrompt(formData);
  }, [userInfo]);

  function downloadImage(imageUrl: string) {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = imageUrl; // 设置下载的文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <div className="flex  justify-center items-center ">
      {loading && (
        <div className="flex gap-2 flex-col mt-40 justify-center w-xl items-center">
          <h3>加载中....</h3>
          <span className="loader"></span>
        </div>
      )}
      {error && !loading && <h3 className="mt-10 text-red-400">{error}</h3>}
      {imgUrl && !loading && (
        <div className="flex flex-col gap-5 justify-center items-center">
          <Image
            src={imgUrl}
            width={500}
            height={500}
            alt="logo"
            className="mt-5"
          />
          <Button
            className="cursor-pointer w-xs"
            onClick={() => {
              downloadImage(imgUrl);
            }}
          >
            下载图片
          </Button>
        </div>
      )}
    </div>
  );
}
