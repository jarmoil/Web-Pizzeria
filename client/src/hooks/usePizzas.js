import {useState, useEffect} from 'react';
import {getAllPizzas, getDailyPizza} from '../services/pizzaService';

const usePizzas = ({daily = false} = {}) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = daily ? await getDailyPizza() : await getAllPizzas();
        setPizzas(daily ? [data] : data);
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch ${daily ? 'daily pizza' : 'pizzas'}`);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [daily]);

  return {pizzas, loading, error};
};

export default usePizzas;
