import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import FeaturedPizzaSection from '../components/sections/FeaturedPizzaSection';
import RatingsSection from '../components/sections/RatingsSection';
import GallerySection from '../components/sections/GallerySection';
import HoursLocationSection from '../components/sections/HoursLocationSection';
import Footer from '../components/Footer';

/**
 * FrontPage component for rendering the homepage of the application.
 * Includes sections such as Hero, About, Featured Pizza, Ratings, Gallery, Hours & Location, and Footer.
 *
 * @returns {JSX.Element} The homepage layout with all its sections.
 */
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
