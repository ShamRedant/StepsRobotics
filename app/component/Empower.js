import React from "react";
import Image from "next/image";
import GlobalImage from "@/public/global.svg"; 
import  "./css/Empower.css";
export default function Empower() {
  return (
    <div className="empower pt-[40px] pb-[35px]">
    <div className="w-full container-custom">
        <div className="empower-head">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug text-center font-[500] sm:text-left text-font-orbitron">
            Empowering Students With{" "}
            <span className="text-[#F3B829] text-font-orbitron">
              Global-Standard STEM Learning
            </span>
          </h2>
          <p className="sub-title">Delivering globally benchmarked STEM and robotics education through a comprehensive curriculum that inspires creativity, strengthens problem-solving, and builds future-ready confidence.</p>
        </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 mt-[35px] mb-[70px] md:grid-cols-[32%_62%] gap-10 items-center">
        <div className="flex justify-center">
          <Image
            src={GlobalImage}
            alt="STEM Robotics Illustration"
            className="w-full max-w-md md:max-w-full h-[475px]"
          />
        </div>

        <div>
          <p className="sub-title mt-4 leading-relaxed">
            STEPS Robotics brings world-class STEM education straight into the
            classroom. Built on globally recognized frameworks like{" "}
            <span className="font-semibold">NGSS, CSTA, ISTE, CCSS,</span> and{" "}
            <span className="font-semibold">P21</span>, our curriculum turns
            learning into an exciting, hands-on experience where students design,
            build, and code real robots.
          </p>
          <div className="steps-apart">
          <p className="steps-apart-title pt-[24px]">What Sets STEPS Robotics Apart</p>
          <div className="steps-apart-box shadow-md rounded-xl mt-6 p-6 space-y-5">
  <div>
    <h3 className="steps-apart-point-title flex items-center gap-2">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L12 8"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L8 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16L16 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Globally Aligned Curriculum
    </h3>

    <p className="steps-apart-point ml-[30px] text-sm mt-1">
      Built on NGSS, CSTA, CCSS, ISTE, and P21 for internationally
      competitive learning.
    </p>
  </div>

  <div>
    <h3 className="steps-apart-point-title flex items-center gap-2">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L12 8"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L8 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16L16 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Hands-On Learning
    </h3>

    <p className="steps-apart-point ml-[30px] text-sm mt-1">
      Students build, test, and innovate—develop real engineering and
      coding skills.
    </p>
  </div>
  <div>
    <h3 className="steps-apart-point-title flex items-center gap-2">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L12 8"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L8 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16L16 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Future-Ready Skills
    </h3>

    <p className="steps-apart-point ml-[30px] text-sm mt-1">
      Every session strengthens creativity, teamwork, problem-solving,
      and digital literacy.
    </p>
  </div>


  {/* POINT 4 */}
  <div>
    <h3 className="steps-apart-point-title flex items-center gap-2">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L12 8"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L8 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16L16 12"
          stroke="#FFA228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Confidence Through Creation
    </h3>

    <p className="steps-apart-point ml-[30px] text-sm mt-1">
      Students grow into creators and problem-solvers with skills that
      extend beyond the classroom.
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
