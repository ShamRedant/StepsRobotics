import React from 'react'
import HeroicContact from '../component/HeroicContact'
import ContactWay from '../component/ContactWay'
import GetInTouch from '../component/GetInTouch'
import Maps from '../component/Maps'


// ✅ Page-level metadata (this overrides layout metadata)
export const metadata = {
  title: "Contact – STEPS Robotics",
  description:
    "Contact STEPS Robotics for details about robotics classes, STEM education programs, school workshops, and enrollment support. Our team is available to assist parents, schools, and students with program information and booking inquiries.",
  openGraph: {
    title: "Contact – STEPS Robotics",
    description:
      "Contact STEPS Robotics for details about robotics classes, STEM education programs, school workshops, and enrollment support. Our team is available to assist parents, schools, and students with program information and booking inquiries.",
    url: "https://stepsrobotics.com/contacts",
    images: [
      {
        url: "https://stepsrobotics.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "Robotics programs",
    "STEM workshops",
    "Robotics for kids",
    "STEPS Robotics programs",
    "Robotics classes"
  ],
};

export default function page() {
  return (
    <>
    <HeroicContact />
    <ContactWay />
    <GetInTouch />
    <Maps />
    </>
  )
}
