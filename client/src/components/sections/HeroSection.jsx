import { Link } from "react-router-dom";

/**
 * HeroSection component for displaying the homepage hero section.
 * Includes a welcome message, a brief description, and a button linking to the menu.
 *
 * @returns {JSX.Element} The "Hero" section of the homepage.
 */
const HeroSection = () => {
    return (
      <section id="homepage-hero" className="homepage-section">
        <div className="homepage-hero-content">
          <h1>Tervetuloa Pápán Pizzeriaan!</h1>
          <p>Herkullista pizzaa vuodesta 2001 asti</p>
          <Link to="/menu" className="homepage-menu-button">Katso menu</Link>
        </div>
      </section>
    );
  };

  export default HeroSection;
