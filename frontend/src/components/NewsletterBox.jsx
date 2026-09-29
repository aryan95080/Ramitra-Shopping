import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center mt-10 px-4'>
      <p className='text-gray-500 text-sm sm:text-base max-w-md mx-auto mt-2'>
        Get the latest fashion updates, exclusive offers, and early access to new collections delivered straight to your inbox.
      </p>
      <p className='text-xl sm:text-2xl font-medium text-gray-700'>
        Subscribe Now and Get 20% Off
      </p>
      

      <form
        onSubmit={onSubmitHandler}
        className='bg-transparent shadow-lg shadow-gray-400 backdrop-blur-3xl w-full sm:w-2/3 md:w-1/2 flex items-center justify-between rounded text-black overflow-hidden outline-none mx-auto my-5 border border-green-300 pl-2'
      >
        <input
          className='font-bold text-sm sm:text-lg md:text-xl w-full outline-none flex-1 min-w-0'
          required
          type="email"
          placeholder='enter your email.....'
        />
        <button
          type='submit'
          className='bg-green-400 hover:bg-green-500 text-white text-sm sm:text-lg md:text-xl px-3 sm:px-5 py-2 font-bold whitespace-nowrap'
        >
          Subscribe
        </button>
      </form>
      <p className='text-gray-500 text-sm sm:text-base max-w-md mx-auto mt-2'>
        By subscribing, you agree to receive emails from Ramitra. You can unsubscribe at any time.
      </p>
    </div>
  )
}

export default NewsletterBox;