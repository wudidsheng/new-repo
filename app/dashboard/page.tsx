"use client";
import React, { useEffect, useState } from "react";
import { ImageCard, IRecord } from "../_components/ImageCard";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();
  const [imgList, setImagList] = useState<IRecord[]>([]);

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
      <h1 className="text-primary text-left leading-4 p-4">你已生成的图片</h1>
      <ImageCard list={imgList} />
    </div>
  );
}
