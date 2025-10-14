import React from 'react'
import HeroSection from './coooooo/Hero'
import Footer from './coooooo/Footer'
import Features from './coooooo/Features';
import Technologies from './coooooo/Technologies';
import Subscription from './coooooo/subscribe';
import Header from './coooooo/Header';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <Technologies />
      <Subscription />
      <Footer />
    </div>
  );
}

export default LandingPage