import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch products
  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list"
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove product"
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Products
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage all products in your store
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
          <p className="text-xs text-gray-400">
            Total Products
          </p>

          <p className="text-lg font-semibold text-green-600">
            {list.length}
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        {/* Table Header */}
        <div className="grid grid-cols-[80px_2.5fr_1fr_1fr_100px] items-center gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
          <p>Image</p>
          <p>Product</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* Products */}
        {list.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            No products found.
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={item._id || index}
              className="
                grid
                grid-cols-[80px_2.5fr_1fr_1fr_100px]
                items-center
                gap-4
                px-5
                py-4
                border-b border-gray-100
                last:border-b-0
                hover:bg-gray-50
                transition-colors duration-200
              "
            >
              {/* Image */}
              <div className="w-14 h-16 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.image?.[0]}
                  alt={item.name}
                />
              </div>

              {/* Name */}
              <div>
                <p className="font-medium text-gray-800 line-clamp-2">
                  {item.name}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Product #{index + 1}
                </p>
              </div>

              {/* Category */}
              <div>
                <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-xs font-medium text-green-700">
                  {item.category}
                </span>
              </div>

              {/* Price */}
              <p className="font-semibold text-gray-800">
                {currency}
                {item.price}.00
              </p>

              {/* Delete */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => removeProduct(item._id)}
                  className="
                    w-9 h-9
                    flex items-center justify-center
                    rounded-lg
                    border border-red-200
                    bg-red-50
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                    transition-all duration-200
                    active:scale-95
                  "
                  title="Delete product"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mobile Product Cards */}
      <div className="md:hidden flex flex-col gap-3">

        {list.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl py-12 text-center text-sm text-gray-400">
            No products found.
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={item._id || index}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-3
                shadow-sm
                flex gap-3
              "
            >
              {/* Product Image */}
              <div className="w-20 h-24 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.image?.[0]}
                  alt={item.name}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.name}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeProduct(item._id)}
                    className="
                      flex-shrink-0
                      w-8 h-8
                      rounded-lg
                      border border-red-200
                      bg-red-50
                      text-red-500
                      hover:bg-red-500
                      hover:text-white
                      text-lg
                      transition-all duration-200
                    "
                  >
                    ×
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="px-2 py-1 rounded-full bg-green-50 border border-green-100 text-[10px] font-medium text-green-700">
                    {item.category}
                  </span>

                  <p className="text-sm font-semibold text-gray-900">
                    {currency}
                    {item.price}.00
                  </p>
                </div>

                <p className="text-[10px] text-gray-400 mt-2">
                  Product #{index + 1}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;