import React, { Suspense } from "react";
import { LogoCard } from "./_components/LogoCard";
import fs from "fs";
import path from "path";

export default function Create() {
  const dirPath = path.join(process.cwd(), "public/styles");
  const files = fs.readdirSync(dirPath);

  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 flex justify-center">
      <Suspense>
        <LogoCard files={files} />
      </Suspense>
    </div>
  );
}
