import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, ArrowRight } from 'lucide-react';
export default function BookTrial() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    mobile: '',
    email: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
<div className="min-h-screen w-full p-4 md:p-8 lg:p-12 flex items-center justify-center">
  <div className="w-full max-w-7xl book-trail-popup rounded-3xl shadow-2xl overflow-hidden">
        <div className="text-center pt-8 mt-6 pb-6 booktrail-shadow mx-[100px] px-4">
          <h1 className="book-trail-title mb-2">
            Book a Free Trial Session
          </h1>
          <div className="inline-block bg-white/80 rounded-full px-6 py-3 shadow-md">
            <p className="book-trail-subtitle md:text-base lg:text-lg">
              Empowering Young Innovators through Robotics, AI, and Coding
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 px-6 py-3">
           <div className="flex -mt-[60px] flex-col items-center justify-center w-full max-w-md mx-auto">
  <Image
    src="/booktrail.png"
    width={350}
    height={400}
    alt="booktrail"
    className="mx-auto"
  />
  <div className="text-center mt-8">
    <p className="booktrail-description italic">
      Master 21st Century Skills with Practical,
      <br />
      Personalized Training
    </p>
  </div>
</div>


          <div className="flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <div>
                <label className="block book-trail-form-label mb-2">
                  Student&apos;s Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 h-[38px] rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none bg-white/80 transition-colors"
                />
              </div>

              <div>
                <label className="block book-trail-form-label mb-2">
                  Parent&apos;s Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 h-[38px] rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none bg-white/80 transition-colors"
                />
              </div>
              <div>
                <label className="block book-trail-form-label mb-2">
                  Mobile Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 h-[38px] rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none bg-white/80 transition-colors"
                />
              </div>
              <div>
                <label className="block book-trail-form-label mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 h-[38px] rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none bg-white/80 transition-colors"
                />
              </div>
              <div>
                <label className="block book-trail-form-label mb-2">
                  Location<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 h-[38px] rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none bg-white/80 transition-colors"
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r booktrail-btn from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                >
                  <span className="text-lg">Submit</span>
<div className="bg-white font-bold rounded-full p-2 group-hover:translate-x-1 transition-transform">
        <ArrowRight className="w-3 h-3 text-orange-500" />
      </div>                </button>
              </div>
              <div className="booktrail-policy-content pt-2">
                <span className="booktrail-policy">Privacy Policy:</span> We hate spam and promise to keep your email address safe.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}