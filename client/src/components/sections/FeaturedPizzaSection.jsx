import React from 'react';
import usePizzas from '../../hooks/usePizzas';

const FeaturedPizzaSection = () => {
  const {pizzas, loading, error} = usePizzas({daily: true});
  const pizza = pizzas[0];

  return (
    <section id="homepage-featured-pizza" className="homepage-section">
      <h2>Päivän pizza</h2>
      <div className="homepage-featured-grid">
        {loading && <p>Ladataan...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && pizza && (
          <div className="homepage-pizza-card">
            <img src={pizza.image_url} alt={pizza.pizza_name} />
            <h3 id="homepage-featured-pizza-name">{pizza.pizza_name}</h3>
            <p id="homepage-featured-pizza-description">
              {pizza.pizza_description}
            </p>
            <p id="homepage-featured-pizza-price">€{pizza.price}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPizzaSection;
