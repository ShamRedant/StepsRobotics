'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const requestOtp = async () => {
    try {
      await axios.post('/api/request-otp', { email });
      alert('OTP sent to email');
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('/api/verify-otp', { email, otp, newPassword });
      alert('Password reset successful');
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h1>

        {step === 1 && (
          <>
            <p className="text-center text-gray-500 mb-6">
              Enter your email to receive a One-Time Password (OTP)
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
            />
            <button
              onClick={requestOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center text-gray-500 mb-6">
              Enter the OTP you received and set a new password
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Reset Password
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 text-blue-500 hover:underline text-center"
            >
              Back to Email Entry
            </button>
          </>
        )}
      </div>
    </div>
  );
}
