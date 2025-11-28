"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  ArrowUp,
  Send,
} from "lucide-react";
import { footer } from "../utils/fetchData";
import { getNavbarData } from "../utils/menuItems";

export default function Footer() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setEmail("");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }

    setLoading(false);
  };
  const [boxes, setBoxes] = React.useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [sectionData, setSectionData] = useState({});
  useEffect(() => {
    async function loadData() {
      try {
        const data = await footer();
        console.log("✅ API Data for the Footer:", data);
        setSectionData(data);
      } catch (err) {
        console.error("❌ Failed to load Why Choose STEPS data:", err);
      }
    }
    loadData();
  }, []);
  useEffect(() => {
    async function loadData() {
      try {
        const { sortedItems } = await getNavbarData();
        setMenuItems(sortedItems);
      } catch (err) {
        console.error("Footer data fetch error:", err);
      }
    }
    loadData();
  }, []);
  return (

    <footer className="footer relative overflow-hidden bg-white">
      <div className="container mx-auto border-gray-200 -mb-20 relative z-10">
        <div className="container-custom px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left items-start">
            <div className="footerlogo flex flex-col items-center md:items-start">
              <div className="mb-4">
                <Image
                  src={sectionData.logo_url || "/footer-logo.png"}
                  alt="Steps Robotics Logo"
                  width={194}
                  height={104}
                  className="object-contain mx-auto md:mx-0"
                  priority
                />
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-4">
                {sectionData.address?.split("|").map((line, i) => (
                  <p key={i} className="footer-address-company">
                    {line.trim()}
                  </p>
                ))}
              </div>

              <div className="flex justify-center md:justify-start space-x-2">
                {[
                  { Icon: Facebook, link: sectionData.facebook },
                  { Icon: Twitter, link: sectionData.twitter },
                  { Icon: Instagram, link: sectionData.instagram },
                  { Icon: Youtube, link: sectionData.youtube },
                  { Icon: Linkedin, link: sectionData.linkedin },
                ].map(({ Icon, link }, i) => (
                  <a
                    key={i}
                    href={link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition"
                  >
                    <Icon className="w-5 h-5 text-black" />
                  </a>
                ))}
              </div>
            </div>

            {/* MIDDLE COLUMN */}
            <div className="flex flex-col items-center md:items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">

                {/* Links */}
                <div>
                  <h3 className="text-xl footer-links-title stem-gold mb-4">Links</h3>
                  <ul className="space-y-3">
                    {menuItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href || "#"}
                          className="footer-links hover:text-yellow-500 transition"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Let's Connect */}
                <div>
                  <h3 className="text-xl footer-links-title stem-gold mb-6">
                    Let&apos;s Connect
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-center md:justify-start items-center space-x-2 text-yellow-500 mb-2">
                        <Phone className="w-5 h-5" />
                        <span className="footer-sub-title stem-gold">Mobile</span>
                      </div>
                      <p className="footer-links">{sectionData.mobile}</p>
                    </div>

                    <div>
                      <div className="flex justify-center md:justify-start items-center space-x-2 text-yellow-500 mb-2">
                        <Mail className="w-5 h-5" />
                        <span className="footer-sub-title stem-gold">Email</span>
                      </div>
                      <p className="footer-links">{sectionData.email}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>


            {/* RIGHT COLUMN */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl footer-links-title stem-gold mb-4">
                Write to Us
              </h3>
              <div className="space-y-4 w-full max-w-xs md:max-w-none">
                <form onSubmit={handleSubmit}>
                  <div className="relative">

                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg"
                    />

                    {/* Anti-bot honeypot */}
                    <input type="text" className="hidden" autoComplete="off" tabIndex="-1" />

                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  {message && (
                    <p className="subscribemt-2 text-sm text-green-600">{message}</p>
                  )}
                </form>


                <div className="relative text-center md:text-left">
                  <h4 className="text-xl footer-links-title stem-gold mb-2">
                    Talk to us today!
                  </h4>
                  <div className="flex justify-center md:justify-start">
                    <Image
                      src={sectionData.talk_image || "/footer.gif"}
                      alt="Talk to us"
                      className="w-40 h-auto object-contain"
                      width={200}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-8 right-8 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-500 hover:scale-110 transition z-20"
        >
          <ArrowUp className="w-6 h-6 text-black" />
        </button>
      </div>

<div className="w-full mt-20 flex flex-col sm:flex-row text-sm relative z-10">

  <div className="bg-[#FFD700] sm:w-[40%] w-full flex justify-end items-center h-10 sm:h-8">
<div className="w-full max-w-[1180px] flex justify-center items-center text-center px-4">
      <div className="flex space-x-2 text-black">
        <a href="#" className="hover:underline text-black font-poppins text-[12px] font-normal leading-normal">
          Privacy Policy
        </a>
        <span>|</span>
        <a href="#" className="hover:underline text-black font-poppins text-[12px] font-normal leading-normal">
          Terms of Use
        </a>
      </div>
    </div>
  </div>

<div className="bg-black sm:w-[64%] w-full flex justify-start items-center h-auto py-2 sm:h-8 sm:-ml-[30px] sm:[clip-path:polygon(30px_0,100%_0,100%_100%,0_100%)]">
  <div className="w-full max-w-[1180px] flex flex-col sm:flex-row justify-start items-center text-white px-4 sm:pl-[70px] text-center sm:text-left">
    
    <p className="text-white font-poppins text-[12px] font-normal leading-normal">
      Copyright STEPS Robotics 2025. All rights reserved.
    </p>
<p className="
  text-white font-poppins text-[12px] font-normal leading-normal
  mt-1
  sm:mt-0
  sm:ml-[120px]
  md:ml-[220px]
  lg:ml-[306px]
">
  Powered by: <span>Redant Labs</span>
</p>


  </div>
</div>



</div>


    </footer>
  );
}