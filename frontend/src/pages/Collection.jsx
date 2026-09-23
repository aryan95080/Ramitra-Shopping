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

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  {
    /*
    useEffect(()=>{
    setFilterProducts(products)
  },[])
   */
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  {
    /*useEffect(()=>{
    console.log(category);
  },[category])
  
  useEffect(()=>{
    console.log(subCategory);
  },[subCategory]) */
  }

  return (
    <div className="w-[95%] mx-auto flex flex-col sm:flex-row  sm:gap-10 pt-5 ">
      {/*Filter Option  */}
      <div className="min-w-50 bg-transparent shadow-lg shadow-gray-400 backdrop-blur-lg rounded px-2 max-h-screen sticky top-15 z-1 ">
        <div onClick={() => setShowFilter(!showFilter)} className=" flex items-center bg-transparent-400 rounded shadow-lg backdrop-blur-lg px-2 py-1 my-3">
        <p
          className="text-xl inline items-center cursor-pointer "
        >
          Filters
        </p>
          <RiArrowDropDownLine className={`inline text-6xl absolute right-0  transform transition-transform duration-300 ${
              showFilter ? "rotate-0" : "rotate-[-90deg]"
            }`}/>
        </div>

        {/*Category filter  */}
        <div
          className={`rounded bg-transparent items-center shadow-gray-400 shadow-lg px-5 py- mt-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="text-sm font-medium bg-green-400  px-5 py-1 my-2 rounded-t">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-800">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 checked:bg-green-400"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/*Sub-filter */}
        <div
          className={`rounded bg-transparent shadow-gray-400 shadow-lg px-5 py-1 my-4 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="text-sm font-medium bg-green-400  px-5 py-1 my-2 rounded-t ">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-800">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
          </div>
        </div>

      </div>

      {/* Side Bar*/}

      <div className="flex-1">
        <div className={`flex items-center justify-between text-sm sm:text lg:text-2xl sticky ${showFilter ? 'top-100' : 'top-28'} sm:top-15 md:top-15 z-1 bg-gray-100 shadow-lg shadow-gray-400 backdrop-blur-lg rounded px-2 py-1 mb-5`}>
          <Title text1={"ALL"} text2={" COLLECTIONS"} />
          {/*Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="bg-green-400 shadow-lg text-white shadow-gray-400  rounded px-2 py-2  font-bold outline-none text-sm "
          >
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/*Map products */}

        <div className="bg-transparent shadow-gray-400 shadow-lg rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2">
          {filterProducts.map((item, indext) => (
            <ProductItem
              key={indext}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
