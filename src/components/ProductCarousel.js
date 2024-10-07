import React from 'react';
import Slider from 'react-slick';    
import CategoryBanner from './CategoryBanner';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const ProductCarousel = ({ title, Data }) => {
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} absolute top-1/3 right-7 z-30`} onClick={onClick}>
        <div className='border w-[40px] cursor-pointer py-1 flex items-center justify-center'>
          <MdArrowForwardIos className="text-black" style={{ fontSize: 25 }} />
        </div>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} absolute top-1/3 left-3 z-30`} onClick={onClick}>
        <div className='border w-[40px] cursor-pointer py-1 flex items-center justify-center'>
          <MdArrowBackIosNew className="text-black" style={{ fontSize: 25 }} />
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full h-[380px] mt-2 flex flex-col rounded-lg relative">
      <div className="relative p-6">
        <p className="font-bold text-xl text-center">{title}</p>
        <button className="absolute p-2 border-none outline-none text-white bg-blue-600 font-semibold cursor-pointer rounded-md right-4 top-4 hover:bg-blue-700 transition">
          View All
        </button>
      </div>
      <div className="flex-1 relative p-4">
        <Slider nextArrow={<NextArrow />} prevArrow={<PrevArrow />} {...settings}>
          {Data.map((item, index) => (
            <Link key={index} to="/products">
              <div className="overflow-hidden rounded-lg hover:shadow-2xl">
                <CategoryBanner 
                  ImgSrc={item.ImgSrc}
                  CategoryName={item.CategoryName}
                  Brand={item.Brand}
                />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCarousel;
