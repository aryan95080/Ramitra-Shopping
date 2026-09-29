import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FiLock, FiMail } from "react-icons/fi";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSumbitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/user/admin",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">

      {/* ================= LOGIN CARD ================= */}
      <div
        className="
          w-full
          max-w-md
          bg-white
          border
          border-gray-200
          shadow-sm
          rounded-2xl
          px-6
          sm:px-8
          py-8
          sm:py-10
        "
      >

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div
              className="
                w-14
                h-14
                rounded-full
                bg-green-400
                flex
                items-center
                justify-center
                text-white
                text-xl
                font-bold
              "
            >
              R
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Ramitra
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Admin Panel
          </p>

        </div>


        {/* ================= FORM ================= */}
        <form onSubmit={onSumbitHandler}>

          {/* Email */}
          <div className="mb-5">

            <label
              htmlFor="email"
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              Email Address
            </label>

            <div className="relative">

              <FiMail
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
                size={17}
              />

              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  pl-10
                  pr-3
                  py-3
                  text-sm
                  text-gray-800
                  outline-none
                  transition-all
                  duration-200
                  focus:border-green-400
                  focus:ring-2
                  focus:ring-green-100
                "
                type="email"
                placeholder="example@gmail.com"
                required
              />

            </div>

          </div>


          {/* Password */}
          <div className="mb-6">

            <label
              htmlFor="password"
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              Password
            </label>

            <div className="relative">

              <FiLock
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
                size={17}
              />

              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  pl-10
                  pr-3
                  py-3
                  text-sm
                  text-gray-800
                  outline-none
                  transition-all
                  duration-200
                  focus:border-green-400
                  focus:ring-2
                  focus:ring-green-100
                "
                type="password"
                placeholder="Enter your password"
                required
              />

            </div>

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-lg
              bg-green-400
              hover:bg-green-500
              text-white
              text-sm
              font-semibold
              tracking-wide
              transition-all
              duration-300
              active:scale-[0.98]
            "
          >
            Login
          </button>

        </form>


        {/* ================= FOOTER ================= */}
        <div className="text-center mt-7">

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Ramitra. Admin Panel
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;