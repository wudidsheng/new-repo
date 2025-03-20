"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { LogonName } from "./LogonName";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogonDescription } from "./LogonDescription";
import { LogoColor } from "./LogoColor";
import { LogoStyle } from "./LogoStyle";
import LogoIdea from "./LogoIdea";
import LogoModel from "./LogoModel";

export type Inform = {
  name?: string;
  description?: string;
  color?: string;
  style?: string;
  ideal?: {
    name?: string;
    description?: string;
  };
};
export function LogoCard({ files }: { files: string[] }) {
  const searchParams = useSearchParams();
  const [formdata, setFormdata] = useState<Inform>({
    name: searchParams.get("name")!,
    color: "#ffffff",
    style: files[0].split(".")[0],
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string>("");

  const prevHandle = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep === 1) return prevStep;
      return prevStep - 1;
    });
  }, []);

  const nextHandle = useCallback(() => {
    switch (step) {
      case 1:
        if (!formdata.name) return setError("logo名称不能为空");
        break;
      case 2:
        if (!formdata.description) return setError("logo描述不能为空");
        break;
      case 3:
        if (!formdata.color) return setError("logo颜色不能为空");
        break;
      case 4:
        if (!formdata.style) return setError("logo图片样式不能为空");
        break;
      default:
        break;
    }
    setStep((prevStep) => {
      if (prevStep === 6) return prevStep;
      return prevStep + 1;
    });
  }, [
    formdata.color,
    formdata.description,
    formdata.name,
    formdata.style,
    step,
  ]);

  const changeFormData = useCallback(
    (data?: Record<string, string | Record<string, string>>) => {
      setError("");
      setFormdata((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const formItem = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <LogonName defaultValue={formdata.name!} change={changeFormData} />
        );
      case 2:
        return (
          <LogonDescription
            defaultValue={formdata.description!}
            change={changeFormData}
          />
        );
      case 3:
        return (
          <LogoColor defaultValue={formdata.color!} change={changeFormData} />
        );
      case 4:
        return (
          <LogoStyle
            files={files}
            defaultValue={formdata.style}
            change={changeFormData}
          />
        );
      case 5:
        return (
          <LogoIdea
            formdata={formdata}
            change={changeFormData}
            defaultValue={formdata.ideal}
          />
        );
      case 6:
        return <LogoModel />;
      default:
        return null;
    }
  }, [changeFormData, files, formdata, step]);

  return (
    <div className="border rounded-md max-w-4xl  p-8 w-full mt-26 xl:mt-40 2xl:mt-50 ">
      {formItem}
      {error && <div className="mt-2 text-red-300 text-left">{error}</div>}
      <div className="flex justify-between mt-5 lg:mt-8 xl:mt-10 2xl:mt-12">
        {step > 1 && step !== 6 && (
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={prevHandle}
          >
            <ChevronLeft />
            上一步
          </Button>
        )}
        {step !== 6 && (
          <Button className="cursor-pointer" onClick={nextHandle}>
            <ChevronRight />
            下一步
          </Button>
        )}
      </div>
    </div>
  );
}
