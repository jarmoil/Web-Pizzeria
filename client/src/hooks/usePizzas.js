import {useState, useEffect, useCallback} from 'react';
import {getAllPizzas, getDailyPizza} from '../services/pizzaService';

const usePizzas = ({daily = false} = {}) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPizzas = useCallback(async () => {
    setLoading(true);
    try {
      const data = daily ? await getDailyPizza() : await getAllPizzas();
      setPizzas(daily ? [data] : data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(`Failed to fetch ${daily ? 'daily pizza' : 'pizzas'}`);
    } finally {
      setLoading(false);
    }
  }, [daily]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return {pizzas, loading, error, fetchPizzas};
};

export default usePizzas;
