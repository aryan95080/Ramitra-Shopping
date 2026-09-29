import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/add",
      label: "Add Product",
      icon: assets.add_icon,
    },
    {
      path: "/list",
      label: "List Items",
      icon: assets.order_icon,
    },
    {
      path: "/orders",
      label: "Orders",
      icon: assets.order_icon,
    },
  ];

  return (
    <aside className="sticky top-[65px] z-40 w-[18%] h-[calc(100vh-65px)] bg-white border-r border-gray-200 overflow-y-auto">
      <div className="px-3 sm:px-4 pt-6">

        {/* Heading */}
        <div className="px-3 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? "bg-green-50 text-green-700 border-green-200 shadow-sm"
                    : "bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-gray-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-1 h-6 rounded-full ${
                      isActive ? "bg-green-400" : "bg-transparent"
                    }`}
                  />

                  <img
                    src={item.icon}
                    alt=""
                    className={`w-5 h-5 object-contain ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}
                  />

                  <p className="hidden md:block whitespace-nowrap">
                    {item.label}
                  </p>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;