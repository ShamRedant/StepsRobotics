"use client";
import Image from "next/image";

export default function CodingAdventures() {
    return (
        <>
            <section className="relative bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-16 px-4 overflow-hidden">
                {/* Title */}
                <div className="container-custom">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-[500] leading-snug text-center sm:text-left text-font-orbitron">
                        About <span className="text-yellow-400 text-font-orbitron">STEPS Robotics</span>
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed text-center sm:text-left text-font-poppins">
                        We believe that true learning begins with exploration. That&apos;s why we deliver immersive, hands-on STEM experiences that ignite creativity and build
                        real-world skills in Robotics, Artificial Intelligence, Coding, IoT and more
                    </p>
                    {/* <h3 className="leading-snug text-center text-xl sm:text-center coding_adventure">Coding Adventures</h3> */}
                    <div className="mt-[-40px]">
                        <Image
                        src="/robotics.png"
                        alt="About STEPS Robotics"
                        width={1300}
                        height={700}
                        priority
                    />
                    </div>
                    
                </div>

            </section>
            
        </>

    );
}
