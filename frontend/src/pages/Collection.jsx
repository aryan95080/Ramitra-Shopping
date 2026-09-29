import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState("relavent");

  // Category filter
  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Sub-category filter
  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // Filter + Search + Sort
  useEffect(() => {
    let productsCopy = [...products];

    // Search
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Sub Category
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sorting
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilterProducts(productsCopy);
  }, [products, search, showSearch, category, subCategory, sortType]);

  return (
    <div className="w-[95%] max-w-7xl mx-auto py-5">

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="w-full lg:w-60 lg:flex-shrink-0">

          <div className="lg:sticky lg:top-24">

            {/* Filter Header */}
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-between
              bg-white/80 backdrop-blur-md
              border border-gray-200
              rounded-xl
              px-4 py-3
              shadow-sm
              cursor-pointer
              lg:cursor-default"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Filters
                </p>

                <p className="text-xs text-gray-500">
                  Refine your collection
                </p>
              </div>

              <RiArrowDropDownLine
                className={`
                  text-4xl text-gray-700
                  transition-transform duration-300
                  lg:hidden
                  ${showFilter ? "rotate-0" : "-rotate-90"}
                `}
              />
            </div>

            {/* Filter Content */}
            <div
              className={`
                mt-4 space-y-4
                ${showFilter ? "block" : "hidden"}
                lg:block
              `}
            >

              {/* ================= CATEGORY ================= */}
              <div
                className="
                bg-white/80 backdrop-blur-md
                border border-gray-200
                rounded-xl
                p-4
                shadow-sm
                "
              >
                <p className="text-xs font-bold tracking-wider text-gray-500 mb-4">
                  CATEGORIES
                </p>

                <div className="space-y-3">

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value="Men"
                      onChange={toggleCategory}
                      className="w-4 h-4 accent-green-400 cursor-pointer"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      Men
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value="Women"
                      onChange={toggleCategory}
                      className="w-4 h-4 accent-green-400 cursor-pointer"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      Women
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value="Kids"
                      onChange={toggleCategory}
                      className="w-4 h-4 accent-green-400 cursor-pointer"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      Kids
                    </span>
                  </label>

                </div>
              </div>

              {/* ================= TYPE ================= */}
              <div
                className="
                bg-white/80 backdrop-blur-md
                border border-gray-200
                rounded-xl
                p-4
                shadow-sm
                "
              >
                <p className="text-xs font-bold tracking-wider text-gray-500 mb-4">
                  TYPES
                </p>

                <div className="space-y-3">

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value="Topwear"
                      onChange={toggleSubCategory}
                      className="w-4 h-4 accent-green-400 cursor-pointer"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      Topwear
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value="Winterwear"
                      onChange={toggleSubCategory}
                      className="w-4 h-4 accent-green-400 cursor-pointer"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      Winterwear
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value="Bottomwear"
                      onChange={toggleSubCategory}
                      className="w-4 h-4 accent-green-400 cursor-pointer"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      Bottomwear
                    </span>
                  </label>

                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* ================= PRODUCTS SECTION ================= */}
        <main className="flex-1 min-w-0">

          {/* ================= TOP TOOLBAR ================= */}
<div
  className="
    flex
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between
    gap-4
    bg-white 
    border-b
    border-gray-200
    px-1
    py-4
    mb-7
    lg:sticky
    lg:top-24
    z-10
  "
>

  {/* ================= TITLE ================= */}
  <div>
    <Title
      text1="ALL"
      text2=" COLLECTIONS"
    />

    <p className="text-xs text-gray-400 mt-1">
      Explore our latest fashion collection
    </p>
  </div>


  {/* ================= SORT ================= */}
  <div className="flex items-center gap-3">

    <span className="text-xs sm:text-sm text-gray-500">
      Sort by
    </span>

    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
      className="
        appearance-none
        bg-green-500
        text-white
        font-medium
        text-xs
        sm:text-sm
        border
        border-gray-300
        rounded-lg
        px-4
        py-2.5
        pr-8
        outline-none
        cursor-pointer
        hover:border-gray-900
        focus:border-green-400
        transition-all
        duration-200
      "
    >

      <option value="relavent" className="bg-white text-green-500">
        Relevant
      </option>

      <option value="low-high" className="bg-white text-green-500 ">
        Price: Low to High
      </option>
                
      <option value="high-low" className="bg-white text-green-500">
        Price: High to Low
      </option>

    </select>
    

  </div>

</div>

          {/* ================= PRODUCT COUNT ================= */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filterProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* ================= PRODUCT GRID ================= */}
          {filterProducts.length > 0 ? (

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                xl:grid-cols-4
                gap-x-4
                gap-y-8
              "
            >
              {filterProducts.map((item, index) => (
                <ProductItem
                  key={item._id || index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>

          ) : (

            /* ================= EMPTY STATE ================= */
            <div
              className="
              flex flex-col
              items-center
              justify-center
              min-h-60
              border border-dashed
              border-gray-300
              rounded-xl
              text-center
              "
            >
              <p className="text-lg font-semibold text-gray-700">
                No products found
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Try changing your filters or search.
              </p>
            </div>

          )}

        </main>
      </div>
    </div>
  );
};

export default Collection;