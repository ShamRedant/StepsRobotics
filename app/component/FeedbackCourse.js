"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackCourse() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  // 🔹 Fetch data from API
  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await axios.get("/api/coursefeedback");
        setTestimonials(res.data || []);
      } catch (err) {
        console.error("Error fetching course feedback:", err);
      }
    }
    fetchFeedback();
  }, []);

  // 🔁 Auto play every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  const currentTestimonial = testimonials[activeSlide];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5" viewBox="0 0 24 24" fill="#FDB022">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="#FDB022" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#half-fill)"
          />
        </svg>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5" viewBox="0 0 24 24" fill="#E5E7EB">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="course-testimonial pt-[60px] sm:pt-[0px] pb-[60px] bg-white px-4">
      <div className="container-custom sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Left side text */}
          <div className="w-full lg:w-[40%]">
            <h2 className="mb-4 leading-tight">
              <span className="feedback-main stem-gold">People&apos;s Say</span>{" "}
              <span className="feedback-main">
                About <br /> our Course
              </span>
            </h2>
            <p className="feedback-subtag mb-3 leading-relaxed">
              Rem aperiam eaque ipsa quae ab illo inventore veritatis architecto
              beatae vitae dicta sunt explica.
            </p>
            <Link
              href=""
              className="text-yellow-500 underline font-semibold text-base hover:text-yellow-600 transition-colors"
            >
              View More
            </Link>
          </div>

          <div className="w-full lg:w-[15%] mt-[10px] flex justify-center">
            <motion.div
              key={currentTestimonial.image}
              initial={{ opacity: 0, rotate: 8, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 6, scale: 1 }}
              exit={{ opacity: 0, rotate: 8, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-[176px] h-[176px] mt-[40px] rounded-3xl overflow-hidden bg-gray-200 shadow-lg"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover transform -rotate-6 scale-110 transition-all duration-700 ease-in-out"
                height={176} width={176}
              />
            </motion.div>
          </div>
          <div className="w-full tesitimonial-box-content pt-[30px] md:pt-[98px] lg:w-[40%] relative">
            <div className="relative min-h-[200px] md:min-h-[160px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <p className="course-testimonial-text leading-relaxed mb-8">
                    {currentTestimonial.text}
                  </p>

                  <div className="mb-4">
                    <h3 className="course-testimonial-name">{currentTestimonial.name}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(currentTestimonial.rating)}
                    </div>
                    <p className="course-testimonial-role mt-[2px] text-sm">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex gap-3 items-center mt-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`transition-all duration-300 ${
                    index === activeSlide
                      ? "w-5 h-5 rounded-full border border-dashed testi-border border-[#000000] flex items-center justify-center"
                      : "w-2 h-2 rounded-full bg-gray-800"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === activeSlide && (
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
