"use client";
import React, { useState } from "react";
import { Mail, Phone, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import axios from "axios";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.post("/api/contact", formData);
      setModalMessage(
        res.data.message || "Your message has been sent successfully!"
      );
      setModalVisible(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Submit error:", error);
      setModalMessage("Something went wrong! Please try again later.");
      setModalVisible(true);
    }
  };

  return (
    <div className="getin-touch">
     <div className="min-h-screen max-sm:min-h-[82vh] p-4 sm:p-6 lg:p-8">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[40%_60%] gap-0">
              <div className="get-in-touch-image">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/contact-form-img.jpg"
                    alt="How it works process flow"
                    className="w-full h-auto object-contain"
                    width={1200}
                    height={200}
                    priority
                  />
                </div>
              </div>

              <div className="pt-[35px] pb-[18px] px-[45px] get-in-touch-form">
                <h2 className="text-4xl get-in-touch-title font-bold mb-4">
                  Get In Touch
                </h2>
                <p className="get-in-touch-subtitle mb-2 leading-relaxed">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page randomised words which don&apos;t
                  look even slightly when looking at its layout.
                </p>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 !mb-[5px]">
                    <div className="relative mt-6 -mb-[15px]">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`peer w-full px-4 py-2 border rounded-lg contact-field-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <label
                        htmlFor="firstName"
                        className="form-contact-label absolute left-0 ml-1 bg-white px-1 text-sm duration-100 ease-linear
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:ml-1 peer-focus:px-1 peer-focus:text-sm"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                  <p
  className={`text-red-500 text-sm mt-1 min-h-[20px] ${
    errors.firstName ? "m-[10px] !mt-[10px]" : "m-0"
  }`}
>
  {errors.firstName || ""}
</p>

                    </div>

                    <div className="relative !mb-[0px]">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-lg contact-field-placeholder placeholder:[contact-field-placeholder] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                      <label
                        htmlFor="lastName"
                        className="form-contact-label absolute left-0 ml-1 bg-white px-1 text-sm duration-100 ease-linear
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:ml-1 peer-focus:px-1 peer-focus:text-sm"
                      >
                        Last Name
                      </label>
                      <p className="text-transparent text-sm mt-1 min-h-[10px]">
                        .
                      </p>
                    </div>
                  </div>

                  <div className="relative !mb-[0px]">
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourmail@gmail.com"
                        className={`peer w-full px-4 py-2 pr-12 border rounded-lg contact-field-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <label
                        htmlFor="email"
                        className="form-contact-label absolute left-0 ml-1 bg-white px-1 text-sm duration-100 ease-linear
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:ml-1 peer-focus:px-1 peer-focus:text-sm"
                      >
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500 pointer-events-none" />
                    </div>
                  <p
  className={`text-red-500 text-sm mt-1 min-h-[20px] ${
    errors.email ? "m-[10px] !mt-[10px]" : "my-0"
  }`}
>
  {errors.email || ""}
</p>

                  </div>

                  <div className="relative !mb-[0px]">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9787616940"
                        className={`peer w-full px-4 py-2 pr-12 border rounded-lg contact-field-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <label
                        htmlFor="phone"
                        className="form-contact-label absolute left-0 ml-1 bg-white px-1 text-sm duration-100 ease-linear
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:ml-1 peer-focus:px-1 peer-focus:text-sm"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500 pointer-events-none" />
                    </div>
                  <p
  className={`text-red-500 text-sm mt-1 min-h-[20px] ${
    errors.phone ? "m-[10px] !mt-[10px]" : "m-0"
  }`}
>
  {errors.phone || ""}
</p>

                  </div>

                  <div className="relative !mb-[0px]">
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      placeholder="Your message"
                      className="peer w-full px-4 py-2 border border-gray-300 contact-field-placeholder rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="form-contact-label absolute left-0 ml-1 bg-white px-1 text-sm duration-100 ease-linear
                      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                      peer-focus:ml-1 peer-focus:px-1 peer-focus:text-sm"
                    >
                      Message
                    </label>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleSubmit}
                      className="group bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold pl-5 pr-1 py-[5px] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                    >
                      Send Message
                      <div className="bg-white font-bold rounded-full p-2 group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5 text-orange-500" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalVisible && (
          <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative">
              <CheckCircle className="mx-auto w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">{modalMessage}</p>
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
