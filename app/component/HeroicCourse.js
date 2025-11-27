'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroicCourse() {
  const course = {
    heroictitle: 'Future-Ready Kids Start Here!',
    heroicimage: '/course-heroic.png', 
  };

  return (
    <div className="course-heroic container-spacing sm:h-[525px] mb-[25px] p-6">
      <div className="container-custom space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
          <div className="w-full h-full order-2 md:order-1">
            {course.heroicimage ? (
              <Image
                src={course.heroicimage}
                alt={course.heroictitle}
                width={600}
                height={484}
                className="course-heroic-image mt-[35px] rounded-lg"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
<div className="text-left sm:text-center order-1 md:order-2">
            <h2 className="course-heroic-title text-3xl font-semibold">
             Future-Ready Kids <br></br> Start Here!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

