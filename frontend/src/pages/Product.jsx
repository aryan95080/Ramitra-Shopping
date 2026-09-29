import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { IoStar } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const fetchProductData = () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const handleAddToCart = () => {
    if (productData.sizes && productData.sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(productData._id, size);
  }

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 w-[95%] mx-auto'>
      {/* ---------------product data  ---------------*/}
      <div className='flex gap-8 lg:gap-14 flex-col sm:flex-row'>

  {/*--------------- PRODUCT IMAGE ---------------*/}
  <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

    {/* Product Thumbnails */}
    <div className='
      flex
      sm:flex-col
      overflow-x-auto
      sm:overflow-y-auto
      justify-start
      gap-2
      sm:gap-3
      sm:w-[18%]
      w-full
      scrollbar-hide
    '>
      {productData.image.map((item, index) => (
        <button
          type='button'
          onClick={() => setImage(item)}
          key={index}
          className={`
            w-[23%]
            sm:w-full
            aspect-[4/5]
            flex-shrink-0
            overflow-hidden
            border
            bg-gray-50
            transition-all
            duration-200
            ${
              item === image
                ? 'border-green-400'
                : 'border-gray-200 hover:border-gray-400'
            }
          `}
        >
          <img
            src={item}
            alt={`${productData.name} view ${index + 1}`}
            className='
              w-full
              h-full
              object-cover
              transition-transform
              duration-300
              hover:scale-105
            '
          />
        </button>
      ))}
    </div>

    {/* Main Product Image */}
    <div className='
      w-full
      sm:w-[80%]
      bg-gray-50
      overflow-hidden
      relative
    '>
      <img
        src={image}
        className='
          w-full
          aspect-[4/5]
          object-cover
          transition-transform
          duration-500
          hover:scale-[1.02]
        '
        alt={productData.name}
      />
    </div>

  </div>


  {/*--------------- PRODUCT DETAILS ---------------*/}
  <div className='flex-1'>

    {/* Product Name */}
    <h1 className='
      font-medium
      text-xl
      sm:text-2xl
      lg:text-3xl
      text-gray-900
      mt-1
      leading-tight
    '>
      {productData.name}
    </h1>


    {/* Rating */}
    <div className='flex items-center gap-1 mt-4'>

      <div className='flex items-center gap-0.5'>
        <IoStar className='text-yellow-500' />
        <IoStar className='text-yellow-500' />
        <IoStar className='text-yellow-500' />
        <IoStar className='text-yellow-500' />
        <IoStar className='text-gray-200' />
      </div>

      <p className='text-sm text-gray-500 ml-2'>
        (200 Reviews)
      </p>

    </div>


    {/* Price */}
    <div className='mt-5 flex items-center'>

      <FaRupeeSign
        className='text-gray-900'
        size={18}
      />

      <p className='text-2xl sm:text-3xl font-semibold text-gray-900'>
        {productData.price}
      </p>

    </div>

    <p className='text-xs text-gray-400 mt-1'>
      Inclusive of all taxes
    </p>


    {/* Description */}
    <p className='
      mt-6
      text-gray-600
      md:w-4/5
      text-sm
      sm:text-base
      leading-6
    '>
      {productData.description}
    </p>


    {/* Divider */}
    <hr className='mt-7 border-gray-200 md:w-4/5' />


    {/* Size Selection */}
    <div className='flex flex-col gap-4 my-7'>

      <div className='flex items-center justify-between md:w-4/5'>
        <p className='text-sm font-semibold text-gray-900'>
          Select Size
        </p>

        <span className='text-xs text-gray-400'>
          Choose your size
        </span>
      </div>


      <div className='flex gap-2 flex-wrap'>

        {productData.sizes.map((item, index) => (
          <button
            type='button'
            onClick={() => {
              setSize(item);
              setSizeError(false);
            }}
            className={`
              min-w-[55px]
              px-4
              py-2.5
              text-sm
              border
              transition-all
              duration-200
              ${
                item === size
                  ? 'bg-green-400 text-white border-green-400'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }
            `}
            key={index}
          >
            {item}
          </button>
        ))}

      </div>


      {sizeError && (
        <p className='text-red-500 text-xs'>
          Please select a size before adding to cart.
        </p>
      )}

    </div>


    {/* Add To Cart */}
    <button
      onClick={handleAddToCart}
      className='
        bg-green-400
        hover:bg-green-500
        text-white
        px-8
        py-3.5
        text-sm
        font-semibold
        uppercase
        tracking-wide
        transition-all
        duration-300
        active:scale-[0.98]
        w-full
        sm:w-auto
        md:min-w-[220px]
      '
    >
      Add to Cart
    </button>


    {/* Product Policies */}
    <hr className='mt-8 md:w-4/5 border-gray-200' />

    <div className='
      text-xs
      sm:text-sm
      text-gray-500
      mt-5
      flex
      flex-col
      gap-2
    '>

      <p>
        <span className='text-gray-800 font-medium'>
          ✓
        </span>{" "}
        100% Original products.
      </p>

      <p>
        <span className='text-gray-800 font-medium'>
          ✓
        </span>{" "}
        Cash on delivery available on this product.
      </p>

      <p>
        <span className='text-gray-800 font-medium'>
          ✓
        </span>{" "}
        Easy return and exchange policy within 7 days.
      </p>

    </div>

  </div>
</div>


{/* =====================================================
    DESCRIPTION & REVIEW SECTION
===================================================== */}

<div className='mt-16 sm:mt-20'>

  {/* Tabs */}
  <div className='flex border-b border-gray-200'>

    <button
      onClick={() => setActiveTab('description')}
      className={`
        px-4
        sm:px-6
        py-3
        text-xs
        sm:text-sm
        font-medium
        border-b-2
        transition-all
        duration-200
        ${
          activeTab === 'description'
            ? 'border-green-400 text-gray-900'
            : 'border-transparent text-gray-500 hover:text-gray-900'
        }
      `}
    >
      Description
    </button>

    <button
      onClick={() => setActiveTab('reviews')}
      className={`
        px-4
        sm:px-6
        py-3
        text-xs
        sm:text-sm
        font-medium
        border-b-2
        transition-all
        duration-200
        ${
          activeTab === 'reviews'
            ? 'border-green-400 text-gray-900'
            : 'border-transparent text-gray-500 hover:text-gray-900'
        }
      `}
    >
      Reviews (575)
    </button>

  </div>


  {/* Tab Content */}
  {activeTab === 'description' ? (

    <div className='
      border
      border-t-0
      border-gray-200
      p-5
      sm:p-7
      text-sm
      text-gray-600
      leading-7
    '>

      <p>
        Ramitra is a modern fashion destination created for those
        who believe that style is more than what you wear—it’s how
        you express yourself. We bring together contemporary
        fashion, timeless designs, and everyday comfort to create
        clothing that fits effortlessly into every lifestyle.
        From men’s and women’s fashion to kidswear, Ramitra offers
        thoughtfully selected styles ranging from casual essentials
        and trendy tops to seasonal outerwear and everyday wardrobe
        staples. Our goal is simple: quality styles, effortless
        comfort, and fashion that feels uniquely yours.
      </p>

    </div>

  ) : (

    <div className='
      border
      border-t-0
      border-gray-200
      p-5
      sm:p-7
      text-sm
      text-gray-400
    '>

      <p>
        Reviews coming soon.
      </p>

    </div>

  )}

</div>

      {/* -------------Related Products Section-------------*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='pt-20 text-center text-gray-400'>Loading product...</div>
  )
}

export default Product