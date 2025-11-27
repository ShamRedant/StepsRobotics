"use client";
import React, { useState } from "react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null); // default closed, all +

  const faqs = [
    {
      question: "How will my child learn and build robotics projects?",
      answer:
        "Students learn through hands-on activities conducted inside their school as part of a structured NEP-aligned curriculum. Each session includes guided building, coding, and problem-solving using age-appropriate robotics kits. The kits are designed for beginners and follow a learn-by-doing approach. Even first-time learners can assemble and operate them with step-by-step guidance from our trained instructors.",
    },
    {
      question: "Is it difficult to use your Robotics Kits?",
      answer:
        "Not at all! Our kits are designed for students with no prior experience. Each comes with guided lessons and visual instructions to make learning fun and easy.",
    },
    {
      question: "What will my child learn from this Robotics Program?",
      answer:
        "Your child will gain skills in problem-solving, coding, engineering design, teamwork, and creativity through project-based learning activities.",
    },
    {
      question: "What is included in the Robotics Kit provided?",
      answer:
        "Each kit includes sensors, motors, controllers, and building materials suitable for the student's grade level and course module.",
    },
    {
      question: "When and where are the Robotics sessions conducted?",
      answer:
        "Sessions are conducted during or after school hours, depending on the school’s schedule, in a hands-on, classroom-like environment.",
    },
    {
      question: "Will my child be able to create their own ideas and projects?",
      answer:
        "Absolutely! The program encourages students to innovate and build their own unique creations beyond the guided lessons.",
    },
    {
      question: "Can my child design and build something original on their own?",
      answer:
        "Yes. Once your child understands the basics, they’re encouraged to explore their creativity through independent or group projects.",
    },
  ];

  return (
    <div className="bg-white faq-section text-black mt-[40px]">
      <div className="container-custom">
        <h2 className="faq-heading mb-2">
          Frequently Asked{" "}
          <span className="faq-heading-span text-[#EFBC08]">Questions</span>
        </h2>

        <p className="faq-description mb-8">
          Browse through commonly asked questions for clarity on our curriculum
          and services. We’ve compiled everything you need to know in a simple,
          easy-to-read format.
        </p>

        <div className="border-t border-gray-300">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className={`w-full text-left py-4 font-medium faq-points-title transition-all flex justify-between items-center ${
                  openIndex === index
                    ? "text-[#EF9E08]"
                    : "text-gray-800 hover:text-[#EF9E08]"
                }`}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                {faq.question}
                <span className="text-lg font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && faq.answer && (
                <div className="bg-[#fdf8e8] border-t border-b border-[#cecece] text-gray-700 px-6 py-4 text-sm faq-points-description leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
