"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function StemCourse() {
  const [courses, setCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      const courseList = Array.isArray(res.data) ? res.data : [];
      const courseDetails = await Promise.all(
        courseList.map(async (course) => {
          let objectives = [];
          let highlights = [];
          try {
            const objRes = await axios.get(
              `/api/courses/objectives?courseId=${course.id}`
            );
            objectives = Array.isArray(objRes.data)
              ? objRes.data.map((o) => o.objective)
              : [];
          } catch {}

          try {
            const hlRes = await axios.get(
              `/api/courses/highlights?courseId=${course.id}`
            );
            highlights = Array.isArray(hlRes.data)
              ? hlRes.data.map((h) => h.highlight)
              : [];
          } catch {}

          return {
            ...course,
            objectives,
            highlights,
          };
        })
      );
      setCourses(courseDetails);
      if (courseDetails.length > 0) {
        setActiveIndex(0);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };
  return (
    <div className="stem-education-course -mt[6px] mb[40px] py-10">
      <div className="container mx-auto px-4">
        <div className="stem-education-main mb-8 mt-5 text-left">
          <p className="stem-education-title text-3xl font-bold">
            We Are <span className="stem-education-title stem-gold">Much Experience</span> in
            Learning <span className="stem-education-title stem-gold">STEM Education</span>
          </p>
          <p className="course-model-title mt-3">
            The course gives students an excellent platform to create and
            program their stories, interactive games, music, and animation.
            Students can showcase their projects in their offline community.
          </p>
        </div>
        <div className="flex gap-4 items-stretch">
          {courses.map((course, idx) => {
            const isActive = activeIndex === idx;
            const colors = [
              {
                bg: "bg-teal-500",
                text: "text-teal-600",
                border: "border-teal-500",
                hover: "hover:bg-teal-50",
              },
              {
                bg: "bg-blue-500",
                text: "text-blue-600",
                border: "border-blue-500",
                hover: "hover:bg-blue-50",
              },
              {
                bg: "bg-indigo-600",
                text: "text-indigo-600",
                border: "border-indigo-600",
                hover: "hover:bg-indigo-50",
              },
            ];
            const colorScheme = colors[idx % colors.length];

            return (
              <div
                key={course.id || idx}
                className={`flex rounded-3xl h-[620px] border-dashed transition-all duration-500 ${
                  isActive
                    ? `${colorScheme.border} shadow-xl`
                    : "border-gray-200"
                } ${isActive ? "flex-1" : ""}`}
                style={{ minHeight: "500px" }}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                  className={`relative b-23 flex flex-col items-center justify-between py-8 px-6 ${
                    colorScheme.hover
                  } transition-colors rounded-l-3xl ${
                    isActive
                      ? "bg-gradient-to-b from-gray-50 to-white"
                      : "bg-white"
                  }`}
                  style={{ width: "140px", minWidth: "140px" }}
                >
                  <div
                    className={`text-3xl ${
                      colorScheme.text
                    } transition-transform duration-300 ${
                      isActive ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="transform -rotate-90 whitespace-nowrap origin-center">
                      <p
                        className={`text-3xl font-black tracking-wider ${colorScheme.text}`}
                      >
                        {(course.shortLabel || course.code || "VEX 123")
                          .toString()
                          .toUpperCase()
                          .slice(0, 7)}
                      </p>
                      <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                        {course.shortLabel === "GO"
                          ? "VEX GO"
                          : course.shortLabel === "IQ"
                          ? "VEX IQ"
                          : "VEX AIM"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center`}
                  >
                       <Image
                          src={
                            "/course-icon.png"
                          }
                          alt="course-icon"
                          width={25}
                          height={25}
                          className="object-cover"
                        />
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div
                    className="bg-white p-8 h-full b-23 overflow-y-auto"
                    style={{ minWidth: "600px" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                        <Image
                          src={
                            course.image ||
                            course.heroicimage ||
                            "/course-hero.jpg"
                          }
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold course-main-title text-gray-900 mb-2">
                          {course.title}
                        </h2>
                        <p className="text-black-500">
                          {course.subtitle || "Code, Create & Express"}
                        </p>

                        <p className="course-details-main mt-1 leading-relaxed">
                          {course.description ||
                            "Course description will appear here."}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="course-age-group mt-5">
                            <p className="age-group-font">Age Group</p>
                            <p className="age-group-subfont">
                              {course.ageGroup ||
                                course.age_group ||
                                "Grades 1–2"}
                            </p>
                          </div>
                          <div className="course-age-group mt-5">
                            <p className="age-group-font">Total Lessons</p>
                            <p className="age-group-subfont text-center">
                              {course.totalLessons || course.lessons || 12}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-3xl course-obj-modal p-6 mt-5 shadow-[4px_-4px_10px_0_rgba(0,0,0,0.15)] bg-[#f2f2f2]">
                      <h3 className="f-14-title text-2xl mb-6">
                        Course Objectives
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-[70%_28%] gap-9 items-start">
                        <ul className="space-y-3">
                          {course.objectives?.length ? (
                            course.objectives.map((item, i) => (
                              <li key={i} className="flex items-start gap-4 -mb-[7px]">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M16 12L12 8" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M16 12L8 12" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M12 16L16 12" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                                </span>
                                <span className="f-13-subtitle text-base leading-relaxed">
                                  {item}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">
                              Objectives will be listed here.
                            </li>
                          )}
                        </ul>

                        <div className="objective-image flex justify-center items-center">
                          <Image
                            src={"/course-objective.png"}
                            alt={course.title}
                            width={83}
                            height={83}
                            className="objective-image"
                          />
                        </div>
                      </div>
                      <div className="pt-3 flex justify-center">
                        <Link
                          href={`/courses/${course.slug || course.id || "#"}`}
                          className="inline-flex items-center gap-3 text-white font-semibold px-3 py-1 rounded-full transition-all shadow-lg hover:shadow-xl bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] hover:from-[#FFCF20] hover:to-[#FF6F28]"
                        >
                          Explore More
                          <span className="text-xl leading-none flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#FF6F28] shadow-md">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
