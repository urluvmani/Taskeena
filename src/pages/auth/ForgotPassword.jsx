import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const Navigate = useNavigate();
  const [email, setemail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
      {
        email,
        answer,
        newpassword,
      }
    );
    if (res) {
      toast.success("Password Changed Successfully");
      Navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-800 p-4">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-xl border border-red-600 shadow-[0_0_30px_rgba(255,0,0,0.4)] rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6 uppercase tracking-wide">
          Reset Password
        </h2>

        <p className="text-center text-gray-300 mb-6 text-sm">
          ⚠️ For your security, please verify your identity before changing the password.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
          <div>
            <label className="text-gray-300 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Security Answer</label>
            <input
              type="text"
              placeholder="Your favourite sport"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-red-600/40"
          >
            Change Password
          </button>

          <button
            type="button"
            onClick={() => Navigate("/login")}
            className="w-full mt-2 bg-transparent border border-red-500 text-red-400 font-semibold py-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
