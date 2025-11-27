'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState({
        id: '',
        name: '',
        role: '',
        quote: '',
        description: '',
        rating: '',
        image: null,
        existingImage: ''
    });
    const [preview, setPreview] = useState('');

    // ✅ Load testimonials from backend
    const loadTestimonials = async () => {
        try {
            const res = await fetch('/api/home/testimonials');
            const data = await res.json();
            setTestimonials(data);
        } catch (err) {
            console.error('❌ Load error:', err);
        }
    };

    useEffect(() => {
        loadTestimonials();
    }, []);

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, image: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // ✅ Handle form submit (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('role', form.role);
        formData.append('quote', form.quote);
        formData.append('description', form.description);
        formData.append('rating', form.rating);
        if (form.image) formData.append('image', form.image);
        if (form.existingImage) formData.append('existingImage', form.existingImage);
        if (form.id) formData.append('id', form.id);

        try {
            const method = form.id ? 'PUT' : 'POST';
            const res = await fetch('/api/home/testimonials', {
                method,
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to save');

            await loadTestimonials();
            resetForm();
        } catch (err) {
            console.error('❌ Save error:', err);
        }
    };

    // ✅ Delete testimonial
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await fetch('/api/home/testimonials', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            await loadTestimonials();
        } catch (err) {
            console.error('❌ Delete error:', err);
        }
    };

    // ✅ Edit testimonial
    const handleEdit = (item) => {
        setForm({
            id: item.id,
            name: item.name,
            role: item.role,
            quote: item.quote,
            description: item.description,
            rating: item.rating,
            existingImage: item.image,
            image: null
        });
        setPreview(item.image);
    };

    // ✅ Reset form
    const resetForm = () => {
        setForm({
            id: '',
            name: '',
            role: '',
            quote: '',
            description: '',
            rating: '',
            image: null,
            existingImage: ''
        });
        setPreview('');
    };

    return (
        <section className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">🎤 Manage Testimonials</h1>

                {/* ✅ Add / Edit Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-xl p-6 space-y-4 border"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded-lg w-full"
                        />
                        <input
                            type="text"
                            name="role"
                            placeholder="Role"
                            value={form.role}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded-lg w-full"
                        />
                        <input
                            type="text"
                            name="quote"
                            placeholder="Short Quote"
                            value={form.quote}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded-lg w-full"
                        />
                        <input
                            type="number"
                            name="rating"
                            placeholder="Rating (0-5)"
                            value={form.rating}
                            onChange={handleChange}
                            min="0"
                            max="5"
                            step="0.1"
                            className="p-2 border rounded-lg w-full"
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full border p-2 rounded-lg"
                    ></textarea>

                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full"
                        />
                        {preview && (
                            <Image
                                src={preview}
                                alt="Preview"
                                className="w-16 h-16 rounded-full object-cover border"
                                width={300}
                                height={200}
                            />
                        )}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            {form.id ? 'Update' : 'Add'} Testimonial
                        </button>
                        {form.id && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/* ✅ Testimonials List */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Existing Testimonials</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="bg-white shadow p-4 rounded-lg border flex flex-col items-center"
                            >
                                {t.image && (
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        className="w-24 h-24 rounded-full object-cover mb-2"
                                        width={300}
                                        height={200}
                                    />
                                )}
                                <h3 className="font-semibold">{t.name}</h3>
                                <p className="text-sm text-gray-600">{t.role}</p>
                                <p className="italic text-sm text-gray-500 text-center mt-2">&quot{t.quote}&quot</p>
                                <p className="text-xs text-gray-700 mt-2">{t.description}</p>
                                <p className="mt-2 font-semibold text-yellow-600">⭐ {t.rating}</p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(t)}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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
