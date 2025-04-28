import {useEffect, useState} from 'react';
import {getAllPizzas} from '../services/pizzaService';
import PizzaCard from '../components/PizzaCard';

const MenuPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const data = await getAllPizzas();
        console.log('Fetched pizzas:', data);
        setPizzas(data);
      } catch (err) {
        console.error('Error fetching pizzas:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, []);

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
