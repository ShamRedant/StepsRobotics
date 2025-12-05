"use client";
import React, { useState } from "react";
import { Mail, Phone, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";
import axios from "axios";

export default function ContactDetails() {
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
    <div
      id="contactsection"
      className="contact-details mt-[80px] -mb-[20px] pt-[20px] pb-[40px] px-0 scroll-mt-[80px] md:scroll-mt-[100px]"
    >
      <div className="container-custom">
        <div className="contact-better-main mt-[45px]">
          <h2 className="contact-way-title text-3xl font-bold">
            Contact
            <span className="stem-gold contact-way-title pl-2">Details</span>
          </h2>
          <p className="contact-model-title mt-3 !text-[14px] text-gray-700">
            Whether you&apos;re a parent exploring courses for your child, a
            student eager to learn, a professional interested in our franchise
            opportunities, or someone looking to join our team of trainers,
            we&apos;d love to hear from you. Our team is always approachable and
            committed to responding promptly.
          </p>
        </div>

        <div className="bg-white mt-[40px] mb-[70px] rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-[45%_55%] gap-0">
            <div className="get-in-touch-image flex items-center !rounded-[0_30px_30px_0] justify-center">
              <div className="w-full max-w-md get-box !rounded-[0_30px_30px_0]  py-8 space-y-6">
                <div className="flex items-start gap-4 sm:px-[0px] px-[14px]">
                  <div className="bg-[#FFD02B] shadow-[inset_3px_1px_3.9px_0_rgba(0,0,0,0.37)] w-[60px] h-[57px] rounded-2xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-800" />
                  </div>
                  <div>
                    <h4 className="contact-main-title">Location</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      TVH Agnito Park, Rajiv Gandhi Salai, PTK Nagar,
                      <br />
                      Thiruvanmiyur, Chennai, Tamil Nadu 600096.
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="453"
                  height="1"
                  viewBox="0 0 453 1"
                  fill="none"
                >
                  <path
                    d="M0 0.5H453"
                    stroke="#828282"
                    strokeOpacity="0.76"
                    strokeDasharray="3 3"
                  />
                </svg>{" "}
                <div className="flex items-start gap-4 sm:px-[0px] px-[14px]">
                  <div className="bg-[#FFD02B] shadow-[inset_3px_1px_3.9px_0_rgba(0,0,0,0.37)] w-[60px] h-[57px] rounded-2xl flex items-center justify-center">
                    <Phone className="w-8 h-8 text-gray-800" />
                  </div>
                  <div>
                    <h4 className="contact-main-title">Call Now</h4>
                    <p className="text-sm text-gray-600">+91 9787616940</p>
                    <p className="text-sm text-gray-600">044 223344567</p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="453"
                  height="1"
                  viewBox="0 0 453 1"
                  fill="none"
                >
                  <path
                    d="M0 0.5H453"
                    stroke="#828282"
                    strokeOpacity="0.76"
                    strokeDasharray="3 3"
                  />
                </svg>{" "}
                <div className="flex items-start gap-4 sm:px-[0px] px-[14px]">
                  <div className="bg-[#FFD02B] shadow-[inset_3px_1px_3.9px_0_rgba(0,0,0,0.37)] w-[60px] h-[57px] rounded-2xl flex items-center justify-center">
                    <Mail className="w-8 h-8 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="contact-main-title">Email Now</h4>
                    <p className="text-sm text-gray-600">
                      info@stepsrobotics.com
                    </p>
                    <p className="text-sm text-gray-600">
                      enquiry@stepsrobotics.com
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-6 pt-4">
                  {/* <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                    📞
                  </div>
                  <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center text-black">
                    ✉️
                  </div>
                  <div className="bg-blue-400 w-12 h-12 rounded-lg flex items-center justify-center text-black">
                    @
                  </div> */}
                  <Image
                    src="/contact_icon.png"
                    alt="icons-contacr"
                    width={420}
                    height={265}
                    className="w-full h-[115px] object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="pt-[35px] pb-[18px] px-[45px] get-in-touch-form">
              <h2 className="text-4xl get-in-title !font-oxanium font-bold mb-4">
                Get In Touch
              </h2>
              <p className="get-in-touch-subtitle mt-3 mb-2 leading-relaxed">
                Share your requirements and our experts will contact you
                promptly
              </p>

              <div className="space-y-6 mt-[30px]">
                <div className="grid sm:grid-cols-2 gap-4 mt-[20px] !mb-[5px]">
                  <div className="relative -mb-[15px]">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className={`peer w-full px-4 py-3 border rounded-lg contact-field-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
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
                        errors.firstName
                          ? "m-[10px] !mt-[10px] !mb-[20px]"
                          : "m-0"
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
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg contact-field-placeholder placeholder:[contact-field-placeholder] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
                      className={`peer w-full px-4 py-3 pr-12 border rounded-lg contact-field-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
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
                      className={`peer w-full px-4 py-3 pr-12 border rounded-lg contact-field-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
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
                    className="peer w-full px-4 py-3 border border-gray-300 contact-field-placeholder rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
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

                <div className="flex justify-center mx-[20px] pt-[20px] pb-[20px]">
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
