import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { ImBin } from "react-icons/im";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartItems] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartItems(tempData);
    }
  }, [cartItems, products])

  const handleQuantityChange = (event, id, size) => {
    const value = event.target.value;
    if (value === '' || Number(value) <= 0) return;
    updateQuantity(id, size, Number(value));
  }

  const handleStep = (id, size, currentQty, direction) => {
    const next = direction === 'inc' ? currentQty + 1 : currentQty - 1;
    if (next <= 0) return;
    updateQuantity(id, size, next);
  }

  return (
    <div className='w-95% px-4 sm:mx-[2.5%] sm:px-0 pt-10 sm:pt-14'>
      <div className='text-xl sm:text-2xl mb-4 sm:mb-6'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className='text-center py-12 sm:py-16 text-gray-400'>
          <p className='text-base sm:text-lg'>Your cart is empty.</p>
          <button
            onClick={() => navigate('/collection')}
            className='mt-4 text-sm underline text-gray-600 hover:text-black'
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-3 sm:gap-4'>
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className='flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6 bg-white border border-gray-200 rounded-xl p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200'
                >
                  {/* Image + info row (stays together as a unit at every width) */}
                  <div className='flex items-center gap-3 sm:gap-6 w-full xs:flex-1 min-w-0'>
                    <img
                      className='w-14 h-14 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0 border border-gray-100'
                      src={productData.image[0]}
                      alt={productData.name}
                    />

                    <div className='flex-1 min-w-0'>
                      <p className='text-sm sm:text-lg font-medium text-gray-800 truncate'>{productData.name}</p>
                      <div className='flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5'>
                        <span className='px-2 py-0.5 text-[11px] sm:text-xs bg-slate-100 text-gray-600 rounded-full whitespace-nowrap'>
                          Size: {item.size}
                        </span>
                        <span className='text-[11px] sm:text-sm text-gray-500 whitespace-nowrap'>
                          {currency}{productData.price} each
                        </span>
                      </div>
                      <p className='text-sm sm:text-base font-semibold text-gray-800 mt-2'>
                        {currency}{(productData.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Stepper + delete row (own row on mobile, inline on larger screens) */}
                  <div className='flex items-center justify-between xs:justify-end gap-3 w-full xs:w-auto flex-shrink-0'>
                    <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
                      <button
                        onClick={() => handleStep(item._id, item.size, item.quantity, 'dec')}
                        aria-label='Decrease quantity'
                        className='px-2.5 sm:px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors'
                      >
                        <FaMinus size={10} />
                      </button>
                      <input
                        onChange={(e) => handleQuantityChange(e, item._id, item.size)}
                        type="number"
                        min={1}
                        value={item.quantity}
                        aria-label={`Quantity for ${productData.name}`}
                        className='w-10 sm:w-12 text-center outline-none border-x border-gray-300 py-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      />
                      <button
                        onClick={() => handleStep(item._id, item.size, item.quantity, 'inc')}
                        aria-label='Increase quantity'
                        className='px-2.5 sm:px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors'
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      aria-label={`Remove ${productData.name} from cart`}
                      className='flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    >
                      <ImBin size={16} />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      )}

      <div className='flex justify-center sm:justify-end my-10 sm:my-20'>
        <div className='w-full sm:w-[450px]'>
          <div className='bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm'>
            <CartTotal />
            <div className='w-full text-end'>
              <button
                onClick={() => navigate('/place-order')}
                disabled={cartData.length === 0}
                className='bg-black hover:bg-gray-800 rounded-2xl text-white text-sm mt-6 sm:mt-8 px-8 py-3 w-full sm:w-auto transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart