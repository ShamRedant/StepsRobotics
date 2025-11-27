import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { whyChooseSTEPS } from '../utils/fetchData';

export default function WhyChooseSection() {
  const [sectionData, setSectionData] = useState({});
  const { features = [], image_one, image_two } = sectionData;

  useEffect(() => {
    async function loadData() {
      try {
        const data = await whyChooseSTEPS();
        console.log("✅ API Full Response:", data);

        // ✅ Adjust according to structure
        setSectionData(data?.section_data || {});
      } catch (err) {
        console.error("❌ Failed to load Why Choose STEPS data:", err);
      }
    }
    loadData();
  }, []);
  return (
    <section className='explore_learning px-4 pt-15' 
    style={{ 
      backgroundImage: "url('/why_choose_STEPS.jpg')", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      unoptimized: true
     }}
    >
      <div className="container-custom -mb-4 pb-20">
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[500] mb-4 leading-snug text-center sm:text-left text-font-orbitron">
            Why Choose{" "}
            <span className="text-yellow-500 text-font-orbitron">STEPS Robotics</span> for Your Child?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed text-center sm:text-left text-font-poppins">
            With so many options out there, finding the right course matters.
            Our programs combine creativity, logic, and hands-on practice
            to build real-world skills across coding, robotics, AI, and more.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          <div className="relative flex why_choose_steps_ flex-col gap-6 md:gap-8">
            <div className="relative flex justify-start md:justify-center lg:justify-start">
              <div className="relative why_choose_image_1">
                <Image
                  src={image_one || "/Swetha.png"}
                  alt="Kids with mentor"
                  width={148}
                  height={148}
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover relative z-10"
                />
                <div className="absolute why_choose_tale_1_1 bottom-4 -right-18 w-16 h-16 top-46 bg-teal-400"></div>
                <div className="absolute  why_choose_tale_1_2 top-[115px] section_1_red -right-35 w-16 h-16 bg-red-400 z-0"></div>
              </div>
            </div>
            <div className="relative flex justify-end right-10  -top-8 md:justify-center lg:justify-end">
              <div className="relative why_choose_image_2">
                <Image
                  src={image_two || "/Swetha.png"}
                  alt="Kids with mentor"
                  width={148}
                  height={148}
                  className="w-48 h-48 sm:w-56 sm:h-56 sm:w-56 md:w-64 md:h-64 object-cover shadow-lg relative z-10"
                />


                <div className="flex why_choose_sex_2_tale absolute top-21 -left-54 w-35 h-30 bg-yellow-500  z-0"></div>
                <div className="absolute top-4 why_choose_sex_2_tale_1 -left-18 w-16 h-16 bg-red-400  z-0"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 gap-6 md:gap-8 lg:gap-12">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="!w-auto !h-[100px]"
                  width={200}
                  height={200}
                />
                <div className="pt-2">
                  <h4 className="text-gray-900 text-base sm:text-lg leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-gray-900 text-base sm:text-lg leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}