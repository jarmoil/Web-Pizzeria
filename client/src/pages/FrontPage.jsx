import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturedPizzaSection from '../components/FeaturedPizzaSection';
import RatingsSection from '../components/RatingsSection';
import GallerySection from '../components/GallerySection';
import HoursLocationSection from '../components/HoursLocationSection';
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
