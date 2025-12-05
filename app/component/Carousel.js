"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Enquiry from "./Enquiry";
import SkeletonHero from "./SkeletonHero";

const rightImages = [
  "/home_banner/123.png",
  "/home_banner/aim.png",
  "/home_banner/go.png",
  "/home_banner/iq.png",
  "/home_banner/v5.png",
  "/home_banner/cte.png",

];

const infoCards = [
  { image: "/banner_icons/student.png", title: "For Grades", subtitle: "02+" },
  {
    image: "/banner_icons/platform.png",
    title: "Platform",
    subtitle: null,
    subtitleImage: "/banner_icons/banner-vex.png",
  },
  { image: "/banner_icons/courses.png", title: "Courses", subtitle: "12+" },
  { image: "/banner_icons/tools.png", title: "Tools & Kit", subtitle: "25+" },
];

export default function Carousel() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBookTrial, setShowBookTrial] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBannersData() {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();

        const formatted = rightImages.map((img, index) => ({
          ...data[index % data.length],
          sideImage: img,
        }));

        setBanners(formatted);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBannersData();
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  if (loading) return <SkeletonHero />;

  return (
    <section id="herosection" className="relative container-spacing banner_h h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] scroll-mt-[80px] md:scroll-mt-[100px]">
            <div className="absolute inset-0">
        <Image
          src="/stepsbanner.jpg"
          alt="Steps Robotics Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="relative z-10 mx-auto container-custom px-4 h-full flex flex-col md:flex-row items-center justify-between">
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl banner-text">
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-tight text-black mb-4 tracking-tight">
              STEM Academy for <br />
              <span className="text-[48px] every md:text-[64px] lg:text-[72px] font-bold leading-tight text-orange-500 tracking-tight drop-shadow-sm">
                Every Student
              </span>
            </h1>
              <p className="text-base md:text-lg every-description text-gray-900 mb-8 max-w-xl font-medium leading-relaxed">
              Shaping future engineering minds through a world-class STEM
              platform — aligned with{" "}
              <span className="font-bold">
                India’s National Education Policy (NEP)
              </span>
              ,<br />
              <br />
              used in <span className="font-bold">100+ nations</span>, trusted by{" "}
              <span className="font-bold">50K+ teams</span>, and featured in{" "}
              <span className="font-bold">
                1,200+ robotics tournaments
              </span>
              .
            </p>
          </div>
        </div>

        <div
          className="
            relative banner_RTL_image
            w-full h-[280px]
            sm:h-[350px]
            md:w-[550px] md:h-[550px]
            lg:w-[750px] lg:h-[750px]
            md:ml-[120px]
            flex justify-center md:justify-end
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={banners[currentSlide]?.sideImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {banners[currentSlide]?.sideImage && (
                <Image
                  src={banners[currentSlide].sideImage}
                  alt="Side Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-[-40px] banner_info_sec left-0 right-0 z-20 container-custom rounded-t-3xl">
        <div className="container rounded-t-3xl shadow-[-1px_-14px_10px_rgba(0,0,0,0.12)] mx-auto">
          <div className="bg-white rounded-t-3xl p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 container-custom bg-gradient-to-b from-gray-100 to-white gap-6 rounded-2xl py-4 px-4">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="p-0 sm:p-3 flex items-center justify-center gap-4"
                >
                  <div className="w-12 h-12 relative">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <div className="text-gray-700 font-medium text-sm">
                      {card.title}
                    </div>
                    {card.subtitleImage ? (
                      <div className="relative w-15 h-5 mt-1">
                        <Image
                          src={card.subtitleImage}
                          alt={card.title}
                          fill
                          className="object-contain -ml-[5px] !h-[24px]"
                        />
                      </div>
                    ) : (
                      <div className="text-xl text-gray-900 f-audiowide">
                        {card.subtitle}
                      </div>
                    )}
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
            <Enquiry onClose={() => setShowBookTrial(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
