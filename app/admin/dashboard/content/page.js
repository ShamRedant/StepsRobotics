import React from 'react'
import Image from "next/image";
import Link from "next/link";


const cards = [
    {
        title: "Home Page",
        description:
            "Home page content changes",
        image: "/home_page.svg",
        href: "/admin/dashboard/content/homePage"
    },
    
    
];

const page = () => {
    return (
        // <div className="p-6 admin-main bg-gray-50 min-h-screen ml-64 flex items-center justify-center">

        // </div>
        <section className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                    {/* Our <span className="text-yellow-500">Programs</span> */}
                    Frontend Content Management
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                        >
                            <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-yellow-500">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            <div className="px-6 pb-6">
                                <Link href={card.href}>
                                    <button className="mt-4 bg-yellow-500 text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-yellow-600 transition">
                                        Click →
                                    </button>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default page