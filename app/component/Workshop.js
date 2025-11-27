"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Enquiry from "./Enquiry";
export default function Workshop() {
  const [showBookTrial, setShowBookTrial] = useState(false);

  const handleRegisterClick = () => setShowBookTrial(true);
  const closeModal = () => setShowBookTrial(false);
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("/api/programs");
        setPrograms(res.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);
  return (
    <section className="w-full program-workshop py-14">
      <div className="container-custom sm:px-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-9 items-start"
          >
            <div className="w-full">
              <div className="flex items-center text-sm font-medium text-gray-700">
                <Link
                  href="/programs"
                  className="border-hr-text hover:text-yellow-500 transition"
                >
                  Programs
                </Link>
                <span className="mx-2 border-hr-text">›</span>
                <Link href="#" className="text-yellow-500 border-hr-text">
                  VEX GO Robotics Workshop Program
                </Link>
              </div>
              <hr className="mt-3 border-t-2 border-hr-breadcrumb border-dashed border-yellow-400" />
              <h2 className="program-main-title md:text-4xl mb-3">
                <span className="program-main-title !mt-[35px]">
                  VEX GO Robotics{" "}
                </span>
                <span className="program-main-title stem-gold">
                  Workshop Program
                </span>
              </h2>
              <p className="program-sub-title mb-[40px]">
                At STEPS Robotics, we believe that learning by doing creates the
                brightest minds of tomorrow. Our hands-on robotics workshops are
                designed to spark curiosity, foster creativity, and build
                essential STEM skills. Using the VEX GO robotics kit, students
                will explore real-world applications of technology, engineering,
                and problem-solving through interactive projects.
              </p>

              <div className="relative">
                <div className="absolute inset-0 rounded-[30px] bg-[#d7d7d7] rotate-[4deg] -z-0"></div>
                <div className="relative rounded-[30px] overflow-hidden shadow-lg flex-shrink-0">
                  <video
                    src="/video1.mp4"
                    className="w-full h-full object-cover rounded-2xl"
                    width={320}
                    height={190}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <button className="hover:scale-110 transition">
                      <Image
                        src="/workshopplay.gif"
                        alt="WorkshopPlay"
                        className="w-full h-[139px] rounded-[30px]"
                        width={139}
                        height={139}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
<div
  className="p-6 mt-[10px] md:p-5 rounded-xl 
  bg-[linear-gradient(180deg,#FDF9EB_0%,#FFFFFF_37.53%)] 
  border-t border-l border-r border-gray-100 
  shadow-[5px_-5px_13.8px_rgba(0,0,0,0.12)]"
>
              <h3 className="text-2xl text-center event-title mb-6 pb-3">
                Program Details
              </h3>
              <hr className="border-b-2 border-hr border-yellow-400" />
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.875 11.1428H24.375M9.13691 3.75V5.6788M21.875 3.75V5.67856M21.875 5.67856H9.375C7.30393 5.67856 5.625 7.40545 5.625 9.53568V22.3929C5.625 24.5231 7.30393 26.25 9.375 26.25H21.875C23.9461 26.25 25.625 24.5231 25.625 22.3929L25.625 9.53568C25.625 7.40545 23.9461 5.67856 21.875 5.67856ZM14.375 16.9286L16.25 15V21.4285M16.25 21.4285H14.375M16.25 21.4285H18.125"
                      stroke="#EF9E08"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="event-subtitle font-semibold">Days</p>
                    <p className="event-subtext text-sm">{program.days}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2812 17.8125L14.0625 16.4062V10.5261M25.3125 15C25.3125 8.7868 20.2757 3.75 14.0625 3.75C7.8493 3.75 2.8125 8.7868 2.8125 15C2.8125 21.2132 7.8493 26.25 14.0625 26.25C18.2266 26.25 21.8623 23.9876 23.8074 20.625M22.2263 13.7654L25.0388 16.5779L27.8513 13.7654"
                      stroke="#EF9E08"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="event-subtitle font-semibold">Duration</p>
                    <p className="event-subtext text-sm">{program.duration}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5275 18.7612C20.0515 18.9358 20.6178 18.6527 20.7924 18.1287C20.9671 17.6048 20.6839 17.0385 20.16 16.8638L19.8438 17.8125L19.5275 18.7612ZM15.625 16.4062H14.625C14.625 16.8367 14.9004 17.2188 15.3088 17.3549L15.625 16.4062ZM16.625 10.5261C16.625 9.9738 16.1773 9.52609 15.625 9.52609C15.0727 9.52609 14.625 9.9738 14.625 10.5261H15.625H16.625ZM19.8438 17.8125L20.16 16.8638L15.9412 15.4576L15.625 16.4062L15.3088 17.3549L19.5275 18.7612L19.8438 17.8125ZM15.625 16.4062H16.625V10.5261H15.625H14.625V16.4062H15.625ZM26.875 15H25.875C25.875 20.6609 21.2859 25.25 15.625 25.25V26.25V27.25C22.3905 27.25 27.875 21.7655 27.875 15H26.875ZM15.625 26.25V25.25C9.96408 25.25 5.375 20.6609 5.375 15H4.375H3.375C3.375 21.7655 8.85951 27.25 15.625 27.25V26.25ZM4.375 15H5.375C5.375 9.33908 9.96408 4.75 15.625 4.75V3.75V2.75C8.85951 2.75 3.375 8.23451 3.375 15H4.375ZM15.625 3.75V4.75C21.2859 4.75 25.875 9.33908 25.875 15H26.875H27.875C27.875 8.23451 22.3905 2.75 15.625 2.75V3.75Z"
                    fill="#EF9E08"
                  />
                </svg>
                <div>
                  <p className="event-subtitle text-gray-800">Time</p>
                  <p className="event-subtext text-sm">{program.time}</p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-start gap-2">
                  <svg
                    width="50"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_8125_2510)">
                      <path
                        d="M26.25 12.5C26.25 21.25 15 28.75 15 28.75C15 28.75 3.75 21.25 3.75 12.5C3.75 9.51631 4.93526 6.65483 7.04505 4.54505C9.15483 2.43526 12.0163 1.25 15 1.25C17.9837 1.25 20.8452 2.43526 22.955 4.54505C25.0647 6.65483 26.25 9.51631 26.25 12.5Z"
                        stroke="#EF9E08"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 16.25C17.0711 16.25 18.75 14.5711 18.75 12.5C18.75 10.4289 17.0711 8.75 15 8.75C12.9289 8.75 11.25 10.4289 11.25 12.5C11.25 14.5711 12.9289 16.25 15 16.25Z"
                        stroke="#EF9E08"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8125_2510">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <p className="event-subtitle text-gray-800">Venue</p>
                    <p className="event-subtext text-sm">{program.venue}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#E9FAFF] rounded-sm p-4 mb-3">
                <ArrowRight className="text-gray-900 w-[16px] h-[16px] mt-[3px] flex-shrink-0" />
                <div>
                  <p className="event-details font-semibold text-[15px] leading-snug">
                    Materials
                  </p>
                  <p className="text-[14px] event-details-span text-sm leading-snug">
                    {program?.materials ||
                      "VEX GO robotics kits provided for every participant"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#FEF8F5] rounded-sm p-4 mb-3">
                <ArrowRight className="text-gray-900 w-[16px] h-[16px] mt-[3px] flex-shrink-0" />
                <div>
                  <p className="event-details font-semibold text-[15px] leading-snug">
                    Mentors
                  </p>
                  <p className="text-[14px] event-details-span text-sm leading-snug">
                    {program?.mentors ||
                      "VEX GO robotics kits provided for every participant"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F7FBEC] rounded-sm p-4 mb-3">
                <ArrowRight className="text-gray-900 w-[16px] h-[16px] mt-[3px] flex-shrink-0" />
                <div>
                  <p className="event-details font-semibold text-[15px] leading-snug">
                    Batch Size
                  </p>
                  <p className="text-[14px] event-details-span text-sm leading-snug">
                    {program?.batch_size ||
                      "VEX GO robotics kits provided for every participant"}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleRegisterClick}
                  className="event-enroll-btn flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] text-white pl-[20px] pr-[7px] pt-[7px] pb-[7px] rounded-full font-semibold hover:shadow-lg transition"
                >
                  Enroll Now{" "}
                  <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showBookTrial && (
<div className="fixed inset-0 z-[9999] m-0 sm:m-[30px] animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-0">
            <Enquiry onClose={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
}
