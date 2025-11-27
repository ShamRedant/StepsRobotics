"use client";
import React from "react";
import Image from "next/image";
import { BookOpen, Brain, Target } from "lucide-react";
import { Play, ArrowRight } from "lucide-react";

export default function Nap() {
  return (
    <div className="bg-white pt-[25px] pb-[65px] md:pb-[0px]  lg:pb-[0px] nep-section text-black pm-16 mt-5 relative overflow-hidden">
      <div className="container-custom">
          <h2 className="stem-education-title mb-3 leading-snug">
            National Education Policy Aligned{" "}
            <span className="stem-education-title text-[#f4b000]">by STEPS Robotics</span>
          </h2>
          <p className="course-model-title">In line with NEP 2020, STEPS Robotics equips students with Coding, AI and Robotics skills from Grade 6 onwards. Our curriculum turns policy into practical, hands-on learning inside real classrooms.</p>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-yellow-400 to-transparent rounded-full blur-3xl -top-20 -left-20"></div>
      </div>
      <div className="relative -mb-[30px] grid grid-cols-12 gap-8 items-center z-10">
        <div className="col-span-12 nap-image-section md:col-span-3 flex justify-center md:justify-start">
          <Image
            src="/nap-girl.png" 
            alt="Girl pointing"
            width={260}
            height={400}
            className="object-contain"
          />
        </div>
<div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
  <div className="flex flex-col items-center">
    <div className="relative mt-[40px] mb-4">
      <div className="absolute inset-0 bg-white rounded-2xl transform rotate-6 translate-x-5 -translate-y-1 shadow-md opacity-60"></div>
      <div className="absolute inset-0 bg-white rounded-2xl transform rotate-4 translate-x-4 shadow-md opacity-80"></div>
      <div className="relative bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 flex flex-col items-center transition-transform hover:scale-[1.03]">
        <Image
          src="/nap2020.png"
          alt="National Education Policy Book"
          width={220}
          height={280}
          className="rounded-lg mb-3"
        />
        <button className="bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] rounded-full shadow-md text-white text-sm font-semibold pl-5 pr-2 py-1 hover:opacity-90 transition flex items-center gap-2">
          View More 
          <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
            <ArrowRight className="w-4 h-4 text-black" />
          </div>
        </button>
      </div>
    </div>
    <Image
      src="/nap-robot.gif"
      alt="NAP Robot"
      width={220}
      height={280}
      className="object-contain"
    />
  </div>
</div>
<div className="col-span-12 mt-[-25px] ml-0 sm:mt-[-40px] sm:ml-[35px] md:col-span-6">
<p className="course-model-title mb-6 mt-0 md:mt-[40px]">
           The STEPS Robotics program brings the vision of India’s National Education Policy (NEP) to life by combining hands-on learning with the power of STEM — Science, Technology, Engineering, and Mathematics. Through exciting design, coding, and problem-solving activities, students explore how technology works while building creativity, confidence, and curiosity. STEPS Robotics helps learners think critically, innovate boldly, and develop the real-world skills needed for a future shaped by science and technology.
          </p>
          <div className="grid gap-1">
<div className="flex items-center space-x-3">
  <div className="text-white p-2 flex-shrink-0">
    <Image
      src="/engaing.svg"
      alt="NAP Robot"
      width={60}
      height={60}
      className="object-contain"
    />
  </div>

  <div className="flex flex-col justify-center">
    <h4 className="font-semibold nap-points text-[#2BB4AB]">
      Government Policy Aligned
    </h4>
    <p className="text-gray-600 nap-points-description text-sm">
      Completely aligned with NEP 2020 (Para 4.23–4.25) ensuring
      Coding, AI & Robotics from Grade 6 onwards.
    </p>
  </div>
</div>

<div className="flex items-center space-x-3">
  <div className="text-white p-2 flex-shrink-0">
    <Image
      src="/robot-eng.png"
      alt="NAP Robot"
      width={60}
      height={60}
      className="object-contain"
    />
  </div>

  <div className="flex flex-col justify-center">
    <h4 className="font-semibold nap-points text-[#FDB618]">
      Activity-Based Learning
    </h4>
    <p className="text-gray-600 nap-points-description text-sm">
      Students learn through hands-on projects and real-world
      robotics activities instead of theory-based learning.
    </p>
  </div>
</div>

<div className="flex items-center space-x-3">
  <div className="text-white p-2 flex-shrink-0">
    <Image
      src="/future.png"
      alt="NAP Robot"
      width={60}
      height={60}
      className="object-contain"
    />
  </div>

  <div className="flex flex-col justify-center">
    <h4 className="font-semibold nap-points text-[#87407F]">
      Future Skills for Every Student
    </h4>
    <p className="text-gray-600 nap-points-description text-sm">
      Builds creativity, problem-solving, and digital literacy to
      prepare learners for tomorrow’s AI-driven careers.
    </p>
  </div>
</div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
