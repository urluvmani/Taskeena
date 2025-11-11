import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../components/context/authContext";
import AdminMenu from "../../components/More/AdminMenu";
import { Menu, X } from "lucide-react"; // for hamburger icons (optional: install lucide-react)

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col text-white">
      {/* ===== Header for Mobile ===== */}
      <header className="flex items-center justify-between p-4 border-b border-neutral-800 sm:hidden">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:text-pink-400 transition"
        >
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ===== Sidebar ===== */}
        <aside
          className={`fixed sm:static top-0 left-0 h-full sm:h-auto bg-neutral-900 border-r border-neutral-800 z-50 transition-all duration-300 
          ${
            sidebarOpen
              ? "w-64 translate-x-0"
              : "w-0 -translate-x-full sm:w-[20vw] sm:translate-x-0"
          } overflow-y-auto`}
        >
          <div className="p-4 sm:p-0">
            <AdminMenu />
          </div>
        </aside>

        {/* ===== Overlay for Mobile ===== */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ===== Main Content ===== */}
        <main className="flex-1 w-full p-4 sm:p-6 overflow-y-auto">
          {/* Dashboard Header */}
          <div className="bg-neutral-800 rounded-2xl shadow-md p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-wide">
                {auth?.user ? `Welcome, ${auth.user.name}` : "Welcome, Admin"}
              </h1>
              <p className="text-sm text-neutral-400">
                Manage your store efficiently from this panel.
              </p>
            </div>

            {auth?.user && (
              <div className="bg-neutral-700 px-4 py-2 rounded-lg text-sm text-neutral-300">
                <span className="font-medium">Email: </span>
                {auth.user.email}
              </div>
            )}
          </div>

          {/* Render Nested Pages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
