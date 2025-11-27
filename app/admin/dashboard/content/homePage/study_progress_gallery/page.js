"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function StudyGalleryAdmin() {
  const [gallery, setGallery] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // Load gallery from API
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/home/study-gallery");
      const data = await res.json();
      setGallery(data);
    }
    load();
  }, []);

  // Upload or update image
  async function handleUpload(e) {
    e.preventDefault();
    const file = e.target.file.files[0];
    const alt = e.target.alt.value;
    const id = editItem?.id;

    if (!file && !id)
      return alert("Please select an image to upload or edit.");

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("alt", alt);
    if (id) formData.append("id", id);

    const res = await fetch("/api/home/study-gallery", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      if (id) {
        setGallery((prev) =>
          prev.map((item) => (item.id === id ? data : item))
        );
        setEditItem(null);
      } else {
        setGallery((prev) => [...prev, data]);
      }
      e.target.reset();
    } else {
      alert(data.error || "Upload failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const res = await fetch("/api/home/study-gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (res.ok) {
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert(data.error || "Failed to delete image");
    }
  }

  function handleEdit(item) {
    setEditItem(item);
  }

  function handleCancelEdit() {
    setEditItem(null);
  }

  return (
    <section className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">
          🖼 Study Gallery Admin
        </h1>

        <form
          onSubmit={handleUpload}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <input type="file" name="file" accept="image/*" />
          <input
            type="text"
            name="alt"
            placeholder="Alt text"
            className="border p-2 rounded"
            defaultValue={editItem?.alt || ""}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editItem ? "Update" : "Upload"}
          </button>
          {editItem && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="grid grid-cols-3 gap-4">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="relative border rounded-lg p-2 bg-white shadow"
            >
              <Image
                src={img.image}
                alt={img.alt}
                className="w-full h-40 object-cover rounded"
                width={200}
                height={300}
              />
              <p className="text-sm text-center mt-1">{img.alt}</p>

              <div className="flex justify-center gap-2 mt-2">
                <button
                  onClick={() => handleEdit(img)}
                  className="bg-yellow-500 text-white text-xs px-3 py-1 rounded"
                >
                  Edit 
                </button>
                
                <button
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500 ml-5 text-white text-xs px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
