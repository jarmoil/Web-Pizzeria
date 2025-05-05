import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import FeaturedPizzaSection from '../components/sections/FeaturedPizzaSection';
import RatingsSection from '../components/sections/RatingsSection';
import GallerySection from '../components/sections/GallerySection';
import HoursLocationSection from '../components/sections/HoursLocationSection';
import Footer from '../components/Footer';

const FrontPage = () => {
  return (
    <>
      <div className="homepage">
        <div className="homepage-body">
          <main id="homepage-main-wrapper">
            <HeroSection />
            <AboutSection />
            <FeaturedPizzaSection />
            <RatingsSection />
            <GallerySection />
            <HoursLocationSection />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FrontPage;
