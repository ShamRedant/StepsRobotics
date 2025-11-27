"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function FooterAdmin() {
  const [footer, setFooter] = useState({});
  const [logo, setLogo] = useState(null);
  const [talkImage, setTalkImage] = useState(null);

  useEffect(() => {
    fetchFooter();
  }, []);

  async function fetchFooter() {
    const res = await fetch("/api/home/footer");
    const data = await res.json();
    setFooter(data || {});
  }

  async function handleSave(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("address", footer.address || "");
    formData.append("mobile", footer.mobile || "");
    formData.append("email", footer.email || "");
    formData.append("facebook", footer.facebook || "");
    formData.append("twitter", footer.twitter || "");
    formData.append("instagram", footer.instagram || "");
    formData.append("youtube", footer.youtube || "");
    formData.append("linkedin", footer.linkedin || "");

    if (logo) formData.append("logo", logo);
    if (talkImage) formData.append("talk_image", talkImage);

    const res = await fetch("/api/home/footer", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Footer saved successfully!");
      fetchFooter();
    } else {
      alert("❌ Failed to save footer");
    }
  }

  const handleChange = (e) => {
    setFooter({ ...footer, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🦾 Footer Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Text fields */}
        {[
          "address",
          "mobile",
          "email",
          "facebook",
          "twitter",
          "instagram",
          "youtube",
          "linkedin",
        ].map((key) => (
          <>
          <label className="block font-semibold mb-1">{key}</label>
            <input
              key={key}
              name={key}
              placeholder={key.replace("_", " ")}
              value={footer[key] || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </>
        ))}

        {/* Image Uploads */}
        <div>
          <label className="block font-semibold mb-1">Footer Logo</label>
          {footer.logo_url && (
            // <img src={footer.logo_url} alt="Logo" className="w-24 mb-2" />
            <Image src={footer.logo_url} alt="Logo" className="w-24 mb-2" width={100} height={200} />
          )}
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Talk to us Image</label>
          {footer.talk_image && (
            // <img src={footer.talk_image} alt="Talk" className="w-24 mb-2" />
            <Image src={footer.talk_image} alt="Talk" className="w-24 mb-2" width={200} height={300} />
          )}
          <input
            type="file"
            onChange={(e) => setTalkImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Save Footer
        </button>
      </form>
    </div>
  );
}
