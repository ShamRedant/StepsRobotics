import React from 'react'

function NavbarSkeleton() {
    return (
        <div className="animate-pulse">

            {/* ===================== NAVBAR ===================== */}
            <div className="container-custom py-4">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <div className="h-10 w-40 bg-gray-300 rounded"></div>

                    {/* Menu */}
                    <div className="hidden md:flex space-x-6">
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                        <div className="h-6 w-20 bg-gray-300 rounded"></div>
                        <div className="h-6 w-24 bg-gray-300 rounded"></div>
                        <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    </div>

                    {/* Icons */}
                    <div className="flex space-x-3">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* ===================== HERO BANNER ===================== */}
            <div className="relative w-full h-[550px] md:h-[600px] bg-gray-200">
                {/* Background image skeleton */}
                <div className="absolute inset-0 bg-gray-300"></div>

                <div className="relative container-custom h-full flex flex-col md:flex-row justify-center items-center">

                    {/* LEFT TEXT BLOCK */}
                    <div className="w-full md:w-1/2 space-y-4 px-6 md:px-12">
                        <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
                        <div className="h-10 w-2/4 bg-gray-300 rounded"></div>
                        <div className="h-6 w-5/6 bg-gray-300 rounded"></div>
                        <div className="h-6 w-4/6 bg-gray-300 rounded"></div>
                        <div className="h-12 w-40 bg-gray-300 rounded-full mt-4"></div>
                    </div>

                    {/* RIGHT IMAGE BLOCK */}
                    <div className="hidden md:block w-1/2 h-[400px] bg-gray-300 rounded-xl"></div>
                </div>
            </div>

            {/* ===================== INFO CARDS ===================== */}
            <div className="container-custom -mt-10 md:-mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow p-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-2">
                            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                            <div className="h-4 w-16 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===================== "See what kids built" TEXT ===================== */}
            <div className="container-custom mt-16 space-y-3">
                <div className="h-10 w-2/3 bg-gray-300 rounded"></div>
                <div className="h-6 w-5/6 bg-gray-300 rounded"></div>
            </div>

            {/* ===================== VIDEO CARDS ===================== */}
            <div className="container-custom mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl bg-gray-200 p-4 space-y-3">
                        <div className="h-48 bg-gray-300 rounded-xl"></div>
                        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NavbarSkeleton
