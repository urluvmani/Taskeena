import React, { useState } from "react";
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useCart } from "../context/Cart.jsx";
import SearchInput from "../form/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";

const Header = () => {
  const { cart } = useCart();
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const Categories = useCategory();

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected) navigate(selected);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Taskeena
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <span>Categories</span>
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="py-2">
                  <Link
                    to="/allCategories"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-medium"
                  >
                    All Categories
                  </Link>
                  {Categories?.map((c) => (
                    <Link
                      key={c._id}
                      to={`/Category/${c.slug}`}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            <SearchInput />

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-[1.25rem] flex items-center justify-center text-[0.7rem] font-bold bg-emerald-600 text-white rounded-full shadow-md px-1">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {auth?.user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={`/dashboard/${auth.user.role == 1 ? "admin" : "user"}`}
                  className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User size={22} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium text-sm whitespace-nowrap shadow-sm hover:shadow-md transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-gray-700 hover:text-emerald-600 font-medium text-sm whitespace-nowrap transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm whitespace-nowrap shadow-sm hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Icons (Search Icon + Cart + Hamburger) */}
          <div className="flex items-center space-x-1 md:hidden">
            {/* Mobile Search Toggle Button */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <Search size={22} />
            </button>

            <Link
              to="/cart"
              className="relative p-2 text-gray-700"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-[1.25rem] flex items-center justify-center text-[0.7rem] font-bold bg-emerald-600 text-white rounded-full shadow-md px-1">
                  {cart.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Dropdown */}
        {showMobileSearch && (
          <div className="pb-4 pt-1 md:hidden">
            <SearchInput />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="px-4 py-6 space-y-4">
            {/* Always Visible Search Bar inside Mobile Drawer */}
            <div className="pb-2">
              <SearchInput />
            </div>

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors border-b border-gray-100"
            >
              Home
            </Link>

            <div className="space-y-3 pb-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                onChange={handleChange}
              >
                <option value={`/allCategories`}>All Categories</option>
                {Categories?.map((c) => (
                  <option key={c._id} value={`/Category/${c.slug}`}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors border-b border-gray-100"
            >
              About
            </Link>

            <div className="pt-4 space-y-3">
              {auth?.user ? (
                <>
                  <Link
                    to={`/dashboard/${auth.user.role == 1 ? "admin" : "user"}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-rose-600 text-white rounded-xl font-medium text-center transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full py-3 text-center text-gray-700 font-medium hover:text-emerald-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium transition-all text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;