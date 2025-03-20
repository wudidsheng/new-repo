"use client";
import React from "react";

export interface ILoginItem {
  defaultValue?: string;
  change?: (data?: Record<string, string | Record<string, string>>) => void;
}
export function LogonName({ defaultValue, change }: ILoginItem) {
  return (
    <>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo名称</h1>
        <p>添加您的企业、应用程序或网站名称以用于自定义图标</p>
      </div>
      <input
        placeholder="请输入你的logo名称"
        className="p-2 border-1 border-gray-100 rounded-md w-full hover:border-primary shadow-sm"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          change?.({ name: e.target.value });
        }}
        defaultValue={defaultValue!}
      ></input>
    </>
  );
}
