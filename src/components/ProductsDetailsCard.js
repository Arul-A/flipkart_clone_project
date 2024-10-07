import React from 'react'

const ProductsDetailsCard = ({data}) => {
  return (
    <div className='flex border p-10 cursor-pointer bg-[#fff]'>
      <div className='w-1/4'>
        <img src={data.url}  alt='' className='h-[200px]'/>
      </div>
      <div className='w-2/4 flex flex-col gap-3'> 
        <div>
          <p className='text-lg font-medium hover:text-blue-600'>{data.Product}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#388E3C] text-white text-xs p-[2px] font-bold'>{data.rating}★</div>
          <div>
            <p className='text-gray-400 text-sm font-bold'>{data.rating} Ratings & {data.reviews} Reviews</p>
          </div>
        </div>
        <div className='ml-6'>
          <ul className='flex flex-col gap-1 text-sm font-light list-disc'>
            <li>{data.Descripition}</li>
            <li>{data.Display}</li>
            <li>{data.Camera}</li>
            <li>{data.Proccessor}</li>
          </ul>
        </div>
      </div>
        <div className='w-1/4 flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <p className='text-2xl font-bold'>₹{data.Sellingprice}</p>
            <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png' alt='f-assured' className='h-[20px]'/>
          </div>
          <div className='flex items-center justify-start gap-2 text-sm'>
            <p className='text-gray-400 line-through'>₹{data.Orginalprice}</p>
            <p className='text-[#388E3C]'>40% off</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xs'>Free Delivery</p>
            <p className='text-sm text-[#388E3C]'>Save extra with combo offers</p>
            <p className='text-sm'>Upto ₹2500 Off on exchange</p>
          </div>
        </div>
    </div>
      
  )
}

export default ProductsDetailsCard