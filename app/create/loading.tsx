"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex gap-2 flex-col mt-40 justify-center w-xl items-center">
      <h3>加载中....</h3>
      <span className="loader"></span>
    </div>
  );
}
