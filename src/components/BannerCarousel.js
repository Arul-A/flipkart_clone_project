import React from 'react';
import Slider from 'react-slick'

const BannerCarousel = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='w-full h-[200px] relative overflow-hidden'>
        <Slider {...settings}>
        {data.map((item)=>(
            <div key={item.id}>
                <img src={item.Imgsrc} alt='' className=' w-full h-[200px]  object-cover'/>
            </div>
        ))}
       </Slider>
    </div>
   
  );
};

export default BannerCarousel;
