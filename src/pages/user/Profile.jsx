import React from "react";
import { useAuth } from "../../components/context/authContext";
import { Link } from "react-router-dom";
import SEO from "../../components/More/SEO";
import { User } from "lucide-react"; // ✅ clean icon

const Profile = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  return (
    <>
      {/* ✅ SEO META TAGS */}
      <SEO
        title="My Profile | Taskeena Beauty"
        description="View and manage your Taskeena Beauty profile details, including name, email, contact number, and shipping address."
        keywords="user profile, Taskeena Beauty account, skincare, wellness, edit profile, dashboard"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 text-gray-800 px-4 py-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-emerald-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <User className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-emerald-700">
              User Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your personal information
            </p>
          </div>

          {/* Profile Details */}
          <div className="space-y-5 text-base font-medium">
            <div className="flex justify-between border-b border-emerald-100 pb-2">
              <span className="text-gray-500">Name:</span>
              <span className="text-emerald-700">{user?.name || "—"}</span>
            </div>

            <div className="flex justify-between border-b border-emerald-100 pb-2">
              <span className="text-gray-500">Email:</span>
              <span className="text-emerald-700">{user?.email || "—"}</span>
            </div>

            <div className="flex justify-between border-b border-emerald-100 pb-2">
              <span className="text-gray-500">Phone:</span>
              <span className="text-emerald-700">{user?.phone || "—"}</span>
            </div>

            <div className="flex justify-between border-b border-emerald-100 pb-2 items-start">
              <span className="text-gray-500">Address:</span>
              <span className="text-emerald-700 text-right w-1/2 break-words">
                {user?.address || "—"}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-10 text-center">
            <Link to="/dashboard/user/update-profile">
              <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-rose-500 text-white font-semibold rounded-full shadow hover:opacity-90 transition-transform hover:scale-105">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
