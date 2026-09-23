import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { FaStripe } from "react-icons/fa";
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        }
        case 'stripe':
        case 'razorpay':
        case 'upi':
          // TODO: wire up the actual payment gateway API call for this method.
          toast.error(`${method.toUpperCase()} payment isn't set up yet — please select Cash on Delivery for now.`)
          break;
        default:
          toast.error('Please select a valid payment method.')
          break;
      }

    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Something went wrong while placing your order.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const paymentOptions = [
    { key: 'stripe', label: 'Stripe', content: <FaStripe style={{ fontSize: '30px' }} /> },
    { key: 'razorpay', label: 'Razorpay', content: <img className='w-16 sm:w-20' src={assets.razorPay} alt="Razorpay" /> },
    { key: 'upi', label: 'UPI', content: <img className='w-16 sm:w-20' src={assets.upiLogo} alt="UPI" /> },
    { key: 'cod', label: 'Cash on Delivery', content: <p className='px-1 sm:px-3 text-center text-sm sm:text-base'>CASH ON DELIVERY</p> },
  ]

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row w-[95%] mx-auto justify-between gap-8 sm:gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/*---------------------left side -------------------- */}
      <div className='flex flex-col gap-4 w-full sm:w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY '} text2={' INFORMATION'} />
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="email" placeholder='email@example.com' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex flex-col sm:flex-row gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='border border-gray-400 rounded py-1.5 px-3.5 w-full'
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            placeholder='Zipcode'
          />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-gray-400 rounded py-1.5 px-3.5 w-full'
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={15}
          placeholder='Phone no.'
        />
      </div>

      {/*---------------------right side -------------------- */}
      <div className='mt-8 w-full sm:w-auto'>
        <div className='mt-8 w-full sm:min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT '} text2={' METHOD'} />
          {/* ---------------Payment method selection ---------------- */}
          <fieldset className='flex gap-3 flex-col sm:flex-row sm:flex-wrap'>
            <legend className='sr-only'>Select a payment method</legend>
            {paymentOptions.map((opt) => (
              <label
                key={opt.key}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded transition-colors ${method === opt.key ? 'border-green-500' : 'border-gray-300'}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.key}
                  checked={method === opt.key}
                  onChange={() => setMethod(opt.key)}
                  className='sr-only'
                />
                <span
                  aria-hidden="true"
                  className={`min-w-3.5 h-3.5 rounded-full border ${method === opt.key ? 'bg-green-400' : ''}`}
                />
                {opt.content}
              </label>
            ))}
          </fieldset>

          <div className='w-full text-center mt-8'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-black text-white py-3 px-3 rounded text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder