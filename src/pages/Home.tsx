import React from 'react';
import { BestSelling } from '../components/home/BestSelling';
import { Categories } from '../components/home/Categories';
import { ExploreProducts } from '../components/home/ExploreProducts';
import { Hero } from '../components/home/Hero';
import { MusicBanner } from '../components/home/MusicBanner';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

export const Home = () => {
 return (
  <div className="min-h-screen flex flex-col bg-white">
   <Header />
   <main className="flex-1">
    <Hero />
    <Categories />
    <BestSelling />
    <MusicBanner />
    <ExploreProducts />
   </main>
   <Footer />
  </div>
 );
};
