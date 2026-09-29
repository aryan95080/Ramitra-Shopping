import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch orders"
      );
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update order status"
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="w-full">

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Orders
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Manage and track customer orders
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
            <p className="text-xs text-gray-400">Total Orders</p>
            <p className="text-lg font-semibold text-green-600">
              {orders.length}
            </p>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-4">

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="text-gray-500 text-sm">
              No orders found.
            </p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id || index}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-4 sm:p-5 lg:p-6
                shadow-sm
                hover:shadow-md
                transition-shadow duration-200
              "
            >

              {/* Top section */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <img
                      className="w-6 h-6"
                      src={assets.parcel_icon}
                      alt="Order"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Order #{index + 1}
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {order._id}
                    </p>
                  </div>
                </div>

                <p className="hidden sm:block text-xs text-gray-400">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Main order information */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_0.7fr_0.8fr] gap-6">

                {/* Customer + Products */}
                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                    Products
                  </p>

                  <div className="space-y-1">
                    {order.items.map((item, itemIndex) => (
                      <p
                        key={itemIndex}
                        className="text-sm text-gray-700"
                      >
                        <span className="font-medium">
                          {item.name}
                        </span>

                        {" × "}

                        {/* Change to item.quantity if your backend uses quantity */}
                        {item.quntity}

                        {item.size && (
                          <span className="ml-2 text-xs text-gray-400">
                            Size: {item.size}
                          </span>
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Customer */}
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                      Customer
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {order.address.firstName}{" "}
                      {order.address.lastName}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {order.address.street}
                    </p>

                    <p className="text-xs text-gray-500">
                      {order.address.city},{" "}
                      {order.address.state},{" "}
                      {order.address.country},{" "}
                      {order.address.zipcode}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {order.address.phone}
                    </p>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                    Payment
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-400">
                        Method:
                      </span>{" "}
                      <span className="font-medium text-gray-700">
                        {order.paymentMethod}
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-400">
                        Status:
                      </span>{" "}
                      <span
                        className={`font-medium ${
                          order.payment
                            ? "text-green-600"
                            : "text-orange-500"
                        }`}
                      >
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-400">
                        Items:
                      </span>{" "}
                      <span className="font-medium text-gray-700">
                        {order.items.length}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                    Amount
                  </p>

                  <p className="text-lg font-semibold text-gray-900">
                    {currency}
                    {order.amount}.00
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Order Total
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                    Status
                  </p>

                  <select
                    onChange={(event) =>
                      statusHandler(event, order._id)
                    }
                    value={order.status}
                    className="
                      w-full
                      bg-white
                      border border-gray-300
                      rounded-lg
                      px-3 py-2.5
                      text-xs sm:text-sm
                      font-medium
                      text-gray-700
                      outline-none
                      cursor-pointer
                      hover:border-gray-500
                      focus:border-green-400
                      focus:ring-2
                      focus:ring-green-100
                      transition-all duration-200
                    "
                  >
                    <option value="Order Placed">
                      Order Placed
                    </option>

                    <option value="Packing">
                      Packing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Out for delivery">
                      Out for delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>

                  {/* Mobile date */}
                  <p className="sm:hidden text-xs text-gray-400 mt-3">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;