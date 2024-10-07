import React, { useEffect, useState } from 'react'
import { ProductsData } from '../ProductsData'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../slices/cartSlice';


const ProductDetails = () => {
  const [data, setData] = useState({})
  const {id} = useParams()
  const dispatch = useDispatch()//react-redux
  const cartItems = useSelector((state)=> state.cartData.cart)
  const navigate = useNavigate()

  useEffect(()=>{
    window.scrollTo({
      top:'0',
      behavior:'smooth'
    })
    const product = ProductsData.find((item)=>{
      return item.id.toString() === id;
    })
    const originalPrice = Number(product.Orginalprice.replace(/,/g, ''));
    const sellingPrice = Number(product.Sellingprice.replace(/,/g, ''));
    const discount = originalPrice - sellingPrice;
    const offerPercentage = Math.floor((discount/originalPrice)*100)
    const quantity = 1

    const randomDays = Math.floor(Math.random() * 5) + 1;
    const today = new Date();
    const expectedDeliveryDate = new Date(today);
    expectedDeliveryDate.setDate(today.getDate() + randomDays);
  
    const formattedDate = expectedDeliveryDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    
  

    setData({...product,discount,offerPercentage,quantity,formattedDate});
    
  },[id,cartItems])
  const isProductInCart = cartItems.some(item =>item.id.toString() === id)//checking product existing in cart

  const addToCart = ()=>{
      dispatch(addCart(data))
  }
  const goToCart = ()=>{
    navigate('/cart')
  }

  return (
    <div className='mt-[80px] flex bg-white w-full h-full p-4'>
      <div className='flex w-2/5'>
        <div className='flex flex-col w-[60px]'>
          <div className='border h-[70px] p-2 cursor-pointer hover:border-blue-600 hover:border-2'>
            <img src={data.url} alt='' className='object-contain w-full h-full'/>
          </div>
          <div className='border h-[70px] p-2 cursor-pointer hover:border-blue-600 hover:border-2'>
            <img src={data.url} alt='' className='object-contain w-full h-full'/>
          </div>
          <div className='border h-[70px] p-2 cursor-pointer hover:border-blue-600 hover:border-2'>
            <img src={data.url} alt='' className='object-contain w-full h-full'/>
          </div>
          <div className='border h-[70px] p-2 cursor-pointer hover:border-blue-600 hover:border-2'>
            <img src={data.url} alt='' className='object-contain w-full h-full'/>
          </div>
          <div className='border h-[70px] p-2 cursor-pointer hover:border-blue-600 hover:border-2'>
            <img src={data.url} alt='' className='object-contain w-full h-full'/>
          </div>
          <div className='border h-[70px] p-2 cursor-pointer hover:border-blue-600 hover:border-2'>
            <img src={data.url} alt='' className='object-contain w-full h-full'/>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='py-6 h-[420px] border'>
            <img src={data.url} alt='' className='w-full h-full object-contain'/>
          </div>
          <div className='flex items-center w-full gap-2'>
            <button className='flex w-1/2 bg-[#FF9F00] p-4 text-white justify-center items-center gap-2' onClick={isProductInCart ? goToCart:addToCart}><FaCartShopping /><span>{`${isProductInCart ? 'GO TO CART':'ADD TO CART'}`}</span></button>
            <button className='flex bg-[#FB641B]  w-1/2 text-white p-4 justify-center items-center gap-2'><AiFillThunderbolt /><span>BUY NOW</span></button>
          </div>
        </div>
       
      </div>
      <div className='flex flex-col w-3/5 ps-6 gap-3'> 
        <div>
          <p className='text-2xl font-bold'>{data.Product}</p>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <p className='bg-[#388E3C] text-xs text-white px-[4px] py-[2px] font-bold'>{data.rating}★</p>
          <p className='text-gray-400 font-bold text-sm'>{data.rating} Ratings & {data.reviews} Reviews</p>
          <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png' alt='' className='h-[25px]'/>
        </div>
        <div>
          <p className='text-[#388E3C] font-bold'>Extra ₹{data.discount} off</p>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-3xl font-medium'>₹{data.Sellingprice}</p>
          <p className='text-gray-400 font-medium line-through'>₹{data.Orginalprice}</p>
          <p className='text-[#388E3C]'>{data.offerPercentage}% off</p>
        </div>
        <div>
          <p>Available Offers</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <img src='https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='' className='h-[20px]'/>
            <p><span className='font-bold text-sm'>Bank Offer</span> <span className='text-sm'>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</span> <span className='font-semibold text-blue-600 cursor-pointer text-sm'>T&C</span></p>
          </div>
          <div className='flex items-center gap-2'>
            <img src='https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='' className='h-[20px]'/>
            <p><span className='font-bold text-sm'>Special Price</span> <span className='text-sm'>Get extra 10% off (price inclusive of cashback/coupon)</span> <span className='font-semibold text-blue-600 cursor-pointer text-sm'>T&C</span></p>
          </div>
          <div className='flex items-center gap-2'>
            <img src='https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='' className='h-[20px]'/>
            <p><span className='font-bold text-sm'>Partner Offer </span> <span className='text-sm'>Make a purchase and enjoy a surprise cashback/ coupon that you can redeem later!</span> <span className='font-semibold text-blue-600 cursor-pointer text-sm'>Know More</span></p>
          </div >
          <div className='flex items-center gap-2'>
            <img src='https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/49f16fff-0a9d-48bf-a6e6-5980c9852f11.png?q=90' alt='' className='h-[20px]'/>
            <p><span className='font-bold text-sm'>No cost EMI ₹333/month. </span><span className='text-sm'> Standard EMI also available </span><span className='font-semibold text-blue-600 cursor-pointer text-sm'>View Plans &gt;</span></p>
          </div>
          
        </div>
        <div className='flex items-center justify-between w-4/5 mt-4'>
          <div>
            <p className='text-gray-500 text-sm font-bold'>Color</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-[70px] h-[70px] border-2 hover:border-blue-600 cursor-pointer p-1'>
              <img src={data.url} alt='' className='w-full h-full object-contain'/>
            </div>
            <div className='w-[70px] h-[70px] border-2 p-1 hover:border-blue-600'>
              <img src={data.url} alt='' className='w-full h-full object-contain'/>
            </div>
            <div className='w-[70px] h-[70px] border-2 p-1 hover:border-blue-600 cursor-pointer'>
              <img src={data.url} alt='' className='w-full h-full object-contain'/>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <p className='text-gray-500 text-sm font-bold'>Storage</p>
            <p className='border-2 px-2 py-1 font-bold cursor-pointer hover:border-blue-600 hover:text-blue-600'>128 GB</p>
            <p className='border-2 px-2 py-1 font-bold cursor-pointer hover:border-blue-600 hover:text-blue-600'>256 GB</p>
          </div>
        </div>
        <div className='flex justify-between mt-5 w-2/3'>
          <div>
            <p className='text-gray-500 text-sm font-bold'>Highlights</p>
          </div>
          <div>
            <ul className='flex flex-col gap-3 justify-center text-sm font-medium list-disc text-gray-500'>
              <li>{data.Descripition}</li>
              <li>{data.Display}</li>
              <li>{data.Camera}</li>
              <li>{data.Battery}</li>
              <li>{data.Proccessor}</li>
            </ul>
          </div>
        </div>
        <div className='mt-5'>
              <p className='text-2xl font-bold'>Ratings & Reviews</p>
        </div>
        <div className='w-2/3 flex gap-5'>
            <div className='flex flex-col items-center w-1/3'>
                <p className='flex items-center font-light text-3xl'>{data.rating}<AiFillStar /></p>
                <p className='text-gray-400 text-sm mt-4'>{data.rating} Ratings & {data.reviews} Reviews</p>
            </div>
            <div>
              <ul className='flex flex-col gap-2 text-sm'>
                <li className='flex items-center gap-3 '>
                  <p className='flex items-center'>5<AiFillStar /></p>
                  <div className='w-[300px] h-[5px] bg-gray-400'>
                    <div className='w-[250px] h-[5px] bg-green-600'></div>
                  </div>
                </li>
                <li className='flex items-center gap-3 '>
                  <p className='flex items-center'>4<AiFillStar /></p>
                  <div className='w-[300px] h-[5px] bg-gray-400'>
                    <div className='w-[200px] h-[5px] bg-green-600'></div>
                  </div>
                </li>
                <li className='flex items-center gap-3 '>
                  <p className='flex items-center'>3<AiFillStar /></p>
                  <div className='w-[300px] h-[5px] bg-gray-400'>
                    <div className='w-[160px] h-[5px] bg-green-600'></div>
                  </div>
                </li>
                <li className='flex items-center gap-3 '>
                  <p className='flex items-center'>2<AiFillStar /></p>
                  <div className='w-[300px] h-[5px] bg-gray-400'>
                    <div className='w-[170px] h-[5px] bg-[#FF9F00]'></div>
                  </div>
                </li>
                <li className='flex items-center gap-3 '>
                  <p className='flex items-center'>1<AiFillStar /></p>
                  <div className='w-[300px] h-[5px] bg-gray-400'>
                    <div className='w-[100px] h-[5px] bg-[#FF6161]'></div>
                  </div>
                </li>
               
              </ul>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default ProductDetails