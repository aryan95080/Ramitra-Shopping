import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const formatAmount = (amount) => amount.toFixed(2);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full'>
      <div className='text-xl sm:text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-3 sm:mt-2 text-xs sm:text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {formatAmount(subtotal)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {formatAmount(delivery_fee)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {formatAmount(total)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal