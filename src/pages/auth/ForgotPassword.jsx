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
      toast.success("Password Changes Successfully");
      Navigate("/login");
    }
  };
  return (
    <div className="bg-neutral-200  h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="form w-full md:w-[30%] flex justify-center gap-3 items-center flex-col h-full md:h-[60%] bg-pink-200">
          <h2>Reset Password</h2>
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
              type="text"
              name="answer"
              value={answer}
              placeholder="Enter your favourite sports name"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <input
              className="bg-white outline-none p-2 rounded-md"
              type="password"
              name="newpassword"
              value={newpassword}
              placeholder="Passsword"
              onChange={(e) => {
                setNewpassword(e.target.value);
              }}
            />
            <input type="submit" className="bg-pink-600 text-white p-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
