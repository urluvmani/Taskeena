import React from "react";
import { useAuth } from "../components/context/authContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { auth } = useAuth();
  console.log("PrivateRoute auth:", auth);


    return auth?.token ? <Outlet /> : <>
    <div className="w-full h-screen flex justify-center text-3xl font-bold items-center text-center">
       { Navigate("/login") }
    </div>
    </>;

};

export default PrivateRoute;
