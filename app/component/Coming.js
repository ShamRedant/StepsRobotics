import React from "react";
import Image from "next/image";

export default function Coming() {
  return (
    <div id="coursesection" className="w-full scroll-mt-[80px] md:scroll-mt-[100px]">
<div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[750px]">
        <Image
          src="/coursed_bg.jpg"
          alt="Coming Soon"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
