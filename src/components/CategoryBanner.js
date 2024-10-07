import React from 'react';

const CategoryBanner = ({ ImgSrc, CategoryName, Brand }) => {
  return (
    <div className="overflow-hidden rounded-lg flex flex-col items-center p-2 m-2 border">
      <img 
        src={ImgSrc} 
        alt={CategoryName} 
        className="transform transition-transform duration-300 hover:scale-105 w-[280px] h-[180px] object-contain bg-white relative z-0" 
      />
      <div className='py-1'>
        <p className="font-semibold text-center">{CategoryName}</p>
        <p className="text-blue-600 cursor-pointer text-center hover:underline">Shop Now</p>
        <p className="text-gray-500 text-center">{Brand}</p>
      </div>
    </div>
  );
}

export default CategoryBanner;
