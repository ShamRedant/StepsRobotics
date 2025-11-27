'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import bgImage from '@/public/bgImage.png';
import robotLogo from '@/public/stepsLogo.png';
import { BookOpen, Settings } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRole, setselectedRole] = useState('student');
  const [role, setRole] = useState('student');
  const [agreed, setAgreed] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);

  const [formData, setFormData] = useState({
    full_name: '',
    student_id: '',
    age: '',
    grade: '',
    email: '',
    parent_phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const roles = [
    { name: 'student', icon: <BookOpen className="mx-auto mb-1" /> },
    { name: 'teacher', icon: <Settings className="mx-auto mb-1" /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordScore(calculatePasswordScore(value));
    }
  };

  const handleFocus = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? `${formatFieldName(name)} is required` : '',
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? `${formatFieldName(name)} is required` : '',
    }));
  };

  const formatFieldName = (name) => {
    switch (name) {
      case 'full_name': return 'Full Name';
      case 'student_id': return 'Student ID';
      case 'parent_phone': return "Parent's Phone";
      case 'confirmPassword': return 'Confirm Password';
      default: return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${formatFieldName(key)} is required`;
      }
    });

    if (!agreed) {
      alert('You must agree to the terms and policy before registering.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = { ...formData, role };

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        setFormData({
          full_name: '',
          student_id: '',
          age: '',
          grade: '',
          email: '',
          parent_phone: '',
          password: '',
          confirmPassword: '',
        });
        setAgreed(false);
        router.push('/login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the form');
    }
  };

  const calculatePasswordScore = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    return score;
  };

  return (
    <div className="min-h-screen flex relative">
      <div
        className="w-1/2 relative text-white p-16 flex flex-col bg-signup"
        style={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: 'cover' }}
      >
        <div className="absolute top-10 left-10 text-3xl font-bold flex items-center space-x-3">
          <Image src={robotLogo} alt="Steps Logo" height={100} />
        </div>

        <div className="mt-20">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome! <span className="text-yellow">to STEPS Robotics</span>
          </h1>
          <p className="mt-4 text-gray-300 tracking-widest text-lg">
            Where Young Minds Build the Future
          </p>
        </div>
        <div className="absolute right-0 top-[400px] flex flex-col space-y-1">
          <a className={`text-lg cursor-pointer px-4 py-3 rounded-l transition duration-200 ${pathname === '/login'
            ? 'bg-white text-black'
            : 'text-white hover:bg-white hover:text-black'
            }`}
            onClick={() => router.push('/login')}>
            Login
          </a>

          <a className={`text-lg cursor-pointer px-4 py-3 rounded-l transition duration-200 ${pathname === '/signup'
            ? 'bg-white text-black'
            : 'text-white hover:bg-white hover:text-black'
            }`}
            onClick={() => router.push('/signup')}>
            Signup
          </a>
        </div>
      </div>

      <div className="w-1/2 bg-white p-16 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Join STEM Academy</h2>
          <p className="text-center text-gray-500 mb-6">Create your account and start learning</p>

          <div className="flex justify-center items-center w-full mt-6">
            <div className="flex w-60 mb-6 space-x-4 bg-gray-100 rounded-full p-1">
              {roles.map((r) => (
                <a
                  key={r.name}
                  className={`w-28 py-2 font-semibold flex flex-col items-center justify-center rounded-full transition-all duration-200 ${role === r.name
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-700 hover:bg-yellow-100'
                    }`}
                  onClick={() => setRole(r.name)}
                >
                  {r.icon}
                  {r.name}
                </a>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/** Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>

            {/** Student ID */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Student ID</label>
              <input
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter student id"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
              {errors.student_id && <p className="text-red-500 text-sm mt-1">{errors.student_id}</p>}
            </div>

            {/** Age and Grade */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold mb-1">Age</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 text-gray-700"
                >
                  <option>Select age</option>
                  {[...Array(18)].map((_, i) => (
                    <option key={i}>{i + 5}</option>
                  ))}
                </select>
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold mb-1">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 text-gray-700"
                >
                  <option>Select Grade</option>
                  {['1st', '2nd', '3rd', '4th', '5th', '6th'].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
                {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
              </div>
            </div>

            {/** Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/** Parent Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Parent&apos;s Phone</label>
              <input
                name="parent_phone"
                value={formData.parent_phone}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="tel"
                placeholder="Enter parent's phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
              {errors.parent_phone && <p className="text-red-500 text-sm mt-1">{errors.parent_phone}</p>}
            </div>

            {/** Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/** Password Strength */}
            <div className="w-full mt-2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${passwordScore > index
                      ? passwordScore === 1
                        ? 'bg-red-500'
                        : passwordScore === 2
                          ? 'bg-yellow-400'
                          : passwordScore === 3
                            ? 'bg-blue-400'
                            : 'bg-green-500'
                      : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
              <p className="text-xs mt-1 text-gray-600">
                Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordScore]}
              </p>
            </div>

            {/** Confirm Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="w-4 h-4"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                <b>
                  I agree to the{' '}
                  <span className="text-blue-600 underline cursor-pointer">Terms & Privacy Policy</span>
                </b>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow text-black font-semibold py-2 rounded hover:bg-yellow-500 mt-4"
            >
              Create Student Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
