import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const Navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
      {
        name,
        email,
        password,
        phone,
        address,
        answer,
      }
    );
    if (res) {
      toast.success("Registered Successfully");
      Navigate("/");
    }
  };
  return (
    <div className="bg-neutral-200  h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="form w-full md:w-[30%] flex justify-center gap-3 items-center flex-col h-full md:h-[60%] bg-pink-200">
          <h2>Register Form</h2>
          <form className="flex flex-col gap-2 w-[80%]" onSubmit={handlesubmit}>
            <input
              placeholder="enter name"
              className="bg-white outline-none p-2 rounded-md"
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              placeholder="enter email"
              className="bg-white outline-none p-2 rounded-md"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              placeholder="enter password"
              className="bg-white outline-none p-2 rounded-md"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              placeholder="enter phone"
              className="bg-white outline-none p-2 rounded-md"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
            <input
              placeholder="enter Address"
              className="bg-white outline-none p-2 rounded-md"
              type="text"
              name="address"
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            />
            <input
              placeholder="enter your favourite sports name"
              className="bg-white outline-none p-2 rounded-md"
              type="text"
              name="answer"
              value={answer}
              onChange={(e) => {
                setanswer(e.target.value);
              }}
            />
            <input
              type="submit"
              value={"Submit"}
              className="bg-pink-600 text-white p-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
