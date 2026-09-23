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
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 w-[95%] mx-auto'>
      {/* ---------------product data  ---------------*/}
      <div className='flex gap-6 sm:gap-12 flex-col sm:flex-row'>
        {/*---------------product image--------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-start sm:justify-normal gap-2 sm:gap-0 sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 ${item === image ? 'border-green-400' : 'border-transparent'}`}
                  alt={`${productData.name} view ${index + 1}`}
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto rounded' alt={productData.name} />
          </div>
        </div>

        {/*---------------product details--------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-xl sm:text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <IoStar style={{ color: 'orange', stroke: 'black', strokeWidth: '20px' }} />
            <IoStar style={{ color: 'orange', stroke: 'black', strokeWidth: '20px' }} />
            <IoStar style={{ color: 'orange', stroke: 'black', strokeWidth: '20px' }} />
            <IoStar style={{ color: 'orange', stroke: 'black', strokeWidth: '20px' }} />
            <IoStar style={{ color: 'white', stroke: 'black', strokeWidth: '20px' }} />
            <p className='pl-2'>(200)</p>
          </div>
          <p className='mt-5 text-2xl sm:text-3xl font-medium flex items-center'>
            <FaRupeeSign style={{ fontSize: '22px' }} />
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5 text-sm sm:text-base'>{productData.description}</p>

          <div className='flex flex-col gap-4 sm:gap-8 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => { setSize(item); setSizeError(false); }}
                    className={`bg-amber-400 rounded px-3 py-2 text-center border-2 ${item === size ? 'border-orange-600' : 'border-transparent'}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
            {sizeError && (
              <p className='text-red-500 text-sm'>Please select a size before adding to cart.</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className='bg-green-400 text-white rounded px-8 py-3 text-sm active:bg-black w-full sm:w-auto'
          >
            Add Cart
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-400 mt-5 flex flex-col gap-1'>
            <p>100% Original products.</p>
            <p>Cash on delivery available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* -------------Description & Review Section-------------*/}
      <div className='mt-20'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('description')}
            className={`border px-3 sm:px-5 py-3 text-xs sm:text-sm ${activeTab === 'description' ? 'font-bold bg-gray-50' : 'text-gray-500'}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`border px-3 sm:px-5 py-3 text-xs sm:text-sm ${activeTab === 'reviews' ? 'font-bold bg-gray-50' : 'text-gray-500'}`}
          >
            Reviews (575)
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className='flex flex-col gap-4 border p-4 sm:p-6 text-sm text-gray-400'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi magni adipisci repudiandae vel! Cum, a molestias. Perspiciatis molestiae tenetur, magni, distinctio quia laudantium qui facere cum minima sapiente doloribus suscipit debitis sed aspernatur nulla hic. Esse vel dolorum aperiam nam facilis iste, assumenda repellat sapiente rerum facere eligendi hic omnis?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque inventore culpa ab iste beatae officiis assumenda, officia vero fugit nemo!</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4 border p-4 sm:p-6 text-sm text-gray-400'>
            <p>Reviews coming soon.</p>
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