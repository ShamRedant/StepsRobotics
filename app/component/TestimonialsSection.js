'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState([]);
    const [activeIndex, setActiveIndex] = useState(1);
    const [mobileIndex, setMobileIndex] = useState(0);

    // ✅ Fetch testimonials
    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch("/api/home/testimonials");
                if (!res.ok) throw new Error("Failed to fetch testimonials");
                const data = await res.json();
                setTestimonials(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching testimonials:", err);
            }
        }
        fetchTestimonials();
    }, []);

    // ✅ Auto scroll for mobile
    useEffect(() => {
        const interval = setInterval(() => {
            setMobileIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials]);

    if (testimonials.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-500">
                Loading testimonials...
            </div>
        );
    }
    const nextSlide = () => {
        setMobileIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setMobileIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleCardClick = (index) => {
        setActiveIndex(index);
    };

    const getCardOrder = () => {
        const order = [];
        const totalCards = testimonials.length;
        for (let i = 0; i < totalCards; i++) {
            const index = (activeIndex - 1 + i + totalCards) % totalCards;
            order.push(index);
        }
        return order;
    };

    const cardOrder = getCardOrder();

    const StarRating = ({ rating, center }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= Math.floor(rating) ? 'opacity-100' : 'opacity-50'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={center ? "#000" : "#FACC15"} viewBox="0 0 24 24" width="20" height="20">
                        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.845 1.417 8.264L12 19.771l-7.417 4.086L6 15.593 0 9.748l8.332-1.73z" />
                    </svg>
                </span>
            );
        }
        return <div className="flex justify-center mb-3">{stars}</div>;
    };

    const BinderClip = () => (
        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-10 h-10 z-10">
            <Image src="/pin.png" alt="pin" fill className="object-cover rounded-full" />
        </div>
    );

    const TestimonialCard = ({ testimonial, isCenter, onClick }) => (
        <div
            onClick={onClick}
            className={`relative testimonial rounded-2xl p-5 w-80 shadow-xl transition-all duration-500 cursor-pointer ${isCenter
                ? 'bg-[#f5b800] scale-90 z-20 hover:-translate-y-3 mt-30'
                : 'bg-gray-100 scale-90 opacity-100 hover:opacity-100 hover:scale-95 z-10'
                }`}
        >
            <BinderClip />
            <div className={` mx-auto mb-5 rounded-2xl overflow-hidden ${isCenter ? 'border-white' : 'border-gray-50'
                }`}>
                <Image
                    src={testimonials?.image || "/Sathish.png"}
                    alt="student image"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-2xl testmonials font-semibold text-gray-800 text-center mb-2.5">
                {testimonial?.name}
            </h3>
            <StarRating rating={testimonial?.rating} center={isCenter} />
            <p className={`text-center testmonials text-sm ${isCenter ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                {testimonial?.role}
            </p>
        </div>
    );

    return (
        <div
            className="pb-16 py-2 px-5 relative"
            style={{
                backgroundImage: "url('/testimonials_bg.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-7xl mx-auto container-custom">
                {/* Header */}
                <div className="mb-4 mt-12">
                    <h2 className="text-3xl sm:text-3xl font-[500] lg:text-4xl mb-4 leading-snug text-center sm:text-left text-font-orbitron text-yellow-400">
                        STEPS Robotics <span className="text-black text-font-orbitron">Talks</span>
                    </h2>
                    <p className="text-gray-600 text-base text-center sm:text-left md:text-lg text-font-poppins">
                        What Parent & Teachers Say About Us
                    </p>
                </div>


                {/* Desktop Layout */}
                {/* Cards */}
                <div className="hidden md:flex relative justify-center items-center gap-8 mb-10 lg:flex-nowrap">
                    {cardOrder.map((testimonialIndex, position) => (
                        <div key={testimonials[testimonialIndex].id} className="relative">
                            {position === 1 && (
                                <>
                                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <div className="relative w-8 h-8 mt-[480px]">
                                            <Image
                                                src="/comma_right.png"
                                                alt="pin"
                                                fill
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute -right-6 transform -translate-y-1/2 pointer-events-none">
                                        <div className="relative w-8 h-8 mt-[280px]">
                                            <Image
                                                src="/comma_left.png"
                                                alt="pin"
                                                fill
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <TestimonialCard
                                testimonial={testimonials[testimonialIndex]}
                                isCenter={position === 1}
                                onClick={() => handleCardClick(testimonialIndex)}
                            />
                        </div>
                    ))}
                </div>

                {/* 💬 Desktop Description */}
                <div className="hidden md:block testmonial_text text-center max-w-4xl mx-auto mb-8 px-5">
                    <p className="text-gray-800 text-base leading-relaxed mb-4 text-font-poppins">
                        &apos;{testimonials[activeIndex].quote}&apos;
                    </p>
                    <p className="text-gray-800 text-base leading-relaxed text-font-poppins">
                        {testimonials[activeIndex].description}
                    </p>
                </div>

                {/* 🟡 Dots */}
                <div className="hidden md:flex justify-center gap-4">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${index === activeIndex
                                ? 'border-2 border-dotted border-black bg-transparent !w-7 mt-[-5] !h-7 p-1.5'
                                : 'rounded-full bg-yellow-400 bg-transparent w-4 h-4'
                                }`}
                        >
                            {index === activeIndex && <div className="w-full h-full rounded-full bg-yellow-400"></div>}
                        </button>
                    ))}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col items-center text-center">
                    <>
                        <div className="absolute pin_right">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/comma_right.png"
                                    alt="pin"
                                    fill
                                />
                            </div>
                        </div>

                        <div className="absolute pin_left">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/comma_left.png"
                                    alt="pin"
                                    fill
                                />
                            </div>
                        </div>
                    </>
                    <TestimonialCard
                        testimonial={testimonials[mobileIndex]}
                        isCenter={true}
                        onClick={() => { }}
                    />
                    {/* <p className="text-gray-800 leading-relaxed mt-4 px-3">
                        "{testimonials[mobileIndex].quote}"
                    </p> */}
                    {testimonials.length > 0 && testimonials[mobileIndex] && (
                        <p className="text-gray-800 leading-relaxed mt-4 px-3">
                            &apos;{testimonials[mobileIndex].quote}&apos;
                        </p>
                    )
                    && (
                    <p className="text-gray-800 text-base leading-relaxed mt-2 px-3">
                        {testimonials[mobileIndex].description}
                    </p>
                    )

                    }

                    {/* Dots for mobile */}
                    <div className="flex justify-center gap-3 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setMobileIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === mobileIndex ? 'bg-yellow-400 scale-125' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
