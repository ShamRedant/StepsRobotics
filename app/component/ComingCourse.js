"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ComingSoonVideo from "./ComingSoonVideo";

export default function ComingCourse() {
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
      
      <ComingSoonVideo />

      </div>
    </section>
  );
}
