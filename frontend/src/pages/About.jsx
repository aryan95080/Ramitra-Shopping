import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox';
import {assets} from '../assets/assets'

const About=()=> {
  return (
    <div className='w-[95%] mx-auto'>
      <div className='text-2xl text-center pt-8 '>
        <Title text1={' ABOUT '} text2={' US '}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='ml-3 w-full md:max-w-[450px] shadow-md drop-shadow-xl shadow-gray-400 rounded hover:scale-105 transition ease-in-out duration-100' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quae aperiam illo deleniti sapiente, aspernatur quasi maiores ab labore animi rerum esse amet iure adipisci ullam eligendi fugit quas qui.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio magni quasi quam ea praesentium incidunt consectetur mollitia quae aliquam. Placeat unde sed maxime maiores excepturi magnam nihil vel laborum quo quidem nam, deleniti facilis explicabo aspernatur dolore, corporis quaerat tenetur, provident illo similique sapiente consectetur error! Modi quas consequatur assumenda in sit ex, provident, nemo asperiores adipisci expedita earum quos perferendis. Officiis sit voluptatum autem quos voluptatem architecto aliquam natus qui iusto earum, cum dolor aliquid iste. Fugiat sapiente sint ex est, aspernatur facilis doloribus harum! Quibusdam eum consequatur architecto tempora, ab aut maxime laborum. Eveniet voluptas neque possimus.
        </p>
        <b className='text-gray-700'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas eaque voluptatem aliquid voluptatibus facilis ea iste! Labore asperiores itaque quos.</p>
        </div>
      </div>
      
      <div className='text-4xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row bg-transparent shadow-xl backdrop-blur-md gap-5 p-5 rounded'>
        <div className='flex flex-col  px-10 md:px-16 py-8 sm:py-20 gap-5 bg-transparent shadow-lg shadow-gray-400 rounded'>
            <b className='text-xl'>Quality Assurance : </b>
            <p className='text-gray-600'>At <b>RAMITRA</b>, we are committed to delivering the highest quality products to our customers. Our dedicated Quality Assurance team meticulously inspects each item to ensure it meets our standards of durability, functionality, and design. We believe in providing you with products you can trust, ensuring a seamless and satisfying shopping experience every time.</p>
        </div>
        <div className='flex flex-col bg-transparent shadow-lg shadow-gray-400 rounded px-10 md:px-16 py-8 sm:py-20 gap-5 '>
            <b className='text-xl'>Convenience : </b>
            <p className='text-gray-600'>Shopping made simple! At <b>RAMITRA</b>, we prioritize your convenience by offering a user-friendly interface, seamless navigation, and secure payment options. Enjoy fast checkout, easy returns, and reliable customer support — because your time and comfort matter to us.</p>
        </div>
        <div className='flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5 bg-transparent shadow-lg shadow-gray-400 rounded'>
            <b className='text-xl'>Exceptional Customer Service : </b>
            <p className='text-gray-600'>At <b>RAMITRA</b>, we are committed to delivering exceptional customer service. Our dedicated support team is always ready to assist you with queries, concerns, or guidance to ensure your shopping experience is smooth, satisfying, and memorable.</p>
        </div>
      </div>
      <NewsletterBox/>

    </div>
  )
}

export default About