import { Button } from "@/components/ui/button";
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

      <Button className="cursor-pointer">立即开始</Button>
    </div>
  );
}

export default Header;
