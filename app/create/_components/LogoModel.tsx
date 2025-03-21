"use client";
import React, { useCallback, useEffect } from "react";
import { Inform } from "./LogoCard";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LOCAL_SAVE_KEY = "LOCAL_SAVE_KEY";
export default function LogoModel({ data }: { data: Inform }) {
  const localSave = useCallback(() => {
    localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo生成模型</h1>
        <p>使用您最喜欢的模型生成Logo</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        <div className="border-1 border-gray-200 p-4 flex flex-col items-center rounded-xl gap-3 ">
          <Image src={"/free.svg"} alt="free" width={60} height={60}></Image>
          <div className="text-xl pt-5 w-full text-left">免费生成 logo</div>
          <div className="text-xl pt-2 w-full text-left">等待时间更长</div>
          <div className="text-xl pt-2 w-full text-left">
            等待时间:30 秒到 3 分钟
          </div>
          <div className="text-xl pt-2 pb-5 w-full text-left">
            有限的设计选项和质量
          </div>
          <SignedIn>
            <Link href={"/generate-logo?type=free"}>
              <Button onClick={localSave} className="cursor-pointer">
                立即开始
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/generate-logo">
              <Button onClick={localSave} className="cursor-pointer">
                前往登陆
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
        <div className="border-1 border-gray-200 p-4 flex flex-col items-center rounded-xl gap-3 ">
          <Image
            src={"/permium.svg"}
            alt="permium"
            height={60}
            width={60}
          ></Image>
          <div className="text-xl pt-5 w-full text-left">更短的等待时间</div>
          <div className="text-xl pt-2 w-full text-left">
            等待时间:小于 10 秒
          </div>
          <div className="text-xl pt-2 w-full text-left">只有 5 次</div>
          <div className="text-xl pt-2 pb-5 w-full text-left">
            更高的清晰度和质量
          </div>
          <SignedIn>
            <Link href={"/generate-logo?type=permium"}>
              <Button className="cursor-pointer" onClick={localSave}>
                立即开始
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/generate-logo">
              <Button className="cursor-pointer" onClick={localSave}>
                前往登陆
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
