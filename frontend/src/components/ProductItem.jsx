import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="block bg-white shadow-md shadow-gray-300 hover:shadow-lg text-black cursor-pointer rounded-lg overflow-hidden mx-1.5 sm:mx-3 my-1 hover:scale-[1.03] transition-all duration-300 ease-in-out"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden h-36 sm:h-45 md:h-52 bg-gray-50">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-linear"
        />
      </div>
      <p className="pt-2 sm:pt-3 px-2 text-xs sm:text-sm font-medium truncate">{name}</p>
      <p className="text-xs sm:text-sm px-2 pb-2 sm:pb-3 font-semibold text-gray-700">
        {currency} {price}.00 /-
      </p>
    </Link>
  );
};

export default ProductItem;