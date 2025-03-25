import Image from "next/image";
import React from "react";

export interface IRecord {
  _id: string;
  clerkId: string;
  imageName: string;
  name: string;
  description: string;
}

export function ImageCard({ list }: { list: IRecord[] }) {
  return (
    <div className={`flex flex-wrap gap-8`}>
      {list?.map((item) => (
        <div
          key={item.imageName}
          className="flex w-50 flex-col gap-2 border-2 shadow-md cursor-pointer"
          onClick={() => window.open(item.imageName)}
        >
          <Image
            src={item.imageName}
            alt={item.name}
            width={400}
            height={200}
            className="h-30 flex-1 object-cover min-w-20"
          />
          <h1 className="text-center text-sm text-primary ">{item.name}</h1>
          <p
            className="text-center text-[12px] mb-2 text-gray-500 truncate w-full"
            title={item.description}
          >
            {item.description}
          </p>
        </div>
      ))}
      {!list.length && <></>}
    </div>
  );
}
