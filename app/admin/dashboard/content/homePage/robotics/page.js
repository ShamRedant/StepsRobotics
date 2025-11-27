"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';

export default function RoboticsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [roboticsData, setRoboticsData] = useState(null);
  const [form, setForm] = useState({
    image_one: null,
    image_two: null,
    features: Array.from({ length: 6 }, () => ({ title: "", icon: null })),
  });

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Fetch existing robotics section
  async function fetchData() {
    try {
      const res = await fetch("/api/home/robotics");
      const json = await res.json();
      if (json?.section_data) {
        setRoboticsData(json.section_data);
        setForm({
          image_one: null,
          image_two: null,
          features:
            json.section_data.features || Array.from({ length: 6 }, () => ({ title: "", icon: null })),
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Handle image input change
  const handleImageChange = (e, key) => {
    setForm({ ...form, [key]: e.target.files[0] });
  };

  // ✅ Handle feature title/icon change
  const handleFeatureChange = (index, field, value) => {
    const updated = [...form.features];
    updated[index][field] = value;
    setForm({ ...form, features: updated });
  };

  // ✅ Save (Create or Update)
  const handleSave = async () => {
    const fd = new FormData();
    if (form.image_one) fd.append("image_one", form.image_one);
    if (form.image_two) fd.append("image_two", form.image_two);

    form.features.forEach((f, i) => {
      fd.append(`features[${i}][title]`, f.title);
      if (f.icon && typeof f.icon !== "string") fd.append(`features[${i}][icon]`, f.icon);
    });

    await fetch("/api/home/robotics", {
      method: roboticsData ? "PUT" : "POST",
      body: fd,
    });

    await fetchData();
    alert("Saved successfully ✅");
  };

  // ✅ Delete section
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    await fetch("/api/home/robotics", { method: "DELETE" });
    setRoboticsData(null);
    setForm({
      image_one: null,
      image_two: null,
      features: Array.from({ length: 6 }, () => ({ title: "", icon: null })),
    });
    alert("Deleted successfully ❌");
  };

  if (loading)
    return (
      <div className="ml-64 py-20 text-center text-gray-500">
        Loading Robotics Admin Panel...
      </div>
    );

  return (
    <section className="py-10 px-6 bg-gray-50 min-h-screen ml-64">
      <h1 className="text-3xl font-bold mb-8">🤖 Robotics Section Admin</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        {/* Left Side Images */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Left Images</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <input type="file" onChange={(e) => handleImageChange(e, "image_one")} />
              {roboticsData?.image_one && (
                // <img
                //   src={roboticsData.image_one}
                //   alt="image_one"
                //   className="h-24 mt-2 rounded border"
                // />
                <Image src={roboticsData.image_one} alt="image_one" className="h-24 mt-2 rounded border" width={200} height={300} />
              )}
            </div>
            <div>
              <input type="file" onChange={(e) => handleImageChange(e, "image_two")} />
              {roboticsData?.image_two && (
                // <img
                //   src={roboticsData.image_two}
                //   alt="image_two"
                //   className="h-24 mt-2 rounded border"
                // />
                <Image src={roboticsData.image_two} alt="image_two" className="h-24 mt-2 rounded border" width={200} height={300} />
              )}
            </div>
          </div>
        </div>

        {/* Right Side Features */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Right Side Features (6 items)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.features.map((f, i) => (
              <div key={i} className="border p-4 rounded-lg flex flex-col gap-3">
                <label className="text-sm font-semibold text-gray-600">
                  Feature {i + 1}
                </label>
                <input
                  type="text"
                  placeholder="Feature Title"
                  className="border p-2 rounded w-full"
                  value={f.title}
                  onChange={(e) => handleFeatureChange(i, "title", e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*,image/svg+xml"
                  onChange={(e) => handleFeatureChange(i, "icon", e.target.files[0])}
                />
                {roboticsData?.features?.[i]?.icon && (
                  // <img
                  //   src={roboticsData.features[i].icon}
                  //   alt={`feature-${i + 1}`}
                  //   className="h-10 w-10 mt-2 object-contain"
                  // />
                  <Image src={roboticsData.features[i].icon} alt={`feature-${i + 1}`} className="h-10 w-10 mt-2 object-contain" width={200} height={300} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            {roboticsData ? "Update Section" : "Save Section"}
          </button>
          {roboticsData && (
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Delete Section
            </button>
          )}
        </div>

        {/* Preview */}
        {roboticsData && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {roboticsData.image_one && (
                // <img src={roboticsData.image_one} className="h-32 rounded border" />
                <Image src={roboticsData.image_one} alt="preview" className="h-32 rounded border" width={200} height={300} />
              )}
              {roboticsData.image_two && (
                // <img src={roboticsData.image_two} className="h-32 rounded border" />
                <Image src={roboticsData.image_two} alt="preview" className="h-32 rounded border" width={200} height={300} />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {roboticsData.features?.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg"
                >
                  {f.icon && (
                    // <img
                    //   src={f.icon}
                    //   alt=""
                    //   className="h-8 w-8 object-contain"
                    // />
                    <Image src={f.icon} alt="" className="h-8 w-8 object-contain" width={200} height={300} />
                  )}
                  <span className="font-medium">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
