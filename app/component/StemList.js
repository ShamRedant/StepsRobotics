"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function StemList() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const itemsPerPage = 4;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      const data = Array.isArray(res.data) ? res.data : [];
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const handleFilter = (grade) => {
    setActiveFilter(grade);
    setCurrentPage(1);
    if (grade === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.gradeRange && course.gradeRange.includes(grade)
      );
      setFilteredCourses(filtered);
    }
  };

  const truncateDescription = (text = "", limit = 170) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);

  return (
    <section className="py-10 main-courses bg-white">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="stem-education-main mb-8 mt-5 text-left">
          <p className="stem-education-title text-3xl font-bold">
            We Are <span className="stem-education-title stem-gold">Much Experience</span> to
            Learning <span className="stem-education-title stem-gold">STEM Education</span>
          </p>
          <p className="course-model-title mt-3">
            STEM robotics sessions that teach students to think, build, and innovate through practical learning.
          </p>
        </div>
<div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-10">
  <div className="bg-[#f6f6f6] rounded-full flex flex-wrap justify-center w-full sm:w-auto px-2 sm:px-0">
    {["All", "Grade 3–5", "Grade 6–8", "Grade 9–12"].map((grade) => (
      <button
        key={grade}
        onClick={() => handleFilter(grade)}
        className={`px-5 sm:px-[57px] filter-course-btn py-[9px] rounded-full text-sm sm:text-base font-medium transition-all duration-300
          ${
            activeFilter === grade
              ? "bg-[#FFD400] rounded-full text-black shadow-md scale-105"
              : "bg-[#f6f6f6] text-gray-700 hover:bg-[#FFD400]"
          }`}
      >
        {grade}
      </button>
    ))}
  </div>
</div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {currentCourses.map((course, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border-stem-list transition-all duration-300 hover:shadow-xl 
              h-auto md:h-[300px]`}
            >              <div className="group relative flex w-full md:w-1/2 h-60 md:h-auto">
                <div className="relative bg-black w-16 md:w-[80px] flex flex-col items-center justify-between py-6 z-10">
                  <svg className="top-triangle" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="fill-black group-hover:fill-[#000] transition-all duration-300 group-hover:drop-shadow-[0_0_0px_#000]"
                      d="M14.5833 -3.59241e-07L0 17.206L14.5833 34.412L29.1665 17.206L14.5833 -3.59241e-07Z"
                      fill="black"
                    />
                  </svg>

                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24.4445 0.847168H5.78013C3.12504 0.847168 0.972656 2.99819 0.972656 5.65162V24.3042C0.972656 26.9576 3.12504 29.1086 5.78013 29.1086H24.4445C27.0996 29.1086 29.2519 26.9576 29.2519 24.3042V5.65162C29.2519 2.99819 27.0996 0.847168 24.4445 0.847168Z"
                        fill="#EFBC08"
                      />
                      <path
                        d="M17.3746 14.1519H29.4042C31.1227 14.1519 32.5149 15.5432 32.5149 17.2606V29.2826C32.5149 31 31.1227 32.3914 29.4042 32.3914H17.3964C15.6779 32.3914 14.2856 31 14.2856 29.2826V17.2606C14.2856 15.5432 15.6779 14.1519 17.3964 14.1519H17.3746Z"
                        fill="black"
                      />
                      <path
                        d="M19.4193 16.5867H29.8174C31.2966 16.5867 32.5148 17.7823 32.5148 19.2824V29.6739C32.5148 31.1522 31.3184 32.3479 29.8391 32.3479H19.4193C17.9401 32.3479 16.7437 31.1522 16.7437 29.6739V19.2606C16.7437 17.7824 17.9401 16.5867 19.4193 16.5867Z"
                        fill="#FBD905"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={course.image || "/images/course-placeholder.jpg"}
                      width={350}
                      height={350}
                      alt={course.title}
                      className="w-[25px] h-auto"
                    />
                  </div>
                </div>

                <div className="relative w-full h-full right-triangle">
                  <Image
                    src={course.heroicimage || "/images/course-placeholder.jpg"}
                    width={350}
                    height={350}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="py-4 px-4 md:py-6 md:px-6 flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <h3 className="stem-list-title mb-1">
                    {(() => {
                      const title = course.title || "VEX 123 Robotics Course Advanced";
                      const words = title.split(" ");
                      const firstTwo = words.slice(0, 2).join(" ");
                      const remaining = words.slice(2).join(" ");
                      return (
                        <>
                          {firstTwo}{" "}
                          {remaining && <span className="stem-list-title !text-yellow-400">{remaining}</span>}
                        </>
                      );
                    })()}
                  </h3>
                  <p className="stem-list-subtitle relative inline-block after:content-[''] after:block after:w-12 after:h-[2px] after:bg-[#FDB618] after:mt-1 mb-3">
                    {course.subtitle || "For grade 1 and 2"}
                  </p>
                  <p
                    className="stem-list-description mb-3 cursor-pointer"
                    title={course.description || "No description available"}
                  >
                    {truncateDescription(
                      course.description ||
                        "Introduces children aged 5–7 to robotics through fun, hands-on activities, sparking curiosity, creativity, and a love for STEM",
                      150
                    )}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <Link
                    href={`/courses/${course.slug || course.id || "#"}`}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] hover:from-[#FFB84D] hover:to-[#FF8533] text-white text-base font-medium pl-4 pr-1 py-1 rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    View More
                    <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`transition-all duration-300 ${
                  index + 1 === currentPage
                    ? "w-7 h-7 rounded-full border border-dashed border-[#000000] flex items-center justify-center"
                    : "w-3 h-3 rounded-full bg-gray-800"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index + 1 === currentPage && (
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
