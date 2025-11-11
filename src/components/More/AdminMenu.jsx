import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [activeItem, setActiveItem] = useState(""); // store active link name

  const menuItems = [
    { name: "Create Products", path: "/dashboard/admin/create-products" },
    { name: "My Products", path: "/dashboard/admin/products" },
    { name: "Orders", path: "/dashboard/admin/orders" },
    { name: "Category", path: "/dashboard/admin/category" },
    { name: "Users", path: "/dashboard/admin/users" },
  ];

  return (
    <div className="menu p-2  bg-neutral-800 md:w-[20vw] flex flex-col items-center h-auto">
      <h1 className="text-2xl my-5 ">Admin Dashboard</h1>

      <div className="menuitems w-full h-[30vh] text-center flex flex-col">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setActiveItem(item.name)}
            className={`flex justify-center items-center h-full border-neutral-600 border  hover:cursor-pointer 
              ${activeItem === item.name ? "bg-pink-500 text-white" : ""}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
