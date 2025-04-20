import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import SustainabilityBanner from '../components/home/SustainabilityBanner';
import ImpactStats from '../components/home/ImpactStats';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <SustainabilityBanner />
      <ImpactStats />
    </div>
  );
};

export default HomePage;