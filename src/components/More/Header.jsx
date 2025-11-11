import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useCart } from "../context/Cart.jsx";
import SearchInput from "../form/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";

const Header = () => {
  const { cart } = useCart();
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = useState(false);
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
    <header className="bg-white shadow-md px-2 md:px-0 sticky top-0 z-500">
      <div className="max-w-6xl mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="xl:text-3xl text-2xl   font-bold text-pink-600">
            Taskeena
          </h1>
        </Link>

        {/* Search */}

        {/* Desktop Menu */}
        <div className="hidden md:flex  items-center gap-10">
          <SearchInput />
          <nav className="hidden md:flex space-x-5 text-gray-700 font-medium">
            {!auth.token && (
              <Link to="/register" className="hover:text-pink-600">
                Register
              </Link>
            )}

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 font-medium hover:text-pink-600 transition"
            >
              <ShoppingCart size={18} />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[1.2rem] h-[1.2rem] flex items-center justify-center text-[0.7rem] font-bold bg-orange-500 text-white rounded-full shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Dashboard */}
            {auth?.user && (
              <Link
                to={`/dashboard/${auth.user.role == 1 ? "admin" : "user"}`}
                className="hover:text-pink-600"
              >
                Dashboard
              </Link>
            )}

            {/* Categories Dropdown */}
            <select className="w-[8vw]" onChange={handleChange}>
              <option value={`/allCategories`}>Categories</option>
              {Categories?.map((c) => (
                <option key={c._id} value={`/Category/${c.slug}`}>
                  {c.name}
                </option>
              ))}
            </select>
          </nav>

          {/* CTA Button */}
          {auth.token ? (
            <button
              onClick={handleLogout}
              className="hidden md:inline bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="hidden w-20 md:inline bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                Sign In
              </button>
            </Link>
          )}
        </div>

        <div className="flex gap-5 xl:hidden md:hidden items-center">
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="relative flex items-center   gap-2 font-medium hover:text-pink-600"
          >
            <ShoppingCart size={18} />

            {cart.length > 0 && (
              <span className="absolute -top-2  left-3 min-w-[1.2rem] h-[1.2rem] flex items-center justify-center text-[0.7rem] font-bold bg-orange-500 text-white rounded-full shadow-md">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <nav className="flex  flex-col space-y-4 py-4 px-6 text-gray-700">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-pink-600"
            >
              Home
            </Link>
            <SearchInput />

            {/* Categories Dropdown */}
            <select
              className="border border-gray-200 rounded-md p-2"
              onChange={handleChange}
            >
              <option value={`/allCategories`}>Categories</option>
              {Categories?.map((c) => (
                <option key={c._id} value={`/Category/${c.slug}`}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Dashboard */}
            {auth?.user && (
              <Link
                to={`/dashboard/${
                  auth.user.role == 1 ? "admin" : "user"
                }/orders`}
                onClick={() => setOpen(false)}
                className="hover:text-pink-600"
              >
                Dashboard
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="relative flex items-center gap-2 font-medium hover:text-pink-600"
            >
              <ShoppingCart size={18} />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 left-12 min-w-[1.2rem] h-[1.2rem] flex items-center justify-center text-[0.7rem] font-bold bg-orange-500 text-white rounded-full shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Register */}
            {!auth.token && (
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="hover:text-pink-600"
              >
                Register
              </Link>
            )}

            {/* Login / Logout */}
            {auth.token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                  Sign In
                </button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
