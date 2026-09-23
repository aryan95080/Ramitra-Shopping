import React, { useContext,useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const LetestCollection=()=>{
  const {products}=useContext(ShopContext);
  const [latestProduct,setLatestProduct]=useState([]);
  useEffect(()=>{
    setLatestProduct(products.slice(0,12));
  },[products]);
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl m-5'>
        <Title text1={'LATEST '} text2={' COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Discover the Latest Collection at Ramitra Shopping, where style meets innovation! Our curated selection brings you the hottest trends, exclusive pieces, and timeless classics, all designed to elevate your wardrobe and lifestyle. From fashion-forward apparel to must-have accessories and home decor, our latest collection offers something for every taste and occasion.</p>
      </div>
      {/*Rendering products */}
      <div className='w-[95%] mx-auto shadow-lg bg-gray-100 shadow-gray-400 backdrop-blur-3xl p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-col-4 gap-y-3 gap-x-1 rounded-md'>
        {
          latestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LetestCollection;