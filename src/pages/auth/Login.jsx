import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../components/context/authContext.jsx";

const Login = () => {
  const location = useLocation();
  const { setAuth } = useAuth();
  const Navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      { email, password }
    );
    if (res.data.success) {
      toast.success("Welcome back! 🌸");
      setAuth({
        user: res.data.user,
        token: res.data.token,
      });
      const redirectPath = location.state || "/";
      Navigate(redirectPath);
    } else {
      toast.error("Oops! Invalid credentials 😕");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-amber-50 to-emerald-100 p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-pink-200">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-pink-600 drop-shadow-sm">
            🌼 Welcome Back!
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Let’s make today a happy login day 💫
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full mt-2 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full mt-2 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold py-3 rounded-xl hover:from-rose-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
          >
            Login 👨‍⚕️
          </button>

          <button
            type="button"
            onClick={() => Navigate("/forgot-password")}
            className="w-full mt-2 bg-pink-50 text-pink-600 font-semibold py-3 rounded-xl hover:bg-pink-100 transition-all duration-300"
          >
            Forgot Password?
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => Navigate("/register")}
            className="text-pink-600 font-semibold cursor-pointer hover:underline"
          >
            Register here 💕
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
