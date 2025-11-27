'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import Enquiry from "./Enquiry";
import { Clock, Users, FileText, ArrowRight ,BarChart, Monitor, Award, Facebook, Twitter, Linkedin, Share2} from "lucide-react";

export default function CourseDetails({ title }) {
  const [course, setCourse] = useState(null);
  const pathname = usePathname();
  const url = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
   const [showBookTrial, setShowBookTrial] = useState(false);

  const handleRegisterClick = () => setShowBookTrial(true);
  const closeModal = () => setShowBookTrial(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const openPopup = (shareUrl) => {
    window.open(
      shareUrl,
      'ShareWindow',
      'height=500,width=600,resizable=yes,scrollbars=yes'
    );
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      const courseList = Array.isArray(res.data) ? res.data : [];

      const courseDetails = await Promise.all(
        courseList.map(async (course) => {
          let objectives = [];
          let highlights = [];
          try {
            const objRes = await axios.get(`/api/courses/objectives?courseId=${course.id}`);
            objectives = Array.isArray(objRes.data)
              ? objRes.data.map((o) => o.objective)
              : [];
          } catch {}

          try {
            const hlRes = await axios.get(`/api/courses/highlights?courseId=${course.id}`);
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

      if (courseDetails.length > 0) {
        setCourse(courseDetails[0]);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const highlightStyles = [
    { icon: Clock, bgColor: "bg-cyan-100", iconColor: "text-cyan-500",iconbgcolor:"#39B8E1" },
    { icon: Monitor, bgColor: "bg-orange-100", iconColor: "text-orange-500" ,iconbgcolor:"#F47525"},
    { icon: Users, bgColor: "bg-lime-100", iconColor: "text-lime-600",iconbgcolor:"#9DC61F" },
    { icon: Award, bgColor: "bg-purple-100", iconColor: "text-purple-500",iconbgcolor:"#AE71EC" }
  ];

  if (!course)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image
        src="/logo.png"
        alt="Loading"
        width={120}
        height={120}
        className="fade-logo"
      />
    </div>
  );
  return (
    <div className="course-details-section">
    <div className="container-custom py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <Link href='/courses' className="border-hr-text hover:text-yellow-500 transition">Courses</Link>
            <span className="mx-2 border-hr-text">›</span>
            <span className="text-yellow-500 border-hr-text">{course.title}</span>
          </div>
          <hr className="mt-3 border-t-2 border-hr-breadcrumb border-dashed border-yellow-400" />

          <h1 className="course-details-title">
            {course.title}
          </h1>
          <div className="flex items-center gap-2 mb-[5px]">
            <span className="text-yellow-400 text-lg">★★★★☆</span>
            <span className="course-rating">{course.rating}4.5/5</span>
          </div>
          <p className="course-model-title leading-relaxed">{course.description}</p>
          
          <div>
            <h2 className="text-xl f-14-title mb-3">Course Objectives</h2>
            <ul className="space-y-2 text-gray-700">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex objective-points items-start gap-2">
                  <span className="objective-bullets">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 12L12 8" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 12L8 12" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16L16 12" stroke="#FFA228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="course-highlights-title mb-3">Course Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-4">
   {course.highlights.map((hl, i) => {
  const style = highlightStyles[i % highlightStyles.length];
  const IconComponent = style.icon;

  return (
    <div
      key={i}
      className={`rounded-sm p-3 flex items-center gap-4 hover:shadow-md transition-all duration-300 ${style.bgColor}`}
    >
    <div
  className="rounded-full hvr-grow p-3 flex items-center justify-center"
  style={{ backgroundColor: style.iconbgcolor }}
>
<IconComponent
  className={`${style.iconColor} text-white`}
  size={28}
  strokeWidth={2}
/>
      </div>
      <p className="highlights-points flex-1">{hl}</p>
    </div>
  );
})}
            </div>
          </div>
        </div>

<div className="bg-white shadow-lg course-details-class-popup -mt-[120px] mb-[130px] rounded-2xl px-3 py-4 space-y-6 relative">
  <div className="relative">
    <Image
      src="/course-demo.png"
      alt={course.title}
      width={400}
      height={250}
      className="rounded-2xl object-cover w-full"
    />
    <div className="absolute right-[5px] top-[155px] sm:w-24 md:w-28">
      <div className="relative">
     <Image
  src="/offers.png"
  alt="Special Offer"
  width={110}
  height={110}
  className="
    h-auto 
    w-[110px]          
    drop-shadow-lg
    max-sm:w-[98px]       
    max-sm:ml-[-15px]       
  "
/>
      </div>
    </div>
  </div>

  <div>
    <h2 className="text-lg font-semibold font-orbitron text-gray-800 mb-3 px-3 border-b border-gray-100 pb-2">
      Course Includes
    </h2>
    <div className="space-y-3  px-3 text-gray-700 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
     <Image
  src="/user-star-line.svg"
  alt="Steps Robotics"
  width={18}
  height={18}
  className="object-contain inline-block text-yellow-500"
  priority
/>
          <span className="course-include-title">Batch of Students:</span>
        </div>
        <span className="course-include-description">50 Students</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
              <Image
  src="/book-3-line.svg"
  alt="Steps Robotics"
  width={18}
  height={18}
  className="object-contain inline-block text-yellow-500"
  priority
/>
          <span className="course-include-title">Lessons:</span>
        </div>
        <span className="course-include-description">{course.lessons || "12 Lessons"}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-yellow-500" size={18} />
          <span className="course-include-title">Duration:</span>
        </div>
        <span className="course-include-description">{course.duration || "12 Weeks"}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart className="text-yellow-500" size={18} />
          <span className="course-include-title">Quiz:</span>
        </div>
        <span className="course-include-description">1 Quiz</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="text-yellow-500" size={18} />
          <span className="course-include-title">Level:</span>
        </div>
        <span className="course-include-description">{course.level || "All Levels"}</span>
      </div>
    </div>
  </div>
<div className="pt-1">
  <div className="flex social-icons-course items-center justify-between text-gray-600">
    <span className="share-icon">Share:</span>
  <div className="flex items-center gap-2">
  {/* Copy Link */}
 <Image
    src="/icons/fb-icon.png"
    alt="Share on Facebook"
    width={18}
    height={18}
    title="Share on Facebook"
    onClick={() =>
      openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    }
    className="cursor-pointer transition-all duration-200 inline-block hover:brightness-125 hover:scale-110"
  />

  <Image
    src="/icons/twitter-icon.png"
    alt="Share on Twitter"
    width={18}
    height={18}
    title="Share on Facebook"
    onClick={() =>
      openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    }
    className="cursor-pointer transition-all duration-200 inline-block hover:brightness-125 hover:scale-110"
  />
   <Image
    src="/icons/pinterest-line.png"
    alt="Share on Twitter"
    width={18}
    height={18}
    title="Share on Facebook"
    onClick={() =>
      openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    }
    className="cursor-pointer transition-all duration-200 inline-block hover:brightness-125 hover:scale-110"
  />
   <Image
    src="/icons/linkedin-icon.png"
    alt="Share on Twitter"
    width={18}
    height={18}
    title="Share on Facebook"
    onClick={() =>
      openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    }
    className="cursor-pointer transition-all duration-200 inline-block hover:brightness-125 hover:scale-110"
  />
    </div>
  </div>
</div>
                <div className="flex justify-center">
  <button onClick={handleRegisterClick} className="event-enroll-btn flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] text-white pl-[20px] pr-[7px] pt-[7px] pb-[7px] rounded-full font-semibold hover:shadow-lg transition">
    Enroll Now <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
  <ArrowRight className="w-4 h-4 text-black" />
</div>
  </button>
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
    </div>
    </div>
  );
}