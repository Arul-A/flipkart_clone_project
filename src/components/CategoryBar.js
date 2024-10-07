import React from 'react';

const CategoryBar = ({ Imgsrc, CategoryName }) => {
  return (
    <div className='flex flex-col items-center'>
      <img 
        src={Imgsrc} 
        alt={CategoryName}  
        className='w-[60px] transform transition-transform duration-300 scale-100 hover:scale-105 cursor-pointer'
      />
      <p className='text-sm'>{CategoryName}</p>
    </div>
  );
};

export default CategoryBar;
