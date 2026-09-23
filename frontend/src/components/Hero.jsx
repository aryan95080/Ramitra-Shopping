import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row w-[95%] max-w-screen-xl m-auto mt-5 shadow-md drop-shadow-xl shadow-gray-400 rounded overflow-hidden hover:scale-[1.01] transition ease-in-out duration-200 '>
      
      {/* Hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center bg-green-400 text-white px-6 py-10 sm:py-16 md:py-20'>
        <div className='text-center'>
          <div className='flex items-center justify-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-xs sm:text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-3 leading-tight'>
            Discover our bestsellers
          </h1>
          <div className='flex items-center justify-center gap-2'>
            <p className='font-semibold text-xs sm:text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <img
        className='w-full sm:w-1/2 h-64 sm:h-auto object-cover'
        src={assets.hero_img}
        alt="Bestselling product showcase"
      />
    </div>
  )
}

export default Hero