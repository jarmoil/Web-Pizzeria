const FeaturedPizzaSection = () => {
    return (
      <section id="homepage-featured-pizza" className="homepage-section">
        <h2>Viikon pizza</h2>
        <div className="homepage-featured-grid">
          <div className="homepage-pizza-card">
            <img src="/images/margerita-pizza.jpg" alt="Featured pizza" />
            <h3 id="homepage-featured-pizza-name">Margherita</h3>
            <p id="homepage-featured-pizza-description">
              Perinteinen pizza, jossa on tomaattikastiketta, mozzarella-juustoa ja tuoretta basilikaa.
            </p>
            <p id="homepage-featured-pizza-rating">⭐ 4.8 / 5</p>
          </div>
        </div>
      </section>
    );
  };

  export default FeaturedPizzaSection;
