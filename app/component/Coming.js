import React from "react";
import Image from "next/image";

export default function Coming() {
  return (
    <div className="w-full">
<div className="relative mt-[100px] w-full min-h-[300px] sm:min-h-[400px] md:min-h-[750px]">
        <Image
          src="/come.jpg"
          alt="Coming Soon"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
