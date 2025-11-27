import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
export default function StudyProcessGallery() {
    const [gallery, setGallery] = useState([]);
    useEffect(() => {
        async function loadGallery() {
            try {
                const res = await fetch("/api/home/study-gallery");
                const data = await res.json();
                setGallery(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(":x: Failed to load gallery:", err);
            }
        }
        loadGallery();
    }, []);
    if (!gallery.length) {
        return (
            <section className="py-16 text-center">
                <p>Loading gallery...</p>
            </section>
        );
    }
    return (
        <section
            className="relative bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 py-12 md:py-16 lg:py-20 px-4 overflow-hidden"
            style={{
                backgroundImage: "url('/studyProgress.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className='mx-auto' style={{ maxWidth: '1180px' }}>
                {/* Geometric Pattern Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full"
                        style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,.1) 50px, rgba(255,255,255,.1) 100px)`
                        }}>
                    </div>
                </div>
                {/* YouTube Icon */}
                <motion.div
                    className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12 z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 relative study_process_youtube transform rotate-6 hover:rotate-3 transition-transform">
                        <Image
                            src="/youtube.gif"
                            alt="YouTube"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </motion.div>
                {/* Header */}
                <motion.div
                    className="mb-8 md:mb-12 max-w-5xl relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-3 md:mb-4 text-font-orbitron">
                        Study Process Gallery
                    </h2>
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed text-font-poppins">
                        Instructor led training digital learning cbt completion criteria learning management system cognitive load byod self-directed learning knowledge
                    </p>
                </motion.div>
                {/* Gallery Grid */}
                <div className="relative z-10 gallery_section">
                    {/* Mobile & Tablet: 2 columns */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 md:hidden">
                        {gallery.slice(0, 8).map((item, index) => (
                            <GalleryImage
                                key={index}
                                src={item.image}
                                alt={item.alt || `gallery_${index}`}
                                height={index % 3 === 0 ? "h-48" : index % 2 === 0 ? "h-48" : "h-48"}
                            />
                        ))}
                    </div>
                    {/* Tablet: 3 columns */}
                    <div className="hidden md:grid lg:hidden grid-cols-3 gap-4">
                        {gallery.slice(0, 9).map((item, index) => (
                            <GalleryImage
                                key={index}
                                src={item.image}
                                alt={item.alt || `gallery_${index}`}
                                height={index % 3 === 0 ? "h-64" : index % 2 === 0 ? "h-64" : "h-64"}
                            />
                        ))}
                    </div>
                    {/* Desktop: Masonry 5 columns */}
                    <div className="hidden lg:grid grid-cols-5 gap-4 mt-12">
                        {/* COLUMN 1 */}
                        <div className="flex flex-col gap-4">
                            <GalleryImage
                                src={gallery[0]?.image}
                                alt={gallery[0]?.alt || "gallery_0"}
                                height="h-48"
                            />
                            <GalleryImage
                                src={gallery[1]?.image}
                                alt={gallery[1]?.alt || "gallery_1"}
                                height="h-80"
                            />
                        </div>
                        {/* COLUMN 2 */}
                        <div className="flex flex-col gap-4">
                            <GalleryImage
                                src={gallery[2]?.image}
                                alt={gallery[2]?.alt || "gallery_2"}
                                height="h-72"
                            />
                            <GalleryImage
                                src={gallery[3]?.image}
                                alt={gallery[3]?.alt || "gallery_3"}
                                height="h-56"
                            />
                        </div>
                        {/* COLUMN 3 */}
                        <div className="flex flex-col gap-4">
                            <GalleryImage
                                src={gallery[4]?.image}
                                alt={gallery[4]?.alt || "gallery_4"}
                                height="h-64"
                            />
                            <GalleryImage
                                src={gallery[5]?.image}
                                alt={gallery[5]?.alt || "gallery_5"}
                                height="h-64"
                            />
                        </div>
                        {/* COLUMN 4 */}
                        <div className="flex flex-col gap-4">
                            <GalleryImage
                                src={gallery[6]?.image}
                                alt={gallery[6]?.alt || "gallery_6"}
                                height="h-132"
                            />
                        </div>
                        {/* COLUMN 5 */}
                        <div className="flex flex-col gap-4">
                            <GalleryImage
                                src={gallery[7]?.image}
                                alt={gallery[7]?.alt || "gallery_7"}
                                height="h-56"
                            />
                            <GalleryImage
                                src={gallery[8]?.image}
                                alt={gallery[8]?.alt || "gallery_8"}
                                height="h-72"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
// Reusable Image Component
function GalleryImage({ src, alt, height }) {
    if (!src) return null;
    return (
        <motion.div
            className={`relative ${height} w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group cursor-pointer`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
        </motion.div>
    );
}