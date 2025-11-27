'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Join() {
  return (
    <div className="why-join py-16">
      <div className="container-custom">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl choose-main-title font-bold text-gray-900 mb-4">
            Why Join Our <span className="text-[#EFBC08] choose-main-title">VEX GO Workshop?</span>
          </h1>
          <p className="text-lg choose-description leading-relaxed max-w-4xl mx-auto lg:mx-0">
            At STEPS Robotics, we believe education should be more than marks on a report card.
            <br />
            It should prepare children for the world they are about to inherit — a world powered by Artificial Intelligence, Machine Learning, and Robotics.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 h-[340px] lg:h-[505px]">
            <Image 
              src="/join.png" 
              alt="Join"
              className="w-full h-full object-contain"
              width={600}
              height={505}
              priority
            />
          </div>
          <div className="lg:col-span-6 space-y-8">
            {[
              {
                title: "Perfect for Beginners",
                desc: "VEX GO is designed for students aged 8–14 with modular parts that make robotics easy and enjoyable."
              },
              {
                title: "Learn by Building",
                desc: "Students assemble robots, explore mechanical designs, and understand how engineering works in everyday life."
              },
              {
                title: "Hands-On Coding & Problem Solving",
                desc: "Simple programming tasks help students build logic and analytical thinking while working on fun challenges."
              },
              {
                title: "Collaborative & Interactive",
                desc: "Team-based projects encourage communication, experimentation, and creative thinking."
              },
              {
                title: "Aligned with STEM Learning",
                desc: "Projects connect science and mathematics concepts with real-world applications, helping students excel in academics."
              },
            ].map((item, index) => (
              <div className="flex gap-3 mb-[20px]" key={index}>
                <ArrowRight className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="join-title font-bold stem-gold mb-1">{item.title}</h3>
                  <p className="join-description leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
