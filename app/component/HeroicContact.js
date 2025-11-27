'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroicContact() {
  const course = {
    id: 4,
    heroictitle: 'Future-Ready Kids Started Here!',
    heroicimage: '/contact_img.png',
  };

  return (
    <div className="contacts container-spacing p-6">
      <div className="container-custom space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
          <div className="w-full h-full order-2 md:order-1">
            {course.heroicimage ? (
              <Image
                src={course.heroicimage}
                alt={course.heroictitle || 'Course image'}
                width={600}
                height={484}
                className="contact-heroic-image rounded-lg"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="text-left order-1 md:order-2">
            <h2 className="heroic-title text-3xl font-semibold">
              Future-Ready Kids <br></br> Started Here!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
