import React from 'react';
import Image from 'next/image';

export default function CourseWorks() {
  return (
    <div className="course-works py-16">
      <div className="container-custom lg:px-8">
        <div className="mb-16 text-center sm:text-left ">
          <h2 className="course-work-h2">
            How It <span className="stem-gold">Works</span>
          </h2>
          <p className="course-work-p">
            Getting started with our Virtual Robotics offline course is easy. Here&apos;s a step-by-step guide for students joining in person at our learning center
          </p>
        </div>
                <div className="w-full mb-8">
          <Image 
            src='/howitworks.png' 
            alt='How it works process flow' 
            className='w-full h-auto object-contain'
            width={1200}
            height={200}
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="works-main-tag mb-3">Choose Your Course</h3>
            <p className="works-main-subtag">
              Browse our STEM and robotics programs and pick the one that suits your child&apos;s age and interest.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="works-main-tag mb-3">Offline Registration</h3>
            <p className="works-main-subtag">
              Visit our Nearest centre to register and check batch availability with our team.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="works-main-tag mb-3">Sign Up and Pay</h3>
            <p className="works-main-subtag">
              Complete the payment at the center or online to confirm your seat and receive course details.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="works-main-tag mb-3">Learn and Engage</h3>
            <p className="works-main-subtag">
              Attend interactive sessions, build real projects, and enjoy hands-on robotics learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}