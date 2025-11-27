'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function HeroicCourse() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const fetched = useRef(false);

  const fetchCourse = useCallback(async () => {
    try {
      const res = await axios.get(`/api/courses/${id}`);
      setCourse(res.data || null);
    } catch (err) {
      console.error('Failed to fetch course:', err);
      setError('Unable to load course. Please try again later.');
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    if (fetched.current) return; 
    fetched.current = true;
    fetchCourse();
  }, [id, fetchCourse]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-center text-gray-500">Loading course...</p>;
  }

  return (
    <div className="course-heroic container-spacing p-6">
      <div className="container-custom space-y-8">
<div className="flex flex-col md:flex-row gap-6 transition-all duration-300">
          <div className="w-full h-full order-2 md:order-1">
            {course.heroicimage ? (
              <Image
                src={course.heroicimage}
                alt={course.heroictitle || 'Course image'}
                width={600}
                height={484}
                className="course-heroic-image rounded-lg"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="text-left order-1 md:order-2">
            <h2 className="course-heroic-title text-3xl font-semibold">
 Future-Ready Kids <br></br> Start Here!
             </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
