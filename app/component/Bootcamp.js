'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useParams, usePathname } from "next/navigation";
import axios from 'axios';
import { Clock, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import UpcomingCourses from './UpcomingCourses';

export default function Bootcamp({ title }) {
  const [activeTab, setActiveTab] = useState('course');
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState({});
  const [openModule, setOpenModule] = useState(null);
  const params = useParams();
  const id = params.id;
  const pathname = usePathname();
  const url = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";

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
 useEffect(() => {
  const fetchModules = async () => {
    try {
      const res = await axios.get(`/api/modules?courseId=${id}`);
      setModules(res.data || []);

      const lessonPromises = res.data.map((m) =>
        axios.get('/api/lessons', { params: { moduleId: m.id } })
      );

      const lessonResults = await Promise.all(lessonPromises);

      const lessonsMap = {};
      res.data.forEach((m, i) => {
        lessonsMap[m.id] = lessonResults[i]?.data || [];
      });

      setLessons(lessonsMap);

      if (res.data.length > 0) {
        setOpenModule(res.data[0].id);
      }
    } catch (err) {
      console.error('Error fetching modules/lessons:', err);
    }
  };

  fetchModules();
}, [id]);
  return (
    <div className="min-h-screen bootcamp-section pt-8 pb-5 px-4">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 -mt-[37px]  sm:-mt-[150px] md:-mt-[155px] lg:-mt-[37px] mt-bootcamp">
            <div className="w-full rounded-xl px-[30px] pt-[30px] bg-[#FFFCE7]">
              <div className="mb-5">
                <h1 className="bootcamp-title mb-2">
                  Robotics Boot Camp – Weekend Hands-On Workshop
                </h1>
                <p className="bootcamp-description leading-relaxed">
                  Get ready to bring your virtual learning to life! Our Robotics Boot Camp is an exciting, hands-on weekend program specifically designed for students who have completed the Virtual Robotics course. It&apos;s the perfect chance to turn your ideas into working robots while having fun with peers and mentors.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-[70%]">
                    <div className="mb-4">
                      <h3 className="bg-white bootcamp-drop-title rounded-[0 0 10px 10px] stem-gold p-[17px 17px 17px 28px] shadow-md">Boot Camp Schedule</h3>
                      <div className="bg-white rounded-bl-[15px] rounded-br-[15px] pt-[10px] pb-[20px] pl-[25px] pr-[20px] shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center gap-4">
                            <Calendar className="w-6 h-6 text-orange-500 flex-shrink-0" />
                            <div>
                              <div className="bootcamp-details-title">Days</div>
                              <div className="bootcamp-details-description">Saturday & Sunday</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Clock className="w-6 h-6 text-orange-500 flex-shrink-0" />
                            <div>
                              <div className="bootcamp-details-title">Duration</div>
                              <div className="bootcamp-details-description">2 Days (Weekend)</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 md:col-span-2">
                            <Clock className="w-6 h-6 text-orange-500 flex-shrink-0" />
                            <div>
                              <div className="bootcamp-details-title">Time</div>
                              <div className="bootcamp-details-description">10:00 AM – 4:00 PM (includes snack breaks)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='pb-[30px]'>
                      <h3 className="bg-white bootcamp-drop-title rounded-[0 10px 0 10px] stem-gold p-[17px 17px 17px 28px] shadow-md">What&apos;s Included</h3>
                      <div className="bg-white rounded-bl-[15px] rounded-br-[15px] pt-[10px] pb-[20px] pl-[25px] pr-[20px] shadow-sm">
                        {[
                          'Robotics hardware kit access (During boot camp)',
                          'Completion Certificate & Awards',
                          'Exclusive STEPS Boot Camp Badge',
                          'Light refreshments provided both days'
                        ].map((item, i) => (
                          <div key={i} className="flex items-start pt-[5px] gap-3 pb-[11px] sm:pb-0">
                            <span className="text-orange-500 -mt-[10px] text-xl font-bold">→</span>
                            <span className="bootcamp-details-description">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-[30%] flex items-end justify-center p-8 md:p-0 mt-[-20px] md:mt-0">
                    <Image
                      src="/child-course.png"
                      alt="child with robotics"
                      width={600}
                      height={281}
                      className="object-contain max-h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="flex border-b">
                {['course', 'success', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === tab
                        ? 'text-[#FFA91E] border-b-6 border-[#FFA91E]'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab === 'course'
                      ? 'Course Content'
                      : tab === 'success'
                        ? 'Success stories'
                        : 'Reviews'}
                  </button>
                ))}
              </div>
              {activeTab === 'course' && (
                <div className="p-6 space-y-3">
                  {modules.map((module, i) => {
                    const isActive = module.id === openModule;
                    return (
                      <div key={module.id} className="rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            setOpenModule(isActive ? null : module.id)
                          }
                          className={`w-full flex justify-between items-center p-4 font-semibold transition-colors ${isActive
                              ? 'bg-[#FFCE64] text-white'
                              : 'bg-gray-50 text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                          <span className="course-detail-module text-left flex-1 pr-4">
                            {`Module ${i + 1}: ${module.title}`}
                          </span>
                          <span
                            className={`text-2xl leading-none transition-transform duration-300 ${isActive ? 'rotate-45' : ''
                              }`}
                          >
                            +
                          </span>
                        </button>

                        {isActive && (
                          <div className="bg-white text-gray-700 p-4 space-y-3 animate-fadeIn">
                            {lessons[module.id]?.length > 0 ? (
                              lessons[module.id].map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="py-2 px-4 pb-2 model-lesson-accordian bg-white rounded hover:bg-orange-100 transition-colors"
                                >
                                  <p className="font-normal">{lesson.title}</p>
                                </div>
                              ))
                            ) : (
                              <div className="py-2 px-4 bg-white rounded">
                                <p className="font-normal text-gray-400">
                                  No lessons available
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>

          <div className="space-y-6 -mt-[180px] class-instructor-popup">
            <div className="rounded-lg p-6 shadow-xl">
              <div className="text-center mb-4">
                <span className="px-3 py-1 rounded-full class-instructor-text">
                  Class <span className='class-instructor-gold'>Instructor</span>
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Image
                    src='/instructor.png'
                    alt='instructor'
                    width={600}
                    height={484}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="class-instructor-name mb-1">Ms. Malathi</h3>
                <p className="class-instructor-designation text-gray-600 text-left mb-3">Computer science - Robotic education</p>

                <div className="flex gap-6 text-sm text-gray-700 mb-4">
                  <div className="flex items-center pr-[40px] gap-1">
                    <span className="text-yellow-500">👥</span>
                    <span className="class-instructor-list">26 Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">📚</span>
                    <span className="class-instructor-list">11 Courses</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 text-left leading-relaxed">
                  Passionate STEM educator with a strong foundation in Computer Science and Robotics. Experienced in teaching coding, robotics fundamentals, and hands-on STEM projects for school and college students.
                </p>
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
                <UpcomingCourses />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
