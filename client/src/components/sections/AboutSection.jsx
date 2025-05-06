/**
 * AboutSection component for displaying information about the pizzeria.
 * Includes a brief description of the pizzeria's background and an image.
 *
 * @returns {JSX.Element} The "About Us" section of the homepage.
 */
const AboutSection = () => {
    return (
      <section id="homepage-about" className="homepage-section">
        <div className="homepage-about-grid">
          <div className="homepage-about-text">
            <h2>Meidän taustamme</h2>
            <p>
              Olemme tehneet käsintehtyjä pizzoja kotimaisilla aineksilla vuodesta....
            </p>
          </div>
          <div className="homepage-about-image">
            <img src="/images/pizza-oven.jpg" alt="Pizza oven" />
          </div>
        </div>
      </section>
    );
  };

  export default AboutSection;
