import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturedPizzaSection from "./FeaturedPizzaSection";
import RatingsSection from "./RatingsSection";
import GallerySection from "./GallerySection";
import HoursLocationSection from "./HoursLocationSection";
import Footer from "./Footer";

const Home = () => {
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
  )
};

export default Home;
