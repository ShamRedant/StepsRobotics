"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';

export default function Banner() {
    const [banners, setBanners] = useState([]);
    const [editingBannerId, setEditingBannerId] = useState(null);

    <button
        onClick={() => setEditingBanner(b)}
        className="mt-3 bg-yellow-500 text-white px-3 py-1 rounded-md"
    >
        Edit
    </button>



    const fetchBanners = async () => {
        const res = await fetch("/api/banners");
        const data = await res.json();
        setBanners(data);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await fetch("/api/banners", { method: "POST", body: formData });
        e.target.reset();
        fetchBanners();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/banners/${id}`, { method: "DELETE" });
        fetchBanners();
    };

    return (
        <section className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="container mx-auto px-6">
                <div className="p-8">
                    <h1 className="text-2xl font-semibold mt-6 text-center mb-6">Manage Banners</h1>

                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                        <input name="bannerTitle1" placeholder="Banner Title 1" className="border p-2 w-full" required />
                        <input name="bannerTitle2" placeholder="Banner Title 2" className="border p-2 w-full" required />
                        <textarea name="paragraph" placeholder="Paragraph" className="border p-2 w-full" required />
                        <input name="buttonName" placeholder="Button Name" className="border p-2 w-full" required />
                        <input name="buttonLink" placeholder="Button Link" className="border p-2 w-full" required />
                        <h1>Background Image:</h1>
                        <input type="file" name="image" accept="image/*" className="border p-2 w-full" required />
                        <h1>Banner Image:</h1>
                        <input type="file" name="b_image" accept="image/*" className="border p-2 w-full" required />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Add Banner
                        </button>
                    </form>

                    <div className="mt-10 grid grid-cols-3 gap-6">
                        {banners.map((b) => (
                            <div key={b.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                {editingBannerId === b.id ? (
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.target);
                                            await fetch(`/api/banners/${b.id}`, {
                                                method: "PUT",
                                                body: formData,
                                            });
                                            setEditingBannerId(null);
                                            fetchBanners();
                                        }}
                                        className="space-y-2"
                                    >
                                        <input name="bannerTitle1" defaultValue={b.banner_title1} className="border p-2 w-full rounded" />
                                        <input name="bannerTitle2" defaultValue={b.banner_title2} className="border p-2 w-full rounded" />
                                        <textarea name="paragraph" defaultValue={b.paragraph} className="border p-2 w-full rounded" />
                                        <input name="buttonName" defaultValue={b.button_name} className="border p-2 w-full rounded" />
                                        <input name="buttonLink" defaultValue={b.button_link} className="border p-2 w-full rounded" />

                                        {/* 🖼 Show current image */}
                                        <div>
                                            <Image

                                                src={b.image} 
                                                alt={b.banner_title1} 
                                                width={800}
                                                height={300}
                                                className="w-full h-40 object-cover rounded-md mb-2"
                                            
                                            />
                                            {/* <img src={b.image} alt={b.banner_title1} className="w-full h-40 object-cover rounded-md mb-2" /> */}
                                            <input type="file" name="image" accept="image/*" className="border p-2 w-full rounded" />
                                        </div>

                                        <div>
                                            <Image 
                                                src={b.b_image} 
                                                alt={b.banner_title1}
                                                width={300}
                                                height={300}
                                                className="w-full h-40 object-cover rounded-md mb-2"
                                            
                                            />
                                            {/* <img src={b.b_image} alt={b.banner_title1} className="w-full h-40 object-cover rounded-md mb-2" /> */}
                                            <input type="file" name="b_image" accept="image/*" className="border p-2 w-full rounded" />
                                        </div>

                                        <div className="flex gap-2 mt-2">
                                            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded-md">Save</button>
                                            <button type="button" onClick={() => setEditingBannerId(null)} className="bg-gray-400 text-white px-3 py-1 rounded-md">Cancel</button>
                                        </div>
                                    </form>
                                ) : (

                                    // 🖼 Normal view mode
                                    <>
                                        <Image
                                            src={b.image}
                                            alt={b.banner_title1}
                                            className="w-full h-40 object-cover rounded-md"
                                            width={200}
                                            height={300}
                                        />
                                    
                                        {/* <img
                                            src={b.image}
                                            alt={b.banner_title1}
                                            className="w-full h-40 object-cover rounded-md"
                                        /> */}
                                        <h2 className="font-bold mt-2">{b.banner_title1}</h2>
                                        <p className="text-gray-600">{b.paragraph}</p>
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => setEditingBannerId(b.id)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(b.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>





                </div>
            </div>

        </section>
    );
}
