"use client";
// app/page.js

import Image from 'next/image';
import Carousel from './component/Carousel';
import ProjectCard from "./component/ProjectCard";
import Robot from "@/public/robot.png"
import TestimonialsSection from './component/TestimonialsSection';

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import WhyChooseSection from './component/WhyChooseSection';
import StudyProcessGallery from './component/StudyProcessGallery';
import { ArrowRight } from 'lucide-react';
import CodingAdventures from './component/CodingAdventures';
import { fetchExploreCourses } from "@/app/utils/fetchData";
import { fetchWhyChoose } from "@/app/utils/fetchData";
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Empower from './component/Empower';
import Teacher from './component/Teacher';



// const projects = [
//   { image: "/Swetha.png", video: "/about/kid-1.mp4", name: "Aditi" },
//   { image: "/Sathish.png", video: "/about/kid-2.mp4", name: "Shankar" },
//   { image: "/Sandiya.png", video: "/about/kid-3.mp4", name: "Divya" },
//   { image: "/Swetha.png", video: "/about/kid-4.mp4", name: "Aditi Shakar" },
//   { image: "/Sathish.png", video: "/about/kid-5.mp4", name: "Mukesh Raj" },
//   { image: "/Sandiya.png", video: "/about/kid-1.mp4", name: "Vidhya Sree" },
// ];

const leftOfferings = [
  {
    title: "Academy Run Programs / Courses",
    icon: "/icons/stem.png",
    description: "Structured robotics and programming courses from beginner to advanced, designed and delivered by STEPS Robotics Academy.",
  },
  {
    title: "On Campus Program",
    icon: "/icons/school.png",
    description: "Year-round robotics and STEM clubs operated directly at your school campus.",
  },
  {
    title: "Train the Trainer",
    icon: "/icons/lab.png",
    description: "Train-the-trainer programs that equip educators to confidently teach robotics and coding in their classrooms.",
  }
];

const rightOfferings = [
  {
    title: "Robotics Competitions & Team Building",
    icon: "/icons/robotics.png",
    description: "End-to-end mentoring, team formation, and coaching for national and international robotics competitions.",
  },
  {
    title: "Robotics Research",
    icon: "/icons/competition.png",
    description: "Student-led innovation projects and research initiatives in robotics, AI, and automation.",
  },
  {
    title: "Industry & University Partnership",
    icon: "/icons/CSR.png",
    description: "Collaborative initiatives with universities and industry experts to co-develop, test, and continuously evolve the STEPS Robotics platform.",
  }
];


