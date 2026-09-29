import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle product sizes
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  // Submit product
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error("Please upload at least one product image.");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one product size.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubcategory("Topwear");
        setSizes([]);
        setBestseller(false);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  // Image upload component
  const ImageUpload = ({ id, image, setImage }) => {
    return (
      <label
        htmlFor={id}
        className="
          relative
          w-24 h-28
          sm:w-28 sm:h-32
          border-2 border-dashed border-gray-300
          rounded-xl
          overflow-hidden
          cursor-pointer
          bg-gray-50
          hover:border-green-400
          hover:bg-green-50
          transition-all duration-200
          flex items-center justify-center
        "
      >
        <img
          className="w-full h-full object-cover"
          src={
            !image
              ? assets.upload_area
              : URL.createObjectURL(image)
          }
          alt="Upload product"
        />

        {image && (
          <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[10px] text-center py-1">
            Change
          </span>
        )}

        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id={id}
          accept="image/*"
          hidden
        />
      </label>
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-5xl"
    >
      {/* Page Header */}
      <div className="mb-7">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Add Product
        </h2>

        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Add a new product to your Ramitra store
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">

        {/* Product Images */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800">
              Product Images
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Upload up to 4 product images. First image will be the
              primary product image.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ImageUpload
              id="image1"
              image={image1}
              setImage={setImage1}
            />

            <ImageUpload
              id="image2"
              image={image2}
              setImage={setImage2}
            />

            <ImageUpload
              id="image3"
              image={image3}
              setImage={setImage3}
            />

            <ImageUpload
              id="image4"
              image={image4}
              setImage={setImage4}
            />
          </div>
        </section>

        <div className="border-t border-gray-100 my-7" />

        {/* Product Name */}
        <section className="mb-6">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>

          <input
            id="productName"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="
              w-full
              max-w-2xl
              px-3 py-2.5
              border border-gray-300
              rounded-lg
              text-sm
              text-gray-800
              outline-none
              focus:border-green-400
              focus:ring-2
              focus:ring-green-100
              transition-all duration-200
            "
            type="text"
            required
            placeholder="Enter product name"
          />
        </section>

        {/* Description */}
        <section className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>

          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="
              w-full
              max-w-2xl
              min-h-[120px]
              px-3 py-2.5
              border border-gray-300
              rounded-lg
              text-sm
              text-gray-800
              outline-none
              resize-y
              focus:border-green-400
              focus:ring-2
              focus:ring-green-100
              transition-all duration-200
            "
            placeholder="Write product description..."
          />
        </section>

        {/* Category / Subcategory / Price */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-7">

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full
                px-3 py-2.5
                border border-gray-300
                rounded-lg
                text-sm
                bg-white
                outline-none
                cursor-pointer
                focus:border-green-400
                focus:ring-2
                focus:ring-green-100
              "
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sub-category
            </label>

            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="
                w-full
                px-3 py-2.5
                border border-gray-300
                rounded-lg
                text-sm
                bg-white
                outline-none
                cursor-pointer
                focus:border-green-400
                focus:ring-2
                focus:ring-green-100
              "
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Price
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                {currency}
              </span>

              <input
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="
                  w-full
                  px-3 pl-8 py-2.5
                  border border-gray-300
                  rounded-lg
                  text-sm
                  outline-none
                  focus:border-green-400
                  focus:ring-2
                  focus:ring-green-100
                "
                type="number"
                min="0"
                required
                placeholder="5000"
              />
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-7">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Product Sizes
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Select all available sizes
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`
                  min-w-[52px]
                  px-4 py-2
                  rounded-lg
                  border
                  text-sm
                  font-medium
                  transition-all duration-200
                  ${
                    sizes.includes(size)
                      ? "bg-green-400 text-white border-green-400 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-600"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Bestseller */}
        <section className="mb-7">
          <label
            htmlFor="bestseller"
            className="
              inline-flex
              items-center
              gap-3
              cursor-pointer
              select-none
            "
          >
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
              className="
                w-4 h-4
                accent-green-500
                cursor-pointer
              "
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Add to Bestseller
              </p>

              <p className="text-xs text-gray-400">
                Feature this product in the bestseller section
              </p>
            </div>
          </label>
        </section>

        {/* Submit */}
        <div className="border-t border-gray-100 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              sm:w-auto
              min-w-[150px]
              px-6 py-3
              bg-green-400
              hover:bg-green-500
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              text-white
              rounded-lg
              text-sm
              font-semibold
              transition-all duration-200
              active:scale-[0.98]
              shadow-sm
            "
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Add;