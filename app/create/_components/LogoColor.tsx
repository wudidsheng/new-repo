import React from "react";
import { ILoginItem } from "./LogonName";

export function LogoColor({ defaultValue, change }: ILoginItem) {
  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo颜色</h1>
        <p>选择能够反映您的品牌个性并留下持久印象的颜色。</p>
      </div>
      <div className="flex justify-center  ">
        <input
          type="color"
          defaultValue={defaultValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            change?.({ color: event.target.value });
          }}
          placeholder="请选择你喜欢的颜色"
          className="w-full max-w-xl  h-15 border-1 p-2 shadow-2xl"
        />
      </div>
    </div>
  );
}
