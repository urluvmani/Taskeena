import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast"; // ✅ include Toaster

import { useAuth } from "../../components/context/authContext.jsx";
const Login = () => {
  const location = useLocation(); // 👈 to read from state
  const { setAuth } = useAuth();
  const Navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      {
        email,
        password,
      }
    );
    if (res.data.success) {
      toast.success("Login Successfully");
      setAuth({
        user: res.data.user,
        token: res.data.token,
      });
      const redirectPath = location.state || "/"; // 👈 fallback route
      Navigate(redirectPath);
    } else {
      toast.error("Please enter Valid credentials");
    }
  };
  return (
    <div className="bg-neutral-200  h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="form w-full md:w-[30%] flex justify-center gap-3 items-center flex-col h-full md:h-[60%] bg-pink-200">
          <h2>Login Form</h2>
          <form className="flex flex-col gap-2 w-[80%]" onSubmit={handlesubmit}>
            <input
              className="bg-white outline-none p-2 rounded-md"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              className="bg-white outline-none p-2 rounded-md"
              type="password"
              name="password"
              value={password}
              placeholder="Passsword"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input type="submit" className="bg-pink-600 text-white p-2" />
          </form>
          <button
            className="bg-pink-600 text-white p-2"
            onClick={() => Navigate("/forgot-password")}
          >
            forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
