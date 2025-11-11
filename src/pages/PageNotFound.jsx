import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      <h1 className="text-9xl font-extrabold text-pink-600 tracking-widest">
        404
      </h1>
      <div className="bg-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold mt-4">
        Page Not Found
      </div>
      <p className="text-gray-600 mt-6 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-all duration-300"
      >
        Go Back Home
      </Link>

      <div className="absolute bottom-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Taskeena
      </div>
    </div>
  );
};

export default PageNotFound;
