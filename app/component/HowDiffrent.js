import React from 'react';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { Play, ArrowRight } from "lucide-react";


export default function HowDifferent() {
  const stepsFeatures = [
    'Hands-on Learning: Robotics, Coding & Electronics',
    'Block Programming & Coding for Kids',
    'Circuit Design & Electronics Lab',
    'Python & AI Introduction for Kids',
    'IoT & Robotics Integration Projects',
    'Mechanical Design & Robot Assembly Workshops'
  ];

  const otherFeatures = [
    'Hands-on Learning: Robotics, Coding & Electronics',
    'Block Programming & Coding for Kids',
    'Circuit Design & Electronics Lab',
    'Python & AI Introduction for Kids',
    'IoT & Robotics Integration Projects',
    'Mechanical Design & Robot Assembly Workshops'
  ];

  const galleryImages = [
    '/gallery-profile.png',
    '/gallery-profile.png',
    '/gallery-profile.png',
    '/gallery-profile.png',
    '/gallery-profile.png',
    '/gallery-profile.png'
  ];

  return (
<div className="container-custom mx-auto pt-8 -mt-[20px] how-diffrent-others">
        <div className="mb-5">
        <h2 className="course-details-black mb-4">
          How are we <span className="course-details-gold w-[60%]">Different from Others?</span>
        </h2>
        <p className="text-gray-600 mb-10 max-w-4xl text-sm how-diffrent-others-description w-[68%]">
          Our STEPS Robotics program offers a unique, hands-on offline learning experience that integrates 
          Robotics, Coding, Electronics, and STEM concepts — designed to build real-world skills beyond 
          traditional classes.
        </p>
        <div className="grid md:grid-cols-3 gap-2">
         <div className="rounded-[40px] steps-robotics-points -ml-[0px] sm:-ml-[20px] pt-[17px]  pb-[10px] relative overflow-hidden">
  <div className="absolute top-[45px] ml-[22px] -mr-[21px] -mt-[7px] right-[65px] text-7xl  text-black opacity-20 z-10 pointer-events-none steps-robotics-robot"> 
    <Image 
                src="/stepsanim.gif" 
                alt="StepsAnim"
                className="object-contain"
                width={50}
                height={50}
                priority
              /></div>
<div
  className="diffrent-section px-[11px] !py-[40px] sm:!px-[12px] sm:!pb-[52px] relative flex flex-col justify-start items-start shadow-sm"
  style={{
    background: "#fff",
    clipPath: "polygon(0 0, 40% 0, 100% 38%, 100% 100%, 0 100%, 0 0)",
    borderRadius: "16px",
  }}
>
    <h3 className="steps-robotics-points-titile mb-[50px]">STEPS<br />Robotics</h3>
    <div className="space-y-3 diffrent-bullets">
      {stepsFeatures.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="bg-green-500 rounded-full p-1 mt-0.5 flex-shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="feature-font leading-relaxed">{feature}</span>
        </div>
      ))}
    </div>
  </div>
</div>
          <div className="rounded-[40px] steps-robotics-others pt-[17px]  pb-[10px] relative overflow-hidden">
             <div className="diffrent-section shadow-sm !px-[11px] !py-[40px] sm:!px-[12px] sm:!pb-[52px] ">
            <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              Robotics
            </div>
            <h3 className="steps-robotics-points-titile mb-[50px] text-black">Other<br />Classes</h3>
            <div className="space-y-3 diffrent-bullets">
              {otherFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-red-700 rounded-full p-1 mt-0.5 flex-shrink-0">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span className="feature-font text-black leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
  <div className="relative mt-0 sm:-mt-[180px] ml-0 sm:ml-[15px] feature-course-review rounded-2xl p-6 border-2 border-yellow-300 shadow-md flex flex-col justify-between">
      <div>
        <h3 className="upcoming-title sm:text-2xl text-center leading-tight">
          NEP-Aligned for Future <br />
          <span className="!text-[#FA9A00] upcoming-title">- Ready Learning</span>
        </h3>

      <div className="text-center mb-3 mt-3 flex justify-center">
  <Image 
    src="/nap-govt.png" 
    alt="StepsAnim"
    className="object-contain mx-auto"
    width={204}
    height={206}
    priority
  />
</div>
<p className='nep-govt-subpoints'>STEPS Robotics delivers a hands-on, future-ready learning experience that naturally aligns with the principles of the National Education Policy.</p>
        <ul className="mt-5 space-y-3 text-[15px] sm:text-[16px] text-gray-700">
          <li className="flex nep-learn-points items-start">
            <span className="text-[#EF9E08] mr-2">➜</span>
Promotes experiential learning through hands-on STEM projects.
          </li>
          <li className="flex nep-learn-points items-start">
            <span className="text-[#EF9E08] mr-2">➜</span>
Builds creativity, critical thinking, communication, and collaboration skills.
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-6">
           <button className="bg-gradient-to-r text-[14px] from-[#FF6F28] to-[#FFCF20] py-1 hover:from-orange-500 hover:to-orange-600 text-white text-xs font-semibold pl-4 pr-1 rounded-full flex items-center gap-1 transition-all">
                      More Info
                      <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
                        <ArrowRight className="w-3 h-3 text-black" />
                      </div>
                    </button>
        <div className="relative nep-rocket top-[-60px] mb-[-115px] left-[40px] mt-4">
          <Image
            src="/rocket.png"
            alt="Rocket"
            width={180}
            height={80}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}