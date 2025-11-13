import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"; // icons (optional)

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-700 to-rose-700 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-wide">Taskeena</h2>
          <p className="text-sm opacity-80">
            Premium beauty & wellness products made for you.
          </p>
        </div>

        {/* Center Quick Links */}
        <div className="flex flex-wrap justify-center gap-15  font-medium">
          <Link to="/" className="hover:text-emerald-100 transition">
          <h1>  Home</h1>
          </Link>
        
          <Link to="/cart" className="hover:text-emerald-100 transition">
                      <h1>  Cart</h1>

          </Link>
          <Link to="/about" className="hover:text-emerald-100 transition">
                      <h1>  About us</h1>

          </Link>
        </div>

        {/* Right side - social icons */}
        <div className="flex justify-center gap-4">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-100 transition"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-100 transition"
          >
            <Instagram size={18} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-100 transition"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-100 transition"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-white/20 pt-4 text-center text-xs opacity-80">
        © {new Date().getFullYear()} Taskeena Beauty. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
