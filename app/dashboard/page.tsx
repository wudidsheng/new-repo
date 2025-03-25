"use client";
import React, { useContext, useEffect, useState } from "react";
import { ImageCard, IRecord } from "../_components/ImageCard";
import { useUser } from "@clerk/nextjs";
import { UserContext } from "../Provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const { userInfo } = useContext(UserContext);
  const { user } = useUser();
  const [imgList, setImagList] = useState<IRecord[]>([]);
  console.log(userInfo);
  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api?id=${user?.id}&limit=all`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setImagList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="p-4 overflow-auto max-h-[90vh] scrollbar-hide ">
      <div className="flex justify-between">
        <h1>你好 {user?.username}</h1>
        <Link href="/create">
          <Button>开始创建</Button>
        </Link>
      </div>
      <p className="text-gray-500  ">
        <span>
          你的GoogGemini可用额度为 &nbsp;
          <span className="text-red-400"> {userInfo?.integral}</span> &nbsp;次
        </span>
        <span>
          你的Gemini可用额度为 &nbsp;
          <span className="text-red-400"> {userInfo?.good}</span> &nbsp;次
        </span>
      </p>
      <div className="text-sm mb-3 border-b-1 py-3"></div>
      <h1 className="text-primary text-left leading-4 py-2">你已生成的图片</h1>
      <ImageCard list={imgList} />
    </div>
  );
}
