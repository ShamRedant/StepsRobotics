
import React from 'react'
import HeroicCourse from '@/app/component/HeroicCourse'
import CourseDetails from '@/app/component/CourseDetails'
import Bootcamp from '@/app/component/Bootcamp'
import HowDifferent from '@/app/component/HowDiffrent'
import MightIntrest from '@/app/component/MightIntrest'
import axios from 'axios'


// export async function generateMetadata({ params }) {
//   const { id } = params;

//   // Fetch course data
//   const res = await axios.get(`/api/courses/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return {
//       title: "Course Not Found | STEPS Robotics",
//       description: "This robotics course is not available.",
//     };
//   }

//   const course = await res.json();

//   const pageTitle = course.title || "Course";
//   const pageDesc = course.description || "Learn robotics with STEPS Robotics.";
//   const ogImage = course.heroicimage || course.image || "/default-og.png";

//   return {
//     title: pageTitle,
//     description: pageDesc,
//     alternates: {
//       canonical: `https://stepsrobotics.com/courses/${id}`,
//     },
//     openGraph: {
//       title: pageTitle,
//       description: pageDesc,
//       url: `https://stepsrobotics.com/courses/${id}`,
//       images: [
//         {
//           url: `https://stepsrobotics.com${ogImage}`,
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: pageTitle,
//       description: pageDesc,
//       images: [`https://stepsrobotics.com${ogImage}`],
//     },
//   };
// }


export default function page() {
  return (
    <>
   <HeroicCourse />
   <CourseDetails />
   <Bootcamp />
   <HowDifferent />
   <MightIntrest />
    </>
  )
}
