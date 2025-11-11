import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../components/context/authContext";
import SEO from "../../components/More/SEO";
import { UserRoundCheck } from "lucide-react"; // clean icon

const UpdateProfile = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/update-user`,
        { name, email, password, phone, address },
        {
          headers: { Authorization: auth?.token },
        }
      );

      if (data?.success) {
        setAuth({ ...auth, user: data?.UpdatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data?.UpdatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error("Profile update failed. Try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
    }
  }, [auth?.user]);

  useEffect(() => {
    if (!auth?.token) navigate("/login");
  }, [auth?.token, navigate]);

  return (
    <>
      {/* ✅ SEO Meta */}
      <SEO
        title="Update Profile | Taskeena Beauty"
        description="Easily update your Taskeena Beauty account information including name, contact number, and shipping address."
        keywords="update profile, edit user details, Taskeena Beauty, skincare, wellness, user dashboard"
      />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-4 py-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-emerald-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <UserRoundCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-emerald-700">
              Update Profile
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Keep your information up-to-date
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-white/90 border border-emerald-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/90 border border-emerald-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="bg-white/90 border border-emerald-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="bg-white/90 border border-emerald-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              placeholder="Full Address"
              className="bg-white/90 border border-emerald-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400 resize-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
            ></textarea>

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-emerald-500 to-rose-500 text-white font-semibold py-3 rounded-full shadow-lg hover:opacity-90 transition-transform hover:scale-105"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
