"use client";
import React from "react";
import { ILoginItem } from "./LogonName";

export function LogonDescription({ defaultValue, change }: ILoginItem) {
  return (
    <>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo描述</h1>
        <p>分享您的想法、主题或灵感，以创建完美代表您的品牌或项目的图标。</p>
      </div>
      <input
        placeholder="请输入你的logo描述"
        defaultValue={defaultValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          change?.({ description: event.target.value });
        }}
        className="p-2 border-1 border-gray-100 rounded-md w-full hover:border-primary shadow-sm"
      ></input>
    </>
  );
}
