"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="layout p-4 flex items-center justify-between shadow-md ">
      <Link href="/" className="flex  items-center">
        <Image src="/logo.svg" alt="logo" height={60} width={30}></Image>
        <h3 className="text-3xl italic font-bold">AI-LOGO</h3>
      </Link>
      <div className="flex items-center gap-1.5">
        <SignedOut>
          <SignInButton fallbackRedirectUrl="/">
            <Button className="cursor-pointer ">登录</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="cursor-pointer">注册</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button className="cursor-pointer mr-3">Dashboard</Button>
          </Link>

          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
