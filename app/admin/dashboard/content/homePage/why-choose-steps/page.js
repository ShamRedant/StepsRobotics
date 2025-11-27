"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function WhyChooseStepsAdmin() {
  const [mainData, setMainData] = useState(null);
  const [mainFile, setMainFile] = useState(null);
  const [mainTitle, setMainTitle] = useState("");

  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [side, setSide] = useState("left");
  const [orderIndex, setOrderIndex] = useState(0);
  const [editingId, setEditingId] = useState(null);

  // Fetch all data on page load
  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    const res = await fetch("/api/home/why_choose");
    const data = await res.json();
    setMainData(data.main);
    setMainTitle(data.main?.title || "");
    setItems(data.items);
  }

  // Handle Main Image Upload / Update
  async function handleMainSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", "main");
    if (mainFile) formData.append("file", mainFile);
    formData.append("title", mainTitle);
    if (mainData?.id) formData.append("id", mainData.id);

    const res = await fetch("/api/home/why_choose", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Main robot image saved successfully!");
      fetchAll();
      setMainFile(null);
    } else {
      alert("❌ Failed to save main image");
    }
  }

  // Handle Item Add / Edit
  async function handleItemSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", "item");
    if (file) formData.append("icon", file);
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("side", side);
    formData.append("order_index", orderIndex);
    if (editingId) formData.append("id", editingId);

    const res = await fetch("/api/home/why_choose", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert(editingId ? "✅ Item updated!" : "✅ Item added!");
      fetchAll();
      resetItemForm();
    } else {
      alert("❌ Failed to save item");
    }
  }

  // Delete Main or Item
  async function handleDelete(id, type) {
    if (!confirm("Are you sure you want to delete this?")) return;
    const res = await fetch("/api/home/why_choose", {
      method: "DELETE",
      body: JSON.stringify({ id, type }),
    });
    if (res.ok) {
      alert("🗑 Deleted successfully");
      fetchAll();
    }
  }

  // Start editing an item
  function handleEdit(item) {
    setEditingId(item.id);
    setHeading(item.heading);
    setDescription(item.description || "");
    setSide(item.side);
    setOrderIndex(item.order_index || 0);
  }

  function resetItemForm() {
    setEditingId(null);
    setFile(null);
    setHeading("");
    setDescription("");
    setSide("left");
    setOrderIndex(0);
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        ⚙️ Why Choose STEPS - Admin Panel
      </h1>

      {/* --- MAIN ROBOT IMAGE SECTION --- */}
      <div className="bg-white border p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">🤖 Main Robot Image</h2>
        <form onSubmit={handleMainSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block font-medium">Robot Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMainFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
          </div>

          {mainData?.robot_image && (
            <div className="mt-4">
              <Image
                src={mainData.robot_image}
                alt="Robot"
                className="w-40 h-40 object-contain mx-auto"
                width={200}
                height={300}
              />
              <p className="text-center text-sm text-gray-600 mt-2">
                {mainData.robot_image.split("/").pop()}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(mainData.id, "main")}
                className="text-red-600 text-sm mt-2 underline"
              >
                Delete Main Image
              </button>
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {mainData ? "Update Main Image" : "Add Main Image"}
          </button>
        </form>
      </div>

      {/* --- ADD / EDIT ITEM FORM --- */}
      <div className="bg-white border p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "✏️ Edit Feature Item" : "➕ Add Feature Item"}
        </h2>

        <form onSubmit={handleItemSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
              rows="2"
            />
          </div>

          <div>
            <label className="block font-medium">Side</label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Order Index</label>
            <input
              type="number"
              value={orderIndex}
              onChange={(e) => setOrderIndex(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 rounded w-full"
              required={!editingId}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingId ? "Update Item" : "Add Item"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetItemForm}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- EXISTING ITEMS LIST --- */}
      <div className="bg-white border p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">📋 Existing Items</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50 flex flex-col items-center"
              >
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.heading}
                    className="w-16 h-16 object-contain mb-2"
                    width={200}
                    height={300}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 mb-2"></div>
                )}
                <p className="font-semibold">{item.heading}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs mt-2 text-gray-500">
                  <strong>Side:</strong> {item.side} |{" "}
                  <strong>Order:</strong> {item.order_index}
                </p>
                <p className="text-xs text-gray-400">
                  File: {item.icon?.split("/").pop()}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, "item")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
