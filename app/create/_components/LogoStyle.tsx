"use client";
import React from "react";
import Image from "next/image";
import { ILoginItem } from "./LogonName";

export function LogoStyle({
  files,
  defaultValue,
  change,
}: { files: string[] } & ILoginItem) {
  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo样式</h1>
        <p>选择能够反映您的品牌个性并留下持久印象的样式。</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {files.map((item) => (
          <div
            key={item}
            className="relative cursor-pointer"
            onClick={() => {
              change?.({ style: `${item.split(".")[0]}` });
            }}
          >
            <Image
              src={`/styles/${item}`}
              width={200}
              height={200}
              alt={item}
              className={`p-1 hover:border-2 hover:border-red-600 backdrop-blur-none ${
                `${defaultValue}` == `${item.split(".")[0]}` &&
                "border-red-600 border-2"
              }`}
            />
            <div className=" absolute top-[50%] left-[50%] translate-x-[-100%] translate-y-[-100%] bg-white rounded-sm p-1 text-black">
              {item.split(".")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
