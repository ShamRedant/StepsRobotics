"use client";
import React from "react";
import Image from "next/image";

export default function Choose() {
  const features = [
    {
      icon: "/activity.png",
      title: "Engaging activities that make learning fun",
      description:
        "Interactive tasks that spark curiosity and keep students excited to learn.",
    },
    {
      icon: "/safe.png",
      title: "Safe, supportive, and interactive environment",
      description:
        "A nurturing space where students feel confident to explore and experiment.",
    },
    {
      icon: "/build.png",
      title: "Builds confidence, creativity, and STEM readiness",
      description:
        "Hands-on experiences that boost problem-solving, imagination, and technical skills.",
    },
    {
      icon: "/challenge.png",
      title: "Encourages and students for future challenges",
      description:
        "Empowers learners to tackle real-world problems with resilience and innovation.",
    },
  ];

  return (
    <div className="choose-section py-[40px] md:py-[55px] lg:py-[70px]">
      <div className="container-custom">
        <div className="mb-11 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold choose-main-title mb-4">
            Why Choose STEPS Robotics{" "}
            <span className="stem-gold choose-main-title">with VEX GO?</span>
          </h1>
          <p className="choose-description leading-relaxed max-w-5xl mx-auto lg:mx-0">
            The integration of AI Connect in academics has revolutionized the
            way students learn and understand complex concepts of Artificial
            Intelligence and Machine Learning. AI Connect provides easy,
            accessible, and approach-based learning solutions for young kids
            globally.
          </p>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 lg:[grid-template-columns:40%_60%] gap-12 items-start">
          <div className="relative inline-block">
            <div className="choose-robot-img w-full h-full">
              <Image
                src="/chosse_robot_bg.png"
                alt="Teacher and student with VEX GO robot"
                className="w-full h-full object-cover rounded-2xl"
                width={450}
                height={497}
                priority
              />
            </div>
          </div>
          <div className="space-y-6 flex flex-col justify-center py-[60px]">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4 bg-white p-[16px] rounded-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-lg p-1">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="choose-points-main mb-1 font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="choose-points-description leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Yellow Box */}
                {(index === 1 || index === 3) && (
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-yellow-400 rounded-tl-[60px] -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
