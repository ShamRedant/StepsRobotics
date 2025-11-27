import React from 'react';
import Image from 'next/image';

export default function CourseNews() {
  return (
    <div className='course-news-letters -mt-[130px] relative w-full  flex p-1'>
      <div className='relative w-full max-w-6xl  rounded-3xl overflow-hidden'>
        <div className='flex flex-col lg:flex-row items-stretch pt-[55px]'>
        <div className='w-full lg:w-[60%] relative min-h-[250px] lg:min-h-[320px]'>
         <video 
  src="/video3.mp4" 
  className="w-full h-full object-cover rounded-2xl" 
  width={320} 
  height={190} 
  autoPlay 
  loop 
  muted 
  playsInline
/>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='rounded-full flex items-center justify-center'>
                   <Image
                     src="/workshopplay.gif"
                     alt="WorkshopPlay"
                     className="w-full h-[139px] rounded-[30px]"
                     width={139}
                     height={139}
                   />
              </div>
            </div>
          </div>
          <div className='course-news-letter-model w-full lg:w-[40%]'>
            <div className='relative course-news-letter w-full bg-yellow-300 p-6 lg:p-6 flex items-center'>
              <div className='w-full'>
                <div className='inline-block course-news-letter-main bg-black text-white px-4 py-1.5 rounded-lg text-xs mb-5 tracking-wider'>
                  OUR NEWSLETTER
                </div>

                <h2 className='text-3xl lg:text-4xl course-news-letter-top-title mb-5 leading-tight'>
                  Get Our <br></br> Every Single Notifications
                </h2>

                <p className='course-news-letter-text mb-6 text-sm leading-relaxed'>
                  Sit amet consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua suspendisse ultrices gravida viverra facilisis.
                </p>
                <div className='flex flex-wrap gap-8 mb-8'>
                  <div className='flex items-center'>
                    <div className='w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <span className='ml-2.5 course-news-letter-points mt-[7px] font-medium text-sm'>Regular Updates</span>
                  </div>

                  <div className='flex items-center'>
                    <div className='w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <span className='ml-2.5 course-news-letter-points mt-[7px] font-medium text-sm'>Weekly Updates</span>
                  </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-3 course-news-letter-emailbox'>
                  <input
                    type='email'
                    placeholder='Email Address'
                    className='flex-1 course-news-letter-email px-6 py-2.5 h-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray text-white placeholder-gray-500 border-0 text-sm'
                  />
                  <button className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-sm course-news-letter-btn flex items-center justify-center gap-2 transition-all whitespace-nowrap text-sm'>
                    Subscribe
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
