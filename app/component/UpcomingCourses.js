import React,{useState} from 'react';
import Image from 'next/image';
import Enquiry from './Enquiry';
import { Play, ArrowRight } from "lucide-react";


export default function UpcomingCourses() {
   const [showBookTrial, setShowBookTrial] = useState(false);
  
    const handleRegisterClick = () => setShowBookTrial(true);
    const closeModal = () => setShowBookTrial(false);
  const courses = [
    {
      id: 1,
      title: "Robotics Foundation",
      image: "/upcomes.png",
      venue: "ABC International",
      startDate: "15 Nov 2025",
      batch: "Evening Batch",
      remainingDays: 14
    },
    {
      id: 2,
      title: "Introduction Robot",
      image: "/upcomes.png",
      venue: "STAR International",
      startDate: "15 Nov 2025",
      batch: "Evening Batch",
      remainingDays: 14
    },
    {
      id: 3,
      title: "Robotics Foundation",
      image: "/upcomes.png",
      venue: "ABC International",
      startDate: "15 Nov 2025",
      batch: "Evening Batch",
      remainingDays: 14
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white">
      <div className="bg-white py-4">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg upcoming-title">
            Upcoming <span className="upcoming-title !text-[#EFBC08]">Courses</span>
          </h3>
          <button className="text-xs upcoming-course-view-btn hover:bg-gray-50">
            View All
          </button>
        </div>
        <p className="upcoming-description mb-1">
          Get ready to start your RoTM learning journey with our latest upcoming courses
        </p>

        {courses.map((course, index) => (
          <div
            key={course.id}
            className={`bg-white py-3 ${
              index < courses.length - 1 ? 'border-b course-border border-gray-300 pb-4 mb-3' : ''
            }`}
          >
            <h4 className="text-sm upcoming-course-name mb-3">
              {course.title}
            </h4>
            <div className="flex gap-3 mb-3">
              <div className="w-[100px] h-[100px] rounded-lg flex-shrink-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="w-full h-[110px] object-cover rounded-lg"
                  width={100}
                  height={100}
                />
                <p className="text-xs mt-2 upcoming-days">
                  Remaining Days: {course.remainingDays}
                </p>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  <div className="flex items-start">
                    <span className="text-xs upcoming-course-key w-20">Venue</span>
                    <span className="text-xs upcoming-course-value upcoming-course-venue">{course.venue}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs upcoming-course-key w-20">Start Date</span>
                    <span className="text-xs upcoming-course-value">{course.startDate}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs upcoming-course-key w-20">Batch</span>
                    <span className="text-xs upcoming-course-value">{course.batch}</span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={handleRegisterClick} className="bg-gradient-to-r from-[#FF6F28] to-[#FFCF20] py-1 hover:from-orange-500 hover:to-orange-600 text-white text-xs font-semibold pl-4 pr-1 rounded-full flex items-center gap-1 transition-all">
                      Enroll Now
                      <div className="bg-white rounded-full p-2 flex items-center justify-center shadow">
                        <ArrowRight className="w-3 h-3 text-black" />
                      </div>
                    </button>
                  </div>
                </div>
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
    </div>
  );
}
