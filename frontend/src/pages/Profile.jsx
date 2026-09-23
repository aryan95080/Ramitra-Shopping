import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { token, setToken, setCartItems, user } = useContext(ShopContext);
  const navigate = useNavigate();

  // 🔐 Protect route (login required)
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // 👇 Get first letter for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          My Profile
        </h2>

        {/* Profile Info */}
        <div className="flex flex-col items-center gap-4">

          {/* Avatar */}
          <div className="w-20 h-20 bg-green-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
            {getInitial(user?.name)}
          </div>

          <p className="text-lg font-medium text-gray-700">
            {user?.name || "User Name"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.email || "user@email.com"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            My Orders
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;