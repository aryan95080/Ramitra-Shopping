import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";






const Footer=()=> {
  return (
    <div className='flex flex-col sm:grid grid-cols-[1fr_1fr_1fr] gap-14 mt-20  text-sm bg-white pl-10 pr-10' >
      
      <div className='col-span-3'>
        <div className="flex items-center justify-center p-4">
          <img src={assets.logo} className="w-20 h-auto inline-flex" alt="Ramitra Logo" />
          <p className="font-extrabold text-4xl sm:text-5xl md:text-6xl ml-2 text-green-400">RAMITRA SHOPPING</p>
        </div>
          <p className='text-gray-700 text-justify w-full'>Ramitra Shopping is your go-to destination for all things stylish, trendy, and affordable! At Ramitra, we bring together a curated selection of high-quality fashion, accessories, home essentials, and lifestyle products designed to elevate your everyday experience. Whether you're looking for the latest in fashion, unique decor pieces, or practical gadgets, Ramitra has something for everyone.  

          Our store focuses on offering a seamless shopping experience with a diverse range of products that cater to all tastes and needs. We believe that shopping should be both fun and convenient, which is why we pride ourselves on exceptional customer service, hassle-free returns, and fast delivery.

          Discover the perfect blend of style and comfort at Ramitra Shopping — where quality meets affordability! Shop with us today and transform your lifestyle, one product at a time.</p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>CAMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-700'>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Careers</li>
          <li>Ramitra Stories</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>GROUP COMPANIES</p>
        <ul className='flex flex-col gap-1 text-gray-700'>
          <li>Flip-kart</li>
          <li>Shopsy</li>
          <li>Myntra</li>
          <li>Cleartrip</li>
        </ul>
      </div>

      <div>
      <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-700'>
        <BsFillTelephoneInboundFill /><li> +91-913-569-7852</li>
        <MdMarkEmailRead /><li>contact@ramitra.com</li>
        </ul>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex gap-5'>
          <li><FaFacebook size={30}/></li>
          <li><FaSquareXTwitter size={30} /></li>
          <li><FaSquareInstagram size={30}/></li>
          <li><IoLogoYoutube size={30}/></li>
        </ul>

      </div>
      
      <div>
        <p className='text-xl font-medium mb-5'>CONSUMER POLICY</p>
        <ul className='flex flex-col gap-1 text-gray-700'>
          <li>Cancellation &</li>
          <li>Return</li>
          <li>Terms of Use</li>
          <li>Security</li>
          <li>Privacy</li>
          <li>Sitemap</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>HELP</p>
        <ul className='flex flex-col gap-1 text-gray-700'>
          <li>Payments</li>
          <li>Shipping</li>
          <li>Cancellation &</li>
          <li>return</li>
          <li>FAQ</li>
        </ul>
      </div> 
      <div  className='col-span-3'>
        <hr/>
        <p className='text-center'>Copyright 2025@ ramitra.com-All Right Reserved.</p>
      </div>     
    </div>  
    
  )
}

export default Footer