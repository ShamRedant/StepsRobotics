"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import  "./css/Enquiry.css";

export default function Enquiry({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919123456789", "_blank");
  };

  const handleMailClick = () => {
    window.location.href = "mailto:enquiry@stepsrobotics.com";
  };

  const handleMobileClick = () => {
    window.location.href = "tel:+919123456789";
  };

  return (
    <div className="min-h-screen popup-min-heigh flex items-center justify-center px-4 sm:px-0">
      <div className="relative w-full max-w-3xl book-trail-popup rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="text-center px-4 sm:px-6 pt-8 sm:pt-10 pb-4">
          <div className="enquiry-model-box relative">
            <button
              onClick={onClose}
              className="absolute top-[24px] right-[24px] sm:top-[16px] sm:right-[10px] bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            </button>

            <h1 className="enquiry-main-title mb-4 sm:mb-5 text-[20px] sm:text-[28px] leading-tight">
              Ready to Build the Future?
            </h1>

            <div className="inline-block bg-white/90 px-4 sm:px-6 py-2 rounded-full shadow-md mb-3">
              <p className="enquiry-main-subtitle text-sm sm:text-base">
                Offline Enrollment for Steps Robotics is Now Open!
              </p>
            </div>
          </div>

          <p className="enquiry-subtitle mt-3 mb-2 text-sm sm:text-base">
            Limited seats available for our hands-on robotics workshops.
          </p>
          <p className="enquiry-subtitle italic text-sm sm:text-base">
            Contact us immediately...
          </p>
        </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 items-center px-4 sm:px-8 pb-0 sm:pb-6 md:pb-8">
          <div className="flex justify-center items-end md:order-1 order-2 h-full">
<div className="relative w-full h-[200px] sm:h-[280px] md:h-full mt-[-25px] md:mt-0">
           <Image
  src="/enquiry-popup.png"
  alt="Steps Robotics"
  fill
  className="object-cover mt-0 sm:mt-[25px] object-bottom"
  priority
/>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 md:order-2 order-1">
            <div className="enquiry-contact-box py-3 px-6 sm:px-8 shadow-md w-full max-w-sm">
              <p className="text-black-600 italic font-semibold text-sm">
                Contact Mobile
              </p>
              <p className="text-gray-900 italic font-medium text-base sm:text-lg">
                +91 91234 56789
              </p>
            </div>

            <div className="enquiry-contact-box py-3 px-6 sm:px-8 shadow-md w-full max-w-sm">
              <p className="text-black-600 italic font-semibold text-sm">
                Email Address
              </p>
              <p className="text-gray-900 italic font-medium text-base sm:text-lg">
                enquiry@stepsrobotics.com
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-2 justify-center items-center mt-2 sm:-mt-[15px]">
              <button
                onClick={handleWhatsAppClick}
                className="hover:scale-105 transition flex items-center justify-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                aria-label="Chat on WhatsApp"
              >
               <svg width="70" height="70" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M79.2779 29.5587L65.1023 16.8218C54.7625 7.5314 38.849 8.38209 29.5585 18.7219L16.8216 32.8975C7.53119 43.2374 8.38191 59.1508 18.7217 68.4413L32.8973 81.1782C43.2372 90.4686 59.1506 89.6179 68.4411 79.2781L81.178 65.1025C90.4684 54.7627 89.6177 38.8492 79.2779 29.5587Z" fill="#01E311"/>
  <path d="M67.3541 38.0187C64.1828 32.406 58.1926 28.7648 51.6654 28.5551C45.0459 28.3453 38.2377 31.6845 34.7559 38.0648C31.5846 43.8831 31.8363 51.0269 35.3936 56.7151C34.9195 59.3075 34.4455 61.8958 33.9715 64.4882C36.7443 64.0351 39.5129 63.5863 42.2857 63.1332C43.2841 63.6744 49.9287 67.1435 57.685 64.2743C58.6582 63.9135 66.1544 60.9981 68.8475 52.7552C71.3015 45.2548 67.9163 39.017 67.35 38.0145L67.3541 38.0187ZM66.1334 51.6519C63.9563 58.6196 57.6808 61.1701 56.8544 61.4889C49.6015 64.2868 43.3344 60.4611 42.6674 60.0374C40.9769 60.3982 39.2864 60.759 37.5959 61.1197L38.3929 55.9685C34.9405 51.1779 34.4917 44.8395 37.2309 39.6547C40.1128 34.2098 45.8219 31.3489 51.3759 31.4495C56.8796 31.5502 61.9721 34.5537 64.7072 39.2478C65.1938 40.0867 68.1176 45.3051 66.1334 51.6561V51.6519Z" fill="white"/>
  <path d="M46.4722 38.3962C46.6778 38.3962 46.8581 38.5262 46.9252 38.7192C47.2692 39.7511 48.6284 42.9182 48.5193 43.258C48.3935 43.6691 46.8287 44.8646 46.7658 45.4477C46.7029 46.0308 47.8649 47.6542 49.0856 48.9252C50.7426 50.6577 53.3601 51.7945 53.5741 51.8868C53.788 51.9791 55.4156 49.5796 55.7512 49.4286C56.0868 49.2776 60.4117 51.61 60.4117 52.0085C60.4117 52.407 60.0719 53.7745 59.279 54.861C58.7253 55.616 57.5005 55.9474 56.5902 56.0691C56.5692 56.0691 56.5482 56.0691 56.5273 56.0691C55.8393 55.9558 51.0949 55.4189 47.0133 51.396C43.6952 48.124 42.6968 44.399 42.3864 42.914C42.3822 42.8931 42.378 42.8721 42.378 42.8511C42.3612 42.3519 42.378 40.8795 43.4267 39.5875C43.8336 39.0883 44.5426 38.6143 44.7985 38.4507C44.8614 38.4088 44.9327 38.392 45.0082 38.392H46.4722V38.3962Z" fill="white"/>
</svg>    
              </button>
              <button
                onClick={handleMailClick}
                className="hover:scale-105 transition flex items-center justify-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                aria-label="Send Email"
              >
                     <svg width="70" height="70" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M82.5611 35.3492L71.0027 20.2149C62.4761 9.05053 46.5134 6.91215 35.349 15.4387L20.2148 26.9972C9.05038 35.5237 6.912 51.4864 15.4386 62.6508L26.997 77.7851C35.5236 88.9495 51.4863 91.0879 62.6507 82.5613L77.7849 71.0028C88.9493 62.4763 91.0877 46.5136 82.5611 35.3492Z" fill="url(#paint0_radial_9531_3688)"/>
  <path d="M60.0342 38.7391C58.2537 38.7391 56.8081 40.1848 56.8081 41.9653V59.6052H61.0432C62.0564 59.6052 62.8746 58.7828 62.8746 57.7739V41.5837C62.8746 40.0152 61.6028 38.7434 60.0342 38.7434V38.7391Z" fill="#32AA51"/>
  <path d="M37.9683 38.7391C39.7488 38.7391 41.1945 40.1848 41.1945 41.9653V59.6052H36.9593C35.9461 59.6052 35.1279 58.7828 35.1279 57.7739V41.5837C35.1279 40.0152 36.3997 38.7434 37.9683 38.7434V38.7391Z" fill="#4386F8"/>
  <path opacity="0.96" d="M61.7427 43.9494L53.9083 50.6136L49.3807 54.4672L44.4673 50.6815L36.3871 44.4581C34.9753 43.3728 34.7125 41.3464 35.7978 39.9347C36.7559 38.6925 38.5406 38.4594 39.7828 39.4175L49.1899 46.6625L58.1011 39.0784C59.2966 38.0609 61.0898 38.205 62.1072 39.4005C63.2604 40.7571 63.095 42.792 61.7427 43.9451V43.9494Z" fill="#EE4131"/>
  <path d="M56.8125 48.1421C56.8252 45.4755 56.8422 42.809 56.8549 40.1382C57.1856 39.8669 57.4526 39.638 57.6349 39.4769C57.7918 39.337 58.0038 39.1504 58.3132 38.9215C58.4998 38.7816 58.6354 38.6968 58.8092 38.6205C58.9958 38.54 59.1441 38.5061 59.2755 38.4764C59.2755 38.4764 59.7885 38.3577 60.3947 38.4128C60.6152 38.434 60.8102 38.4679 60.984 38.5103C61.0518 38.5272 61.4715 38.6417 61.8319 38.8961C61.9251 38.9639 62.0142 39.036 62.1032 39.1208C62.2092 39.2225 62.3025 39.3243 62.3788 39.4302C62.7094 39.8711 62.8832 40.4138 62.8832 40.9649V43.7629C60.8611 45.2212 58.8389 46.6796 56.8167 48.1379L56.8125 48.1421Z" fill="#FFB900"/>
  <path d="M41.1945 48.1676L41.152 40.4265C40.9994 40.3078 40.8892 40.2061 40.8129 40.134C40.7832 40.1043 40.7111 40.0322 40.5712 39.8923C40.4483 39.7694 40.4271 39.7482 40.3805 39.7101C40.3042 39.6465 40.2449 39.604 40.1346 39.5277C40.0159 39.443 39.999 39.4387 39.9142 39.3794C39.8421 39.3285 39.7785 39.2818 39.7276 39.2479C39.7276 39.2479 39.4521 39.0657 39.2019 38.9597C39.1299 38.93 39.0663 38.9088 39.0663 38.9088C38.9391 38.8664 38.8331 38.8409 38.7356 38.8198C38.7356 38.8198 38.2227 38.7053 37.6164 38.7562C37.396 38.7732 37.201 38.8113 37.0272 38.8537C36.9593 38.8707 36.5396 38.9809 36.1793 39.2268C36.086 39.2904 35.997 39.3624 35.908 39.443C35.802 39.5405 35.7087 39.6422 35.6324 39.744C35.3018 40.1721 35.1279 40.6936 35.1279 41.2277V43.9324C37.1501 45.3441 39.1723 46.7558 41.1945 48.1676Z" fill="#C5201A"/>
  <defs>
    <radialGradient id="paint0_radial_9531_3688" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48.9999 49) rotate(52.63) scale(34.9577)">
      <stop offset="0.495192" stopColor="white"/>
      <stop offset="1" stopColor="#EAEAEA"/>
    </radialGradient>
  </defs>
</svg>
              </button>
              <button
                onClick={handleMobileClick}
                className="hover:scale-105 transition flex items-center justify-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                aria-label="Call Now"
              >
               <svg width="70" height="70" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M80.1732 31.1732L66.8268 17.8268C56.9813 7.98134 41.0187 7.98134 31.1732 17.8268L17.8268 31.1732C7.98133 41.0187 7.98133 56.9814 17.8268 66.8268L31.1732 80.1732C41.0186 90.0187 56.9813 90.0187 66.8268 80.1732L80.1732 66.8268C90.0186 56.9813 90.0186 41.0186 80.1732 31.1732Z" fill="#0161FE"/>
  <path d="M40.4966 34.4401C39.8621 33.9947 39.0134 34.0116 38.3915 34.478C37.6394 35.0452 36.7864 35.8099 35.967 36.8226C35.925 36.873 35.8872 36.9234 35.8452 36.9739C34.1098 39.1882 33.3703 42.0202 33.7527 44.806C33.8031 45.1632 33.862 45.5287 33.9376 45.9069C35.0301 51.3693 38.3243 54.7938 40.9631 57.4703C43.9169 60.462 47.6775 64.2773 53.2155 64.6219C54.2618 64.6849 55.161 64.6135 55.8291 64.521C56.0308 64.4916 56.2324 64.4706 56.4341 64.4496C57.3081 64.3739 59.0309 64.0756 60.7158 62.8193C62.0898 61.794 62.8587 60.5671 63.2747 59.6973C63.5226 59.1805 63.5142 58.5838 63.2579 58.0712C62.8377 57.235 62.1276 56.13 60.9679 55.1173C60.7746 54.9493 60.5814 54.7938 60.3923 54.6509C59.7536 54.1719 59.1905 53.8778 58.9973 53.7811C58.8628 53.7181 57.0434 52.8609 55.4215 53.3568C53.245 54.0206 53.3627 56.5249 51.4718 56.8569C50.6903 56.9955 50.0684 56.6678 48.8247 56.0123C48.3036 55.7392 47.0599 55.0417 45.0725 52.8693C43.501 51.1508 42.4925 49.3986 41.8454 47.97C41.5681 47.3523 41.5092 45.9405 42.2572 44.9699C42.6017 44.5203 42.8707 44.5245 43.6732 43.6085C44.169 43.0497 44.4464 42.6127 44.6439 42.1043C44.6439 42.1043 44.9254 41.7135 44.8582 41.3185C44.6985 40.3899 44.3581 39.1126 43.5766 37.768C42.6438 36.1629 41.4504 35.0998 40.505 34.4359L40.4966 34.4401Z" fill="white"/>
  <path d="M63.237 45.6589C62.8042 45.6589 62.3965 45.4026 62.2201 44.9783C61.3377 42.8605 60.094 40.9487 58.5099 39.2932C56.9931 37.7049 55.2241 36.4107 53.2492 35.4443C52.703 35.1754 52.4761 34.5157 52.745 33.9695C53.0139 33.4232 53.6736 33.1963 54.2199 33.4652C56.43 34.5493 58.4091 35.9947 60.1024 37.7721C61.8714 39.6251 63.2664 41.7638 64.2496 44.1295C64.4849 44.6925 64.216 45.3354 63.6572 45.5707C63.5185 45.6295 63.3756 45.6547 63.2328 45.6547L63.237 45.6589Z" fill="white"/>
</svg>   
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}