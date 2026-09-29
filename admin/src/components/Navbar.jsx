import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg ">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Logo */}
        <img
          className="w-[max(2%,50px)] h-auto object-contain"
          src={assets.logo}
          alt="Ramitra"
        />

        <p className="text-lg font-bold text-gray-800">Admin Panel</p>

        {/* Logout */}
        <button
          onClick={() => setToken("")}
          className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;