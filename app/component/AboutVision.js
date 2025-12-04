import React from "react";
import Image from "next/image";

export default function AboutVision() {
  return (
    <section id="aboutsection" className="bg-white space-y-20 pt-[60px] scroll-mt-[80px] md:scroll-mt-[100px]">
        <div className="container-custom">
           <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-2 leading-snug text-center font-[500] sm:text-left text-font-orbitron">
            About{" "}
            <span className="text-[#F3B829] text-font-orbitron">
              STEPS Robotics
            </span>
          </h2>
          <p className="text-[14px] leading-relaxed text-neutral-900">
            Welcome to STEPS Robotics — Shaping the Future of
            School STEM Learning. Launched in 2025, STEPS Robotics is here to
            redefine STEM education for K-12 schools.
          </p>
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-10 mt-[50px] items-start">
        <div className="relative flex justify-center">
          <Image
            src="/about_img.png"
            alt="About STEPS Robotics"
            width={420}
            height={265}
            className="w-full h-[265px] -mt-[23px] object-contain"
            priority
          />
        </div>

        <div className="space-y-6 text-gray-800">
<p className="text-[14px] leading-relaxed text-[#030303]">
            <strong>STEPS Robotics</strong> is a future-focused STEM and robotics
            education company dedicated to transforming young learners into
            confident innovators, problem solvers, and technology creators.
            Our journey began as an offline STEM and robotics education provider
            in South India, driven by a strong belief that true learning happens
            through hands-on experience.
          </p>

<p className="text-[14px] leading-relaxed text-[#030303]">
            We are proudly aligned with VEX Robotics, one of the world’s most
            trusted and globally recognized robotics education platforms.
            Through this alignment, we deliver structured, international-
            standard programs in robotics, coding, engineering design, and
            computational thinking for students across different age groups.
          </p>

<p className="text-[14px] leading-relaxed text-[#030303]">
            Our curriculum is carefully designed to align with India’s National
            Education Policy (NEP) 2020, ensuring that students acquire not only
            academic knowledge but also essential 21st-century skills such as
            critical thinking, collaboration, creativity, and leadership.
          </p>
        </div>
      </div>

    <div className="container-custom mt-[60px]">
  <div className="relative rounded-[40px] overflow-hidden about-box-bg px-8 sm:px-11 py-12">
    <div className="relative grid gap-10 z-10">

      <div className="flex gap-6 items-start">
        <div className="w-[122px] md:w-23 lg:w-23 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
          <Image src="/our_vision.svg" alt="Vision" width={84} height={84}  className="mt-[8px]"/>
        </div>
        <div className="w-full">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 font-orbitron our_vmv_heading mb-2">Our Vision</h3>
          <p className="text-[14px] leading-[1.7] text-black">
            To shape confident, curious, and future-ready learners who can
            use technology creatively and responsibly. We aim to help
            children not just learn robotics — but understand how the
            world works, solve problems, and build meaningful ideas with confidence.
          </p>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        <div className="w-[122px] md:w-23 lg:w-23 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
          <Image src="/our_mission.svg" alt="Mission" width={84} height={84} className="mt-[8px]"/>
        </div>
        <div className="w-full">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 font-orbitron our_vmv_heading mb-2">Our Mission</h3>
          <p className="text-[14px] leading-[1.7] text-black">
            Our mission is to make robotics, coding, and STEM learning
            accessible, enjoyable, and impactful for students of all ages.
            Through hands-on programs and real-world application, we
            ensure learners grow step by step — ready for the future.
          </p>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        <div className="w-[122px] md:w-23 lg:w-23 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
          <Image src="/our_values.svg" alt="Values" width={84} height={84}  className="mt-[8px]"/>
        </div>
        <div className="w-full">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 font-orbitron our_vmv_heading mb-2">Our Values</h3>
          <p className="text-[14px] leading-[1.7] text-black">
            Our values guide every learning moment. We encourage curiosity,
            hands-on exploration, collaboration, and ethical use of
            technology — ensuring every student feels included,
            empowered, and inspired.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

</div>
    </section>
  );
}
