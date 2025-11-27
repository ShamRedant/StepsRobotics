"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BookTrial from "./BookTrail";
import { ArrowRight } from 'lucide-react';
import { fetchBanners } from "@/app/utils/fetchData"; // ✅ import from utils
import Enquiry from "./Enquiry";
import SkeletonHero from "./SkeletonHero";
import { useCallback } from "react";



const slides = [
  {
    id: 1,
    title: "New Batch",
    subtitle: "Starting Soon!",
    description:
      "Interactive robotics and coding courses for Grades 1–12. Where curiosity transforms into creation by inspiring creators, leaders, and problem-solvers.",
    image: "/home_banner/Steps Robotics - Banner1.jpg",
    sideImage: "/home_banner/banner_image1.png", // 👈 new right-side image
  },
  {
    id: 2,
    title: "Build Your Future",
    subtitle: "With Robotics!",
    description:
      "Hands-on learning experience with VEX robotics platform. Learn by doing and create amazing projects.",
    image: "/home_banner/Steps Robotics - Banner2.jpg",
    sideImage: "/home_banner/banner_image2.png",
  },
  {
    id: 3,
    title: "Future Robotics",
    subtitle: "Coding Course!",
    description:
      "Interactive robotics and coding courses for Grades 1–12. Learn by doing and create amazing projects.",
    image: "/home_banner/Steps Robotics - Banner3.jpg",
    sideImage: "/home_banner/banner_image3.png",
  },
];



const infoCards = [
  {
    image: "/banner_icons/student.png",
    title: "For Students",
    subtitle: "Age 3-17",
  },
  { image: "/banner_icons/platform.png", title: "Platform", subtitle: "VEX" },
  { image: "/banner_icons/courses.png", title: "Courses", subtitle: "12+" },
  { image: "/banner_icons/tools.png", title: "Tools & Kit", subtitle: "25+" },
];


export default function HeroSlider() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();

        // ✅ ensure structure is consistent
        const formatted = data.map((b) => ({
          ...b,
          sideImage: b.b_image   // rename field
        }));

        setBanners(formatted);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);


  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [direction, setDirection] = useState(0);
  const [showBookTrial, setShowBookTrial] = useState(false);

  const handleRegisterClick = () => setShowBookTrial(true);
  const closeModal = () => setShowBookTrial(false);







  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

    useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  });

  // const nextSlide = () => {
  //   if (banners.length === 0) return;
  //   setDirection(1);
  //   setCurrentSlide((prev) => (prev + 1) % banners.length);
  // };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };


  return (
    <section className="relative container-spacing banner_h  h-[600px] md:h-[550px]">
      {/* Slider */}

      {banners.length > 0 && (
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ opacity: { duration: 0.3 } }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banners[currentSlide].image}
                alt={banners[currentSlide].banner_title1}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 to-transparent"></div>
            </div>

            {/* Text + Right-side Image */}
            <div className="relative z-10 mx-auto container-custom  px-4 h-full flex flex-col md:flex-row items-center justify-between">

              {/* LEFT SIDE - TEXT */}
              <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-3xl  banner-text">
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {banners[currentSlide].banner_title1}

                  </motion.h1>
                  <motion.h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {banners[currentSlide].banner_title2}
                  </motion.h2>
                  <motion.p
                    className="text-lg md:text-xl text-gray-900 mb-8 max-w-xl font-medium"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {banners[currentSlide].paragraph}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {/* <button
                      onClick={handleRegisterClick}
                      className="absolute home_banner_button  bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-xl py-2 px-3 rounded-full flex items-center hover:shadow-lg transition-shadow"
                    >
                      <span className="ml-2">{banners[currentSlide].button_name || "Get Started"}</span>
                      <span className="relative bg-white ml-4 rounded-full ml-4 p-2"><ArrowRight className="w-6 h-6 text-black" /></span>
                    </button> */}
                    {/* {banners[currentSlide].button_name !== "dont show" && (
                      <button
                        onClick={handleRegisterClick}
                        className="absolute home_banner_button bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-xl py-2 px-3 rounded-full flex items-center hover:shadow-lg transition-shadow"
                      >
                        <span className="ml-2">
                          {banners[currentSlide].button_name || "Get Started"}
                        </span>

                        <span className="relative bg-white ml-4 rounded-full p-2">
                          <ArrowRight className="w-6 h-6 text-black" />
                        </span>
                      </button>
                    )} */}
                  </motion.div>
                </div>
              </div>

              {/* RIGHT SIDE - IMAGE */}
              {banners[currentSlide].b_image && (
                <div className="relative banner_RTL_image w-[750px] h-[750px] ml-[120px] md:mt-0 flex justify-center md:justify-end">
                  <Image
                    src={banners[currentSlide].sideImage}
                    alt="Side illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      )}


      {/* Info Cards */}
      <div className="absolute bottom-[-40px] banner_info_sec left-0 right-0 z-20 
    container-custom 
    rounded-t-3xl 
    
    ">
        <div className="container rounded-t-3xl shadow-[-1px_-14px_10px_rgba(0,0,0,0.12)] mx-auto">
          {/* Outer white container */}
          <div className="bg-white rounded-t-3xl p-2  ">
            {/* Inner gray/yellow section */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 container-custom bg-gradient-to-b from-gray-100 to-white gap-6 rounded-2xl py-4  px-4">
              {infoCards.map((card, index) => (
                <div key={index} className="flex items-center justify-center gap-4 p-3">
                  <div className="w-12 h-12 relative">
                    <Image src={card.image} alt={card.title} fill className="object-contain" />
                  </div>
                  <div className="text-left">
                    <div className="text-gray-700 font-medium text-sm">
                      <p>{card.title}</p>
                    </div>
                    <div className="text-xl text-gray-900">
                      <p className="f-audiowide">{card.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {showBookTrial && (
<div className="fixed inset-0 z-[9999] m-0 sm:m-[30px] animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-0">
            <Enquiry onClose={closeModal} />  {/* pass the handler here */}
          </div>
        </div>
      )}
    </section>

  );
}
