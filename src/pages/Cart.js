import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaCircleInfo } from "react-icons/fa6";
import { removeCart, incrementItem, decrementItem } from '../slices/cartSlice';

const Cart = ({ setIsOpen }) => {
  const cartItems = useSelector((state) => state.cartData.cart);
  const user = useSelector((state) => state.userData.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToHome = () => {
    navigate('/');
  };

  const removeItem = (id) => {
    dispatch(removeCart(id));
  };

  const incrementQuantity = (id) => {
    dispatch(incrementItem(id));
  };

  const decrementQuantity = (id) => {
    dispatch(decrementItem(id));
  };
  const getSellingPrice = ()=>{
    const sellingPrice = cartItems.reduce((acc, item) => {
      return acc + (Number(item.Sellingprice.replace(/,/g,'')) * item.quantity); 
    }, 0);
    const formattedSellingPrice = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(sellingPrice)
    return formattedSellingPrice
  }
  const getTotalPrice = ()=>{
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + (Number(item.Orginalprice.replace(/,/g,'')) * item.quantity); 
    }, 0);
    const formattedTotalPrice = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalPrice)

    return formattedTotalPrice
  }
  const getTotalDiscount = ()=>{
    const totalDiscount = cartItems.reduce((acc, item) => {
      return acc + (item.discount * item.quantity); 
    }, 0);
    const formattedDiscount = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalDiscount)

    return formattedDiscount
  }

  return (
    <div className='bg-[#F1F3F6] h-5/6 mt-[90px]'>
      <div className='p-5'>
        {cartItems.length === 0 ? (
          <div className='flex flex-col justify-center items-center bg-[#fff] gap-2 p-6'>
            <img
              src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90'
              alt='cart'
              className='w-[250px] h-[250px] object-contain'
            />
            <p className='text-xl'>{`${user ? 'Your cart is empty!' : 'Missing cart items?'} `}</p>
            <p className='text-xs'>{`${user ? 'Add items to it now.' : 'Login to see the items you added previously'} `}</p>
            {user ? (
              <button className='px-14 py-2 text-[#fff] bg-blue-600' onClick={navigateToHome}>Shop now</button>
            ) : (
              <button className='px-16 py-2 text-[#fff] bg-[#FB641B]' onClick={() => setIsOpen(true)}>Login</button>
            )}
          </div>
        ) : (
          <div className='bg-[#F1F3F6] h-2/3 flex gap-3'>
            <div className='flex flex-col w-2/3 h-[500px]'>
              <div className='flex flex-col w-full max-h-[420px] overflow-y-auto hide-scrollbar'>
                {cartItems.map((item) => (
                  <div key={item.id} className='flex flex-col bg-[#fff] p-5 gap-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex'>
                        <div>
                          <img
                            src={item.url}
                            alt='product'
                            className='w-[100px] h-[100px] object-contain'
                          />
                        </div>
                        <div className='flex flex-col'>
                          <div>
                            <p>{item.Product}</p>
                          </div>
                          <div className='flex items-center gap-3'>
                            <p className='text-[#878787]'>Seller: Arul Pvt Ltd</p>
                            <img
                              src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png'
                              alt='flipkart'
                              className='w-[60px] h-[60px] object-contain'
                            />
                          </div>
                          <div className='flex items-center gap-2'>
                            <p className='text-[#878787] text-sm line-through'>₹{item.Orginalprice}</p>
                            <p>₹{item.Sellingprice}</p>
                            <p className='text-[#388E3C]'>{item.offerPercentage}%</p>
                            <p className='text-[#388E3C]'>1 offer applied </p>
                            <FaCircleInfo className='text-[#388E3C]' />
                          </div>
                        </div>
                      </div>
                      <div className='ml-20 flex flex-col'>
                        <p className='text-sm text-[#388E3C]'>Free Delivery Available</p>
                        <p className='text-sm flex items-center gap-1'>
                          Expected Delivery Date
                          <span className='text-[#388E3C] text-base'>{item.formattedDate}</span>
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <button
                          className='border border-black px-2 rounded-full'
                          onClick={() => decrementQuantity(item.id)}
                        >
                          -
                        </button>
                        <p className='border border-black px-4'>{item.quantity}</p>
                        <button
                          className='border border-black px-2 rounded-full'
                          onClick={() => incrementQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <div className='px-12'>
                        <button
                          className='px-5 py-2 text-[#fff] bg-blue-600'
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='bg-[#fff] h-[70px] flex justify-end w-full py-2 px-5 shadow-lg'>
                <button className='px-8 py-2 bg-[#FB641B] text-[#fff] text-xl'>PLACE ORDER</button>
              </div>
            </div>
            <div className='w-1/3 bg-[#fff] h-[250px] shadow-md flex flex-col'>
              <div className='p-5 border-b-2 border-dotted'>
                <p className='text-[#878787]'>PRICE DETAILS</p>
              </div>
              <div className='flex flex-col px-5 py-3 gap-3 border-b-2 border-dotted'>
                <div className='flex items-center justify-between'>
                  <p>Price ({cartItems.length})items</p>
                  <p>{getTotalPrice()}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Discount</p>
                  <p className='text-[#388E3C]'>-{getTotalDiscount()}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Delivery charges</p>
                  <p className='text-[#388E3C]'><span className='line-through text-[#878787] mr-1'>₹40</span>Free</p>
                </div>
              </div>

              <div className='flex items-center justify-around py-4 font-medium text-xl'>
                <p>Total Amount</p>
                <p>{getSellingPrice()}</p>
              </div>
              <div></div>
              
            </div>
          </div>
        )}
      </div>
      <div className='flex items-center justify-between text-[#565656] mt-5 border-t pt-5 pb-10 px-20 text-sm'>
        <p>Policies: Returns Policy | Terms of use | Security | Privacy | Infringement</p>
        <p>&copy; 2007-2024 Flipkart_Clone.com</p>
        <p>
          Need help? Visit the <span className='text-blue-600'>Help Center</span> or{' '}
          <span className='text-blue-600'>Contact Us</span>
        </p>
      </div>
    </div>
  );
};

export default Cart;
