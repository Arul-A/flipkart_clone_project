import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { ProductsData } from '../ProductsData';
import ProductsDetailsCard from '../components/ProductsDetailsCard';

const Products = () => {
  const [data, setData] = useState([])
  const [filterPrice, setFilterPrice] = useState(0)
  const [page, setPage] = useState(1)

  const filterData = (filterPrice,ProductsData) => {
      if(filterPrice > 0){
        return ProductsData.filter((product)=>
          Number(product.Sellingprice.replace(/,/g, '')) <= filterPrice
        );
      }
      return ProductsData;
  }

  useEffect(() => {
    const filteredData = filterData(filterPrice,ProductsData);
    setData(filteredData);
    setPage(1)
      
  }, [filterPrice]);

  const handleSliderChange = (e)=>{
      setFilterPrice(e.target.value)
  }

  const handlePage = (selectedPage)=>{
    if(selectedPage >= 1 && selectedPage <= Math.ceil(data.length / 8) && selectedPage !== page){
      setPage(selectedPage)
      window.scrollTo({
        top:0,
        behavior:'smooth',
      })
    }
  }

  return (
    <>
      <div className='mt-[80px] bg-gray-200'>
        <div className='w-1/5 border bg-white font-medium fixed top-[88px] left-0 bottom-0'>
          <div>
            <p className='text-xl border-b p-3'>Filter</p>
          </div>
          <div className='px-3 border-b pb-3'>
            <div>
              <p className='text-sm py-3'>Categories</p>
            </div>
            <div className='text-xs text-[#878787] px-3 flex flex-col gap-2'>
              <p>Best of Electronics</p>
              <p>Beauty, Foods & Toys</p>
              <p>Winter Essentials</p>
              <p>Wedding & Gifts</p>
            </div>
          </div>
          <div className='p-3 flex flex-col gap-3'>
            <div>
              <p className='text-sm'>PRICE</p>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-lg font-semibold w-12">₹{filterPrice}</span>
              <input 
                type="range" 
                min="0" 
                step="5000"
                max="40000" 
                value={filterPrice}
                onChange={handleSliderChange}
                class="w-full h-2 bg-blue-500 rounded-lg cursor-pointer"
              />
            </div>
            <div className='flex items-center font-light text-sm justify-between'>
              <select id='min-price' className='bg-white border w-[80px] p-1'>
                <option value="0" selected>Min</option>
                <option value="10000">10000</option>
              </select>    
              <p>to</p>
              <select id='max-price' className='bg-white border w-[80px] p-1'>
                  <option value="15000">15000</option>
                  <option value="20000">20000</option>
                  <option value="30000">30000</option>
                  <option value="40000" selected>40000+</option>
                </select>
            </div>
          </div>
        </div>
        <div className='bg-transparent w-4/5 ml-[20%] ps-2 py-2 pe-8'>
          <div className='bg-[#fff] py-2 px-10'>
            <p>Showing {page * 8 - 8 + 1}-{page * data.length > 8 ? page*8:data.length} of {data.length} results</p>
          </div>
          {data.slice(page * 8 - 8, page * 8).map((data) => (
            <Link to={`/productdetails/${data.id}`} key={data.id}>
              <ProductsDetailsCard
                data={data}
              />
            </Link>
          ))}
          <div className='flex p-4 bg-[#fff]'>
            <div>
              <p>page {page} of {Math.ceil(data.length/8)}</p>
            </div>
            <div className='flex-1 flex justify-center gap-4'>
              {page > 1 &&
              <span className='text-blue-500 cursor-pointer' onClick={()=>handlePage(page - 1)}>PREVIOUS</span>}
              {[...Array(Math.ceil(data.length / 8))].map((_,index)=>
                <span className={`${page === index + 1 ? 'bg-blue-500 text-white cursor-default' : 'bg-white text-blue-500 cursor-pointer'} px-2 rounded-full`} onClick={() => handlePage(index + 1)}>{index + 1}</span>
              )}
              <span className='text-blue-500 cursor-pointer' onClick={()=>handlePage(page + 1)}>NEXT</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
