"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { User, GraduationCap } from "lucide-react";
import RobotLogo from "@/public/siginlogo.png";
import LoginImg from "@/public/login_img.png";
import { useUser } from "../Context/UserContext";

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState("student");

  const roles = [
    { name: "student", icon: <GraduationCap className="w-5 h-5 mb-1" /> },
    { name: "teacher", icon: <User className="w-5 h-5 mb-1" /> },
  ];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      if (["admin", "support", "editor", "staff"].includes(storedRole)) {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router]);
useEffect(() => {
  function hideElements() {
    const footer = document.querySelector(".footer");
    if (footer) footer.style.display = "none";
  }
  hideElements();
  const observer = new MutationObserver(() => hideElements());
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    const footer = document.querySelector(".footer");
    if (footer) footer.style.display = "";
  };
}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setEmailError("Email is required 😊");
      return;
    }
    if (!password) {
      setPasswordError("Password is required 😊");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("role", data.user.role);

        if (["admin", "support", "editor", "staff"].includes(data.user.role)) {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signin-component container-spacing">
      <div className="w-full signin flex justify-center">
        <div className="w-full container-custom py-8 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen">
                    <div className="text-white flex flex-col hidden md:flex">
            <div className="mb-2 pl-[50px] pt-[30px]">
              <h1 className="signin-main-title">Welcome to</h1>
              <h2 className="signin-main-title -mt-3 font-bold text-yellow-400">
                Student Portal
              </h2>
              <p className="signin-sub-title text-sm">
                You can sign in to access with your <br /> existing account
              </p>
            </div>
            <div className="text-center pl-[50px]">
              <Image src={LoginImg} alt="Steps Logo" height={450} />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center justify-start w-full">
            <div className="signin-brand-logo mb-6 self-center">
              <Image src={RobotLogo} alt="Steps Logo" height={100} />
            </div>

            <div className="w-full bg-white shadow-lg rounded-xl p-8">
              <h2 className="signin-form-title text-center mb-2">
                Login to <span className="text-yellow-500">Steps Robotics</span>
              </h2>
              <p className="text-center text-gray-500 signin-form-subtitle mb-6">
                Enter to learn, create, and innovate
              </p>

              <div className="flex justify-center items-center w-full mt-6">
                <div className="flex w-auto mb-3 space-x-4 bg-gray-100 rounded-full p-1">
                  {roles.map((r) => (
                    <button
                      key={r.name}
                      type="button"
                      className={`flex items-center justify-center gap-2 px-4 py-1 role-sigin-btn rounded-full transition-all duration-200 ${
                        role === r.name
                          ? "bg-yellow-400 text-black"
                          : "text-gray-700 hover:bg-yellow-100"
                      }`}
                      onClick={() => setRole(r.name)}
                    >
                      <span className="text-lg">{r.icon}</span>
                      <span>
                        {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      if (!email) setEmailError("Email is required 😊");
                      else setEmailError("");
                    }}
                    onFocus={() => setEmailError("")}
                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 focus:border-orange-600 outline-none placeholder-gray-500 text-gray-800 transition-all"
                    placeholder="Username"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {
                      if (!password) setPasswordError("Password is required 😊");
                      else setPasswordError("");
                    }}
                    onFocus={() => setPasswordError("")}
                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 focus:border-orange-600 outline-none placeholder-gray-500 text-gray-800 transition-all"
                    placeholder="Password"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="text-right mt-4 text-sm text-gray-600">
                  <span
                    className="text-right stem-gold font-bold f-poppins cursor-pointer hover:text-blue-800 transition"
                    onClick={() => router.push("/forgot-password")}
                  >
                    Forgot password?
                  </span>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="group bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold px-[6px] py-[5px] pl-[19px] text-[18px] font-[poppins] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    Sign In
                    <div className="bg-white font-bold rounded-full p-2 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-3 h-3 text-orange-500" />
                    </div>
                  </button>
                </div>
              </form>

              <div className="text-center f-poppins mt-4 text-sm">
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => router.push("/signup")}
                >
                  Signup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section (unchanged) */}
      <div className="w-full flex flex-col sm:flex-row text-sm relative z-10">
        <div className="relative bg-[#FFD700] sm:w-[40%] w-full flex justify-center items-center h-10 sm:h-8">
          <div className="flex space-x-2 text-black">
            <a href="#" className="hover:underline footer-bottom-text">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:underline footer-bottom-text">
              Terms of Use
            </a>
          </div>
        </div>

        <div
          className="bg-black sm:w-[64%] w-full flex flex-col sm:flex-row justify-between items-center text-white px-3 sm:px-4 h-10 sm:h-8 sm:-ml-[30px]"
          style={{
            clipPath: "polygon(30px 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <p className="text-center sm:text-left footer-bottom-text text-xs sm:text-sm leading-tight sm:ml-[65px]">
            Copyright STEPS Robotics 2025. All rights reserved.
          </p>
          <p className="text-center sm:text-right footer-bottom-text text-xs sm:text-sm leading-tight sm:mr-[30px] mt-1 sm:mt-0">
            Powered by: <span className="font-medium">Redant Labs</span>
          </p>
        </div>
      </div>
    </div>
  );
}
