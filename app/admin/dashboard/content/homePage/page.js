"use client";
import React from 'react'
import Link from "next/link";

const page = () => {
    return (
        <section className="py-10 admin-main bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen ml-64">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                    🏠 Home Page Content
                </h1>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/dashboard/content/homePage/navigation" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-semibold">
                                    1
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Header</h2>
                            </div>
                            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                                Change Header&apos;s Logo and Menus
                            </p>
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/content/homePage/banner" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full font-semibold">
                                    2
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Banner</h2>
                            </div>
                            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                                Change the Banner images and Text
                            </p>
                        </li>
                    </Link>

                    <Link href="/admin/dashboard/content/homePage/steps_robotics" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full font-semibold">
                                    3
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">STEPS Robotics</h2>
                            </div>
                            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                                Images, Videos and Name can be add here
                            </p>
                        </li>
                    </Link>

                    <Link href="/admin/dashboard/content/homePage/explore_courses" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full font-semibold">
                                    4
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Explore Courses</h2>
                            </div>
                            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                                Image, Text and Points as well as Link can be add here.
                            </p>
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/content/homePage/robotics" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-pink-100 text-pink-600 flex items-center justify-center rounded-full font-semibold">
                                    5
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Why Choose STEPS Robotics 5</h2>
                            </div>
                            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                                This is a short description for Home 5.
                            </p>
                        </li>
                    </Link>

                    <Link href="/admin/dashboard/content/homePage/testimonials" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-100 text-red-600 flex items-center justify-center rounded-full font-semibold">
                                    6
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Testimonials 6</h2>
                            </div>
                            <p className="mt-3 mb-4 text-gray-500 text-sm leading-relaxed">
                                Handle the testimonails section 
                            </p>
                            
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/content/homePage/study_progress_gallery" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-300 text-blue-600 flex items-center justify-center rounded-full font-semibold">
                                    7
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Study Progress Gallery</h2>
                            </div>
                            <p className="mt-3 mb-4 text-gray-500 text-sm leading-relaxed">
                                Add / Update the Study Progress Gallery
                            </p>
                            
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/content/homePage/why-choose-steps" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-300 text-blue-600 flex items-center justify-center rounded-full font-semibold">
                                    8
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Why Choose STEPS Robotics</h2>
                            </div>
                            <p className="mt-3 mb-4 text-gray-500 text-sm leading-relaxed">
                                Add / Update the Study Progress Gallery
                            </p>
                            
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/content/homePage/footer" className="nav-link text-gray-700 ">
                        <li className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full font-semibold">
                                    9
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Footer Page</h2>
                            </div>
                            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                                Handle footer section
                            </p>
                        </li>
                    </Link>

                </ul>
            </div>
        </section>

    )
}

export default page
