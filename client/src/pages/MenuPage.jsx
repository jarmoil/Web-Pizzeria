import React from 'react';
import usePizzas from '../hooks/usePizzas';
import PizzaCard from '../components/menu/PizzaCard';

const MenuPage = () => {
  const {pizzas, loading, error} = usePizzas();

  if (loading) return <p>Loading pizzas...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="menu-wrapper-grid">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.pizza_id} pizza={pizza} />
      ))}
    </div>
  );
};

export default MenuPage;
