"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';

export default function ExploreCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        list_items: [""],
        button_label: "",
        button_link: "",
        image: null,
        imagePreview: null, // 👈 new field
    });

    const fetchCourses = async () => {
        const res = await fetch("/api/home/explore_courses");
        const data = await res.json();
        setCourses(data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleListChange = (index, value) => {
        const newList = [...form.list_items];
        newList[index] = value;
        setForm({ ...form, list_items: newList });
    };

    const addListItem = () => setForm({ ...form, list_items: [...form.list_items, ""] });
    const removeListItem = (index) =>
        setForm({ ...form, list_items: form.list_items.filter((_, i) => i !== index) });

    const handleFileChange = (e) => setForm({ ...form, image: e.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === "list_items") formData.append(key, JSON.stringify(value));
            else formData.append(key, value);
        });

        // 👇 Conditionally include image
        if (form.image) {
            formData.append("image", form.image);
        } else if (form.imagePreview) {
            formData.append("existing_image", form.imagePreview); // backend can reuse it
        }

        const url = editingId
            ? `/api/home/explore_courses/${editingId}`
            : "/api/home/explore_courses";

        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            body: formData,
        });

        if (res.ok) {
            alert(editingId ? "✅ Updated successfully!" : "✅ Added successfully!");
            setForm({
                title: "",
                description: "",
                list_items: [""],
                button_link: "",
                image: null,
                imagePreview: null,
            });
            setEditingId(null);
            fetchCourses();
        } else alert("❌ Failed to save item");
    };

    const handleEdit = (course) => {
        setEditingId(course.id);
        setForm({
            title: course.title,
            description: course.description,
            list_items: course.list_items || [""],
            button_link: course.button_link || "",
            image: null, // don't auto-load image file
            imagePreview: course.image || null, // 👈 store existing image
        });
        // window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        const res = await fetch(`/api/home/explore_courses/${id}`, { method: "DELETE" });
        if (res.ok) {
            alert("🗑️ Deleted successfully!");
            fetchCourses();
        } else {
            alert("❌ Failed to delete item");
        }
    };

    return (
        <section className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Explore Courses Content</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-xl bg-white shadow-md">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="border p-2 w-full"
                        required
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border p-2 w-full"
                        required
                    />

                    <div>
                        <label className="block font-medium mb-1">List Items</label>
                        {form.list_items.map((item, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleListChange(index, e.target.value)}
                                    className="border p-2 flex-1"
                                    placeholder={`Point ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeListItem(index)}
                                    className="bg-red-500 text-white px-3 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addListItem} className="text-blue-600 text-sm">
                            + Add Point
                        </button>
                    </div>


                    <input
                        name="button_link"
                        value={form.button_link}
                        onChange={handleChange}
                        placeholder="Button Link (e.g. /courses)"
                        className="border p-2 w-full"
                    />

                    {form.imagePreview && (
                        <div className="mb-2">
                            <p className="text-sm text-gray-600 mb-1">Current Image:</p>
                            <Image
                                src={form.imagePreview}
                                alt="Current"
                                className="h-32 w-auto rounded border"
                                height={300}
                                width={100}
                            />
                            {/* <img
                                src={form.imagePreview}
                                alt="Current"
                                className="h-32 w-auto rounded border"
                            /> */}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 font-medium">Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <button
                        type="submit"
                        className={`${editingId
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : "bg-gradient-to-r from-orange-500 to-yellow-500"
                            } text-white px-4 py-2 rounded-lg`}
                    >
                        {editingId ? "Update" : "Save"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setForm({
                                    title: "",
                                    description: "",
                                    list_items: [""],
                                    button_link: "",
                                    image: null,
                                });
                            }}
                            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {/* Display list */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Saved Entries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {courses.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 shadow bg-white relative">
                                {item.image && (
                                    <Image 
                                        src={item.image}
                                        alt={item.title}
                                        className="h-40 w-full object-cover rounded"
                                        width={200}
                                        height={300}
                                    />
                                    // <img
                                    //     src={item.image}
                                    //     alt={item.title}
                                    //     className="h-40 w-full object-cover rounded"
                                    // />
                                )}
                                <h3 className="font-bold mt-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                                <ul className="list-disc pl-5 my-2">
                                    {item.list_items?.map((li, i) => (
                                        <li key={i}>{li}</li>
                                    ))}
                                </ul>


                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
