import { Link } from "react-router-dom";

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
