import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="group relative w-full min-w-0">

      {/* ================= PRODUCT CARD ================= */}
      <div
        className="
          w-full
          overflow-hidden
          rounded-xl
          sm:rounded-2xl
          bg-white
          border border-gray-100
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
          hover:-translate-y-1
        "
      >

        {/* ================= PRODUCT IMAGE ================= */}
        <Link
          to={`/product/${id}`}
          className="block"
        >
          <div
            className="
              relative
              w-full
              aspect-[4/5]
              overflow-hidden
              bg-gray-100
            "
          >

            <img
              src={image?.[0]}
              alt={name}
              loading="lazy"
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                ease-out
                group-hover:scale-105
              "
            />

            {/* Wishlist Button */}
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="
                absolute
                top-2
                right-2
                sm:top-3
                sm:right-3
                w-8
                h-8
                sm:w-9
                sm:h-9
                rounded-full
                bg-white/90
                backdrop-blur-sm
                flex
                items-center
                justify-center
                text-gray-700
                shadow-md
                hover:bg-green-400
                hover:text-white
                active:scale-90
                transition-all
                duration-300
                z-10
              "
            >
              <FiHeart className="text-sm sm:text-base" />
            </button>

            {/* Desktop View Product Overlay */}
            <div
              className="
                hidden
                sm:block
                absolute
                bottom-0
                left-0
                right-0
                translate-y-full
                group-hover:translate-y-0
                transition-transform
                duration-300
                bg-black/65
                backdrop-blur-sm
                text-white
                text-center
                py-2.5
                text-sm
                font-medium
              "
            >
              View Product
            </div>

          </div>
        </Link>

        {/* ================= PRODUCT DETAILS ================= */}
        <div className="p-2.5 sm:p-3 md:p-4">

          {/* Product Name */}
          <Link to={`/product/${id}`}>
            <h3
              className="
                text-xs
                sm:text-sm
                md:text-base
                font-medium
                text-gray-800
                line-clamp-2
                min-h-[32px]
                sm:min-h-[40px]
                leading-5
                group-hover:text-green-600
                transition-colors
                duration-200
              "
            >
              {name}
            </h3>
          </Link>

          {/* ================= PRICE ================= */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-2
              mt-2
            "
          >
            <p
              className="
                text-sm
                sm:text-base
                md:text-lg
                font-bold
                text-gray-900
              "
            >
              {currency}
              {price}
            </p>

            <span
              className="
                hidden
                md:block
                text-[10px]
                lg:text-xs
                text-gray-400
              "
            >
              Inclusive of all taxes
            </span>
          </div>

          {/* ================= BUY NOW ================= */}
          <Link
            to={`/product/${id}`}
            className="
              w-full
              mt-3
              sm:mt-4
              flex
              items-center
              justify-center
              gap-1.5
              sm:gap-2
              rounded-lg
              sm:rounded-xl
              bg-green-400
              hover:bg-green-500
              active:scale-[0.97]
              text-white
              font-semibold
              text-xs
              sm:text-sm
              py-2
              sm:py-2.5
              transition-all
              duration-300
              shadow-sm
              hover:shadow-md
            "
          >
            <FiShoppingBag className="text-sm sm:text-base" />

            <span>
              Buy Now
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProductItem;