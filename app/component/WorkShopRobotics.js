"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, ArrowRight, X } from "lucide-react";
import Enquiry from "./Enquiry";

export default function WorkShopRobotics() {
  const videoRef = useRef(null);
  const [showBookTrial, setShowBookTrial] = useState(false);
  const [showFullVideo, setShowFullVideo] = useState(false);

  const handleRegisterClick = () => setShowBookTrial(true);
  const closeModal = () => setShowBookTrial(false);

  // ✅ Background video autoplay by default
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // ✅ Play button -> show popup video
  const handlePlayVideo = () => {
    setShowFullVideo(true);
  };

  const closeFullVideo = () => {
    setShowFullVideo(false);
  };

  return (
    <section className="relative workshop-robotics w-full h-[550px] md:h-[464px] flex items-center justify-center overflow-hidden">
      {/* Background autoplay video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/workshop.mp4"
        muted
        loop
        playsInline
        autoPlay
      ></video>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">
        <div className="relative inline-block container mx-auto">
          {/* ✅ Play button triggers popup full video */}
          <div
            onClick={handlePlayVideo}
            className="absolute -top-13 left-1/2 -translate-x-1/2 cursor-pointer z-20"
          >
            <div className="w-18 h-18 mt-[2px] border border-red-500 bg-[#FFB800] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 sm:p-10 text-white">
            <h2 className="font-semibold leading-snug workshop-sample-title sm:text-3xl ">
              Our{" "}
              <span className="!text-[#EFBC08] workshop-sample-title">
                VEX GO Robotics
              </span>{" "}
              Workshop is a fun,
              <br className="hidden md:block" /> supportive way to learn STEM
              skills.
            </h2>

            <p className="mt-4 text-white/90 text-base workshop-sample-description sm:text-lg">
              Give your child the tools to explore, build, and innovate
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleRegisterClick}
                className="bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] workshop-sample-btn hover:bg-[#ffca2c] text-white font-semibold text-lg pl-5 pr-[6px] py-2 rounded-full flex items-center gap-2 shadow-md transition-all"
              >
                Enroll Now!
                <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showBookTrial && (
<div className="fixed inset-0 z-[9999] m-0 sm:m-[30px] animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-0">
            <Enquiry onClose={closeModal} />
          </div>
        </div>
      )}

      {/* ✅ Full video popup */}
      {showFullVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]">
          <button
            onClick={closeFullVideo}
            className="absolute top-5 right-5 text-white p-2 bg-black/50 rounded-full hover:bg-black transition"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            src="/workshop.mp4"
            controls
            autoPlay
            className="w-[90%] max-w-4xl rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
