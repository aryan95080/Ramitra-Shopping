import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      setIsLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-12 sm:pt-16 w-[95%] mx-auto">
      <div className="text-xl sm:text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-400 py-16">
          {isLoading ? "Loading your orders..." : "You haven't placed any orders yet."}
        </p>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-3 sm:gap-6 text-sm">
                <img
                  className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-medium truncate">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-base text-gray-700">
                    <p>{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm">
                    Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-1 text-xs sm:text-sm">
                    Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="min-w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  disabled={isLoading}
                  className="border px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? "Refreshing..." : "Track order"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;