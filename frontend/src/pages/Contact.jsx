import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewletterBox from '../components/NewsletterBox'
const Contact=()=> {
  return (
    <div className='w-[95%] mx-auto'>
      <div className='text-center text-2xl pt-10 '>
        <Title text1={'CONTACT'} text2={' US '}/>
      </div>
      <div className='mt-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] shadow-md drop-shadow-xl shadow-gray-400 rounded hover:scale-105 transition ease-in-out duration-100' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-5 mb-20'>
          <p className='font-semibold text-xl text-gray-600 '>Our Store</p>
          <p className='text-gray-500'>RAMITRA Headquarters 123 <br />Commerce Avenue, Suite 456,<br /> Downtown Plaza Metro City,<br /> ST 78901 United States</p>
          <p className='text-gray-500'> Telephone: +1 (555) 123-4567 <br />Email: support@ramitra.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Ramitra</p>
          <p className='text-gray-500' >Learn more about our teams and job openings.</p>
          <button className=' bg-transparent  border-black px-4 py-2 hover:bg-green-400 hover:text-white font-bold text-lg shadow-md drop-shadow-xl shadow-gray-400 rounded hover:scale-110 transition ease-in-out duration-100'>Explore jobs</button>
        </div>
      </div>
      <NewletterBox/>
    </div>
  )
}

export default Contact