"use client";
import React, { useCallback, useContext } from "react";
import { Inform } from "./LogoCard";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserContext } from "@/app/Provider";
import { Badge } from "@/components/ui/badge";

export const LOCAL_SAVE_KEY = "LOCAL_SAVE_KEY";
export default function LogoModel({ data }: { data: Inform }) {
  const { userInfo } = useContext(UserContext);

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
          <div className="text-xl pt-5 w-full text-left">
            GoogGemini生成 logo
          </div>
          <div className="text-xl pt-2 w-full text-left">只有 5 次</div>
          <div className="text-xl pt-2 w-full text-left">
            生成贴近你想法的图片
          </div>
          <div className="text-xl pt-2 pb-5 w-full text-left">
            有限的设计选项和质量
          </div>
          <SignedIn>
            <Link href={"/generate-logo?type=free"}>
              <Badge>
                <Button onClick={localSave} className="cursor-pointer">
                  立即开始
                </Button>{" "}
              </Badge>
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
          <div className="text-xl pt-2 w-full text-left">
          deerapi生成logo
          </div>
          <div className="text-xl pt-2 w-full text-left">只有 2 次</div>
          <div className="text-xl pt-5 w-full text-left">更加符合你想法</div>

          <div className="text-xl pt-2 pb-5 w-full text-left">
            更高的清晰度和质量
          </div>
          <SignedIn>
            <Link href={"/generate-logo?type=permium"}>
              <Badge>
                <Button className="cursor-pointer" onClick={localSave}>
                  立即开始
                </Button>
              </Badge>
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
