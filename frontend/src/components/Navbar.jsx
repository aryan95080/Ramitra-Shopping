import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "./SearchBar";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const {
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-5 md:px-10 py-2">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-1">
            <img
            className="w-12 md:h-12 cursor-pointer hover:scale-105 transition rounded-full"
            src={assets.logo}
            alt="logo"
          />
          <p className="hidden sm:block text-2xl font-bold text-green-500">Ramitra</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-8 text-sm md:text-base font-semibold">
          {[
            { path: "/", name: "HOME" },
            { path: "/collection", name: "COLLECTION" },
            { path: "/about", name: "ABOUT" },
            { path: "/contact", name: "CONTACT" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-green-500" : "text-gray-700"
                }`
              }
            >
              <p className="hover:text-green-500 transition">
                {item.name}
              </p>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all group-hover:w-full"></span>
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5 md:gap-6">

          {/* Profile Dropdown */}
          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-6 cursor-pointer rounded-full"
              src={assets.profile_icon}
              alt="profile"
            />

            {/* FIXED DROPDOWN */}
            {token && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg rounded-lg border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/profile")}>
                  My Profile
                </p>

                <p
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Orders
                </p>

                <p
                  onClick={logout}
                  className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                >
                  Logout
                </p>

              </div>
            )}
          </div>



          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              className="w-6 cursor-pointer"
              src={assets.cart_icon}
              alt="cart"
            />
            <span className="absolute -right-2 -bottom-2 bg-green-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {getCartCount() > 99 ? "99+" : getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 sm:hidden cursor-pointer"
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        } w-3/4 sm:hidden`}
      >
        <div className="flex flex-col p-5 gap-5 text-lg font-medium">

          {/* Close */}
          <div
            onClick={() => setVisible(false)}
            className="cursor-pointer text-green-500 font-semibold"
          >
            ← Back
          </div>

          <NavLink onClick={() => setVisible(false)} to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;