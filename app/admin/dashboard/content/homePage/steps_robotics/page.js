"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function StepsRoboticsPage() {
    const [steps, setSteps] = useState([]);
    const [form, setForm] = useState({
        title: "",
        image: null,
        video: null,
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/home/steps_robotics");
            const data = await res.json();
            setSteps(data);
        }
        load();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", form.title);
        if (form.image) formData.append("image", form.image);
        if (form.video) formData.append("video", form.video);

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `/api/home/steps_robotics/${editingId}`
            : "/api/home/steps_robotics";

        const res = await fetch(url, { method, body: formData });
        const data = await res.json();

        if (!res.ok) {
            alert("Failed to save");
            return;
        }

        if (editingId) {
            setSteps((prev) => prev.map((b) => (b.id === editingId ? data : b)));
            alert("✅ Updated successfully");
            setForm({ title: "", image: null, video: null });
        } else {
            setSteps((prev) => [data, ...prev]);
            alert("✅ Added successfully");
            setForm({ title: "", image: null, video: null });
        }

        setForm({ title: "", image: null, video: null });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this?")) return;
        await fetch(`/api/home/steps_robotics/${id}`, { method: "DELETE" });
        setSteps((prev) => prev.filter((b) => b.id !== id));
    };

    const handleEdit = (b) => {
        setForm({ title: b.title, image: b.image, video: b.video });
        setEditingId(b.id);
    };

    return (
        <section className="p-6 bg-gray-50 min-h-screen ml-64">
            <h1 className="text-2xl font-bold mb-4">
                {editingId ? "Edit Step" : "Add Step"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-xl shadow-md"
            >
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 w-full"
                    required
                />

                <span>Image:</span>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 w-full"
                />
                {form.image && (
                    <Image
                        src={
                            typeof form.image === "string"
                                ? form.image
                                : URL.createObjectURL(form.image)
                        }
                        alt="preview"
                        className="w-32 h-32 object-cover rounded"
                        width={200}
                        height={300}
                    />
                )}

                <span>Video:</span>
                <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="border p-2 w-full"
                />
                {form.video && (
                    <video
                        src={
                            typeof form.video === "string"
                                ? form.video
                                : URL.createObjectURL(form.video)
                        }
                        controls
                        className="w-32 h-32 rounded"
                    />
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    {editingId ? "Update Step" : "Add Step"}
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {steps.map((b) => (
                    <div key={b.id} className="border rounded-lg p-4 bg-white shadow-sm">
                        {b.image && (
                            <Image
                                src={b.image}
                                alt={b.title}
                                className="w-full h-40 object-cover rounded-md"
                                width={300}
                                height={200}
                            />
                        )}
                        {b.video && (
                            <video
                                src={b.video}
                                controls
                                className="w-full h-40 object-cover rounded-md"
                            />
                        )}
                        <h2 className="font-bold mt-2">{b.title}</h2>
                        <p className="text-gray-600">{b.text}</p>
                        <div className="mt-3 flex gap-3">
                            <button
                                onClick={() => handleEdit(b)}
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
                    </div>
                ))}
            </div>
        </section>
    );
}