export default function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [projects, setProjects] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);


  // Fetch data from your API (See What kids built with STEPS Robotics)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/home/steps_robotics");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("❌ Error fetching steps robotics:", error);
      }
    }
    fetchData();
  }, []);


  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchExploreCourses();
        setCourses(data);
      } catch (err) {
        console.error("❌ Failed to load explore courses:", err);
      }
    }
    loadCourses();
  }, []);


  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchWhyChoose();
        setData(response);
      } catch (err) {
        console.error("Failed to load Why Choose STEPS:", err);
      }
    }
    loadData();
  }, []);

  if (!data) return null;

  const left = data.items.filter((i) => i.side === "left").sort((a, b) => a.order_index - b.order_index);
  const right = data.items.filter((i) => i.side === "right").sort((a, b) => a.order_index - b.order_index);
  const robot = data.main?.robot_image;






  return (
    <>

   
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Carousel />

      {/* Projects Section */}
      {/* <section className="py-6 kids_build px-4 mt-20">
        <div className="container-custom">
          {/* Heading */}
          {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug text-center font-[500] sm:text-left text-font-orbitron">
            See what kids built with{" "}
            <span className="text-yellow-500 text-font-orbitron">STEPS Robotics!</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed text-center sm:text-left text-font-poppins">
            With Steps Robotics, your child will build products in the real world to solve real world problems and become skilled in technologies
            that matter for the future. Best part — this happens while your child is playing!
          </p>
 */}
{/* 

          <div className="relative max-w-7xl mx-auto ">
            <button
              ref={prevRef}
              className={`absolute bg-yellow-400 left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full h-10 w-10
                   ${!canPrev ? "invisible pointer-events-none opacity-0" : ""}`}
              aria-label="Previous"
            >
              ←
            </button>

            <button
              ref={nextRef}
              className={`absolute bg-yellow-400 right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full h-10 w-10
                   ${!canNext ? "invisible pointer-events-none opacity-0" : ""}`}
              aria-label="Next"
            >
              →
            </button> */}
            {/* Swiper Slider */}
            {/* <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3.2 },
              }}
              className="cursor-grab"

              // Give Swiper the button nodes BEFORE init
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}

              // Init + update nav once refs are set
              onInit={(swiper) => {
                swiper.navigation.init();
                swiper.navigation.update();
                setCanPrev(!swiper.isBeginning);
                setCanNext(!swiper.isEnd);
              }}

              // Update button visibility as user scrolls
              onSlideChange={(swiper) => {
                setCanPrev(!swiper.isBeginning);
                setCanNext(!swiper.isEnd);
              }} */}

            {/* >
              {projects.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProjectCard
                    image={item.image}
                    name={item.title}
                    onClick={() => setActiveVideo(item.video)}
                  />
                </SwiperSlide>
              ))}
            </Swiper> */}


            {/* Fullscreen Video Modal */}
            {/* {activeVideo && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Semi-transparent overlay */}
                {/* <div
                  className="absolute inset-0 bg-black opacity-70"
                  onClick={() => setActiveVideo(null)} // click outside to close
                ></div> */}

                {/* Video container */}
                {/* <div className="relative z-10 w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
                  <video
                    src={activeVideo}
                    controls
                    autoPlay
                    className="w-full h-auto"
                  />
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="absolute top-3 right-3 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition"
                  >
                    ✕
                  </button> */}
                {/* </div>
              </div>
            )}

          </div>
        </div> */}


      {/* </section> */} 

      {/**Robot section */}
      < section className="py-6 px-4 mt-10 mb-10" >
        <div className=" container-custom">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug text-center font-[500] sm:text-left text-font-orbitron">
              What We Offer at <span className="text-yellow-400 text-font-orbitron">STEPS Robotics</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed text-center sm:text-left text-font-poppins">
            STEPS Robotics goes beyond classrooms to bring full-spectrum robotics and STEM experiences to students, teachers, and institutions.
            </p>
          </div>
          <div className="mr-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 w-auto gap-8 items-center">
            <div className="space-y-4 lg:ml-auto">
              <div className="flex flex-col items-start w-full sm:max-w-[800px] lg:max-w-[330px]">
                <div className="bg-white  rounded-[3rem] px-6 py-4 shadow-md flex flex-row items-center gap-3 mb-2 w-full">
                  <h3 className="text-base steps_robotics_child_h3 md:text-lg text-font-poppins break-words text-start flex-1">
                    {left[0]?.heading}
                  </h3>
                  <div className="flex-shrink-0">
                    <Image
                      src={left[0]?.icon || "/placeholder.png"}
                      alt={left[0]?.heading || ""}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="sub-title text-sm leading-relaxed text-left w-full px-5 whitespace-pre-line">
                  {left[0]?.description}
                </p>
              </div>

              <div className="flex flex-col items-start w-full sm:max-w-[800px] lg:max-w-[330px]">
                <div className="bg-white rounded-[3rem] px-6 py-4 shadow-md flex flex-row items-center gap-3 mb-2 w-full">
                  <h3 className="text-base steps_robotics_child_h3 md:text-lg text-font-poppins break-words text-start flex-1">
                    {left[1]?.heading}
                  </h3>
                  <div className="flex-shrink-0">
                    <Image
                      src={left[1]?.icon || "/placeholder.png"}
                      alt={left[1]?.heading || ""}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm leading-relaxed sub-title text-left w-full px-5 whitespace-pre-line">
                  {left[1]?.description}
                </p>
              </div>
              <div className="flex flex-col items-start w-full sm:max-w-[800px] lg:max-w-[330px] mt-[23px]">
                <div className="bg-white rounded-[3rem] px-6 py-4 shadow-md flex flex-row items-center gap-3 mb-2 w-full">
                  <h3 className="text-base steps_robotics_child_h3 md:text-lg text-font-poppins break-words text-start flex-1">
                    {left[2]?.heading}
                  </h3>
                  <div className="flex-shrink-0">
                    <Image
                      src={left[2]?.icon || "/placeholder.png"}
                      alt={left[2]?.heading || ""}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="sub-title text-sm leading-relaxed text-left w-full px-5 whitespace-pre-line">
                  {left[2]?.description}
                </p>
              </div>
            </div>
<div className="flex robot_center_image justify-center items-center">
  <div className="relative">
    <div className="relative w-100 h-100 md:w-110 md:h-110">
      <Image
        src={robot}
        alt={data.main?.title || "STEPS Robot"}
        width={1000}
        height={200}
        className="object-contain w-full h-full"
      />
      <video
        src="/video/robo-anim.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[70%] h-[45%] -mt-[26px]
          object-contain robo-anim
          z-20
          pointer-events-none
        "
      />
    </div>
  </div>
</div>
            <div className="space-y-4">
              <div className="flex flex-col items-start w-full sm:max-w-[800px] lg:max-w-[330px]">
                <div className="bg-white rounded-[3rem] px-6 py-4 shadow-md flex flex-row items-center gap-3 mb-2 w-full">
                  <div className="flex-shrink-0">
                    <Image
                      src={right[0]?.icon || "/placeholder.png"}
                      alt={right[0]?.heading || ""}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base steps_robotics_child_h3 md:text-lg text-font-poppins font-bold break-words text-end flex-1">
                    {right[0]?.heading}
                  </h3>
                </div>
                <p className="sub-title text-sm leading-relaxed text-right w-full px-9 whitespace-pre-line">
                  {right[0]?.description}
                </p>
              </div>
              <div className="flex flex-col items-start w-full sm:max-w-[800px] lg:max-w-[330px]">
                <div className="bg-white rounded-[3rem] px-6 py-4 shadow-md flex flex-row items-center gap-3 mb-2 w-full">
                  <div className="flex-shrink-0">
                    <Image
                      src={right[1]?.icon || "/placeholder.png"}
                      alt={right[1]?.heading || ""}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base steps_robotics_child_h3 md:text-lg text-font-poppins font-bold break-words text-end flex-1">
                    {right[1]?.heading}
                  </h3>
                </div>
                <p className="sub-title text-sm leading-relaxed text-right w-full px-9 whitespace-pre-line">
                  {right[1]?.description}
                </p>
              </div>
              <div className="flex flex-col items-start w-full sm:max-w-[800px] lg:max-w-[330px]">
                <div className="bg-white rounded-[3rem] px-6 py-4 shadow-md flex flex-row items-center gap-3 mb-2 w-full">
                  <div className="flex-shrink-0">
                    <Image
                      src={right[2]?.icon || "/placeholder.png"}
                      alt={right[2]?.heading || ""}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base steps_robotics_child_h3 md:text-lg text-font-poppins font-bold break-words text-end flex-1">
                    {right[2]?.heading}
                  </h3>
                </div>
                <p className="sub-title text-sm leading-relaxed text-right w-full px-9 whitespace-pre-line">
                  {right[2]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/**Explore Learning */}
      {/* < section className='explore_learning pb-16 py-2 px-5 relative' style={{
        backgroundImage: "url('/Explore_screen_bg-v1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
      }>
        <div className="container-custom mb-4">
          <h2 className="text-2xl sm:text-3xl font-[500] lg:text-4xl mb-4 explore_learning_robotics leading-snug text-center sm:text-left text-font-orbitron">
            Explore Learning with <span className="text-yellow-400 text-font-orbitron">STEPS Robotics</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed text-center sm:text-left text-font-poppins">
            From structured courses to dynamic programs, STEPS Robotics offers multiple pathways for students to develop essential STEM and coding skills.
            Our approach blends theory with hands-on practice, preparing learners to thrive in the technology-driven word.
          </p>


          <div className="relative exploring_web flex flex-col justify-center items-center gap-8 p-2 border-yellow-400 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="relative border-yellow-400 exploring_card h-80 flex flex-col border-2 border-dotted rounded-2xl p-6 overflow-visible"
                >
                
                  <div
                    className="absolute inset-0 bg-cover bg-left opacity-40 rounded-2xl z-0"
                    style={{ backgroundImage: "url('/explore_course_bg.png')" }}
                  ></div>

                  <div className="flex flex-col md:flex-row relative">
                    <div className="flex-shrink-0 explore_image_responsive relative border-2 m-2 p-2 border-white shadow md:top-[-70px] rounded_image mx-auto md:mx-0">
                      <Image
                        src={course.image || "/placeholder.png"}
                        alt={course.title}
                        width={200}
                        height={250}
                        className="object-cover rounded shadow h-65 w-60"
                      />
                    </div>

                    <div className="flex-1 flex flex-col mt-4 md:mt-[-40px] course_heading_des explore_right_section pl-0 md:pl-4 justify-center text-center md:text-left">
                      <h1 className="text-xl font-bold mb-1">{course.title}</h1>
                      <p className="text-gray-600 mb-2 steps_list_desc leading-relaxed">
                        {course.description}
                      </p>

                      <ul className="steps_list_items mb-4">
                        {course.list_items?.map((item, i) => (
                          <li key={i} className="flex mb-2 items-center gap-2 justify-center md:justify-start">
                            <ArrowRight className="w-5 h-5 text-orange-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform responisve_explore -translate-x-1/2 translate-y-1/2 mt-61">
                    <button
                      onClick={() =>
                        course.button_link && window.open(course.button_link, "_blank")
                      }
                      className="explore_button bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-xl py-1 px-2 rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all"
                    >
                      <p className='ml-4'>{course.button_text || "Explore More"}</p>
                      {/* <div className="bg-white rounded-full p-2">
                        <ArrowRight className="w-6 h-6 text-orange-500" />
                      </div> 
                      <span className="relative bg-white rounded-full p-2"><ArrowRight className="w-6 h-6 text-black" /></span>

                    </button>

                  </div>


                </div>
              ))}
            </div>
          </div>






        </div>


      </section > */}

      <Empower />
      < CodingAdventures />
      < WhyChooseSection />
      < TestimonialsSection />
<Teacher />
      < StudyProcessGallery />
      
    </div >


     </>

  );
}