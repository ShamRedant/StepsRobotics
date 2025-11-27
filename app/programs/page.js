import React from 'react'
import ProgramsHeroic from '../component/ProgramsHeroic'
import Workshop from '../component/Workshop'
import Choose from '../component/Choose'
import Join from '../component/Join'
import WorkShopRobotics from '../component/WorkShopRobotics'

// ✅ Page-level metadata (this overrides layout metadata)
export const metadata = {
  title: "Programs – STEPS Robotics",
  description:
    "Explore STEM programs, robotics workshops, and hands-on learning courses offered by STEPS Robotics.",
  openGraph: {
    title: "Programs – STEPS Robotics",
    description:
      "Explore hands-on robotics workshops and STEM educational programs for kids.",
    url: "https://stepsrobotics.com/programs",
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
      <ProgramsHeroic />
      <Workshop />
      <Choose />
      <Join />
      <WorkShopRobotics />
    </>
  )
}
