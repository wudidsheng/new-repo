import React from "react";
import { Inform } from "./LogoCard";

export default function LogoModel({ data }: { data: Inform }) {
  console.log(data);
  return (
    <>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo生成模型</h1>
        <p>选择符合您愿景的设计风格，或跳过以接收随机建议。</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2"></div>
    </> 
  );
}
