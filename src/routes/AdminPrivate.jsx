import React from "react";
import { useAuth } from "../components/context/authContext";
import { Outlet, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // ✅ include Toaster


const AdminPrivateRoute = () => {
  const { auth } = useAuth();

  // If auth isn't loaded yet
  if (!auth?.user) {
      return <Navigate to="/" />;

  }

  // Not admin
  if (auth?.user?.role != 1) {
    console.log("Not an admin, redirecting to login");
    
        toast.error("Access denied. Admins only.");
   
    return <Navigate to="/" />;
  }

  // Admin verified
  return <Outlet />;
};

export default AdminPrivateRoute;
