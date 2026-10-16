import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Taskeena</h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Premium beauty & wellness products crafted to nourish, heal, and glow. Your journey to radiant beauty starts here.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-110"
              >
                <Facebook size={18} md:size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-110"
              >
                <Instagram size={18} md:size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-110"
              >
                <Twitter size={18} md:size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-110"
              >
                <Youtube size={18} md:size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections/all" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/allCategories" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/pages/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard/user/orders" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/dashboard/user/profile" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full"></span>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full"></span>
                  Search Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm md:text-base">
                <Mail size={16} md:size={18} className="mt-1 text-primary-500 flex-shrink-0" />
                <span>support@taskeena.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm md:text-base">
                <Phone size={16} md:size={18} className="mt-1 text-primary-500 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm md:text-base">
                <MapPin size={16} md:size={18} className="mt-1 text-primary-500 flex-shrink-0" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Taskeena Beauty. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
