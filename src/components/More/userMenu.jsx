import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Package } from "lucide-react"; // ✅ modern icons

const UserMenu = () => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  const menuItems = [
    {
      name: "My Profile",
      path: "/dashboard/user/profile",
      icon: <User className="w-5 h-5 mr-3" />,
    },
    {
      name: "My Orders",
      path: "/dashboard/user/orders",
      icon: <Package className="w-5 h-5 mr-3" />,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center text-white font-medium">
      {/* Header */}
      <h1 className="text-2xl font-extrabold mt-6 mb-8 tracking-wide text-center bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow">
        User Dashboard
      </h1>

      {/* Menu Container */}
      <nav className="flex flex-col gap-3 w-full px-4">
        {menuItems.map((item) => {
          const isActive =
            activeItem === item.name || location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center py-3 px-5 rounded-lg transition-all duration-300 
                ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-rose-500 shadow-lg scale-[1.02]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
            >
              {item.icon}
              <span
                className={`${
                  isActive ? "text-white" : "text-emerald-100"
                } text-sm md:text-base font-semibold tracking-wide`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto mb-6 text-xs text-emerald-100/70 text-center opacity-80">
        © {new Date().getFullYear()} Taskeena Beauty
      </div>
    </div>
  );
};

export default UserMenu;
