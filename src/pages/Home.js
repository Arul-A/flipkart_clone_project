import React from 'react';
import { CategoryBarData, CarouselData, BestOf} from '../Data';
import CategoryBar from '../components/CategoryBar';
import BannerCarousel from '../components/BannerCarousel';
import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  return (
    <div className='bg-white'>
      <div className='mt-[100px] flex justify-around px-10 items-center'>
        {CategoryBarData.map((item, index) => (
          <CategoryBar
            key={index}
            Imgsrc={item.Imgsrc}
            CategoryName={item.category}
          />
        ))}
      </div>
      <div className='p-4'>
        <BannerCarousel data={CarouselData} />
      </div>
      <div className='p-4'>
        <ProductCarousel 
            title = 'Best of Electronics'
            Data = {BestOf.Electronics}
        />
        <ProductCarousel 
            title = 'Beauty,Foods & Toys'
            Data = {BestOf.BeautyFoodsToys}
        />
        
        <ProductCarousel 
            title = 'Winter Essentials'
            Data = {BestOf.WinterEssential}
        />
         <ProductCarousel 
            title = 'Weddings & Gifts'
            Data = {BestOf.WeddingsAndGifts}
        />
      </div>
    </div>
  );
};

export default Home;
