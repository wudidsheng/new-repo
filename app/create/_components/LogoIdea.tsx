"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Inform } from "./LogoCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ILoginItem } from "./LogonName";

function LogoIdea({
  formdata,
  change,
  defaultValue,
}: Pick<ILoginItem, "change"> & {
  formdata: Inform;
  defaultValue?: { name?: string; description?: string };
}) {
  const [idealist, setIdealist] = useState<
    { name: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchIdea = useCallback(async () => {
    setLoading(true);
    const request = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(formdata),
    });
    const idealist = await request.json();
    setLoading(false);
    setIdealist(idealist);
  }, [formdata]);

  useEffect(() => {
    fetchIdea();
  }, []);
  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl text-primary mb-5">logo设计方案</h1>
        <p>选择符合您愿景的设计风格，或跳过以接收随机建议。</p>
      </div>
      <div>
        {loading && (
          <div className="animate-bounce w-full text-center text-primary ">
            加载中...
          </div>
        )}
        <div className="grid grid-cols-3 gap-5 justify-center justify-self-center ">
          {idealist.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      change?.({ ideal: item });
                    }}
                    className={`${
                      defaultValue?.name === item.name && "border-red-500"
                    } border-2 shadow-md p-2 px-4 rounded-md text-xl  w-fit hover:border-red-500`}
                  >
                    {item.name}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(LogoIdea);
